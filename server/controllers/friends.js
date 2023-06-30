const db = require("../database");
const notificationsController = require("../controllers/notifications");
const { firestore } = require("firebase-admin");

function getPublicInfoOfUser(userData) {
  const user = userData.data();

  const info = {
    id: userData.id,
    firstName: user.firstName,
    lastName: user.lastName,
    picture: user.picture,
  };

  if (user.settings.showEmail) {
    info.email = user.email;
  }

  if (user.settings.showPhone) {
    info.phoneNumber = user.phoneNumber;
  }

  return info;
}

const controller = {
  /**
   * Returns a shuffled array of users of 5 elements or less (only id, name, picture)
   * @param {*} req
   * @param {*} res
   */
  getSuggestions: async (req, res) => {
    const users = await db.collection("users").get();
    const callerRef = await db.collection("users").doc(req.caller.id).get();
    const friends = callerRef.data().friends;

    if (!users.empty) {
      const suggestions = users.docs
        .filter((e) => e.id !== req.caller.id)
        .filter((e) => !friends.includes(e.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map((d) => {
          return {
            ...getPublicInfoOfUser(d),
            numberOfSharedProducts: d.data().products.filter((i) => i.isShared)
              .length,
          };
        });
      res.status(200).json({
        suggestions,
      });
    } else {
      res.status(404).json({ message: "No users in the database" });
    }
  },

  /**
   * This function should return all users in the database without the caller.
   * Is called in the search functionality.
   *
   * @example 'GET /api/friends/all-users'
   * @param {*} req
   * @param {*} res
   */
  getAllUsersExceptMe: async (req, res) => {
    const user = await db.collection("users").doc(req.caller.id).get();

    if (user.exists) {
      const allUsers = (await db.collection("users").get()).docs
        .filter((e) => e.id !== req.caller.id)
        .map((d) => {
          return {
            ...getPublicInfoOfUser(d),
            email: {
              value: d.data().email,
              visible: d.data().settings.showEmail,
            },
          };
        });

      res.status(200).json({ allUsers });
    } else {
      res.status(404).json({ message: "You are not in the database" });
    }
  },

  /**
   * Happens between a requestor and requestee. This method should only
   * be available to a requestor. Accepts the userId of the requestee in query params.
   * A notification of type FRIEND_REQUEST is added in the requestee's notifications collection.
   *
   * @example '/api/friends/send-request?requestee=<idOfRequestee>'
   * @param {*} req
   * @param {*} res
   */
  sendRequest: async (req, res) => {
    const requestee = await db
      .collection("users")
      .doc(req.query.requestee)
      .get();
    const friends = requestee.data().friends;

    if (!friends.includes(req.caller.id)) {
      notificationsController
        .addNotification({
          type: "FRIEND_REQUEST",
          detail: {
            from: req.caller,
            toId: requestee.id,
          },
        })
        .then((result) => {
          res.status(201).json({ id: result.notificationId });
        })
        .catch((err) => {
          res
            .status(400)
            .json({ message: "Something went wrong while updating" });
        });
    } else {
      res.status(400).json({ message: "You are already friends" });
    }
  },

  /**
   * This method should only be available to a requestee.
   * Takes the notificationId from the query params, fetches it from the db,
   * takes the requestor from the notification and adds it in the friends collection,
   * goes to the requestor's document and adds itself in the friends collection.
   *
   * @example '/api/friends/accept?id=<notificationId>'
   * @param {*} req
   * @param {*} res
   */
  accept: async (req, res) => {
    const requesteeRef = db.collection("users").doc(req.caller.id);
    const requestee = await requesteeRef.get();
    const notification = requestee
      .data()
      .notifications.find((i) => i.id === req.query.id);

    if (notification && notification.type === "FRIEND_REQUEST") {
      console.log(notification);
      try {
        await requesteeRef.update({
          friends: firestore.FieldValue.arrayUnion(
            notification.detail.fromUser
          ),
        });

        const requestorRef = db
          .collection("users")
          .doc(notification.detail.fromUser);
        await requestorRef.update({
          friends: firestore.FieldValue.arrayUnion(req.caller.id),
        });

        await notificationsController.deleteNotification(
          requestee.id,
          notification.id
        );

        await notificationsController.addNotification({
          type: "FRIEND_REQUEST_ACCEPTED",
          detail: {
            toId: requestorRef.id,
            from: req.caller,
          },
        });

        res.status(201).json({ message: "Friend request accepted" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
      }
    } else if (notification && notification.detail) {
      res.status(400).json({ message: "Only friend requests can be accepted" });
    } else {
      res.status(404).json({ message: "Notification not found" });
    }
  },

  /**
   * This function should return all shared products of friends of the caller.
   *
   * @example 'GET /api/friends/products'
   * @param {*} req
   * @param {*} res
   */
  getProducts: async (req, res) => {
    if (req.caller.friends.length > 0) {
      const products = await Promise.all(
        req.caller.friends.map(async (friendId) => {
          const friend = await db.collection("users").doc(friendId).get();
          const sharedProducts = friend
            .data()
            .products.filter(
              (product) => product.isShared && !product.isClaimed
            );
          return sharedProducts.map((product) => {
            return {
              product: {
                ...product,
                expirationDate: product.expirationDate.toDate(),
                dateAdded: product.dateAdded.toDate(),
              },
              user: getPublicInfoOfUser(friend),
            };
          });
        })
      );

      if (products) {
        res.status(200).json({ sharedProductsOfFriends: products.flat() });
      } else {
        res.status(404).json({ message: "No products were found" });
      }
    } else {
      res.status(400).json({ message: "You have no friends" });
    }
  },

  /**
   * This function should be called by a claimer with a claimee.
   * It should accept the productId and claimeeId. The claimee gets a notification.
   *
   * @example 'POST /api/friends/<idOfClaimee>/products/claim?id=<idOfTheClaimedProduct>'
   * @param {*} req
   * @param {*} res
   */
  claim: async (req, res) => {
    const claimer = req.caller;
    console.log(req.body);
    const claimee = await db
      .collection("users")
      .doc(req.params.claimeeId)
      .get();

    if (!claimer.friends.includes(claimee.id)) {
      res
        .status(400)
        .json({ message: "You can only claim products of friends." });
    }

    const product = claimee
      .data()
      .products.find((p) => p.id === req.body.productId && p.isShared);

    if (!product) {
      res
        .status(404)
        .json({ message: "Product was not found or was not shared." });
    }

    notificationsController
      .addNotification({
        type: "CLAIM",
        detail: {
          from: claimer,
          toId: claimee.id,
          productId: product.id,
        },
      })
      .then((result) => {
        res.status(201).json({ id: result.notificationId });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Something went wrong while updating" });
      });
  },

  /**
   * This function should only be called by the claimee.
   * Upon accepting, product.isShared = false, product.isClaimed = true
   * and the product gets removed from the array of the claimee and added in
   * the array of the claimer.
   *
   * @example 'PATCH /api/friends/<idOfClaimer>/accept-claim?id=<notificationId>'
   * @param {*} req
   * @param {*} res
   */
  acceptClaim: async (req, res) => {
    const claimer = await db
      .collection("users")
      .doc(req.params.claimerId)
      .get();
    const claimee = req.caller;

    const notification = claimee.notifications.find(
      (n) => n.id === req.query.id
    );

    if (!notification) {
      res.status(404).json({ message: "Notification not found" });
    }

    const product = req.caller.products.find(
      (p) => p.id === notification.detail.productId
    );

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }

    db.collection("users")
      .doc(claimee.id)
      .update({
        products: firestore.FieldValue.arrayRemove(product),
      })
      .then((result) => {
        product.isShared = false;
        product.isClaimed = true;

        db.collection("users")
          .doc(claimer.id)
          .update({
            products: firestore.FieldValue.arrayUnion(product),
          });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Something went wrong while moving the product" });
      });

    await notificationsController.deleteNotification(
      claimee.id,
      notification.id
    );

    await notificationsController.addNotification({
      type: "CLAIM_ACCEPTED",
      detail: {
        toId: claimer.id,
        from: claimee,
        productId: product.id,
      },
    });

    res.status(200).json({ message: "Claim accepted" });
  },
};

module.exports = controller;

const { firestore } = require("firebase-admin");
const uuid = require('uuid');
const db = require("../database");
const userController = require('./user');
const webpush = require('../webpush');

// notifications should be of multiple types
// 1. friend requests with actions (accept)
// 2. expiry notifications
// 3. generic (new functionality available etc)
// all should be deletable

// notifications: [
//   { type: 'friend_request'|'expiry'|'generic',
//     date: 'date time',
//     delete_action: 'url of delete action',
//     detail: {
//     requestor?: 'userid' if friend request,
//     accept_action: 'url of accept action',

//     product?: 'productid' if expiry,
//     expirydate: 'date'

//     text: 'text' if generic
//   }}
// ]

async function sendPushIfEnabled(userId, text) {
  const push = {
    notification: {
      title: 'Plateful',
      body: text,
      icon: 'assets/icons/logo-icon.svg',
    },
  };

  const user = await db.collection('users').doc(userId).get();
  const pushSubscription = user.data().settings.pushSubscription;

  if (pushSubscription) {
    webpush.sendNotification(pushSubscription, JSON.stringify(push)).then((res) => {
      console.log(res);
      return res.statusCode;
    }).catch(err => {
      console.log(err);
    });
  }
}

const internalController = {
  addNotification: async (notification) => {
    const notificationUuid = uuid.v4();

    const notificationToAdd = {
      id: notificationUuid,
      type: notification.type,
      date: new Date().toUTCString(),
    }

    switch (notification.type) {
      case 'FRIEND_REQUEST': {
        const requestee = db.collection('users').doc(notification.detail.toId);
        const result = await requestee.update({
          notifications: firestore.FieldValue.arrayUnion({
            ...notificationToAdd,
            detail: {
              fromUser: notification.detail.from.id,
            },
          }),
        });

        await sendPushIfEnabled(requestee.id, `You got a friend request from ${notification.detail.from.firstName} ${notification.detail.from.lastName}!`);

        return { ...result, notificationId: notificationUuid };
      }

      case 'FRIEND_REQUEST_ACCEPTED': {
        const to = db.collection('users').doc(notification.detail.toId);
        const result = await to.update({
          notifications: firestore.FieldValue.arrayUnion({
            ...notificationToAdd,
            detail: {
              fromUser: notification.detail.from.id,
            },
          }),
        });

        await sendPushIfEnabled(to.id, `${notification.detail.from.firstName} ${notification.detail.from.lastName} is now your friend!`);

        return { ...result, notificationId: notificationUuid };
      }

      case 'EXPIRY':
        break;

      case 'CLAIM': {
        const claimee = db.collection('users').doc(notification.detail.toId);
        const result = await claimee.update({
          notifications: firestore.FieldValue.arrayUnion({
            ...notificationToAdd,
            detail: {
              fromUser: notification.detail.from.id,
              product: notification.detail.productId,
            },
          }),
        });

        await sendPushIfEnabled(claimee.id, `${notification.detail.from.firstName} ${notification.detail.from.lastName} wants to claim one of your products!`);

        return { ...result, notificationId: notificationUuid };
      }

      case 'CLAIM_ACCEPTED': {
        const to = db.collection('users').doc(notification.detail.toId);
        const result = await to.update({
          notifications: firestore.FieldValue.arrayUnion({
            ...notificationToAdd,
            detail: {
              fromUser: notification.detail.from.id,
              product: notification.detail.productId,
            },
          }),
        });

        await sendPushIfEnabled(to.id, `${notification.detail.from.firstName} ${notification.detail.from.lastName} accepted your claim!`);

        return { ...result, notificationId: notificationUuid };
      }

      case 'GENERIC':
      default:
        break;

    }
  },

  deleteNotification: async (userId, notificationUuid) => {
    const user = await db.collection('users').doc(userId).get();
    const notificationToDelete = user.data().notifications.find((i) => i.id === notificationUuid);

    if (notificationToDelete) {
      return await db.collection('users').doc(userId).update({
        notifications: firestore.FieldValue.arrayRemove(notificationToDelete),
      });
    } else return null;
  }
}

const controller = {
  getAllForMe: async (req, res) => {
    const user = await db.collection('users').doc(req.caller.id).get();
    if (user.exists) {
      // enriches notification
      const notifications = await Promise.all(user.data().notifications.map(async (notification) => {
        const enrichedUser = await userController.getPublicInfoById(notification.detail.fromUser);
        if (notification.detail.product) {
          const enrichedProduct = await user.data().products.find(p => p.id === notification.detail.product);
          notification.detail.product = enrichedProduct;
        }
        notification.detail.fromUser = enrichedUser;
        return notification;
      }));
      res.status(200).json({
        notifications: notifications,
      });
    } else {
      res.status(404).json({ 'message': 'User not found' });
    }
  },
  /**
   * Should take a notificationId in path and delete it if it belongs to the caller.
   * 
   * @example 'DELETE /api/notifications/<idOfNotification>
   * @param {*} req 
   * @param {*} res 
   */
  delete: async (req, res) => {
    internalController.deleteNotification(req.caller.id, req.params.notificationId)
      .then(result => {
        if (result) {
          res.status(200).json({ 'message': 'Deleted' });
        } else {
          res.status(404).json({ 'message': 'Notification not found' });
        }
      }).catch(err => {
        console.log(err);
        res.status(400).json({ 'message': 'Something went wrong' });
      });
  },

  addNotification: internalController.addNotification,
  deleteNotification: internalController.deleteNotification,
};

module.exports = controller;

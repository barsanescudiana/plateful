const db = require("../database");
const notificationsController = require('../controllers/notifications');
const { firestore } = require("firebase-admin");

const controller = {
  /**
   * Returns a shuffled array of users of 5 elements or less (only id, name, picture)
   * @param {*} req 
   * @param {*} res 
   */
  getSuggestions: async (req, res) => {
    const users = await db.collection('users').get();
    if (!users.empty) {
      const suggestions = users.docs
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map(d => {
          const user = d.data();
          return {
            id: d.id,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture,
          };
        });
      res.status(200).send({
        suggestions,
      });
    } else {
      res.status(404).send({ 'message': 'No users in the database' });
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
    const requesteeId = req.query.requestee;
    notificationsController.addNotification({
      type: 'FRIEND_REQUEST',
      detail: {
        from: req.caller,
        toId: requesteeId,
      },
    }).then(result => {
      res.status(201).json({ 'id': result.notificationId });
    }).catch(err => {
      res.status(400).json({ 'message': 'Something went wrong while updating' });
    });
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
    const requesteeRef = db.collection('users').doc(req.caller.id);
    const requestee = await requesteeRef.get();
    const notification = requestee.data().notifications.find((i) => i.id === req.query.id);

    if (notification && notification.type === 'FRIEND_REQUEST') {
      try {
        await requesteeRef.update({
          friends: firestore.FieldValue.arrayUnion(notification.detail.requestor),
        });
  
        const requestorRef = db.collection('users').doc(notification.detail.requestor);
        await requestorRef.update({
          friends: firestore.FieldValue.arrayUnion(req.caller.id),
        });
  
        await notificationsController.deleteNotification(requestee.id, notification.id);

        res.status(201).json({ 'message': 'Friend request accepted' });
      } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'Something went wrong' });
      }
    } else if (notification && notification.detail) {
      res.status(400).json({ 'message': 'Only friend requests can be accepted' });
    } else {
      res.status(404).json({ 'message': 'Notification not found' });
    }
  }
};

module.exports = controller;
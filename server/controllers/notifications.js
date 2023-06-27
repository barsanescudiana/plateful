const { firestore } = require("firebase-admin");
const uuid = require('uuid');
const db = require("../database");
const userController = require('./user');

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

const internalController = {
  addNotification: async (notification) => {
    const notificationUuid = uuid.v4();

    const notificationToAdd = {
      id: notificationUuid,
      type: notification.type,
      date: new Date().toUTCString(),
      deleteAction: `/api/notifications/delete?id=${notificationUuid}`,
    }

    switch (notification.type) {
      case 'FRIEND_REQUEST':
        const requestee = db.collection('users').doc(notification.detail.toId);
        const result = await requestee.update({
          notifications: firestore.FieldValue.arrayUnion({
            ...notificationToAdd,
            detail: {
              requestor: notification.detail.from.id,
              acceptAction: `/api/notifications/accept?id=${notificationUuid}`,
            },
          }),
        });

        return { ...result, notificationId: notificationUuid};

      case 'EXPIRY':
        break;

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
        const enrichedUser = await userController.getPublicInfoById(notification.detail.requestor);
        notification.detail.requestor = enrichedUser;
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

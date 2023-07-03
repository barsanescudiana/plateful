const webpush = require('web-push');

webpush.setGCMAPIKey(process.env.CGM_API_KEY);
webpush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY,
);

module.exports = webpush;
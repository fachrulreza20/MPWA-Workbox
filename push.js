var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BBkGxdAiroyTUDec3AXuwd8B69qbkEVa01yowmIPUoy_VMPXlI3QFcV33zsIaHb2CIxwDIEi1HOcOJEWGivaaPU",
   "privateKey": "baRH8TATulxVneIJ-Dx186tfw3M7_1cBdl3roWTp5S4"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fMjGzRKdK60:APA91bHyjCSGe8FKDAyB_j1wE_xof4XNdIadlLVWa6cMXiBAl6A0vme7CLgo-1qzC_CDnvNEQBiurLknxoN72Fd9bPCIDDb2FnQj_wiyQ_NOx53DBHfPlAgf6egkJOntlXMSAQBkzkz6",
   "keys": {
       "p256dh": "BBLdDAw3VNvFLdL6ZmMHBukJhkTR9R9TTrsupwlvn1FKVP7ZXKhPyyqNzEZE/HMYz4kvzEYqYus0nJ088EWV3vk=",
       "auth": "NlfADdQxHKUqHliJd5lkfA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '716473890753',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);

 var admin = require("firebase-admin");

var serviceAccount = require("../api/stevensgamesdesign-firebase-adminsdk-r4fzg-d65f88f83d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stevensgamesdesign.firebaseio.com"
});


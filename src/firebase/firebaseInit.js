import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyAfUvoa_RA_PvCPDGmlSd3FM5Un3LorUYw",
  authDomain: "alloservice-12.firebaseapp.com",
  databaseURL: "https://alloservice-12.firebaseio.com",
  projectId: "alloservice-12",
  storageBucket: "alloservice-12.appspot.com",
  messagingSenderId: "449404898758"
};
firebase.initializeApp(config);

export default firebase;
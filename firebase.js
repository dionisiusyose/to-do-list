var firebaseConfig = {
  apiKey: "AIzaSyDI58tTQ-ygHkYwmsgEb8IGfElaGPZWuCw",
  authDomain: "to-do-list-6bad2.firebaseapp.com",
  projectId: "to-do-list-6bad2",
  storageBucket: "to-do-list-6bad2.appspot.com",
  messagingSenderId: "498502564877",
  appId: "1:498502564877:web:665a82aff06777f813e944",
  measurementId: "G-J8RBBGKEKH",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

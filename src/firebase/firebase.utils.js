import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDgqNq9qRM_OK6cCYeDI2ThUZfE6QUuDsw",
    authDomain: "crwn-db-e17fa.firebaseapp.com",
    databaseURL: "https://crwn-db-e17fa.firebaseio.com",
    projectId: "crwn-db-e17fa",
    storageBucket: "crwn-db-e17fa.appspot.com",
    messagingSenderId: "685719701296",
    appId: "1:685719701296:web:4092d42ef4200fa7772af5",
    measurementId: "G-2FTVEDS8Y3"
  };

export const createUserProfileDocument = async (userAuth, addtionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addtionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
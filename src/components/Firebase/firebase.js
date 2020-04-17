// Firebase Configuration
let config = {}

// Set Config based off environment
if (process.env.NODE_ENV === "development") {
  config = {
    apiKey: process.env.GATSBY_FIREBASE_API_KEY_DEV,
    authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN_DEV,
    databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL_DEV,
    projectId: process.env.GATSBY_FIREBASE_PROJECT_ID_DEV,
    storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET_DEV,
    messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID_DEV,
    appId: process.env.GATSBY_FIREBASE_APP_ID_DEV,
    measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID_DEV,
  }
} else {
  config = {
    apiKey: process.env.GATSBY_FIREBASE_API_KEY_PROD,
    authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN_PROD,
    databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL_PROD,
    projectId: process.env.GATSBY_FIREBASE_PROJECT_ID_PROD,
    storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET_PROD,
    messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID_PROD,
    appId: process.env.GATSBY_FIREBASE_APP_ID_PROD,
    measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID_PROD,
  }
}

class Firebase {
  constructor(app) {
    app.initializeApp(config)

    /* Helper */

    this.serverValue = app.firestore.ServerValue
    this.emailAuthProvider = app.auth.EmailAuthProvider

    /* Firebase APIs */

    this.auth = app.auth()
    this.db = app.firestore()

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider()
    // this.facebookProvider = new app.auth.FacebookAuthProvider()
    // this.twitterProvider = new app.auth.TwitterAuthProvider()
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignInWithGoogle = () => this.auth.signInWithRedirect(this.googleProvider)

  // doSignInWithFacebook = () => this.auth.signInWithRedirect(this.facebookProvider)

  // doSignInWithTwitter = () => this.auth.signInWithRedirect(this.twitterProvider)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.GATSBY_FIREBASE_CONFIRMATION_EMAIL_REDIRECT,
    })

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(doc => {
            const dbUser = doc.data()

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              roles: {},
              ...dbUser,
            }

            next(authUser)
          })
      } else {
        fallback()
      }
    })

  // *** User API ***

  user = uid => this.db.collection("users").doc(uid)

  users = () => this.db.collection("users")
}

let firebase

function getFirebase(app, auth, database) {
  if (!firebase) {
    firebase = new Firebase(app, auth, database)
  }

  return firebase
}

export default getFirebase

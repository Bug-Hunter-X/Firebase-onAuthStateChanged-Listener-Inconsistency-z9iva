Instead of solely relying on `onAuthStateChanged`, implement a mechanism to check the authentication status during app initialization and after any network recovery.  This can be done by adding a separate call to `onAuthStateChanged` inside the app's startup logic, or using Firebase's `currentUser` property to check for immediate authentication status.

```javascript
//firebaseBugSolution.js
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check authentication status on app startup
const checkAuthStatus = () => {
  const user = auth.currentUser;
  if (user) {
    // User is signed in
    console.log('User is signed in:', user);
  } else {
    console.log('User is signed out.');
  }
};

// Handle redirect result if it exists
getRedirectResult(auth).then((result) => {
  if (result) {
    // Handle redirect result
    console.log('Redirect result:', result);
  }
}).catch((error) => {
  console.error('Error handling redirect result:', error);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log('User signed in:', uid);
  } else {
    // User is signed out
    console.log('User signed out');
  }
});

checkAuthStatus();
```
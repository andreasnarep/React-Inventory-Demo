import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUqcFH5Psm3GWFMhnIXdcFHIQuDqiMtkg",
  authDomain: "inventory-management-13815.firebaseapp.com",
  projectId: "inventory-management-13815",
  storageBucket: "inventory-management-13815.appspot.com",
  messagingSenderId: "963750470134",
  appId: "1:963750470134:web:7597c0df08e808bf5167d7",
  measurementId: "G-0LVBM00VS8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase authentication
const auth = getAuth(firebaseApp);

export { auth };
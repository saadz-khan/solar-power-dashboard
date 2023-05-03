import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function InitializeFirebase() 
{
  const firebaseConfig = {
    apiKey: "AIzaSyBlBJere391kuVBCClLIRIR3HInE0P1rFo",
    authDomain: "weather-1609.firebaseapp.com",
    databaseURL: "https://weather-1609-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "weather-1609",
    storageBucket: "weather-1609.appspot.com",
    messagingSenderId: "1082323021813",
    appId: "1:1082323021813:web:8ee8346547461f8a68babc",
  };

  const app = initializeApp(firebaseConfig, "app1");
  return getDatabase(app);
}

function InitializeFirebase1() 
{
  const firebaseConfig1 = {
    apiKey: "AIzaSyDHv-sXK86jCKyguuzHXoIUNL3M7tF-CYA",
    authDomain: "esp-firebase-demo-103cc.firebaseapp.com",
    databaseURL: "https://esp-firebase-demo-103cc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "esp-firebase-demo-103cc",
    storageBucket: "esp-firebase-demo-103cc.appspot.com",
    messagingSenderId: "686175872937",
    appId: "1:686175872937:web:b2a8d9f1878f093cc306b8",
  };

  const app = initializeApp(firebaseConfig1, "app2");
  return getDatabase(app);
}

export { InitializeFirebase, InitializeFirebase1 };
export default { InitializeFirebase, InitializeFirebase1 };
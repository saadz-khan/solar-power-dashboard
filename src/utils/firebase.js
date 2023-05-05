import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getData } from "./data";

function InitializeFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBlBJere391kuVBCClLIRIR3HInE0P1rFo",
    authDomain: "weather-1609.firebaseapp.com",
    databaseURL:
      "https://weather-1609-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "weather-1609",
    storageBucket: "weather-1609.appspot.com",
    messagingSenderId: "1082323021813",
    appId: "1:1082323021813:web:8ee8346547461f8a68babc",
  };

  const app = initializeApp(firebaseConfig, "app1");
  return getDatabase(app);
}

function InitializeFirebase1() {
  const firebaseConfig1 = {
    apiKey: "AIzaSyDHv-sXK86jCKyguuzHXoIUNL3M7tF-CYA",
    authDomain: "esp-firebase-demo-103cc.firebaseapp.com",
    databaseURL:
      "https://esp-firebase-demo-103cc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "esp-firebase-demo-103cc",
    storageBucket: "esp-firebase-demo-103cc.appspot.com",
    messagingSenderId: "686175872937",
    appId: "1:686175872937:web:b2a8d9f1878f093cc306b8",
  };

  const app = initializeApp(firebaseConfig1, "app2");
  return getDatabase(app);
}

function initializeControlsFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyAGoAjeqVXzMs6yOs3SvOgB-YyodgdXwv8",
    authDomain: "home-auto-63cb7.firebaseapp.com",
    databaseURL: "https://home-auto-63cb7-default-rtdb.firebaseio.com",
    projectId: "home-auto-63cb7",
    storageBucket: "home-auto-63cb7.appspot.com",
    messagingSenderId: "914085336744",
    appId: "1:914085336744:web:33d3083fa3379ad7cd149d",
    measurementId: "G-CHY9MHM47L",
  };

  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

export { InitializeFirebase, InitializeFirebase1, initializeControlsFirebase };

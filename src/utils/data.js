import { onValue, ref } from "firebase/database";
import { InitializeFirebase } from "./firebase";
import { CONTROL_CONNECTION_DETAILS, POWER_CONNECTION_DETAILS, WEATHER_CONNECTION_DETAILS } from "./config";

export const getData = () => {
  return new Promise((resolve, reject) => {
    const db = InitializeFirebase(WEATHER_CONNECTION_DETAILS, "app1");
    const dbRef = ref(db);

    onValue(dbRef, (snapshot) => {
      let dummyData = [];
      snapshot.forEach((child) => {
        let childData = child.val();
        dummyData.push(childData);
      });
      resolve(dummyData.reverse());
    });
  });
};

export const getPowerData = () => {
  return new Promise((resolve, reject) => {
    const db = InitializeFirebase(POWER_CONNECTION_DETAILS, "app2");
    const dbRef = ref(db);

    onValue(dbRef, (snapshot) => {
      let dummyData = [];
      snapshot.forEach((child) => {
        let childData = child.val();
        dummyData.push(childData);
      });
      resolve(dummyData.reverse());
    });
  });
};

export const getControlsData = () => {
  return new Promise((resolve, reject) => {

    const db = InitializeFirebase(CONTROL_CONNECTION_DETAILS);
    const dbRef = ref(db);

    onValue(dbRef, (snapshot) => {
      let dummyData = [];
      snapshot.forEach((child) => {
        let childData = child.val();
        dummyData.push(childData);
      });
      resolve(dummyData.reverse());
    });
  })
}
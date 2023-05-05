import { onValue, ref } from "firebase/database";
import { InitializeFirebase, InitializeFirebase1, initializeControlsFirebase } from "./firebase";

export const getData = () => {
  return new Promise((resolve, reject) => {
    const db = InitializeFirebase();
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
    const db = InitializeFirebase1();
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

    const db = initializeControlsFirebase();
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
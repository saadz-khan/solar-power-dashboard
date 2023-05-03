import React, { useEffect, useState } from "react";
import { InitializeFirebase, InitializeFirebase1 } from "./firebase";
import { ref, onValue } from "firebase/database";

const db = InitializeFirebase();
const db1 = InitializeFirebase1();

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dbRef = ref(db);
    onValue(dbRef, (snapshot) => {
      let dummyData = [];
      snapshot.forEach((child) => {
        let childId = child.key;
        let childData = child.val();
        dummyData.push({ Id: childId, data: childData });
      });
      setData(dummyData);

      dummyData.map((child, index) => {
        console.log(index, " : ", child);
      });
    });
  }, []);

  const [data1, setData1] = useState([]);

  useEffect(() => {
    const dbRef1 = ref(db1);
    onValue(dbRef1, (snapshot) => {
      let dummyData1 = [];
      snapshot.forEach((child) => {
        let childId1 = child.key;
        let childData1 = child.val();
        dummyData1.push({ Id: childId1, data: childData1 });
      });
      setData1(dummyData1);

      dummyData1.map((child, index) => {
        console.log(index, " : ", child);
      });
    });
  }, []);

  
  return (
    <>
      {data?.map((child)=>
      {
        return (
          <div>
            <span>
              <h1>AMBIENT_TEMPERATURE : </h1>
              <h3>{child.data?.AMBIENT_TEMPERATURE}</h3>
            </span>
            <span>
              <h1>DATE_TIME : </h1>
              <h3>{child.data?.DATE_TIME}</h3>
            </span>
            <span>
              <h1>IRRADIATION : </h1>
              <h3>{child.data?.IRRADIATION}</h3>
            </span>
            <span>
              <h1>MODULE_TEMPERATURE : </h1>
              <h3>{child.data?.MODULE_TEMPERATURE}</h3>
            </span>
            <span>
              <h1>PLANT_ID : </h1>
              <h3>{child.data?.PLANT_ID}</h3>
            </span>
            <span>
              <h1>SOURCE_KEY : </h1>
              <h3>{child.data?.SOURCE_KEY}</h3>
            </span>
          </div>
          
        )
      })}
      
      {data1?.map((child)=>{
        return (
          <div>
            <span>
              <h1>AC_POWER : </h1>
              <h3>{child.data?.AC_POWER}</h3>
            </span>
            <span>
              <h1>DATE_TIME : </h1>
              <h3>{child.data?.DATE_TIME}</h3>
            </span>
            <span>
              <h1>DAILY_YIELD : </h1>
              <h3>{child.data?.DAILY_YIELD}</h3>
            </span>
            <span>
              <h1>DC_POWER : </h1>
              <h3>{child.data?.DC_POWER}</h3>
            </span>
            <span>
              <h1>PLANT_ID : </h1>
              <h3>{child.data?.PLANT_ID}</h3>
            </span>
            <span>
              <h1>TOTAL_YIELD : </h1>
              <h3>{child.data?.TOTAL_YIELD}</h3>
            </span>
            <span>
              <h1>SOURCE_KEY : </h1>
              <h3>{child.data?.SOURCE_KEY}</h3>
            </span>
          </div>
        )
      })}
    </>
  )
    }

  export default App;

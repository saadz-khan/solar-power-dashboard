import React, { useEffect, useState } from "react";
import { InitializeFirebase, InitializeFirebase1 } from "./firebase";
import { ref, onValue } from "firebase/database";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  Area,
} from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import OpacityIcon from "@material-ui/icons/Opacity";
import PowerIcon from "@material-ui/icons/Power";
import SpeedIcon from "@material-ui/icons/Speed";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import BatteryChargingFullIcon from "@material-ui/icons/BatteryChargingFull";


const useStyles = makeStyles({
  card: {
    minWidth: 275,
    textAlign: "center",
    display: "inline-block",
    margin: "10px",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


const App = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const formatChartData = (data, data1) => {
    const chartData = data.map((item) => {
      return {
        DATE_TIME: item.data.DATE_TIME,
        AMBIENT_TEMPERATURE: item.data.AMBIENT_TEMPERATURE,
        MODULE_TEMPERATURE: item.data.MODULE_TEMPERATURE,
        IRRADIATION: item.data.IRRADIATION,
        AC_POWER: data1.find((x) => x.data.DATE_TIME === item.data.DATE_TIME)?.data.AC_POWER,
        DC_POWER: data1.find((x) => x.data.DATE_TIME === item.data.DATE_TIME)?.data.DC_POWER,
      };
    });

  
    const chartData1 = data1.map((item) => {
      return {
        DATE_TIME: item.data.DATE_TIME,
        DAILY_YIELD: item.data.DAILY_YIELD,
        TOTAL_YIELD: item.data.TOTAL_YIELD,
      };
    });
  
    return { chartData, chartData1 };
  };

  useEffect(() => {
    const db = InitializeFirebase();
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

  useEffect(() => {
    const db1 = InitializeFirebase1();
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

  const { chartData, chartData1 } = formatChartData(data, data1);

  const classes = useStyles();

const latestData = data[data.length - 1]?.data;
const latestData1 = data1[data1.length - 1]?.data;

const latestIrradiation = latestData?.IRRADIATION;
const latestAmbientTemperature = latestData?.AMBIENT_TEMPERATURE;
const latestModuleTemperature = latestData?.MODULE_TEMPERATURE;
const latestAcPower = latestData1?.AC_POWER;
const latestDcPower = latestData1?.DC_POWER;
const latestDailyYield = latestData1?.DAILY_YIELD;
const latestTotalYield = latestData1?.TOTAL_YIELD;

const renderSummaryCard = (icon, title, value) => (
<Card className={classes.card}>
<CardContent>
{icon}
<Typography className={classes.title} color="textSecondary" gutterBottom>
{title}
</Typography>
<Typography variant="h5" component="h2">
{value}
</Typography>
</CardContent>
</Card>
);

return (
<>
<div>
{renderSummaryCard(<WbSunnyIcon />, "Irradiation", latestIrradiation)}
{renderSummaryCard(<AcUnitIcon />, "Ambient Temperature", latestAmbientTemperature)}
{renderSummaryCard(<SpeedIcon />, "Module Temperature", latestModuleTemperature)}
{renderSummaryCard(<PowerIcon />, "AC Power", latestAcPower)}
{renderSummaryCard(<PowerIcon />, "DC Power", latestDcPower)}
{renderSummaryCard(<BatteryChargingFullIcon />, "Daily Yield", latestDailyYield)}
{renderSummaryCard(<BatteryChargingFullIcon />, "Total Yield", latestTotalYield)}
</div>

<ResponsiveContainer width="100%" height={400}>
    <ComposedChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="DATE_TIME" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="AC_POWER" fill="#8884d8" />
      <Bar dataKey="DC_POWER" fill="#82ca9d" />
      <Line type="monotone" dataKey="AMBIENT_TEMPERATURE" stroke="#ff7300" />
      <Line type="monotone" dataKey="MODULE_TEMPERATURE" stroke="#fdd200" />
      <Line type="monotone" dataKey="IRRADIATION" stroke="#387908" />
    </ComposedChart>
  </ResponsiveContainer>

  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={chartData1} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="DATE_TIME" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="DAILY_YIELD" stroke="#8884d8" />
      <Line type="monotone" dataKey="TOTAL_YIELD" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
</>

);
};

export default App;
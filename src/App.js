import React, { useEffect, useState } from "react";
import { InitializeFirebase, InitializeFirebase1 } from "./firebase";
import { ref, onValue } from "firebase/database";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import SpeedIcon from "@material-ui/icons/Speed";
import PowerIcon from "@material-ui/icons/Power";
import BatteryChargingFullIcon from "@material-ui/icons/BatteryChargingFull";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";


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
  chartWrapper: {
    height: "400px",
    marginBottom: "50px",
  },
});


const App = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const formatChartData = (data, data1) => {
    const chartData = data?.map((item) => {
      return {
        DATE_TIME: item.data.DATE_TIME,
        AMBIENT_TEMPERATURE: item.data.AMBIENT_TEMPERATURE,
        MODULE_TEMPERATURE: item.data.MODULE_TEMPERATURE,
        IRRADIATION: item.data.IRRADIATION,
        AC_POWER: data1.find((x) => x.data.DATE_TIME === item.data.DATE_TIME)?.data.AC_POWER,
        DC_POWER: data1.find((x) => x.data.DATE_TIME === item.data.DATE_TIME)?.data.DC_POWER,
      };
    });

  
    const chartData1 = data1?.map((item) => {
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
    });
  }, []);


  const renderChart = (chartData, chartData1) => (
    <>
      <div style={{ height: 400 }}>
        <ResponsiveBar
          data={[{AC_POWER: 1, DC_POWER: 2}, {AC_POWER: 4, DC_POWER: 6}]}
          keys={["AC_POWER", "DC_POWER"]}
          indexBy="DATE_TIME"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Date Time",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Power",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
            },
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
      <div style={{ height: 400 }}>
        {/* <ResponsiveLine
          data={chartData1 ?? []}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Date Time",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Yield",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          colors={{ scheme: "nivo" }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        /> */}
      </div>
      </>
    );
        

  const { chartData, chartData1 } = formatChartData(data, data1);
  console.log(chartData1)


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
    {renderChart(chartData, chartData1)}
  </>
);
};

export default App;
import React, { useEffect, useMemo, useState } from "react";
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

import TEST_DATA from "./test_data.json";

const CHART_SIZE = 10;

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
  const [powerData, setPowerData] = useState([])
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const db = InitializeFirebase();
    const dbRef = ref(db);
    onValue(dbRef, (snapshot) => {
      let dummyData = [];
      snapshot.forEach((child) => {
        let childData = child.val();
        dummyData.push(childData);
      });
      setData(dummyData.reverse());
    });
  }, []);

  useEffect(() => {
    const db1 = InitializeFirebase1();
    const dbRef1 = ref(db1);
    onValue(dbRef1, (snapshot) => {
      let dummyData1 = [];
      snapshot.forEach((child) => {
        let childData1 = child.val();
        dummyData1.push(childData1);
      });
      setPowerData(dummyData1.reverse());
    });
  }, []);

  const handleChartBack = () => {
    if (offset > 0 && offset >= CHART_SIZE) {
      setOffset(offset - CHART_SIZE);
    } else if (offset > 0) {
      setOffset(0);
    }
  };
  const handleChartForward = () => {
    if (offset < data.length - CHART_SIZE) {
      setOffset(offset + 10);
    } else {
      setOffset(data.length - CHART_SIZE);
    }
  };
  console.log(offset);

  const chartData = useMemo(() => {
    const slicedData = data.slice(offset, offset + CHART_SIZE);
    return [
      {
        id: "Ambient Temperature",
        color: "hsl(306, 70%, 50%)",
        data: slicedData.map((item, index) => ({
          x: item.DATE_TIME,
          y: item.AMBIENT_TEMPERATURE,
        })),
      },
      {
        id: "Module Temperature",
        color: "hsl(234, 70%, 50%)",
        data: slicedData.map((item, index) => ({
          x: item.DATE_TIME,
          y: item.MODULE_TEMPERATURE,
        })),
      },
      {
        id: "Solar Irradiation",
        color: "hsl(292, 70%, 50%)",
        data: slicedData.map((item) => ({
          x: item.DATE_TIME,
          y: item.IRRADIATION,
        })),
      },
    ];
  }, [data, offset]);

  const classes = useStyles();

  const renderSummaryCard = (icon, title, value) => (
    <Card className={classes.card}>
      <CardContent>
        {icon}
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
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
      {renderSummaryCard(<WbSunnyIcon />, "Irradiation", data[0]?.IRRADIATION ?? '-')}
      {renderSummaryCard(<AcUnitIcon />, "Ambient Temperature", data[0]?.AMBIENT_TEMPERATURE ?? '-')}
      {renderSummaryCard(<SpeedIcon />, "Module Temperature", data[0]?.MODULE_TEMPERATURE ?? '-')}
      {renderSummaryCard(<PowerIcon />, "AC Power", powerData[0]?.AC_POWER ?? '-')}
      {renderSummaryCard(<PowerIcon />, "DC Power", powerData[0]?.DC_POWER ?? '-')}
      {renderSummaryCard(<BatteryChargingFullIcon />, "Daily Yield", powerData[0]?.DAILY_YIELD ?? '-')}
      {renderSummaryCard(<BatteryChargingFullIcon />, "Total Yield", powerData[0]?.TOTAL_YIELD ?? '-')}
    </div>
      <div className="chart-wrapper">
        <button onClick={handleChartBack}>Back</button>
        <button onClick={handleChartForward}>Forward</button>
        <div style={{ height: 400 }}>
          <ResponsiveLine
            data={chartData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "time", format: "%d/%m/%Y %H:%M" }} //05/15/2020 0:00
            xFormat="time:%Y-%m-%dT%H:%M:%S.%L%Z"
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Time",
              format: "%d-%m-%Y %H:%M",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "count",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
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
          />
        </div>{" "}
      </div>
    </>
  );
};

export default App;

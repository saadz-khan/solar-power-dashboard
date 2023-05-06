import React, { useEffect, useState } from "react";
import { SummaryCards } from "./components/SummaryCards";
import { TemperatureChart } from "./components/TemperatureChart";
import { DailyYieldChart } from "./components/DailyYieldChart";
import { PowerChart } from "./components/PowerChart";
import {
  getControlsData,
  getData,
  getPowerData,
  pushControlsData,
} from "./utils/data";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { MenuBook } from "@material-ui/icons";

import "./App.css";
import { Alerts } from "./components/Alerts";
import { Controls } from "./components/Controls";
import { Loading } from "./components/Loading";

const App = () => {
  const [data, setData] = useState([]);
  const [powerData, setPowerData] = useState([]);
  const [latestControlsData, setLatestControlsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const data = await getData();
    const powerData = await getPowerData();
    const controlsData = await getControlsData();
    setData(data);
    setPowerData(powerData);
    setLatestControlsData(controlsData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChangeControlsData = (data) => {
    setLoading(true);
    pushControlsData(data).then(() => {
      setLoading(false);
      setLatestControlsData(data);
    });
  };
  console.log(latestControlsData);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuBook />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SOLAR POWER DASHBOARD
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {loading ? (
        <Loading />
      ) : (
        <Box margin={2} marginTop={2}>
          {latestControlsData && (
            <Controls
              data={latestControlsData}
              onChangeControlsData={handleChangeControlsData}
            />
          )}

          {latestControlsData && latestControlsData.ManualOverride === "0" && (
            <Alerts latestControlsData={latestControlsData} />
          )}

          <SummaryCards powerData={powerData} data={data} />
          <TemperatureChart data={data} />
          <Box style={{ display: "flex" }}>
            <Box flexGrow={1}>
              <DailyYieldChart powerData={powerData} />
            </Box>
            <Box flexGrow={1}>
              <PowerChart powerData={powerData} />
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default App;

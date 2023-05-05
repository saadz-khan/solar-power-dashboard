import React, { useEffect, useState } from "react";
import { SummaryCards } from "./components/SummaryCards";
import { TemperatureChart } from "./components/TemperatureChart";
import { DailyYieldChart } from "./components/DailyYieldChart";
import { PowerChart } from "./components/PowerChart";
import { getControlsData, getData, getPowerData } from "./utils/data";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { MenuBook } from "@material-ui/icons";

import "./App.css";
import { Alerts } from "./components/Alerts";
import { Controls } from "./components/Controls";

const App = () => {
  const [data, setData] = useState([]);
  const [powerData, setPowerData] = useState([]);
  const [latestControlsData, setLatestControlsData] = useState(null);

  useEffect(() => {
    getData().then(setData);
    getPowerData().then(setPowerData);
    getControlsData().then((data) => {
      setLatestControlsData(data);
    });
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }} marginBottom={2}>
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
      <Box margin={2}>
        {latestControlsData && <Controls data={latestControlsData} />}

        {latestControlsData && latestControlsData[1] === "0" && (
          <Alerts latestControlsData={latestControlsData} />
        )}

        <SummaryCards powerData={powerData} data={data} />
        <TemperatureChart data={data} />
        <DailyYieldChart powerData={powerData} />
        <PowerChart powerData={powerData} />
      </Box>
    </div>
  );
};

export default App;

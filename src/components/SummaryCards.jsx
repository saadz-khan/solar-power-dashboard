import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import {
  AcUnit,
  BatteryChargingFull,
  Power,
  Speed,
  WbSunny,
} from "@material-ui/icons";

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
});

export const SummaryCards = (props) => {
  const { powerData, data } = props;

  return (
  <div>
    <SummaryCard
      icon={<WbSunny />}
      title="Irradiation"
      value={data[0]?.IRRADIATION ?? "-"}
    />
    <SummaryCard
      icon={<AcUnit />}
      title="Ambient Temperature"
      value={data[0]?.AMBIENT_TEMPERATURE ?? "-"}
    />
    <SummaryCard
      icon={<Speed />}
      title="Module Temperature"
      value={data[0]?.MODULE_TEMPERATURE ?? "-"}
    />
    <SummaryCard
      icon={<Power />}
      title="AC Power"
      value={powerData[0]?.AC_POWER ?? "-"}
    />
    <SummaryCard
      icon={<Power />}
      title="DC Power"
      value={powerData[0]?.DC_POWER ?? "-"}
    />
    <SummaryCard
      icon={<BatteryChargingFull />}
      title="Daily Yield"
      value={powerData[0]?.DAILY_YIELD ?? "-"}
    />
    <SummaryCard
      icon={<BatteryChargingFull />}
      title="Total Yield"
      value={powerData[0]?.TOTAL_YIELD ?? "-"}
    />
  </div>
  )
};

const SummaryCard = (props) => {
  const { icon, title, value } = props;

  const classes = useStyles()

  return (
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
  )
};

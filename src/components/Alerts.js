import { Box } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useMemo } from "react";

const getPriority = (recString) => {
  if (recString.toLowerCase().match(/(high|highest)/)) {
    return "error";
  } else if (recString.toLowerCase().match(/low/)) {
    return "info";
  } else return "warning";
};

export const Alerts = (props) => {
  const { latestControlsData } = props;

  const recommendations = useMemo(() => {
    const recStrings = latestControlsData[6].split(".");
    recStrings.pop();
    return recStrings.map((recString) => ({
      text: recString,
      severity: getPriority(recString),
    }));
  }, [latestControlsData]);
  console.log(recommendations);

  return (
    <>
      {recommendations.map((recommendation) => (
        <Box margin={1}>
          <Alert severity={recommendation.severity}>
            {/* <AlertTitle>
              <b>Recommendation</b>
            </AlertTitle> */}
            {recommendation.text}
          </Alert>
        </Box>
      ))}
    </>
  );
};

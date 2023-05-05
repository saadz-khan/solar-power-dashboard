import { Box, Card, CardContent, Switch, Typography } from "@material-ui/core";
import { useMemo } from "react";

export const Controls = (props) => {
   const {data} = props

   const manualOverride = useMemo(() => {
	return data[1] === "1"
   }, [data])

  return (
    <Box margin={1} marginBottom={3}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Box marginX={3}>
              <Typography>Manual Override</Typography>
              <Switch />
            </Box>
            <Box marginX={3}>
              <Typography>Load 1</Typography>
              <Switch disabled={!manualOverride} />
            </Box>
            <Box marginX={3}>
              <Typography>Load 2</Typography>
              <Switch disabled={!manualOverride} />
            </Box>
            <Box marginX={3}>
              <Typography>Load 3</Typography>
              <Switch disabled={!manualOverride} />
            </Box>
            <Box marginX={3}>
              <Typography>Load 4</Typography>
              <Switch disabled={!manualOverride} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

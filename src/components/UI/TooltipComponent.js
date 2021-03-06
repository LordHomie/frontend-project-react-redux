import React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { StyledEngineProvider } from "@mui/material/styles";

function TooltipComponent(props) {
  return (
    <StyledEngineProvider injectFirst>
      <Tooltip title={props.passwordRules} placement="top">
        <Box style={{ display: "inline" }}>{props.children}</Box>
      </Tooltip>
    </StyledEngineProvider>
  );
}

export default TooltipComponent;

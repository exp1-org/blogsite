import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { AlertTitle } from "@mui/material";
const Alertt = ({ message, AlertCloseHandler, open }) => {
  const errorMsg = () => {
    if (message.includes("update this blog")) {
      return "you are not authorized to update this blog!";
    }
    return message;
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Collapse in={open}>
          <Alert
            severity="error"
            variant="filled"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  AlertCloseHandler();
                }}
              >
                <CloseIcon fontSize="error" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {errorMsg()}
          </Alert>
        </Collapse>
      </Box>
    </>
  );
};

export default Alertt;

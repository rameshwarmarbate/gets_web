import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { usePostData } from "../../utils/api";
import { Loader } from "../../components";

function ForgotPassword({ open, handleClose, showToast }) {
  const mutation = usePostData("salesperson/request-reset");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const handleSubmit = (event) => {
    const email = document.getElementById("email1");

    if (validateInputs()) {
      mutation
        .mutateAsync({
          email: email.value,
        })
        .then(({ data }) => {
          showToast();
          handleClose();
        })
        .catch((error) => {
          setEmailError(true);
          setEmailErrorMessage(error?.message);
        });
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email1");
    let isValid = true;
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    return isValid;
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <Loader loading={mutation.isLoading} />
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a
          link to reset your password.
        </DialogContentText>
        <FormControl>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            autoFocus
            required
            // margin="dense"
            id="email1"
            name="email"
            label="Email address"
            placeholder="Email address"
            type="email"
            autoComplete="email"
            fullWidth
            color={emailError ? "error" : "primary"}
            sx={{ ariaLabel: "email" }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleSubmit()
              }
            }}
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ForgotPassword;

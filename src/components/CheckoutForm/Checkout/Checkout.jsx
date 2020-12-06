import React, { useState } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import DetailsForm from "../DetailsForm";
import PaymentForm from "../PaymentForm";

// form steps
const steps = ["Shipping Address", "Payment Details"];

const Checkout = () => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(1);

  //   confirmation
  const Confirmation = () => {
    return <div>Confirmation</div>;
  };

  //   active steps checker
  const Form = () => (activeStep === 0 ? <DetailsForm /> : <PaymentForm />);

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;

import React, { useState, useEffect } from "react";
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
// commerce api
import { commerce } from "../../../data/commerce";

// form steps
const steps = ["Shipping Address", "Payment Details"];

const Checkout = ({ cart }) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);

  // creating checkout token
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        console.log(token);
        setCheckoutToken(token);
      } catch (err) {}
    };
    generateToken();
  }, [cart]);

  //   confirmation
  const Confirmation = () => {
    return <div>Confirmation</div>;
  };

  //   active steps checker
  const Form = () =>
    activeStep === 0 ? (
      <DetailsForm checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );

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
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;

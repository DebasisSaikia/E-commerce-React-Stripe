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

const Checkout = ({ cart, order, onCheckout, error }) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  // creating checkout token
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (err) {}
    };
    generateToken();
  }, [cart]);

  // moving active steps further:
  const nextStep = () => {
    setActiveStep((previousStep) => previousStep + 1);
  };
  const backStep = () => {
    setActiveStep((previousStep) => previousStep - 1);
  };

  // implement next button after checkout form
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  //   confirmation
  const Confirmation = () => {
    return (
      <>
        <div>
          <Typography variant="h5" >Thank you for your purchase firstName,lastname</Typography>
          <Divider className={classes.divide} />
        </div>
      </>
    );
  };

  //   active steps checker
  const Form = () =>
    activeStep === 0 ? (
      <DetailsForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCheckout={onCheckout}
      />
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

import React, { useEffect, useState } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import CustomInput from "./CustomTextField";
// api importing
import { commerce } from "../../data/commerce";

const DetailsForm = ({ checkoutToken }) => {
  const methods = useForm();

  // states for select input
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  // mapping the countries array with the keys
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  // mapping subdivision
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  // looping options to map
  const options = setShippingOptions.map((sOpt) => ({
    id: sOpt.id,
    label: `${sOpt.description}-(${sOpt.price.formatted_with_symbol})`,
  }));

  // fetching shipping details from commerce api
  const fetchCountries = async (checkoutId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutId
    );
    console.log(countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]); //coverting object of countries in Array .Eg-Us,Uk,In
  };

  // fetching subdivisions
  const fetchSubdivision = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  // fetching shipping options
  const fetchOptions = async (checkoutId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutId, {
      country,
      region,
    });
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  // run the checkout method with id immediately after render
  useEffect(() => {
    fetchCountries(checkoutToken.id);
  }, []);

  // calling subdivision
  useEffect(() => {
    if (shippingCountry) fetchSubdivision(shippingCountry);
  }, [shippingCountry]);

  // runs after subdivsion changes
  useEffect(() => {
    if (shippingSubdivision)
      fetchOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <CustomInput name="firstName" label="First Name" />
            <CustomInput name="lastName" label="Last Name" />
            <CustomInput name="address1" label="Address" />
            <CustomInput name="email" label="Email" />
            <CustomInput name="City" label="City" />
            <CustomInput name="ZIP" label="Zip Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Region</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping SubDivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default DetailsForm;

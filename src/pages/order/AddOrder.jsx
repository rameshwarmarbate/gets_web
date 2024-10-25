import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Loader } from "../../components";
import { useGetData } from "../../utils/api";

const initialStates = {
  firstName: "",
  lastName: "",
  mobileNo: "",
  email: "",
  address: "",
  pinCode: "",
  city: "",
  state: "",
  country: "",
  selectedProduct: "",
  quantity: "",
  unitPrice: "",
  gstNo: "",
};
const fetchLocationByPinCode = async (pinCode) => {
  try {
    const response = await fetch(`http://api.zippopotam.us/in/${pinCode}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return {
      city: data.places ? data.places[0]["place name"] : "",
      state: data.places ? data.places[0]["state"] : "",
      country: data["country"] || "",
    };
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
};

export default function AddOrderModal({ open, handleClose }) {
  const [orderData, setOrderData] = useState(initialStates);

  const [error, setErrors] = useState(initialStates);
  const [isLoading, setLoading] = useState(false);
  const { data, isLoading: loading } = useGetData(
    "device/get-device-by-name?name=Electric Hot Water Bag"
  );
  useEffect(() => {
    const { pinCode } = orderData;
    if (pinCode.length === 6) {
      setLoading(true);
      fetchLocationByPinCode(pinCode).then((data) => {
        if (data) {
          setOrderData((prevState) => ({
            ...prevState,
            city: data.city || "",
            state: data.state || "",
            country: data.country || "",
          }));
        }
        setLoading(false);
      });
    }
  }, [orderData.pinCode]);

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({ orderData });
    handleClose(); // Close the modal after submission
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add Order</DialogTitle>
      <Divider />
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <Loader loading={isLoading || loading} />
        <Typography level="h6">Customer Details</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <FormControl>
            <TextField
              id="first-name"
              required
              autoFocus
              autoComplete="first-name"
              size="small"
              margin="dense"
              name="firstName"
              label="First Name"
              placeholder="First Name"
              type="text"
              fullWidth
              error={!!error.firstName}
              helperText={error.firstName}
              sx={{ ariaLabel: "first-name" }}
              color={error.firstName ? "error" : "primary"}
              value={orderData.firstName}
              onChange={handleOrderChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="last-name"
              required
              autoComplete="last-name"
              size="small"
              margin="dense"
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              type="text"
              fullWidth
              error={!!error.lastName}
              helperText={error.lastName}
              sx={{ ariaLabel: "last-name" }}
              color={error.lastName ? "error" : "primary"}
              value={orderData.lastName}
              onChange={handleOrderChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="mobile-number"
              required
              autoComplete="mobile-number"
              size="small"
              margin="dense"
              name="mobileNo"
              label="Mobile No"
              placeholder="Mobile No"
              type="tel"
              fullWidth
              error={!!error.mobileNo}
              helperText={error.mobileNo}
              sx={{ ariaLabel: "mobile-number" }}
              color={error.mobileNo ? "error" : "primary"}
              value={orderData.mobileNo}
              inputMode="tel"
              onChange={handleOrderChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="email"
              autoComplete="email"
              size="small"
              margin="dense"
              name="email"
              label="Email Id"
              placeholder="Email Id"
              type="email"
              fullWidth
              error={!!error.email}
              helperText={error.email}
              sx={{ ariaLabel: "email" }}
              color={error.email ? "error" : "primary"}
              value={orderData.email}
              onChange={handleOrderChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="address"
              autoComplete="address"
              size="small"
              margin="dense"
              name="address"
              label="Address"
              placeholder="Address"
              type="text"
              rows={2}
              fullWidth
              error={!!error.address}
              helperText={error.address}
              sx={{ ariaLabel: "address" }}
              color={error.address ? "error" : "primary"}
              value={orderData.address}
              onChange={handleOrderChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="pin-code"
              autoComplete="pin-code"
              size="small"
              margin="dense"
              name="pinCode"
              label="Pin Code"
              placeholder="Pin Code"
              type="number"
              fullWidth
              error={!!error.pinCode}
              helperText={error.pinCode}
              sx={{ ariaLabel: "pin-code" }}
              color={error.pinCode ? "error" : "primary"}
              value={orderData.pinCode}
              inputMode="numeric"
              onChange={handleOrderChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="city"
              autoComplete="city"
              size="small"
              margin="dense"
              name="city"
              label="City"
              placeholder="City"
              type="text"
              fullWidth
              error={!!error.city}
              helperText={error.city}
              sx={{ ariaLabel: "city" }}
              color={error.city ? "error" : "primary"}
              value={orderData.city}
              onChange={handleOrderChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="state"
              autoComplete="state"
              size="small"
              margin="dense"
              name="state"
              label="State"
              placeholder="State"
              type="text"
              fullWidth
              error={!!error.state}
              helperText={error.state}
              sx={{ ariaLabel: "state" }}
              color={error.state ? "error" : "primary"}
              value={orderData.state}
              onChange={handleOrderChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="country"
              autoComplete="country"
              size="small"
              margin="dense"
              name="country"
              label="Country"
              placeholder="Country"
              type="text"
              fullWidth
              error={!!error.country}
              helperText={error.country}
              sx={{ ariaLabel: "country" }}
              color={error.country ? "error" : "primary"}
              value={orderData.country}
              onChange={handleOrderChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="gstNo"
              autoComplete="gstNo"
              size="small"
              margin="dense"
              name="gstNo"
              label="GST No"
              placeholder="GST No"
              type="text"
              fullWidth
              error={!!error.gstNo}
              helperText={error.gstNo}
              sx={{ ariaLabel: "gstNo" }}
              color={error.gstNo ? "error" : "primary"}
              value={orderData.gstNo}
              onChange={handleOrderChange}
            />
          </FormControl>
        </Box>
        <Typography level="h6">Product Details</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Autocomplete
            id="product"
            name="selectedProduct"
            size="small"
            autoComplete
            autoSelect
            fullWidth
            options={data}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Product"
                placeholder="Select Product"
                value={orderData.selectedProduct}
                onChange={handleOrderChange}
              />
            )}
            getOptionLabel={(option) => option.title}
          />
          <FormControl>
            <TextField
              id="quantity"
              autoComplete="quantity"
              size="small"
              margin="dense"
              name="quantity"
              label="Quantity"
              placeholder="Quantity"
              type="number"
              fullWidth
              error={!!error.quantity}
              helperText={error.quantity}
              sx={{ ariaLabel: "quantity" }}
              color={error.quantity ? "error" : "primary"}
              value={orderData.quantity}
              inputMode="numeric"
              onChange={handleOrderChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="unit-price"
              autoComplete="unit-price"
              size="small"
              margin="dense"
              name="unitPrice"
              label="Unit Price"
              placeholder="Unit Price"
              type="number"
              fullWidth
              inputMode="decimal"
              error={!!error.unitPrice}
              helperText={error.unitPrice}
              sx={{ ariaLabel: "unit-price" }}
              color={error.unitPrice ? "error" : "primary"}
              value={orderData.unitPrice}
              onChange={handleOrderChange}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled>
          Save & Whatsapp
        </Button>
      </DialogActions>
    </Dialog>
  );
}

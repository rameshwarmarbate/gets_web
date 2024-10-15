import React, { useState } from 'react';
import { Modal, ModalDialog, DialogTitle, DialogContent, DialogActions } from '@mui/joy';
import { Box, TextField, Select, Option, Button, Typography, Divider } from '@mui/joy';

export default function AddOrderModal({ open, handleClose }) {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    address: '',
    pinCode: ''
  });

  const [productData, setProductData] = useState({
    selectedProduct: '',
    quantity: '',
    unitPrice: ''
  });

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({ customerData, productData });
    handleClose(); // Close the modal after submission
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog variant="outlined" role="dialog">
        <DialogTitle>Add Order</DialogTitle>
        <Divider />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography level="h6">Customer Details</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              label="First Name"
              name="firstName"
              value={customerData.firstName}
              onChange={handleCustomerChange}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={customerData.lastName}
              onChange={handleCustomerChange}
            />
            <TextField
              label="Mobile No"
              name="mobileNo"
              value={customerData.mobileNo}
              onChange={handleCustomerChange}
            />
            <TextField
              label="Email ID"
              name="email"
              value={customerData.email}
              onChange={handleCustomerChange}
            />
            <TextField
              label="Address"
              name="address"
              value={customerData.address}
              onChange={handleCustomerChange}
            />
            <TextField
              label="Pin Code"
              name="pinCode"
              value={customerData.pinCode}
              onChange={handleCustomerChange}
            />
          </Box>

          <Typography level="h6">Product Details</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Select
              label="Select Product"
              name="selectedProduct"
              value={productData.selectedProduct}
              onChange={handleProductChange}
            >
              <Option value="Product1">Product 1</Option>
              <Option value="Product2">Product 2</Option>
              <Option value="Product3">Product 3</Option>
            </Select>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={productData.quantity}
              onChange={handleProductChange}
            />
            <TextField
              label="Unit Price"
              name="unitPrice"
              type="number"
              value={productData.unitPrice}
              onChange={handleProductChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}

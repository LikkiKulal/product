import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Input, Switch, FormControlLabel, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './popup.css'; // Make sure to create a CSS file for the styles

const Assign = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProceedNext = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="p1app">
      

      <div className="p1main">
     
      </div>

      <div className="phase3">
        <div className="p3head">
          Dashboard /
          <span className='sub'>Make Payments</span>
        </div>
        <div className="phase3payment">
          <div className="phase3form">
            <h2 className="phase3title">Enter Customer Mobile Number</h2>
            <p className="phase3subtitle">
              Enter Customer mobile number to access the payment page
            </p>
            <Input
              type="text"
              className="phase3input"
              placeholder="Enter Mobile Number"
              fullWidth
            />
            <div className="phase3divider">
              <img src='/divider.svg' alt='' />
            </div>
            <h2 className="phase3title">Enter Total Amount</h2>
            <p className="phase3subtitle">
              Enter the total amount that you want to collect from the customer
            </p>
            <Input
              type="text"
              className="phase3input"
              placeholder="₹ Enter the Amount"
              fullWidth
            />
            <Button variant="contained" color="primary" className="phase3button" onClick={handleProceedNext}>
              Proceed Next
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
  <DialogTitle>
    <Typography variant="h6">Payment Details</Typography>
    <IconButton
      aria-label="close"
      onClick={handleCloseDialog}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent dividers sx={{
    borderTop: 'none', // Remove top border
    borderBottom: "none",
  }}
>
 
  <Box sx={{ p: 2, backgroundColor: '#fff2f4', borderRadius: 3, mb: 2 }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E0E0E0', paddingBottom: '8px' }}>
    <Typography variant="body1" gutterBottom>
      My XCoins <span style={{ color: '#A1A1A1', fontSize: '0.875rem' }}>(1 XCoins = ₹1 Rupee)</span>
    </Typography>
    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', marginLeft: 1 }}>
      50 <img src='/coin.svg' alt='coin' style={{ marginLeft: 8 }} />
    </Typography>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px' }}>
    <Typography variant="body1" gutterBottom>Convert Your XCoins into Cash for ₹50</Typography>
    <FormControlLabel
      label=""
      control={<Switch color="primary" />}
      sx={{ mt: 1 }}
    />
  </div>
</Box>


<Box sx={{ p: 2, backgroundColor: '#fff2f4', borderRadius: 3 }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E0E0E0', paddingBottom: '8px' }}>
    <Typography variant="body1" gutterBottom>PAYMENT DETAILS</Typography>
  </div>
  <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'space-between' }}>
    To Pay <span style={{ color: '#198754' }}>₹500.00</span>
  </Typography>
  <div
    style={{
      backgroundImage: "url('/bg.svg')",
      backgroundSize: 'cover', // Adjust to 'contain'
      backgroundRepeat: 'no-repeat',
      backgroundPosition: "center bottom",
      width: '388px', // Adjust width as needed
      height: '50px', // Adjust height as needed
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      mt: 2, // margin-top
      backgroundColor: '#FFEBEE',
      color: '#198754',
      marginLeft: "-10px",
      alignSelf: 'flex-end',
      marginBottom: "-15px",
      marginTop: '20px', // Adjust margin-top as needed
    }}
    onClick={() => {
      // Handle click action here
      console.log('Clicked!');
      // Add your action logic here
    }}
  >
    <span style={{ fontWeight: 'bold' }}>Verify OTP to get more offers</span>
  </div>
</Box>


  </DialogContent >
  <DialogActions>
  <Button
  variant="contained"
  color="secondary"
  fullWidth
  onClick={handleCloseDialog}
  sx={{
    backgroundColor: '#FF4081',
   marginRight: "35px",
   width: "85%",
   marginBottom: "15px",
   
  }}
>
  Collect ₹500.00
</Button>

  </DialogActions>
</Dialog>

    </div>
  );
}

export default Assign;

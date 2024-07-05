import React from 'react';
import { Link } from 'react-router-dom';
import './makepayment.css'; // Make sure to create a CSS file for the styles

const Assign = () => {
  return (
    <div class="p1app">
    <div class="p1main">
      
</div>
      <div class="phase3">
        <div class="p3head">
          <span class="breadcrumb">Dashboard / </span>
          <span class="sub">Make Payments</span>
        </div>
        <div class="phase3payment">
          <form class="phase3form">
            <h2 class="phase3title">Enter Customer Mobile Number</h2>
            <p class="phase3subtitle">Enter Customer mobile number to access the payment page</p>
            <input type="text" placeholder="Enter Mobile Number" class="phase3input" />
            <h2 class="phase3title">Enter Total Amount</h2>
            <p class="phase3subtitle">Enter the total amount that you want to collect from the customer</p>
            <input type="text" placeholder="Enter the amount" class="phase3input" />
            <button type="submit" class="phase3button">Proceed Next</button>
          </form>
        </div>
      </div>
    </div>
 
    
  );
}

export default Assign;
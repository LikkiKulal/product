import React from 'react';
import { Link } from 'react-router-dom';
import './rewards.css'; // Make sure to create a CSS file for the styles

const Assign = () => {
  return (
    <div className="p1app">


  

      <div className="p1main">
       
      </div>

      <div className="phase3">


        <div class="p3head">
          Dashboard /
          <span className='sub'>Rewards</span>
        </div>

        <div className="p3card">
          <div className="p3top">
            <img src='/top.svg' alt='' className='top-bg' />
            <div class="content">
              <h2>Win Rewards Everyday</h2>
              <h1>XPANZ Rewards</h1>
              <div class="p3icons">
                <span class="p3icon">
                  <img src='/refresh.svg' alt='' />
                </span>
                <span class="p3icon">
                  <img src='/bank.svg' alt='' />
                </span>
              </div>


            </div>
          </div>
          <div class="container">
            <div class="p3coins">
              <span>🪙 XCoins</span>
              <span class="text">2500
                <img src="/down.svg" alt="" class="down" />
              </span>
            </div>
          </div>

          <div className="p3bottom">
            <img src='/mbg.svg' alt='' className='mbg' />
            <h3 class="excited-rewards">Excited </h3>
            <h1 class="reward-title">REWARDS
              <img src='/star.svg' alt='' class='star' />
            </h1>

            <div className="p3lotto">

              <img src="/lbg.svg" alt="" className="p3lottoimg" />
            </div>
            <button className="p3play">Play Now →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assign;
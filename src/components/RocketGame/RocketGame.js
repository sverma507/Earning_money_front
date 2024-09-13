import React, { useState } from 'react';
import './RocketGame.css';
import Layout from '../Layout';

const RocketGame = () => {
  const [profit, setProfit] = useState(null);
  const [isFlying, setIsFlying] = useState(false);
  const [showRocket, setShowRocket] = useState(true);

  const profits = [50, 100, 150, 200]; // Example profits

  const launchRocket = () => {
    if (isFlying || !showRocket) return;

    setIsFlying(true);

    // Pick a random profit from the array
    const randomProfit = profits[Math.floor(Math.random() * profits.length)];

    setTimeout(() => {
      setProfit(randomProfit);
      showConfetti(randomProfit);
      setIsFlying(false);
      setShowRocket(false); // Hide rocket after launch
    }, 1500); // Faster rocket flight duration
  };

  const showConfetti = (selectedProfit) => {
    const confettiContainer = document.getElementById('confetti');
    const congratsMessage = document.getElementById('congrats-message');

    // Show congrats message and confetti
    congratsMessage.innerText = `Congratulations! You won ₹${selectedProfit}!`;
    congratsMessage.style.display = 'block';
    confettiContainer.style.display = 'block';

    // Generate confetti
    for (let i = 0; i < 100; i++) {
      const confettiPiece = document.createElement('div');
      confettiPiece.classList.add('confetti-piece');
      confettiPiece.style.left = `${Math.random() * 100}%`;
      confettiPiece.style.backgroundColor = getRandomColor();
      confettiPiece.style.animationDuration = `${Math.random() * 2 + 2}s`;
      confettiContainer.appendChild(confettiPiece);

      // Remove confetti after animation
      setTimeout(() => {
        confettiPiece.remove();
      }, 4000);
    }

    // Hide confetti and message after a few seconds
    setTimeout(() => {
      confettiContainer.style.display = 'none';
      congratsMessage.style.display = 'none';
    }, 3000);
  };

  const getRandomColor = () => {
    const colors = ['#FF5733', '#FFBD33', '#75FF33', '#33FF57', '#33FFBD', '#3375FF', '#8C33FF', '#FF33BD'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Layout title={'Rocket Game - Hype Drinks'}>
      <div className="rocket-game">
        <h1 className='text-4xl text-white mb-10 font-sarif'>Launch the Rocket!</h1>
        {showRocket && (
          <div className={`rocket ${isFlying ? 'flying' : ''}`}>
            <img src='/images/rocket.png' alt='Rocket' />
          </div>
        )}
        <button className="launch-button" onClick={launchRocket} disabled={isFlying || !showRocket}>
          {isFlying ? 'Flying...' : showRocket ? 'Launch Rocket' : 'Rocket Launched'}
        </button>
        <div id="confetti"></div>
        <div id="congrats-message"></div>
      </div>
    </Layout>
  );
};

export default RocketGame;

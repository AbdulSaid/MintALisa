import React from 'react'
// import "background-img" from './public/images/background-img.png';

export default function Home() {
  return (
    <div className='home'>
      <img src='images/background-img.png' className='bg-img' />
      <header className='header'>
        <p>MINT</p>
        <p>A</p>
        <p>LISA</p>
      </header>

      <button className='primary-btn'>Explore Collection</button>
      <button className='secondary-btn'>Connect wallet</button>

    </div>
  );
}

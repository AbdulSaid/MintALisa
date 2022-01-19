import { useEffect, useState } from 'react';
import { connectWallet, getCurrentWalletConnected } from "../utils/interact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  useEffect(async () => { //TODO: implement
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address);

    addWalletListener(); 
  }, []);

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
    
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    }
  }

  return (
    <div className='home'>
      <section className='header-container'>
        <img src='images/background-img.png' className='bg-img' />
        <header className='header'>
          <p>MINT</p>
          <p>A</p>
          <p>LISA</p>
        </header>
      </section>

      <section className='btn-container'>
        <button className='primary btn'>Explore gallery</button>
          {window.ethereum && <button id="walletButton" className='btn secondary' onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>}
        {!window.ethereum && <p className='mm-link-container'><a className='mm-link' target="_blank" href={`https://metamask.io/download.html`}>
          You must install Metamask, a virtual Ethereum wallet, in your browser <FontAwesomeIcon icon={ faArrowRight } />
          </a></p>}
      </section>
    </div>
  );
}

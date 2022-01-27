import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { connectWallet, getCurrentWalletConnected } from "../utils/interact";
import { useNavigate } from 'react-router-dom';
import useOnClickOutside from '../hooks/useOnClickOutside';

export default function PopupContent(props) {
  const ref = useRef();
  const [walletAddress, setWallet] = useState("");
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  useOnClickOutside(ref, () => props.setTrigger(false));

  useEffect(async () => {
    const { address } = await getCurrentWalletConnected();
    setWallet(address);
    addWalletListener();
    loadOnSuccess();
  }, []);

  const connectWalletPressed = async () => {
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

  const loadOnSuccess = () => {
    if (props.content === 'success') {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 4000);
    }
  }
  
  
  return (
    <article className="popup-container" ref={ref}>
      <FontAwesomeIcon icon={faTimes} className='close-popup' onClick={() => props.setTrigger(false)} />

      {props.content === 'no-wallet' &&
        <div className="popup-content-container">
          <header className='popup-header'>
            <h2>You need a wallet to purchase</h2>
          </header>
          <img className='wallet-robot' src="../images/connect-wallet.png" alt="Wallet robot" />
          <p className='popup-msg'>You need to have a metamask wallet in order to buy this Mona Lisa NFT.</p>
          <button className='btn primary'><a className='mm-link' target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>Download Metamask</a></button>
          <a className='mm-link' href='https://metamask.io/faqs/' target="_blank" rel="noreferrer">Learn more about Metamask wallets</a>
        </div>}

      {props.content === 'wallet-connect' &&
        <div className="popup-content-container">
          <header className='popup-header'>
            <h2>Connect Metamask wallet</h2>
          </header>
          <img className='wallet-robot' src="../images/connect-wallet.png" alt="Wallet robot" />
          <p className='popup-msg'>You need to connect to your metamask wallet before you buy this Mona Lisa NFT.</p>
          {window.ethereum && <button className='btn primary' onClick={connectWalletPressed}>
            {!walletAddress.length > 0 ? (
              <span>Connect Wallet</span>
            ) : (
              "Connected: " +
              String(walletAddress).substring(0, 6) +
              "..." +
              String(walletAddress).substring(38)
            )}
          </button>}
          <a className='mm-link' href='https://metamask.io/faqs/' target="_blank" rel="noreferrer">Learn more about Metamask wallets</a>
        </div>}

      {props.content === 'success' &&
        <div className="popup-content-container">
          {show ?
            <div className='loader-container'>
              <div className="loader one"></div>
              <div className="loader two"></div>
              <div className="loader three"></div>
            </div>
            :
            <>
              <h2 className='success-header'>Payment Succesful</h2>
              <img className='success-img' src="../images/1.png" alt="" />
              <p className='popup-msg success-msg'><a className='eth-link' href={props.msg} target="_blank" rel="noreferrer">Click here</a> to check out your transaction on Etherscan!</p>

              <button className='btn primary' onClick={() => navigate('/gallery')}>Back to gallery</button>
            </>}
        </div>}

      {props.content === 'error' &&
        <div className="popup-content-container">
          <header className='popup-header error-header'>
            <h2>Oh no! Something went wrong</h2>
            <img className='wallet-robot' src="../images/connect-wallet.png" alt="Wallet robot" />
            <p className='popup-msg error'>{props.msg}</p>
          </header>
        </div>}
    </article>
  );
}

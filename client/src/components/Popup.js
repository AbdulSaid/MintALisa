import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { connectWallet, getCurrentWalletConnected } from "../utils/interact";

export default function Popup(props) {
  const [walletAddress, setWallet] = useState("");

  useEffect(async () => {
    const { address } = await getCurrentWalletConnected();
    setWallet(address);

    addWalletListener();
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



  return (props.trigger) ? (
    <div className="glass-overlay" onClick={() => props.setTrigger(false)} >
      <article className="popup-container">
        <FontAwesomeIcon icon={faTimes} className='close-popup' onClick={() => props.setTrigger(false)} />
        {props.msg === 'no-wallet' &&
          <>
            <header className='popup-header'>
              <h2>You need a wallet to purchase</h2>
            </header>
            <img className='wallet-robot' src="../images/connect-wallet.png" alt="Wallet robot" />
            <p className='popup-msg'>You need to have a metamask wallet in order to buy this Mona Lisa NFT.</p>
            <button className='btn primary'><a className='mm-link' target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>Download Metamask</a></button>
            <a className='mm-link' href='https://metamask.io/faqs/' target="_blank" rel="noreferrer">Learn more about Metamask wallets</a>
          </>}

          {props.msg === 'wallet-connect' && 
            <>
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
            </>}
      </article>
    </div>
  ) : "";
}

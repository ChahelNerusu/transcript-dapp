import React, { useState } from 'react';
import { ethers } from 'ethers';
import TranscriptUpload from './transcript.jsx';
import './App.css';

export default function App() {
  // Styles for light blue theme
  const containerStyle = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e0f7ff 0%, #ffffff 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem'
  };

  const headerStyle = {
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#005f99'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    margin: 0
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    margin: '0.5rem 0',
    color: '#007acc'
  };

  const mainStyle = {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#f0fcff',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 8px 24px rgba(0, 95, 153, 0.1)'
  };

  const footerStyle = {
    marginTop: 'auto',
    paddingTop: '2rem',
    color: '#555',
    fontSize: '0.9rem'
  };

  // Wallet connection state
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Connect to MetaMask
  async function connectWallet() {
    setError('');
    setStatus('');
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const networkObj = await provider.getNetwork();
        setNetwork(networkObj.name + ' (chainId: ' + networkObj.chainId + ')');
        setStatus('Wallet connected!');
      } catch (err) {
        setError('Failed to connect wallet: ' + err.message);
      }
    } else {
      setError('MetaMask is not installed. Please install MetaMask and try again.');
    }
  }

  // Instructions section
  const instructionsStyle = {
    background: '#e6f4fa',
    borderRadius: '0.5rem',
    padding: '1rem',
    marginBottom: '1.5rem',
    color: '#005f99',
    fontSize: '1rem',
    boxShadow: '0 2px 8px rgba(0, 95, 153, 0.05)'
  };

  // Verification result placeholder
  const resultStyle = {
    marginTop: '1.5rem',
    padding: '1rem',
    background: '#f8fdff',
    borderRadius: '0.5rem',
    minHeight: '2.5rem',
    color: '#007acc',
    fontWeight: 'bold',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0, 95, 153, 0.05)'
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Blockchain Transcript Verifier</h1>
        <p style={subtitleStyle}>Upload and verify transcripts instantly</p>
      </header>

      {/* Wallet connection and status */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <button
          onClick={connectWallet}
          style={{
            background: '#007acc',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.7rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            marginRight: '1rem'
          }}
        >
          {account ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
        {account && (
          <span style={{ color: '#005f99', fontWeight: 'bold' }}>
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        )}
        {network && (
          <span style={{ color: '#007acc', marginLeft: '1rem' }}>{network}</span>
        )}
        {status && <div style={{ color: 'green', marginTop: '0.5rem' }}>{status}</div>}
        {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
      </div>

      {/* Instructions */}
      <div style={instructionsStyle}>
        <strong>How to use:</strong>
        <ol style={{ margin: '0.5rem 0 0 1.2rem', padding: 0 }}>
          <li>Connect your wallet (MetaMask recommended).</li>
          <li>Upload your transcript file below.</li>
          <li>Wait for verification and view the result.</li>
        </ol>
      </div>

      <main style={mainStyle}>
        <TranscriptUpload />
        {/* Verification result placeholder */}
        <div style={resultStyle}>
          {/* TODO: Display verification result here */}
          Verification result will appear here.
        </div>
      </main>

      <footer style={footerStyle}>
        Powered by Web3.Storage & Polygon Mumbai Testnet
      </footer>
    </div>
  );
}
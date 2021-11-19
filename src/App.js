import { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import Token from './artifacts/contracts/Token.sol/Token.json';
import './App.css';

//enter address here
const greeterAddress = "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc"

function App () {
  const [ userAddress, setUserAddress ] = useState( '' )
  const [ amount, setAmount ] = useState( 0 )

  async function requestAccount () {
    await window.ethereum.request( { method: "eth_requestAccounts" } )
  }

  async function getBalance () {
    if ( typeof window.ethereum !== 'undefined' ) {
      const account = await window.ethereum.request( { method: "eth_requestAccounts" } );
      const provider = new ethers.providers.Web3Provider( window.ethereum );
      const contract = new ethers.Contract( greeterAddress, Token.abi, provider )
      const balance = await contract.balanceOf( account )
      console.log( balance.toString() );
    }
  }

  async function sendBalance () {
    if ( typeof window.ethereum !== 'undefined' ) {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider( window.ethereum );
      const signer = provider.getSigner();
      const contract = new ethers.Contract( greeterAddress, Token.abi, signer );
      const transaction = await contract.transfer( userAddress, amount )
      await transaction.wait()
      console.log( `${ amount } eth sent to ${ userAddress }` )
    }
  }

  return (
    <div className="App">
      <button onClick={ getBalance }>balance</button>
      <button onClick={ sendBalance }>send Balance</button>
      <input type="text" placeholder="send amount" onChange={ ( e ) => setAmount( e.target.value ) } />
      <input type="text" placeholder="send to" onChange={ ( e ) => setUserAddress( e.target.value ) } />
    </div>
  );
}

export default App;

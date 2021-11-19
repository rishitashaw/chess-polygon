import { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import Token from './artifacts/contracts/Token.sol/Token.json';
import './App.css';

//enter address here
const greeterAddress = ""

function App () {
  const [ greeting, setGreetingValue ] = useState( '' )
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

  async function fetchGreeting () {
    if ( typeof window.ethereum !== 'undefined' ) {
      const provider = new ethers.providers.Web3Provider( window.ethereum );
      const contract = new ethers.Contract( greeterAddress, Greeter.abi, provider );

      try {
        const data = await contract.greet();
        console.log( data );
      } catch ( err ) {
        console.log( err );
      }
    } else {
      alert( 'Please install MetaMask' );
    }
  }

  async function setGreeting () {
    if ( !greeting ) {
      return;
    }
    if ( typeof window.ethereum !== 'undefined' ) {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider( window.ethereum );
      const signer = provider.getSigner();
      const contract = new ethers.Contract( greeterAddress, Greeter.abi, signer );
      const transaction = await contract.setGreeting( greeting );
      setGreetingValue( '' );
      await transaction.wait();
      fetchGreeting();
    }
  }


  return (
    <div className="App">
      <button onClick={ fetchGreeting }>Fetch Greeting</button>
      <button onClick={ setGreeting }>set Greeting</button>
      <input type="text" placeholder="set greeting" value={ greeting } onChange={ ( e ) => setGreetingValue( e.target.value ) } />

      <br />
      <button onClick={ getBalance }>balance</button>
      <button onClick={ sendBalance }>send Balance</button>
      <input type="text" placeholder="send amount" onChange={ ( e ) => setAmount( e.target.value ) } />
      <input type="text" placeholder="send to" onChange={ ( e ) => setUserAddress( e.target.value ) } />

    </div>
  );
}

export default App;

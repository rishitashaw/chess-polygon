import { useState } from 'react';
import { ethers } from 'ethers';
import Token from './artifacts/contracts/Token.sol/Token.json';
import './App.css';
import Chessboard from './components/chessboard';

//replace address here
// the contract was created with the following address
//const greeterAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"

function App () {
  const [ userAddress, setUserAddress ] = useState( '' )
  const [ amount, setAmount ] = useState( 0 )

  async function requestAccount () {
    await window.ethereum.request( { method: "eth_requestAccounts" } )
  }

  async function sendBalance () {
    if ( typeof window.ethereum !== 'undefined' ) {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider( window.ethereum );
      const signer = provider.getSigner();
      //const contract = new ethers.Contract( greeterAddress, Token.abi, signer );
      //const transaction = await contract.transfer( userAddress, amount )
      //await transaction.wait()
      const tx = await signer.sendTransaction( {
        to: userAddress,
        value: ethers.utils.parseEther( amount )
      } );
      await tx.wait();
      alert( `${ amount } eth sent to ${ userAddress }` )
    }
  }

  return (
    <div className="App">
      <Chessboard />
    </div>
  );
}

export default App;

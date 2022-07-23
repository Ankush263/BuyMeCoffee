import './App.css';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import ABI from './artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json'

function App() {

  const [showAcc, setAcc] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [submitAcc, setSubmitAcc] = useState(false)

  const contractAddress = "0x669177e39bE3a2c6631B25b422843932545cEC60"
  const abi = ABI.abi
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()


  // const account1 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" //0 balance Account(owner Account)
  // const account2 = `${showAcc}` //1 ETH will be send from this account

  // const transaction = () => {

  // }

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        // console.log(abi)
        setAcc(account)
      }catch(error){
        console.log(error)
      }
    }
  }


  const execute = async (str1, str2) => {
    //Address
    //contract abi
    //function
    //node connection(hardhat)
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try{
      // await contract.store(112)
      await contract.buyCoffee(str1, str2)
      const res = await contract.getmemos()
      res.map(r => setName(r[2]))
      res.map(r => setMessage(r[3]))
      // console.log(await contract.getmemos())
      await setSubmitAcc(true)

    }catch(err){
      console.log("Error: ", err)
    }
  }

  const submit = async () => {
    // console.log("Clicked")
    // onChange={(e) => setName(e.target.value)}
    // onChange={(e) => setMessage(e.target.value)}
    // setName(e.ta)
    // console.log(name)
    // console.log(message)
    try{
      await execute(name, message)
    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <div className="App">
      <div>
        <button onClick={connect} className='connect-wallet'>Connect wallet</button>
        <h1 className='showAccount' style={{color: "white"}}>{showAcc}</h1>
        <div className="box">
          <input type="text" placeholder='Enter Name' className='input'  onChange={(e) => setName(e.target.value)} value={name} />
          <input type="text" placeholder='Enter Message' className='input'onChange={(e) => setMessage(e.target.value)} value={message} />
          <button className='connect-wallet' onClick={submit}>Send 1 ETH</button>
        </div>
        {/* <button onClick={execute} className='connect-wallet'>Execute</button> */}
        <div className='box'>
          <h3>Name: {submitAcc && name}</h3>
          <h3>Message: {submitAcc && message}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;

//36

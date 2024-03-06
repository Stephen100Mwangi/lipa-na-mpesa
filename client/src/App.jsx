import React, { useState } from 'react'
import axios from 'axios'

const App = () => {

  const [phone,setPhone] = useState("");
  const [amount,setAmount] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:4590/token", {phone,amount}).then((response) =>{
      response.status(200).send("Sent successfully");

    }).catch((error) =>{
      console.log(error);
    });

    setAmount('');
    setPhone('');
    
  }


  

  return (
    <form className='mx-auto my-20 flex flex-col space-y-10 shadow-2xl rounded-lg border-0 w-fit p-6' onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-3">
        <h1 className="font-bold text-black text-2xl text-center">Pay with <span className='text-green-500'>M-Pesa</span></h1>
      </div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="Phone">Phone:</label>
        <input type="text" placeholder='7** *** ***' className='px-3 ring-1 ring-blue-500 p-2 rounded-full w-80' value={phone} onChange={(e) => {setPhone(e.target.value)}} />
      </div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="amount">Amount:</label>
        <input type="number" placeholder='00' className='px-3 ring-1 ring-blue-500 p-2 rounded-full' value={amount} onChange={(e) => {setAmount(e.target.value)}} />
      </div>
      
      <button className='outline-none bg-green-500 text-white font-medium p-2 rounded-full'>Send Money</button>
    </form>
  )
}

export default App

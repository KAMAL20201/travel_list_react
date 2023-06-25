import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';



function Form({onGettingData}) {
  const uniqueId = uuidv4();

  const [option, setOption] = useState(1);
  const [input, setInput] = useState("");

  const submitHandler=(e)=>{
    e.preventDefault();
    
    if(!input){
      return;
    }
    const item={
      id:uniqueId,
      description:input,
      quantity:option,
      packed:false
    }
     
    onGettingData(item);
    setInput("");
    setOption(1);


    
  }
  const options = [];
  for (let i = 1; i <= 20; i++) {
    options.push(<option key={i} value={i}> {i}</option>);
  }

  return (
    <div className="add-form">
      <h3>What do you need for your trip?</h3>
      <form  onSubmit={submitHandler}>
      <select value={option} onChange={(e) => setOption(e.target.value)}>
       {options}
      </select>
      <input
        type="text"
        placeholder="Add an item..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button>Add</button>
      </form>
    </div>
  );
}

export default Form;

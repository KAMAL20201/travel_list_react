import React, { useState } from "react";

function Form({onGettingData}) {

  const [option, setOption] = useState(1);
  const [input, setInput] = useState("");

  const submitHandler=(e)=>{

    e.preventDefault();
    
    if(!input){
      return;
    }
    const item={
      item_name:input,
      quantity:option,
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
      <form  onSubmit={submitHandler} className="form-con">
      <select value={option} onChange={(e) => setOption(e.target.value)}>
       {options}
      </select>
      <input
        type="text"
        placeholder="Add an item..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button>Add</button>
      </form>
    </div>
  );
}

export default Form;

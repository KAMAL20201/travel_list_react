import React,{useState} from "react";

function Item({ item,onRemove,onCheckboxChange  }) {

  const [isChecked, setIsChecked] = useState(item.packed);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    const updatedItem = {
      ...item,
      packed: event.target.checked,
    };
    onCheckboxChange(updatedItem);
   
  };
  const deleteHandler = () => {
    onRemove(item.id);
  }
  return (
    <li>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {" "}
        {item.quantity} {item.item_name}
      </span>
      <button onClick={deleteHandler}>❌</button>
    </li>
  );
}

export default Item;

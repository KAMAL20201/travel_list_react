import React, { useState } from "react";
import Item from "./Item";

function PackingList({ initialItems, onRemovingItem, onCheckboxChange,onClearList }) {
  const deleteItemHandler = (id) => {
    onRemovingItem(id);
  };

  const clearListHandler=()=>{
    onClearList();
  }

  const [selectedOption, setSelectedOption] = useState("input");

  let sortedItems;
  if (selectedOption === "input") {
    sortedItems = initialItems;
  }
  if (selectedOption === "description") {
    sortedItems = initialItems
      .slice()
      .sort((a, b) => a.item_name.localeCompare(b.item_name));
  }
  if(selectedOption === "packed"){
    sortedItems = initialItems
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul className="ulist">
        {sortedItems.map((item) => (
          <Item
            item={item}
  
            onRemove={deleteItemHandler}
            onCheckboxChange={onCheckboxChange}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="input">Sort By Input Order</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By Packed Status</option>
        </select>
        <button onClick={clearListHandler}>CLEAR LIST</button>
      </div>
    </div>
  );
}

export default PackingList;

import React from "react";
import Item from "./Item";

function PackingList({ initialItems, onRemovingItem, onCheckboxChange }) {
  const deleteItemHandler = (id) => {
    onRemovingItem(id);
  };
  console.log(initialItems);
  return (
    <ul className="list">
      {initialItems.map((item) => (
        <Item
          item={item}
          key={item.id}
          onRemove={deleteItemHandler}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </ul>
  );
}

export default PackingList;

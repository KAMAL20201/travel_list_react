import React from "react";

function Stats({items}) {
  const packeditems=items?.filter((item)=>item.packed===true);
  
  let percentage=0;
  if(items?.length!==0)
  percentage=((packeditems.length/items.length)*100).toFixed(2);

  const packedItemslength=packeditems.length;
 
  return (
    <footer className="stats">
      <em>🎒 You have {items?.length} items on your list and you already packed {packedItemslength} i.e {percentage}%</em>
    </footer>

  );
}

export default Stats;

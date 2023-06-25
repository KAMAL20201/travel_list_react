import { useState } from "react";
import Form from "./components/Form";
import Logo from "./components/Logo";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

const initialItems = [];
function App() {
  const [items, setItems] = useState(initialItems);

  const dataHandler = (item) => {
    setItems([...items, item]);
  };
  const removeHandler = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleCheckboxChange = (updatedItem) => {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  };

  return (
    <div className="app">
      <Logo />
      <Form onGettingData={dataHandler} />
      {items.length > 0 ? (
        <PackingList
          initialItems={items}
          onRemovingItem={removeHandler}
          onCheckboxChange={handleCheckboxChange}
        />
      ) : (
        <p className="no-items">Add Some Items In Your Packing List</p>
      )}
      <Stats items={items} />
    </div>
  );
}

export default App;

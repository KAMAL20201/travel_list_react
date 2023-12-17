import { useEffect, useState } from "react";
import Form from "./components/Form";
import Logo from "./components/Logo";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import { supabase } from "./lib/api";
import toast, {Toaster} from "react-hot-toast";

function App() {
  const [items, setItems] = useState(null);

  const updateItemById = async (id, updatedItem) => {
    const { data, error } = await supabase
      .from("Items")
      .update({ packed: updatedItem.packed })
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      const updatedItems = items.map((item) => {
        if (item.id === id) {
          return { ...item, packed: updatedItem.packed };
        }
        return item;
      });
      setItems(updatedItems);
    }
  };
  const fetchItems = async () => {
    let { data: Items, error } = await supabase
      .from("Items")
      .select("*")
      .order("id", { ascending: true });
    if (error) {
      setItems(null);
      toast.error("Could not fetch items. Please try again later.",{
        duration: 4000,
        position: 'top-right'});
      console.log(error);
    }
    if (Items) {
      console.log(Items);
      setItems(Items);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const dataHandler = async (item) => {
    const { data: Item, error } = await supabase
      .from("Items")
      .insert([item])
      .select();

    if (error) {
      console.log(error);
      toast.error("Could not add item. Please try again later.",{
        duration: 4000,
        position: 'top-right'});
    }
    if (Item) {
      toast.success("Item added successfully",{
        duration: 4000,
        position: 'top-right'});
      console.log(Item);
      setItems((prev) => [...prev, Item[0]]);
    }
  };
  const removeHandler = async (id) => {
    const { error } = await supabase.from("Items").delete().eq("id", id);

    if (error) {
      console.log(error);
    }

    const newItems = items?.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleCheckboxChange = (updatedItem) => {
    updateItemById(updatedItem.id, updatedItem);
  };

  const clearListHandler = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all items?"
    );

    if (!confirmed) {
      return; // If the user cancels the confirmation, do nothing
    }

    try {
      const { error } = await supabase.from("Items").delete({ where: {} }); // This will match all rows, effectively deleting all items

      if (error) {
        console.error("Failed to clear items:", error);
      } else {
        console.log("Items cleared successfully.");
        setItems(null); // Update your local state if needed
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="app">
      <Logo />
      <Form onGettingData={dataHandler} />
      {items && items?.length > 0 ? (
        <PackingList
          initialItems={items}
          onRemovingItem={removeHandler}
          onCheckboxChange={handleCheckboxChange}
          onClearList={clearListHandler}
        />
      ) : (
        <p className="no-items">Add Some Items In Your Packing List</p>
      )}
      {items && <Stats items={items} />}
      <Toaster/>
    </div>
  );
}

export default App;

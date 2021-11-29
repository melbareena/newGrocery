import { useState } from "react";
import "./styles.css";

function GroceryStats(props) {
  const { grolist } = props;
  return (
    <>
      <hr />
      <h5>Total items in the list = {grolist.length} </h5>
      <h5>
        No of items purchased = {grolist.filter((el) => el.isPurchased).length}
      </h5>
      <h5>
        No of items not purchased ={" "}
        {grolist.filter((el) => !el.isPurchased).length}
      </h5>
    </>
  );
}

function App() {
  const [value, setValue] = useState("");
  const [grolist, setGroList] = useState([]);
  return (
    <div className="App">
      <h1>Grocery List</h1>
      <label>
        Add your item to the list :
        <input
          type="text"
          value={value}
          onChange={(event) => {
            const {
              target: { value }
            } = event;
            setValue(value);
          }}
        />
      </label>

      <button
        onClick={() => {
          let isDuplicate = false;

          const newGorList = grolist.map((el) => {
            if (el.item.toUpperCase() === value.toUpperCase()) {
              isDuplicate = true;
              return { ...el, quantity: el.quantity + 1 };
            }
            return el;
          });
          setGroList(newGorList);

          if (!isDuplicate && value) {
            setGroList([
              ...grolist,
              { item: value, quantity: 1, isPurchased: false }
            ]);
            isDuplicate = false;
          }
          setValue("");
        }}
      >
        Add todo
      </button>

      <hr />
      <h4>All the todo list</h4>
      {grolist.map((el) => {
        const { isPurchased, quantity, item } = el;
        return (
          <>
            <label style={{ color: isPurchased ? "green" : "red" }}>
              {item} - {quantity}
            </label>
            ;
            <button
              onClick={() => {
                const newGorList = grolist.map((el) => {
                  if (el.item === item) {
                    return { ...el, isPurchased: !isPurchased };
                  }
                  return el;
                });
                setGroList(newGorList);
              }}
            >
              {isPurchased ? "Purchased" : "NotPurchased"}
            </button>
            <button
              onClick={() => {
                const newGorList = grolist.map((el) => {
                  if (el.item === item) {
                    return { ...el, quantity: el.quantity + 1 };
                  }
                  return el;
                });
                setGroList(newGorList);
              }}
            >
              +
            </button>
            <label style={{ color: isPurchased ? "green" : "red" }}>
              {" "}
              {quantity}{" "}
            </label>
            <button
              onClick={() => {
                const newGorList = item.map((el) => {
                  if (el.item === item) {
                    return { ...el, quantity: el.quantity - 1 };
                  }
                  return el;
                });
                setGroList(newGorList);
              }}
            >
              -
            </button>
            <button
              onClick={
                () => {
                  //if(alert("Do yo want to delete")) {
                  const prevGroList = grolist.filter((el) => el.item !== item);

                  setGroList(prevGroList);
                }
                //}
              }
            >
              x
            </button>
            <hr />
          </>
        );
      })}

      <GroceryStats grolist={grolist} />
    </div>
  );
}
export default App;

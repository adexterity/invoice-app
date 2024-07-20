import { useEffect, useState } from "react";
import "./App.css";
import BasicModal from "./components/addModal";
import { Products } from "./constant/constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";
import { getAllItems } from "./state/invoice/invoiceSlice";

function App() {
  const stateProduct = useSelector((state: RootState) => state.invoice.items);
  console.log(stateProduct);

  const dispatch = useDispatch();

  const [initialValue, setInitialValue] = useState(20);

  const handleMinus = () => {
    console.log("clicked");
    if (initialValue > 20 && initialValue !== 20)
      setInitialValue(initialValue - 20);
  };
  const handlePlus = () => {
    console.log("clicked");
    setInitialValue(initialValue + 20);
  };

  useEffect(() => {
    dispatch(getAllItems(Products));
  }, []);

  return (
    <>
      <div>
        <ul>
          <li>
            <span className="time">02-07-2024</span>
            <select name="options" id="">
              <option value="100" className="px-2">
                100
              </option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
            </select>
            <button onClick={handleMinus}>-</button>
            <span>{initialValue}</span>
            <button onClick={handlePlus}>+</button>
          </li>
          <li>
            <span className="time" style={{ marginRight: "20px" }}>
              02-07-2024
            </span>
            <select name="options" id="">
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
            </select>
            <button onClick={handleMinus}>-</button>
            <span>{initialValue}</span>
            <button onClick={handlePlus}>+</button>
          </li>
          <li>
            <span className="time" style={{ marginRight: "20px" }}>
              02-07-2024
            </span>
            <select name="options" id="">
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
            </select>

            <button onClick={handleMinus}>-</button>
            <span>{initialValue}</span>
            <button onClick={handlePlus}>+</button>
          </li>
          <li>
            <span className="time" style={{ marginRight: "20px" }}>
              02-07-2024
            </span>
            <select name="options" id="">
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
            </select>
            <button onClick={handleMinus}>-</button>
            <span>{initialValue}</span>
            <button onClick={handlePlus}>+</button>
          </li>
          <li>
            <span className="time" style={{ marginRight: "20px" }}>
              02-07-2024
            </span>
            <select name="options" id="">
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
            </select>
            <button onClick={handleMinus}>-</button>
            <span>{initialValue}</span>
            <button onClick={handlePlus}>+</button>
          </li>
          <li>
            <span className="time" style={{ marginRight: "20px" }}>
              02-07-2024
            </span>
            <select name="options" id="">
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
            </select>
            <button onClick={handleMinus}>-</button>
            <span>{initialValue}</span>
            <button onClick={handlePlus}>+</button>
          </li>
        </ul>

        <BasicModal />

        <div className="total">total: $000.00</div>
      </div>
    </>
  );
}

export default App;

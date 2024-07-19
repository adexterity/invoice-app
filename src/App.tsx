import { useState } from "react";
import "./App.css";

function App() {
  
  const [initialValue, setInitialValue] = useState(20);

  const handleMinus = () => {
    console.log("clicked");
    if(initialValue > 20 && initialValue !== 20 )
    setInitialValue(initialValue - 20);
  };
  const handlePlus = () => {
    console.log("clicked");
    setInitialValue(initialValue + 20);
  };

  return (
    <>
      <div className="bg-blue-500 text-red-500">
        <ul>
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

        <div className="total">total: $000.00</div>
      </div>
    </>
  );
}

export default App;

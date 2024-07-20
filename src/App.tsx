import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(getAllItems(Products));
  }, []);

  return (
    <>
      <div>
        <BasicModal />
      </div>
    </>
  );
}

export default App;

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormPropsTextFields from "./inputNumber";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useState } from "react";
import { incrementTotalPrice } from "../../state/invoice/invoiceSlice";



export default function SelectSmall() {
  const dispatch = useDispatch();

  const stateProduct = useSelector((state: RootState) => state.invoice.items);

  const [product, setProduct] = useState("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setProduct(event.target.value);
    dispatch(incrementTotalPrice(product))
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Items</InputLabel>
      <div className="flex justify-center items-center">
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={product}
          label="Product"
          onChange={handleChange}
          className=" min-w-24 h-14"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {stateProduct.map((item, index) => (
            <MenuItem value={item.itemId.toString()} key={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <FormPropsTextFields itemId={Number(product)} />
      </div>
    </FormControl>
  );
}

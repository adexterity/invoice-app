import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useState } from "react";
import { incrementTotalPrice } from "../../state/invoice/invoiceSlice";

export default function SelectSmall() {
  const dispatch = useDispatch();

  const stateProduct = useSelector((state: RootState) => state.invoice.items);
  console.log(stateProduct, "stateProduct");

  const [product, setProduct] = useState("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setProduct(event.target.value);
    dispatch(incrementTotalPrice(event.target.value));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="select-small-label">Items</InputLabel>
      <div className="flex justify-center items-center">
        <Select
          labelId="select-small-label"
          id="select-small"
          value={product}
          label="Product"
          onChange={handleChange}
          className=" min-w-24 h-14"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {stateProduct.map((item, index : number) => (
            <MenuItem value={item.itemId.toString()} key={index}>
              {item.name}, {item.itemCount}, {item.itemPrice}
            </MenuItem>
          ))}
        </Select>
      </div>
    </FormControl>
  );
}

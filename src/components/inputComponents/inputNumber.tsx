import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementItemPrice,
  incrementItemPrice,
} from "../../state/invoice/invoiceSlice";
import { RootState } from "../../state/store";

interface FormPropsTextFieldsProps {
  itemId: number;
}

export default function FormPropsTextFields({
  itemId,
}: FormPropsTextFieldsProps) {
  // Get the item from the Redux state
  const item = useSelector((state: RootState) =>
    state.invoice.items.find((item) => item.itemId === itemId)
  );

  if (!item) {
    return null; // or handle the case when the item is not found
  }

  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(event.target.value);

    console.log(typeof newQuantity, "newQuantity");

    if (newQuantity > item.itemCount) {
      dispatch(incrementItemPrice(item.itemId));
    } else if (newQuantity < item.itemCount && newQuantity !== 0) {
      dispatch(decrementItemPrice(itemId));
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "10ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-number"
          label="Qty"
          type="number"
          value={item.itemCount}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          disabled
          id="outlined-number"
          label="Unit Price ($)"
          value={item.itemPrice.toFixed(2)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          disabled
          id="outlined-number"
          label="Total Price ($)"
          value={item.itemTotalPrice.toFixed(2)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </Box>
  );
}

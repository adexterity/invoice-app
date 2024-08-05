import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formattedDate } from "../utils/utils";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import {
  changeSelectedItem,
  setItemCount,
} from "../state/invoice/invoiceSlice";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";

const TAX_RATE = 0.05;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(amount: number) {
  return amount;
}

function createRow(
  date: string,
  description: string,
  duration: number,
  amount: number
) {
  amount = priceRow(amount);
  return { date, description, duration, amount, selectedItem: "" };
}

interface Row {
  date: string;
  description: string;
  duration: number;
  amount: number;
  selectedItem: string;
}

function subtotal(items: readonly Row[]) {
  return items.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
}

//spanningTable

export default function SpanningTable() {
  const stateProduct = useSelector((state: RootState) => state.invoice);
  const dispatch = useDispatch();

  // items array from the state
  const stateItems = stateProduct.items;
  /*   const selectedItem = stateProduct.selectedItem;
   */
  // Initialize rows state as an empty array
  const [rows, setRows] = React.useState<Row[]>([]);

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const tableHead = ["Date", "Description/Unit", "Duration", "Amount"];

  // Add new row
  const addRow = () => {
    const newRow = createRow(formattedDate, "", 0, 0);
    setRows((prevRows) => [
      ...prevRows,
      { ...newRow, selectedItem: "" }, // Set selectedItem to empty for new row
    ]);
  };

  // Delete row
  const deleteRow = (index: number) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  // Handle change for selected item
  const handleChange =
    (index: number) => (event: SelectChangeEvent<string>) => {
      const newSelectedItems = [...rows];
      const selectedItem = stateItems.find(
        (item) => item.itemId.toString() === event.target.value
      );

      console.log(selectedItem, "selectedItem");

      if (selectedItem) {
        newSelectedItems[index].selectedItem = event.target.value;
        newSelectedItems[index].duration = selectedItem.itemCount || 0;
        newSelectedItems[index].amount = selectedItem.itemTotalPrice || 0;

        priceRow(selectedItem.itemPrice);
      }

      setRows(newSelectedItems);
      dispatch(changeSelectedItem(event.target.value));
    };

  // Handle quantity change
  /*  const handleChangeQty =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value, 'quantity');
      
      const selectedItem = stateItems.find((item)=> item.itemId.toString() === rows[index].selectedItem);
      const newRows = [...rows];
       
      newRows[index].duration = selectedItem?.itemCount || 0
      newRows[index].amount = priceRow(
        selectedItem?.itemTotalPrice || 0
      );
      setRows(newRows);
      dispatch(
        setItemCount({
          itemId: Number(rows[index].selectedItem),
        })
      );
    };
 */

  /* const handleChangeQty =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = Number(event.target.value);

      console.log(newQuantity, "newQuantity");

      const newRows = [...rows];
      newRows[index].duration = newQuantity;
      newRows[index].amount = priceRow(
        stateItems.find(
          (item) => item.itemId.toString() === rows[index].selectedItem
        )?.itemTotalPrice || 0
      );
      setRows(newRows);
      dispatch(
        setItemCount({
          itemId: Number(rows[index].selectedItem),
          operation:
            newQuantity > rows[index].duration ? "increment" : "decrement",
        })
      );
    }; */

  const handleIncrement = (index: number) => {
    dispatch(
      setItemCount({ itemId: rows[index].selectedItem, operation: "increment" })
    );
    const newSelectedItems = [...rows];

    newSelectedItems[index].duration = newSelectedItems[index].duration + 10;
    newSelectedItems[index].amount += 500;

    setRows(newSelectedItems);
    console.log(newSelectedItems, "newSelectedItems");
  };

  const handleDecrement = (index: number) => {
    const selectedItem = stateItems.find(
      (item) => item.itemId === Number(rows[index].selectedItem)
    );

    dispatch(
      setItemCount({ itemId: rows[index].selectedItem, operation: "decrement" })
    );

    const newSelectedItems = [...rows];

    const duration = newSelectedItems[index].duration;

    if (duration > selectedItem?.itemCount) {
      newSelectedItems[index].duration = newSelectedItems[index].duration - 10;
      newSelectedItems[index].amount -= 500;
    }
    setRows(newSelectedItems);

    console.log("clicked");
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            {tableHead.map((item, index) => (
              <TableCell align="center" key={index} colSpan={1}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">
                <Box>
                  <FormControl>
                    <Select
                      labelId="select-small-label"
                      id="select-small"
                      value={row.selectedItem}
                      label="Product"
                      onChange={handleChange(index)}
                      className=" min-w-24 h-14"
                    >
                      {stateItems.map((item) => (
                        <MenuItem
                          key={item.itemId}
                          value={item.itemId.toString()}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "cener",
                  }}
                >
                  <div className="flex gap-2 items-center">
                    {/* <TextField
                    id={`outlined-${index}`}
                    label="duration"
                    type="number"
                    onChange={handleChangeQty(index)}
                    value={rows[index].duration}
                    inputProps={{ step: 10, min: 0 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> */}
                    <div
                      className="border-black w-6 h-6 border-2 flex justify-center items-center rounded"
                      onClick={() => handleDecrement(index)}
                    >
                      <FaMinus />
                    </div>
                    <div className="border-black w-10 h-10 border rounded flex justify-center items-center text-xl">
                      {row.duration}
                    </div>
                    <div
                      className="border-black w-6 h-6 border-2 flex justify-center items-center rounded"
                      onClick={() => handleIncrement(index)}
                    >
                      <FaPlus />
                    </div>
                  </div>
                </Box>
              </TableCell>
              <TableCell align="center">{ccyFormat(row.amount)}</TableCell>
              <TableCell align="center">
                <button onClick={() => deleteRow(index)}>
                  <FaRegTrashAlt />
                </button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <button onClick={addRow}>add new line</button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

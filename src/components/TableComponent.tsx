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
import { changeSelectedItem, decrementItemPrice, incrementItemPrice } from "../state/invoice/invoiceSlice";

const TAX_RATE = 0.05;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(duration: number, amount: number) {
  return duration * amount;
}

function createRow(
  date: string,
  description: string,
  duration: number,
  amount: number
) {
  amount = priceRow(amount, duration);
  return { description, duration, date, amount };
}

interface InvoiceItem {
  itemId: number;
  itemPrice: number;
  itemTotalPrice: number;
  itemCount: number;
  description: string;
  name: string;
}

interface Row {
  date: string;
  description: string;
  duration: number;
  amount: number;
}

function subtotal(items: readonly Row[]) {
  return items.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
}

export default function SpanningTable() {
  const stateProduct = useSelector((state: RootState) => state.invoice);
  const dispatch = useDispatch();

  //this is the item clicked from the select component
  const selectedItems = stateProduct.selectedItem;
  //items array from the state
  const stateItems = stateProduct.items;

  const rows = [
    createRow(
      formattedDate,
      selectedItems.description,
      selectedItems.itemCount,
      selectedItems.itemPrice
    ),
  ];
  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const tableHead = ["Date", "Description/Unit", "Duration", "Amount"];
  //handle change
  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(changeSelectedItem(event.target.value));
  };

  const handleChangeQty = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(event.target.value);
   
   

    if (newQuantity > selectedItems.itemCount) {
      dispatch(incrementItemPrice(selectedItems.itemId));
    } else if (newQuantity < selectedItems.itemCount && newQuantity !== 0) {
      dispatch(decrementItemPrice(selectedItems.itemId));
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        {/* table head */}
        <TableHead>
          <TableRow>
            {tableHead.map((item, index) => (
              <TableCell align="center" key={index} colSpan={1}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {/* table body */}
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.amount}>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">
                <Box>
                  <FormControl>
                    <Select
                      labelId="select-small-label"
                      id="select-small"
                      value={
                        stateProduct.selectedItem?.itemId
                          ? stateProduct.selectedItem.itemId.toString()
                          : ""
                      }
                      label="Product"
                      onChange={handleChange}
                      className=" min-w-24 h-14"
                    >
                      {stateItems.map((item) => (
                        <MenuItem key={item.itemId} value={item.itemId}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box>
                  <TextField
                    id="outlined-number"
                    label="duration"
                    type="number"
                    onChange={handleChangeQty}
                    value={row.duration}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              </TableCell>
              <TableCell align="center">{ccyFormat(row.amount)}</TableCell>
            </TableRow>
          ))}
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

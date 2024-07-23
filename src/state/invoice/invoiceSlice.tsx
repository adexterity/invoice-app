import { createSlice } from "@reduxjs/toolkit";

interface InvoiceItem {
  itemId: number;
  itemPrice: number;
  itemTotalPrice: number;
  itemCount: number;
  description: string;
  name: string;
}

interface InvoiceType {
  items: InvoiceItem[];
  totalPrice: number;
  selectedItem: InvoiceItem;
}

const initialState: InvoiceType = {
  items: [],
  totalPrice: 0,
  selectedItem: {
    itemId: 0,
    itemPrice: 0,
    itemTotalPrice: 0,
    itemCount: 0,
    description: "",
    name: "",
  },
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    getAllItems: (state, action) => {
      state.items = action.payload;
    },
    incrementTotalPrice: (state, action) => {
      const invoiceItem = state.items.find(
        (item) => item.itemId === Number(action.payload)
      );
      console.log(action.payload, "reducer cart item");
      if (invoiceItem) {
        state.totalPrice += invoiceItem.itemPrice;
        console.log(state, "state");
      }
    },
    changeSelectedItem: (state, action) => {
      const clickedItem = state.items.find(
        (item) => item.itemId === Number(action.payload)
      );
      console.log(clickedItem, "clicked item");
      console.log(action.payload, "clicked item");

      if (clickedItem) {
        state.selectedItem = clickedItem;
      }
    },
    incrementItemPrice: (state, action) => {
      const invoiceItem = state.items.find(
        (item) => item.itemId === action.payload
      );
      if (invoiceItem) {
        console.log("Incrementing item price for itemId:", action.payload);
        console.log("Current item count:", invoiceItem.itemCount);
        //increase the quantity of the selected item
        invoiceItem.itemCount += 1;
        //increase the total price of the selected item
        console.log("itemTotalPrice:", invoiceItem.itemTotalPrice);

        invoiceItem.itemTotalPrice += invoiceItem.itemPrice;
        //increase the total price in the state
        state.totalPrice += invoiceItem.itemPrice;
      }
    },
    decrementItemPrice: (state, action) => {
      const invoiceItem = state.items.find(
        (item) => item.itemId === action.payload
      );
      console.log("decrementing item price for itemId:", action.payload);

      if (invoiceItem) {
        //decrease the quantity of the selected item
        invoiceItem.itemCount -= 1;
        //decrease the total price of the selected item

        invoiceItem.itemTotalPrice -= invoiceItem.itemPrice;
        //decrease the total price in the state
        state.totalPrice -= invoiceItem.itemPrice;
      }
    },
  },
});

//exporting actions
export const {
  getAllItems,
  incrementItemPrice,
  decrementItemPrice,
  incrementTotalPrice,
  changeSelectedItem,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

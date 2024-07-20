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
}

const initialState: InvoiceType = {
  items: [],
  totalPrice: 0,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    getAllItems: (state, action) => {
      state.items = action.payload;
      
     
    },
    incrementTotalPrice: (state, action)=>{

     const cartItem = state.items.find((item)=> item.itemId === action.payload)
      console.log(cartItem, 'reducer cart item')
      if(cartItem){
        state.totalPrice += cartItem.itemPrice
      } 
    },
    incrementItemPrice: (state, action) => {
      const cartItem = state.items.find(
        (item) => item.itemId === action.payload
      );
      if (cartItem) {
        console.log("Incrementing item price for itemId:", action.payload);
        console.log("Current item count:", cartItem.itemCount);
        //increase the quantity of the selected item
        cartItem.itemCount += 1;
        //increase the total price of the selected item
console.log('itemTotalPrice:', cartItem.itemTotalPrice);

        cartItem.itemTotalPrice += cartItem.itemPrice;
        //increase the total price in the state
        state.totalPrice += cartItem.itemPrice;
      }
    },
    decrementItemPrice: (state, action) => {
      const cartItem = state.items.find(
        (item) => item.itemId === action.payload
      );
      if (cartItem) {
        //decrease the quantity of the selected item
        cartItem.itemCount -= 1;
        //decrease the total price of the selected item

        cartItem.itemTotalPrice -= cartItem.itemPrice;
        //decrease the total price in the state
        state.totalPrice -= cartItem.itemPrice;
      }
    },
  },
});

//exporting actions
export const { getAllItems, incrementItemPrice, decrementItemPrice , incrementTotalPrice} =
  invoiceSlice.actions;

export default invoiceSlice.reducer;

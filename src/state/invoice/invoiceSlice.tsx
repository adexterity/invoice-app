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
  selectedItem: InvoiceItem | null;
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


    
    setItemCount: (state, action) => {
      const { itemId, operation } = action.payload;
      const item = state.items.find((item) => item.itemId === itemId);
      if (item) {
        if (operation === 'increment') {
          item.itemCount += 10; // Increment itemCount by 10
        } else if (operation === 'decrement') {
          // Only decrement if itemCount is greater than or equal to 10
          if (item.itemCount >= 10) {
            item.itemCount -= 10; // Decrement itemCount by 10
          }
        }
        // Update selectedItem if needed
        if (state.selectedItem && state.selectedItem.itemId === itemId) {
          state.selectedItem.itemCount = item.itemCount;
        }
      }
    },

    incrementTotalPrice: (state, action) => {
      const invoiceItem = state.items.find(
        (item) => item.itemId === Number(action.payload)
      );
      if (invoiceItem) {
        state.totalPrice += invoiceItem.itemPrice;
      }
    },

    changeSelectedItem: (state, action) => {
      const selectedItem = state.items.find(
        (item) => item.itemId === Number(action.payload)
      );
      console.log(selectedItem, "selectedItem");

      if (selectedItem) {
        state.selectedItem = selectedItem;
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.itemId !== action.payload
      );
      if (state.selectedItem && state.selectedItem?.itemId === action.payload) {
        state.selectedItem =
          state.items.length > 0 ? { ...state.items[0] } : null;
      }
    },
  },
});

//exporting actions
export const {
  getAllItems,

  incrementTotalPrice,
  changeSelectedItem,
  setItemCount,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

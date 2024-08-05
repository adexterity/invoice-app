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


    /* setItemCount: (state, action) => {
      const { itemId } = action.payload;
      const item = state.items.find((item) => item.itemId === itemId);
      const increment = 10;
      if (item) {

        if (item.itemCount > increment) {
          item.itemCount += 10;
        } else if(item.itemCount < increment) {
          item.itemCount -= 10;
        }
        state.selectedItem.itemCount = item.itemCount;
      }
    }, */
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
        if (state.selectedItem.itemId === itemId) {
          state.selectedItem.itemCount = item.itemCount;
        }
      }
    },




















    /* setItemCount: (state, action) => {
      const { itemId, itemCount } = action.payload;

      const item = state.items.find((item) => item.itemId === itemId);

      console.log('item clicked');

      if (item) {
        if (item.itemCount < itemCount) {
          item.itemCount += 10;
          
        } else if (item.itemCount > itemCount) {
          item.itemCount -= 10;
        }
        state.selectedItem.itemCount  = item.itemCount;
        item.itemTotalPrice += item.itemPrice; // Update total price for the item
        state.selectedItem.itemTotalPrice = item.itemTotalPrice;
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.itemTotalPrice,
          0
        ); // Update total price for all items
      }
    }, */

    /* setItemCount: (state, action) => {
      const { itemId, itemCount } = action.payload;
      const item = state.items.find((item) => item.itemId === itemId);
    
      if (item) {
        const increment = itemCount > item.itemCount; // Determine if we need to increment or decrement
        const step = 10;
        
        // Ensure itemCount is adjusted in steps of 10
        if (increment) {
          item.itemCount = Math.ceil(itemCount / step) * step;
        } else {
          item.itemCount = Math.floor(itemCount / step) * step;
        }
        
        // Update itemTotalPrice based on new itemCount
        item.itemTotalPrice = item.itemPrice * item.itemCount;
        state.selectedItem.itemCount = item.itemCount;
        state.selectedItem.itemTotalPrice = item.itemTotalPrice;
    
        // Update total price for all items
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.itemTotalPrice,
          0
        );
      }
    }, */
    
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
      if (state.selectedItem?.itemId === action.payload) {
        state.selectedItem =
          state.items.length > 0 ? { ...state.items[0] } : null;
      }
    },

    /*  incrementItemPrice: (state, action) => {
      const invoiceItem = state.items.find(
        (item) => item.itemId === action.payload
      );
      if (invoiceItem) {
        //increase the quantity of the selected item
        invoiceItem.itemCount += 10;
        if (state.selectedItem)
          state.selectedItem.itemCount = invoiceItem.itemCount;
        //increase the total price of the selected item
        console.log("itemTotalPrice:", invoiceItem.itemTotalPrice);

        invoiceItem.itemTotalPrice += invoiceItem.itemPrice;
        //increase the total price in the state
        state.totalPrice += invoiceItem.itemPrice;
      }
    }, */
    /*  decrementItemPrice: (state, action) => {
      const invoiceItem = state.items.find(
        (item) => item.itemId === action.payload
      );

      if (invoiceItem) {
        //decrease the quantity of the selected item
        invoiceItem.itemCount -= 10;
        //decrease the total price of the selected item

        invoiceItem.itemTotalPrice -= invoiceItem.itemPrice;
        //decrease the total price in the state
        state.totalPrice -= invoiceItem.itemPrice;
      }
    }, */
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

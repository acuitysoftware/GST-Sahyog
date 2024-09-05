import { createSlice } from '@reduxjs/toolkit';

export const InvoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    invoiceNo: '', 
  },
  reducers: {
    setInvoiceNo(state, action) {
      state.invoiceNo = action.payload; 
    },
    resetInvoiceNo(state) {
        state.invoiceNo = ''; 
      },
  },
});

export const {setInvoiceNo,resetInvoiceNo } = InvoiceSlice.actions;
export default InvoiceSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Wallet {
  id: string;
  label?: string;
  chain: string;
  address: string;
}

interface WalletState {
  list: Wallet[];
}

const initialState: WalletState = {
  list: [],
};

const walletSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    setWallets(state, action: PayloadAction<Wallet[]>) {
      state.list = action.payload;
    },
    addWallet(state, action: PayloadAction<Wallet>) {
      state.list.push(action.payload);
    },
    removeWallet(state, action: PayloadAction<string>) {
      state.list = state.list.filter((wallet) => wallet.id !== action.payload);
    },
  },
});

export const { setWallets, addWallet, removeWallet } = walletSlice.actions;
export default walletSlice.reducer;

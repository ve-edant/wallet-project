"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setWallets } from "@/store/walletSlice";

export default function WalletList() {
  const dispatch = useDispatch<AppDispatch>();
  const wallets = useSelector((state: RootState) => state.wallet.list);

  useEffect(() => {
    fetch("/api/wallets")
      .then((res) => res.json())
      .then((data) => dispatch(setWallets(data)));
  }, [dispatch]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Your Wallets</h2>
      <ul className="mt-3 space-y-3">
        {wallets.length === 0 && (
          <li className="text-gray-500">No wallets added yet</li>
        )}
        {wallets.map((wallet) => (
          <li key={wallet.id} className="border p-3 rounded shadow-sm">
            <div className="flex justify-between">
              <span>{wallet.label || `${wallet.chain} Wallet`}</span>
              <span className="text-sm text-gray-500">{wallet.chain}</span>
            </div>
            <p className="text-xs break-all text-gray-600">{wallet.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setWallets, addWallet } from "@/store/walletSlice";
import { QRCodeSVG } from "qrcode.react";
import { Copy, X } from "lucide-react";

export default function WalletList() {
  const dispatch = useDispatch<AppDispatch>();
  const wallets = useSelector((state: RootState) => state.wallet.list);
  const [openWalletId, setOpenWalletId] = useState<string | null>(null);

  // Form state
  const [chain, setChain] = useState("");
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Fetch wallets on mount
  useEffect(() => {
    fetch("/api/wallet")
      .then((res) => res.json())
      .then((data) => dispatch(setWallets(data)));
  }, [dispatch]);

  // Handle form submit
  const handleAddWallet = async (e: React.FormEvent) => {
    e.preventDefault();

    const newWallet = { chain, label, address };

    try {
      const res = await fetch("/api/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWallet),
      });

      if (!res.ok) throw new Error("Failed to add wallet");

      const savedWallet = await res.json();
      dispatch(addWallet(savedWallet)); // Add to Redux
      setChain("");
      setLabel("");
      setAddress("");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleQRCode = (id: string) => {
    setOpenWalletId(openWalletId === id ? null : id);
  };

  const copyToClipboard = (text: string) => {
    // Fallback for clipboard access in some environments
    if (document.execCommand) {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      console.log("Copied to clipboard:", text);
    } else {
      console.error("Copy to clipboard failed.");
    }
  };

  return (
    <div className="relative h-auto w-full">
      <h2 className="text-xl font-semibold mb-4">Your Wallets</h2>

      {/* Wallet List */}
      <ul className="space-y-3">
        {wallets.length === 0 && (
          <li className="text-gray-500">No wallets added yet</li>
        )}
        {wallets.map((wallet) => (
          <li key={wallet.id} className="border p-3 rounded shadow-sm relative">
            <div className="flex justify-between items-center">
              <span>{wallet.label || `${wallet.chain} Wallet`}</span>
              <span className="text-sm text-gray-500">{wallet.chain}</span>
            </div>
            <p
              className="text-xs break-all text-gray-600 cursor-pointer select-text mt-1"
              onClick={() => toggleQRCode(wallet.id)}
              title="Click to show QR code"
            >
              {wallet.address}
            </p>

            {/* QR Code Popover */}
            {openWalletId === wallet.id && (
              <>
                <div
                  className="fixed inset-0 bg-gray-500/50 bg-opacity-50 z-40"
                  onClick={() => setOpenWalletId(null)}
                />
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-[#171717] rounded-2xl shadow-2xl w-full max-w-sm py-20 flex flex-col items-center relative">
                    {/* Close button */}
                    <div>
                      <h3 className="absolute top-3 left-1/2 transform -translate-x-1/2 text-xl font-bold">
                        Receive
                      </h3>
                      <button
                        className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-white transition-colors duration-200"
                        onClick={() => setOpenWalletId(null)}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Popover Header */}

                    {/* QR Code and Wallet Info */}
                    <div className="bg-white p-4 rounded-lg shadow-inner">
                      <QRCodeSVG
                        value={
                          wallets.find((w) => w.id === openWalletId)?.address ||
                          ""
                        }
                        size={180}
                      />
                    </div>

                    <p
                      className="
    mt-4 
    text-lg 
    text-center 
    text-gray-600 
    px-4 
    select-all 
    break-words 
    max-w-full 
    overflow-x-auto
    whitespace-pre-wrap
  "
                      style={{ wordBreak: "break-word" }}
                    >
                      {wallets.find((w) => w.id === openWalletId)?.address ||
                        "No address found"}
                    </p>

                    {/* Copy Button */}
                    <button
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
                      onClick={() =>
                        copyToClipboard(
                          wallets.find((w) => w.id === openWalletId)?.address ||
                            ""
                        )
                      }
                    >
                      <Copy size={16} />
                      <span>Copy address</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Add Wallet Button and Form */}
      <div className="relative mt-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? "Close" : "Add Wallet"}
        </button>

        {showForm && (
          <div className="absolute z-10 mt-2 p-4 bg-[#111] text-white border rounded shadow-lg w-80">
            <form
              onSubmit={(e) => {
                handleAddWallet(e);
                setShowForm(false);
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="Chain (e.g. Ethereum)"
                value={chain}
                onChange={(e) => setChain(e.target.value)}
                className="border p-2 rounded bg-[#222] text-white"
                required
              />
              <input
                type="text"
                placeholder="Label (optional)"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="border p-2 rounded bg-[#222] text-white"
              />
              <input
                type="text"
                placeholder="Wallet Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-2 rounded bg-[#222] text-white"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-3 py-1 border rounded border-gray-600 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

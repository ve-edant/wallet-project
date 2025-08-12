"use client";

import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  PaperAirplaneIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";

export default function Balance() {
  const [showBalance, setShowBalance] = useState(true);
  const balanceUSD = 0.0;
  const percentageChange = 0.0;

  return (
    <div className="bg-[#111] px-2 md:px-15 lg:px-30  py-3 text-white w-full h-fit text-left">
      {/* Balance Display */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold">
            {showBalance ? `$${balanceUSD.toFixed(2)}USD` : "•••• USD"}
          </span>
          <button
            className="p-1 rounded-lg hover:bg-gray-800"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? (
              <EyeIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <EyeSlashIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        <div className="text-sm text-[#8c8c8c] flex items-center gap-1 mt-1">
          <span>
            {percentageChange >= 0 ? "+" : ""}
            ${0} ({percentageChange.toFixed(2)}%)
          </span>
          <a
            href="#"
            className="text-blue-400 hover:underline ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discover
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        <ActionButton icon={<ArrowPathIcon className="w-6 h-6" />} label="Buy/Sell" />
        <ActionButton icon={<ArrowsRightLeftIcon className="w-6 h-6" />} label="Swap" />
        <ActionButton icon={<PaperAirplaneIcon className="w-6 h-6" />} label="Send" />
        <ActionButton icon={<QrCodeIcon className="w-6 h-6" />} label="Receive" />
      </div>
    </div>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col p-4 items-center justify-center bg-[#1a1a1a] rounded-lg py-3 hover:bg-[#222] transition">
      <div className="text-gray-300">{icon}</div>
      <span className="text-sm mt-1">{label}</span>
    </button>
  );
}

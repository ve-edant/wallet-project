"use client";
import React, { useState } from "react";
import { Wallet, DollarSign } from "lucide-react";
import WalletList from "./WalletList";
import CoinsContent from "./CoinsContent";

const TabbedSection = () => {
  const [activeTab, setActiveTab] = useState("coins");

  return (
    <div className="bg-[#111] text-white flex flex-col min-h-screen w-full max-w-4xl mx-auto p-2 rounded-lg shadow-lg">
      {/* Tabs */}
      <nav
        className="flex border-b border-gray-700"
        role="tablist"
        aria-label="Wallet tabs"
      >
        {[
          { id: "coins", label: "Coins", Icon: DollarSign },
          { id: "wallet", label: "Wallets", Icon: Wallet },
        ].map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${id}-tab`}
              id={`${id}-tab-btn`}
              onClick={() => setActiveTab(id as "coins" | "wallet")}
              className={`flex items-center justify-center gap-2 flex-1 p-4 font-semibold text-sm transition-colors duration-200
                ${
                  isActive
                    ? "border-b-2 border-indigo-500 text-indigo-400"
                    : "border-b-2 border-transparent hover:bg-gray-700 text-gray-400 hover:text-white"
                }`}
            >
              <Icon size={20} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Content */}
      <section
        id={`${activeTab}-tab`}
        role="tabpanel"
        aria-labelledby={`${activeTab}-tab-btn`}
        className="py-6 px-2"
      >
        {activeTab === "coins" ? <CoinsContent /> : <WalletList />}
      </section>
    </div>
  );
};

export default TabbedSection;

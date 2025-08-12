"use client";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ClipboardIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export function WalletHeader() {
  const currentWallet = useSelector((state: RootState) => state.wallet.list[0]); // temp: first wallet
  const address = currentWallet?.address || "0x0000...0000";
  const accountName = currentWallet?.label || "Account 1";

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <header className="flex items-center justify-between w-full bg-[#111] text-white p-4 shadow-sm rounded-lg">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
          🪙
        </div>
        <div className="flex flex-col">
          {/* Account dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-1 text-gray-800 font-medium hover:text-blue-500">
              {accountName}
              <ChevronDownIcon className="w-4 h-4" />
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-in"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute mt-2 bg-white shadow-lg rounded-lg w-48 p-2">
                <Menu.Item>
                  {({ active }) => (
                    <button className={`w-full text-left p-2 rounded-md ${active ? "bg-gray-100" : ""}`}>
                      Account details
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button className={`w-full text-left p-2 rounded-md ${active ? "bg-gray-100" : ""}`}>
                      View on Explorer
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Address & Copy */}
          <button
            className="flex items-center gap-1 text-gray-500 hover:text-gray-800 text-sm"
            onClick={copyToClipboard}
          >
            {shortAddress}
            <ClipboardIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right side */}
      <Menu as="div" className="relative">
        <Menu.Button className="p-2 rounded-lg hover:bg-gray-100">
          <EllipsisVerticalIcon className="w-5 h-5 text-gray-600" />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-in"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 p-2">
            <Menu.Item>
              {({ active }) => (
                <button className={`w-full text-left p-2 rounded-md ${active ? "bg-gray-100" : ""}`}>
                  Networks
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button className={`w-full text-left p-2 rounded-md ${active ? "bg-gray-100" : ""}`}>
                  Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button className={`w-full text-left p-2 rounded-md text-red-500 ${active ? "bg-gray-100" : ""}`}>
                  Lock Wallet
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </header>
  );
}

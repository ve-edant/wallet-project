import React, { useEffect, useState } from "react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price_change_percentage_24h: number;
}

const CoinsContent: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
        );
        const data: Coin[] = await res.json();
        setCoins(data);
      } catch (error) {
        console.error("Failed to fetch coins:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      {coins.map((coin) => {
        const isPositive = coin.price_change_percentage_24h >= 0;
        return (
          <div key={coin.id} className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              <div className="font-semibold">
                {coin.name}
              </div>
              <div
                className={`text-sm mt-1 flex items-center ${
                  isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                <span className="mr-1">{isPositive ? "▲" : "▼"}</span>{" "}
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CoinsContent;

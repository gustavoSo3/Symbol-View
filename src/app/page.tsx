"use client"
import { useEffect, useState } from "react";
import { getSymbolsQuery } from "../lib/APICalls";
import SymbolCard, { SymbolCardSHIMMER } from "../components/SymbolCard";



export default function Page() {
  const [symbols, setSymbols] = useState<symbol_simple_query[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const home_page_symbols: Array<string> = [
    "NVDA",
    "MSFT",
    "AAPL",
    "GOOGL",
    "AMZN",
    "META",
    "AVGO",
    "TSM",
    "TSLA",
    "ORCL",
    "ASML",
    "CSCO",
    "AMD",
    "INTC",
    "TXN",
  ];

  useEffect(() => {
    setLoading(true);
    getSymbolsQuery(home_page_symbols)
      .then((fetched_data) => {
        console.log(fetched_data);
        setSymbols(fetched_data);
        setLoading(false);
      })
      .catch((reason) => {
        console.log(reason);
      });

  }, []);

  return (
    <div>
      <div className="mt-3 text-2xl text-center">Click on a symbol for more information</div>

      <div className="flex flex-wrap p-2 items-center justify-center">
        {loading
          ? Array.from({ length: 15 }).map((_, i) => <SymbolCardSHIMMER key={i} />)
          : symbols.map((symbol, i) => <SymbolCard key={i} symbol={symbol} />)
        }
      </div>
    </div>
  );
}

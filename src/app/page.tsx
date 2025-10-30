"use client"
import { useEffect, useState } from "react";
import { getSymbolsQuery } from "../lib/APICalls";
import SymbolCard from "../components/SymbolCard";



export default function Page() {
  const [symbols, setSymbols] = useState<symbol_simple_query[]>([]);
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

    getSymbolsQuery(home_page_symbols)
      .then((fetched_data) => {
        console.log(fetched_data);
        setSymbols(fetched_data);
      })
      .catch((reason) => {
        console.log(reason);
        setSymbols([]);
      });

  }, []);

  return (
    <div>
      <div className="mt-3 text-2xl text-center">Click on a symbol for more information</div>

      <div className="flex flex-wrap p-2 items-center justify-center">
        {symbols.map((symbol: symbol_simple_query, index) => (
          <SymbolCard key={index} symbol={symbol}></SymbolCard>
        ))}
      </div>
    </div>
  );
}

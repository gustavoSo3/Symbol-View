"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type symbol_data = {
  symbol: string;
  open_value: number;
  current_value: number;
  change: number;
};

async function getSymbols(symbols: Array<string>): Promise<Array<symbol_data>> {

  //TODO: change to dinamic symbol

  const resp_symbols: Array<symbol_data> = await Promise.all(
    symbols.map(async (symbol: string) => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`
      );
      const symbol_raw_object = await response.json();

      const current: symbol_data = {
        symbol: symbol,
        open_value: Number(symbol_raw_object["Global Quote"]["02. open"]),
        current_value: Number(symbol_raw_object["Global Quote"]["05. price"]),
        change: Number(symbol_raw_object["Global Quote"]["10. change percent"].slice(0, 7)),
      };

      return current;
    })
  );

  return resp_symbols;
}

export default function Page() {
  const [symbols, setSymbols] = useState<symbol_data[]>([]);
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

    getSymbols(home_page_symbols)
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
      <h2>Here are 15 Symbols</h2>

      <div>
        {symbols.map((symbol: symbol_data, index) => (
          <Link key={index} href={`/${symbol.symbol}`}>
            <div >
              <h2>{symbol.symbol}</h2>
              <h3>open: {symbol.open_value}</h3>
              <h3>current: {symbol.current_value}</h3>
              <h3>change: {symbol.change}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

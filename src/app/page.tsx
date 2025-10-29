"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ticker_data = {
  ticker_name: string;
  open_value: number;
  current_value: number;
  change: number;
};

async function getTickers(tickets: Array<string>): Promise<Array<ticker_data>> {

  //TODO: change to dinamic symbol

  const tickets_data: Array<ticker_data> = await Promise.all(
    tickets.map(async (ticket: string) => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`
      );
      const ticket_object = await response.json();

      const current: ticker_data = {
        ticker_name: ticket,
        open_value: Number(ticket_object["Global Quote"]["02. open"]),
        current_value: Number(ticket_object["Global Quote"]["05. price"]),
        change: Number(ticket_object["Global Quote"]["10. change percent"].slice(0, 7)),
      };

      return current;
    })
  );

  return tickets_data;
}

export default function Page() {
  const [tickers, setTickers] = useState<ticker_data[]>([]);
  const ticker_names: Array<string> = [
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

    getTickers(ticker_names)
      .then((fetched_data) => {
        console.log(fetched_data);
        setTickers(fetched_data);
      })
      .catch((reason) => {
        console.log(reason);
        setTickers([]);
      });

  }, []);

  return (
    <div>
      <h2>Latest 15 tickets</h2>

      <div>
        {tickers.map((ticker: ticker_data, index) => (
          <Link key={index} href={`/${ticker.ticker_name}`}>
            <div >
              <h2>{ticker.ticker_name}</h2>
              <h3>open: {ticker.open_value}</h3>
              <h3>current: {ticker.current_value}</h3>
              <h3>change: {ticker.change}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

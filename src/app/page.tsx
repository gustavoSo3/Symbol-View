"use client";

import { useEffect, useState } from "react";

type ticket_data = {
  ticket_name: string;
  open_value: number;
  current_price: number;
  change: number;
};

async function getTickets(tickets: Array<string>): Promise<Array<ticket_data>> {
  const tickets_data: Array<ticket_data> = await Promise.all(
    tickets.map(async (ticket: string) => {
      const response = await fetch(
        "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo"
      );
      const ticket_object = await response.json();

      const current: ticket_data = {
        ticket_name: ticket,
        open_value: Number(ticket_object["Global Quote"]["02. open"]),
        current_price: Number(ticket_object["Global Quote"]["05. price"]),
        change: Number(ticket_object["Global Quote"]["10. change percent"].slice(0, 7)),
      };

      return current;
    })
  );

  return tickets_data;
}

export default function Page() {
  const [tickets, setTickets] = useState<ticket_data[]>([]);
  const ticket_names: Array<string> = [
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

    getTickets(ticket_names)
      .then((fetched_data) => {
        console.log(fetched_data);
        setTickets(fetched_data);
      })
      .catch((reason) => {
        console.log(reason);
        setTickets([]);
      });

  }, []);

  return (
    <div>
      <h2>Latest 15 tickets</h2>

      <div>
        {tickets.map((ticket: ticket_data, index) => (
          <div key={index}>
            <h2>{ticket.ticket_name}</h2>
            <h3>open: {ticket.open_value}</h3>
            <h3>current: {ticket.current_price}</h3>
            <h3>change: {ticket.change}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

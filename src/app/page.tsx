import { Suspense } from "react";
import { getSymbolsQuery } from "../lib/APICalls";
import { SymbolCardSHIMMER } from "../components/SymbolCard";
import SymbolCardsContainer from "../components/SymbolCardsContainer";



export default function Page() {
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
  const symbols = getSymbolsQuery(home_page_symbols);
  return (
    <div>
      <div className="mt-3 text-2xl text-center">Click on a symbol for more information</div>

      <div className="flex flex-wrap p-2 items-center justify-center">
        <Suspense fallback={Array.from({ length: 15 }).map((_, i) => <SymbolCardSHIMMER key={i} />)}>
          <SymbolCardsContainer symbol_promise={symbols} />
        </Suspense>
      </div>
    </div>
  );
}

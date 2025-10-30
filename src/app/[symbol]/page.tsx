"use client"
import { use, useEffect, useState } from "react";
import DailySeriesChart from "../../components/DailySeriesChart";
import DaylySeriesTable from "../../components/DailySeriesTable";
import { getSymbolInfo } from "../../lib/APICalls";
import SymbolInformation from "../../components/SymbolInformation";
import Link from "next/link";




export default function Page({
  params,
}: {
  params: Promise<{ symbol: string }>
}) {

  const [symbol, setSymbol] = useState<symbol_complex_query>({} as symbol_complex_query);
  const symbol_string: string = use(params).symbol;

  useEffect(() => {

    getSymbolInfo(symbol_string)
      .then((fetched_data) => {
        console.log(fetched_data);
        setSymbol(fetched_data);

      })
      .catch((reason) => {
        console.log(reason);
      });

  }, []);

  return (
    <div className="overflow-x-hidden">
      <Link className="text-lg p-5" href="/">&larr; Go Back to Listing</Link>
      <div className="flex border-2 flex-col lg:flex-row items-center">
        {symbol && (<SymbolInformation symbol={symbol} />)}

        <div className="w-full lg:w-1/2 h-[400px]">
          {symbol.day_series && symbol.day_series.time_series_daily && (
            <DailySeriesChart data={symbol.day_series} />
          )}
        </div>
      </div>
      {
        symbol.day_series && symbol.day_series.time_series_daily && (
          <DaylySeriesTable data={symbol.day_series} />
        )
      }
    </div >
  );
}

"use client"
import { use, useEffect, useState } from "react";
import DailySeriesChart, { DailySeriesChartSHIMMER } from "../../components/DailySeriesChart";
import DaylySeriesTable, { DailyTableSHIMMER } from "../../components/DailySeriesTable";
import { getSymbolInfo } from "../../lib/APICalls";
import SymbolInformation, { SymbolInformationSHIMMER } from "../../components/SymbolInformation";
import Link from "next/link";




export default function Page({
  params,
}: {
  params: Promise<{ symbol: string }>
}) {

  const [symbol, setSymbol] = useState<symbol_complex_query>({} as symbol_complex_query);
  const [loading, setLoading] = useState<boolean>(true);
  const symbol_string: string = use(params).symbol;

  useEffect(() => {
    setLoading(true);
    getSymbolInfo(symbol_string)
      .then((fetched_data) => {
        console.log(fetched_data);
        setSymbol(fetched_data);
        setLoading(false);
      })
      .catch((reason) => {
        console.log(reason);
      });

  }, []);

  return (
    <div className="overflow-x-hidden">
      <Link className="text-lg p-5" href="/">&larr; Go Back to Listing</Link>
      <div className="flex border-2 flex-col lg:flex-row items-center">
        <div className="basis-1 lg:min-h-[400px] lg:basis-1/2 p-5 lg:p-3 border-b-2 lg:border-none ">
          {loading && (<SymbolInformationSHIMMER />)}
          {!loading && symbol && (<SymbolInformation symbol={symbol} />)}
        </div>

        <div className="w-full lg:w-1/2 h-[400px]">
          {loading && (<DailySeriesChartSHIMMER />)}
          {!loading && symbol.day_series && symbol.day_series.time_series_daily && (
            <DailySeriesChart data={symbol.day_series} />
          )}
        </div>
      </div>
      <div>
        {loading && (<DailyTableSHIMMER />)}
        {
          !loading && symbol.day_series && symbol.day_series.time_series_daily && (
            <DaylySeriesTable data={symbol.day_series} />
          )
        }
      </div>
    </div >
  );
}

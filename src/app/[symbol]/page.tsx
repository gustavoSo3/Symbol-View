"use client"
import { use, useEffect, useState } from "react";
import DailySeriesChart from "../../components/DailySeriesChart";
import DaylySeriesTable from "../../components/DailySeriesTable";
import { getSymbolData } from "../../lib/APICalls";
import SymbolInformation from "../../components/SymbolInformation";




export default function Page({
  params,
}: {
  params: Promise<{ symbol: string }>
}) {

  const [symbol, setSymbol] = useState<symbol_complex_query>({} as symbol_complex_query);
  const symbol_string: string = use(params).symbol;

  useEffect(() => {

    getSymbolData(symbol_string)
      .then((fetched_data) => {
        console.log(fetched_data);
        setSymbol(fetched_data);

      })
      .catch((reason) => {
        console.log(reason);
      });

  }, []);

  return (
    <div>
      <div className="flex border-2">
        {symbol && (<SymbolInformation symbol={symbol} />)}

        {symbol.day_series && symbol.day_series.time_series_daily && (
          <DailySeriesChart data={symbol.day_series} />
        )}
      </div>
      {
        symbol.day_series && symbol.day_series.time_series_daily && (
          <DaylySeriesTable data={symbol.day_series} />
        )
      }
    </div >
  );
}

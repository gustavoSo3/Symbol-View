"use client"
import { use, useEffect, useState } from "react";
import DailySeriesChart from "../../components/DailySeriesChart";
import DaylySeriesTable from "../../components/DailySeriesTable";
import { getSymbolData } from "../../lib/APICalls";




export default function Page({
  params,
}: {
  params: Promise<{ symbol: string }>
}) {

  const [symbol, setSymbol] = useState<symbol_iformation>({} as symbol_iformation);
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

        <div className="basis-1/2  border-2">
          <div className="flex">
            <div className="text-5xl">{symbol.symbol}</div>
            <div className="flex flex-col text-l text-gray-600">
              <div>{symbol.asset_type}</div>
              <div>{symbol.exchange}</div>
            </div>
          </div>
          <div className="flex">
            <div className="text-3xl">{symbol.name}</div>
            <div>{symbol.country}</div>
          </div>
          <div className="flex">
            <div>Market Cap: ${symbol.market_capitalization}</div>
            <div>: {symbol.currency}</div>
          </div>
          <div className="flex flex-col">
            <div>Sector: {symbol.sector}</div>
            <div>Industry: {symbol.industry}</div>
          </div>
          <div>{symbol.description}</div>
        </div>


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

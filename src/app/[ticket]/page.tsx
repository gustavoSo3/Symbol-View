"use client";
import { use, useEffect, useState } from "react";
import { Bar, CartesianGrid, Cell, ComposedChart, ErrorBar, Label, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type symbol_iformation = {
  symbol: string;
  asset_type: string;
  name: string;
  description: string;
  exchange: string;
  currency: string;
  country: string;
  sector: string;
  industry: string;
  market_capitalization: number;
  day_series: day_series;
};

type day_series = {
  meta_data: {
    information: string;
    symbol: string;
    last_refreshed: string;
    output_size: string;
    time_zone: string;
  };
  time_series_daily: {
    [date: string]: {
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
    };
  };
};

function parseDaySeries(raw: any): day_series {
  const meta = raw["Meta Data"];
  const series = raw["Time Series (Daily)"];

  const parsed_series: day_series["time_series_daily"] = {};

  for (const date in series) {
    const day = series[date];
    parsed_series[date] = {
      open: Number(day["1. open"]),
      high: Number(day["2. high"]),
      low: Number(day["3. low"]),
      close: Number(day["4. close"]),
      volume: Number(day["5. volume"]),
    };
  }

  return {
    meta_data: {
      information: meta["1. Information"],
      symbol: meta["2. Symbol"],
      last_refreshed: meta["3. Last Refreshed"],
      output_size: meta["4. Output Size"],
      time_zone: meta["5. Time Zone"],
    },
    time_series_daily: parsed_series,
  };
}

async function getSymbolData(symbol: string): Promise<symbol_iformation> {

  // Get Symbol data
  //TODO: change to dinamic symbol
  var response = await fetch(
    "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo"
  );
  const symbol_object = await response.json();

  response = await fetch(
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo"
  );

  const day_series_object = await response.json();

  console.log({
    "symbol": symbol_object["Symbol"],
    "asset_type": symbol_object["AssetType"],
    "name": symbol_object["Name"],
    "description": symbol_object["Description"],
    "exchange": symbol_object["Exchange"],
    "currency": symbol_object["Currency"],
    "country": symbol_object["Country"],
    "sector": symbol_object["Sector"],
    "industry": symbol_object["Industry"],
    "market_capitalization": Number(symbol_object["MarketCapitalization"]),
    "day_series": parseDaySeries(day_series_object)
  })
  return {
    "symbol": symbol_object["Symbol"],
    "asset_type": symbol_object["AssetType"],
    "name": symbol_object["Name"],
    "description": symbol_object["Description"],
    "exchange": symbol_object["Exchange"],
    "currency": symbol_object["Currency"],
    "country": symbol_object["Country"],
    "sector": symbol_object["Sector"],
    "industry": symbol_object["Industry"],
    "market_capitalization": Number(symbol_object["MarketCapitalization"]),
    "day_series": parseDaySeries(day_series_object)
  };
}

function DaylyChart({
  data
}: {
  data: day_series
}) {

  const chartData = Object.entries(data.time_series_daily).map(([date, values]) => ({
    date,
    close: values.close,
    open: values.open,
    volume: values.volume,
    is_gain: values.close >= values.open,
    errorY: [values.close - values.low, values.high - values.close],
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (

    <ResponsiveContainer width="100%" height={420}>
      <ComposedChart
        data={chartData}
        margin={{ top: 20, right: 40, bottom: 20, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.50} />

        <XAxis
          dataKey="date"
          tickFormatter={(v) => v.slice(5)}
          minTickGap={20}
        />

        <YAxis
          yAxisId="left"
          domain={["auto", "auto"]}
          tickFormatter={(v) => `$${v}`}
        />

        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
        />

        <Tooltip
          labelFormatter={(v) => `Date: ${v}`}
          formatter={(val: number, key: string) => {
            if (key === "volume") return [`${val.toLocaleString()}`, "Volume"];
            return [`$${val.toFixed(2)}`, key.charAt(0).toUpperCase() + key.slice(1)];
          }}
        />

        <Legend verticalAlign="top" height={36} />
        <Bar
          yAxisId="right"
          dataKey="volume"
          barSize={18}
          name="Volume"
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`bar-${index}`}
              fill={entry.is_gain ? "#26a69a" : "#ef5350"} // green vs red
              opacity={0.4}
            />
          ))}
        </Bar>
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="open"
          stroke="#ff3300"
          strokeWidth={2}
          dot={false}
          name="Open"
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="close"
          stroke="#00c853"
          strokeWidth={2}
          dot={false}
          name="Close"
        />
      </ComposedChart>

    </ResponsiveContainer>



  );
}

function DaylyTable({
  data
}: {
  data: day_series
}) {

  const table_data = Object.entries(data.time_series_daily)
    .map(([date, values]) => ({
      date,
      open: values.open,
      high: values.high,
      low: values.low,
      close: values.close,
      volume: values.volume,
      is_gain: values.close >= values.open,
      gain_lose: values.close - values.open,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <table width="100%">
      <tr>
        <th>Day</th>
        <th>Open</th>
        <th>Close</th>
        <th>+/- day</th>
        <th>Low</th>
        <th>High</th>
        <th>Volume</th>
      </tr>
      {table_data.map((value, index) => (
        <tr key={index}>
          <th>{value.date}</th>
          <th>{value.open}</th>
          <th>{value.close}</th>
          <th>{value.gain_lose.toFixed(3)}</th>
          <th>{value.low}</th>
          <th>{value.high}</th>
          <th>{value.volume}</th>
        </tr>
      ))}
    </table>
  )
}

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
      <h2>{symbol.symbol}</h2>
      <h3>{symbol.name}</h3>
      <h4>{symbol.market_capitalization}</h4>
      <div>
        <span>{symbol.asset_type}</span>
        <span>{symbol.country}</span>
        <span>{symbol.exchange}</span>
        <span>{symbol.currency}</span>
      </div>
      <div>
        <span>{symbol.sector}</span>
        <span>{symbol.industry}</span>
        <span>{symbol.exchange}</span>
        <span>{symbol.currency}</span>
      </div>
      <p>{symbol.description}</p>


      {symbol.day_series && symbol.day_series.time_series_daily && (
        <DaylyChart data={symbol.day_series} />
      )}
      {symbol.day_series && symbol.day_series.time_series_daily && (
        <DaylyTable data={symbol.day_series} />
      )}
    </div>
  );
}

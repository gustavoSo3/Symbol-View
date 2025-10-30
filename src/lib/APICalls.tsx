function parseDaySeries(raw: any): days_series {
    const meta = raw["Meta Data"];
    const series = raw["Time Series (Daily)"];

    const parsed_series: days_series["time_series_daily"] = {};

    for (const date in series) {
        const day = series[date];
        parsed_series[date] = {
            open: Number(day["1. open"] ?? 0),
            high: Number(day["2. high"] ?? 0),
            low: Number(day["3. low"] ?? 0),
            close: Number(day["4. close"] ?? 0),
            volume: Number(day["5. volume"] ?? 0),
        };
    }

    return {
        meta_data: {
            information: meta["1. Information"] ?? "NA",
            symbol: meta["2. Symbol"] ?? "NA",
            last_refreshed: meta["3. Last Refreshed"] ?? "NA",
            output_size: meta["4. Output Size"] ?? "NA",
            time_zone: meta["5. Time Zone"] ?? "NA",
        },
        time_series_daily: parsed_series,
    };
}

async function getSymbolQuery(symbol: string): Promise<symbol_simple_query> {
    var symb = "IBM"
    if (process.env.NEXT_PUBLIC_API_KEY != "demo") {
        symb = symbol
    }

    const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symb}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const symbol_raw_object = await response.json();

    const current: symbol_simple_query = {
        symbol: symbol,
        open: Number(symbol_raw_object["Global Quote"]["02. open"]),
        high: Number(symbol_raw_object["Global Quote"]["03. high"]),
        low: Number(symbol_raw_object["Global Quote"]["04. low"]),
        price: Number(symbol_raw_object["Global Quote"]["05. price"]),
        change: Number(symbol_raw_object["Global Quote"]["09. change"]),
        change_percent: Number(symbol_raw_object["Global Quote"]["10. change percent"].slice(0, 7)),
    };

    return current;
}

export async function getSymbolsQuery(symbols: Array<string>): Promise<Array<symbol_simple_query>> {

    const resp_symbols: Array<symbol_simple_query> = await Promise.all(
        symbols.map(async (symbol: string) => {
            return getSymbolQuery(symbol);
        })
    );

    return resp_symbols;
}

export async function getSymbolInfo(symbol: string): Promise<symbol_complex_query> {
    var symb = "IBM"
    if (process.env.NEXT_PUBLIC_API_KEY != "demo") {
        symb = symbol
    }

    var response = await fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symb}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const symbol_object = await response.json();

    response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symb}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    const day_series_object = await response.json();

    return {
        "symbol": symbol_object["Symbol"] ?? "NA",
        "asset_type": symbol_object["AssetType"] ?? "NA",
        "name": symbol_object["Name"] ?? "NA",
        "description": symbol_object["Description"] ?? "NA",
        "exchange": symbol_object["Exchange"] ?? "NA",
        "currency": symbol_object["Currency"] ?? "NA",
        "country": symbol_object["Country"] ?? "NA",
        "sector": symbol_object["Sector"] ?? "NA",
        "industry": symbol_object["Industry"] ?? "NA",
        "market_capitalization": Number(symbol_object["MarketCapitalization"] ?? 0),
        "last_data": await getSymbolQuery(symbol),
        "day_series": parseDaySeries(day_series_object)
    };
}


type symbol_query = {
    symbol: string;
    open: number;
    high: number;
    low: number;
    price: number;
    change: number;
    change_percent: number;
};

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
    day_series: days_series;
};

type day_data = {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
};

type days_series = {
    meta_data: {
        information: string;
        symbol: string;
        last_refreshed: string;
        output_size: string;
        time_zone: string;
    };
    time_series_daily: {
        [date: string]: day_data
    };
};
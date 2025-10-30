type symbol_data = {
    symbol: string;
    open_value: number;
    current_value: number;
    change: number;
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
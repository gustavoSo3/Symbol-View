import Link from "next/link";

export default function SymbolCard(
    { symbol }:
        { symbol: symbol_query }
) {
    return (

        <Link href={`/${symbol.symbol}`}>
            <div className="border-2">
                <h2>{symbol.symbol}</h2>
                <h3>open: {symbol.open_value}</h3>
                <h3>current: {symbol.current_value}</h3>
                <h3>change: {symbol.change}</h3>
            </div>
        </Link>
    )
}
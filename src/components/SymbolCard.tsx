import Link from "next/link";
import DayWinLoose from "./DailyChange";

export default function SymbolCard(
    { symbol }:
        { symbol: symbol_query }
) {
    return (

        <Link href={`/${symbol.symbol}`} className="grow m-1 p-3 max-w-fit rounded-md border-4 border-double hover:border-teal-400">
            <div>
                <h2 className="text-3xl text-center">{symbol.symbol}</h2>

            </div>
            <div className="flex flex-col">
                <div className="flex text-center">
                    <div className="m-1">o: {symbol.open}</div>
                    <div className="m-1">h: {symbol.high}</div>
                    <div className="m-1">l: {symbol.low}</div>
                </div>
                <div className="flex text-xl text-center">
                    <h3>{symbol.price}</h3>
                    <div className="grow"></div>
                    <DayWinLoose change={symbol.change_percent}></DayWinLoose>
                </div>
            </div>

        </Link>
    )
}
export const currencies: Record<string,{symbol:string; rate:number}> = {
 EUR:{symbol:'€',rate:1}, USD:{symbol:'$',rate:1.08}, GBP:{symbol:'£',rate:.86}, CNY:{symbol:'¥',rate:7.8}, JPY:{symbol:'¥',rate:166}, CAD:{symbol:'C$',rate:1.48}, AUD:{symbol:'A$',rate:1.64}, CHF:{symbol:'CHF ',rate:.97}, SEK:{symbol:'kr ',rate:11.2}, PLN:{symbol:'zł ',rate:4.3}
};
export function money(eur:number, currency:string){const c=currencies[currency]||currencies.EUR; return `${c.symbol}${(eur*c.rate).toFixed(currency==='JPY'?0:2)}`;}

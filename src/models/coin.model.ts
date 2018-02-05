export class Coin {

    name: string;
    alias: string;
    currentPrice: number;
    marketCap: number;
    changePercent24Hour: number;

    constructor() {
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setAlias(alias) {
        this.alias = alias;
    }

    getAlias() {
        return this.alias;
    }

    setCurrentPrice(currentPrice) {
        this.currentPrice = currentPrice;
    }

    getCurrentPrice() {
        return this.currentPrice;
    }

    setMarketCap (marketCap) {
        this.marketCap = marketCap;
    }

    getMarketCap() {
        return this.marketCap;
    }

    setChangePercent24Hour(changePercent24Hour) {
        this.changePercent24Hour = changePercent24Hour;
    }

    getChangePercent24Hour() {
        return this.changePercent24Hour;
    }

}
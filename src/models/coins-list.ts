export class CoinsList {

    coins: string[] = [
        'aa', 
        'bb', 
        'cc'
    ];

    getCoinsNames(){
        return this.coins.toString();
    }

}
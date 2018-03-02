class Product {
    private displayName: string;
    constructor(public title: string, public subTitle: string, public price: number){
        this.displayName = title + " - " + subTitle
    }
    toString(){
        return this.displayName;
    }
    calcPriceWithTax(): number {
        const tax = this.price * 0.19;
        return this.price + tax;
    }
}

let echoDot: Product = new Product("EchoDot", "Alles was Sie an Alexa lieben", 100);
console.log(echoDot.toString());
console.log(echoDot.calcPriceWithTax());
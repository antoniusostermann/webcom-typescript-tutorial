interface Tagable {
    getTags(): string[]
}

class Product implements Tagable {
    getTags(): string[] {
        return this.tags;
    }
    private displayName: string;
    constructor(public title: string, public subTitle: string, public price: number, public tags: string[]){
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

let echoDot: Product = new Product("EchoDot", "Alles was Sie an Alexa lieben", 100, ["AssistantJS", "Alexa", "echo"]);
console.log(echoDot.toString());
console.log(echoDot.calcPriceWithTax());
console.log(echoDot.getTags().filter((tag: string) => tag.startsWith("A")));
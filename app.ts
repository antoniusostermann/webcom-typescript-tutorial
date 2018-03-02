interface Tagable {
    getTags(): string[]
}

interface PriceWithTaxCalculatable {
    calcPriceWithTax(): number;
}

interface Person {
    firstName: string;
    lastName: string;
    purchasedProducts?: number;
}

class Product implements Tagable {
    getTags(): string[] {
        return this.tags;
    }
    private displayName: string;
    private buyer: Person[] = [];
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
    addToBuyer(person: Person) {
        if(person.purchasedProducts) {
            person.purchasedProducts++;
        } else {
            person.purchasedProducts = 1;
        }
        this.buyer.push(person);
    }
    getBuyer(): Person[] {
        return this.buyer;
    }
}

let echoDot: Product = new Product("EchoDot", "Alles was Sie an Alexa lieben", 100, ["AssistantJS", "Alexa", "echo"]);
console.log(echoDot.toString());
console.log(echoDot.calcPriceWithTax());
console.log(echoDot.getTags().filter((tag: string) => tag.startsWith("A")));

let priceWithTaxCalculatable: PriceWithTaxCalculatable = echoDot;
console.log(priceWithTaxCalculatable.calcPriceWithTax());

let thilo: Person = {
    firstName: "Thilo",
    lastName: "Leise",    
}

echoDot.addToBuyer(thilo);
echoDot.addToBuyer({firstName: "Jan", lastName: "Trotnow"});

console.log(echoDot.getBuyer());

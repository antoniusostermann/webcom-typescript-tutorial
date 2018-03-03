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

    getTags(): string[] {
        return this.tags;
    }
}


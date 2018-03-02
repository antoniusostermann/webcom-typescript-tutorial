class Product {
    private displayName: string;
    constructor(public title: string, public subTitle: string){
        this.displayName = title + " - " + subTitle
    }
    toString(){
        return this.displayName;
    }
}

let echoDot: Product = new Product("EchoDot", "Alles was Sie an Alexa lieben");
console.log(echoDot.toString());
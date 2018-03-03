import * as fs from "fs";

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
    this.displayName = title + " - " + subTitle;
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

function promisifyedLoadFromLocal(folderName: "products" | "persons", fileName: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const filePath = `database/${folderName}/${fileName}.json`;

    fs.readFile(filePath, "utf8", (err, contents) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(contents));
      }
    });
  });
}

promisifyedLoadFromLocal("products", "echo-dot")
.then(echoDot => {
  console.log("loaded echo-dot: ", echoDot);

  return promisifyedLoadFromLocal("products", "google-home");
})
.then(googleHome => {
  console.log("loaded google-home: ", googleHome);

  return promisifyedLoadFromLocal("persons", "jan");
})
.then(jan => {
  console.log("loaded jan: ", jan);

  return promisifyedLoadFromLocal("persons", "thilo");
})
.then(thilo => {
  console.log("loaded thilo: ", thilo);
})
.catch(err => {
  console.error("error occured: ", err);
});
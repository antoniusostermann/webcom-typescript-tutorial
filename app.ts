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

function loadFromLocal(folderName: "products" | "persons", fileName: string, callback: (err: NodeJS.ErrnoException, parsedJSON: any) => void) {
  const filePath = `database/${folderName}/${fileName}.json`;

  fs.readFile(filePath, "utf8", (err, contents) => {
    callback(err, err ? {} : JSON.parse(contents));
  });
}

loadFromLocal("products", "echo-dot", (err1, json1) => {
  if (err1) {
    console.error("error occured loading echo-dot:", err1);
  } else {
    console.log("loaded echo-dot: ", json1);

    loadFromLocal("products", "google-home", (err2, json2) => {
      if (err2) {
        console.error("error occured loading google-home:", err2);
      } else {
        console.log("loaded google-home: ", json2);

        loadFromLocal("persons", "jan", (err3, json3) => {
          if (err3) {
            console.error("error occured loading jan: ", err3);
          } else {
            console.log("loaded jan: ", json3);
  
            loadFromLocal("persons", "thilo", (err4, json4) => {
              if (err4) {
                console.error("error occured loading thilo: ", err4);
              } else {
                console.log("loaded thilo: ", json4);
              }
            });
          }
        });
      }
    });
  }
});
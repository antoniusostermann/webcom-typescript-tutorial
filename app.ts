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

interface ProductData {
  title: string;
  subTitle: string;
  price: number;
  tags: string[];
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

function promisifyedLoadFromLocal(folderName: "products" | "persons", fileName: string): Promise<ProductData | Person>{
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

async function loadAllData() {
  try {
    const echoDot = await promisifyedLoadFromLocal("products", "echo-dot");
    const googleHome = await promisifyedLoadFromLocal("products", "google-home");
    const jan = await promisifyedLoadFromLocal("persons", "jan");
    const thilo = await promisifyedLoadFromLocal("persons", "thilo");

    return [echoDot, googleHome, jan, thilo];
  } catch (e) {
    console.error("error occured: ", e);
    return null;
  }
}

function isPerson(entity: Person | ProductData): entity is Person {
  return typeof (<Person>entity).firstName !== "undefined";
}

loadAllData().then(data => {
  
  if (data !== null) {
    const products: Product[] = [];
    const persons: Person[] = [];

    data.forEach(entity => {
      if (!isPerson(entity)) {
        products.push(new Product(entity.title, entity.subTitle, entity.price, entity.tags));
      } else {
        persons.push(entity);
      }
    });

    // console.log("products = ", products, "\n\n", "persons = ", persons);
  }
});


interface Configuration {
  adminName: string;
  adminPassword: string;
  loggingMode: "FATAL" | "INFO";
  maxFailLogins: number;
}

/** Configuration from database */
const databaseConfiguration: Partial<Configuration> = {
  adminName: "toni",
  adminPassword: "passwd",
};

/** Default configuration */
const defaultConfiguration: Configuration = {
  adminName: "admin",
  adminPassword: "admin",
  loggingMode: "FATAL",
  maxFailLogins: 3,
};

const currentConfiguration = {...defaultConfiguration, ...databaseConfiguration};

export const getLocalConfig = <CONFIG_KEY extends keyof Configuration>(configName: CONFIG_KEY) => {
  // todo: we should parse env variables, since process.env is always string!
  const envValue = process.env[configName];
  return typeof envValue !== "undefined" ? envValue : currentConfiguration[configName];
};

console.log(getLocalConfig("adminName"));

getLocalConfig("adminPasswort");
getLocalConfig("loggingMode") === "FATA"
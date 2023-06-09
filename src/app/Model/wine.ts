import { WineType } from "./winetype";
import { Varietal } from "./varietal";

export class Wine {
  wineID: number;
  name: string;
  description: string;
  vintage: string;
  restockLimit: number;
  imageFile: File | null; // Property to store the selected image file
  imageUrl: string;
  wineTastingNote: string;
  winePrice: number;
  wineTypeID: number;
  wineType: WineType;
  varietalID: number;
  varietal: Varietal;

  constructor(
    wineID: number = 0,
    name: string = '',
    description: string = '',
    vintage: string = '',
    restockLimit: number = 0,
    imageUrl: string = '',
    wineTastingNote: string = '',
    winePrice: number = 0,
    wineTypeID: number = 0,
    wineType: WineType = new WineType(),
    varietalID: number = 0,
    varietal: Varietal = new Varietal(),
    imageFile: File | null = null // Add the parameter to the constructor
  ) {
    this.wineID = wineID;
    this.name = name;
    this.description = description;
    this.vintage = vintage;
    this.restockLimit = restockLimit;
    this.imageUrl = imageUrl;
    this.wineTastingNote = wineTastingNote;
    this.winePrice = winePrice;
    this.wineTypeID = wineTypeID;
    this.wineType = wineType;
    this.varietalID = varietalID;
    this.varietal = varietal;
    this.imageFile = imageFile; // Assign the parameter to the property
  }

  get wineTypeName(): string | undefined {
    return this.wineType?.name;
  }

  get varietalName(): string | undefined {
    return this.varietal?.name;
  }
}

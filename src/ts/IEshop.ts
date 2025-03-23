// ts/IEshop.ts
import IBaseEntity from "./IBaseEntity"; // Import IBaseEntity

interface IEshop extends IBaseEntity {
  logo: string;
  country: string;
  url: string;
}

interface IEshopADWrapper {
    documentid: string
    eshop: IEshop
}

export default IEshop
export type { IEshopADWrapper };
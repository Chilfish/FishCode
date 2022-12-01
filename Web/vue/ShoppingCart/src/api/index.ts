import data from "./data";
import { Product } from "src/interface";

// get Products list

export const apiGetProducts = () => {
  return new Promise<Product[]>((resolve) => {
    // pretend delay
    setTimeout(() => {
      resolve(data);
    }, 800);
  });
};

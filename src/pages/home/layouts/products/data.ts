import airbillsImage from "@/assets/products/airbillspay.png";
import nectarfiImage from "@/assets/products/nectarfi.png";
import streamlinkImage from "@/assets/products/streamlink.png";
import hottakeImage from "@/assets/products/hottake.png";
import rhivaImage from "@/assets/products/rhiva.png";
import pajImage from "@/assets/products/paj.png";

export interface ProductData {
  id: string;
  name: string;
  headline: string;
  pillColorClass: string;
  pillBgClass: string;
  bgRightClass: string;
  image: string;
  productUrl: string;
}

export const MOCK_PRODUCTS: ProductData[] = [
  {
    id: "2",
    name: "Airbills",
    headline: "Pay for Utilities and Book Flights using stablecoins",
    pillColorClass: "#FF6600",
    pillBgClass: "bg-[#382010]",
    bgRightClass: "bg-[#FF6600]",
    image: airbillsImage,
    productUrl: "https://app.airbills.org/",
  },
  {
    id: "3",
    name: "NectarFi",
    headline: "Bank globally. Get paid anywhere.",
    pillColorClass: "#EBC898",
    pillBgClass: "bg-[#2E2214]",
    bgRightClass: "bg-[#101010]",
    image: nectarfiImage,
    productUrl: "https://nectarfi.finance/",
  },
  {
    id: "4",
    name: "Streamlink",
    headline: "Connect, Collaborate, and Celebrate from Anywhere.",
    pillColorClass: "#9667FF",
    pillBgClass: "bg-[#1E1532]",
    bgRightClass: "bg-[#1E1532]",
    image: streamlinkImage,
    productUrl: "https://thestreamlink.com/",
  },
  {
    id: "5",
    name: "Hottake",
    headline: "What's Your Take Worth? Monetize your conviction",
    pillColorClass: "#FF5C8A",
    pillBgClass: "bg-[#351521]",
    bgRightClass: "bg-[#492004]",
    image: hottakeImage,
    productUrl: "https://hottake.markets/",
  },
  {
    id: "6",
    name: "Rhiva",
    headline: "Unlocking LP Opportunities for every Market on Solana",
    pillColorClass: "#00D084",
    pillBgClass: "bg-[#0E2E21]",
    bgRightClass: "bg-[#003845]",
    image: rhivaImage,
    productUrl: "https://rhiva.fun/",
  },
  {
    id: "7",
    name: "Paj",
    headline: "Simplified Crypto Off-ramping for Everyone",
    pillColorClass: "#70B7FF",
    pillBgClass: "bg-[#102539]",
    bgRightClass: "bg-[#FCFDFE]",
    image: pajImage,
    productUrl: "https://paj.cash/",
  },
];

export const fetchProducts = async (): Promise<ProductData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PRODUCTS), 1000);
  });
};

export interface ProductData {
  id: string;
  name: string;
  headline: string;
  pillColorClass: string;
  pillBgClass: string;
  bgRightClass: string;
}

export const MOCK_PRODUCTS: ProductData[] = [
  {
    id: "1",
    name: "Ribh",
    headline: "A Better Way to Collect Local Payments.",
    pillColorClass: "#B17BF3",
    pillBgClass: "bg-[#231039]",
    bgRightClass: "bg-[#231039]",
  },
  {
    id: "2",
    name: "Airbills",
    headline: "Pay for Utilities and Book Flights using stablecoins",
    pillColorClass: "#FF6600",
    pillBgClass: "bg-[#382010]",
    bgRightClass: "bg-[#FF6600]", //
  },
  {
    id: "3",
    name: "NectarFi",
    headline: "Save, Invest, and Earn in USDC without risk!.",
    pillColorClass: "#EBC898",
    pillBgClass: "bg-[#2E2214]",
    bgRightClass: "bg-[#0B2136]", //
  },
  {
    id: "4",
    name: "Streamlink",
    headline: "Connect, Collaborate, and Celebrate from Anywhere.",
    pillColorClass: "#9667FF",
    pillBgClass: "bg-[#1E1532]",
    bgRightClass: "bg-[#0A2E1F]", //
  },
];

export const fetchProducts = async (): Promise<ProductData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PRODUCTS), 1000);
  });
};

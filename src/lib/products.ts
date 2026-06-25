import wallet from "@/assets/product-wallet.jpg";
import knife from "@/assets/product-knife.jpg";
import belt from "@/assets/product-belt.jpg";
import pocketknife from "@/assets/product-pocketknife.jpg";
import bag from "@/assets/product-bag.jpg";
import knifeset from "@/assets/product-knifeset.jpg";

export type Product = {
  slug: string;
  name: string;
  sku: string;
  price: number; // PKR
  category: "Leather" | "Knives";
  gender?: "Men" | "Women" | "Unisex";
  img: string;
  tagline: string;
  description: string;
  details: string[];
  isNew?: boolean;
};

export const formatPKR = (n: number) =>
  `Rs.${n.toLocaleString("en-PK")}`;

export const products: Product[] = [
  {
    slug: "heritage-bifold-wallet",
    name: "Heritage Bifold Wallet — Tan",
    sku: "MW0813A-003",
    price: 5530,
    category: "Leather",
    gender: "Men",
    img: wallet,
    tagline: "Slim, full-grain, made to patina.",
    description:
      "Hand-cut from a single panel of vegetable-tanned full-grain leather, the Heritage Bifold ages into a deep, personal patina with daily use. Six card slots, two hidden pockets, and a full-length bill compartment.",
    details: [
      "Full-grain vegetable-tanned leather",
      "Hand-stitched with waxed Tiger thread",
      "6 card slots + 2 hidden pockets",
      "Dimensions: 11 × 9 cm",
    ],
    isNew: true,
  },
  {
    slug: "damascus-chef-knife",
    name: "Damascus Chef Knife",
    sku: "KC0220-001",
    price: 18500,
    category: "Knives",
    gender: "Unisex",
    img: knife,
    tagline: "67-layer folded steel, walnut handle.",
    description:
      "A balanced 8-inch chef knife forged from 67 layers of damascus steel with a VG-10 core. The walnut handle is shaped by hand for a neutral grip through hours of prep.",
    details: [
      "VG-10 core, 67-layer damascus",
      "HRC 60-62 hardness",
      "Stabilised walnut handle",
      '8" / 20 cm blade',
    ],
  },
  {
    slug: "hand-stitched-belt",
    name: "Hand-Stitched Belt — Dark Brown",
    sku: "MB0090-002",
    price: 5500,
    category: "Leather",
    gender: "Men",
    img: belt,
    tagline: "One piece of leather. Solid brass.",
    description:
      "Cut from a single strip of bridle leather and finished with a solid brass buckle. Edges are burnished by hand and the keepers are stitched, never glued.",
    details: [
      "Bridle leather, 4mm thick",
      "Solid brass buckle",
      "Hand-burnished edges",
      "Available in 5 sizes",
    ],
    isNew: true,
  },
  {
    slug: "brass-pocket-knife",
    name: "Brass Pocket Knife",
    sku: "KP0440-002",
    price: 9800,
    category: "Knives",
    gender: "Unisex",
    img: pocketknife,
    tagline: "Everyday carry, brass bolsters.",
    description:
      "A slim folding knife with brass bolsters and a cocobolo wood scale. The drop-point blade locks with a satisfying click and rides comfortably in any pocket.",
    details: [
      "D2 tool steel blade",
      "Cocobolo wood + brass bolsters",
      "Lock-back mechanism",
      "Closed length: 9.5 cm",
    ],
  },
  {
    slug: "cognac-messenger-bag",
    name: "Cognac Messenger Bag",
    sku: "WB0150-004",
    price: 24900,
    category: "Leather",
    gender: "Women",
    img: bag,
    tagline: "A daily bag, built for decades.",
    description:
      'Roomy enough for a 14" laptop and a notebook, the Cognac Messenger is built around a hand-cut leather body, antique brass hardware, and a cotton-canvas lining you can actually clean.',
    details: [
      "Full-grain cognac leather",
      "Antique solid brass hardware",
      'Fits 14" laptop',
      "Adjustable shoulder strap",
    ],
    isNew: true,
  },
  {
    slug: "kitchen-knife-duo",
    name: "Kitchen Knife Duo",
    sku: "KC0330-001",
    price: 22500,
    category: "Knives",
    gender: "Unisex",
    img: knifeset,
    tagline: "Chef + paring. The everyday pair.",
    description:
      "The two knives most kitchens actually use: an 8-inch chef and a 3.5-inch paring, both with high-carbon stainless blades and matched rosewood handles.",
    details: [
      "High-carbon stainless steel",
      "Matched rosewood handles",
      '8" chef + 3.5" paring',
      "Includes cotton roll",
    ],
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

import { Inter } from "next/font/google"; // Seria el reemplazo de Helvetica World
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const HelveticaWorld = localFont({
  src: [
    {
      path: "../public/fonts/HelveticaWorld-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaWorld-Bold.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "../public/fonts/HelveticaWorld-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/HelveticaWorld-BoldItalic.woff2",
      weight: "700",
      style: "bold italic",
    },
  ],
});

export const ProximaNova = localFont({
  src: [
    {
      path: "../public/fonts/ProximaNova-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Proxima Nova Bold.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../public/fonts/Proxima Nova Extrabold.otf",
      weight: "800",
      style: "extrabold",
    },
    {
      path: "../public/fonts/Proxima Nova Bold Italic.otf",
      weight: "700",
      style: "bold italic",
    },
  ],
});

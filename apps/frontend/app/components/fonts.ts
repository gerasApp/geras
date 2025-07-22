import { Montserrat } from "next/font/google"; //Por ahora pongo Montserrat porque no existe Proxima Nova en google
import { Inter } from "next/font/google"; // Seria el reemplazo de Helvetica World

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

import localFont from "next/font/local";
import "./globals.css";
import Register from "./user/onBoarding/register/page";
import Clients from "./pages/clients/page";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

import { useRouter } from 'next/router';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Mi Aplicación",
  description: "Una descripción breve de tu aplicación",
};

export default function RootLayout({ children }) {
  const router = useRouter();
  return (
    <html lang="en">
      <body>
        {/* <Register></Register> */}
        {/* <Clients></Clients> */}
        <Header></Header>
        <Sidebar></Sidebar>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";



export const metadata: Metadata = {
  title: "HexaHome Todo App",
  description: "This is the app for HexaHome's todo list.", 
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

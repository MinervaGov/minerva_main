import { Toaster } from "sonner";
import localFont from "next/font/local";

import "./globals.css";

import UiProvider from "@/providers/UiProvider";
import ReduxProvider from "@/providers/ReduxProvider";

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
  title: "Minerva",
  description: "DAO Agent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <UiProvider>
            {children}
            <Toaster theme="dark" />
          </UiProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

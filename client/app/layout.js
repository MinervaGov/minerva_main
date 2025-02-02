import { Toaster } from "sonner";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";

import UiProvider from "@/providers/UiProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import Privy from "@/providers/Privy";
import UserProvider from "@/providers/UserProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["variable"],
});

export const metadata = {
  title: "Minerva",
  description: "DAO Agent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.className} antialiased`}
        suppressHydrationWarning
      >
        <Privy>
          <ReduxProvider>
            <UserProvider>
              <UiProvider>
                {children}
                <Toaster theme="dark" />
              </UiProvider>
            </UserProvider>
          </ReduxProvider>
        </Privy>
      </body>
    </html>
  );
}

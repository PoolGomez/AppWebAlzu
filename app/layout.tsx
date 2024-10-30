import type { Metadata } from "next";
import {Noto_Sans_Display } from "next/font/google";
// import {ClerkProvider} from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const noto = Noto_Sans_Display({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Dashboard Companies | Paul Dev",
  description: "Dashboard Paul Dev",
};

export default function RootLayout({
  children,
}: 
Readonly<{
  children: React.ReactNode;
}>
) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={noto.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            // enableSystem
            disableTransitionOnChange
          >
            
            {children}

            <Toaster />
          </ThemeProvider>
          
      </body>
    </html>
  );
}

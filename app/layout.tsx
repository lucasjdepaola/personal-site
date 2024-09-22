import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Favicon from '/public/favicon.ico';
import AppleIcon from '/public/logo.png';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lucas DePaola personal website",
  description: "Personal website created by Lucas DePaola",
  icons: [{ rel: 'icon', url: Favicon.src },
    {rel: "apple-touch-icon", url: AppleIcon.src}
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Aprender Investindo",
  description: "Personal Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}

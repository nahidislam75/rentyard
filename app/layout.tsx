import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rantyard",
  description: "Created with Nahid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import MidtransScript from "@/components/MidtransScript";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Botani - Premium Ornamental Plants",
  description: "Export-quality ornamental plants for retail and wholesale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main style={{ minHeight: '100vh', paddingTop: '64px' }}>
              {children}
            </main>
            <Footer />
          </CartProvider>
          <MidtransScript />
        </AuthProvider>
      </body>
    </html>
  );
}

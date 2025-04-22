import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import AmplifyProvider from "../components/AmplifyProvider";
import Navbar from "../components/navbar";
import { AuthProvider } from "../src/context/AuthContext";
import ServiceWorker from "../components/ServiceWorker";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UHI Skill Share",
  description: "Student skill-sharing platform",
  themeColor: "#0072CE",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={nunito.className}>
        <AmplifyProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <ServiceWorker />
          </AuthProvider>
        </AmplifyProvider>
      </body>
    </html>
  );
}

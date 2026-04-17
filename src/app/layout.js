import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import { FriendsProvider } from "@/context/FriendsContext";
import Footer from "@/components/Footer/Footer";
import { GeistSans } from "geist/font/sans";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KeenKeeper | Your Friend Tracker",
  description: "Track your timeline, stats, and nurture your relationships.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      {/* 2. Add GeistSans.variable and GeistSans.className to the body */}
      <body
        className={`${GeistSans.variable} ${GeistSans.className} flex flex-col min-h-screen bg-slate-50`}
        suppressHydrationWarning
      >
        <FriendsProvider>
          <NavBar />
          <main>{children}</main>

          <Footer></Footer>
        </FriendsProvider>
      </body>
    </html>
  );
}

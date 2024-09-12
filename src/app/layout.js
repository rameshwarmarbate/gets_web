import localFont from "next/font/local";
import "./globals.css";

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
  metadataBase: "https://getsbh.com/",
  title: "GETS - Get Excellent Tech Solutions",
  description:
    "GETS - Get Excellent Tech Solutions offers innovative automation solutions for smart homes and businesses. Explore our range of smart plugs, motion sensor lights, and more.",
  applicationName: "GETS - Get Excellent Tech Solutions",
  authors: [{ name: "Rameshwar Marbate", url: "https://getsbh.com/" }],
  generator: "GETS",
  keywords: [
    "get",
    "gets",
    "getsb",
    "getsbh",
    "get excellent tech solution",
    "get excellent tech solutions",
    "automation",
    "smart home automation",
    "smart plug",
    "motion sensor light",
    "smart",
  ],
  creator: "GETS Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

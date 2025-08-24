import { Geist, Geist_Mono } from "next/font/google";
import { ToastProvider } from '@/components/ui/toast';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Task Distribution System',
  description: 'Admin dashboard for task distribution',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ToastProvider />
        {children}
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import Header from '../components/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Multi-Model Panel",
  description: "A panel to interact with multiple AI models.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col h-screen">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

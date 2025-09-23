import { Barlow } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import UserProfile from "@/components/UserProfile";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata = {
  title: "Journy - Secure Mental Journaling",
  description: "Write your thoughts safely and privately with encrypted journaling.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [ dark ],
        variables: { 
          colorPrimary: '',
          colorForeground: 'white',
        },
      }}
    >
       <html lang="en" data-theme="luxury">
        <body
          data-theme="luxury"
          className={`${barlow.variable} antialiased lg:flex min-h-screen`}
        >
          <UserProfile /> 
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
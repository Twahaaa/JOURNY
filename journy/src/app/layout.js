import { Barlow } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import UserProfile from "@/components/UserProfile";
import NavigationSidebar from '../components/sidebar';
import SidebarWrapper from "@/components/SidebarWrapper";

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
        baseTheme: [dark],
        variables: {
          colorPrimary: '',
          colorForeground: 'white',
        },
      }}
    >
      <html lang="en" data-theme="luxury">
        <body className={`${barlow.variable} antialiased `}>
          <SidebarWrapper>{children}</SidebarWrapper>
          <UserProfile />
        </body>
      </html>
    </ClerkProvider>
  );
}
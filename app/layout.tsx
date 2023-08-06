import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./provider";
import Wrapper from "./components/Wrapper";
import NavBar from "./components/NavBar";
import StyledJsxRegistry from "./registry";
import ToasterProvider from "./provider/ToastProvider";
import InnerWrapper from "./components/InnerWrapper";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Culturehero Task",
  description: "Task for"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ToasterProvider />
          <StyledJsxRegistry>
            <Wrapper> 
            <NavBar />
              <InnerWrapper>
                {children}
              </InnerWrapper>
            </Wrapper>
          </StyledJsxRegistry>
        </Providers>
      </body>
    </html>
  );
}

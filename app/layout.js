import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "SKILLNOVA-AI Career Coach",
  description: "AI Career Coach helps students and professionals accelerate their careers with AI-powered resume analysis, personalized learning roadmaps, skill-gap detection, and interview preparation.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{baseTheme:dark}}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable}`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/*header*/}
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            {/*footer*/}
            <footer className="bg-muted/50 py-12">
              <div>
                <p className="text-center text-sm text-muted-foreground">
                  &copy; {new Date().getFullYear()} Skillnova. All rights reserved.
                </p>
              </div>
            </footer>
          </ThemeProvider>
          <script src="es6-promise.auto.min.js"></script>
          <script src="jspdf.min.js"></script>
          <script src="html2canvas.min.js"></script>
          <script src="html2pdf.min.js"></script>
        </body>
      </html>
    </ClerkProvider>
  );
}

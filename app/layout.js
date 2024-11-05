import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script';
import { AlignCenter } from "lucide-react";

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
  title: "GPsync",
  description: "Download google photos with metadata📱📸",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-9488068101453959" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="https://www.gpsync.online/app/android-chrome-192x192.png"></meta>
        <meta name="keywords" content="Google Photos, Download, Metadata" />
        <link rel="apple-touch-icon" sizes="180x180" href="app/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="app/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="app/favicon-16x16.png" />
        <link rel="manifest" href="app/site.webmanifest" />
        <style
          // dangerouslySetInnerHTML={{
          //   __html: `
          //     /* Custom text selection color */
          //     ::selection {
          //       background-color: rgb(255, 196, 0); /* light blue */
          //       color: #000; /* black text */
          //     }
          //   `
          // }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        {children}
      
      <Script
        src="//pl24684711.profitablecpmrate.com/eb/1c/73/eb1c733ca44c609854f1b897dcc29281.js"
        strategy="afterInteractive"
      />
      <Script id="custom-script" strategy="afterInteractive">
        {`
          atOptions = {
            'key': '417e4497e5d272d2d768c4ae6aaa6f6d',
            'format': 'iframe',
            'height': 90,
            'width': 728,
            'params': {}
          };
        `}
      </Script>
      <Script
        src="//www.highperformanceformat.com/417e4497e5d272d2d768c4ae6aaa6f6d/invoke.js"
        strategy="afterInteractive"
      />
      <Script id="ad-config" strategy="afterInteractive">
        {`
          atOptions = {
            'key': 'aa5ae8f7eb9e9549c3b572818338d5cb',
            'format': 'iframe',
            'height': 600,
            'width': 160,
            'params': {}
          };
        `}
      </Script>

      {/* Load external script */}
      <Script
        src="//www.highperformanceformat.com/aa5ae8f7eb9e9549c3b572818338d5cb/invoke.js"
        strategy="afterInteractive"
      />
      {/* <Script
        src='//pl24684711.cpmrevenuegate.com/eb/1c/73/eb1c733ca44c609854f1b897dcc29281.js'
      /> */}
      </body>
    </html>
  );
}

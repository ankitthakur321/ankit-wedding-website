import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "॥ शुभ विवाह निमंत्रण ॥ अंकित कुमार संग कुमारी ईशा | Ankit & Isha Wedding",
  description: "श्री सीताराम कृपा से चिरंजीवि अंकित कुमार संग आयुष्मति कुमारी ईशा का शुभ परिणय संस्कार। शुभ विवाह: 30 नवंबर 2026 | परिणय स्थल: कोलगामा, सुल्तानगंज (भागलपुर) | बारात प्रस्थान: नरहन स्टेट, विभूतिपुर (समस्तीपुर)।",
  keywords: [
    "Ankit Kumar",
    "Kumari Isha",
    "Ankit weds Isha",
    "Wedding Invitation",
    "विवाह निमंत्रण",
    "शुभ विवाह",
    "Kolgama",
    "Sultanganj",
    "Bhagalpur",
    "Narhan Estate",
    "Bibhutipur",
    "Samastipur",
    "Thakur Parivar"
  ],
  authors: [{ name: "Thakur Parivar" }],
  openGraph: {
    title: "॥ शुभ विवाह ॥ अंकित कुमार संग कुमारी ईशा",
    description: "सोमवार, 30 नवंबर 2026 | परिणय स्थल: कोलगामा (सुल्तानगंज) | बारात प्रस्थान: नरहन स्टेट (समस्तीपुर)",
    type: "website",
    locale: "hi_IN",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Poppins:wght@300;400;500;600;700&family=Rozha+One&family=Tiro+Devanagari+Hindi&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased font-body sandstone-pattern selection:bg-saffron/20 selection:text-maroon"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

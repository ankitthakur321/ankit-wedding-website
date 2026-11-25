import type { Metadata } from "next";
import { Tiro_Devanagari_Hindi, Rozha_One, Cinzel, Poppins } from "next/font/google";
import "./globals.css";

const tiroHindi = Tiro_Devanagari_Hindi({
  weight: "400",
  subsets: ["latin", "devanagari"],
  variable: "--font-tiro-hindi",
  display: "swap",
});

const rozhaOne = Rozha_One({
  weight: "400",
  subsets: ["latin", "devanagari"],
  variable: "--font-rozha",
  display: "swap",
});

const cinzel = Cinzel({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-poppins",
  display: "swap",
});

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
      <body
        className={`${tiroHindi.variable} ${rozhaOne.variable} ${cinzel.variable} ${poppins.variable} antialiased font-body sandstone-pattern selection:bg-saffron/20 selection:text-maroon`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

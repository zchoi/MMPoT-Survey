import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zchoi.github.io";
const sitePath = basePath ? `${basePath}/` : "/";
const siteUrl = new URL(sitePath, siteOrigin);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "A Survey on Post-training of Multimodal Large Language Models",
  description:
    "A unified survey of multimodal post-training: instruction following, preference calibration, reason enhancement, domain adaptation, and scalable learning.",
  keywords: [
    "multimodal large language models",
    "post-training",
    "MMPoT",
    "vision-language models",
    "survey",
  ],
  authors: [
    { name: "Haonan Zhang" },
    { name: "Pengpeng Zeng" },
    { name: "Libin Cao" },
    { name: "Wenrui Lai" },
    { name: "Jieping Ye" },
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "A Survey on Post-training of Multimodal Large Language Models",
    description:
      "A behavior-shaping view of instruction following, preference calibration, reason enhancement, domain adaptation, and scalable learning.",
    images: [
      {
        url: `${basePath}/og.png`,
        width: 1536,
        height: 1024,
        alt: "MMPoT survey: a unified map of multimodal post-training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Survey on Post-training of Multimodal Large Language Models",
    description: "A unified map of multimodal post-training.",
    images: [`${basePath}/og.png`],
  },
  icons: {
    icon: `${basePath}/favicon.png`,
    shortcut: `${basePath}/favicon.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

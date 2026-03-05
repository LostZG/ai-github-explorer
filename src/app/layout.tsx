import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI GitHub Explorer",
  description: "发现最热门的 AI 开源项目",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

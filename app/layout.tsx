import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Практична робота",
  description: "Форми та Server Actions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classement",
  description: "Classement des meilleurs chats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

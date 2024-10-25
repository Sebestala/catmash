import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classement",
  description: "Classement des meilleurs chats",
};

/**
 * RankingLayout component that provides the root layout structure for the application,
 * including metadata for the "Classement" page.
 *
 * @param {Readonly<{ children: React.ReactNode }>} children - The content to be displayed within the layout.
 * @returns {JSX.Element} The rendered root layout component.
 */
export default function RankingLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className="-mt-12 md:-mt-6 lg:-mt-10">{children}</div>;
}

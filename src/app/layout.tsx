import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "Kitchen Productivity Report",
  description: "Explore the performance metrics of kitchen staff, including prep times, delivery times, and order counts, to enhance efficiency and productivity."
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="print:!bg-white">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
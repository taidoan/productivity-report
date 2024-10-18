import type { Metadata } from "next";
import { Roboto_Flex } from 'next/font/google';
import "./globals.css";
import { Providers } from './providers';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto', 
  display: 'swap',
});


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
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
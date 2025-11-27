import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | FairBid E-commerce',
  description: 'Complete your purchase securely with FairBid',
  keywords: ['checkout', 'ecommerce', 'shopping', 'purchase', 'payment'],
  openGraph: {
    title: 'Checkout | FairBid E-commerce',
    description: 'Complete your purchase securely with FairBid',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Checkout | FairBid E-commerce',
    description: 'Complete your purchase securely with FairBid',
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

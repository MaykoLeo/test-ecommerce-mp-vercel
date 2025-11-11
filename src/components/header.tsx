import Link from 'next/link';
import {SprayCan} from 'lucide-react';
import CartIcon from './cart-icon';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-foreground"
        >
          <SprayCan className="h-6 w-6 text-primary" />
          <span className="font-headline">ScentPay</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/"
            className="font-body transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/#products"
            className="font-body transition-colors hover:text-primary"
          >
            Perfumes
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <CartIcon />
        </div>
      </div>
    </header>
  );
}

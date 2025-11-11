'use client';

import * as React from 'react';

export default function Footer() {
  const [year, setYear] = React.useState(new Date().getFullYear());
  
  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="flex flex-col items-center justify-center text-center text-sm text-secondary-foreground">
          <p>&copy; {year} ScentPay. All rights reserved.</p>
          <p className="mt-1">A demo e-commerce site for luxury perfumes.</p>
        </div>
      </div>
    </footer>
  );
}

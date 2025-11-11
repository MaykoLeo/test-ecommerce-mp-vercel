import Image from 'next/image';
import Link from 'next/link';
import {products} from '@/lib/products';
import {Button} from '@/components/ui/button';
import ProductCard from '@/components/product-card';

// Using a placeholder from picsum.photos for the hero image.
const heroImage = {
  url: 'https://picsum.photos/seed/hero/1200/600',
  hint: 'perfume bottle',
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative flex h-[60vh] min-h-[400px] max-h-[600px] w-full items-center justify-center text-center text-white">
        <Image
          src={heroImage.url}
          alt="Elegant perfume bottle on a reflective surface"
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.hint}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-6xl">
            Discover Your Signature Scent
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
            Explore our curated collection of luxury perfumes and find the
            perfect fragrance that defines you.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="#products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="products" className="bg-background py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-headline mb-12 text-center text-3xl font-bold md:text-4xl">
            Our Collection
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

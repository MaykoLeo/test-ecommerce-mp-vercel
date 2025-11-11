import Image from 'next/image';
import Link from 'next/link';
import type {Product} from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {ArrowRight} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-square">
            <Image
              src={product.image.url}
              alt={product.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              data-ai-hint={product.image.hint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="font-headline mb-1 text-xl">
          <Link
            href={`/product/${product.id}`}
            className="transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{product.brand}</p>
        <p className="mt-2 text-sm">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        <Button asChild size="sm" variant="outline">
          <Link href={`/product/${product.id}`}>
            View
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

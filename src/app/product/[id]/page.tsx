import Image from 'next/image';
import {products} from '@/lib/products';
import {notFound} from 'next/navigation';
import {Star, StarHalf} from 'lucide-react';
import AddToCartForm from './_components/add-to-cart-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="flex items-center">
      {Array.from({length: fullStars}).map((_, i) => (
        <Star
          key={`full-${i}`}
          className="h-5 w-5 fill-yellow-400 text-yellow-400"
        />
      ))}
      {halfStar && (
        <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      )}
      {Array.from({length: emptyStars}).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="h-5 w-5 fill-muted text-muted-foreground"
        />
      ))}
    </div>
  );
}

export default function ProductDetailPage({params}: {params: {id: string}}) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={product.image.hint}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
            {product.brand}
          </h2>
          <h1 className="font-headline mt-1 text-4xl font-bold md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-semibold">${product.price.toFixed(2)}</p>

          <div className="mt-6">
            <AddToCartForm product={product} />
          </div>

          <div className="mt-8">
            <Accordion type="single" collapsible defaultValue="description">
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>{product.longDescription}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="reviews">
                <AccordionTrigger>
                  Reviews ({product.reviews.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    {product.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="border-b pb-4 last:border-b-0 last:pb-0"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          {renderStars(review.rating)}
                          <p className="font-semibold">{review.author}</p>
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

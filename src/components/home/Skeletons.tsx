"use client";

export function PackageCardSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-brand-cream flex flex-col min-w-[300px] md:min-w-[360px] shrink-0">
      {/* Image Skeleton */}
      <div className="h-56 md:h-60 w-full skeleton" />
      
      {/* Content Skeleton */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="h-6 w-3/4 skeleton mb-2" />
          <div className="h-4 w-1/2 skeleton" />
        </div>
        
        <div className="space-y-2 mb-6 flex-grow">
          <div className="h-4 w-full skeleton" />
          <div className="h-4 w-5/6 skeleton" />
          <div className="h-4 w-4/5 skeleton" />
        </div>
        
        <div className="border-t border-brand-cream pt-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="h-3 w-16 skeleton mb-2" />
              <div className="h-6 w-32 skeleton" />
            </div>
          </div>
          <div className="h-11 w-full skeleton rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function GalleryItemSkeleton() {
  return (
    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden skeleton" />
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-beige flex flex-col">
      <div className="h-10 w-10 skeleton mb-6" />
      <div className="space-y-2 mb-8 flex-grow">
        <div className="h-4 w-full skeleton" />
        <div className="h-4 w-5/6 skeleton" />
        <div className="h-4 w-4/5 skeleton" />
      </div>
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full skeleton" />
        <div>
          <div className="h-4 w-24 skeleton mb-2" />
          <div className="h-3 w-16 skeleton" />
        </div>
      </div>
    </div>
  );
}

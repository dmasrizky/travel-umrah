"use client";

export function TableSkeleton({ columns = 5, rows = 5 }: { columns?: number; rows?: number }) {
  return (
    <div className="rounded-md border">
      <div className="border-b">
        <div className="flex p-4 gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="h-4 skeleton flex-1" />
          ))}
        </div>
      </div>
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex p-4 gap-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div 
                key={colIndex} 
                className={`h-4 skeleton flex-1 ${colIndex === 0 ? 'w-48' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border p-6 space-y-4">
      <div className="flex justify-between">
        <div className="h-4 w-24 skeleton" />
        <div className="h-4 w-4 skeleton rounded-full" />
      </div>
      <div className="h-8 w-16 skeleton" />
      <div className="h-10 w-full skeleton" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="h-8 w-32 skeleton" />
        <div className="h-4 w-48 skeleton" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <div className="rounded-lg border">
        <div className="p-6 border-b">
          <div className="h-6 w-32 skeleton mb-2" />
          <div className="h-4 w-64 skeleton" />
        </div>
        <div className="p-6">
          <TableSkeleton columns={3} rows={5} />
        </div>
      </div>
    </div>
  );
}

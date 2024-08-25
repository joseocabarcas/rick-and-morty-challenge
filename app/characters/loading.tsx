export default function Loading() {
  return (
    <div className="bg-transparent">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-2/3 rounded bg-zinc-300"></div>
          <div className="h-4 w-3/4 rounded bg-zinc-300"></div>
          <div className="h-4 w-4/6 rounded bg-zinc-300"></div>
          <div className="h-4 w-1/2 rounded bg-zinc-300"></div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="mt-8 animate-pulse space-y-2" key={index}>
              <div className="h-4 w-1/2 rounded bg-zinc-300"></div>
              <div className="h-4 w-1/2 rounded bg-zinc-300"></div>
              <div className="h-4 w-2/5 rounded bg-zinc-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

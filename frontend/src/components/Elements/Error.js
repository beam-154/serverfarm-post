export default function Error({ error }) {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-100 sm:text-5xl">
          Failed to load posts
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-300">
          Failed to load posts. Got an error message: {error}
        </p>
      </div>
    </main>
  );
}

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center py-30">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4">404 — Side ikke fundet</h1>
        <p className="text-gray-600 mb-6">Den side du forsøgte at besøge findes ikke.</p>
        <a href="/" className="underline">Vil du acceptere?</a>
      </div>
    </main>
  );
}
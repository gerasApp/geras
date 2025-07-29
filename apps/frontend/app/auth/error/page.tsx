import Link from "next/link";

interface ErrorPageProps {
  searchParams: { error?: string };
}

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // Esperamos a que Next nos entregue los searchParams
  const { error: raw } = await searchParams;

  // Decodificamos (o fallback)
  const msg = raw
    ? (() => {
        try {
          return decodeURIComponent(raw);
        } catch {
          return raw;
        }
      })()
    : "Error desconocido";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">
        <strong className="block mb-2">Error de autenticación:</strong>
        <p className="mb-4">{msg}</p>
        <Link
          href="/api/auth/signin"
          className="inline-block px-4 py-2 bg-red-500 text-white rounded"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

'use client';

/**
 * Global Error Boundary
 * Catches errors at root level
 */

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Critical Error
            </h1>
            <p className="text-gray-600 mb-6">
              A critical error occurred. Please refresh the page or contact support.
            </p>
            <button
              onClick={reset}
              className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200"
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

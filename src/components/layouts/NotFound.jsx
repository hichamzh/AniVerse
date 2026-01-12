export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <h1 className="text-9xl font-black text-indigo-500">404</h1>
        <p className="text-2xl text-gray-300 mt-4">Page not found</p>
        <a 
          href="/" 
          className="mt-8 inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
        >
          Return Home
        </a>
      </div>
    </div>
  );
};
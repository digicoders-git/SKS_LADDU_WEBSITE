const NotFound = () => {
    return (
        <div className="py-24 px-8 text-center bg-[var(--color-accent)]">
            <h1 className="text-4xl text-[var(--color-maroon)] font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600">The page you are looking for does not exist.</p>
            <a href="/" className="inline-block mt-8 px-6 py-2 bg-[var(--color-maroon)] text-white rounded-md">Go Home</a>
        </div>
    );
};

export default NotFound;

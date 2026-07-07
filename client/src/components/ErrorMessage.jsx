// Shown when the fetch to the backend fails.
// message: what went wrong. onRetry: re-run the fetch.
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-4">
      <div className="h-12 w-12 rounded-full bg-blood-light flex items-center justify-center">
        <span className="text-blood font-display text-xl">!</span>
      </div>
      <div>
        <p className="font-display text-lg text-charcoal">
          Couldn&apos;t load candidates
        </p>
        <p className="font-body text-sm text-charcoal-soft mt-1">
          {message || "Check that your backend server is running on port 5000."}
        </p>
      </div>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-lg bg-mango text-white font-body text-sm font-medium hover:bg-mango-dark transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

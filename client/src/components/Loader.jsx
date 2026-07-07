// Shown while candidates are being fetched from the backend.
export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <div className="h-10 w-10 rounded-full border-4 border-mango-light border-t-mango animate-spin" />
      <p className="font-body text-charcoal-soft text-sm">
        Loading candidates…
      </p>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center p-10 gap-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <span className="text-sm font-medium opacity-70">Loading...</span>
    </div>
  );
}

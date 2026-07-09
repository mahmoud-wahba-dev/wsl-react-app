export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>

        <h2 className="text-lg font-semibold">Loading...</h2>

        <p className="text-sm text-base-content/70">
          Please wait while we prepare your session.
        </p>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";

export default function CountdownTimer({
  seconds = 10,
  onComplete,
}: { seconds?: number; onComplete?: () => void }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    setLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (left <= 0) {
      onComplete?.();
      return;
    }
    const t = setTimeout(() => setLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [left, onComplete]);

  return (
    <div className="inline-flex items-center justify-center px-4 py-2 rounded-md border">
      <span className="text-sm">Please wait… {left}s</span>
    </div>
  );
}

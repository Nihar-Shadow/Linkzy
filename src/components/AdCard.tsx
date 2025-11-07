import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdCard({
  ad,
  onAdClick,
}: {
  ad: { id: string; title?: string; description?: string; url?: string; image?: string };
  onAdClick?: () => void;
}) {
  const open = () => {
    onAdClick?.();
    if (ad?.url) window.open(ad.url, "_blank");
  };

  return (
    <Card className="p-4 space-y-3">
      {ad.image && <img src={ad.image} alt={ad.title || "Ad"} className="w-full h-40 object-cover rounded" />}
      <div className="space-y-1">
        <h4 className="font-semibold">{ad.title || "Sponsored"}</h4>
        <p className="text-sm text-muted-foreground">{ad.description || "Advertisement"}</p>
      </div>
      <Button onClick={open} variant="secondary" className="w-full">Learn more</Button>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Ruler, Package } from "lucide-react";

export interface SizeOption {
  id: string;
  name: string;
  width: number;
  height: number;
  depth: number;
  popular?: boolean;
}

interface SizeSelectorProps {
  selectedSize: SizeOption;
  onSizeChange: (size: SizeOption) => void;
}

export const sizePresets: SizeOption[] = [
  {
    id: "mini",
    name: "Mini",
    width: 2,
    height: 2,
    depth: 0.5
  },
  {
    id: "small",
    name: "Small",
    width: 3,
    height: 3,
    depth: 0.8
  },
  {
    id: "medium",
    name: "Medium",
    width: 4,
    height: 4,
    depth: 1,
    popular: true
  },
  {
    id: "large",
    name: "Large",
    width: 5,
    height: 5,
    depth: 1.2
  },
  {
    id: "jumbo",
    name: "Jumbo",
    width: 6,
    height: 6,
    depth: 1.5
  }
];

export const SizeSelector = ({ selectedSize, onSizeChange }: SizeSelectorProps) => {
  return (
    <Card className="p-6 bg-card-soft border-2 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Ruler className="w-5 h-5 text-primary" />
          <Label className="font-display text-lg font-semibold">Size</Label>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {sizePresets.map((size) => (
            <Button
              key={size.id}
              variant={selectedSize.id === size.id ? "secondary" : "outline"}
              onClick={() => onSizeChange(size)}
              className="relative flex flex-col items-center gap-1 h-auto py-3"
            >
              {size.popular && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
              <Package className="w-6 h-6" />
              <div className="text-center">
                <div className="text-xs font-medium">{size.name}</div>
                <div className="text-xs text-muted-foreground">
                  {size.width}x{size.height}cm
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="p-3 bg-background rounded-lg">
          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Selected: {selectedSize.name}</p>
              <p className="text-xs text-muted-foreground">
                Dimensions: {selectedSize.width} × {selectedSize.height} × {selectedSize.depth} cm
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedSize.id === "mini" && "Perfect for small bags and backpacks"}
                {selectedSize.id === "small" && "Great for keys and small accessories"}
                {selectedSize.id === "medium" && "Our most popular size - ideal for everyday use"}
                {selectedSize.id === "large" && "Makes a statement on bags and purses"}
                {selectedSize.id === "jumbo" && "Extra large for maximum visibility"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Square, 
  Circle, 
  Heart, 
  Star, 
  Hexagon, 
  Pentagon,
  Triangle,
  Shield
} from "lucide-react";
import { toast } from "sonner";

export type KeychainShape = 
  | "rectangle" 
  | "circle" 
  | "heart" 
  | "star" 
  | "hexagon" 
  | "pentagon"
  | "triangle"
  | "shield";

interface ShapeSelectorProps {
  selectedShape: KeychainShape;
  onShapeChange: (shape: KeychainShape) => void;
}

const shapeOptions = [
  { value: "rectangle" as KeychainShape, label: "Rectangle", icon: Square, popular: true },
  { value: "circle" as KeychainShape, label: "Circle", icon: Circle, popular: true },
  { value: "heart" as KeychainShape, label: "Heart", icon: Heart, popular: true },
  { value: "star" as KeychainShape, label: "Star", icon: Star, popular: false },
  { value: "hexagon" as KeychainShape, label: "Hexagon", icon: Hexagon, popular: false },
  { value: "pentagon" as KeychainShape, label: "Pentagon", icon: Pentagon, popular: false },
  { value: "triangle" as KeychainShape, label: "Triangle", icon: Triangle, popular: false },
  { value: "shield" as KeychainShape, label: "Shield", icon: Shield, popular: false }
];

export const ShapeSelector = ({ selectedShape, onShapeChange }: ShapeSelectorProps) => {
  const handleShapeChange = (shape: KeychainShape) => {
    onShapeChange(shape);
    toast.success(`Keychain shape changed to ${shape}`);
  };

  return (
    <Card className="p-6 bg-card-soft border-2 border-secondary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Hexagon className="w-5 h-5 text-secondary" />
          <Label className="font-display text-lg font-semibold">Keychain Shape</Label>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {shapeOptions.map((shape) => {
            const Icon = shape.icon;
            const isSelected = selectedShape === shape.value;
            
            return (
              <div key={shape.value} className="relative">
                {shape.popular && (
                  <span className="absolute -top-2 -right-2 z-10 px-2 py-0.5 text-[10px] font-semibold bg-accent text-accent-foreground rounded-full">
                    Popular
                  </span>
                )}
                <Button
                  variant={isSelected ? "secondary" : "outline"}
                  className={`w-full h-24 flex flex-col gap-2 p-3 transition-all ${
                    isSelected 
                      ? "ring-2 ring-secondary ring-offset-2 shadow-float" 
                      : "hover:shadow-float hover:scale-105"
                  }`}
                  onClick={() => handleShapeChange(shape.value)}
                >
                  <Icon className={`w-8 h-8 ${isSelected ? "text-white" : "text-muted-foreground"}`} />
                  <span className="text-xs font-medium">
                    {shape.label}
                  </span>
                </Button>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-background rounded-lg border">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Selected: </span>
            {shapeOptions.find(s => s.value === selectedShape)?.label}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Shape affects the overall form of your keychain
          </p>
        </div>

        {/* Shape Preview */}
        <div className="p-6 bg-gradient-soft rounded-lg">
          <p className="text-xs text-center text-muted-foreground mb-3">Shape Preview</p>
          <div className="flex justify-center">
            {(() => {
              const SelectedIcon = shapeOptions.find(s => s.value === selectedShape)?.icon || Square;
              return <SelectedIcon className="w-16 h-16 text-primary animate-float" />;
            })()}
          </div>
        </div>
      </div>
    </Card>
  );
};
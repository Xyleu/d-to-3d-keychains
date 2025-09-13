import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Layers, Move, Download, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface ControlPanelProps {
  thickness: number;
  onThicknessChange: (value: number[]) => void;
  keychainHolePosition: { x: number; y: number };
  onKeychainHoleChange: (position: { x: number; y: number }) => void;
  onExport: () => void;
}

export const ControlPanel = ({
  thickness,
  onThicknessChange,
  keychainHolePosition,
  onKeychainHoleChange,
  onExport,
}: ControlPanelProps) => {
  const handlePositionClick = (position: { x: number; y: number }) => {
    onKeychainHoleChange(position);
    toast.success("Keychain hole position updated!");
  };

  const predefinedPositions = [
    { label: "Top Center", x: 0, y: 1.3 },
    { label: "Top Left", x: -1, y: 1 },
    { label: "Top Right", x: 1, y: 1 },
    { label: "Center", x: 0, y: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Thickness Control */}
      <Card className="p-6 bg-card-soft border-2 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <Label className="font-display text-lg font-semibold">Thickness</Label>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Thin</span>
              <span className="font-semibold text-primary">{thickness.toFixed(1)}mm</span>
              <span>Thick</span>
            </div>
            <Slider
              value={[thickness]}
              onValueChange={onThicknessChange}
              min={0.3}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="soft"
              size="sm"
              onClick={() => onThicknessChange([0.5])}
              className="text-xs"
            >
              Thin (0.5mm)
            </Button>
            <Button
              variant="soft"
              size="sm"
              onClick={() => onThicknessChange([1])}
              className="text-xs"
            >
              Medium (1mm)
            </Button>
            <Button
              variant="soft"
              size="sm"
              onClick={() => onThicknessChange([1.5])}
              className="text-xs"
            >
              Thick (1.5mm)
            </Button>
          </div>
        </div>
      </Card>

      {/* Keychain Hole Position */}
      <Card className="p-6 bg-card-soft border-2 border-secondary/20">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Move className="w-5 h-5 text-secondary" />
            <Label className="font-display text-lg font-semibold">Keychain Hole Position</Label>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {predefinedPositions.map((pos) => (
              <Button
                key={pos.label}
                variant={
                  keychainHolePosition.x === pos.x && keychainHolePosition.y === pos.y
                    ? "secondary"
                    : "outline"
                }
                size="sm"
                onClick={() => handlePositionClick({ x: pos.x, y: pos.y })}
                className="text-xs"
              >
                {pos.label}
              </Button>
            ))}
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Position: X: {keychainHolePosition.x.toFixed(1)}, Y: {keychainHolePosition.y.toFixed(1)}
          </div>
        </div>
      </Card>

      {/* Export Options */}
      <Card className="p-6 bg-gradient-soft border-2 border-accent/20">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <Label className="font-display text-lg font-semibold">Ready to Create?</Label>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Your custom keychain is ready! Export your design and bring it to life.
          </p>

          <Button 
            variant="hero" 
            className="w-full gap-2" 
            onClick={onExport}
          >
            <Download className="w-4 h-4" />
            Export 3D Model
          </Button>
        </div>
      </Card>
    </div>
  );
};
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Palette, Pipette } from "lucide-react";

interface ColorCustomizerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const colorOptions = [
  { name: "Original", value: "#FFFFFF", gradient: false },
  { name: "Pink Paradise", value: "#FF69B4", gradient: false },
  { name: "Lavender Dream", value: "#E6E6FA", gradient: false },
  { name: "Mint Fresh", value: "#98FB98", gradient: false },
  { name: "Sunshine", value: "#FFD700", gradient: false },
  { name: "Ocean Blue", value: "#00CED1", gradient: false },
  { name: "Coral Reef", value: "#FF7F50", gradient: false },
  { name: "Rainbow", value: "rainbow", gradient: true },
  { name: "Sunset", value: "sunset", gradient: true },
  { name: "Aurora", value: "aurora", gradient: true }
];

export const ColorCustomizer = ({ selectedColor, onColorChange }: ColorCustomizerProps) => {
  const getGradientStyle = (value: string) => {
    switch (value) {
      case "rainbow":
        return "linear-gradient(135deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3)";
      case "sunset":
        return "linear-gradient(135deg, #FF512F, #F09819, #FFE259)";
      case "aurora":
        return "linear-gradient(135deg, #667eea, #764ba2, #f093fb)";
      default:
        return value;
    }
  };

  return (
    <Card className="p-6 bg-card-soft border-2 border-secondary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-secondary" />
          <Label className="font-display text-lg font-semibold">Keychain Color</Label>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {colorOptions.map((color) => (
            <Button
              key={color.name}
              variant={selectedColor === color.value ? "secondary" : "outline"}
              onClick={() => onColorChange(color.value)}
              className="flex flex-col items-center gap-2 h-auto py-3 px-2"
            >
              <div
                className="w-10 h-10 rounded-lg border-2 border-background shadow-sm"
                style={{
                  background: color.gradient ? getGradientStyle(color.value) : color.value,
                }}
              />
              <span className="text-xs font-medium text-center">{color.name}</span>
            </Button>
          ))}
        </div>

        <div className="p-3 bg-background rounded-lg">
          <div className="flex items-center gap-2">
            <Pipette className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {selectedColor === "#FFFFFF" && "Original colors from your image will be preserved"}
              {selectedColor.startsWith("#") && selectedColor !== "#FFFFFF" && "Your keychain will have a solid color overlay"}
              {!selectedColor.startsWith("#") && "Your keychain will have a beautiful gradient effect"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
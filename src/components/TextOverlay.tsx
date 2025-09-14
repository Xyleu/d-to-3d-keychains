import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Type, Palette, Move, AlignCenter } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export interface TextOverlayConfig {
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  position: { x: number; y: number };
  rotation: number;
}

interface TextOverlayProps {
  config: TextOverlayConfig;
  onConfigChange: (config: TextOverlayConfig) => void;
}

const fontOptions = [
  { value: "Quicksand", label: "Quicksand (Playful)" },
  { value: "Inter", label: "Inter (Clean)" },
  { value: "Playfair Display", label: "Playfair (Elegant)" },
  { value: "Comic Sans MS", label: "Comic Sans (Fun)" },
  { value: "Pacifico", label: "Pacifico (Cursive)" }
];

const colorOptions = [
  { value: "#FF69B4", label: "Pink", preview: "bg-pink-400" },
  { value: "#FFD700", label: "Gold", preview: "bg-yellow-400" },
  { value: "#FFFFFF", label: "White", preview: "bg-white" },
  { value: "#000000", label: "Black", preview: "bg-black" },
  { value: "#87CEEB", label: "Sky Blue", preview: "bg-sky-300" },
  { value: "#98FB98", label: "Mint", preview: "bg-green-300" },
  { value: "#DDA0DD", label: "Plum", preview: "bg-purple-300" },
  { value: "#FF6347", label: "Coral", preview: "bg-red-400" }
];

export const TextOverlay = ({ config, onConfigChange }: TextOverlayProps) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const updateConfig = (updates: Partial<TextOverlayConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  return (
    <Card className="p-6 bg-card-soft border-2 border-accent/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-accent" />
            <Label className="font-display text-lg font-semibold">Text Overlay</Label>
          </div>
          <Button
            variant={isEnabled ? "secondary" : "outline"}
            size="sm"
            onClick={() => setIsEnabled(!isEnabled)}
          >
            {isEnabled ? "Enabled" : "Disabled"}
          </Button>
        </div>

        {isEnabled && (
          <>
            {/* Text Input */}
            <div className="space-y-2">
              <Label htmlFor="text">Your Text</Label>
              <Input
                id="text"
                placeholder="Enter your text..."
                value={config.text}
                onChange={(e) => updateConfig({ text: e.target.value })}
                maxLength={20}
              />
              <p className="text-xs text-muted-foreground">
                {config.text.length}/20 characters
              </p>
            </div>

            {/* Font Selection */}
            <div className="space-y-2">
              <Label>Font Style</Label>
              <Select
                value={config.fontFamily}
                onValueChange={(value) => updateConfig({ fontFamily: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <span style={{ fontFamily: font.value }}>{font.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Font Size</Label>
                <span className="text-sm font-medium">{config.fontSize}px</span>
              </div>
              <Slider
                value={[config.fontSize]}
                onValueChange={(value) => updateConfig({ fontSize: value[0] })}
                min={12}
                max={48}
                step={2}
              />
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <Label>Text Color</Label>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((color) => (
                  <Button
                    key={color.value}
                    variant={config.color === color.value ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => updateConfig({ color: color.value })}
                    className="p-0 h-10"
                  >
                    <div className="flex items-center gap-2 px-2">
                      <div 
                        className={`w-4 h-4 rounded-full border ${color.preview}`}
                      />
                      <span className="text-xs">{color.label}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Position */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Move className="w-4 h-4" />
                Position
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="soft"
                  size="sm"
                  onClick={() => updateConfig({ position: { x: 0, y: 0.5 } })}
                >
                  Top
                </Button>
                <Button
                  variant="soft"
                  size="sm"
                  onClick={() => updateConfig({ position: { x: 0, y: 0 } })}
                >
                  Center
                </Button>
                <Button
                  variant="soft"
                  size="sm"
                  onClick={() => updateConfig({ position: { x: 0, y: -0.5 } })}
                >
                  Bottom
                </Button>
              </div>
            </div>

            {/* Rotation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Rotation</Label>
                <span className="text-sm font-medium">{config.rotation}°</span>
              </div>
              <Slider
                value={[config.rotation]}
                onValueChange={(value) => updateConfig({ rotation: value[0] })}
                min={-45}
                max={45}
                step={5}
              />
            </div>

            {/* Preview */}
            <div className="p-4 bg-background rounded-lg border">
              <p className="text-xs text-muted-foreground mb-2 text-center">Preview</p>
              <div className="flex items-center justify-center">
                <p
                  style={{
                    fontFamily: config.fontFamily,
                    fontSize: `${config.fontSize}px`,
                    color: config.color,
                    transform: `rotate(${config.rotation}deg)`
                  }}
                >
                  {config.text || "Your Text"}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
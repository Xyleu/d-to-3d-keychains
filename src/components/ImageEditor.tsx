import { useState, useRef, useEffect } from "react";
import { 
  Crop, 
  RotateCw, 
  FlipHorizontal2, 
  FlipVertical2,
  ZoomIn,
  ZoomOut,
  Palette,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface ImageEditorProps {
  imageUrl: string;
  onSave: (editedImage: string) => void;
  onCancel: () => void;
}

export const ImageEditor = ({ imageUrl, onSave, onCancel }: ImageEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [rotation, scale, brightness, contrast, flipH, flipV, imageUrl]);

  const applyFilters = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set canvas size
      canvas.width = 400;
      canvas.height = 400;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Save context state
      ctx.save();

      // Apply transformations
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(
        flipH ? -scale / 100 : scale / 100,
        flipV ? -scale / 100 : scale / 100
      );

      // Apply filters
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

      // Draw image
      ctx.drawImage(
        img,
        -img.width / 2,
        -img.height / 2,
        img.width,
        img.height
      );

      // Restore context state
      ctx.restore();
    };
    img.src = imageUrl;
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onSave(reader.result as string);
          toast.success("Image edits applied successfully!");
        };
        reader.readAsDataURL(blob);
      }
    });
  };

  const handleReset = () => {
    setRotation(0);
    setScale(100);
    setBrightness(100);
    setContrast(100);
    setFlipH(false);
    setFlipV(false);
    toast.info("All edits have been reset");
  };

  return (
    <Card className="p-6 bg-card-soft border-2 border-primary/20">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="font-display text-2xl font-semibold mb-2">Edit Your Image</h3>
          <p className="text-sm text-muted-foreground">
            Adjust your image to get the perfect keychain design
          </p>
        </div>

        {/* Canvas Preview */}
        <div className="flex justify-center">
          <div className="relative rounded-2xl overflow-hidden bg-background shadow-float">
            <canvas
              ref={canvasRef}
              className="max-w-full"
              width={400}
              height={400}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="soft"
            size="sm"
            onClick={() => setRotation((r) => r + 90)}
            className="gap-1"
          >
            <RotateCw className="w-4 h-4" />
            Rotate
          </Button>
          <Button
            variant="soft"
            size="sm"
            onClick={() => setFlipH(!flipH)}
            className={`gap-1 ${flipH ? "bg-primary/20" : ""}`}
          >
            <FlipHorizontal2 className="w-4 h-4" />
            Flip H
          </Button>
          <Button
            variant="soft"
            size="sm"
            onClick={() => setFlipV(!flipV)}
            className={`gap-1 ${flipV ? "bg-primary/20" : ""}`}
          >
            <FlipVertical2 className="w-4 h-4" />
            Flip V
          </Button>
          <Button
            variant="soft"
            size="sm"
            onClick={handleReset}
            className="gap-1"
          >
            Reset
          </Button>
        </div>

        {/* Adjustment Sliders */}
        <div className="space-y-4">
          {/* Zoom */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-primary" />
                Zoom
              </Label>
              <span className="text-sm font-medium">{scale}%</span>
            </div>
            <Slider
              value={[scale]}
              onValueChange={(value) => setScale(value[0])}
              min={50}
              max={150}
              step={5}
            />
          </div>

          {/* Brightness */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-accent" />
                Brightness
              </Label>
              <span className="text-sm font-medium">{brightness}%</span>
            </div>
            <Slider
              value={[brightness]}
              onValueChange={(value) => setBrightness(value[0])}
              min={50}
              max={150}
              step={5}
            />
          </div>

          {/* Contrast */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-secondary" />
                Contrast
              </Label>
              <span className="text-sm font-medium">{contrast}%</span>
            </div>
            <Slider
              value={[contrast]}
              onValueChange={(value) => setContrast(value[0])}
              min={50}
              max={150}
              step={5}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button variant="hero" onClick={handleSave} className="flex-1">
            Apply Changes
          </Button>
        </div>
      </div>
    </Card>
  );
};
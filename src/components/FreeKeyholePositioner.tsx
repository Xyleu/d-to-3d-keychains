import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Move, RefreshCw, Target } from "lucide-react";
import { toast } from "sonner";

interface FreeKeyholePositionerProps {
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  keychainWidth?: number;
  keychainHeight?: number;
}

export const FreeKeyholePositioner = ({
  position,
  onPositionChange,
  keychainWidth = 4,
  keychainHeight = 4,
}: FreeKeyholePositionerProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPositioning, setIsPositioning] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isPositioning) return;
    setIsDragging(true);
    updatePosition(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isPositioning) return;
    updatePosition(e);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      toast.success("Keyhole position updated!");
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const updatePosition = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Scale to keychain dimensions
    const scaledX = x * (keychainWidth / 2);
    const scaledY = y * (keychainHeight / 2);

    // Clamp to keychain bounds
    const clampedX = Math.max(-keychainWidth / 2 + 0.3, Math.min(keychainWidth / 2 - 0.3, scaledX));
    const clampedY = Math.max(-keychainHeight / 2 + 0.3, Math.min(keychainHeight / 2 - 0.3, scaledY));

    onPositionChange({ x: clampedX, y: clampedY });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isPositioning) return;
    updatePosition(e);
    toast.success("Keyhole position updated!");
  };

  const resetPosition = () => {
    onPositionChange({ x: 0, y: keychainHeight / 2 - 0.5 });
    toast.success("Position reset to top center");
  };

  const quickPositions = [
    { label: "Top Center", x: 0, y: keychainHeight / 2 - 0.5 },
    { label: "Top Left", x: -keychainWidth / 2 + 0.7, y: keychainHeight / 2 - 0.7 },
    { label: "Top Right", x: keychainWidth / 2 - 0.7, y: keychainHeight / 2 - 0.7 },
    { label: "Center", x: 0, y: 0 },
    { label: "Side", x: keychainWidth / 2 - 0.5, y: 0 },
  ];

  // Convert 3D coordinates to 2D canvas coordinates
  const positionToCanvas = (pos: { x: number; y: number }) => {
    const canvasX = ((pos.x / (keychainWidth / 2)) + 1) * 50;
    const canvasY = (1 - (pos.y / (keychainHeight / 2))) * 50;
    return { x: canvasX, y: canvasY };
  };

  const canvasPos = positionToCanvas(position);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isDragging]);

  return (
    <Card className="p-6 bg-card-soft border-2 border-secondary/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Move className="w-5 h-5 text-secondary" />
            <Label className="font-display text-lg font-semibold">Keyhole Position</Label>
          </div>
          <Button
            variant={isPositioning ? "secondary" : "outline"}
            size="sm"
            onClick={() => {
              setIsPositioning(!isPositioning);
              if (!isPositioning) {
                toast.info("Click or drag on the keychain to position the hole");
              }
            }}
            className="gap-2"
          >
            <Target className="w-4 h-4" />
            {isPositioning ? "Done" : "Position"}
          </Button>
        </div>

        {/* Interactive Canvas */}
        <div
          ref={canvasRef}
          className={`relative w-full h-48 bg-gradient-subtle rounded-lg border-2 border-dashed border-primary/20 overflow-hidden ${
            isPositioning ? "cursor-crosshair" : ""
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {/* Keychain outline */}
          <div className="absolute inset-4 border-2 border-primary/30 rounded-lg pointer-events-none">
            <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          </div>

          {/* Keyhole position indicator */}
          <div
            className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-100"
            style={{
              left: `${canvasPos.x}%`,
              top: `${canvasPos.y}%`,
            }}
          >
            <div className="absolute inset-0 bg-accent rounded-full animate-pulse" />
            <div className="absolute inset-1 bg-accent-foreground rounded-full" />
          </div>

          {isPositioning && (
            <div className="absolute top-2 left-2 bg-background/90 px-2 py-1 rounded text-xs">
              Click or drag to position
            </div>
          )}
        </div>

        {/* Quick Position Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {quickPositions.map((pos) => (
            <Button
              key={pos.label}
              variant="outline"
              size="sm"
              onClick={() => {
                onPositionChange({ x: pos.x, y: pos.y });
                toast.success(`Position set to ${pos.label}`);
              }}
              className="text-xs"
            >
              {pos.label}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={resetPosition}
            className="text-xs gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            Reset
          </Button>
        </div>

        {/* Position Display */}
        <div className="text-xs text-muted-foreground text-center p-2 bg-background rounded">
          Position: X: {position.x.toFixed(2)}, Y: {position.y.toFixed(2)}
        </div>
      </div>
    </Card>
  );
};
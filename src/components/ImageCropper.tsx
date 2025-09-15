import { useState, useRef, useEffect } from "react";
import { Crop, Check, X, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ImageCropperProps {
  imageUrl: string;
  onCrop: (croppedImage: string) => void;
  onCancel: () => void;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ImageCropper = ({ imageUrl, onCrop, onCancel }: ImageCropperProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [cropArea, setCropArea] = useState<CropArea>({ x: 50, y: 50, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeHandle, setResizeHandle] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    loadImage();
  }, [imageUrl]);

  useEffect(() => {
    if (imageLoaded) {
      drawCanvas();
    }
  }, [cropArea, imageLoaded]);

  const loadImage = () => {
    const img = new Image();
    img.onload = () => {
      if (imageRef.current) {
        imageRef.current = img;
        setImageLoaded(true);
        
        // Center the crop area initially
        const canvas = canvasRef.current;
        if (canvas) {
          const size = Math.min(img.width, img.height) * 0.5;
          setCropArea({
            x: (img.width - size) / 2,
            y: (img.height - size) / 2,
            width: size,
            height: size
          });
        }
      }
    };
    img.src = imageUrl;
    imageRef.current = img;
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imageRef.current;
    
    if (!canvas || !ctx || !img) return;

    // Set canvas size to match image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image
    ctx.drawImage(img, 0, 0);

    // Darken the area outside the crop
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clear the crop area (show original image)
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);
    ctx.globalCompositeOperation = "source-over";

    // Draw crop border
    ctx.strokeStyle = "#FF69B4";
    ctx.lineWidth = 2;
    ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

    // Draw resize handles
    const handleSize = 8;
    ctx.fillStyle = "#FF69B4";
    
    // Corners
    ctx.fillRect(cropArea.x - handleSize/2, cropArea.y - handleSize/2, handleSize, handleSize);
    ctx.fillRect(cropArea.x + cropArea.width - handleSize/2, cropArea.y - handleSize/2, handleSize, handleSize);
    ctx.fillRect(cropArea.x - handleSize/2, cropArea.y + cropArea.height - handleSize/2, handleSize, handleSize);
    ctx.fillRect(cropArea.x + cropArea.width - handleSize/2, cropArea.y + cropArea.height - handleSize/2, handleSize, handleSize);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Check if clicking on resize handles
    const handleSize = 16;
    
    if (Math.abs(x - cropArea.x) < handleSize && Math.abs(y - cropArea.y) < handleSize) {
      setIsResizing(true);
      setResizeHandle("tl");
    } else if (Math.abs(x - (cropArea.x + cropArea.width)) < handleSize && Math.abs(y - cropArea.y) < handleSize) {
      setIsResizing(true);
      setResizeHandle("tr");
    } else if (Math.abs(x - cropArea.x) < handleSize && Math.abs(y - (cropArea.y + cropArea.height)) < handleSize) {
      setIsResizing(true);
      setResizeHandle("bl");
    } else if (Math.abs(x - (cropArea.x + cropArea.width)) < handleSize && Math.abs(y - (cropArea.y + cropArea.height)) < handleSize) {
      setIsResizing(true);
      setResizeHandle("br");
    } else if (x >= cropArea.x && x <= cropArea.x + cropArea.width && 
               y >= cropArea.y && y <= cropArea.y + cropArea.height) {
      // Start dragging
      setIsDragging(true);
      setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (isDragging) {
      const newX = Math.max(0, Math.min(canvas.width - cropArea.width, x - dragStart.x));
      const newY = Math.max(0, Math.min(canvas.height - cropArea.height, y - dragStart.y));
      setCropArea(prev => ({ ...prev, x: newX, y: newY }));
    } else if (isResizing) {
      let newArea = { ...cropArea };
      
      if (resizeHandle === "br") {
        newArea.width = Math.max(50, x - cropArea.x);
        newArea.height = Math.max(50, y - cropArea.y);
      } else if (resizeHandle === "tl") {
        const newWidth = Math.max(50, cropArea.x + cropArea.width - x);
        const newHeight = Math.max(50, cropArea.y + cropArea.height - y);
        newArea.x = cropArea.x + cropArea.width - newWidth;
        newArea.y = cropArea.y + cropArea.height - newHeight;
        newArea.width = newWidth;
        newArea.height = newHeight;
      } else if (resizeHandle === "tr") {
        newArea.width = Math.max(50, x - cropArea.x);
        const newHeight = Math.max(50, cropArea.y + cropArea.height - y);
        newArea.y = cropArea.y + cropArea.height - newHeight;
        newArea.height = newHeight;
      } else if (resizeHandle === "bl") {
        const newWidth = Math.max(50, cropArea.x + cropArea.width - x);
        newArea.x = cropArea.x + cropArea.width - newWidth;
        newArea.width = newWidth;
        newArea.height = Math.max(50, y - cropArea.y);
      }
      
      setCropArea(newArea);
    }

    // Update cursor
    const handleSize = 16;
    if (Math.abs(x - cropArea.x) < handleSize && Math.abs(y - cropArea.y) < handleSize) {
      canvas.style.cursor = "nw-resize";
    } else if (Math.abs(x - (cropArea.x + cropArea.width)) < handleSize && Math.abs(y - cropArea.y) < handleSize) {
      canvas.style.cursor = "ne-resize";
    } else if (Math.abs(x - cropArea.x) < handleSize && Math.abs(y - (cropArea.y + cropArea.height)) < handleSize) {
      canvas.style.cursor = "sw-resize";
    } else if (Math.abs(x - (cropArea.x + cropArea.width)) < handleSize && Math.abs(y - (cropArea.y + cropArea.height)) < handleSize) {
      canvas.style.cursor = "se-resize";
    } else if (x >= cropArea.x && x <= cropArea.x + cropArea.width && 
               y >= cropArea.y && y <= cropArea.y + cropArea.height) {
      canvas.style.cursor = "move";
    } else {
      canvas.style.cursor = "default";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleCrop = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;
    
    if (!ctx || !img) return;

    canvas.width = cropArea.width;
    canvas.height = cropArea.height;

    ctx.drawImage(
      img,
      cropArea.x, cropArea.y, cropArea.width, cropArea.height,
      0, 0, cropArea.width, cropArea.height
    );

    canvas.toBlob((blob) => {
      if (blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onCrop(reader.result as string);
          toast.success("Image cropped successfully!");
        };
        reader.readAsDataURL(blob);
      }
    });
  };

  const aspectRatioPresets = [
    { label: "Square", ratio: 1 },
    { label: "Portrait", ratio: 0.75 },
    { label: "Landscape", ratio: 1.33 },
    { label: "Circle", ratio: 1 }
  ];

  const applyAspectRatio = (ratio: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = Math.min(canvas.width, canvas.height) * 0.5;
    const width = ratio >= 1 ? size * ratio : size;
    const height = ratio < 1 ? size / ratio : size;

    setCropArea({
      x: (canvas.width - width) / 2,
      y: (canvas.height - height) / 2,
      width,
      height
    });
  };

  return (
    <Card className="p-6 bg-card-soft border-2 border-primary/20">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="font-display text-2xl font-semibold mb-2 flex items-center justify-center gap-2">
            <Crop className="w-6 h-6 text-primary" />
            Crop Your Image
          </h3>
          <p className="text-sm text-muted-foreground">
            Drag to move, pull corners to resize
          </p>
        </div>

        {/* Aspect Ratio Presets */}
        <div className="space-y-2">
          <Label>Quick Presets</Label>
          <div className="grid grid-cols-4 gap-2">
            {aspectRatioPresets.map((preset) => (
              <Button
                key={preset.label}
                variant="soft"
                size="sm"
                onClick={() => applyAspectRatio(preset.ratio)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="relative rounded-lg overflow-hidden bg-background">
          <canvas
            ref={canvasRef}
            className="max-w-full mx-auto cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ maxHeight: "400px", width: "auto" }}
          />
        </div>

        {/* Crop Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-2 bg-background rounded">
            <span className="text-muted-foreground">Width: </span>
            <span className="font-medium">{Math.round(cropArea.width)}px</span>
          </div>
          <div className="text-center p-2 bg-background rounded">
            <span className="text-muted-foreground">Height: </span>
            <span className="font-medium">{Math.round(cropArea.height)}px</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={onCancel} 
            className="flex-1 gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button 
            variant="hero" 
            onClick={handleCrop} 
            className="flex-1 gap-2"
          >
            <Check className="w-4 h-4" />
            Apply Crop
          </Button>
        </div>
      </div>
    </Card>
  );
};
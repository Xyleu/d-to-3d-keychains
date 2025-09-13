import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  uploadedImage: string | null;
  onClear: () => void;
}

export const ImageUploader = ({ onImageUpload, uploadedImage, onClear }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith("image/"));

    if (imageFile) {
      onImageUpload(imageFile);
    } else {
      toast.error("Please upload an image file");
    }
  }, [onImageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onImageUpload(file);
    } else {
      toast.error("Please select an image file");
    }
  }, [onImageUpload]);

  if (uploadedImage) {
    return (
      <div className="relative rounded-3xl overflow-hidden shadow-float bg-card-soft p-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm"
        >
          <X className="w-4 h-4" />
        </Button>
        <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-background">
          <img 
            src={uploadedImage} 
            alt="Uploaded image" 
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-center mt-4 text-sm text-muted-foreground">
          Your image is ready for transformation! ✨
        </p>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative rounded-3xl border-3 border-dashed transition-all duration-300
        ${isDragging 
          ? 'border-primary bg-primary-soft scale-105 shadow-glow' 
          : 'border-border bg-card-soft hover:border-primary/50'
        }
        p-12 text-center cursor-pointer group
      `}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="space-y-4">
        <div className={`
          mx-auto w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center
          ${isDragging ? 'animate-bounce-gentle' : 'group-hover:animate-bounce-gentle'}
        `}>
          {isDragging ? (
            <ImageIcon className="w-10 h-10 text-primary-foreground" />
          ) : (
            <Upload className="w-10 h-10 text-primary-foreground" />
          )}
        </div>

        <div>
          <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
            {isDragging ? 'Drop your image here!' : 'Upload Your Image'}
          </h3>
          <p className="text-muted-foreground">
            Drag & drop your image here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Supports JPG, PNG, GIF, WebP (Max 10MB)
          </p>
        </div>

        <Button variant="soft" className="mt-4">
          Choose from Computer
        </Button>
      </div>
    </div>
  );
};
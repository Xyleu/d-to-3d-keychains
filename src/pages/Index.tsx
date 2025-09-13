import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ImageUploader } from "@/components/ImageUploader";
import { Canvas3D } from "@/components/Canvas3D";
import { ControlPanel } from "@/components/ControlPanel";
import { toast } from "sonner";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [thickness, setThickness] = useState(1);
  const [keychainHolePosition, setKeychainHolePosition] = useState({ x: 0, y: 1.3 });
  const [showDesigner, setShowDesigner] = useState(false);
  const designerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      toast.success("Image uploaded successfully! Your 3D model is being generated...");
      
      // Simulate 3D conversion delay
      setTimeout(() => {
        toast.success("3D model ready! Customize your keychain below.");
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  const handleExport = () => {
    toast.success("Exporting your 3D keychain model...");
    setTimeout(() => {
      toast.success("Download complete! Your keychain is ready for 3D printing.");
    }, 2000);
  };

  const handleGetStarted = () => {
    setShowDesigner(true);
    setTimeout(() => {
      designerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero onGetStarted={handleGetStarted} />

      {/* Features Section */}
      <Features />

      {/* Designer Section */}
      {showDesigner && (
        <section ref={designerRef} className="py-20 bg-gradient-aurora/10">
          <div className="container px-4">
            <div className="text-center mb-12 animate-fade-up">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
                Design Your Keychain
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload your image and customize every detail of your 3D keychain
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Left Column - Upload & Preview */}
              <div className="space-y-6 animate-fade-up">
                <ImageUploader 
                  onImageUpload={handleImageUpload}
                  uploadedImage={uploadedImage}
                  onClear={() => setUploadedImage(null)}
                />
                
                {uploadedImage && (
                  <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
                    <h3 className="font-display text-xl font-semibold mb-4">3D Preview</h3>
                    <Canvas3D 
                      thickness={thickness}
                      keychainHolePosition={keychainHolePosition}
                      imageTexture={uploadedImage}
                    />
                  </div>
                )}
              </div>

              {/* Right Column - Controls */}
              {uploadedImage && (
                <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
                  <h3 className="font-display text-xl font-semibold mb-4">Customize Your Design</h3>
                  <ControlPanel 
                    thickness={thickness}
                    onThicknessChange={(value) => setThickness(value[0])}
                    keychainHolePosition={keychainHolePosition}
                    onKeychainHoleChange={setKeychainHolePosition}
                    onExport={handleExport}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 bg-card-soft border-t">
        <div className="container px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Keychain Magic. Made with ❤️ for creative kids and families.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
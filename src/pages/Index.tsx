import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ImageUploader } from "@/components/ImageUploader";
import { ImageEditor } from "@/components/ImageEditor";
import { Canvas3D } from "@/components/Canvas3D";
import { ControlPanel } from "@/components/ControlPanel";
import { MaterialSelector, materials } from "@/components/MaterialSelector";
import { TextOverlay, TextOverlayConfig } from "@/components/TextOverlay";
import { SizeSelector, sizePresets } from "@/components/SizeSelector";
import { ColorCustomizer } from "@/components/ColorCustomizer";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Palette, Type, Package } from "lucide-react";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [thickness, setThickness] = useState(1);
  const [keychainHolePosition, setKeychainHolePosition] = useState({ x: 0, y: 1.3 });
  const [showDesigner, setShowDesigner] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [selectedSize, setSelectedSize] = useState(sizePresets[2]); // Medium by default
  const [keychainColor, setKeychainColor] = useState("#FFFFFF");
  const [textConfig, setTextConfig] = useState<TextOverlayConfig>({
    text: "",
    fontSize: 24,
    fontFamily: "Quicksand",
    color: "#FFFFFF",
    position: { x: 0, y: 0 },
    rotation: 0
  });
  const designerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setUploadedImage(imageUrl);
      setEditedImage(imageUrl);
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

  const handleImageEdit = (editedImageUrl: string) => {
    setEditedImage(editedImageUrl);
    setIsEditing(false);
  };

  const displayImage = editedImage || uploadedImage;

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

            <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {/* Left Column - Upload & Preview */}
              <div className="space-y-6 animate-fade-up">
                {!isEditing ? (
                  <ImageUploader 
                    onImageUpload={handleImageUpload}
                    uploadedImage={displayImage}
                    onClear={() => {
                      setUploadedImage(null);
                      setEditedImage(null);
                    }}
                    onEdit={() => setIsEditing(true)}
                  />
                ) : (
                  <ImageEditor
                    imageUrl={uploadedImage!}
                    onSave={handleImageEdit}
                    onCancel={() => setIsEditing(false)}
                  />
                )}
                
                {displayImage && !isEditing && (
                  <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
                    <h3 className="font-display text-xl font-semibold mb-4">3D Preview</h3>
                    <Canvas3D 
                      thickness={thickness}
                      keychainHolePosition={keychainHolePosition}
                      imageTexture={displayImage}
                      material={selectedMaterial}
                      textConfig={textConfig}
                      size={selectedSize}
                      keychainColor={keychainColor}
                    />
                  </div>
                )}
              </div>

              {/* Right Column - Controls */}
              {displayImage && !isEditing && (
                <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
                  <h3 className="font-display text-xl font-semibold mb-4">Customize Your Design</h3>
                  
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="basic" className="gap-1">
                        <Settings className="w-4 h-4" />
                        <span className="hidden md:inline">Basic</span>
                      </TabsTrigger>
                      <TabsTrigger value="material" className="gap-1">
                        <Palette className="w-4 h-4" />
                        <span className="hidden md:inline">Material</span>
                      </TabsTrigger>
                      <TabsTrigger value="text" className="gap-1">
                        <Type className="w-4 h-4" />
                        <span className="hidden md:inline">Text</span>
                      </TabsTrigger>
                      <TabsTrigger value="size" className="gap-1">
                        <Package className="w-4 h-4" />
                        <span className="hidden md:inline">Size</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-6 mt-6">
                      <ControlPanel 
                        thickness={thickness}
                        onThicknessChange={(value) => setThickness(value[0])}
                        keychainHolePosition={keychainHolePosition}
                        onKeychainHoleChange={setKeychainHolePosition}
                        onExport={handleExport}
                      />
                    </TabsContent>

                    <TabsContent value="material" className="space-y-6 mt-6">
                      <MaterialSelector
                        selectedMaterial={selectedMaterial}
                        onMaterialChange={setSelectedMaterial}
                      />
                      <ColorCustomizer
                        selectedColor={keychainColor}
                        onColorChange={setKeychainColor}
                      />
                    </TabsContent>

                    <TabsContent value="text" className="mt-6">
                      <TextOverlay
                        config={textConfig}
                        onConfigChange={setTextConfig}
                      />
                    </TabsContent>

                    <TabsContent value="size" className="mt-6">
                      <SizeSelector
                        selectedSize={selectedSize}
                        onSizeChange={setSelectedSize}
                      />
                    </TabsContent>
                  </Tabs>
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
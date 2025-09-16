import { useState, useRef } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ImageEditor } from "@/components/ImageEditor";
import { Canvas3D } from "@/components/Canvas3D";
import { FreeKeyholePositioner } from "@/components/FreeKeyholePositioner";
import { MaterialSelector, materials } from "@/components/MaterialSelector";
import { TextOverlay, TextOverlayConfig } from "@/components/TextOverlay";
import { SizeSelector, sizePresets } from "@/components/SizeSelector";
import { ColorCustomizer } from "@/components/ColorCustomizer";
import { ShapeSelector, type KeychainShape } from "@/components/ShapeSelector";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Palette, Type, Package, Hexagon, Layers, Download, Sparkles, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";

const Designer = () => {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [thickness, setThickness] = useState(1);
  const [keychainHolePosition, setKeychainHolePosition] = useState({ x: 0, y: 1.3 });
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

  const handleImageEdit = (editedImageUrl: string) => {
    setEditedImage(editedImageUrl);
    setIsEditing(false);
  };

  const displayImage = editedImage || uploadedImage;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card-soft sticky top-0 z-50">
        <div className="container px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <span className="font-display text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                YOSKEY Designer
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="w-3 h-3" />
                5 Free Tokens
              </Badge>
            </div>
          </nav>
        </div>
      </header>

      {/* Designer Section */}
      <section className="py-10">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Column - Upload & Preview */}
            <div className="space-y-6">
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
                            onValueChange={(value) => setThickness(value[0])}
                            min={0.3}
                            max={2}
                            step={0.1}
                            className="w-full"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setThickness(0.5)}
                            className="text-xs"
                          >
                            Thin (0.5mm)
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setThickness(1)}
                            className="text-xs"
                          >
                            Medium (1mm)
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setThickness(1.5)}
                            className="text-xs"
                          >
                            Thick (1.5mm)
                          </Button>
                        </div>
                      </div>
                    </Card>

                    {/* Keyhole Position */}
                    <FreeKeyholePositioner
                      position={keychainHolePosition}
                      onPositionChange={setKeychainHolePosition}
                      keychainWidth={selectedSize.width}
                      keychainHeight={selectedSize.height}
                    />

                    {/* Export Options */}
                    <Card className="p-6 bg-gradient-soft border-2 border-accent/20">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-accent" />
                          <Label className="font-display text-lg font-semibold">Ready to Create?</Label>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="p-3 bg-background/50 rounded-lg">
                            <p className="text-sm font-medium mb-1">Free Tokens Remaining: 5</p>
                            <p className="text-xs text-muted-foreground">
                              Each download uses 1 token. Subscribe for unlimited downloads!
                            </p>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">
                            Your custom keychain is ready! Export your design and bring it to life.
                          </p>
                        </div>

                        <Button 
                          variant="hero" 
                          className="w-full gap-2" 
                          onClick={handleExport}
                        >
                          <Download className="w-4 h-4" />
                          Export 3D Model (1 Token)
                        </Button>

                        <Button 
                          variant="outline" 
                          className="w-full gap-2"
                          onClick={() => navigate("/pricing")}
                        >
                          <Sparkles className="w-4 h-4" />
                          View Subscription Plans
                        </Button>
                      </div>
                    </Card>
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
    </div>
  );
};

export default Designer;
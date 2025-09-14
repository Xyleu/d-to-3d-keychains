import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Palette, Droplet, TreePine, Gem, Sparkles } from "lucide-react";

export interface MaterialOption {
  id: string;
  name: string;
  color: string;
  metalness: number;
  roughness: number;
  icon: React.ReactNode;
  price?: string;
}

interface MaterialSelectorProps {
  selectedMaterial: MaterialOption;
  onMaterialChange: (material: MaterialOption) => void;
}

export const materials: MaterialOption[] = [
  {
    id: "plastic",
    name: "Plastic",
    color: "#FF69B4",
    metalness: 0.1,
    roughness: 0.3,
    icon: <Droplet className="w-4 h-4" />,
    price: "$4.99"
  },
  {
    id: "metal",
    name: "Metal",
    color: "#C0C0C0",
    metalness: 0.9,
    roughness: 0.2,
    icon: <Gem className="w-4 h-4" />,
    price: "$9.99"
  },
  {
    id: "wood",
    name: "Wood",
    color: "#8B4513",
    metalness: 0,
    roughness: 0.8,
    icon: <TreePine className="w-4 h-4" />,
    price: "$7.99"
  },
  {
    id: "acrylic",
    name: "Acrylic",
    color: "#FFB6C1",
    metalness: 0.3,
    roughness: 0.1,
    icon: <Sparkles className="w-4 h-4" />,
    price: "$6.99"
  },
  {
    id: "resin",
    name: "Resin",
    color: "#E6E6FA",
    metalness: 0.2,
    roughness: 0.15,
    icon: <Palette className="w-4 h-4" />,
    price: "$8.99"
  }
];

export const MaterialSelector = ({ selectedMaterial, onMaterialChange }: MaterialSelectorProps) => {
  return (
    <Card className="p-6 bg-card-soft border-2 border-tertiary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-tertiary" />
          <Label className="font-display text-lg font-semibold">Material</Label>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {materials.map((material) => (
            <Button
              key={material.id}
              variant={selectedMaterial.id === material.id ? "secondary" : "outline"}
              onClick={() => onMaterialChange(material)}
              className="flex flex-col items-center gap-2 h-auto py-3 px-2"
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: material.color }}
              >
                {material.icon}
              </div>
              <div className="text-center">
                <div className="text-xs font-medium">{material.name}</div>
                <div className="text-xs text-muted-foreground">{material.price}</div>
              </div>
            </Button>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-1">Selected: {selectedMaterial.name}</p>
          <p className="text-xs">
            {selectedMaterial.id === "plastic" && "Durable and lightweight, perfect for everyday use"}
            {selectedMaterial.id === "metal" && "Premium metallic finish with excellent durability"}
            {selectedMaterial.id === "wood" && "Natural wood texture for an eco-friendly choice"}
            {selectedMaterial.id === "acrylic" && "Crystal clear with a glossy finish"}
            {selectedMaterial.id === "resin" && "Smooth and colorful with endless possibilities"}
          </p>
        </div>
      </div>
    </Card>
  );
};
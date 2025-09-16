import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "Cute Puppy Keychain",
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=400&fit=crop",
    category: "Animals",
    isPopular: true,
  },
  {
    id: 2,
    title: "Family Portrait",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop",
    category: "Family",
    isPopular: false,
  },
  {
    id: 3,
    title: "Anime Character",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc27?w=400&h=400&fit=crop",
    category: "Anime",
    isPopular: true,
  },
  {
    id: 4,
    title: "Wedding Photo",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
    category: "Wedding",
    isPopular: false,
  },
  {
    id: 5,
    title: "Baby's First Photo",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop",
    category: "Baby",
    isPopular: true,
  },
  {
    id: 6,
    title: "Pet Cat Design",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
    category: "Animals",
    isPopular: false,
  },
  {
    id: 7,
    title: "Custom Logo",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=400&fit=crop",
    category: "Business",
    isPopular: true,
  },
  {
    id: 8,
    title: "Graduation Memory",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop",
    category: "Education",
    isPopular: false,
  },
];

export const Gallery = () => {
  return (
    <section className="py-20 bg-gradient-soft/30">
      <div className="container px-4">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
            Gallery of Creations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get inspired by amazing keychains created by our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <Card
              key={item.id}
              className="group relative overflow-hidden bg-card-soft border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-float animate-fade-up cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden bg-gradient-soft">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-semibold text-lg">
                    {item.title}
                  </h3>
                  {item.isPopular && (
                    <Badge variant="secondary" className="gap-1">
                      <Sparkles className="w-3 h-3" />
                      Popular
                    </Badge>
                  )}
                </div>
                
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-up" style={{ animationDelay: "800ms" }}>
          <p className="text-muted-foreground mb-4">
            Ready to create your own unique keychain?
          </p>
          <a
            href="/designer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-full font-medium hover:shadow-float transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            Start Designing Now
          </a>
        </div>
      </div>
    </section>
  );
};
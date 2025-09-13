import { Card } from "@/components/ui/card";
import { Upload, Palette, Download, Sparkles, Heart, Star } from "lucide-react";
import samplesImage from "@/assets/keychain-samples.jpg";

const features = [
  {
    icon: Upload,
    title: "Easy Upload",
    description: "Simply drag and drop your favorite image to get started",
    color: "text-primary",
    bgColor: "bg-primary-soft",
  },
  {
    icon: Sparkles,
    title: "Instant 3D Magic",
    description: "Watch your image transform into a 3D keychain in seconds",
    color: "text-secondary",
    bgColor: "bg-secondary-soft",
  },
  {
    icon: Palette,
    title: "Full Customization",
    description: "Adjust thickness and position the keychain hole anywhere",
    color: "text-tertiary",
    bgColor: "bg-tertiary/20",
  },
  {
    icon: Download,
    title: "Ready to Print",
    description: "Export your design in formats ready for 3D printing",
    color: "text-accent",
    bgColor: "bg-accent-soft",
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container px-4">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Creating your custom keychain is as easy as 1-2-3! Perfect for kids and adults alike.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-float transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20 bg-card animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-full ${feature.bgColor} flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <h3 className="font-display text-3xl font-bold">
              Perfect for Every Occasion
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Personalized Gifts</h4>
                  <p className="text-sm text-muted-foreground">
                    Create unique keychains for birthdays, holidays, or just because!
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Star className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">School Projects</h4>
                  <p className="text-sm text-muted-foreground">
                    Perfect for creative school projects and crafts activities.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-tertiary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Party Favors</h4>
                  <p className="text-sm text-muted-foreground">
                    Design custom keychains as memorable party favors for guests.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div className="rounded-3xl overflow-hidden shadow-float">
              <img 
                src={samplesImage} 
                alt="Sample keychains collection" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground rounded-full px-4 py-2 font-display font-semibold shadow-glow">
              100% Kid-Safe
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
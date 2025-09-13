import { Button } from "@/components/ui/button";
import { Sparkles, Upload, Heart } from "lucide-react";
import heroImage from "@/assets/hero-transformation.jpg";

export const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-soft">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tertiary/10 rounded-full blur-3xl animate-bounce-gentle" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-accent-soft text-accent-foreground px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Magic at Your Fingertips</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Transform Your Images into 3D Keychains
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create personalized keychains from your favorite images. Perfect for kids, gifts, and special memories. 
            Design, customize, and bring your ideas to life!
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onGetStarted}
              className="gap-2"
            >
              <Upload className="w-5 h-5" />
              Start Creating
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Heart className="w-5 h-5" />
              View Gallery
            </Button>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-float mx-auto max-w-5xl">
            <img 
              src={heroImage} 
              alt="2D to 3D transformation showcase" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1M+</div>
              <div className="text-sm text-muted-foreground">Happy Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">5★</div>
              <div className="text-sm text-muted-foreground">Kid-Friendly</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tertiary">∞</div>
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
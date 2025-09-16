import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Gallery } from "@/components/Gallery";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/designer");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero onGetStarted={handleGetStarted} />

      {/* Features Section */}
      <Features />

      {/* Gallery Section */}
      <Gallery />

      {/* Footer */}
      <footer className="py-8 bg-card-soft border-t">
        <div className="container px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 YOSKEY. Made with ❤️ for creative souls.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
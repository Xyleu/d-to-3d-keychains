import { Check, Sparkles, Crown, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free Trial",
      icon: Sparkles,
      tokens: "5 Tokens",
      price: "$0",
      period: "",
      features: [
        "5 free keychain designs",
        "Basic customization options",
        "Standard quality exports",
        "Email support",
      ],
      buttonText: "Start Free",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Pay Per Token",
      icon: Zap,
      tokens: "1 Token",
      price: "$2.99",
      period: "per token",
      features: [
        "No subscription required",
        "All customization features",
        "High-quality exports",
        "Priority email support",
        "No expiration",
      ],
      buttonText: "Buy Tokens",
      buttonVariant: "soft" as const,
      popular: false,
    },
    {
      name: "Monthly Pro",
      icon: Crown,
      tokens: "Unlimited",
      price: "$19.99",
      period: "/month",
      features: [
        "Unlimited keychain designs",
        "Advanced customization tools",
        "Premium quality exports",
        "Priority support",
        "Early access to new features",
        "Commercial use license",
      ],
      buttonText: "Go Pro Monthly",
      buttonVariant: "hero" as const,
      popular: true,
    },
    {
      name: "Yearly Pro",
      icon: Crown,
      tokens: "Unlimited",
      price: "$199",
      period: "/year",
      badge: "Save 17%",
      features: [
        "Everything in Monthly Pro",
        "2 months free",
        "Exclusive design templates",
        "API access",
        "White-label options",
        "Dedicated account manager",
      ],
      buttonText: "Go Pro Yearly",
      buttonVariant: "hero" as const,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card-soft">
        <div className="container px-4 py-4">
          <nav className="flex items-center justify-between">
            <a href="/" className="font-display text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              YOSKEY
            </a>
            <div className="flex items-center gap-6">
              <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
              <a href="/designer" className="text-muted-foreground hover:text-foreground transition-colors">
                Designer
              </a>
              <Button variant="hero" size="sm" onClick={() => navigate("/designer")}>
                Start Creating
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start with 5 free tokens. Choose the plan that works best for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <Card
                  key={plan.name}
                  className={`relative p-6 bg-card-soft border-2 ${
                    plan.popular
                      ? "border-primary shadow-float scale-105"
                      : "border-primary/20"
                  } hover:border-primary/40 transition-all duration-300 animate-fade-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-white">
                      Most Popular
                    </Badge>
                  )}
                  
                  {plan.badge && (
                    <Badge className="absolute -top-3 right-4 bg-gradient-secondary text-white">
                      {plan.badge}
                    </Badge>
                  )}

                  <div className="text-center mb-6">
                    <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-display text-xl font-bold mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <Badge variant="soft" className="text-sm">
                      {plan.tokens}
                    </Badge>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.buttonVariant}
                    className="w-full"
                    onClick={() => navigate("/designer")}
                  >
                    {plan.buttonText}
                  </Button>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: "400ms" }}>
            <h3 className="font-display text-2xl font-bold mb-4">
              Frequently Asked Questions
            </h3>
            
            <div className="max-w-3xl mx-auto space-y-6 text-left">
              <Card className="p-6 bg-card-soft border-2 border-primary/10">
                <h4 className="font-semibold mb-2">What is a token?</h4>
                <p className="text-muted-foreground">
                  One token equals one keychain design export. You can customize and preview your design as much as you want, but downloading the final 3D file uses one token.
                </p>
              </Card>
              
              <Card className="p-6 bg-card-soft border-2 border-primary/10">
                <h4 className="font-semibold mb-2">Do unused tokens expire?</h4>
                <p className="text-muted-foreground">
                  Purchased tokens never expire. Monthly and yearly subscriptions give you unlimited tokens during your subscription period.
                </p>
              </Card>
              
              <Card className="p-6 bg-card-soft border-2 border-primary/10">
                <h4 className="font-semibold mb-2">Can I cancel my subscription anytime?</h4>
                <p className="text-muted-foreground">
                  Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

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

export default Pricing;
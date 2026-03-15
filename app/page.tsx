import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, Users, Activity, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SafeGuard</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              Advanced Road Safety with <span className="text-primary">SafeGuard</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Intelligent accident detection and emergency alert system that monitors your journey and instantly
              notifies emergency contacts when you need help most.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="text-lg px-8">
                Start Protecting Yourself
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link> 
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How SafeGuard Protects You</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our advanced system uses multiple sensors and AI to detect accidents and automatically alert your
              emergency contacts with precise location data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="p-3 bg-primary rounded-lg w-fit">
                  <Activity className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Real-time Monitoring</CardTitle>
                <CardDescription>
                  Continuous monitoring using accelerometer, gyroscope, and GPS sensors to detect sudden impacts and
                  unusual movement patterns.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="p-3 bg-destructive rounded-lg w-fit">
                  <AlertTriangle className="h-6 w-6 text-destructive-foreground" />
                </div>
                <CardTitle>Instant Alerts</CardTitle>
                <CardDescription>
                  Automatic accident detection with immediate emergency notifications sent to your contacts within
                  seconds of impact detection.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="p-3 bg-success rounded-lg w-fit">
                  <Users className="h-6 w-6 text-success-foreground" />
                </div>
                <CardTitle>Emergency Network</CardTitle>
                <CardDescription>
                  Notify family, friends, and emergency services with your exact location and critical health
                  information automatically.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose SafeGuard?</h2>
            <p className="text-lg text-muted-foreground">Built for reliability when every second counts</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">99.9% Accuracy</h3>
                  <p className="text-muted-foreground">
                    Advanced AI algorithms minimize false positives while ensuring real accidents are detected
                    instantly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Privacy First</h3>
                  <p className="text-muted-foreground">
                    Your location and personal data are only shared during emergencies with your designated contacts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">24/7 Monitoring</h3>
                  <p className="text-muted-foreground">
                    Continuous protection whether you're driving, walking, or cycling - day or night.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Multi-Platform</h3>
                  <p className="text-muted-foreground">
                    Works seamlessly across Android and iOS devices with cloud synchronization.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Emergency Integration</h3>
                  <p className="text-muted-foreground">
                    Direct integration with local emergency services for faster response times.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Family Dashboard</h3>
                  <p className="text-muted-foreground">
                    Let family members monitor your safety status and receive peace-of-mind updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-primary">
        <div className="container max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">Ready to Stay Protected?</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Join thousands of users who trust SafeGuard to keep them safe on the road. Get started in less than 2
              minutes.
            </p>
          </div>

          <Link href="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">SafeGuard</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 SafeGuard. Built for Smart India Hackathon. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

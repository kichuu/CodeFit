"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  GitCompare, 
  GitMerge, 
  LightbulbIcon, 
  SearchCode, 
  Users, 
  Github,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 backdrop-blur-lg bg-black/20">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <span className="text-xl font-bold">CodeFit</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="ghost" className="text-sm">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/30 backdrop-blur-lg">
            <nav className="container flex flex-col px-4 py-4 space-y-4">
              <Link 
                href="#features" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="#testimonials" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link 
                href="#pricing" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 ">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="inline-flex bg-primary text-primary-foreground">AI-Powered Recruiting</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Find the perfect developers from GitHub
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                  Leverage AI to analyze GitHub profiles, match skills to your requirements, and hire the best
                  developers faster than ever before.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild variant="default" size="lg" className="font-medium">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/demo">Request Demo</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/20 via-gray-500/20 to-zinc-700/20 animate-pulse"></div>
                <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center">
                  <div className="p-8 bg-black/40 rounded-xl border border-white/10 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="ml-2 text-xs text-gray-400">CodeFit</div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-6 w-3/4 bg-white/10 rounded"></div>
                      <div className="h-6 w-full bg-white/10 rounded"></div>
                      <div className="h-6 w-5/6 bg-white/10 rounded"></div>
                      <div className="h-6 w-2/3 bg-white/10 rounded"></div>
                      <div className="mt-6 grid grid-cols-2 gap-2">
                        <div className="h-20 bg-white/5 rounded border border-white/10"></div>
                        <div className="h-20 bg-white/5 rounded border border-white/10"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-900/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Trusted by tech teams worldwide</h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join hundreds of companies using CodeFit to find and hire top developer talent.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8 mt-8">
            <Card className="bg-white/10 border-white/20 overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/10 to-transparent"></div>
                <div className="relative">
                  <div className="text-3xl font-bold">1,200+</div>
                  <p className="text-sm text-gray-300">Candidates Analyzed</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-transparent"></div>
                <div className="relative">
                  <div className="text-3xl font-bold">85%</div>
                  <p className="text-sm text-gray-300">Hiring Success Rate</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-600/10 to-transparent"></div>
                <div className="relative">
                  <div className="text-3xl font-bold">14 days</div>
                  <p className="text-sm text-gray-300">Average Time to Hire</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent"></div>
                <div className="relative">
                  <div className="text-3xl font-bold">200+</div>
                  <p className="text-sm text-gray-300">Happy Customers</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful AI-driven features</h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                CodeFit analyzes repositories, contributions, and coding patterns to find the perfect match for
                your team.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card className="bg-white/10 border-white/20 overflow-hidden group hover:bg-white/20 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-zinc-500/20 to-gray-500/20 group-hover:from-zinc-500/30 group-hover:to-gray-500/30 transition-all">
                  <SearchCode className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Profile Analysis</h3>
                <p className="text-gray-300">
                  Our AI analyzes GitHub profiles to evaluate coding skills, project contributions, and development
                  patterns.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 overflow-hidden group hover:bg-white/20 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-500/20 to-zinc-600/20 group-hover:from-gray-500/30 group-hover:to-zinc-600/30 transition-all">
                  <GitCompare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Candidate Comparison</h3>
                <p className="text-gray-300">
                  Compare candidates side-by-side with detailed metrics on skills, activity, and collaboration style.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 overflow-hidden group hover:bg-white/20 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-zinc-600/20 to-gray-700/20 group-hover:from-zinc-600/30 group-hover:to-gray-700/30 transition-all">
                  <LightbulbIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Insights</h3>
                <p className="text-gray-300">
                  Get AI-powered recommendations and insights to make better hiring decisions faster.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 overflow-hidden group hover:bg-white/20 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-700/20 to-zinc-700/20 group-hover:from-gray-700/30 group-hover:to-zinc-700/30 transition-all">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Team Matching</h3>
                <p className="text-gray-300">
                  Find candidates who will complement your existing team's skills and working style.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 overflow-hidden group hover:bg-white/20 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700/20 to-gray-600/20 group-hover:from-zinc-700/30 group-hover:to-gray-600/30 transition-all">
                  <GitMerge className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Contribution Analysis</h3>
                <p className="text-gray-300">
                  Evaluate the quality and consistency of a candidate's open source contributions.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 overflow-hidden group hover:bg-white/20 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-600/20 to-zinc-500/20 group-hover:from-gray-600/30 group-hover:to-zinc-500/30 transition-all">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Hiring Tracking</h3>
                <p className="text-gray-300">
                  Track your hiring pipeline and measure the success of your recruiting efforts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-zinc-900/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How it works</h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find and hire the best developers in just a few simple steps.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/20 via-gray-600/20 to-zinc-700/20"></div>
              <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center">
                <div className="p-8 bg-black/40 rounded-xl border border-white/10 shadow-xl w-4/5">
                  <div className="space-y-4">
                    <div className="h-8 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-gray-500 to-zinc-600 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-24 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                          <SearchCode className="h-6 w-6 text-gray-300" />
                        </div>
                      </div>
                      <div className="h-24 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                          <GitCompare className="h-6 w-6 text-gray-300" />
                        </div>
                      </div>
                    </div>
                    <div className="h-6 w-full bg-white/10 rounded"></div>
                    <div className="h-6 w-5/6 bg-white/10 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-500 to-zinc-600 text-primary-foreground">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Add candidates</h3>
                    <p className="text-gray-300">
                      Simply enter a GitHub username or profile URL to start the analysis process.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-zinc-600 to-gray-700 text-primary-foreground">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">AI analysis</h3>
                    <p className="text-gray-300">
                      Our AI analyzes the candidate's repositories, contributions, and coding patterns.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-700 to-zinc-700 text-primary-foreground">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Review insights</h3>
                    <p className="text-gray-300">
                      Get detailed insights and match scores to help you make informed decisions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-gray-600 text-primary-foreground">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Hire with confidence</h3>
                    <p className="text-gray-300">
                      Contact and hire the best candidates for your team with data-backed confidence.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What our customers say</h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from the teams who've transformed their hiring process with CodeFit.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card className="bg-white/10 border-white/20 overflow-hidden group hover:bg-white/20 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="h-1 w-16 bg-gradient-to-r from-gray-500 to-zinc-600 rounded-full mb-4"></div>
                <p className="italic text-gray-300">
                  "CodeFit has cut our hiring time in half. The AI insights helped us find developers who were
                  a perfect fit for our team."
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-500/30 to-zinc-600/30 flex items-center justify-center">
                    <span className="text-sm font-bold">SJ</span>
                  </div>
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-300">CTO, TechStart Inc.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 overflow-hidden group hover:bg-white/20 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="h-1 w-16 bg-gradient-to-r from-zinc-600 to-gray-700 rounded-full mb-4"></div>
                <p className="italic text-gray-300">
                  "The candidate comparison feature is a game-changer. We can now make data-driven decisions when
                  choosing between qualified candidates."
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-600/30 to-gray-700/30 flex items-center justify-center">
                    <span className="text-sm font-bold">MC</span>
                  </div>
                  <div>
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-sm text-gray-300">Engineering Manager, DataFlow</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 overflow-hidden group hover:bg-white/20 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="h-1 w-16 bg-gradient-to-r from-gray-700 to-zinc-700 rounded-full mb-4"></div>
                <p className="italic text-gray-300">
                  "As a startup, finding developers who can work in our fast-paced environment is crucial. GitHub
                  Recruiter helps us identify self-starters with proven track records."
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700/30 to-zinc-700/30 flex items-center justify-center">
                    <span className="text-sm font-bold">JL</span>
                  </div>
                  <div>
                    <p className="font-medium">Jessica Lee</p>
                    <p className="text-sm text-gray-300">Founder, CodeNova</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
     

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32  text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to transform your hiring process?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start finding the perfect developers for your team today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild variant="secondary" size="lg" className="font-medium">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent">
                <Link href="/demo">Request Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-black/50 border-t border-white/10">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                <span className="text-lg font-bold">CodeFit</span>
              </div>
              <p className="text-sm text-gray-300">
                AI-powered GitHub recruiting and matching platform for tech teams.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/candidates" className="text-gray-300 hover:text-white transition-colors">
                    Candidates
                  </Link>
                </li>
                <li>
                  <Link href="/insights" className="text-gray-300 hover:text-white transition-colors">
                    AI Insights
                  </Link>
                </li>
                <li>
                  <Link href="/compare" className="text-gray-300 hover:text-white transition-colors">
                    Compare
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-gray-300">
            &copy; {new Date().getFullYear()} CodeFit. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
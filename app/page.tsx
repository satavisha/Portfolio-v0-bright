"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Linkedin, Github, ExternalLink, Download, Star } from "lucide-react"
import { useEffect, useState } from "react"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 border-4 border-orange-500 transform -translate-x-16 -translate-y-16 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border-4 border-orange-500 transform rotate-45 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-orange-500 transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 border-4 border-orange-500 transform translate-x-20 translate-y-20 animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-orange-500" />
              <div className="text-2xl font-bold text-gray-900">Satavisha Mitra</div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">
                Home
              </a>
              <a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">
                About
              </a>
              <a
                href="#experience"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                Works
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                Contact
              </a>
              <Button
                variant="outline"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 bg-transparent"
              >
                Let's talk
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isVisible ? "animate-in slide-in-from-left duration-1000" : "opacity-0"}`}>
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">HI, I'M SATAVISHA.</h1>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                  PRODUCT MANAGER{" "}
                  <span className="inline-flex items-center">
                    <Star className="h-8 w-8 text-orange-500 mx-2" />
                  </span>
                  DANCE EDUCATOR
                </h2>
               
              </div>

              {/*
              <div className="flex flex-wrap items-center gap-4 text-lg font-semibold text-gray-900">
                <span>DESIGN</span>
                <Star className="h-4 w-4 text-orange-500" />
                <span>DEVELOPMENT</span>
                <Star className="h-4 w-4 text-orange-500" />
                <span>STRATEGY</span>
              </div>
              */}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  Download Resume
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 bg-transparent"
                >
                  Let's talk.
                </Button>
              </div>
            </div>

            <div
              className={`relative ${isVisible ? "animate-in slide-in-from-right duration-1000 delay-300" : "opacity-0"}`}
            >
              <div className="relative">
                {/* Geometric shapes behind image */}
                <div className="absolute inset-0 transform translate-x-8 translate-y-8">
                  <div className="w-full h-full border-4 border-orange-500"></div>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 border-4 border-orange-500 transform translate-x-12 -translate-y-12"></div>

                <Image
                  src="/images/profile.jpeg"
                  alt="Satavisha Mitra"
                  width={500}
                  height={600}
                  className="relative rounded-lg object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Skills Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-900 text-white py-4 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center space-x-8 text-sm font-semibold">
            <span>IDEATE</span>
            <Star className="h-4 w-4 text-orange-500" />
            <span>DESIGN THINKING</span>
            <Star className="h-4 w-4 text-orange-500" />
            <span>EMPATHY DRIVEN</span>
            <Star className="h-4 w-4 text-orange-500" />
            <span>STRATEGY</span>
            <Star className="h-4 w-4 text-orange-500" />
            <span>PRODUCT ROADMAP</span>
            <Star className="h-4 w-4 text-orange-500" />
            <span>STAKEHOLDER MANAGEMENT</span>
            <Star className="h-4 w-4 text-orange-500" />
            <span>ART DIRECTION</span>
            <Star className="h-4 w-4 text-orange-500" />
            <span>DESIGN</span>
            <Star className="h-4 w-4 text-orange-500" />
            <span>BRANDING</span>
            <Star className="h-4 w-4 text-orange-500" />
            <span>DEVELOPMENT</span>
            <Star className="h-4 w-4 text-orange-500" />
            <span>DANCE</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900">SATAVISHA</h2>
                <Star className="h-8 w-8 text-orange-500" />
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900">MITRA</h2>
              </div>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  I am a developer turned Product Manager, a Tribal Fusion Belly Dancer and a mythology nerd!
                </p> <p>
Raised in a culturally rich home with an Indian Classical singer mother, I was immersed in the arts early—dabbling in everything from painting to piano—but it was dance that truly moved me.
                </p><p>
Since discovering Tribal Fusion in 2016, my journey has taken me across India and beyond—learning, performing, and teaching. TFBD feels like a magical forest I’m still at the periphery! There’s a lot to explore, a lot to learn! 
                </p><p>
Outside dance, I’m a mythology nerd, a huge fan of Devdutt Pattanaik’s work , and I like to illustrate stories.
                </p>
                
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                >
                  Innovation
                </Badge>
                <Badge
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                >
                  Leadership
                </Badge>
                <Badge
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                >
                  Problem Solving
                </Badge>
                <Badge
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                >
                  Team Collaboration
                </Badge>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900">
                Various versions have evolved over the years, sometimes by accident, sometimes on purpose.
              </h3>

              <div className="space-y-6 text-gray-700">
                <p>
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                  alteration in some form, by injected humour, or randomised words which don't look even slightly
                  believable.
                </p>
                <p>
                  If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text.
                </p>
              </div>

              <Button
                className="bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">FEATURED WORKS</h2>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px bg-orange-500 w-16"></div>
              <Star className="h-6 w-6 text-orange-500" />
              <div className="h-px bg-orange-500 w-16"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card
                key={item}
                className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="h-5 w-5 text-orange-500" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Project {item}</CardTitle>
                  <CardDescription className="text-gray-600">
                    A comprehensive solution that addresses key challenges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      Design
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      Development
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">LET'S CONNECT</h2>

          <div className="flex items-center justify-center space-x-4 mb-12">
            <div className="h-px bg-orange-500 w-16"></div>
            <Star className="h-6 w-6 text-orange-500" />
            <div className="h-px bg-orange-500 w-16"></div>
          </div>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            I'm always interested in new opportunities and meaningful conversations. Feel free to reach out!
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group">
              <div className="bg-orange-50 p-6 rounded-lg mb-4 group-hover:bg-orange-100 transition-colors duration-300">
                <Mail className="h-8 w-8 text-orange-500 mx-auto" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">satavisha@example.com</p>
            </div>

            <div className="group">
              <div className="bg-orange-50 p-6 rounded-lg mb-4 group-hover:bg-orange-100 transition-colors duration-300">
                <Linkedin className="h-8 w-8 text-orange-500 mx-auto" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">LinkedIn</h3>
              <p className="text-gray-600">linkedin.com/in/satavisha</p>
            </div>

            <div className="group">
              <div className="bg-orange-50 p-6 rounded-lg mb-4 group-hover:bg-orange-100 transition-colors duration-300">
                <Github className="h-8 w-8 text-orange-500 mx-auto" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">GitHub</h3>
              <p className="text-gray-600">github.com/satavisha</p>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            <Mail className="mr-2 h-4 w-4" />
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="h-5 w-5 text-orange-500" />
            <p className="text-gray-300">© 2024 Satavisha Mitra. All rights reserved.</p>
            <Star className="h-5 w-5 text-orange-500" />
          </div>
        </div>
      </footer>
    </div>
  )
}

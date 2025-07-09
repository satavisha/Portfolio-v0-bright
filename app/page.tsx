"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin, Github, ExternalLink, Star } from "lucide-react"
import { useEffect, useState } from "react"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])
  const projects = [
    {
      title: "OTT For Bharat",
      description: "An OTT platform for infotainment in regional languages",
      link: "https://satavisha.notion.site/Lok-Learn-an-OTT-for-Bharat-20c0d6f642c280db872bfa0a675ff0f8",
      image:
        "https://satavisha.notion.site/image/attachment%3Abaf198dc-30fb-4cc8-b836-04923e9300ed%3Alok_learn_logo_2.png?table=block&id=20c0d6f6-42c2-80db-872b-fa0a675ff0f8&spaceId=0e6cc760-0940-49ad-848e-a29f97c99963&width=2000&userId=&cache=v2",
    },
    {
      title: "DeCrypt : an AI powered tool for Crypto traders",
      description:
        "Blockchain-based platform utilizing a Generative Engine and Retrieval Augmented System to curate insights for users",
      link: "https://satavisha.notion.site/DeCrypt-an-AI-powered-tool-for-Crypto-traders-20c0d6f642c2800094e6c803c5060f39",
      image:
        "https://images.unsplash.com/photo-1631603090989-93f9ef6f9d80?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    },
    {
      title: "KPHealth - a Health app for Kaiser Permanente",
      description: "Gamified health and wellness app",
      link: "https://satavisha.notion.site/KPHealth-a-Health-app-for-Kaiser-Permanente-e93e6093cc1c478b90607728e8c18943",
      image:
        "https://satavisha.notion.site/image/attachment%3A0129c1ee-f4a1-478d-9156-55b16c78e60f%3Ab966c999-656a-47be-a326-dfa942290b0f.png?table=block&id=e93e6093-cc1c-478b-9060-7728e8c18943&spaceId=0e6cc760-0940-49ad-848e-a29f97c99963&width=2000&userId=&cache=v2",
    },
    
  ]
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
              <a
                href="#about"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium scroll-smooth"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                About
              </a>
              <a
                href="#projects"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
                onClick={(e) => {
    e.preventDefault()
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }}
              >
                Projects
              </a>
              <a href="#blogs" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
              onClick={(e) => {
    e.preventDefault()
    document.getElementById("blogs")?.scrollIntoView({ behavior: "smooth" })
  }}
  >
                Blogs
              </a>
              <a href="#dance" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
              onClick={(e) => {
    e.preventDefault()
    document.getElementById("dance")?.scrollIntoView({ behavior: "smooth" })
  }}
              >
                Dance
              </a>
              {/* <Button
                variant="outline"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 bg-transparent"
              >
                Let's talk
              </Button> */}
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

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <a href="/resume.pdf" download="Satavisha_Mitra_Resume.pdf">
                    Download Resume
                  </a>
                </Button>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 bg-transparent"
                >
                  Let's talk.
                </Button>
                */}
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
       {/* <div className="absolute bottom-0 left-0 right-0 bg-gray-900 text-white py-4 overflow-hidden">
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
      */}

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
                <p>I am a developer turned Product Manager, a Tribal Fusion Belly Dancer and a mythology nerd!</p>{" "}
                <p>
                  Raised in a culturally rich home with an Indian Classical singer mother, I was immersed in the arts
                  early—dabbling in everything from painting to piano—but it was dance that truly moved me.
                </p>
                <p>
                  Since discovering Tribal Fusion in 2016, my journey has taken me across India and beyond—learning,
                  performing, and teaching. TFBD feels like a magical forest I’m still at the periphery! There’s a lot
                  to explore, a lot to learn!
                </p>
                <p>
                  Outside dance, I’m a mythology nerd, a huge fan of Devdutt Pattanaik’s work , and I like to illustrate
                  stories.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {/*  <Badge
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
                </Badge> */}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900">Let's connect</h3>

              <div className="space-y-6 text-gray-700">
                <p></p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/satavisha-mitra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-center"
                  >
                    <div className="bg-orange-50 p-6 rounded-lg mb-4 group-hover:bg-orange-100 transition-colors duration-300">
                      <Linkedin className="h-8 w-8 text-orange-500 mx-auto" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">LinkedIn</h3>
                    <p className="text-gray-600 text-sm">linkedin.com/satavisha-mitra</p>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/satavisha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-center"
                  >
                    <div className="bg-orange-50 p-6 rounded-lg mb-4 group-hover:bg-orange-100 transition-colors duration-300">
                      <Github className="h-8 w-8 text-orange-500 mx-auto" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">GitHub</h3>
                    <p className="text-gray-600 text-sm">github.com/satavisha</p>
                  </a>

                  {/* Twitter / X */}
                  <a
                    href="https://x.com/satavishaMitra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-center"
                  >
                    <div className="bg-orange-50 p-6 rounded-lg mb-4 group-hover:bg-orange-100 transition-colors duration-300">
                      {/* X logo from SVG */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-500 mx-auto"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.293 3H17.41L12 9.177 6.59 3H3.707l7.063 7.763L2.293 21h2.884l6.09-6.7 6.09 6.7h2.884l-8.477-9.788L20.293 3z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">X (Twitter)</h3>
                    <p className="text-gray-600 text-sm">x.com/satavishaMitra</p>
                  </a>
                </div>
              </div>

              {/*<Button
                className="bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">PROJECTS</h2>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px bg-orange-500 w-16"></div>
              <Star className="h-6 w-6 text-orange-500" />
              <div className="h-px bg-orange-500 w-16"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200"></div>
                    )}
                    <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="h-5 w-5 text-orange-500" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">{project.title}</CardTitle>
                    <CardDescription className="text-gray-600">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        Product Management
                      </Badge>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        Development
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">BLOGS</h2>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px bg-orange-500 w-16"></div>
              <Star className="h-6 w-6 text-orange-500" />
              <div className="h-px bg-orange-500 w-16"></div>
            </div>
          </div>

          <ol className="list-decimal list-inside space-y-2 text-lg text-gray-900 font-medium">
          <li>
              <a
                href="https://satavisha.notion.site/Navigating-the-Product-Maze-A-Guide-to-Being-an-Outstanding-Product-Manager-5b0eea81c36b425797c9da317c927b13"
                className="hover:text-orange-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Feature enhancement| Qikfox
              </a>
            </li>
            <li>
              <a
                href="https://satavisha.notion.site/Product-Management-Parentry-app-Challenge-CoinedOne-7189c474fa8e4e1798d8edd51db111e2"
                className="hover:text-orange-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Parentry.com feature enhancement | CoinedOne
              </a>
            </li>
            <li>
              <a
                href="https://satavisha.notion.site/Navigating-the-Product-Maze-A-Guide-to-Being-an-Outstanding-PM"
                className="hover:text-orange-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Favorite product breakdown
              </a>
            </li>
            
            <li>
              <a
                href="https://satavisha.notion.site/Porter-s-5-for-Crypto-industry-84a59bcba0324b3f8ae135733a5b9f52"
                className="hover:text-orange-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                🏭 Porter's 5 for Crypto industry
              </a>
            </li>
          </ol>
        </div>
      </section>
      {/* Dance Section */}
      <section id="dance" className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-smooth">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">DANCE</h2>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px bg-orange-500 w-16"></div>
              <Star className="h-6 w-6 text-orange-500" />
              <div className="h-px bg-orange-500 w-16"></div>
            </div>
          </div>

          {/* Scrollable Card Container */}
          <div className="overflow-x-auto">
            <div className="flex space-x-6 min-w-full pb-4 snap-x snap-mandatory scroll-smooth">
              {[
                {
                  title: "Performed with the legendary Olga Meos, at Tribal Kazaksthan 2025",
                  text: "The Priviledge of collaborating with legends of TFBD at Asia's biggest Tribal Festival",
                  link: "https://satavisha.notion.site/Performed-with-the-legendary-Olga-Meos-at-Tribal-Kazaksthan-2025-20c0d6f642c280369d8cc128e4ec71d9",
                  image:
                    "https://satavisha.notion.site/image/attachment%3A1339f8be-c3b3-4d61-a811-ff0f73f2f0fc%3Ame_2.png?table=block&id=20c0d6f6-42c2-8091-aeba-f80d4e4dc7ba&spaceId=0e6cc760-0940-49ad-848e-a29f97c99963&width=580&userId=&cache=v2",
                },
                {
                  title: "An ode to Resilience",
                  text: "Storytelling through movement language",
                  link: "https://satavisha.notion.site/Performed-at-NrityaKosh-Bengaluru-2070d6f642c2808eaba1ce3b91a3fcd1",
                  image:
                    "https://satavisha.notion.site/image/attachment%3A462348af-bf63-4356-8e43-3355c9c0b324%3AGOT.jpg?table=block&id=2070d6f6-42c2-80c9-80bd-f8e267db337d&spaceId=0e6cc760-0940-49ad-848e-a29f97c99963&width=1420&userId=&cache=v2",
                },
                {
                  title: "Tribal Revival 2025",
                  text: "Building community and learning at Tribal Revival 2025",
                  link: "https://satavisha.notion.site/Performed-and-collaborated-at-Tribal-Revival-Bengaluru-2025-20c0d6f642c280b180c1c915da2b0f60",
                  image:
                    "https://satavisha.notion.site/image/attachment%3A5c847001-8b6f-43c3-af8b-2476744ab62c%3Acerti.jpeg?table=block&id=20c0d6f6-42c2-8051-ba7b-d12665cfced0&spaceId=0e6cc760-0940-49ad-848e-a29f97c99963&width=1420&userId=&cache=v2",
                },
                {
                  title: "Movement Meditation",
                  text: "A meditation app for people who like to move",
                  link: "https://satavisha.notion.site/Dance-Meditation-20c0d6f642c28009869fff538aff9080?pvs=74",
                  image:
                    "https://satavisha.notion.site/image/https%3A%2F%2Fthemindsjournal.com%2Fwp-content%2Fuploads%2F2024%2F09%2FSufi-Whirling-Meditation-Cosmic-Dance-Journey-1.jpg?table=block&id=20c0d6f6-42c2-8009-869f-ff538aff9080&spaceId=0e6cc760-0940-49ad-848e-a29f97c99963&width=2000&userId=&cache=v2",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="min-w-[300px] md:min-w-[500px] bg-gray-50 rounded-lg shadow-lg flex snap-center overflow-hidden"
                >
                  <div className="flex flex-col justify-between p-6 w-2/3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 mb-4">{item.text}</p>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline font-semibold"
                    >
                      Read full blog →
                    </a>
                  </div>
                  <div className="w-1/3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="h-5 w-5 text-orange-500" />
            <p className="text-gray-300">Thanks for viewing my portfolio!</p>
            <Star className="h-5 w-5 text-orange-500" />
          </div>
        </div>
      </footer>
    </div>
  )
}

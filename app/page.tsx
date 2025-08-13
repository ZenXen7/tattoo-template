"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Clock, Phone, Instagram, Facebook, Twitter, Menu, X, ArrowRight, Play } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion"
import { useState, useRef, useEffect } from "react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const heroRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)

  const servicesRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    setIsMenuOpen(false)
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: portfolioRef, id: "portfolio" },
        { ref: servicesRef, id: "services" },
        { ref: contactRef, id: "contact" },
      ]

      const currentSection = sections.find((section) => {
        if (!section.ref.current) return false
        const rect = section.ref.current.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      setActiveSection(currentSection?.id || "")
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="fixed top-0 w-full z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/50"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent font-gothic"
          >
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {[
              { name: "Portfolio", ref: portfolioRef },
              { name: "Services", ref: servicesRef },
              { name: "Contact", ref: contactRef },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <button
                  onClick={() => scrollToSection(item.ref)}
                  className={`hover:text-red-400 transition-colors relative group ${
                    activeSection === item.name.toLowerCase() ? "text-red-400" : ""
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 ${
                      activeSection === item.name.toLowerCase() ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </button>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-red-500/25 transition-all duration-300">
                Book Now
              </Button>
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800"
            >
              <div className="container mx-auto px-6 py-4 space-y-4">
                {[
                  { name: "Portfolio", ref: portfolioRef },
                  { name: "Services", ref: servicesRef },
                  { name: "Contact", ref: contactRef },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.ref)}
                    className={`block w-full text-left hover:text-red-400 transition-colors ${
                      activeSection === item.name.toLowerCase() ? "text-red-400" : ""
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black"
        />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-20 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute bottom-20 right-10 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-8">
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl lg:text-9xl tracking-tight mb-6 font-black font-gothic">
              <motion.span
                className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                BURN
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent -mt-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                SLOW STUDIOS
              </motion.span>
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8"
              whileInView={{ scaleX: [0, 1] }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
            />

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Professional Tattoos & Works of Art
              <motion.span className="block mt-4 text-red-400" whileHover={{ color: "#f97316" }}>
                Your vision, our masterpiece.
              </motion.span>
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div variants={fadeInUp}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-red-500/25 transition-all duration-300 group"
              >
                <motion.span whileHover={{ x: 5 }} className="flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-black px-12 py-4 text-lg font-semibold rounded-full backdrop-blur-sm bg-transparent group"
              >
                <motion.span whileHover={{ x: 5 }} className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Explore Gallery
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-gradient-to-r from-zinc-900 to-zinc-800 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "500+", label: "Happy Clients" },
              { number: "8", label: "Expert Artists" },
              { number: "5", label: "Years Experience" },
              { number: "100%", label: "Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="space-y-2 p-6 rounded-2xl bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 hover:border-red-500/30 transition-all duration-300"
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
                  whileInView={{ scale: [0.5, 1.2, 1] }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Work */}
      <section ref={portfolioRef} className="py-32 bg-zinc-950 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]" />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl mb-6 font-black font-gothic">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Featured</span>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> Work</span>
            </h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8"
              whileInView={{ scaleX: [0, 1] }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            />
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover our most celebrated pieces - each one a testament to artistic excellence and creative vision
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { id: 1, image: "/burn-slow-1.jpg", title: "Traditional", artist: "Burn Slow Studios" },
              { id: 2, image: "/burn-slow-2.jpg", title: "Japanese", artist: "Burn Slow Studios" },
              { id: 3, image: "/burn-slow-3.jpg", title: "Black & Grey", artist: "Burn Slow Studios" },
              { id: 4, image: "/burn-slow-4.jpg", title: "Neo Traditional", artist: "Burn Slow Studios" },
              { id: 5, image: "/burn-slow-5.jpg", title: "Color Work", artist: "Burn Slow Studios" },
              { id: 6, image: "/burn-slow-6.jpg", title: "Custom Design", artist: "Burn Slow Studios" },
            ].map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl bg-zinc-900 hover:bg-zinc-800 transition-all duration-500 shadow-2xl hover:shadow-red-500/10"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={`Featured Tattoo - ${item.title}`}
                    width={480}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                  />

                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* Testimonials */}
      <section className="py-32 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 font-gothic">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Client</span>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> Love</span>
            </h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"
              whileInView={{ scaleX: [0, 1] }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Sarah Johnson",
                text: "Absolutely incredible work! The attention to detail was phenomenal and the experience was amazing.",
                rating: 5,
              },
              {
                name: "Mike Davis",
                text: "Professional, clean, and the final result exceeded my expectations. Will definitely be back!",
                rating: 5,
              },
              {
                name: "Emma Wilson",
                text: "The best tattoo experience I've ever had. Highly recommend to anyone looking for quality work!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 transition-all duration-300 backdrop-blur-sm hover:border-red-500/30 h-full">
                  <CardContent className="p-8">
                    <div className="flex space-x-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-8 italic text-lg leading-relaxed">&quot;{testimonial.text}&quot;</p>
                    <p className="text-white font-semibold text-lg">- {testimonial.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-32 bg-zinc-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 font-gothic">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Our</span>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                {" "}
                Services
              </span>
            </h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"
              whileInView={{ scaleX: [0, 1] }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { title: "Custom Tattoos", description: "Unique designs tailored to your vision" },
              { title: "Cover-ups", description: "Transform old tattoos into new masterpieces" },
              { title: "Touch-ups", description: "Refresh and restore your existing tattoos" },
              { title: "Consultations", description: "Professional advice and design planning" },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-red-500/30 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Contact/Location */}
      <section ref={contactRef} className="py-32 bg-gradient-to-r from-zinc-900 to-zinc-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.1)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black mb-12 font-gothic">
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Visit</span>
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {" "}
                  Our Studio
                </span>
              </h2>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                {[
                  { icon: MapPin, text: "24 E. King St., Littlestown, Pennsylvania 17340" },
                  { icon: Clock, text: "Mon-Sat: 10AM-8PM | Sun: 12PM-6PM" },
                  { icon: Phone, text: "443-744-2441" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-6 p-4 rounded-2xl bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 hover:border-red-500/30 transition-all duration-300"
                  >
                    <item.icon className="w-8 h-8 text-red-500 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-12 flex flex-col sm:flex-row gap-6"
              >
                <motion.div variants={fadeInUp}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-red-500/25 transition-all duration-300"
                  >
                    Book Consultation
                  </Button>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold rounded-full bg-transparent backdrop-blur-sm"
                  >
                    Get Directions
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-zinc-700/50"
              >
                <Image
                  src="/studio.jpg"
                  alt="Burn Slow Studios Artwork"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating elements around the image */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-xl opacity-60"
              />
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-40"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-black py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-black" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-12"
          >
            <motion.div variants={fadeInUp} className="col-span-1 md:col-span-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-6 font-gothic"
              >
                Burn Slow Studios
              </motion.div>
              <p className="text-gray-400 mb-8 max-w-md text-lg leading-relaxed">
                Premium tattoo artistry where your vision becomes reality. Creating lasting memories, one tattoo at a
                time.
              </p>
              <div className="flex space-x-6">
                <Link href="https://www.instagram.com/burn.slow.studios/?hl=en" target="_blank" rel="noopener noreferrer">
                  <motion.div whileHover={{ scale: 1.2, y: -5 }} whileTap={{ scale: 0.9 }}>
                    <Instagram className="w-8 h-8 text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-300" />
                  </motion.div>
                </Link>
                <motion.div whileHover={{ scale: 1.2, y: -5 }} whileTap={{ scale: 0.9 }}>
                  <Facebook className="w-8 h-8 text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-300" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, y: -5 }} whileTap={{ scale: 0.9 }}>
                  <Twitter className="w-8 h-8 text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-300" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-white font-semibold mb-6 text-xl">Quick Links</h3>
              <ul className="space-y-4 text-gray-400">
                {["Portfolio", "Services", "Aftercare"].map((item, index) => (
                  <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link href="#" className="hover:text-red-400 transition-colors duration-300 text-lg">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-white font-semibold mb-6 text-xl">Services</h3>
              <ul className="space-y-4 text-gray-400 text-lg">
                {["Custom Tattoos", "Cover-ups", "Touch-ups", "Consultations"].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border-t border-zinc-800 mt-16 pt-8 text-center text-gray-500"
          >
            <p className="text-lg">&copy; {new Date().getFullYear()} Burn Slow Studios. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}

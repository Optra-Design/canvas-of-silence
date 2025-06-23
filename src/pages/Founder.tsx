import React from 'react';
import Navigation from '../components/Navigation';
import { MapPin, Coffee, Heart, Code, Palette, Lightbulb, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Founder = () => {
  const journey = [
    {
      year: "2021",
      title: "The Beginning",
      description: "Started freelancing while studying, discovering the power of design to transform businesses."
    },
    {
      year: "2022",
      title: "First Major Client",
      description: "Landed first significant rebrand project, proving that premium design drives real results."
    },
    {
      year: "2023",
      title: "Studio Formation",
      description: "Officially founded Optra Design, establishing systems for consistent excellence."
    },
    {
      year: "2024",
      title: "Scaling Impact",
      description: "Expanded service offerings and built a network of satisfied clients across industries."
    }
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passion-Driven",
      description: "Every project fueled by genuine excitement for exceptional design."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation-Focused",
      description: "Constantly exploring new techniques and pushing creative boundaries."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Detail-Oriented",
      description: "Obsessing over pixels because perfection lives in the details."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
              The Founder
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Meet the creative mind behind Optra Design - a passionate designer 
              committed to crafting exceptional experiences that matter.
            </p>
          </div>

          {/* Profile */}
          <div className="glass p-8 rounded-3xl mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gradient mb-4">Hey, I'm Aniketh!</h2>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  I'm a solo founder based in the vibrant tech hub of Bangalore, 
                  where innovation meets tradition. My journey into design started 
                  with a simple belief: exceptional design has the power to transform 
                  businesses and create meaningful connections.
                </p>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  What drives me is the intersection of creativity and strategy - 
                  creating designs that don't just look beautiful, but solve real 
                  problems and drive tangible results for my clients.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-foreground/70">
                    <MapPin className="w-4 h-4" />
                    <span>Bangalore, India</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/70">
                    <Coffee className="w-4 h-4" />
                    <span>Coffee enthusiast</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/70">
                    <Palette className="w-4 h-4" />
                    <span>Design perfectionist</span>
                  </div>
                </div>

                {/* Chat Button */}
                <Link 
                  to="/chat"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 glow-hover"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat with me directly
                </Link>
              </div>
              
              <div className="relative">
                <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-orange-500 to-pink-500">
                  <img 
                    src="/lovable-uploads/6ebba5e7-727d-45be-b294-9711dfac2862.png"
                    alt="Aniketh Shet - Founder of Optra Design"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-foreground/60 text-center mt-3 italic">
                  "Proof that great design vision starts early - though the execution has definitely improved since then! 😄"
                </p>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce-subtle">
                  ✨
                </div>
              </div>
            </div>
          </div>

          {/* Journey */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-8 text-center">
              The Journey
            </h2>
            
            <div className="space-y-8">
              {journey.map((milestone, index) => (
                <div 
                  key={index}
                  className="flex gap-6 items-start glass p-6 rounded-2xl animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-optra-gradient rounded-full flex items-center justify-center text-white font-bold">
                    {milestone.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gradient mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-8 text-center">
              Core Values
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="glass p-6 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-gradient mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gradient mb-2">
                    {value.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div className="glass p-8 rounded-3xl mb-16">
            <h2 className="text-3xl font-bold text-gradient mb-6 text-center">
              Design Philosophy
            </h2>
            
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="text-xl text-foreground/80 italic leading-relaxed mb-6">
                "Great design isn't just about making things look beautiful - 
                it's about creating experiences that resonate, solutions that work, 
                and connections that last. Every pixel should have a purpose, 
                every interaction should feel intentional."
              </blockquote>
              <cite className="text-gradient font-semibold">— Aniketh Shet, Founder of Optra</cite>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center glass p-12 rounded-3xl">
            <h2 className="text-4xl font-bold text-gradient mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              I'm always excited to discuss new projects, share design insights, 
              or simply connect with fellow creatives and entrepreneurs.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:aniketh@optra.me"
                className="group flex items-center gap-2 px-8 py-4 bg-optra-gradient text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 glow-hover"
              >
                Say Hello
                <Heart className="w-5 h-5 group-hover:animate-pulse" />
              </a>
              
              <div className="text-sm text-foreground/50">
                I'll get back to you within 48 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founder;

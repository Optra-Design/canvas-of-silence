
import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import AnimatedHeroText from '../components/AnimatedHeroText';
import SecretSudoButton from '../components/SecretSudoButton';
import { ArrowRight, Eye, Code2, Layers, Award, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    // SEO meta tags
    document.title = 'Optra Design - Premium Design Studio by Aniketh | Brand Identity & Digital Experiences';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Optra Design is a premium design studio founded by Aniketh in Bangalore. We create distinctive brand identities, interactive digital experiences, and strategic creative direction that elevates your business.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Optra Design is a premium design studio founded by Aniketh in Bangalore. We create distinctive brand identities, interactive digital experiences, and strategic creative direction that elevates your business.';
      document.head.appendChild(meta);
    }

    // Keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'premium design studio, brand identity, luxury branding, UI UX design, digital experiences, creative direction, Bangalore designer, Aniketh, Optra Design, elite web design, premium graphic design';
      document.head.appendChild(meta);
    }

    console.log(`
    🎨 Welcome to Optra Design's console!
    
    ╔═══════════════════════════════════════╗
    ║           OPTRA DESIGN               ║
    ║      Premium Creative Studio         ║
    ║         Founded by Aniketh           ║
    ╚═══════════════════════════════════════╝
    
    Try typing:
    - optra.contact() for direct contact
    - optra.portfolio() for our work
    
    Crafted with precision by Aniketh in Bangalore
    `);

    (window as any).optra = {
      contact: () => {
        window.location.href = 'mailto:aniketh@optra.me';
        console.log('📧 Connecting you with Aniketh...');
      },
      portfolio: () => {
        window.location.href = '/services';
        console.log('🎨 Viewing our premium work...');
      }
    };
  }, []);

  const capabilities = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Premium Brand Identity",
      description: "Distinctive visual systems that command attention and drive market leadership through strategic design excellence.",
      highlight: "Award-winning approach"
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Elite Digital Experiences",
      description: "Sophisticated interfaces that convert visitors into loyal customers through intuitive, conversion-focused design.",
      highlight: "300% higher engagement"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Strategic Creative Direction",
      description: "Data-driven creative leadership that transforms brands into market leaders with measurable business impact.",
      highlight: "Proven ROI results"
    }
  ];

  const achievements = [
    { icon: <Award className="w-5 h-5" />, text: "250% Brand Recognition Increase" },
    { icon: <Users className="w-5 h-5" />, text: "50+ Premium Brands Transformed" },
    { icon: <Zap className="w-5 h-5" />, text: "48-Hour Response Guarantee" }
  ];

  return (
    <div className="min-h-screen relative bg-zinc-950 overflow-hidden">
      <Navigation />
      <SecretSudoButton />
      
      {/* Optimized Background Elements - Reduced for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Simplified animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* Minimal grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,107,53,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(233,30,99,0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedHeroText />
          
          {/* Premium badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-12 mb-16">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <div className="text-orange-400">{achievement.icon}</div>
                <span className="text-sm text-white/80">{achievement.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Accent element */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-12 bg-gradient-to-b from-orange-400/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-gradient-to-r from-orange-400/60 to-transparent" />
              <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">Capabilities</span>
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-orange-400/60" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight mb-4 max-w-3xl mx-auto">
              Premium solutions that transform visions into 
              <span className="font-medium italic text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400"> market-leading realities</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                className="group bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 hover:border-orange-400/30 transition-all duration-300 hover:bg-zinc-900/70 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      {capability.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-orange-200 transition-colors">
                        {capability.title}
                      </h3>
                    </div>
                    <p className="text-zinc-400 leading-relaxed text-sm mb-3">
                      {capability.description}
                    </p>
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
                      <span className="text-xs text-orange-400 font-medium">{capability.highlight}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gradient-to-r from-pink-500/60 to-transparent" />
                <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">Featured Work</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-white leading-tight mb-6">
                Transformative projects that demonstrate our commitment to 
                <span className="font-medium italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"> exceptional excellence</span>
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Shriniketana Educational Institution</h4>
                    <p className="text-zinc-400 text-sm">Complete brand transformation and digital presence overhaul resulting in 300% increased enrollment inquiries</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{animationDelay: '1s'}} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Luxury Hospitality Brand</h4>
                    <p className="text-zinc-400 text-sm">Premium brand identity and digital experience design that elevated market positioning by 250%</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{animationDelay: '2s'}} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Tech Startup Rebranding</h4>
                    <p className="text-zinc-400 text-sm">Strategic visual identity overhaul that secured $2M Series A funding within 6 months</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-3xl overflow-hidden relative hover:border-orange-500/30 transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-pink-500/5 to-purple-500/10 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">Premium Portfolio</h3>
                    <p className="text-zinc-400 text-sm">View our complete collection of transformative work</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 relative border-t border-zinc-900/50 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
            <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">Get Started</span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-light text-white leading-tight mb-6">
            Ready to transform your brand into a market leader?
          </h2>
          <p className="text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the elite brands that trust Optra Design to deliver exceptional results. Let's discuss how we can elevate your vision into a commanding market presence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link 
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 hover:from-orange-600 hover:to-pink-600 hover:scale-105 hover:shadow-2xl"
            >
              Start Your Transformation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <Link 
              to="/services"
              className="inline-flex items-center gap-3 px-8 py-4 border border-zinc-700 text-zinc-300 font-semibold rounded-xl transition-all duration-300 hover:border-orange-500/50 hover:text-white hover:scale-105 hover:bg-zinc-900/50"
            >
              View Premium Services
            </Link>
          </div>

          <div className="pt-8 border-t border-zinc-900/50">
            <p className="text-sm text-zinc-500 mb-2">
              <span className="text-orange-400 font-medium">Aniketh Shet</span> • Premium Design Studio • Bangalore
            </p>
            <p className="text-xs text-zinc-600">
              Personal response within 24 hours • Complimentary consultation included
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

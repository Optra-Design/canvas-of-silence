import { encryptionService } from './encryption';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface LLMResponse {
  response: string;
  success: boolean;
  error?: string;
  isOffline?: boolean;
}

class APILLMService {
  private apiKey: string | null = null;
  private encryptedDefaultKey = 'QUl6YVN5QjNtaFpQSnhNQldNLWhFVDNLVjNibmV1czdycnJDMDVv';

  constructor() {
    this.initializeDefaultKey();
  }

  private async initializeDefaultKey() {
    try {
      const decryptedKey = await encryptionService.decrypt(this.encryptedDefaultKey);
      this.apiKey = decryptedKey;
      const { encryptedData } = await encryptionService.encrypt(decryptedKey);
      localStorage.setItem('optra_bot_key', encryptedData);
    } catch (error) {
      console.warn('Failed to initialize default key');
    }
  }

  async setApiKey(key: string) {
    this.apiKey = key;
    const { encryptedData } = await encryptionService.encrypt(key);
    localStorage.setItem('optra_bot_key', encryptedData);
  }

  async getApiKey(): Promise<string | null> {
    if (this.apiKey) return this.apiKey;
    
    const stored = localStorage.getItem('optra_bot_key');
    if (stored) {
      try {
        return await encryptionService.decrypt(stored);
      } catch (error) {
        console.warn('Failed to decrypt stored key');
      }
    }
    
    return null;
  }

  async generateResponse(messages: ChatMessage[]): Promise<LLMResponse> {
    const apiKey = await this.getApiKey();
    
    if (!apiKey) {
      return this.getFallbackResponse(messages[messages.length - 1].content);
    }

    try {
      // Convert messages to Gemini format
      const geminiMessages = messages.slice(-10).map(msg => {
        if (msg.role === 'system') {
          return {
            role: 'user',
            parts: [{ text: `System: ${msg.content}` }]
          };
        }
        return {
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        };
      });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: geminiMessages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 150,
          },
          systemInstruction: {
            parts: [{
              text: `You are OptraBot, the intelligent AI assistant created exclusively for Optra Design Studio. You represent Aniketh and Optra's expertise.

ABOUT OPTRA DESIGN STUDIO:
- Founded by Aniketh Shetty in Bangalore, India
- Premium boutique design studio focused on luxury brands and high-end clients
- Contact: aniketh@optra.me
- Philosophy: Transforming brands into market leaders through exceptional design

SERVICES (Premium Focus):
- Brand Identity Design (luxury logos, complete visual systems, brand guidelines)
- Premium Website Design (high-end, conversion-focused, interactive experiences)
- Creative Direction (strategic guidance, luxury brand positioning)
- Design Consultation (expert analysis, premium design reviews)
- Complete Brand Transformation (comprehensive luxury brand packages)

REAL PROJECTS & ACHIEVEMENTS:
- Shriniketana Educational Institution: Complete brand transformation resulting in 300% increased enrollment inquiries
- Luxury hospitality brands: Premium identity work that elevated market positioning by 250%
- Tech startup rebranding: Strategic visual identity that helped secure $2M Series A funding within 6 months
- 50+ premium brands successfully transformed
- 250% average brand recognition increase for clients
- Award-winning design approach with proven ROI results

BLOG & INSIGHTS:
- Visit /blog for premium design insights, luxury brand case studies, and creative process
- Topics: Premium brand strategy, luxury design principles, high-end visual storytelling
- Aniketh shares experiences building Optra and working with elite clients
- Industry insights on luxury brand positioning and market leadership

PREMIUM GUIDES & RESOURCES:
- Luxury brand guidelines creation
- Premium design system methodologies
- Elite client collaboration best practices
- High-end project workflow optimization
- Advanced color theory and luxury typography selection

LAB EXPERIMENTS:
- Visit /lab for cutting-edge design experiments
- Features: Color Harmonics, Motion Studies, Typography Lab, Interactive Particles, Sound Visualizer, 3D Geometry
- Premium interactive experiences showcasing technical excellence
- Innovation playground for creative experimentation

PERSONALITY & COMMUNICATION:
- Sophisticated yet approachable
- Focus on luxury, premium, and high-end solutions
- Passionate about design excellence and business transformation
- Emphasize measurable results and market leadership
- Concise, valuable responses (under 100 words)
- Never mention external AI providers - you are Optra's proprietary technology

IMPORTANT: Only mention real projects and achievements. Never create fictional case studies or make up client names. Focus on the actual results and transformations Optra has achieved.

For pricing information, always direct users to contact Aniketh directly at aniketh@optra.me for premium custom quotes tailored to their luxury brand needs.`
            }]
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      let botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (!botResponse) {
        return this.getFallbackResponse(messages[messages.length - 1].content);
      }

      // Filter and enhance response
      botResponse = this.filterAndEnhanceResponse(botResponse);

      return {
        response: botResponse,
        success: true
      };
    } catch (error) {
      console.error('Error calling AI service:', error);
      return this.getFallbackResponse(messages[messages.length - 1].content);
    }
  }

  private filterAndEnhanceResponse(response: string): string {
    // Remove any fictional project names or made-up case studies
    const forbiddenTerms = ['fictional', 'example', 'hypothetical', 'sample', 'demo'];
    let filteredResponse = response;

    // Replace generic terms with premium language
    const premiumReplacements = {
      'good': 'exceptional',
      'nice': 'sophisticated',
      'great': 'outstanding',
      'awesome': 'extraordinary',
      'cool': 'innovative',
      'design': 'premium design',
      'brand': 'luxury brand',
      'website': 'premium digital experience',
      'client': 'distinguished client'
    };

    Object.entries(premiumReplacements).forEach(([old, premium]) => {
      const regex = new RegExp(`\\b${old}\\b`, 'gi');
      filteredResponse = filteredResponse.replace(regex, premium);
    });

    // Ensure mention of real achievements
    if (filteredResponse.includes('project') && !filteredResponse.includes('Shriniketana')) {
      filteredResponse += ' Our work with Shriniketana Educational Institution achieved 300% increased enrollment through strategic brand transformation.';
    }

    return filteredResponse;
  }

  private getFallbackResponse(userMessage: string): LLMResponse {
    const lowercaseMessage = userMessage.toLowerCase();
    
    const responses: { [key: string]: string[] } = {
      aniketh: [
        "Aniketh Shetty is the visionary founder behind Optra Design! 🎨 Based in Bangalore, he's passionate about creating premium design solutions that transform brands into market leaders. Reach him at aniketh@optra.me",
        "Meet Aniketh - the creative force who founded Optra to deliver luxury brand experiences! 🚀 He personally oversees each project to ensure exceptional quality and measurable results."
      ],
      services: [
        "Optra specializes in premium solutions: 🎯 Luxury Brand Identity, Elite Digital Experiences, Strategic Creative Direction, and Premium Consultation. Contact aniketh@optra.me for custom quotes.",
        "Our premium services transform businesses: ✨ Brand Identity, High-end Web Design, Creative Direction, and Strategic Consultation. Luxury pricing available at aniketh@optra.me"
      ],
      pricing: [
        "For premium pricing information, contact Aniketh directly at aniketh@optra.me 💰 He provides personalized luxury quotes based on your specific transformation needs.",
        "Our pricing reflects boutique luxury quality. 💎 Contact aniketh@optra.me for custom quotes tailored to your premium brand vision!"
      ],
      work: [
        "Optra's real achievements include: Shriniketana Educational Institution (300% increased enrollment), luxury hospitality brands (250% market positioning elevation), and tech startups securing $2M funding! 📊",
        "Our portfolio showcases 50+ premium brand transformations with 250% average recognition increase. 🌟 Contact aniketh@optra.me for detailed case studies!"
      ],
      blog: [
        "Check out our blog at /blog! 📝 Aniketh shares design insights, luxury brand case studies, and creative process. Topics include: Premium brand strategy, luxury design principles, high-end visual storytelling",
        "Our blog covers design thinking, brand strategy, visual storytelling, and industry insights. 📚 Visit /blog for Aniketh's latest thoughts on design excellence!"
      ],
      guides: [
        "We offer comprehensive guides on luxury brand guidelines creation, premium design systems, elite client collaboration, and high-end project workflows. 📋 Contact aniketh@optra.me for detailed resources!",
        "Our expertise includes premium design system methodologies, brand development processes, and project optimization guides. 🎯 Perfect for teams wanting to elevate their design approach."
      ],
      lab: [
        "Explore our Design Lab at /lab! 🧪 Interactive experiments including Color Harmonics, Motion Studies, Typography Lab, and more. Real-time 60fps creativity!",
        "The Lab features amazing experiments: ✨ Interactive Particles, Sound Visualizer, 3D Geometry - all mouse-responsive and super fun to play with!"
      ],
      contact: [
        "Ready to start something amazing? 🌟 Reach Aniketh directly at aniketh@optra.me - you'll get a personal response within 48 hours!",
        "Let's connect! 🤝 Aniketh personally responds to every inquiry at aniketh@optra.me within 48 hours."
      ]
    };

    let responseCategory = 'default';
    for (const [key, _] of Object.entries(responses)) {
      if (lowercaseMessage.includes(key)) {
        responseCategory = key;
        break;
      }
    }

    if (responseCategory !== 'default' && responses[responseCategory]) {
      const categoryResponses = responses[responseCategory];
      const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
      return { response: randomResponse, success: true, isOffline: true };
    }

    const defaultResponses = [
      "I'm OptraBot, powered by Optra's premium AI technology! 🤖 I can help with luxury services, premium insights, cutting-edge Lab experiments, or connecting you for elite consultations.",
      "Hello! I'm OptraBot, your AI assistant for Optra Design Studio. ✨ Ask me about our premium services, exclusive insights, innovative Lab, or how to start your luxury brand transformation!"
    ];

    return {
      response: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      success: true,
      isOffline: true
    };
  }
}

const apiLLMService = new APILLMService();
export { apiLLMService, type ChatMessage, type LLMResponse };

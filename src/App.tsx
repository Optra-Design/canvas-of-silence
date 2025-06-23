
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Founder from './pages/Founder';
import Chat from './pages/Chat';
import Blog from './pages/Blog';
import Pulse from './pages/Pulse';
import Lab from './pages/Lab';
import Minigames from './pages/Minigames';
import NotFound from './pages/NotFound';
import Test404 from './pages/Test404';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'sonner'
import EnhancedOptraBot from './components/EnhancedOptraBot';
import FounderChatBubble from './components/FounderChatBubble';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AuthProvider>
          <Router>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <div className="relative min-h-screen bg-zinc-950 text-white">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/founder" element={<Founder />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/pulse" element={<Pulse />} />
                  <Route path="/lab" element={<Lab />} />
                  <Route path="/minigames" element={<Minigames />} />
                  <Route path="/404test" element={<Test404 />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                
                {/* Chat bubbles positioned properly */}
                <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
                  <EnhancedOptraBot />
                </div>
                <FounderChatBubble />
                
                <Toaster />
              </div>
            </ThemeProvider>
          </Router>
        </AuthProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;

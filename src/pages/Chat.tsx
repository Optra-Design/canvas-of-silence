
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Send, MessageCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';

const Chat = () => {
  const { user } = useAuth();
  const { userProfile } = useUser();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) {
      toast.error('Please log in and enter a message');
      return;
    }

    setIsLoading(true);
    try {
      // Here you would typically send the message to your backend
      const newMessage = {
        id: Date.now(),
        content: message,
        sender: userProfile?.display_name || user.email,
        timestamp: new Date().toISOString(),
        isFromFounder: false
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      toast.success('Message sent to Aniketh!');
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
              Chat with Aniketh
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Connect directly with the founder. Share your ideas, get feedback, 
              or just say hello!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chat Messages */}
            <div className="lg:col-span-2">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Conversation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Welcome Message */}
                  <div className="flex gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground/80">Aniketh Shet</p>
                      <p className="text-foreground/70">
                        Hey there! I'm excited to hear from you. What's on your mind?
                      </p>
                    </div>
                  </div>

                  {/* User Messages */}
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.isFromFounder ? 'justify-start' : 'justify-end'}`}>
                      {msg.isFromFounder && (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.isFromFounder 
                          ? 'bg-white/10 text-left' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white text-right'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      {!msg.isFromFounder && (
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="flex gap-2 pt-4 border-t border-white/10">
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 min-h-[60px] resize-none"
                      disabled={!user}
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading || !message.trim() || !user}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>

                  {!user && (
                    <p className="text-center text-foreground/60 text-sm">
                      Please log in to send messages
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Founder Info */}
            <div className="space-y-6">
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gradient mb-2">Aniketh Shet</h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    Founder & Creative Director at Optra
                  </p>
                  <p className="text-foreground/60 text-xs leading-relaxed">
                    Passionate about creating exceptional digital experiences. 
                    Always excited to connect with fellow creators and innovators.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 text-sm">
                    I typically respond within 24 hours. For urgent matters, 
                    feel free to reach out via email as well.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

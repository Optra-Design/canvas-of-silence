
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Send, MessageCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { supabase } from '../integrations/supabase/client';

interface Message {
  id: string;
  content: string;
  sender_name: string;
  sender_email: string;
  created_at: string;
  is_from_founder: boolean;
  is_read: boolean;
}

const Chat = () => {
  const { user, profile, isLoggedIn } = useAuth();
  const { currentUser } = useUser();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const isFounder = profile?.email === 'aniketh@optra.me' || user?.email === 'aniketh@optra.me';

  // Load messages from Supabase
  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('founder_chat_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading messages:', error);
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel('founder-chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'founder_chat_messages'
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
          
          if (!newMessage.is_from_founder) {
            toast.success('New message received!');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    // For non-logged-in users, require name and email
    if (!isLoggedIn && !user) {
      if (!userName.trim() || !userEmail.trim()) {
        toast.error('Please enter your name and email to send a message');
        return;
      }
    }

    setIsLoading(true);
    try {
      const senderName = userName || profile?.name || user?.user_metadata?.name || currentUser?.name || 'Anonymous';
      const senderEmail = userEmail || profile?.email || user?.email || 'anonymous@example.com';

      const { error } = await supabase
        .from('founder_chat_messages')
        .insert({
          content: message.trim(),
          sender_name: senderName,
          sender_email: senderEmail,
          sender_id: user?.id || null,
          is_from_founder: isFounder,
          is_read: false
        });

      if (error) {
        throw error;
      }

      setMessage('');
      toast.success(isFounder ? 'Reply sent!' : 'Message sent to Aniketh!');
    } catch (error) {
      toast.error('Failed to send message');
      console.error('Error sending message:', error);
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
                    Live Conversation
                    {isFounder && <span className="text-xs bg-blue-500/30 text-blue-400 px-2 py-1 rounded-full">Founder Mode</span>}
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

                  {/* Messages */}
                  <div className="max-h-96 overflow-y-auto space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex gap-3 ${msg.is_from_founder ? 'justify-start' : 'justify-end'}`}>
                        {msg.is_from_founder && (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.is_from_founder 
                            ? 'bg-white/10 text-left' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white text-right'
                        }`}>
                          <p className="text-sm font-medium mb-1">{msg.sender_name}</p>
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(msg.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                        {!msg.is_from_founder && (
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* User Info for Non-Logged Users */}
                  {!isLoggedIn && !user && (
                    <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10">
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Your name"
                        className="px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg focus:border-white/40 transition-colors"
                      />
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Your email"
                        className="px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg focus:border-white/40 transition-colors"
                      />
                    </div>
                  )}

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="flex gap-2 pt-4 border-t border-white/10">
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 min-h-[60px] resize-none"
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading || !message.trim()}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
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
                  <CardTitle className="text-lg">Live Chat Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-foreground/70 text-sm space-y-2">
                    <li>• Real-time messaging</li>
                    <li>• No login required to send messages</li>
                    <li>• Messages stored in database</li>
                    <li>• Founder can reply directly</li>
                    <li>• Instant notifications</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 text-sm">
                    Aniketh typically responds within 24 hours. For urgent matters, 
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

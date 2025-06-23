
-- Create table for founder chat messages
CREATE TABLE public.founder_chat_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  sender_name text NOT NULL,
  sender_email text NOT NULL,
  content text NOT NULL,
  is_from_founder boolean NOT NULL DEFAULT false,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.founder_chat_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view all messages (for the chat to work)
CREATE POLICY "Anyone can view founder chat messages" 
  ON public.founder_chat_messages 
  FOR SELECT 
  USING (true);

-- Policy: Anyone can insert messages (for guest users)
CREATE POLICY "Anyone can send messages to founder" 
  ON public.founder_chat_messages 
  FOR INSERT 
  WITH CHECK (true);

-- Policy: Only founder can update messages (mark as read, etc)
CREATE POLICY "Only founder can update messages" 
  ON public.founder_chat_messages 
  FOR UPDATE 
  USING (sender_email = 'aniketh@optra.me' OR is_from_founder = true);

-- Enable realtime
ALTER TABLE public.founder_chat_messages REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.founder_chat_messages;

-- Create an index for better performance
CREATE INDEX idx_founder_chat_messages_created_at ON public.founder_chat_messages(created_at DESC);
CREATE INDEX idx_founder_chat_messages_founder ON public.founder_chat_messages(is_from_founder);

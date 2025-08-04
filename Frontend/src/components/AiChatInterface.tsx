import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AiChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI insurance assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (msg: string): string => {
    const m = msg.toLowerCase();
    if (m.includes('coverage')) return 'I can explain your policy coverage in detail...';
    if (m.includes('claim')) return 'To file a claim, you will need the following documents...';
    if (m.includes('deductible')) return 'A deductible is the amount you pay before insurance covers the rest.';
    if (m.includes('life insurance')) return 'Life insurance provides financial support to your family after you pass.';
    return "I'm here to help with any insurance-related question you may have.";
  };

  const suggestedQuestions = [
    "What does my policy cover?",
    "How do I file a claim?",
    "What's my deductible?",
    "Can you explain my premium?",
    "What documents do I need?"
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#0f0f0f] min-h-screen text-white">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold">AI Insurance Assistant</h2>
        </div>
        <p className="text-gray-400 max-w-xl mx-auto text-sm">
          Ask me anything about your policy, coverage, claims, or documents. Available 24/7.
        </p>
      </div>

      {/* Chat Box */}
      <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-xl backdrop-blur-md border border-gray-700">
        <div className="h-[400px] overflow-y-auto pr-2 mb-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-sm px-4 py-3 rounded-xl text-sm ${
                msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-[#2a2a2a] text-gray-200'
              }`}>
                {msg.text}
                <div className="text-xs text-gray-400 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#2a2a2a] text-gray-200 px-4 py-3 rounded-xl flex items-center space-x-2">
                <Bot className="w-4 h-4 text-indigo-500" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className="mb-6">
          <p className="text-sm font-semibold mb-2 text-gray-300">Quick Questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setInputMessage(q)}
                className="px-4 py-2 rounded-full text-sm bg-gray-700 text-white hover:bg-indigo-600 transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isTyping}
            placeholder="Type your insurance question..."
            className="flex-1 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!inputMessage.trim() || isTyping}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white flex items-center gap-2 disabled:opacity-50"
          >
            {isTyping ? <Loader className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiChatInterface;
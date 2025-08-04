import React, { useState, useRef, useEffect } from 'react';

interface AiChatInterfaceProps {
  fileId: string;
}

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

const AiChatInterface: React.FC<AiChatInterfaceProps> = ({ fileId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = { sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        sender: 'bot',
        text: `You asked about "${text}". Here's a simulated answer based on document ID ${fileId}.`
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="card p-6 border border-gray-200 rounded-lg max-h-[500px] overflow-hidden flex flex-col">
      <p className="text-sm text-gray-600 mb-2">
        Chatting about document ID: <strong>{fileId}</strong>
      </p>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-2 pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] px-4 py-2 rounded-lg ${
              msg.sender === 'user'
                ? 'bg-blue-100 text-blue-800 self-end'
                : 'bg-gray-100 text-gray-800 self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AiChatInterface;
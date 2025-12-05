'use client';

import { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [selectedModel, setSelectedModel] = useState('deepseek');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (prompt) => {
    const userMessage = { sender: 'user', text: prompt, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);

    const aiMessage = { sender: 'ai', text: '', timestamp: Date.now() };
    setMessages((prev) => [...prev, aiMessage]);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model: selectedModel }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to get response stream');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        streamedText += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1 ? { ...msg, text: streamedText } : msg
          )
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
       setMessages((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1 ? { ...msg, text: "Error: Could not connect to the AI model." } : msg
          )
        );
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
      <main className="flex-1 flex flex-col">
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
}

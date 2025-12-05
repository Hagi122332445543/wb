'use client';

import { User, Bot } from 'lucide-react';

export default function ChatMessage({ message }) {
  const { sender, text, timestamp } = message;
  const isUser = sender === 'user';

  return (
    <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : ''}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-500' : 'bg-gray-700'}`}>
        {isUser ? <User className="text-white" /> : <Bot className="text-white" />}
      </div>
      <div className={`p-3 rounded-lg max-w-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
        <p className="text-sm">{text}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>{new Date(timestamp).toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

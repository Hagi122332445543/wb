'use client';

import { useState } from 'react';

export default function ChatInput({ onSendMessage }) {
  const [prompt, setPrompt] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSendMessage(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="p-4 border-t bg-gray-50 dark:bg-gray-900">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full p-2 pr-20 rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="1"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          disabled={!prompt.trim()}
        >
          Send
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-1 text-center">Shift+Enter for new line</p>
    </div>
  );
}

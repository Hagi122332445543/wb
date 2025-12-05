'use client';

import { useState } from 'react';
import ModelSelect from './ModelSelect';

const models = [
    { id: 'deepseek', name: 'DeepSeek-V3' },
    { id: 'qwen72', name: 'Qwen3-72B-AI-Reasoner' },
    { id: 'gemma', name: 'Gemma-3-27B-IT' },
    { id: 'openthinker', name: 'OpenThinker-70B-GRPO' },
    { id: 'qwen32', name: 'Qwen3-32B-Thinker' },
    { id: 'llama', name: 'LLaMA-3.2-90B' },
];

export default function Sidebar({ selectedModel, setSelectedModel }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden fixed top-4 left-4 z-20 p-2 bg-gray-200 dark:bg-gray-800 rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <aside className={`transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative z-10 w-64 h-full bg-gray-100 dark:bg-gray-800 p-4 border-r`}>
        <h2 className="text-lg font-semibold mb-4">Models</h2>
        <ModelSelect models={models} selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
      </aside>
    </>
  );
}

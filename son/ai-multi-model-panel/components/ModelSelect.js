'use client';

export default function ModelSelect({ models, selectedModel, setSelectedModel }) {
  return (
    <div className="space-y-2">
      {models.map((model) => (
        <button
          key={model.id}
          onClick={() => setSelectedModel(model.id)}
          className={`w-full text-left p-2 rounded-md ${selectedModel === model.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
          {model.name}
        </button>
      ))}
    </div>
  );
}

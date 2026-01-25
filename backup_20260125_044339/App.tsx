import React, { useState, useEffect } from 'react';
import ClipboardItem from './components/ClipboardItem';
import { Search, RefreshCw, Settings } from 'lucide-react';

function App() {
  const [items, setItems] = useState<any[]>([
    {
      id: '1',
      content: 'Hello from Knoux Clipboard AI!',
      format: 'text',
      timestamp: new Date().toISOString(),
      tags: ['welcome', 'test']
    },
    {
      id: '2',
      content: 'https://github.com/knoux/clipboard-ai',
      format: 'url',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      metadata: { isUrl: true }
    },
    {
      id: '3',
      content: 'API_KEY=secret123456',
      format: 'text',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      metadata: { sensitive: true },
      tags: ['api', 'key']
    }
  ]);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopy = (item: any) => {
    navigator.clipboard.writeText(item.content);
    alert(`Copied: ${item.content.substring(0, 50)}...`);
  };

  const handleDelete = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const filteredItems = items.filter(item =>
    item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Knoux Clipboard AI
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Intelligent clipboard manager with AI-powered content analysis
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clipboard history..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {items.length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {new Set(items.map(i => i.format)).size}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Formats</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {items.filter(i => i.metadata?.sensitive).length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sensitive</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {items.filter(i => i.metadata?.isUrl).length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Links</p>
          </div>
        </div>

        {/* Clipboard Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <ClipboardItem
              key={item.id}
              item={item}
              isSelected={selectedItem === item.id}
              onSelect={() => setSelectedItem(item.id)}
              onCopy={() => handleCopy(item)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No items found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Try a different search term' : 'Start copying to see items here'}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Built with ❤️ by{' '}
            <a 
              href="https://github.com/knoux" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Knoux Team
            </a>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Version 1.0.0 • Premium Edition
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

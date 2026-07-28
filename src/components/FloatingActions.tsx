import { MessageSquare, Bot } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function FloatingActions() {
  const handleWhatsApp = () => {
    // Standard whatsapp intent
    window.open('https://wa.me/1234567890?text=Hello%20Jerry%20International%20Academy!', '_blank');
  };

  const handleAI = () => {
    // Open an AI assistant modal or redirect
    alert("AI Assistant feature coming soon!");
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleAI}
        className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center group relative"
        aria-label="AI Assistant"
      >
        <Bot className="h-6 w-6" />
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Ask AI Assistant
        </span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsApp}
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center group relative"
        aria-label="WhatsApp"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
      </motion.button>
    </div>
  );
}

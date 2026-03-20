import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, User, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getGeminiResponse, getMapsGroundingResponse } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  groundingMetadata?: any[];
}

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de Casas Fabrick. ¿En qué puedo ayudarte hoy con tu proyecto?',
      timestamp: new Date(Date.now() - 1000000)
    },
    {
      id: '2',
      role: 'user',
      content: '¿Cuál es el estado de la fase de cimentación?',
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: '3',
      role: 'assistant',
      content: 'La fase de cimentación está completada al 100%. Actualmente estamos iniciando la estructura de la planta baja.',
      timestamp: new Date(Date.now() - 800000)
    },
    {
      id: '4',
      role: 'user',
      content: '¿Cuándo es la próxima inspección?',
      timestamp: new Date(Date.now() - 700000)
    },
    {
      id: '5',
      role: 'assistant',
      content: 'La próxima inspección municipal está programada para el 10 de abril. Todo está en orden para la revisión.',
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: '6',
      role: 'user',
      content: '¿Puedo cambiar el color de los azulejos del baño principal?',
      timestamp: new Date(Date.now() - 500000)
    },
    {
      id: '7',
      role: 'assistant',
      content: 'Aún estamos a tiempo. Por favor, revisa el catálogo en la sección de Documentos y envíanos tu elección antes del viernes.',
      timestamp: new Date(Date.now() - 400000)
    },
    {
      id: '8',
      role: 'user',
      content: 'Perfecto, lo revisaré esta tarde. ¿Hay algún costo adicional?',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '9',
      role: 'assistant',
      content: 'Dependerá del modelo que elijas. Si es de la gama estándar, no hay costo extra. Si es premium, te enviaremos el presupuesto ajustado.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let responseText = '';
      let groundingChunks = [];

      // Check if query is about location or maps
      if (input.toLowerCase().includes('donde') || input.toLowerCase().includes('ubicacion') || input.toLowerCase().includes('cerca')) {
        const result = await getMapsGroundingResponse(input);
        responseText = result.text;
        groundingChunks = result.groundingChunks;
      } else {
        responseText = await getGeminiResponse(input);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
        groundingMetadata: groundingChunks
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu solicitud. Por favor intenta de nuevo.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 w-14 h-14 bg-fabrick-lava text-white rounded-full shadow-lava-glow flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 md:bottom-24 md:right-8 z-50 w-[350px] md:w-[400px] h-[500px] glass-panel flex flex-col shadow-2xl border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-fabrick-lava flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white">Asistente Fabrick</h3>
                  <p className="text-[8px] text-white/70 uppercase tracking-widest">En Línea</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 hide-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-sm text-xs leading-relaxed ${
                    msg.role === 'user' ? 'bg-fabrick-lava text-white' : 'bg-white/5 text-fabrick-gray border border-white/10'
                  }`}>
                    <div className="flex items-center gap-2 mb-1 opacity-50 text-[8px] uppercase font-bold">
                      {msg.role === 'user' ? <User size={10} /> : <Bot size={10} />}
                      {msg.role === 'user' ? 'Tú' : 'Asistente'}
                    </div>
                    {msg.content}
                    
                    {msg.groundingMetadata && msg.groundingMetadata.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
                        <p className="text-[8px] uppercase font-bold text-fabrick-lava flex items-center gap-1">
                          <MapPin size={8} /> Fuentes:
                        </p>
                        {msg.groundingMetadata.map((chunk, idx) => (
                          chunk.web && (
                            <a key={idx} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="block text-[8px] text-fabrick-gray hover:text-white underline truncate">
                              {chunk.web.title || chunk.web.uri}
                            </a>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-sm border border-white/10 flex gap-1">
                    <div className="w-1 h-1 bg-fabrick-lava rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-fabrick-lava rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1 h-1 bg-fabrick-lava rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-fabrick-black/50">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe tu mensaje..."
                  className="flex-grow bg-white/5 border border-white/10 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-fabrick-lava transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="p-2 bg-fabrick-lava text-white rounded-sm hover:brightness-110 transition-all disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

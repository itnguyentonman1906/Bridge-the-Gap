
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, RefreshCw, Mic, Info } from 'lucide-react';
import { startInterviewChat } from '../services/geminiService';
import type { Message } from '../types';
import { GoogleGenAI } from '@google/genai';

const Simulator: React.FC = () => {
  const [cvText, setCvText] = useState('');
  const [jdText, setJdText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const chatRef = useRef<ReturnType<typeof GoogleGenAI.prototype.chats.create>>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleStart = async () => {
    if (!cvText || !jdText) return;
    setIsLoading(true);
    try {
      const chat = startInterviewChat(cvText, jdText);
      chatRef.current = chat;
      const response = await chat.sendMessage({ message: "Hello. I am ready for the interview. Please start." });
      setMessages([{ role: 'model', text: response.text || '' }]);
      setIsStarted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !chatRef.current) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text || '' }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-4">
          <div className="inline-block p-3 bg-indigo-100 rounded-2xl text-indigo-600 mb-2">
            <Mic size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">AI Interview Simulator</h1>
          <p className="text-gray-600">Practice with a Senior Hiring Manager specialized in the role you're targeting. Receive real-time questions and build confidence.</p>
        </div>

        <div className="bg-white rounded-3xl border shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">Paste your Resume</label>
            <textarea
              className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              placeholder="The AI needs to know your background..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">Paste the Job Description</label>
            <textarea
              className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              placeholder="The AI needs to know the role requirements..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
          </div>
          <button
            onClick={handleStart}
            disabled={!cvText || !jdText || isLoading}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:bg-gray-300 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Enter Interview Room'}
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3 text-sm text-blue-700">
          <Info size={20} className="shrink-0" />
          <p>The simulator will ask questions one by one. Treat it like a real interview for best results.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white rounded-3xl border shadow-xl overflow-hidden animate-in slide-in-from-bottom duration-500">
      <div className="bg-gray-50 border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
              <Bot size={24} />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 leading-none">Senior Interviewer</h3>
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Active Session</span>
          </div>
        </div>
        <button 
          onClick={() => { setIsStarted(false); setMessages([]); }}
          className="p-2 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors"
          title="Reset Interview"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-gray-100 text-gray-400 flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                Thinking...
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            className="flex-grow p-4 pr-12 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition-all"
            placeholder="Type your answer here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 disabled:bg-gray-300 transition-all active:scale-90"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Simulator;

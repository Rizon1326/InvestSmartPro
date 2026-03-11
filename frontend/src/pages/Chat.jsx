import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Plus, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { useChat } from '../hooks/useChat';

function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in`}>
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-primary-100 text-primary-600'
            : 'bg-gradient-to-br from-violet-500 to-purple-700 text-white shadow-sm shadow-violet-300/30'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? 'bg-primary-600 text-white rounded-tr-sm shadow-primary-200/50'
            : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
        <Bot className="w-4 h-4" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '160ms' }} />
          <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '320ms' }} />
        </div>
      </div>
    </div>
  );
}

const suggestions = [
  'How do I start a business in Bangladesh?',
  'What are good low-investment business ideas?',
  'How should I price my products?',
  'What are the biggest risks for new businesses?',
];

export function Chat() {
  const { messages, loading, error, sendMessage, resetChat } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="animate-fade-in flex flex-col" style={{ height: 'calc(100vh - 7rem)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-md shadow-violet-300/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">AI Business Advisor</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <p className="text-xs text-slate-400">Powered by Gemini AI</p>
            </div>
          </div>
        </div>
        <button
          onClick={resetChat}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border-0 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> New Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-slate-50/50 border border-slate-200 rounded-2xl p-4 space-y-4 min-h-0">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center mb-5 shadow-xl shadow-violet-300/30">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">How can I help you?</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm leading-relaxed">
              Ask me anything about starting or growing a business in Bangladesh. I provide expert guidance tailored to the local market.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left px-4 py-3 text-xs text-slate-600 font-medium bg-white border border-slate-200 rounded-xl hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-700 transition-all cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            {loading && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="mt-2 px-4 py-2.5 bg-red-50 text-red-600 text-xs font-medium rounded-xl border border-red-100 flex-shrink-0">
          {error}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSend} className="mt-3 flex gap-2.5 flex-shrink-0">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about business strategy, funding, risk..."
          className="flex-1 input"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="w-11 h-11 flex-shrink-0 rounded-xl bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-0 cursor-pointer flex items-center justify-center shadow-sm shadow-primary-300/30"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}



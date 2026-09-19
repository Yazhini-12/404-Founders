import React, { useState } from 'react';
import { Send, Sparkles, Bot, User, RefreshCw } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Avatar } from '../../components/common/Avatar';
import { assistantService } from '../../services/assistantService';
import { mockEmployee } from '../../data/mockEmployee';

export function Assistant() {
  const [messages, setMessages] = useState([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello ${mockEmployee.fullName.split(' ')[0]}! I am your SkillSync AI Career Assistant. I analyze your Skill Passport, projects, and learning consistency to guide your internal mobility.\n\nHow can I help you today?`,
      suggestedActions: [
        'What roles am I suitable for?',
        'What skill should I learn next?',
        'Why is Cloud Engineer recommended?',
        'How can I become an AI Engineer?'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: `m-usr-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // TODO: Call Supabase Edge Function '/functions/v1/career-assistant-chat'
      const response = await assistantService.sendCareerAssistantMessage(query, messages);
      const aiMsg = {
        id: `m-ai-${Date.now()}`,
        sender: 'ai',
        text: response.reply,
        suggestedActions: response.suggestedActions
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="AI Career Assistant"
        subtitle="Get instant personalized career guidance, skill gap insights, and role advice."
        badgeText="AI Powered"
      />

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col h-[600px] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-slate-900 text-white border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">SkillSync Career Advisor</h3>
            <span className="text-[11px] text-emerald-400 font-medium">● Connected to Employee Skill Engine</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-md rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-none'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Suggested Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {msg.suggestedActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(action)}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-semibold px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <Avatar name={mockEmployee.fullName} src={mockEmployee.avatarUrl} size="sm" className="mt-0.5" />
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium pl-11">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              AI Assistant is thinking...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your career path, skills, or role recommendations..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold text-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

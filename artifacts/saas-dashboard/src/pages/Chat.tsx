import { useState } from 'react';
import { Card, Input } from '../components/ui/shared';
import { Search, MoreVertical, Paperclip, Send, CheckCheck } from 'lucide-react';
import { cn } from '../components/ui/shared';

// Mock Data
const CONVERSATIONS = [
  { id: '1', name: 'Alice Cooper', lastMsg: 'Thanks for the quick support!', time: '10:42 AM', unread: 0, platform: 'WhatsApp', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
  { id: '2', name: 'John Smith', lastMsg: 'I have a question about pricing', time: '09:15 AM', unread: 2, platform: 'Facebook', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop' },
  { id: '3', name: 'Sarah Wilson', lastMsg: 'Can you send the invoice?', time: 'Yesterday', unread: 0, platform: 'WhatsApp', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' },
  { id: '4', name: 'Michael Brown', lastMsg: 'Perfect, that works.', time: 'Yesterday', unread: 0, platform: 'Instagram', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop' },
];

const MESSAGES = [
  { id: '1', text: 'Hi, I need help with my account setup.', sender: 'user', time: '10:30 AM' },
  { id: '2', text: 'Hello! I\'d be happy to help you with that. What specific step are you stuck on?', sender: 'agent', time: '10:32 AM' },
  { id: '3', text: 'I am trying to connect my WhatsApp number but it gives me an error.', sender: 'user', time: '10:35 AM' },
  { id: '4', text: 'Thanks for the quick support!', sender: 'user', time: '10:42 AM' },
];

export default function Chat() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeChat, setActiveChat] = useState('1');
  const [msgInput, setMsgInput] = useState('');

  const chatData = CONVERSATIONS.find(c => c.id === activeChat);

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 animate-fade-in">
      {/* Conversations List (Left Panel) */}
      <Card className="w-full md:w-80 lg:w-96 flex flex-col border-border/50 hidden md:flex shrink-0">
        <div className="p-4 border-b">
          <h2 className="text-xl font-display font-bold text-foreground mb-4">Inbox</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full pl-9 pr-4 py-2 bg-muted/50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="flex space-x-2">
            {['all', 'unread', 'archived'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors",
                  activeTab === tab 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {CONVERSATIONS.map(conv => (
            <div 
              key={conv.id}
              onClick={() => setActiveChat(conv.id)}
              className={cn(
                "p-3 rounded-xl cursor-pointer flex gap-3 transition-colors",
                activeChat === conv.id ? "bg-accent" : "hover:bg-muted/50"
              )}
            >
              <div className="relative">
                {/* user avatar */}
                <img src={conv.avatar} alt={conv.name} className="h-12 w-12 rounded-full object-cover border border-border" />
                {conv.unread > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground border-2 border-background">
                    {conv.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-semibold text-sm truncate text-foreground">{conv.name}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{conv.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{conv.lastMsg}</p>
                <div className="mt-1">
                  <span className="text-[10px] bg-background border px-1.5 py-0.5 rounded text-muted-foreground">{conv.platform}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Chat Thread (Right Panel) */}
      <Card className="flex-1 flex flex-col border-border/50 h-full">
        {chatData ? (
          <>
            {/* Header */}
            <div className="h-16 border-b flex items-center justify-between px-6 bg-background rounded-t-2xl shrink-0">
              <div className="flex items-center gap-3">
                <img src={chatData.avatar} alt={chatData.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold text-foreground leading-none">{chatData.name}</h3>
                  <span className="text-xs text-emerald-500 font-medium">Online • {chatData.platform}</span>
                </div>
              </div>
              <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/10">
              {MESSAGES.map(msg => {
                const isAgent = msg.sender === 'agent';
                return (
                  <div key={msg.id} className={cn("flex max-w-[80%]", isAgent ? "ml-auto" : "mr-auto")}>
                    <div className={cn(
                      "p-4 rounded-2xl relative group",
                      isAgent 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-background border border-border text-foreground rounded-tl-none shadow-sm"
                    )}>
                      <p className="text-sm">{msg.text}</p>
                      <div className={cn(
                        "flex items-center gap-1 mt-1 text-[10px]",
                        isAgent ? "text-primary-foreground/70 justify-end" : "text-muted-foreground"
                      )}>
                        <span>{msg.time}</span>
                        {isAgent && <CheckCheck className="h-3 w-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t rounded-b-2xl shrink-0">
              <div className="flex items-center gap-2">
                <button className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-muted/30 border border-border rounded-full px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  onKeyDown={(e) => e.key === 'Enter' && setMsgInput('')}
                />
                <button 
                  className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                  disabled={!msgInput.trim()}
                  onClick={() => setMsgInput('')}
                >
                  <Send className="h-5 w-5 ml-0.5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </Card>
    </div>
  );
}

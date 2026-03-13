import { Card } from '../components/ui/shared';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Send, MessageSquare, TrendingUp } from 'lucide-react';

const areaData = [
  { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 }, { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 }, { name: 'May', value: 6890 }, { name: 'Jun', value: 8390 },
  { name: 'Jul', value: 9490 }, { name: 'Aug', value: 11000 }, { name: 'Sep', value: 12500 },
  { name: 'Oct', value: 10200 }, { name: 'Nov', value: 14000 }, { name: 'Dec', value: 15200 },
];

const barData = [
  { name: 'Mon', active: 120 }, { name: 'Tue', active: 132 }, { name: 'Wed', active: 101 },
  { name: 'Thu', active: 145 }, { name: 'Fri', active: 156 }, { name: 'Sat', active: 80 },
  { name: 'Sun', active: 60 },
];

const STATS = [
  { title: 'Total Conversations', value: '12,840', change: '+14%', icon: MessageSquare, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { title: 'Messages Sent', value: '450k', change: '+22%', icon: Send, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { title: 'Response Rate', value: '85.2%', change: '+5%', icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { title: 'Active Agents', value: '156', change: '+2', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
];

export default function WhatsAppDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">WhatsApp Analytics</h1>
        <p className="mt-2 text-muted-foreground">Monitor your team's performance and message volumes.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <Card key={i} className="p-6 border-border/50 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <h3 className="text-3xl font-display font-bold text-foreground mt-1">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 p-6">
          <h3 className="text-lg font-bold mb-6">Message Trends (Yearly)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-1 p-6">
          <h3 className="text-lg font-bold mb-6">Active Agents (Weekly)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="active" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

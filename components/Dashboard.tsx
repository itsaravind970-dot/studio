import React from 'react';
import { AnalyticsData } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, Users, Eye, DollarSign } from 'lucide-react';

const mockData: AnalyticsData[] = [
  { day: 'Mon', views: 1200, subs: 10 },
  { day: 'Tue', views: 1500, subs: 15 },
  { day: 'Wed', views: 1100, subs: 8 },
  { day: 'Thu', views: 2400, subs: 45 },
  { day: 'Fri', views: 1800, subs: 20 },
  { day: 'Sat', views: 3200, subs: 60 },
  { day: 'Sun', views: 4500, subs: 90 },
];

const StatCard = ({ label, value, sub, icon: Icon, color }: any) => (
  <div className="bg-zinc-900 p-4 md:p-6 rounded-xl border border-zinc-800 flex items-center justify-between">
    <div>
      <p className="text-zinc-400 text-xs md:text-sm mb-1">{label}</p>
      <h3 className="text-xl md:text-2xl font-bold text-white">{value}</h3>
      <p className={`text-[10px] md:text-xs mt-1 ${sub.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{sub} vs last week</p>
    </div>
    <div className={`p-2 md:p-3 rounded-lg ${color} bg-opacity-10`}>
      <Icon className={`w-5 h-5 md:w-6 md:h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Channel Overview</h1>
          <p className="text-sm md:text-base text-zinc-400">Welcome back, Creator.</p>
        </div>
        <div className="bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800 text-xs md:text-sm text-zinc-300 self-start md:self-auto">
          Last 7 Days
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard label="Views" value="15.7K" sub="+12%" icon={Eye} color="bg-blue-500" />
        <StatCard label="Subs" value="1,240" sub="+2.5%" icon={Users} color="bg-purple-500" />
        <StatCard label="Watch Time" value="940h" sub="+8%" icon={TrendingUp} color="bg-green-500" />
        <StatCard label="Revenue" value="$420" sub="+15%" icon={DollarSign} color="bg-yellow-500" />
      </div>

      <div className="bg-zinc-900 p-4 md:p-6 rounded-xl border border-zinc-800">
        <h3 className="text-lg font-medium text-white mb-4 md:mb-6">Performance Metrics</h3>
        <div className="h-[250px] md:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="day" stroke="#666" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} />
              <YAxis stroke="#666" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} width={40} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#333', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey="views" 
                stroke="#dc2626" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorViews)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 p-4 md:p-6 rounded-xl border border-zinc-800">
          <h3 className="text-lg font-medium text-white mb-4">Recent Suggestions</h3>
          <ul className="space-y-4">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex items-center gap-3 text-sm p-2 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center text-red-500 text-xs font-bold">AI</div>
                <div className="flex-1">
                  <p className="text-zinc-200 font-medium">Title optimization for "Vlog #42"</p>
                  <p className="text-zinc-500 text-xs">2 hours ago</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-zinc-900 p-4 md:p-6 rounded-xl border border-zinc-800">
          <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <button className="p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-sm font-medium text-left">
              New Script
            </button>
            <button className="p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-sm font-medium text-left">
              Keyword Research
            </button>
            <button className="p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-sm font-medium text-left">
              Community Post
            </button>
            <button className="p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-sm font-medium text-left">
              Analyze Competitor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
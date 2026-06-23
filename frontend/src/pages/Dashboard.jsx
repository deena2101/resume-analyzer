import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { History, TrendingUp, Award } from 'lucide-react';

const data = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 68 },
  { name: 'Mar', score: 75 },
  { name: 'Apr', score: 82 },
  { name: 'May', score: 88 },
];

const historyData = [
  { id: 1, role: 'Frontend Developer', date: 'May 15, 2026', score: 88, status: 'Excellent' },
  { id: 2, role: 'Software Engineer', date: 'April 22, 2026', score: 82, status: 'Good' },
  { id: 3, role: 'React Developer', date: 'March 10, 2026', score: 75, status: 'Average' },
];

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
        <p className="text-muted">Track your resume improvements and historical analysis reports.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card flex items-center gap-4">
          <div className="p-4 bg-primary/20 text-primary rounded-xl">
            <Award size={28} />
          </div>
          <div>
            <p className="text-muted text-sm font-medium">Average Score</p>
            <h3 className="text-2xl font-bold">78/100</h3>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4">
          <div className="p-4 bg-secondary/20 text-secondary rounded-xl">
            <History size={28} />
          </div>
          <div>
            <p className="text-muted text-sm font-medium">Resumes Analyzed</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4">
          <div className="p-4 bg-success/20 text-success rounded-xl">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-muted text-sm font-medium">Improvement Rate</p>
            <h3 className="text-2xl font-bold">+23%</h3>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card">
          <h3 className="text-xl font-semibold mb-6">Score Progression</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <History size={20} className="text-primary" />
            Recent History
          </h3>
          <div className="space-y-4">
            {historyData.map((item) => (
              <div key={item.id} className="p-4 bg-surface rounded-xl border border-white/5 hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-text">{item.role}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.score >= 80 ? 'bg-success/20 text-success' : 
                    item.score >= 70 ? 'bg-warning/20 text-warning' : 
                    'bg-danger/20 text-danger'
                  }`}>
                    {item.score}/100
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted">
                  <span>{item.date}</span>
                  <span>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 text-primary text-sm font-medium hover:text-primary/80 transition-colors">
            View All History →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

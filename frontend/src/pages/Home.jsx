import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UploadCloud, CheckCircle, TrendingUp, Shield } from 'lucide-react';

const Home = () => {
  const features = [
    {
      title: "ATS Compatibility",
      desc: "Get scored out of 100 based on standard Applicant Tracking System criteria.",
      icon: <Shield className="text-primary w-8 h-8" />
    },
    {
      title: "Smart Mistake Detection",
      desc: "Identify missing keywords, formatting errors, and weak action verbs instantly.",
      icon: <CheckCircle className="text-secondary w-8 h-8" />
    },
    {
      title: "Job Matching",
      desc: "Compare your resume directly against specific job descriptions.",
      icon: <TrendingUp className="text-success w-8 h-8" />
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Beat the ATS. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Land the Interview.</span>
        </h1>
        <p className="text-xl text-muted mb-8 leading-relaxed">
          AI-powered resume analyzer that scores your resume, detects critical mistakes, and provides actionable suggestions to get you hired faster.
        </p>
        
        <Link to="/analyzer">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-primary/25 flex items-center gap-3 mx-auto text-lg"
          >
            <UploadCloud size={24} />
            Analyze My Resume Now
          </motion.button>
        </Link>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        {features.map((feature, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
            className="glass-card flex flex-col items-center text-center p-8"
          >
            <div className="bg-surface p-4 rounded-2xl mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-muted">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;

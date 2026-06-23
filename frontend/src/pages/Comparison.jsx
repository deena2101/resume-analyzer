import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import UploadBox from '../components/UploadBox';
import { GitCompare } from 'lucide-react';

const Comparison = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [isComparing, setIsComparing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const mockData = [
    { subject: 'Structure', A: 85, B: 65, fullMark: 100 },
    { subject: 'Keywords', A: 90, B: 70, fullMark: 100 },
    { subject: 'Skills', A: 75, B: 85, fullMark: 100 },
    { subject: 'Experience', A: 80, B: 60, fullMark: 100 },
    { subject: 'Education', A: 100, B: 90, fullMark: 100 },
    { subject: 'Readability', A: 70, B: 80, fullMark: 100 },
  ];

  const handleCompare = () => {
    setIsComparing(true);
    // Simulate API call
    setTimeout(() => {
      setIsComparing(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Resume Comparison</h1>
        <p className="text-muted">Upload two resumes to compare their strengths and weaknesses side-by-side.</p>
      </motion.div>

      {!showResults ? (
        <div className="glass-card p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Resume 1 (Baseline)</h3>
              <UploadBox file={file1} setFile={setFile1} title="Upload First Resume" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Resume 2 (To Compare)</h3>
              <UploadBox file={file2} setFile={setFile2} title="Upload Second Resume" />
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={handleCompare}
              disabled={!file1 || !file2 || isComparing}
              className="bg-primary hover:bg-primary/90 disabled:bg-surface disabled:text-muted text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center gap-2"
            >
              {isComparing ? 'Comparing...' : (
                <>
                  <GitCompare size={20} />
                  Compare Resumes
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Comparison Results</h2>
            <button 
              onClick={() => setShowResults(false)}
              className="px-4 py-2 bg-surface hover:bg-surface/80 rounded-lg text-sm font-medium transition-colors"
            >
              New Comparison
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card">
              <h3 className="text-xl font-semibold mb-6 text-center">Score Analysis</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                    <Radar name="Resume 1" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                    <Radar name="Resume 2" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card">
                <h3 className="text-lg font-medium mb-4 flex items-center justify-between">
                  <span>Overall ATS Score</span>
                </h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-primary font-medium">Resume 1</span>
                      <span>83/100</span>
                    </div>
                    <div className="h-2.5 bg-surface rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[83%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-success font-medium">Resume 2</span>
                      <span>72/100</span>
                    </div>
                    <div className="h-2.5 bg-surface rounded-full overflow-hidden">
                      <div className="h-full bg-success rounded-full w-[72%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card text-center p-6 border-primary/30">
                  <h4 className="text-muted text-sm mb-2">Winner</h4>
                  <p className="text-xl font-bold text-primary">Resume 1</p>
                  <p className="text-xs text-muted mt-2">Better keywords & structure</p>
                </div>
                <div className="glass-card text-center p-6 border-success/30">
                  <h4 className="text-muted text-sm mb-2">Strength of R2</h4>
                  <p className="text-xl font-bold text-success">Skills Section</p>
                  <p className="text-xs text-muted mt-2">More relevant technologies</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Comparison;

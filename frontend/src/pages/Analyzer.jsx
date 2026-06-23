import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UploadBox from '../components/UploadBox';
import { analyzeResume } from '../services/api';
import { AlertCircle, CheckCircle, ChevronRight, FileText, LayoutList } from 'lucide-react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

const Analyzer = () => {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a resume first.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = await analyzeResume(file, jobDesc);
      setResults(data);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const scoreData = results ? [
    { name: 'Score', value: results.ats_score.total_score, fill: results.ats_score.total_score >= 80 ? '#10b981' : results.ats_score.total_score >= 60 ? '#f59e0b' : '#ef4444' }
  ] : [];

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Resume Analyzer</h1>
        <p className="text-muted">Upload your resume and an optional job description to get a detailed ATS compatibility report.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="glass-card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText size={20} className="text-primary" />
              Upload Resume
            </h2>
            <UploadBox file={file} setFile={setFile} />
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted mb-2">Job Description (Optional)</h3>
              <textarea 
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here to check keyword match..."
                className="w-full bg-surface border border-white/10 rounded-xl p-4 text-sm min-h-[120px] focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-danger/10 border border-danger/30 text-danger rounded-lg text-sm flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <button 
              onClick={handleAnalyze}
              disabled={loading || !file}
              className="w-full mt-6 bg-primary hover:bg-primary/90 disabled:bg-surface disabled:text-muted disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : 'Analyze Resume'}
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          {results ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card flex flex-col items-center justify-center relative overflow-hidden">
                  <h3 className="text-lg font-medium text-muted absolute top-6 left-6">ATS Score</h3>
                  <div className="h-[200px] w-[200px] mt-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart 
                        cx="50%" cy="50%" 
                        innerRadius="70%" outerRadius="100%" 
                        barSize={15} data={scoreData} startAngle={180} endAngle={0}
                      >
                        <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <span className="text-5xl font-bold">{results.ats_score.total_score}</span>
                    <span className="text-sm text-muted">/ 100</span>
                  </div>
                </div>

                <div className="glass-card">
                  <h3 className="text-lg font-medium text-muted mb-4">Score Breakdown</h3>
                  <div className="space-y-3">
                    {Object.entries(results.ats_score.breakdown).slice(0, 4).map(([key, data]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{key}</span>
                          <span className="font-medium">{data.score}/{data.max}</span>
                        </div>
                        <div className="h-2 bg-surface rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-1000"
                            style={{ width: `${(data.score / data.max) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-card">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle size={20} className="text-warning" />
                  Mistakes & Missing Elements
                </h3>
                {results.analysis.mistakes.length > 0 ? (
                  <ul className="space-y-3">
                    {results.analysis.mistakes.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-surface p-3 rounded-lg border border-warning/20">
                        <AlertCircle size={18} className="text-warning shrink-0 mt-0.5" />
                        <span className="text-sm">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center gap-2 text-success bg-success/10 p-4 rounded-lg border border-success/20">
                    <CheckCircle size={20} />
                    <span>No major formatting mistakes detected!</span>
                  </div>
                )}
              </div>

              <div className="glass-card">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <LayoutList size={20} className="text-secondary" />
                  Suggestions for Improvement
                </h3>
                {results.analysis.suggestions.length > 0 ? (
                  <ul className="space-y-3">
                    {results.analysis.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-surface p-3 rounded-lg border border-secondary/20">
                        <ChevronRight size={18} className="text-secondary shrink-0 mt-0.5" />
                        <span className="text-sm">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted text-sm">Your resume structure looks good. Focus on tailoring content to the job description.</p>
                )}
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[400px] glass-card flex flex-col items-center justify-center text-center p-8 border-dashed">
              <div className="p-6 bg-surface rounded-full mb-6 text-muted">
                <FileText size={48} opacity={0.5} />
              </div>
              <h3 className="text-xl font-medium mb-2">No Results Yet</h3>
              <p className="text-muted max-w-md mx-auto">
                Upload your resume and click 'Analyze' to generate a comprehensive ATS compatibility report and improvement suggestions.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Analyzer;

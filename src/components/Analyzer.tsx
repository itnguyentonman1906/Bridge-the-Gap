
import React, { useState } from 'react';
// Added Zap to the imports from lucide-react to fix undefined component errors
import { Upload, FileText, CheckCircle2, ChevronRight, AlertTriangle, Lightbulb, Loader2, Zap } from 'lucide-react';
import { analyzeCVMatch } from '../services/geminiService';
import MatchScore from './MatchScore';
import type { GapAnalysis } from '../types';
import { useLanguage } from '../i18n';

const Analyzer: React.FC = () => {
  const { t, language } = useLanguage();
  const [cvText, setCvText] = useState('');
  const [jdText, setJdText] = useState('');
  const [analysis, setAnalysis] = useState<GapAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!cvText || !jdText) {
      setError(t('pleaseProvideCVAndJD'));
      return;
    }
    setError(null);
    setIsAnalyzing(true);
    try {
      const result = await analyzeCVMatch(cvText, jdText, language);
      setAnalysis(result);
    } catch (err) {
      setError(t('failedToAnalyze'));
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          {t('bridgeTheGap')} <span className="text-indigo-600">{t('gap')}</span>
        </h1>
        <p className="text-lg text-gray-600">
          {t('pasteResumeAndJD')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Sections */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="text-indigo-600" size={20} />
              <h2 className="text-lg font-bold text-gray-800">{t('yourResumeContent')}</h2>
            </div>
            <textarea
              className="w-full h-48 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-sm resize-none"
              placeholder={t('pasteCVHere')}
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Upload className="text-indigo-600" size={20} />
              <h2 className="text-lg font-bold text-gray-800">{t('jobDescription')}</h2>
            </div>
            <textarea
              className="w-full h-48 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-sm resize-none"
              placeholder={t('pasteJDHere')}
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:bg-indigo-300 flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin" />
                {t('analyzingPotential')}...
              </>
            ) : (
              <>
                {t('analyzeCompatibility')}
                <ChevronRight size={20} />
              </>
            )}
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-2 text-sm font-medium">
              <AlertTriangle size={18} />
              {error}
            </div>
          )}
        </div>

        {/* Results Sections */}
        <div className="space-y-6">
          {!analysis && !isAnalyzing && (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-indigo-50 border border-dashed border-indigo-200 rounded-2xl text-center space-y-4">
              <div className="p-4 bg-indigo-100 rounded-full">
                <Lightbulb size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{t('readyForInsights')}</h3>
              <p className="text-gray-500 max-w-xs">{t('fillFieldsAndAnalyze')}</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-white border rounded-2xl text-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                {/* Zap used here */}
                <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-800">{t('processingWithGemini')}</h3>
                <p className="text-gray-500">{t('processingDescription')}</p>
              </div>
            </div>
          )}

          {analysis && !isAnalyzing && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              {/* Score Dashboard */}
              <div className="grid grid-cols-2 gap-4">
                <MatchScore label={t('jobMatch')} score={analysis.matchScore} color="indigo" />
                <MatchScore label={t('atsHealth')} score={analysis.atsScore} color="emerald" />
              </div>

              {/* Feedback Summary */}
              <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-emerald-500" />
                  {t('aiSummary')}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {analysis.resumeFeedback}
                </p>
              </div>

              {/* Missing Skills */}
              <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-amber-500" />
                  {t('missingSkills')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* ATS Keywords */}
              <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  {/* Zap used here */}
                  <Zap size={20} className="text-indigo-500" />
                  {t('recommendedKeywords')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.recommendedKeywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Section-wise Suggestions */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 px-1">{t('actionableSuggestions')}</h3>
                {analysis.suggestions.map((s, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-4">
                    <div className="h-8 w-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-1">{s.section}</h4>
                      <p className="text-gray-600 text-xs">{s.advice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyzer;

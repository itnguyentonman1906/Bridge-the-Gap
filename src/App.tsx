
import React, { useState } from 'react';
import { FileSearch, Mic2 } from 'lucide-react';
import Analyzer from './components/Analyzer';
import Simulator from './components/Simulator';
import { AppTab } from './types';
import { Suspense } from 'react';
const Header = React.lazy(() => import('./layout/defaultLayout/header'));
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.ANALYZER);

  return (
    <Suspense fallback="loading">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === AppTab.ANALYZER ? <Analyzer /> : <Simulator />}
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 HireSmart AI. Helping candidates bridge the gap between CV and JD.
            </p>
          </div>
        </footer>

        {/* Mobile Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 z-50">
          <button
            onClick={() => setActiveTab(AppTab.ANALYZER)}
            className={`flex flex-col items-center gap-1 ${activeTab === AppTab.ANALYZER ? 'text-indigo-600' : 'text-gray-400'}`}
          >
            <FileSearch size={24} />
            <span className="text-xs">Analyzer</span>
          </button>
          <button
            onClick={() => setActiveTab(AppTab.SIMULATOR)}
            className={`flex flex-col items-center gap-1 ${activeTab === AppTab.SIMULATOR ? 'text-indigo-600' : 'text-gray-400'}`}
          >
            <Mic2 size={24} />
            <span className="text-xs">Simulator</span>
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default App;

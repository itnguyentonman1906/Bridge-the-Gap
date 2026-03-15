import { FileSearch, Mic2, Rocket } from "lucide-react";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import { AppTab } from "../../../types";

interface IProps {
    activeTab: AppTab;
    setActiveTab: (tab: AppTab) => void;
}

export default function Header(props: IProps) {
    const { activeTab, setActiveTab } = props;
    return (
        <header className="bg-white border-b sticky top-0 z-50 w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <Rocket className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">HireSmart<span className="text-indigo-600">AI</span></span>
              </div>

              <nav className="hidden md:flex space-x-8">
                <button
                  onClick={() => setActiveTab(AppTab.ANALYZER)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${activeTab === AppTab.ANALYZER ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <FileSearch size={18} />
                  Gap Analyzer
                </button>
                <button
                  onClick={() => setActiveTab(AppTab.SIMULATOR)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${activeTab === AppTab.SIMULATOR ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Mic2 size={18} />
                  Interview Simulator
                </button>
                <LanguageSwitcher />
              </nav>
            </div>
          </div>
        </header>
    );
}
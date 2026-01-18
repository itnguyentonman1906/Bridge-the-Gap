export type Language = 'en' | 'vi';

export interface Translations {
  // Common
  appName: string;
  gapAnalyzer: string;
  interviewSimulator: string;

  // Analyzer
  bridgeTheGap: string;
  gap: string;
  pasteResumeAndJD: string;
  readyForInsights: string;
  analyzeCompatibility: string;
  yourResumeContent: string;
  jobDescription: string;
  processingWithGemini: string;
  processingDescription: string;
  aiSummary: string;
  missingSkills: string;
  recommendedKeywords: string;
  actionableSuggestions: string;
  jobMatch: string;
  atsHealth: string;
  pasteCVHere: string;
  pasteJDHere: string;
  analyzingPotential: string;
  fillFieldsAndAnalyze: string;
  pleaseProvideCVAndJD: string;
  failedToAnalyze: string;

  // Simulator
  aiInterviewSimulator: string;
  practiceDescription: string;
  enterInterviewRoom: string;
  simulatorInfo: string;
  seniorInterviewer: string;
  activeSession: string;
  typeYourAnswer: string;
  aiNeedsBackground: string;
  aiNeedsRoleRequirements: string;

  // Footer
  copyright: string;

  // Mobile Nav
  analyzer: string;
  simulator: string;

  // Language Switcher
  language: string;
  english: string;
  vietnamese: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Common
    appName: 'HireSmartAI',
    gapAnalyzer: 'Gap Analyzer',
    interviewSimulator: 'Interview Simulator',

    // Analyzer
    bridgeTheGap: 'Bridge the',
    gap: 'Gap',
    pasteResumeAndJD: 'Paste your resume and the job description. We\'ll show you exactly what\'s missing and how to beat the ATS.',
    readyForInsights: 'Ready for Insights?',
    analyzeCompatibility: 'Analyze Compatibility',
    yourResumeContent: 'Your Resume Content',
    jobDescription: 'Job Description',
    processingWithGemini: 'Processing with Gemini',
    processingDescription: 'Cross-referencing keywords, checking ATS compliance, and building your gap report...',
    aiSummary: 'AI Summary',
    missingSkills: 'Missing Skills',
    recommendedKeywords: 'Recommended Keywords',
    actionableSuggestions: 'Actionable Suggestions',
    jobMatch: 'Job Match',
    atsHealth: 'ATS Health',
    pasteCVHere: 'Paste the text from your CV here...',
    pasteJDHere: 'Paste the target Job Description here...',
    analyzingPotential: 'Analyzing Potential',
    fillFieldsAndAnalyze: 'Fill in the fields on the left and hit Analyze to see your custom career dashboard.',
    pleaseProvideCVAndJD: 'Please provide both your CV and the Job Description.',
    failedToAnalyze: 'Failed to analyze. Please check your API key and try again.',

    // Simulator
    aiInterviewSimulator: 'AI Interview Simulator',
    practiceDescription: 'Practice with a Senior Hiring Manager specialized in the role you\'re targeting. Receive real-time questions and build confidence.',
    enterInterviewRoom: 'Enter Interview Room',
    simulatorInfo: 'The simulator will ask questions one by one. Treat it like a real interview for best results.',
    seniorInterviewer: 'Senior Interviewer',
    activeSession: 'Active Session',
    typeYourAnswer: 'Type your answer here...',
    aiNeedsBackground: 'The AI needs to know your background...',
    aiNeedsRoleRequirements: 'The AI needs to know the role requirements...',

    // Footer
    copyright: '© 2024 HireSmart AI. Helping candidates bridge the gap between CV and JD.',

    // Mobile Nav
    analyzer: 'Analyzer',
    simulator: 'Simulator',

    // Language Switcher
    language: 'Language',
    english: 'English',
    vietnamese: 'Vietnamese'
  },
  vi: {
    // Common
    appName: 'HireSmartAI',
    gapAnalyzer: 'Phân Tích Khoảng Cách',
    interviewSimulator: 'Mô Phỏng Phỏng Vấn',

    // Analyzer
    bridgeTheGap: 'Bridge the',
    gap: 'Gap',
    pasteResumeAndJD: 'Dán CV và mô tả công việc của bạn. Chúng tôi sẽ cho bạn biết chính xác những gì còn thiếu và cách vượt qua hệ thống theo dõi ứng viên.',
    readyForInsights: 'Sẵn Sàng Cho Phân Tích?',
    analyzeCompatibility: 'Phân Tích Tương Thích',
    yourResumeContent: 'Nội Dung CV Của Bạn',
    jobDescription: 'Mô Tả Công Việc',
    processingWithGemini: 'Đang Xử Lý Với Gemini',
    processingDescription: 'Đang so sánh từ khóa, kiểm tra tuân thủ ATS và xây dựng báo cáo khoảng cách của bạn...',
    aiSummary: 'Tóm Tắt AI',
    missingSkills: 'Kỹ Năng Còn Thiếu',
    recommendedKeywords: 'Từ Khóa Đề Xuất',
    actionableSuggestions: 'Đề Xuất Hành Động',
    jobMatch: 'Độ Phù Hợp Công Việc',
    atsHealth: 'Sức Khỏe ATS',
    pasteCVHere: 'Dán nội dung CV của bạn ở đây...',
    pasteJDHere: 'Dán mô tả công việc mục tiêu ở đây...',
    analyzingPotential: 'Đang Phân Tích Tiềm Năng',
    fillFieldsAndAnalyze: 'Điền các trường bên trái và nhấn Phân Tích để xem bảng điều khiển sự nghiệp tùy chỉnh của bạn.',
    pleaseProvideCVAndJD: 'Vui lòng cung cấp cả CV và Mô tả Công việc của bạn.',
    failedToAnalyze: 'Phân tích thất bại. Vui lòng kiểm tra khóa API của bạn và thử lại.',

    // Simulator
    aiInterviewSimulator: 'Mô Phỏng Phỏng Vấn AI',
    practiceDescription: 'Luyện tập với một Quản lý Tuyển dụng Cấp cao chuyên về vị trí bạn đang nhắm đến. Nhận câu hỏi thời gian thực và xây dựng sự tự tin.',
    enterInterviewRoom: 'Vào Phòng Phỏng Vấn',
    simulatorInfo: 'Trình mô phỏng sẽ đặt câu hỏi từng câu một. Hãy đối xử như một cuộc phỏng vấn thực sự để đạt kết quả tốt nhất.',
    seniorInterviewer: 'Nhà Phỏng Vấn Cấp Cao',
    activeSession: 'Phiên Hoạt Động',
    typeYourAnswer: 'Nhập câu trả lời của bạn ở đây...',
    aiNeedsBackground: 'AI cần biết nền tảng của bạn...',
    aiNeedsRoleRequirements: 'AI cần biết yêu cầu công việc...',

    // Footer
    copyright: '© 2024 HireSmart AI. Giúp ứng viên lấp đầy khoảng cách giữa CV và JD.',

    // Mobile Nav
    analyzer: 'Phân Tích',
    simulator: 'Mô Phỏng',

    // Language Switcher
    language: 'Ngôn Ngữ',
    english: 'Tiếng Anh',
    vietnamese: 'Tiếng Việt'
  }
};

import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { githubService } from '../apis/githubIssue.api';
import EpisodeViewer from '../components/EpisodeViewer';
import ProgressBar from '../components/ProgressBar';
import { useEffect, useState } from 'react';
interface EpisodeDetail {
  title: string;
  body: string;
  created_at: string;
}

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(18);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 300px 이상 스크롤 시 버튼 표시
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data: episode, isLoading } = useQuery<EpisodeDetail>({
    queryKey: ['episode', id],
    queryFn: () => githubService.getEpisodeDetail(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center py-20 text-gray-500 font-serif">원고를 펼치는 중...</div>;

  return (
    <article className="max-w-2xl mx-auto px-4 relative overflow-x-hidden">
 
      <ProgressBar />
  
      <div className="flex justify-between items-center mb-10 border-b pb-4">
        <button 
          onClick={() => navigate('/')}
          className="text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          목록으로
        </button>
        <div className="flex gap-4">
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full shadow-inner">
          <button 
            onClick={() => setFontSize(prev => Math.max(prev - 2, 14))}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-blue-600 transition-all text-xs font-bold"
          >
            A-
          </button>
          <span className="text-[10px] font-mono text-gray-400 w-6 text-center">{fontSize}</span>
          <button 
            onClick={() => setFontSize(prev => Math.min(prev + 2, 32))}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-blue-600 transition-all text-xs font-bold"
          >
            A+
          </button>
        </div>
        </div>
      </div>

      {/* 헤더 */}
      <header className="bg-ivory mb-12 text-center">
        <h1 className="font-serif font-bold text-gray-900 leading-tight mb-4 transition-[font-size] duration-200"
        style={{ fontSize: `${fontSize}px` }} 
        >
          {episode?.title}
        </h1>
        <p className="text-gray-400 font-light italic">
          작성일: {new Date(episode?.created_at ||'').toLocaleDateString()}
        </p>
      </header>

      <section style={{ fontSize: `${fontSize}px` }} className="transition-[font-size] duration-200">
        {episode?.body ? (
          <EpisodeViewer content={episode.body} />
        ) : (
          <div className="py-20 text-center text-gray-300 italic font-mono">404 New ERRRRRRRRRRRRRA.</div>
        )}
      </section>

      <div className="fixed bottom-8 left-0 w-full flex justify-center pointer-events-none z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`p-4 bg-gray-900 text-white rounded-full shadow-2xl transition-all duration-500 pointer-events-auto hover:bg-blue-600 active:scale-90 ${
            showTopButton ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-50'
          }`}
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M12 4v16" />
          </svg>
        </button>
      </div>

      {/* 하단 푸터 (버튼 제거 버전) */}
      <footer className="mt-32 pb-20 border-t border-gray-100 text-center text-gray-300 text-xs font-mono">
        © DEV_HANSU. ALL RIGHTS RESERVED.
      </footer>
    </article>
  );
};

export default DetailPage;
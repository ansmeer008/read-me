import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { githubService } from '../apis/githubIssue.api';
import EpisodeViewer from '../components/EpisodeViewer';
import ProgressBar from '../components/ProgressBar';
import { useEffect, useState } from 'react';
import { GitHubIssueResponse } from '../types/github';
import { useDeleteEpisode } from '../hooks/useDeleteEpisode';
import {
  ChevronLeftIcon,
  TrashIcon,
  EditIcon,
  ArrowUpIcon,
} from '../components/icons';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(18);
  const [showTopButton, setShowTopButton] = useState(false);
  const { mutate: deleteEpisode, isPending: isDeleting } = useDeleteEpisode();

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

  const { data: episode, isLoading } = useQuery<GitHubIssueResponse>({
    queryKey: ['episode', id],
    queryFn: () => githubService.getEpisodeDetail(Number(id)),
    enabled: !!id,
  });

  const handleDelete = () => {
    if (!id || isDeleting) return;

    if (window.confirm('이 원고를 삭제하시겠습니까?')) {
      deleteEpisode(Number(id));
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-gray-500 font-serif">
        원고를 펼치는 중...
      </div>
    );

  return (
    <article className="max-w-2xl mx-auto px-4 relative overflow-x-hidden">
      <ProgressBar />

      <div className="flex justify-between items-center  border-b pb-4 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <ChevronLeftIcon />
            목록으로
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full shadow-inner">
            <button
              onClick={() => setFontSize((prev) => Math.max(prev - 2, 14))}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-blue-600 transition-all text-xs font-bold"
            >
              A-
            </button>
            <span className="text-[10px] font-mono text-gray-400 w-6 text-center">
              {fontSize}
            </span>
            <button
              onClick={() => setFontSize((prev) => Math.min(prev + 2, 32))}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-blue-600 transition-all text-xs font-bold"
            >
              A+
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-4 mb-6">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`cursor-pointer flex items-center gap-1 transition-colors text-sm ${
            isDeleting
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:text-red-500'
          }`}
        >
          <TrashIcon />
          {isDeleting ? '삭제 중...' : '삭제'}
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => navigate(`/edit?id=${id}`)}
          disabled={isDeleting}
          className={`cursor-pointer flex items-center gap-1 transition-colors text-sm ${
            isDeleting
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <EditIcon />
          수정
        </button>
      </div>
      {/* 헤더 */}
      <header className="mb-12 text-center">
        <h1
          className="font-serif font-bold text-gray-900 leading-tight mb-4 transition-[font-size] duration-200"
          style={{ fontSize: `${fontSize}px` }}
        >
          {episode?.title}
        </h1>
        <p className="text-gray-400 font-light italic">
          작성일: {new Date(episode?.created_at || '').toLocaleDateString()}
        </p>
      </header>

      <section
        style={{ fontSize: `${fontSize}px` }}
        className="transition-[font-size] duration-200"
      >
        {episode?.body ? (
          <EpisodeViewer content={episode.body} />
        ) : (
          <div className="py-20 text-center text-gray-300 italic font-mono">
            404 New ERRRRRRRRRRRRRA.
          </div>
        )}
      </section>

      <div className="fixed bottom-8 left-0 w-full flex justify-center pointer-events-none z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`cursor-pointer p-4 bg-gray-900 text-white rounded-full shadow-2xl transition-all duration-500 pointer-events-auto hover:bg-blue-600 active:scale-90 ${
            showTopButton
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-20 scale-50'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon />
        </button>
      </div>
    </article>
  );
};

export default DetailPage;

import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { githubService } from '../apis/githubIssue.api';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: episode, isLoading } = useQuery({
    queryKey: ['episode', id],
    queryFn: () => githubService.getEpisodeDetail(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center py-20 text-gray-500 font-serif">원고를 펼치는 중...</div>;

  return (
    <article className="max-w-2xl mx-auto">
      {/* 뷰어 상단 바 */}
      <div className="flex justify-between items-center mb-10 border-b pb-4">
        <button 
          onClick={() => navigate('/')}
          className="text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="15 19l-7-7 7-7" />
          </svg>
          목록으로
        </button>
        <div className="flex gap-4">
            {/* 여기에 폰트 크기 조절 등 뷰어 옵션 버튼을 추가할 수 있습니다 */}
        </div>
      </div>

      {/* 본문 영역 */}
      <header className="bg-ivory mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold text-gray-900 leading-tight mb-4">
          {episode?.title}
        </h1>
        <p className="text-gray-400 font-light italic">
          작성일: {new Date(episode?.created_at).toLocaleDateString()}
        </p>
      </header>

      {/* 소설 내용: font-serif와 leading-loose로 가독성 확보 */}
      <div className="font-serif text-xl text-gray-800 leading-loose whitespace-pre-wrap break-words px-2 sm:px-0">
        {episode?.body}
      </div>

      <div className="mt-20 pt-10 border-t border-gray-100 flex justify-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-6 py-2 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors"
        >
          맨 위로 이동
        </button>
      </div>
    </article>
  );
};

export default DetailPage;
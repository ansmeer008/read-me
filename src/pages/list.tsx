import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { githubService } from '../apis/githubIssue.api';

const ListPage = () => {
  const {
    data: episodes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['episodes'],
    queryFn: () => githubService.getEpisodeList(),
  });

  if (isLoading)
    return (
      <div className="text-center py-20 text-gray-500">
        원고 목록을 불러오는 중...
      </div>
    );
  if (isError)
    return (
      <div className="text-center py-20 text-red-500">
        목록을 가져오지 못했습니다.
      </div>
    );

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">연재 목록</h1>
        <span className="text-sm text-gray-500">
          총 {episodes?.length || 0}화
        </span>
      </div>
      <div className="grid gap-4">
        {episodes?.map((ep) => (
          <Link
            key={ep.number}
            to={`/episode/${ep.number}`}
            className={`group block p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all  ${
              ep._isOptimistic
                ? 'border-yellow-200 opacity-70'
                : 'border-gray-200 hover:shadow-md hover:border-blue-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {ep.title}
                  {ep._isOptimistic && (
                    <span className="ml-2 text-xs font-normal text-yellow-500">
                      반영 중...
                    </span>
                  )}
                </h2>
                <p className="text-gray-400 text-sm mt-2 font-light">
                  {new Date(ep.created_at).toLocaleDateString()} · 조회수{' '}
                  {ep.comments}
                </p>
              </div>
              <div className="text-gray-300 group-hover:text-blue-400 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        to="/write"
        className="fixed bottom-30 right-8 flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all active:scale-95 focus:outline-none text-3xl"
        aria-label="새 글 작성"
      >
        +
      </Link>
    </section>
  );
};

export default ListPage;

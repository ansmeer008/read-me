// src/pages/EditPage.tsx
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { githubService } from '../apis/githubIssue.api';
import { WriteForm, EpisodeFormValues } from '../components/WriteForm';
import { useUpdateEpisode } from '../hooks/useUpdateEpisode';
import { GitHubIssueResponse } from '../types/github';

export default function EditPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  // 기존 데이터 불러오기 (폼의 initialValues로 사용)
  const { data: episode, isLoading } = useQuery<GitHubIssueResponse>({
    queryKey: ['episode', id],
    queryFn: () => githubService.getEpisodeDetail(Number(id)),
    enabled: !!id,
  });

  // 수정 Mutation 훅
  const { mutate: updateEpisode, isPending: isUpdating } = useUpdateEpisode();

  const handleUpdate = (values: EpisodeFormValues) => {
    if (!id) return;

    // 낙관적 업데이트가 포함된 수정 실행
    updateEpisode({
      id: Number(id),
      title: values.title,
      content: values.content,
    });
  };

  if (isLoading)
    return <div className="py-20 text-center font-serif">원고 로드 중...</div>;

  return (
    <main className="max-w-4xl mx-auto px-4">
      <WriteForm
        initialValues={{
          title: episode?.title || '',
          content: episode?.body || '',
        }}
        onSubmit={handleUpdate}
        isPending={isUpdating}
        submitLabel="수정 완료"
      />
    </main>
  );
}

import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { githubService } from '../apis/githubIssue.api';
import { WriteForm, EpisodeFormValues } from '../components/WriteForm';
import { useUpdateEpisode } from '../hooks/useUpdateEpisode';
import { GitHubIssueResponse } from '../types/github';

export default function EditPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const { data: episode, isLoading } = useQuery<GitHubIssueResponse>({
    queryKey: ['episode', id],
    queryFn: () => githubService.getEpisodeDetail(Number(id)),
    enabled: !!id,
  });

  const { mutate: updateEpisode, isPending: isUpdating } = useUpdateEpisode();

  const handleUpdate = (values: EpisodeFormValues) => {
    if (!id) return;

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

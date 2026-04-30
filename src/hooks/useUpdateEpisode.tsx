import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useOptimisticMutation } from './useOptimisticMutation';
import { GitHubIssueResponse } from '../types/github';
import { githubService } from '../apis/githubIssue.api';
import toast from 'react-hot-toast';
import { useSyncAfterMutation } from './useSyncAfterMutation';

export function useUpdateEpisode() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { sync } = useSyncAfterMutation();

  return useOptimisticMutation<
    GitHubIssueResponse[],
    { id: number; title: string; content: string }
  >({
    queryKey: ['episodes'],
    mutationFn: ({ id, title, content }) =>
      githubService.updateEpisode(id, title, content),

    onSuccess: (updatedEpisode: GitHubIssueResponse, { id }) => {
      toast.success('원고가 수정되었습니다.');

      // 목록 캐시 수동 업데이트
      queryClient.setQueryData<GitHubIssueResponse[]>(
        ['episodes'],
        (old = []) =>
          old.map((ep) =>
            ep.number === id ? { ...updatedEpisode, _isOptimistic: true } : ep,
          ),
      );

      queryClient.setQueryData<GitHubIssueResponse>(['episode', String(id)], {
        ...updatedEpisode,
        _isOptimistic: true,
      });

      // 상세 페이지로 즉시 이동
      navigate(`/episode/${id}`);

      sync((freshData) => {
        const target = freshData.find((ep) => ep.number === id);
        return target?.updated_at === updatedEpisode.updated_at;
      });
    },
    onError: () => {
      toast.error('수정에 실패했습니다.');
    },
  });
}

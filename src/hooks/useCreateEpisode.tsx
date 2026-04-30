import { GitHubIssueResponse } from '../types/github';
import { githubService } from '../apis/githubIssue.api';
import { useNavigate } from 'react-router-dom';
import { useOptimisticMutation } from './useOptimisticMutation';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useSyncAfterMutation } from './useSyncAfterMutation';

export function useCreateEpisode() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { sync } = useSyncAfterMutation();

  return useOptimisticMutation<
    GitHubIssueResponse[],
    { title: string; content: string }
  >({
    queryKey: ['episodes'],
    mutationFn: ({ title, content }) =>
      githubService.createEpisode(title, content),
    onSuccess: (createdEpisode: GitHubIssueResponse) => {
      toast.success('원고가 등록되었습니다.');

      queryClient.setQueryData<GitHubIssueResponse[]>(
        ['episodes'],
        (old = []) => [
          ...old,
          {
            ...createdEpisode,
            _isOptimistic: true,
          } as GitHubIssueResponse,
        ],
      );

      navigate('/');

      sync((data) => data.some((ep) => ep.number === createdEpisode.number));
    },
    onError: () => {
      toast.error('등록에 실패했습니다.');
    },
  });
}

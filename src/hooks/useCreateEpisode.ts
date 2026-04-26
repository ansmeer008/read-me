import { GitHubIssueResponse } from '../types/github';
import { githubService } from '../apis/githubIssue.api';
import { useNavigate } from 'react-router-dom';
import { useOptimisticMutation } from './useOptimisticMutation';
import toast from 'react-hot-toast';

export function useCreateEpisode() {
  const navigate = useNavigate();

  return useOptimisticMutation<
    GitHubIssueResponse[],
    { title: string; content: string }
  >({
    queryKey: ['episodes'],
    mutationFn: ({ title, content }) =>
      githubService.createEpisode(title, content),
    updater: (old = [], newEpisode) => [
      ...old,
      {
        id: Date.now(),
        number: Date.now(),
        title: newEpisode.title,
        created_at: new Date().toISOString(),
        _isOptimistic: true,
      } as GitHubIssueResponse,
    ],
    onSuccess: () => {
      toast.success('원고가 등록되었습니다.');
      navigate('/');
    },
  });
}

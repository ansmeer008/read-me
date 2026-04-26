import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useOptimisticMutation } from './useOptimisticMutation';
import { GitHubIssueResponse } from '../types/github';
import { githubService } from '../apis/githubIssue.api';
import toast from 'react-hot-toast';

export function useUpdateEpisode() {
  const navigate = useNavigate();

  return useOptimisticMutation<
    GitHubIssueResponse[],
    { id: number; title: string; content: string }
  >({
    queryKey: ['episodes'],
    mutationFn: ({ id, title, content }) =>
      githubService.updateEpisode(id, title, content),

    // 낙관적 업데이트: 리스트에서 해당 ID의 에피소드만 교체
    updater: (old = [], { id, title, content }) =>
      old.map((ep) =>
        ep.number === id
          ? { ...ep, title, body: content, _isOptimistic: true }
          : ep,
      ),

    onSuccess: (_, { id }) => {
      toast.success('원고가 수정되었습니다.');
      navigate(`/episode/${id}`);
    },
  });
}

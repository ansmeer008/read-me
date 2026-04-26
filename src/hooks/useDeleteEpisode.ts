import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { githubService } from '../apis/githubIssue.api';
import { GitHubIssueResponse } from '../types/github';
import { useOptimisticMutation } from './useOptimisticMutation';
import toast from 'react-hot-toast';

export function useDeleteEpisode() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useOptimisticMutation<GitHubIssueResponse[], number>({
    queryKey: ['episodes'], // 목록 쿼리 키
    mutationFn: (issueNumber) => githubService.deleteEpisode(issueNumber),
    updater: (old = [], deleteId) => old.filter((ep) => ep.number !== deleteId),
    onSuccess: () => {
      toast.error('원고가 삭제되었습니다.');
      // 상세 페이지 정보는 더 이상 유효하지 않으므로 캐시 삭제
      queryClient.removeQueries({ queryKey: ['episode'] });
      navigate('/');
    },
  });
}

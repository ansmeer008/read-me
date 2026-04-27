import { GitHubIssueResponse } from '../types/github';
import { githubService } from '../apis/githubIssue.api';
import { useNavigate } from 'react-router-dom';
import { useOptimisticMutation } from './useOptimisticMutation';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export function useCreateEpisode() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // const syncAfterCreate = async (createdNumber: number) => {
  //   for (const delay of [3000, 3000, 5000]) {
  //     await new Promise((r) => setTimeout(r, delay));

  //     try {
  //       const episode = await githubService.getEpisodeDetail(createdNumber);

  //       if (episode) {
  //         queryClient.setQueryData<GitHubIssueResponse[]>(
  //           ['episodes'],
  //           (old = []) =>
  //             old.map((ep) =>
  //               ep.number === createdNumber
  //                 ? { ...episode, _isOptimistic: false }
  //                 : ep,
  //             ),
  //         );
  //         return;
  //       }
  //     } catch {}
  //   }
  // };

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

      // syncAfterCreate(createdEpisode.number);
    },
    onError: () => {
      toast.error('등록에 실패했습니다.');
    },
  });
}

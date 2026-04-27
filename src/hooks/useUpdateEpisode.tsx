import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useOptimisticMutation } from './useOptimisticMutation';
import { GitHubIssueResponse } from '../types/github';
import { githubService } from '../apis/githubIssue.api';
import toast from 'react-hot-toast';

export function useUpdateEpisode() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 수정 후 API 반영 여부를 체크하고 캐시를 최신화하는 함수
  // const syncAfterUpdate = async (id: number) => {
  //   // 생성과 마찬가지로 점진적 딜레이를 주며 확인
  //   for (const delay of [3000, 3000, 5000]) {
  //     await new Promise((r) => setTimeout(r, delay));

  //     try {
  //       const updatedEpisode = await githubService.getEpisodeDetail(id);

  //       // API 응답 데이터가 우리가 보낸 최신 데이터인지 확인 (필요시 상세 조건 추가)
  //       if (updatedEpisode) {
  //         queryClient.setQueryData<GitHubIssueResponse[]>(
  //           ['episodes'],
  //           (old = []) =>
  //             old.map((ep) =>
  //               ep.number === id
  //                 ? { ...updatedEpisode, _isOptimistic: false }
  //                 : ep,
  //             ),
  //         );

  //         // 상세 페이지 쿼리도 같이 업데이트 해주면 좋습니다.
  //         queryClient.setQueryData(['episode', id], updatedEpisode);
  //         return;
  //       }
  //     } catch (e) {
  //       console.error('Sync failed', e);
  //     }
  //   }
  // };

  return useOptimisticMutation<
    GitHubIssueResponse[],
    { id: number; title: string; content: string }
  >({
    queryKey: ['episodes'],
    mutationFn: ({ id, title, content }) =>
      githubService.updateEpisode(id, title, content),

    // 1. updater는 비워두거나 즉각적인 UI 반응용으로만 사용 (선택 사항)
    // 2. onSuccess에서 서버 응답을 기반으로 확실하게 처리
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

      // 상세 페이지로 즉시 이동
      navigate(`/episode/${id}`);

      // 백그라운드에서 동기화 시작
      // syncAfterUpdate(id);
    },
    onError: () => {
      toast.error('수정에 실패했습니다.');
    },
  });
}

import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { GitHubIssueResponse } from '../types/github';
import { githubService } from '../apis/githubIssue.api';

/**
 * polling을 통해 낙관적 데이터와 실제 데이터의 sync를 맞춥니다.
 */
export function useSyncAfterMutation() {
  const queryClient = useQueryClient();

  const sync = useCallback(
    (checkFn: (data: GitHubIssueResponse[]) => boolean) => {
      let attempts = 0;
      const MAX_ATTEMPTS = 10;

      const poll = async () => {
        attempts++;

        const freshList = await githubService.getEpisodeList();

        if (checkFn(freshList)) {
          queryClient.setQueryData(['episodes'], freshList);
        } else if (attempts < MAX_ATTEMPTS) {
          setTimeout(poll, 3000 * attempts);
        }
      };

      setTimeout(poll, 5000);
    },
    [queryClient],
  );

  return { sync };
}

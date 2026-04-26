import { Endpoints } from '@octokit/types';

export type GitHubIssueResponse =
  Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data'][number];

export interface CreateEpisodeRequest {
  title: string;
  body: string;
  labels?: string[];
}

export interface UpdateEpisodeRequest {
  title?: string;
  body?: string;
  state?: 'open' | 'closed';
}

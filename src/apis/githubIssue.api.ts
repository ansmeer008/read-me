import { createClient } from '../utils/fetchClient';
import {
  GitHubIssueResponse,
  CreateEpisodeRequest,
  UpdateEpisodeRequest,
} from '../types/github';

const baseUrl = process.env.GITHUB_BASE_URL;
const token = process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_REPO_OWNER;
const repoName = process.env.GITHUB_REPO_NAME;

const githubClient = createClient({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
});

export const githubService = {
  async getEpisodeList(): Promise<GitHubIssueResponse[]> {
    const { data } = await githubClient.get<GitHubIssueResponse[]>(
      `/repos/${owner}/${repoName}/issues`,
      {
        params: {
          state: 'open',
          sort: 'created',
          direction: 'asc',
          labels: 'novel-episode',
        },
      },
    );

    return data.filter((issue) => !issue.pull_request);
  },
  async getEpisodeDetail(issueNumber: number): Promise<GitHubIssueResponse> {
    const { data } = await githubClient.get<GitHubIssueResponse>(
      `/repos/${owner}/${repoName}/issues/${issueNumber}`,
    );
    return data;
  },
  async createEpisode(
    title: string,
    content: string,
  ): Promise<GitHubIssueResponse> {
    const body: CreateEpisodeRequest = {
      title,
      body: content,
      labels: ['novel-episode'],
    };

    const { data } = await githubClient.post<GitHubIssueResponse>(
      `/repos/${owner}/${repoName}/issues`,
      body,
    );
    return data;
  },
  async updateEpisode(
    issueNumber: number,
    title: string,
    content: string,
  ): Promise<GitHubIssueResponse> {
    const body: UpdateEpisodeRequest = {
      title,
      body: content,
    };

    const { data } = await githubClient.patch<GitHubIssueResponse>(
      `/repos/${owner}/${repoName}/issues/${issueNumber}`,
      body,
    );
    return data;
  },
  async deleteEpisode(issueNumber: number): Promise<void> {
    await githubClient.patch(
      `/repos/${owner}/${repoName}/issues/${issueNumber}`,
      {
        state: 'closed',
      },
    );
  },
};

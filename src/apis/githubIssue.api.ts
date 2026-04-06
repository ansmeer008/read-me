import { createClient } from '../utils/fetchClient';

const baseUrl = process.env.GITHUB_BASE_URL
const token = process.env.GITHUB_TOKEN
const owner  = process.env.GITHUB_REPO_OWNER
const repoName =  process.env.GITHUB_REPO_NAME

const githubClient = createClient({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
    }
})

export const githubService = {
    async getEpisodeList(){
        const { data } = await githubClient.get(`/repos/${owner}/${repoName}/issues`, {
            params: { state: 'open', sort: 'created', direction: 'asc', labels: 'novel-episode' }
          });
          
          return data.filter((issue: any) => !issue.pull_request);
    },
    async getEpisodeDetail(issueNumber: number) {
        const { data } = await githubClient.get(`/repos/${owner}/${repoName}/issues/${issueNumber}`);
        return data;
      },
      async createEpisode(title: string, content: string) {
        const { data } = await githubClient.post(`/repos/${owner}/${repoName}/issues`, {
          title,
          body: content,
          labels: ['novel-episode'] // 라벨로 데이터 구분 가능
        });
        return data;
      },
      async updateEpisode(issueNumber: number, title: string, content: string) {
        const { data } = await githubClient.patch(`/repos/${owner}/${repoName}/issues/${issueNumber}`, {
          title,
          body: content
        });
        return data;
      },
      async deleteEpisode(issueNumber: number) {
        await githubClient.patch(`/repos/${owner}/${repoName}/issues/${issueNumber}`, {
          state: 'closed'
        });
      }
}
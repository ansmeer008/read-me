export interface GitHubIssueResponse {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  comments: number;
  labels?: Array<{ id?: number; name: string; color?: string }>;
  pull_request?: unknown;
  _isOptimistic?: boolean;
}

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

export interface GitHubErrorResponse {
  message: string;
  errors?: Array<{
    resource: string;
    field: string;
    code: string;
  }>;
  documentation_url?: string;
}

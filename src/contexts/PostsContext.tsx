import {
  ReactNode,
  useEffect,
  useState,
  useCallback,
  createContext,
} from "react";

import { api } from "../lib/axios";

export interface PostData {
  title: string;
  body: string;
  created_at: string;
  number: string;
  html_url: string;
  comments: string;
  user: {
    login: string;
  };
}

interface PostsContextType {
  posts: PostData[];
  isLoading: boolean;
  fetchPosts: (query?: string) => Promise<void>;
  getPostDetails: (id: string) => Promise<PostData>;
}

interface PostsProviderProps {
  children: ReactNode;
}

const username = import.meta.env.VITE_GITHUB_USERNAME;
const repoName = import.meta.env.VITE_GITHUB_REPONAME;

export const PostsContext = createContext({} as PostsContextType);

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = useCallback(
    async (query: string = "") => {
      try {
        const response = await api.get(
          `/search/issues?q=${query}%20repo:${username}/${repoName}`
        );

        setPosts(response.data.items);
      } finally {
        setIsLoading(false);
      }
    },
    [posts]
  );

  const getPostDetails = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/repos/${username}/${repoName}/issues/${id}`
      );

      return response.data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{ posts, isLoading, fetchPosts, getPostDetails }}
    >
      {children}
    </PostsContext.Provider>
  );
}

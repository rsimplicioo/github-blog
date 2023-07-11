import { useContext } from "react";

import { Post } from "./components/Post";
import { Profile } from "./components/Profile";
import { SearchInput } from "./components/SearchInput";

import { PostsListContainer } from "./styles";
import { PostsContext } from "../../contexts/PostsContext";
import { Spinner } from "../../components/Spinner";

export function Home() {
  const { posts, isLoading } = useContext(PostsContext);

  return (
    <div>
      <Profile />
      <SearchInput />
      {isLoading ? (
        <Spinner />
      ) : (
        <PostsListContainer>
          {posts.map((post) => (
            <Post key={post.number} post={post} />
          ))}
        </PostsListContainer>
      )}
    </div>
  );
}

import { PostData } from "../../../../contexts/PostsContext";
import { relativeDateFormatter } from "../../../../utils/formatter";

import { PostContainer } from "./styles";

interface PospProps {
  post: PostData;
}

export function Post({ post }: PospProps) {
  const formattedDate = relativeDateFormatter(post.created_at);

  return (
    <PostContainer to={`/post/${post.number}`}>
      <div>
        <strong>{post.title}</strong>
        <span>{formattedDate}</span>
      </div>
      <p>{post.body}</p>
    </PostContainer>
  );
}

import { useContext, useEffect, useState } from "react";
import { PostHeader } from "./components/PostHeader";
import { PostPageContainer } from "./styles";
import { PostData, PostsContext } from "../../contexts/PostsContext";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/Spinner";

export function PostPage() {
  const { id } = useParams();
  const { getPostDetails, isLoading } = useContext(PostsContext);

  const [postData, setPostData] = useState<PostData>({} as PostData);

  useEffect(() => {
    async function getPost() {
      const response = await getPostDetails(id);
      setPostData(response);
    }

    if (id) {
      getPost();
    }
  }, []);

  return (
    <PostPageContainer>
      {isLoading ? <Spinner /> : <PostHeader post={postData} />}
    </PostPageContainer>
  );
}

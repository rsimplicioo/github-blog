import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExternalLink } from "../../../../components/ExternalLink";
import { PostHeaderContainer } from "./styles";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faCalendar,
  faChevronLeft,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { PostData } from "../../../../contexts/PostsContext";
import { relativeDateFormatter } from "../../../../utils/formatter";

interface PostHeaderProps {
  post: PostData;
}

export function PostHeader({ post }: PostHeaderProps) {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  const formattedDate = relativeDateFormatter(post.created_at);

  return (
    <PostHeaderContainer>
      <header>
        <ExternalLink
          as="button"
          onClick={handleGoBack}
          icon={<FontAwesomeIcon icon={faChevronLeft} />}
          text="voltar"
          variant="iconLeft"
        />
        <ExternalLink
          text="Ver no Github"
          href={post.html_url}
          target="_blank"
        />
      </header>

      <h1>{post.title}</h1>
      <ul>
        <li>
          <FontAwesomeIcon icon={faGithub} />
          {post.user?.login}
        </li>
        <li>
          <FontAwesomeIcon icon={faCalendar} />
          {formattedDate}
        </li>
        <li>
          <FontAwesomeIcon icon={faComment} />
          {post.comments} comentários
        </li>
      </ul>
    </PostHeaderContainer>
  );
}

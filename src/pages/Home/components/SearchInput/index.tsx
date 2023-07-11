import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SearchInputContainer } from "./styles";
import { useContext } from "react";
import { PostsContext } from "../../../../contexts/PostsContext";

const searchFormSchema = zod.object({
  query: zod.string(),
});

type SearchFormInput = zod.infer<typeof searchFormSchema>;

export function SearchInput() {
  const { posts, fetchPosts } = useContext(PostsContext);

  const postsLength = posts.length;

  const { register, handleSubmit } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchPosts(data: SearchFormInput) {
    await fetchPosts(data.query);
  }

  return (
    <SearchInputContainer onSubmit={handleSubmit(handleSearchPosts)}>
      <header>
        <h3>Publicações</h3>
        <span>{postsLength} publicações</span>
      </header>

      <input type="text" placeholder="Buscar conteúdo" {...register("query")} />
    </SearchInputContainer>
  );
}

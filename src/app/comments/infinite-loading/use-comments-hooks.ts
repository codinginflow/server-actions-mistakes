import { GetCommentsResponse } from "@/app/api/comments/route";
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import ky from "ky";
import { createComment } from "./actions";

const queryKey: QueryKey = ["comments"];

export function useComments() {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      ky
        .get(`/api/comments?${pageParam ? `cursor=${pageParam}` : ""}`)
        .json<GetCommentsResponse>(),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { text: string }) => {
      const { data, error } = await createComment(input);

      if (error !== undefined) {
        throw new Error(error);
      }

      return data;
    },
    onSuccess: async (newComment) => {
      // Update the React Query cache with the new comment so we don't have to wait for the refetch
      // To learn more, search for "React Query Coding in Flow" on YouTube.
      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<
        InfiniteData<GetCommentsResponse, number | undefined>
      >(queryKey, (oldData) => {
        const firstPage = oldData?.pages[0];

        if (firstPage) {
          return {
            ...oldData,
            pages: [
              {
                ...firstPage,
                comments: [newComment, ...firstPage.comments],
              },
              ...oldData.pages.slice(1),
            ],
          };
        }
      });

      // Invalidate the list only if we haven't fetched any pages yet
      queryClient.invalidateQueries({
        queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });
    },
  });
}

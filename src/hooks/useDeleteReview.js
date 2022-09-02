import { useMutation, useApolloClient } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const client = useApolloClient();
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (deleteReviewId) => {
    await mutate({
      variables: {
        deleteReviewId,
      },
    });
  };

  return [deleteReview, result];
};

export default useDeleteReview;

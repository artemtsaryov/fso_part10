import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useSignIn = () => {
  const client = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    try {
      return await mutate({
        variables: {
          review: {
            repositoryName,
            ownerName,
            rating: Number(rating),
            text: text || undefined,
          },
        },
      });
    } catch (e) {
      throw e;
    }
  };

  return [createReview, result];
};

export default useSignIn;

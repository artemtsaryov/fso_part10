import { useQuery } from "@apollo/client";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id, firstReviews) => {
  const { data, loading, fetchMore, error } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: {
      id,
      first: firstReviews,
    },
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first: firstReviews,
        id,
      },
    });
  };

  return {
    repository: error || loading ? null : data.repository,
    fetchMore: handleFetchMore,
    loading,
  };
};

export default useRepository;

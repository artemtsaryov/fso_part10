import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (first, order, searchKeyword = "") => {
  let orderBy = "CREATED_AT";
  let orderDirection = "DESC";

  switch (order) {
    case "CREATED_AT":
      break;
    case "RATING_AVERAGE_DESC":
      orderBy = "RATING_AVERAGE";
      break;
    case "RATING_AVERAGE_ASC":
      orderBy = "RATING_AVERAGE";
      orderDirection = "ASC";
      break;
    default:
      break;
  }

  const { data, loading, fetchMore, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      first,
      orderBy,
      orderDirection,
      searchKeyword,
    },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        first,
        orderBy,
        orderDirection,
        searchKeyword,
      },
    });
  };

  return {
    repositories: error || loading ? null : data.repositories,
    fetchMore: handleFetchMore,
    loading,
  };
};

export default useRepositories;

import { useQuery } from "@apollo/client";

import { ME } from "../graphql/queries";

const useMe = (includeReviews = false) => {
  const { data, loading, error, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews,
    },
  });

  return { me: error || loading ? null : data.me, loading, refetch };
};

export default useMe;

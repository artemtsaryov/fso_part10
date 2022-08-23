import { useQuery } from "@apollo/client";

import { ME } from "../graphql/queries";

const useMe = () => {
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });

  return { me: error || loading ? null : data.me, loading };
};

export default useMe;

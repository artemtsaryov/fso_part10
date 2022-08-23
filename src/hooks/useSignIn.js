import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    try {
      const result = await mutate({
        variables: { credentials: { username, password } },
      });
      await authStorage.setAccessToken(result.data.authenticate.accessToken);
      await client.resetStore();

      return result;
    } catch (e) {
      throw e;
    }
  };

  return [signIn, result];
};

export default useSignIn;

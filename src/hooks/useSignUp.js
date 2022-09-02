import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
  const client = useApolloClient();
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    try {
      const result = await mutate({
        variables: { user: { username, password } },
      });
      return result;
    } catch (e) {
      throw e;
    }
  };

  return [signUp, result];
};

export default useSignUp;

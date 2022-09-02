import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      await signIn({ username, password });

      navigate("/repositories", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;

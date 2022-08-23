import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  submit: {
    marginTop: 10,
    padding: 10,
    textAlign: "center",
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    color: "white",
  },
});

const initialValues = {
  login: "",
  password: "",
};

const validationSchema = yup.object().shape({
  login: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { login, password } = values;
    try {
      const { data } = await signIn({ username: login, password });
      navigate("/repositories", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="login" placeholder="Username" />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry={true}
          />
          <Pressable onPress={handleSubmit}>
            <Text style={styles.submit}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;

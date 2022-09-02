import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import * as yup from "yup";

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
  username: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(1, "Username length must be between and 1 and 30 symbols")
    .max(30, "Username length must be between and 1 and 30 symbols"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password length must be between and 5 and 50 symbols")
    .max(50, "Password length must be between and 5 and 50 symbols"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Password confirm is required"),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry={true}
          />
          <FormikTextInput
            name="confirmPassword"
            placeholder="Password confirmation"
            secureTextEntry={true}
          />
          <Pressable onPress={handleSubmit}>
            <Text style={styles.submit}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignInForm;

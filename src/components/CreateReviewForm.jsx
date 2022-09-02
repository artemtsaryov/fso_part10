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
  repositoryName: "",
  ownerName: "",
  rating: "",
  text: null,
};

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required("Repository name is required"),
  ownerName: yup.string().required("Repository owner name is required"),
  rating: yup
    .number("Rating must be a number between 0 and 100")
    .min(0, "Rating cannot be less than 0")
    .max(100, "Rating cannot be greater than 100")
    .required("Rating is required"),
  text: yup.string().nullable(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="ownerName"
            placeholder="Repository owner name"
          />
          <FormikTextInput
            name="repositoryName"
            placeholder="Repository name"
          />
          <FormikTextInput
            name="rating"
            placeholder="Rating between 0 and 100"
          />
          <FormikTextInput name="text" placeholder="Review" multiline={true} />

          <Pressable onPress={handleSubmit}>
            <Text style={styles.submit}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default CreateReviewForm;

import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  textInput: {
    borderColor: theme.colors.textSecondary,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
  textInputError: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ error, ...props }) => {
  const style = error
    ? [styles.textInput, styles.textInputError]
    : styles.textInput;
  return <NativeTextInput style={style} {...props} />;
};

export default TextInput;

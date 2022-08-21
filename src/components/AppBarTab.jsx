import { Text, Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  tab: {
    color: "#FFFFFF",
    padding: 10,
  },
});

const AppBarTab = ({ to, children }) => {
  return (
    <Pressable onPress={null}>
      <Link to={to}>
        <Text style={styles.tab}>{children}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;

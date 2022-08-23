import { Text, Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  tab: {
    color: "#FFFFFF",
    padding: 10,
  },
});

const AppBarTab = ({ to, children, onPress }) => {
  return to ? (
    <Link to={to}>
      <Text style={styles.tab}>{children}</Text>
    </Link>
  ) : (
    <Pressable onPress={onPress}>
      <Text style={styles.tab}>{children}</Text>
    </Pressable>
  );
};

export default AppBarTab;

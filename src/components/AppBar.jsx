import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import useMe from "../hooks/useMe";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: theme.colors.background,
  },
  scrollbox: {
    flexDirection: "row",
  },
});

const AppBar = () => {
  const { me, loading } = useMe();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollbox}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {me ? (
          <AppBarTab onPress={onSignOut}>Sign out</AppBarTab>
        ) : (
          <AppBarTab to="/signin">Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

import RepositoryItem from "./RepositoryItem";
import Review from "./Review";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import { Pressable, View, StyleSheet, FlatList } from "react-native";
import theme from "../theme";
import Text from "./Text";
import * as Linking from "expo-linking";
import { format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  header: {
    marginBottom: 10,
  },
  button: {
    margin: 10,
    padding: 10,
    textAlign: "center",
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    color: "white",
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Repository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository(id, 5);

  const onEndReach = () => {
    fetchMore();
  };

  const openInGithub = () => {
    Linking.openURL(repository.url);
  };

  if (repository) {
    const reviews = repository.reviews.edges.map((edge) => edge.node);

    const header = () => (
      <View style={[styles.container, styles.header]}>
        <RepositoryItem item={repository} />
        <Pressable onPress={openInGithub}>
          <Text style={styles.button}>Open in GitHub</Text>
        </Pressable>
      </View>
    );

    return (
      <FlatList
        data={reviews}
        ListHeaderComponent={header}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item, _index, separators }) => (
          <Review
            rating={item.rating}
            name={item.user.username}
            createdAt={item.createdAt}
            text={item.text}
          />
        )}
        keyExtractor={({ id }) => id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }

  return null;
};

export default Repository;

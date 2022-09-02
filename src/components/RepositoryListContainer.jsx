import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories, header, onEndReach }) => {
  const navigate = useNavigate();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const openRepository = (id) => {
    navigate(`/repositories/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={header}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, _index, separators }) => (
        <Pressable onPress={() => openRepository(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryListContainer;

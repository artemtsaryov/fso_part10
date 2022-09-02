import useMe from "../hooks/useMe";
import Review from "./Review";
import { Pressable, View, StyleSheet, FlatList, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  separator: {
    height: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-evenly",
  },
  button: {
    width: "45%",
  },
  viewButton: {
    padding: 10,
    textAlign: "center",
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    color: "white",
  },
  deleteButton: {
    padding: 10,
    textAlign: "center",
    borderRadius: 6,
    backgroundColor: theme.colors.error,
    color: "white",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { me, refetch } = useMe(true);
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  const onViewRepository = (id) => {
    navigate(`/repositories/${id}`);
  };

  const onDeleteReview = async (id) => {
    try {
      await deleteReview(id);
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const confirmDeleteReview = (id) =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
        },
        { text: "DELETE", onPress: () => onDeleteReview(id) },
      ]
    );

  if (me && me.reviews) {
    const reviews = me.reviews.edges.map((edge) => edge.node);

    return (
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item, _index, separators }) => (
          <View style={styles.container}>
            <Review
              rating={item.rating}
              name={item.repository.fullName}
              createdAt={item.createdAt}
              text={item.text}
            />
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={() => onViewRepository(item.repository.id)}
              >
                <Text style={styles.viewButton}>View repository</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => confirmDeleteReview(item.id)}
              >
                <Text style={styles.deleteButton}>Delete review</Text>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={({ id }) => id}
      />
    );
  }

  return null;
};

export default MyReviews;

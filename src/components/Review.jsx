import { View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";
import { format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  reviewContainer: {
    padding: 10,
  },
  reviewSideContainer: {
    paddingLeft: 10,
  },
  row: {
    flexDirection: "row",
    marginRight: 50,
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: "center",
  },
  ratingText: {
    textAlign: "center",
    color: theme.colors.primary,
  },
  reviewText: {},
});

const Review = ({ rating, name, createdAt, text }) => {
  return (
    <View style={[styles.container, styles.reviewContainer]}>
      <View style={styles.row}>
        <View style={styles.rating}>
          <Text style={styles.ratingText} fontWeight="bold">
            {rating}
          </Text>
        </View>
        <View style={styles.reviewSideContainer}>
          <Text fontWeight="bold">{name}</Text>
          <Text color="textSecondary">
            {format(new Date(createdAt), "dd.MM.yyyy")}
          </Text>
          <Text style={styles.reviewText}>{text}</Text>
        </View>
      </View>
    </View>
  );
};

export default Review;

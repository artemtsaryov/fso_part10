import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
  },
  containterHeader: {
    flexDirection: "row",
  },
  containterStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  containerHeaderDesc: {
    paddingLeft: 10,
    paddingRight: 30,
  },
  containerHeaderDescItem: {
    paddingBottom: 10,
    borderColor: "black",
  },
  containerHeaderDescLang: {
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    color: "white",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
});

const RepositoryStats = ({
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
}) => {
  return (
    <View style={styles.containterStats}>
      <View>
        <Text fontWeight="bold">
          {stargazersCount > 999
            ? Math.round(stargazersCount / 100) / 10 + "k"
            : stargazersCount}
        </Text>
        <Text color="textSecondary">Stars</Text>
      </View>
      <View>
        <Text fontWeight="bold">
          {forksCount > 999
            ? Math.round(forksCount / 100) / 10 + "k"
            : forksCount}
        </Text>
        <Text color="textSecondary">Forks</Text>
      </View>
      <View>
        <Text fontWeight="bold">{reviewCount}</Text>
        <Text color="textSecondary">Reviews</Text>
      </View>
      <View>
        <Text fontWeight="bold">{ratingAverage}</Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = item;

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.containterHeader}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: ownerAvatarUrl,
          }}
        />
        <View style={styles.containerHeaderDesc}>
          <Text
            style={styles.containerHeaderDescItem}
            fontSize="subheading"
            fontWeight="bold"
          >
            {fullName}
          </Text>
          <Text color="textSecondary" style={styles.containerHeaderDescItem}>
            {description}
          </Text>
          <Text style={styles.containerHeaderDescLang}>{language}</Text>
        </View>
      </View>
      <RepositoryStats
        forksCount={forksCount}
        stargazersCount={stargazersCount}
        ratingAverage={ratingAverage}
        reviewCount={reviewCount}
      />
    </View>
  );
};

export default RepositoryItem;

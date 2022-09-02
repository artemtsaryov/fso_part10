import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

const picker = (selectedOrder, setSelectedOrder) => (
  <Picker
    selectedValue={selectedOrder}
    onValueChange={(itemValue, itemIndex) => setSelectedOrder(itemValue)}
  >
    <Picker.Item label="Latest repositories" value="CREATED_AT" />
    <Picker.Item
      label="Highest rated repositories"
      value="RATING_AVERAGE_DESC"
    />
    <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE_ASC" />
  </Picker>
);

const searchBar = (searchQuery, setSearchQuery) => (
  <Searchbar
    placeholder="Search"
    onChangeText={(query) => setSearchQuery(query)}
    value={searchQuery}
  />
);

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("CREATED_AT");
  const [searchQuery, setSearchQuery] = useState("");

  const [searchQueryDebounced] = useDebounce(searchQuery, 500);

  const { repositories, fetchMore } = useRepositories(
    5,
    selectedOrder,
    searchQueryDebounced
  );

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      header={
        <>
          {picker(selectedOrder, setSelectedOrder)}
          {searchBar(searchQuery, setSearchQuery)}
        </>
      }
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;

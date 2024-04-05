import useApi from "@/hooks/useApi";
import { Genre } from "@/types/api";
import { FlatList, Pressable, Text, View } from "react-native";
import { Modal, Portal } from "react-native-paper";

interface CategoryModalProps {
  visible: boolean;
  onDismiss: () => void;
  onItemPress: (item: Genre) => void;
}

const ListItem = ({
  item,
  onItemPress,
}: {
  item: Genre;
  onItemPress: (item: Genre) => void;
}) => {
  return (
    <Pressable onPress={() => onItemPress(item)}>
      <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
        {item?.name}
      </Text>
    </Pressable>
  );
};

const CategoryModal = ({
  visible,
  onDismiss,
  onItemPress,
}: CategoryModalProps) => {
  const { data: genres } = useApi("fetchCategories");

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          backgroundColor: "black",
          position:"absolute",
          top:40,
          right:20,
          padding: 12,
          width: "50%",
          alignSelf: "center",
          borderRadius: 12,
        }}
      >
        <FlatList
          data={genres}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ListItem onItemPress={onItemPress} item={item} />
          )}
          ItemSeparatorComponent={() => (<View style={{height: 12}} />)}
        />
      </Modal>
    </Portal>
  );
};

export default CategoryModal;

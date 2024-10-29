import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomTheme from '../utils/CustomTheme';
import {Menu} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {colors, shadowContainer, borderRadius} = CustomTheme;

interface Props {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}
const PostCard = ({post, onDelete, onEdit}: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text style={styles.title}>{post.title}</Text>
        <Menu
          visible={showMenu}
          contentStyle={{backgroundColor: 'white'}}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <TouchableOpacity
              onPress={() => setShowMenu(true)}
              activeOpacity={0.7}>
              <Icon name="dots-vertical" size={25} />
            </TouchableOpacity>
          }>
          <Menu.Item
            title="Editar"
            onPress={() => {
              onEdit();
              setShowMenu(false);
            }}
          />
          <Menu.Item
            onPress={() => {
              onDelete();
              setShowMenu(false);
            }}
            title="Eliminar"
          />
        </Menu>
      </View>

      <Text style={styles.body}>{post.body}</Text>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    ...shadowContainer,
    padding: 10,
    borderRadius,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  body: {
    fontSize: 14,
  },
});

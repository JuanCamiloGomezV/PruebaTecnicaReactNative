import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import TextInputOutlined from '../../../components/TextInputOutlined';
import CustomTheme from '../../../utils/CustomTheme';
import {TextInput} from 'react-native-paper';
import Dropdown from '../../../components/Dropdown';

const {colors, borderRadius} = CustomTheme;

interface Props {
  onChangeTitle: (text: string) => void;
  onChangeUser: (id: number) => void;
  onChangeBody: (text: string) => void;
  onConfirm: () => void;
  post: Post;
  type: 'create' | 'edit';
  users: User[] | undefined;
}
const CreateEditPost = ({
  onChangeBody,
  onChangeTitle,
  onChangeUser,
  onConfirm,
  post,
  type,
  users,
}: Props) => {
  return (
    <>
      <Text style={{fontWeight: 'bold', fontSize: 18}}>{`${
        type === 'create' ? 'Crear' : 'Editar'
      } publicación`}</Text>
      <View
        style={{
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
        <View style={styles.row}>
          <TextInputOutlined
            label="Titulo"
            onChangeText={onChangeTitle}
            value={post.title}
            multiline={false}
          />
          <Dropdown
            label="Usuario"
            value={users?.find(user => user.id === post.userId)?.name ?? ''}
            data={users}
            name="name"
            uniqueKey="id"
            onPressItem={item => onChangeUser(item.id)}
            onPressIn={() => console.log('eee')}
          />
        </View>
        <View style={styles.row}>
          <TextInputOutlined
            label="Cuerpo"
            multiline
            scrollEnabled
            contentStyle={{height: 130}}
            onChangeText={onChangeBody}
            value={post.body}
          />
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.button} onPress={onConfirm}>
            <Text style={{color: colors.white}}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CreateEditPost;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  containerButton: {alignItems: 'flex-end', marginTop: 10},
  button: {
    backgroundColor: colors.primary,
    borderRadius,
    padding: 10,
  },
});

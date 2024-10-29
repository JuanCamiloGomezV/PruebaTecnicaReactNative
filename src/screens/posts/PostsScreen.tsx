import React from 'react';
import {FlatList, Platform, RefreshControl, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FABCustom from '../../components/FABCustom';
import LoaderView from '../../components/LoaderView';
import PostCard from '../../components/PostCard';
import CustomTheme from '../../utils/CustomTheme';
import CreateEditPost from './components/CreateEditPost';
import usePostsController from './usePostsController';
import {Modal} from 'react-native-paper';

const {colors} = CustomTheme;
const PostsScreen = () => {
  const {
    posts,
    loadingGet,
    getPosts,
    refRBSheet,
    onOpenModal,
    handleBodyChange,
    handleSubmit,
    handleTitleChange,
    handleUserChange,
    deletePost,
    putPost,
    formState,
    type,
    onEdit,
    users,
    handleReset,
  } = usePostsController();
  const {bottom} = useSafeAreaInsets();

  if (loadingGet) return <LoaderView />;

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <PostCard
            post={item}
            onDelete={() => deletePost(item.id)}
            onEdit={() => onEdit(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 10}}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{padding: 10}} />}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            refreshing={loadingGet}
            onRefresh={getPosts}
            tintColor={colors.primary}
          />
        }
      />

      <FABCustom onPress={() => onOpenModal('create')} />

      <RBSheet
        ref={refRBSheet}
        customModalProps={{
          animationType: 'fade',
        }}
        customAvoidingViewProps={{
          enabled: true,
          behavior: Platform.OS === 'ios' ? 'padding' : undefined,
        }}
        closeOnPressBack
        customStyles={{
          container: {
            backgroundColor: colors.white,
            padding: 15,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            justifyContent: 'space-between',
            height: 'auto',
            paddingBottom: bottom + 15,
          },
        }}
        onClose={handleReset}>
        <CreateEditPost
          onChangeBody={handleBodyChange}
          onChangeTitle={handleTitleChange}
          onConfirm={type === 'create' ? handleSubmit : putPost}
          post={formState}
          type={type}
          users={users}
          onChangeUser={handleUserChange}
        />
      </RBSheet>
    </>
  );
};

export default PostsScreen;

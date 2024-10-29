import {useEffect, useReducer, useRef, useState} from 'react';
import useCustomFetch from '../../hooks/useCustomFetch';
import usePostsReducer from './usePostsReducer';
import {Alert} from 'react-native';

const usePostsController = () => {
  const {
    get,
    data: posts,
    loading: loadingGet,
    error: errorGet,
  } = useCustomFetch<Post[]>();
  const {
    post,
    data: newPost,
    loading: loadingPost,
    error: errorPost,
  } = useCustomFetch<Post>();
  const {
    put,
    data: postEdited,
    loading: loadingPut,
    error: errorPut,
  } = useCustomFetch<Post>();
  const {del, loading: loadingDelete} = useCustomFetch();

  const {
    get: getUserFetch,
    loading: loadingUser,
    data: users,
  } = useCustomFetch<User[]>();

  const {formReducer, initialFormState} = usePostsReducer();
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [type, setType] = useState<'create' | 'edit'>('create');

  const refRBSheet = useRef<RBSheetRef>(null);
  const urlPosts = '/posts';
  const urlUsers = '/users';

  useEffect(() => {
    getPosts();
    getUsers();
  }, []);

  useEffect(() => {
    if (newPost) Alert.alert('Publicacion creada', JSON.stringify(newPost));
  }, [newPost]);

  useEffect(() => {
    if (postEdited)
      Alert.alert('Publicacion editada', JSON.stringify(postEdited));
  }, [postEdited]);

  const getPosts = async () => {
    await get(urlPosts);
  };

  const getUsers = async () => {
    await getUserFetch(urlUsers);
  };

  const deletePost = async (id: number) => {
    await del(urlPosts + `/${id}`);
    Alert.alert('Publicacion eliminada');
  };

  const putPost = async () => {
    await put(urlPosts + `/${formState.id}`, formState);
    onCloseModal();
    handleReset();
    if (errorPut) Alert.alert('Publicacion editada', errorPut);
  };

  const onEdit = (post: Post) => {
    dispatch({type: 'SET_ID', payload: post.id});
    dispatch({type: 'SET_TITLE', payload: post.title});
    dispatch({type: 'SET_USER', payload: post.userId});
    dispatch({type: 'SET_BODY', payload: post.body});

    onOpenModal('edit');
  };

  const onOpenModal = (type: 'create' | 'edit') => {
    refRBSheet.current?.open();
    setType(type);
  };

  const onCloseModal = () => {
    refRBSheet.current?.close();
  };

  const handleTitleChange = (title: string) => {
    dispatch({type: 'SET_TITLE', payload: title});
  };

  const handleUserChange = (user: number) => {
    dispatch({type: 'SET_USER', payload: user});
  };

  const handleBodyChange = (body: string) => {
    dispatch({type: 'SET_BODY', payload: body});
  };

  const handleReset = () => {
    dispatch({type: 'RESET'});
  };

  const handleSubmit = async () => {
    await post(urlPosts, formState);
    onCloseModal();
    handleReset();
  };

  return {
    posts,
    loadingGet,
    getPosts,
    refRBSheet,
    onOpenModal,
    handleTitleChange,
    handleUserChange,
    handleBodyChange,
    handleSubmit,
    deletePost,
    onEdit,
    formState,
    type,
    putPost,
    users,
    handleReset,
  };
};

export default usePostsController;

type FormPostAction =
  | {type: 'SET_ID'; payload: number}
  | {type: 'SET_TITLE'; payload: string}
  | {type: 'SET_USER'; payload: number}
  | {type: 'SET_BODY'; payload: string}
  | {type: 'RESET'};

const usePostsReducer = () => {
  const initialFormState = {} as Post;

  const formReducer = (state: Post, action: FormPostAction): Post => {
    switch (action.type) {
      case 'SET_ID':
        return {...state, id: action.payload};
      case 'SET_TITLE':
        return {...state, title: action.payload};
      case 'SET_USER':
        return {...state, userId: action.payload};
      case 'SET_BODY':
        return {...state, body: action.payload};
      case 'RESET':
        return initialFormState;
      default:
        return state;
    }
  };

  return {formReducer, initialFormState};
};

export default usePostsReducer;

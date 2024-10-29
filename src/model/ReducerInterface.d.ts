interface State<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

type Action<T> =
  | {type: 'FETCH_START'}
  | {type: 'FETCH_SUCCESS'; payload: T}
  | {type: 'FETCH_ERROR'; payload: string};

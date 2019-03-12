// @flow
import {useState, useEffect} from 'react';

export default function useListForm({
  provider,
  schema,
  routes,
  isListForm
}: {
  provider: Object,
  schema: Object,
  routes: Array<string>,
  isListForm: boolean
}) {
  const [result, setResult] = useState({data: {}, rootValue: {}});
  const [isFetching, setIsFetching] = useState(true);
  const getListValue = () => provider.fetch(routes[0]);
  const subscribeListValue = () => provider.subscribe(routes[0], (result) => {
    setResult(result);
  });
  useEffect(() => {
    if (!isListForm) {
      return;
    }

    getListValue()
      .then(result => {
        setResult(result);
        setIsFetching(false);
      });
    const {unsubscribe} = subscribeListValue();
    return unsubscribe;
  }, [isListForm, routes[0]])
  return {
    data: result.data,
    rootValue: result.rootValue,
    isFetching,
    toolbar: (schema[routes[0]] || {}).toolbar,
    onClickAddButton: () => {},
    ...provider
  }
}
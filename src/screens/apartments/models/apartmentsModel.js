import {useNavigation} from 'react-navigation-hooks';
import {useDispatch} from 'react-redux';

const useApartmentsModel = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const apartmentsList = [{id: '1', name: 'Name 1'}, {id: '2', name: 'Name 2'}];

  return {
    data: {
      apartmentsList,
    },
    navigation,
    dispatch,
  };
};

export default useApartmentsModel;

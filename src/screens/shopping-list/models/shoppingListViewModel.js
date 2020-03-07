import {useState, useEffect} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {
  loadClasses,
  loadUnits,
} from '../../../store/actions/shoppingListActions';

export const useShoppingListScreenModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [inputAreaVisible, setInputAreaVisible] = useState(false);

  const units = useSelector(state => state.shoppingList.units);
  const classes = useSelector(state => state.shoppingList.classes);
  const shoppingListId = useSelector(
    state => state.shoppingList.currentShoppingList.id,
  );
  const shoppingListName = useSelector(
    state => state.shoppingList.currentShoppingList.name,
  );
  const productsList = useSelector(
    state => state.shoppingList.currentShoppingList.products,
  );
  const listLoading = useSelector(
    state => state.shoppingList.currentShoppingList.loading,
  );
  const signedIn = useSelector(
    state => state.authentication.currentUser.signedIn,
  );

  const getUnitName = unitId => {
    const filteredUnits = units.filter(unit => unit.id === unitId);
    return filteredUnits.length ? filteredUnits[0].name : '';
  };

  const getCategoryName = classId => {
    const filteredClasses = classes.filter(cl => cl.id === classId);
    return filteredClasses.length ? filteredClasses[0].name : '';
  };

  const products = productsList
    .map(product => {
      return {
        id: product.id,
        listId: product.parentId,
        name: product.name,
        quantity: product.quantity,
        unit: getUnitName(product.unitId),
        note: product.note,
        category: getCategoryName(product.classId),
        completionStatus: product.completionStatus,
      };
    })
    .sort((p1, p2) => p1.id < p2.id);

  useEffect(() => {
    dispatch(loadUnits());
    dispatch(loadClasses());
  }, [dispatch]);

  useEffect(() => {
    navigation.setParams({shoppingListName});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingListName]);

  return {
    data: {
      inputAreaVisible,
      shoppingListId,
      shoppingListName,
      listLoading,
      products,
      units,
      signedIn,
    },
    setters: {setInputAreaVisible},
    navigation,
    dispatch,
  };
};

import {useState, useEffect} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';

export const useShoppingListScreenModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [inputAreaVisible, setInputAreaVisible] = useState(false);
  const [editable, setEditable] = useState(false);
  const [removeProductName, setRemoveProductName] = useState('');
  const [removeProductId, setRemoveProductId] = useState(-1);
  const [productRow, setProductRow] = useState(null);
  const [
    removeConfirmationDialogVisible,
    setRemoveConfirmationDialogVisible,
  ] = useState(false);
  const [sharedListLoading, setSharedListLoading] = useState(false);

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
  const shared = useSelector(
    state => state.shoppingList.currentShoppingList.shared,
  );
  const currentSharedListLoading = useSelector(
    state => state.shoppingList.currentShoppingList.sharedListLoading,
  );
  const creator = useSelector(
    state => state.shoppingList.currentShoppingList.creator,
  );
  const signedIn = useSelector(
    state => state.authentication.currentUser.signedIn,
  );
  const currentPhone = useSelector(
    state => state.authentication.currentUser.phone,
  );
  const currentId = useSelector(state => state.authentication.currentUser.id);

  // const getUnitName = unitId => {
  //   const filteredUnits = units.filter(unit => unit.id === unitId);
  //   return filteredUnits.length ? filteredUnits[0].name : '';
  // };
  //
  // const getCategoryName = classId => {
  //   const filteredClasses = classes.filter(cl => cl.id === classId);
  //   return filteredClasses.length ? filteredClasses[0].name : '';
  // };

  // ===
  // =====
  let products = [...productsList];
  if (products.length > 0) {
    products.push({
      id: 'MAX_VALUE',
      extra: true,
    });
  }

  // let products = [];
  // products = products.concat(productsList);
  // products = products
  //   .map(product => {
  //     return {
  //       id: product.id,
  //       listId: product.parentId,
  //       name: product.name,
  //       quantity: product.quantity,
  //       unit: getUnitName(product.unitId),
  //       note: product.note,
  //       category: getCategoryName(product.classId),
  //       completionStatus: product.completionStatus,
  //       rejected: product.rejected ? true : false,
  //     };
  //   })
  //   .sort((p1, p2) => p1.id < p2.id);
  // if (products.length > 0) {
  //   products.push({
  //     id: 'MAX_VALUE',
  //     extra: true,
  //   });
  // }
  // =====
  // ===

  // const products = productsList
  //   .map(product => {
  //     return {
  //       id: product.id,
  //       listId: product.parentId,
  //       name: product.name,
  //       quantity: product.quantity,
  //       unit: getUnitName(product.unitId),
  //       note: product.note,
  //       category: getCategoryName(product.classId),
  //       completionStatus: product.completionStatus,
  //     };
  //   })
  //   .sort((p1, p2) => p1.id < p2.id);
  // if (products.length > 0) {
  //   products.push({
  //     id: 'MAX_VALUE',
  //     extra: true,
  //   });
  // }
  //
  // // ===
  // rejectedProductsList.forEach(product =>
  //   console.log(product.id + ' - ' + product.rejected),
  // );
  // // ===

  // useEffect(() => {
  //   dispatch(loadUnits({shoppingListId}));
  //   dispatch(loadClasses({shoppingListId}));
  // }, [dispatch, shoppingListId]);

  useEffect(() => {
    navigation.setParams({shoppingListName});
    navigation.setParams({editable});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingListName, editable]);

  useEffect(() => {
    if (creator.length <= 0 || creator === currentId) {
      setEditable(true);
    } else {
      setEditable(false);
    }
  }, [creator, currentId]);

  useEffect(() => {
    setSharedListLoading(currentSharedListLoading);
  }, [currentSharedListLoading]);

  return {
    data: {
      inputAreaVisible,
      shoppingListId,
      shoppingListName,
      listLoading,
      sharedListLoading,
      products,
      units,
      classes,
      signedIn,
      editable,
      shared,
      currentPhone,
      currentId,
      removeProductName,
      removeProductId,
      productRow,
      removeConfirmationDialogVisible,
    },
    setters: {
      setInputAreaVisible,
      setRemoveProductName,
      setRemoveProductId,
      setProductRow,
      setRemoveConfirmationDialogVisible,
    },
    navigation,
    dispatch,
  };
};

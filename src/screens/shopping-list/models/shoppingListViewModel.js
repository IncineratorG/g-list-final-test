import {useState, useEffect} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {ProductCategories} from '../../../components/shopping-list-screen/ProductCategories';
import {PRODUCT_COMPLETED} from '../../../services/storage/data/productStatus';

export const useShoppingListScreenModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [inputAreaVisible, setInputAreaVisible] = useState(false);
  const [inputAreaEditMode, setInputAreaEditMode] = useState(false);
  const [inputAreaEditModeData, setInputAreaEditModeData] = useState(undefined);
  const [editable, setEditable] = useState(false);
  const [removeProductName, setRemoveProductName] = useState('');
  const [removeProductId, setRemoveProductId] = useState(-1);
  const [productRow, setProductRow] = useState(null);
  const [
    removeConfirmationDialogVisible,
    setRemoveConfirmationDialogVisible,
  ] = useState(false);
  const [sharedListLoading, setSharedListLoading] = useState(false);
  const [usedProductsClasses, setUsedProductsClasses] = useState([]);
  const [selectedProductClass, setSelectedProductClass] = useState(
    ProductCategories.types.ALL,
  );

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

  let products = [...productsList];
  if (products.length > 0) {
    products.push({
      id: 'MAX_VALUE',
      extra: true,
    });
  }

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

  useEffect(() => {
    setUsedProductsClasses(createUsedProductsClasses(classes, productsList));
  }, [classes, productsList]);

  const createUsedProductsClasses = (allClasses, prodList) => {
    const distinctClassesIdsSet = new Set();
    const classesStatisticMap = new Map();

    let hasCompleted = false;
    let hasNotCompleted = false;

    prodList.forEach(product => {
      if (!distinctClassesIdsSet.has(product.classId)) {
        distinctClassesIdsSet.add(product.classId);
      }

      const productCompleted = product.completionStatus === PRODUCT_COMPLETED;
      if (productCompleted) {
        hasCompleted = true;
      } else {
        hasNotCompleted = true;
      }

      if (classesStatisticMap.has(product.classId)) {
        let statObject = classesStatisticMap.get(product.classId);
        if (productCompleted) {
          statObject.completedProductsCount =
            statObject.completedProductsCount + 1;
        } else {
          statObject.notCompletedProductsCount =
            statObject.notCompletedProductsCount + 1;
        }
      } else {
        const statObject = {
          completedProductsCount: productCompleted ? 1 : 0,
          notCompletedProductsCount: productCompleted ? 0 : 1,
        };
        classesStatisticMap.set(product.classId, statObject);
      }
    });

    const distinctProductsClasses = [];
    allClasses.forEach(cl => {
      if (distinctClassesIdsSet.has(cl.id)) {
        const {notCompletedProductsCount} = classesStatisticMap.get(cl.id);

        const distinctProductClass = {
          ...cl,
          completed: notCompletedProductsCount === 0,
        };
        distinctProductsClasses.push(distinctProductClass);
      }
    });

    if (hasCompleted) {
      distinctProductsClasses.unshift({
        id: ProductCategories.types.COMPLETED,
        name: 'Купленные',
        color: 'lightgrey',
      });
    }
    if (hasNotCompleted) {
      distinctProductsClasses.unshift({
        id: ProductCategories.types.NOT_COMPLETED,
        name: 'Не купленные',
        color: 'lightgrey',
      });
    }
    if (distinctProductsClasses.length > 1) {
      distinctProductsClasses.unshift({
        id: ProductCategories.types.ALL,
        name: 'Все',
        color: 'lightgrey',
      });
    }

    return distinctProductsClasses;
  };

  return {
    data: {
      inputAreaVisible,
      inputAreaEditMode,
      inputAreaEditModeData,
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
      usedProductsClasses,
      selectedProductClass,
    },
    setters: {
      setInputAreaVisible,
      setInputAreaEditMode,
      setInputAreaEditModeData,
      setRemoveProductName,
      setRemoveProductId,
      setProductRow,
      setRemoveConfirmationDialogVisible,
      setSelectedProductClass,
    },
    navigation,
    dispatch,
  };
};

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
// useEffect(() => {
//   setProducts(productsList);
// }, [productsList]);

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
//   const distinctClassesIdsSet = new Set();
//   const classesStatisticMap = new Map();
//
//   productsList.forEach(product => {
//     if (!distinctClassesIdsSet.has(product.classId)) {
//       distinctClassesIdsSet.add(product.classId);
//     }
//
//     const productCompleted = product.completionStatus === PRODUCT_COMPLETED;
//     if (classesStatisticMap.has(product.classId)) {
//       let statObject = classesStatisticMap.get(product.classId);
//       if (productCompleted) {
//         statObject.completedProductsCount =
//           statObject.completedProductsCount + 1;
//       } else {
//         statObject.notCompletedProductsCount =
//           statObject.notCompletedProductsCount + 1;
//       }
//     } else {
//       const statObject = {
//         completedProductsCount: productCompleted ? 1 : 0,
//         notCompletedProductsCount: productCompleted ? 0 : 1,
//       };
//       classesStatisticMap.set(product.classId, statObject);
//     }
//
//     const distinctProductsClasses = [];
//     classes.forEach(cl => {
//       if (distinctClassesIdsSet.has(cl.id)) {
//         const {
//           completedProductsCount,
//           notCompletedProductsCount,
//         } = classesStatisticMap.get(cl.id);
//
//         const distinctProductClass = {
//           ...cl,
//           completed: notCompletedProductsCount === 0,
//         };
//         distinctProductsClasses.push(distinctProductClass);
//       }
//     });
//
//     setUsedProductsClasses(createUsedProductsClasses(classes, productsList));
//   });
// }, [classes, productsList]);
// useEffect(() => {
//   const listProductsClassesIds = new Set();
//   productsList.forEach(product => {
//     listProductsClassesIds.add(product.classId);
//   });
//
//   const listProductsClasses = [
//     {id: 'MAX_VALUE', name: 'Все', color: 'lightgrey'},
//   ];
//   classes.forEach(cl => {
//     if (listProductsClassesIds.has(cl.id)) {
//       listProductsClasses.push(cl);
//     }
//   });
//
//   setUsedProductsClasses(listProductsClasses);
// }, [classes, productsList]);

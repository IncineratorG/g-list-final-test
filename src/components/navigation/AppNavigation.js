import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import MainScreen from '../../screens/main/MainScreen';
// import ShoppingListScreen from '../../screens/shopping-list/ShoppingListScreen';
import EditScreenV3 from '../../screens/edit/EditScreenV3';
// import CreateShoppingListScreen from '../../screens/create-shopping-list/CreateShoppingLisScreen';
import CreateShoppingList from '../../screens/create-shopping-list/CreateShoppingList';
import Main from '../../screens/main/Main';
import ShoppingList from '../../screens/shopping-list/ShoppingList';

const MainStack = createStackNavigator(
  {
    Main: Main,
    ShoppingList: ShoppingList,
    Edit: EditScreenV3,
  },
  {
    initialRouteName: 'Main',
  },
);

const ModalStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    CreateShoppingList: {
      screen: CreateShoppingList,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AppNavigation = createAppContainer(ModalStack);

export default AppNavigation;

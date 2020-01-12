import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from '../../screens/main/MainScreen';
import MainScreen_V2 from '../../screens/main/MainScreen_V2';
import ShoppingListScreen from '../../screens/shopping-list/ShoppingListScreen';
import EditScreenV3 from '../../screens/edit/EditScreenV3';
import CreateShoppingListScreen from '../../screens/create-shopping-list/CreateShoppingLisScreen';

const MainStack = createStackNavigator(
  {
    Main: MainScreen,
    ShoppingList: ShoppingListScreen,
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
      screen: CreateShoppingListScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AppNavigation = createAppContainer(ModalStack);

export default AppNavigation;

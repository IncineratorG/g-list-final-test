import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import EditScreenV3 from '../../screens/edit/EditScreenV3';
import CreateShoppingList from '../../screens/create-shopping-list/CreateShoppingList';
import Main from '../../screens/main/Main';
import ShoppingList from '../../screens/shopping-list/ShoppingList';
import Registration from '../../screens/registration/Registration';

const MainStack = createStackNavigator(
  {
    Main: Main,
    ShoppingList: ShoppingList,
    Edit: EditScreenV3,
    Registration: Registration,
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

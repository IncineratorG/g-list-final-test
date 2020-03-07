import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import EditScreenV3 from '../../screens/edit/EditScreenV3';
import CreateShoppingList from '../../screens/create-shopping-list/CreateShoppingList';
import Main from '../../screens/main/Main';
import ShoppingList from '../../screens/shopping-list/ShoppingList';
import Authentication from '../../screens/authentication/Authentication';
import Collaborators from '../../screens/collaborators/Collaborators';
import DrawerMenu from '../common/drawer-menu/DrawerMenu';

const MainStack = createStackNavigator(
  {
    Main: Main,
    ShoppingList: ShoppingList,
    Edit: EditScreenV3,
    Authentication: Authentication,
    Collaborators: Collaborators,
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

const DrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: ModalStack,
    },
    Authentication: {
      screen: Authentication,
      navigationOptions: {title: 'Войти'},
    },
  },
  {
    contentComponent: DrawerMenu,
  },
);

// const AppNavigation = createAppContainer(ModalStack);
const AppNavigation = createAppContainer(DrawerNavigator);

export default AppNavigation;

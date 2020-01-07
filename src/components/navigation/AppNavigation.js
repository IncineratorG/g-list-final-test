import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from '../../screens/main/MainScreen';
import ShoppingListScreen from '../../screens/shopping-list/ShoppingListScreen';
import EditScreenV3 from '../../screens/edit/EditScreenV3';

const navigator = createStackNavigator(
  {
    Main: MainScreen,
    ShoppingList: ShoppingListScreen,
    Edit: EditScreenV3,
  },
  {
    initialRouteName: 'Main',
  },
);

const AppNavigation = createAppContainer(navigator);

export default AppNavigation;

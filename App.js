import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';
import ShoppingListScreen from './src/screens/ShoppingListScreen';
import EditScreen from './src/screens/EditScreen';
import EditScreenV3 from './src/screens/EditScreenV3';

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

const App = createAppContainer(navigator);

export default App;

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';
import ShoppingListScreen from './src/screens/ShoppingListScreen';

const navigator = createStackNavigator(
  {
    Main: MainScreen,
    ShoppingList: ShoppingListScreen,
  },
  {
    initialRouteName: 'Main',
  },
);

const App = createAppContainer(navigator);

export default App;

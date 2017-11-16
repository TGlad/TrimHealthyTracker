import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import RegisterScreen from '../Containers/RegisterScreen';
import LoginScreen from '../Containers/LoginScreen';
import DashboardScreen from '../Dashboard'
import MealRecorder from '../Dashboard/MealRecorder';
import CalendarScreen from '../Dashboard/CalendarScreen';
import AnalyzeScreen from '../Analyze'
import AboutScreen from '../About'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  LoginScreen: { screen: LoginScreen },
  RegisterScreen: { screen: RegisterScreen },
  DashboardScreen:{ screen: DashboardScreen },
  MealRecorder:{ screen: MealRecorder },
  CalendarScreen:{ screen: CalendarScreen },
  AnalyzeScreen:{ screen: AnalyzeScreen },
  AboutScreen:{ screen: AboutScreen }
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'LoginScreen',
  
})

export default PrimaryNav

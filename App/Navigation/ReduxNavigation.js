import React,{ Component } from 'react';
import { BackHandler } from 'react-native';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import AppNavigation from './AppNavigation';
import { NavigationActions } from 'react-navigation'
// here is our redux-aware our smart component
class ReduxNavigation extends Component {
  constructor(props){
    super(props);

  }
  
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }
  onBackPress () {

    const { dispatch, nav } = this.props;
    console.log("Back pressed", nav);
    const activeRoute = nav.routes[nav.index];
    if (activeRoute.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render(){
  const { dispatch, nav } = this.props;
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav
  })
  return <AppNavigation navigation={navigation} />

  }
}
const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)

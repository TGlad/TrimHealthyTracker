import React,{ Component } from 'react';
import { View,Text,ScrollView,AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';

import { Colors } from '../Themes'
import Loader from '../Components/Loader'
import { Constants } from '../Utils/Constants'

export default class Dashboard extends Component {
    static navigationOptions = ({ navigation }) => {
        return{
            title:'Trim Healthy Tracker', 
            headerStyle:{
                justifyContent:'center',
                elevation:0,
                height:60
            },
            headerTitleStyle:{
                alignSelf:'center', 
                textAlign:'center'               
            },
            headerRight: (<View></View>)
        };
    }
    constructor(props){
        super(props);

        this.state = {

        }
        this.goToTodayMeal = this.goToTodayMeal.bind(this);
        this.goToCalendarScreen = this.goToCalendarScreen.bind(this);
        this.goToAnalyzeScreen = this.goToAnalyzeScreen.bind(this);
        this.goToAboutScreen = this.goToAboutScreen.bind(this);
        this.handleLogout = this.handleLogout.bind(this); 
    }

    goToTodayMeal(){
        const { navigate } = this.props.navigation;
        navigate('MealRecorder',{ date: moment().format('YYYY-MM-DD') });
    }
    goToCalendarScreen(){
        const { navigate } = this.props.navigation;
        navigate('CalendarScreen',{ date: moment() });
    }
    goToAnalyzeScreen(){
        const { navigate } = this.props.navigation;
        navigate('AnalyzeScreen');
    }
    goToAboutScreen(){
        const { navigate } = this.props.navigation;
        navigate('AboutScreen');
    }
    handleLogout(){
        this.setState({ loading:true })
        const self = this;
        let key = `${Constants.store}:${Constants.userInfo}`;
		AsyncStorage.removeItem(key, (value) => {
            const { navigate } = this.props.navigation;
            self.setState({ loading: false})
            navigate('LoginScreen');
        });    
    }
    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow : 1,justifyContent: 'center' }}
                        centerContent
                        keyboardShouldPersistTaps='always'
            >
                <Button raised
                        rightIcon ={{ name: 'login',type:'entypo',color:'#000' }}
                        title="Today's Meal"
                        color='#000'
                        containerViewStyle={{ elevation:6}}
                        buttonStyle={{ borderWidth:2,backgroundColor:'transparent'}}
                        onPress={ this.goToTodayMeal }
                        onLongPress={ this.goToTodayMeal }
                />
                <Button raised
                        rightIcon ={{ name: 'today',color:'#000' }}
                        title='Calendar'
                        backgroundColor='transparent'
                        color='#000'
                        containerViewStyle={{ elevation:6,marginTop:20}}
                        buttonStyle={{ borderWidth:2,backgroundColor:'transparent'}}
                        onPress={ this.goToCalendarScreen }
                        onLongPress={ this.goToCalendarScreen }
                />
                <Button raised
                        rightIcon ={{ name: 'loader',type:'feather',color:'#000' }}
                        title='Analyze'
                        backgroundColor='transparent'
                        color='#000'
                        containerViewStyle={{ elevation:6,marginTop:20}}
                        buttonStyle={{ borderWidth:2,backgroundColor:'transparent'}}
                        onPress={ this.goToAnalyzeScreen }
                        onLongPress={ this.goToAnalyzeScreen }
                />
                <Button raised
                        rightIcon ={{ name: 'group',type:'font-awesome',color:'#000' }}
                        title='About/FAQ'
                        backgroundColor='transparent'
                        color='#000'
                        containerViewStyle={{ elevation:6,marginTop:20}}
                        buttonStyle={{ borderWidth:2,backgroundColor:'transparent'}}
                        onPress={ this.goToAboutScreen }
                        onLongPress={ this.goToAboutScreen }
                />
                <Button raised
                        rightIcon ={{ name: 'logout',type:'material-community',color:'#000' }}
                        title='Logout'
                        backgroundColor='transparent'
                        color='#000'
                        containerViewStyle={{ elevation:6,marginTop:20}}
                        buttonStyle={{ borderWidth:2,backgroundColor:'transparent'}}
                        onPress={ this.handleLogout }
                        onLongPress={ this.handleLogout }
                />
                {
                    this.state.loading && 
                        <Loader /> 
                }
            </ScrollView>    
        )
    }
}
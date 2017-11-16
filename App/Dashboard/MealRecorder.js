import React,{ Component } from 'react';
import { View,Text,AsyncStorage,TouchableOpacity } from 'react-native';
import { Button,Icon,Divider } from 'react-native-elements';
import { Row,Col } from 'react-native-easy-grid';
import moment from 'moment';
//import { Menu,MenuOption,MenuOptions,MenuTrigger } from 'react-native-popup-menu';

import {firebaseApp} from '../Lib/firebase';
import {Constants} from '../Utils/Constants';
import {Colors } from '../Themes';
import Dropdown from './Dropdown'
import Loader from '../Components/Loader'

export default class MealRecorder extends Component {
    static navigationOptions = ({ navigation }) => {
        const date = navigation.state.params.date;
        const isToday = moment(date).isSame(moment(),'day')?'Today':date
        return{
            title:`${isToday}`,
            headerStyle:{
                elevation:0,
                height:60
            },
            headerTitleStyle:{
                alignSelf:'center', 
                textAlign:'center'               
            },
            headerRight: (<View></View>)
        }
    }
    constructor(props){
        super(props);

        this.state = {
            date:this.props.navigation.state.params.date,
            breakfast:'Not Recorded',
            morningSnack:'Not Recorded',
            lunch:'Not Recorded',
            afternoonSnack:'Not Recorded',
            dinner:'Not Recorded',
            eveningSnack:'Not Recorded',
            userInfo:{},
            loading:true
        }
        this.handleMealChange = this.handleMealChange.bind(this);
        this.handleSaveMealData = this.handleSaveMealData.bind(this);
        this.checkDataExists = this.checkDataExists.bind(this);
        this.handleUpdateMealData = this.handleUpdateMealData.bind(this);
        this.checkIfUserExists = this.checkIfUserExists.bind(this);
    }
    componentWillMount(){
        const self = this;
        let key = `${Constants.store}:${Constants.userInfo}`;
		AsyncStorage.getItem(key, (err, value) => {
			if (value !== null) {
                let userInfo = JSON.parse(value);
                console.log(userInfo)
				self.setState({userInfo:userInfo});
                this.checkIfUserExists(userInfo,this.state.date);
			} else {
                const { navigate } = this.props.navigation;
                self.setState({ loading:false});
                navigate('LoginScreen');
            }
        });
    }
    checkIfUserExists(userInfo,date) {
        const self = this;
        var usersRef = firebaseApp.database().ref().child('meal/')
        usersRef.child(userInfo.userId).once('value', function(snapshot) {
            var exists = (snapshot.val() !== null);
            console.log(snapshot.val(),exists);
            if(exists){
                self.checkDataExists(userInfo,date);
            } else {
                self.setState({ loading: false })
            }        
        });
    }
    checkDataExists(userInfo,date){
        const self = this;
        const formattedDate = moment(date).format('YYYY-MM-DD');
        console.log(date);
        firebaseApp.database().ref().child('meal/'+ userInfo.userId)
        .orderByChild('date')
        .equalTo(formattedDate)
        .once('child_added',function(snap){
            const mealRecord = snap.val();
            console.log(mealRecord);
            if(mealRecord){
                self.setState({
                    loading:false,
                    recordExist:true,
                    breakfast:mealRecord.breakfast,
                    afternoonSnack:mealRecord.afternoonSnack,
                    morningSnack:mealRecord.morningSnack,
                    lunch:mealRecord.lunch,
                    dinner:mealRecord.dinner,
                    eveningSnack:mealRecord.eveningSnack
                })
            } else {
                self.setState({
                    loading:false,
                    recordExist:false,
                })
            }
        })
        .catch((error) => {
            self.setState({
                loading:false,
                recordExist:false,
            })
        })
    }
    handleMealChange = (newValue,name) => {
        console.log(newValue,name);
        this.setState({ [name]: newValue });
    }
    handleSaveMealData = () => {
        this.setState({ loading: true });
        const self = this;
        const { breakfast,morningSnack,lunch,afternoonSnack,dinner,eveningSnack,userInfo } = this.state;
        const date = this.state.date; //date from the calendar

        const mealRef = firebaseApp.database().ref().child('/meal/'+ userInfo.userId)
        mealRef.push({
            breakfast:breakfast,
            morningSnack:morningSnack,
            lunch:lunch,
            afternoonSnack:afternoonSnack,
            dinner:dinner,
            eveningSnack:eveningSnack,
            date:date      
        }).then(() => {
            self.setState({ loading: false,error: null })
        }).catch((error) => {
            self.setState({ loading:false,error: error })
        });
    }
    handleUpdateMealData = () => {
        this.setState({ loading: true });
        const self = this;
        const { breakfast,morningSnack,lunch,afternoonSnack,dinner,eveningSnack,userInfo } = this.state;
        const date = this.state.date; //date from the calendar
        
        console.log(userInfo);
        firebaseApp.database().ref().child('meal/'+ userInfo.userId)
        .orderByChild('date')
        .equalTo(date)
        .once('child_added',function(snap){
            console.log(snap.ref);
            snap.ref.update({ 
                breakfast:breakfast,
                morningSnack:morningSnack,
                lunch:lunch,
                afternoonSnack:afternoonSnack,
                dinner:dinner,
                eveningSnack:eveningSnack
            })
            .then(() => {
                self.setState({ loading: false,error: null })
            })
            .catch((error) => {
                console.log(error);
                self.setState({ loading:false,error: error })
            })
        })    
    }
    previousDate = () => {
        const {userInfo} = this.state;
        const previousDate = moment(this.state.date).subtract(1,'d').format('YYYY-MM-DD');
        this.setState({
            date: previousDate,
            loading:true
        });
        this.props.navigation.setParams({
            date: previousDate,
        });
        this.checkIfUserExists(userInfo,previousDate);
    }
    nextDate = () => {
        const {userInfo} = this.state;
        const nextDate = moment(this.state.date).add(1,'d').format('YYYY-MM-DD');
        this.setState({
            date: nextDate,
            loading:true
        });
        this.props.navigation.setParams({
            date: nextDate,
        })
        this.checkIfUserExists(userInfo,nextDate);
    }
    render(){
        console.log(this.state);
        return(
            <View>
                {
                    !this.state.loading && 
                    <View>
                        <Dropdown label = 'Breakfast'
                                  name ='breakfast'
                                  activeValue={this.state.breakfast} 
                                  handleChange={this.handleMealChange}  
                        />
                        <Dropdown label = 'Morning Snack' 
                                  name ='morningSnack'  
                                  activeValue={this.state.morningSnack}
                                  handleChange={this.handleMealChange}
                        /> 
                        <Dropdown label = 'Lunch' 
                                  name ='lunch'  
                                  activeValue={this.state.lunch}
                                  handleChange={this.handleMealChange}
                        />
                        <Dropdown label = 'Afternoon Snack' 
                                  name ='afternoonSnack' 
                                  activeValue={this.state.afternoonSnack} 
                                  handleChange={this.handleMealChange}
                        />
                        <Dropdown label = 'Dinner'
                                  name ='dinner'
                                  activeValue={this.state.dinner}   
                                  handleChange={this.handleMealChange}
                        />
                        <Dropdown label = 'Evening Snack' 
                                  name = 'eveningSnack' 
                                  activeValue={this.state.eveningSnack}
                                  handleChange={this.handleMealChange}
                        />
                        <Button raised
                                rightIcon ={{ name:this.state.recordExist?'update':'save',color:'#fff' }}
                                title={this.state.recordExist?'Update':'Save'}
                                backgroundColor='transparent'
                                textStyle={{ fontSize:20 }}
                                containerViewStyle={{ alignSelf:'center',borderRadius:30,marginTop:20,elevation:8,width:200 }}
                                buttonStyle={{ borderWidth:2,borderRadius:30,backgroundColor:Colors.charcoal}}
                                onPress={ this.state.recordExist?this.handleUpdateMealData:this.handleSaveMealData }
                                onLongPress={ this.state.recordExist?this.handleUpdateMealData:this.handleSaveMealData }
                        />
                        <View style={{ flexDirection:'row',justifyContent:'space-between',paddingTop:25 }}>
                            <TouchableOpacity onPress={ this.previousDate } style={{ paddingLeft:10 }}>
                                <Text style={{ fontSize:20 }}>
                                    Last Date 
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ this.nextDate } style={{ paddingRight:10 }}>
                                <Text style={{ fontSize:20 }}>
                                    Next Date 
                                </Text>
                            </TouchableOpacity>        
                        </View>
                    </View>    
                }        
                {
                    this.state.loading && 
                        <Loader />
                }       
            </View>    
        );
    }
}
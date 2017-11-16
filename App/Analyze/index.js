import React,{ Component } from 'react';
import { View,Text,AsyncStorage,ART,LayoutAnimation,TouchableWithoutFeedback,Alert } from 'react-native';
import { Row,Col } from 'react-native-easy-grid';
import { Button,Icon,Divider } from 'react-native-elements';
import { Menu,MenuOption,MenuOptions,MenuTrigger } from 'react-native-popup-menu';
import moment from 'moment';

import {firebaseApp} from '../Lib/firebase'
import { Constants } from '../Utils/Constants'
import Pie from './Pie'
import Loader from '../Components/Loader'
import {getInitialPieData} from '../Utils'

const { Surface,Group,Rectangle,Shape } = ART;

export default class AnalyzeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return{
            title:'Analyze', 
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
            userInfo:{},
            loading:false, 
            showPieChart:false,
            text:''  
        }

        this.filterData = this.filterData.bind(this);
        this.handleMonth = this.handleMonth.bind(this);
        this.handleWeek = this.handleWeek.bind(this);
        this.handleYear = this.handleYear.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
        this.reinitialize = this.reinitialize.bind(this);
    }
    componentWillMount(){
        const self = this;
        let key = `${Constants.store}:${Constants.userInfo}`;
		AsyncStorage.getItem(key, (err, value) => {
			if (value !== null) {
                let userInfo = JSON.parse(value);
                console.log(userInfo)
				self.setState({userInfo});
			}
        });     
    }
    reinitialize(){
        const { navigate } = this.props.navigation;
        navigate('DashboardScreen');
    }
    checkUserExists(startDate,endDate){
        const { userInfo} = this.state;
        const self = this;
        var usersRef = firebaseApp.database().ref().child('meal/')
        usersRef.child(userInfo.userId).once('value', function(snapshot) {
            var exists = (snapshot.val() !== null);
            if(exists){
                self.filterData(startDate,endDate);
            } else {
                Alert.alert(
                    'Please enter some data',
                    "Press Ok to enter today's record",
                    [
                        { text:'OK',onPress: () => self.reinitialize()},
                    ]
                );
                self.setState({ loading: false })
            }        
        });

    }
    filterData(startDate,endDate){
        let newPieObj = getInitialPieData();
        const self = this;
        const {userInfo} = this.state;
        
        firebaseApp.database().ref().child('meal/'+ userInfo.userId)
        .orderByChild('date')
        .startAt(startDate).endAt(endDate)
        .on('value',function(snap){
            snap.forEach(function(childSnapshot) {
                const dataObj = childSnapshot.val();
                for (var prop in dataObj) {
                    if (dataObj.hasOwnProperty(prop)) {
                        if(dataObj[prop] === 'S'){
                            ++(newPieObj[0].count);
                        }
                        else if(dataObj[prop] === 'E'){
                            ++(newPieObj[1].count)
                        }
                        else if(dataObj[prop] === 'FP'){
                            ++(newPieObj[2].count)
                        }
                        else if(dataObj[prop] === 'XO'){
                            ++(newPieObj[3].count)
                        }
                        else if(dataObj[prop] === 'SH'){
                            ++(newPieObj[4].count)
                        }
                        else if(dataObj[prop] === 'Off-plan'){
                            ++(newPieObj[5].count)
                        }
                    }
                }               
            });
            self.setState({ loading: false,showPieChart:true,pieData:newPieObj });
        })  
    }
    handleMonth(){
        this.setState({ pieDate:null,loading:true,text:'1 Month' })
        const startingMonthDate = moment().subtract(1,'M').format('YYYY-MM-DD');
        const endingMonthDate = moment().format('YYYY-MM-DD');
        this.checkUserExists(startingMonthDate,endingMonthDate);
    }
    handleWeek(){
        this.setState({ pieDate:null,loading:true,text:'7 Days' })
        const startingWeekDate = moment().subtract(7,'d').format('YYYY-MM-DD');
        const endingWeekDate = moment().format('YYYY-MM-DD');
        this.checkUserExists(startingWeekDate,endingWeekDate);
    }
    handleYear(){
        this.setState({ pieDate:null,loading:true,text:'1 Year' })
        const startingYearDate = moment().subtract(1,'y').format('YYYY-MM-DD');
        const endingYearDate = moment().format('YYYY-MM-DD');
        this.checkUserExists(startingYearDate,endingYearDate);
    }
     componentDidMount(){
        console.log("dfdgdg");
    }
    componentDidUpdate(){
        console.log("sgdfhbbgfnhgjm");
    }
    render(){
        const height = 300;
        const width = 600;
        return(
            <View>
                <Row style={{ borderWidth:2,height:50,margin:10,borderRadius:20 }}>
                    <Col size={3} style={{ justifyContent:'center'}}>
                        <Text style={{ paddingLeft:15,fontWeight:'200',color:'#000',fontSize:22}}>
                            {`In the last: ${this.state.text}`}
                        </Text>
                    </Col>
                    <Col size={0.5} style={{ justifyContent:'center'}}>
                        <Icon name='chevron-thin-down'
                              size={26}
                              type='entypo'
                              underlayColor='transparent'
                              onPress={() => this.dropdown.open()}  
                        />
                        <Menu ref={(el) => this.dropdown = el }>
                            <MenuTrigger />
                            <MenuOptions>
                                <MenuOption  onSelect={ this.handleWeek }>
                                    <View style={{ elevation:5,height:30,marginVertical:3 }}>
                                        <Text style={{ fontSize:20,fontWeight:'300',color:'#000'}}> 7 Days </Text>		
                                    </View>    
                                </MenuOption>
                                <MenuOption  onSelect={ this.handleMonth }>
                                    <View style={{ elevation:5,height:30,marginVertical:3 }}>
                                        <Text style={{ fontSize:20,fontWeight:'300',color:'#000'}}> 1 Month </Text>		
                                    </View>	
                                </MenuOption>
                                <MenuOption  onSelect={ this.handleYear }>
                                    <View style={{ elevation:5,height:30,marginVertical:3 }}>
                                        <Text style={{ fontSize:20,fontWeight:'300',color:'#000'}}> 1 Year </Text>		
                                    </View>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>        
                    </Col> 
                </Row>
                {
                    (this.state.text === '') &&
                        <View style={{ flex:1,alignSelf:'center' }}>
                            <View style={{ justifyContent:'center'}}>
                                <Text>Select filters to see the pie chart </Text>
                            </View>    
                        </View>
                }    
                {
                    this.state.loading && 
                        <Loader />
                }
                {
                    this.state.showPieChart && this.state.pieData && 
                        <Pie
                            pieWidth={250}
                            pieHeight={250}
                            width={width}
                            height={height}
                            data={this.state.pieData} 
                        />                          
                }
            </View>    
        )
    }
}
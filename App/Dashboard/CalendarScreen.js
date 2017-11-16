import React,{ Component } from 'react';
import { View,Text,TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import _ from 'lodash';

export default class Dashboard extends Component {
    static navigationOptions = ({ navigation }) => {
        return{
            title:'Calendar', 
            headerStyle:{
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
    }
    componentWillMount(){
        this.setState({ 
            numberOfDays: moment(this.props.date).daysInMonth(),
            date:this.props.date
        });
    }
    previousMonth = () => {
        const prevMonth = moment(this.state.date).subtract(1,'M');
        this.setState({
            numberOfDays: moment(prevMonth).daysInMonth(),
            date:moment(prevMonth),
        });
    }
    nextMonth = () => {
        const nextMonth = moment(this.state.date).add(1,'M');
        this.setState({
            numberOfDays: moment(nextMonth).daysInMonth(),
            date:moment(nextMonth),
        });
    }
    onSelectDate(dateNumber){
        const { navigate } = this.props.navigation;
        console.log(dateNumber);
        if(dateNumber > 0 && dateNumber < 10 ){
            dateNumber = `0${dateNumber}`
        }
        let selectedDate = moment(this.state.date).format('YYYY-MM');
        console.log(selectedDate);
        selectedDate = `${selectedDate}-${dateNumber}`
        console.log(selectedDate);
        navigate('MealRecorder',{ date: moment(selectedDate).format('YYYY-MM-DD') });
    }
    render(){
        const { numberOfDays } = this.state;
        const { date } = this.state;
        const MonthText = moment(date).format('MMMM YYYY');
        return(
            <View style={{ flex:1 }}>
                <View style={{ flex:.20,alignSelf:'center',justifyContent:'center' }}>
                    <Text style={{ fontSize:30}}>{MonthText}</Text>
                </View>    
                <View style={{flex:.65,flexDirection:'row',height:200,flexWrap:'wrap',justifyContent:'center'}}>
                    {
                        _.map(_.range(numberOfDays),index => {
                            const dateNumber = index+1;
                            return(
                            <TouchableOpacity  onPress={ this.onSelectDate.bind(this,dateNumber) }
                                               style={{ height:50,width:50,alignItems:'center',borderWidth:1,justifyContent:'center',margin:1,elevation:3 }} 
                                               key={index}
                            >
                                <Text style={{ fontSize:22}}>{dateNumber}</Text>
                            </TouchableOpacity>    
                            )
                        }) 
                    }
                </View>
                <View style={{ flex:0.15,flexDirection:'row',justifyContent:'space-between' }}>
                    <TouchableOpacity onPress={ this.previousMonth }>
                        <Text style={{ fontSize:25 }}> Last Month </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ this.nextMonth }>
                        <Text style={{ fontSize:25 }}>Next Month </Text>
                    </TouchableOpacity>        
                </View>        
            </View>    
        )
    }
}
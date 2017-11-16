import React,{ Component } from 'react';
import { View,Text } from 'react-native';
import { Button,Icon } from 'react-native-elements';
import { Row,Col } from 'react-native-easy-grid';
import { Menu,MenuOption,MenuOptions,MenuTrigger } from 'react-native-popup-menu';

import dropdownChoices from './choices';
import { Colors } from '../Themes'

export default class MealRecorder extends Component {
    dropdown = null
    constructor(props){
        super(props);

        this.state = {
            menu:false,
        }
    }
   
    handleDropdownSelect(value,name){
        console.log(value,name);
        this.props.handleChange(value,name);
    }
    render(){
        return(
            <View style={{ alignItems:'center'}}>
                <Row style={{ borderWidth:2,height:50,margin:10,borderRadius:20,backgroundColor:Colors.snow,elevation:8 }}>
                    <Col size={3} style={{ justifyContent:'center'}}>
                        <Text style={{ fontSize:18,paddingLeft:15,fontWeight:'200',color:'#000',fontSize:22}}>
                            {this.props.label}
                        </Text>
                    </Col>
                    <Col size={0.5} style={{ justifyContent:'center'}}>
                        <Icon name='chevron-thin-down'
                              size={26}
                              type='entypo'
                              color='#000'
                              underlayColor='transparent'
                              onPress={() => this.dropdown.open()}  
                        />
                        <Menu ref={(el) => this.dropdown = el }>
                            <MenuTrigger />
                            <MenuOptions>
                                {
                                    dropdownChoices.map((choice,index) => {
                                        const highlighted = (this.props.activeValue) === (choice.value)
                                        return (
                                            <MenuOption  key={index} onSelect={ this.handleDropdownSelect.bind(this,choice.value,this.props.name) } customStyles={{ optionWrapper:{backgroundColor:highlighted?Colors.charcoal:Colors.snow}}}>
                                                    <View style={{ elevation:5,height:30,marginVertical:3 }}>
											        <Text style={{ fontSize:20,fontWeight:'300',color:highlighted?Colors.snow:'#000'}}> {`${choice.name}`} </Text>		
                                                </View>    
										    </MenuOption>
                                        )
                                    })
                                }
                            </MenuOptions>
                        </Menu>        
                    </Col> 
                </Row>                          
            </View>    
        );
    }
}
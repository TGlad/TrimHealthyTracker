import React, { Component } from 'react'
import { ScrollView, Text, Image, View,TouchableOpacity,AsyncStorage,Keyboard,LayoutAnimation,Platform,Alert } from 'react-native'
import { FormLabel, FormInput,FormValidationMessage,Button,Card,Icon } from 'react-native-elements'
import * as firebase from 'firebase'

import {firebaseApp} from '../Lib/firebase';
import { Constants } from '../Utils/Constants'
import { Metrics,Colors } from '../Themes'
import Loader from '../Components/Loader'
import styles from './Styles/LoginScreenStyles';

export default class Register extends Component {
    static navigationOptions = {
        header:null
    };
    constructor(props){
        super(props);

        this.state = {
            userFullName:'',
            userEmailId:'',
            userPassword:'',
            userConfirmPassword:'',
            loading:false,
        }
        this.formValidation = this.formValidation.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.goToLoginScreen = this.goToLoginScreen.bind(this);
    }

    componentWillMount(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    keyboardDidShow = (e) => {
        // Animation types easeInEaseOut/linear/spring
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        let newSize = Metrics.screenHeight - e.endCoordinates.height
        this.setState({
          visibleHeight: newSize
        })
    }

    keyboardDidHide = (e) => {
        // Animation types easeInEaseOut/linear/spring
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({
          visibleHeight: Metrics.screenHeight
        })
    }

    formValidation(){
        const { userFullName,userEmailId,userPassword,userConfirmPassword } = this.state;
        this.setState({ loading:true });
        if(userFullName === ''){
            return this.setState({ 
                userNameError: true,
                errorMsg:'This field is required',
                loading:false 
            });
        } else if(userEmailId === ''){
            return this.setState({ 
                userEmailError: true,
                errorMsg:'This field is required',
                loading:false 
            })
        } else if(userPassword === ''){
            return this.setState({ 
                userPasswordError: true,
                errorMsg:'This field is required',
                loading:false 
            });
        } else if(userConfirmPassword === ''){
            return this.setState({ 
                userConfirmPasswordError:true,
                errorMsg:'This field is required',
                loading:false 
            })
        } else if(userPassword !== userConfirmPassword){
            return this.setState({ 
                userConfirmPasswordError:true ,
                errorMsg:'Passwords do not match',
                loading:false 
            })
        } else {
            this.registerUser();
        }
    }

    registerUser(){
        const self = this;
        const {userEmailId,userPassword,userFullName} = this.state;
        const { navigate } = this.props.navigation;
        firebaseApp.auth().createUserWithEmailAndPassword(userEmailId , userPassword)
        .then((response) => {
            
            var user = firebaseApp.auth().currentUser;
            console.log(userFullName);
            user.updateProfile({
                displayName: userFullName,
            }).then(function(){
                /*
                let key = `${Constants.store}:${Constants.userInfo}`;
                let userInfo = {
                    name: user.displayName,
                    email:user.email,
                    userId:user.uid,
                }
                */
                self.setState({ loading: false });
                navigate('LoginScreen');    
            }).catch(function(error){
                console.log(error);
                Alert.alert(
                    'Something is not right!',
                    error.message,
                    [
                        {text: 'OK'},
                    ]
                );
                self.setState({ errorUpdatingName: 'name not update',loading:false});
            })
        })
        .catch(error => {
           //console.log('error',error);
           self.setState({error,loading:false})
           console.log(error);
           Alert.alert(
            'Something is not right!',
            error.message,
            [
                {text: 'OK'},
            ]
        );
        })
    }

    goToLoginScreen(){
        const { navigate } = this.props.navigation;
        navigate('LoginScreen');
    }
    render(){
        const { userFullName,userEmailId,userConfirmPassword,userPassword,userNameError,userEmailError,
                userPasswordError,userConfirmPasswordError,visibleHeight,errorMsg } = this.state;
        return(
            <ScrollView  contentContainerStyle={{ flexGrow : 1,justifyContent: 'center' }}
                         centerContent
                         style={[ styles.container,{ height: visibleHeight }]}
                         keyboardShouldPersistTaps='always'
            >
                <Card title='REGISTER' containerStyle={{ elevation:10}} titleStyle={{ fontSize:22,fontWeight:'200'}}>
                    <View style={{ flexDirection:'row',alignContent:'center',marginTop:-5 }}>
                        <Icon name='user'
                                type='entypo'
                                iconStyle={{ paddingLeft:18,marginRight:0,paddingRight:0 }}
                        />        
                        <FormLabel containerStyle={{paddingBottom:12,marginLeft:0,paddingLeft:0 }}
                                    labelStyle={{ fontSize:18,marginLeft:6,color:Colors.charcoal}}     
                        >
                            Full Name
                        </FormLabel>
                    </View>
                    <FormInput  value={userFullName}
                                shake={ userNameError }
                                placeholder='John Smith'
                                placeholderTextColor='#D3D3D3'   
                                containerStyle={{ marginTop:-5}} 
                                returnKeyType='next'
                                returnKeyLabel='next'
                                onChangeText={(name) => this.setState({ userFullName:name,userNameError:false })}
                    />
                    <FormValidationMessage>
                        { userNameError && errorMsg}
                    </FormValidationMessage>

                    <View style={{ flexDirection:'row',alignContent:'center',marginTop:-5 }}>
                        <Icon name='email'
                                type='material-community'
                                iconStyle={{ paddingLeft:18,marginRight:0,paddingRight:0 }}
                        />        
                        <FormLabel containerStyle={{paddingBottom:12,marginLeft:0,paddingLeft:0 }}
                                    labelStyle={{ fontSize:18,marginLeft:6,color:Colors.charcoal}}     
                        >
                            Email ID
                        </FormLabel>
                    </View>   
                    <FormInput  value={userEmailId}
                                shake={ userEmailError }
                                placeholder='john@example.com'
                                placeholderTextColor='#D3D3D3' 
                                containerStyle={{ marginTop:-5}}    
                                returnKeyType='next'
                                returnKeyLabel='next'
                                onChangeText={(email) => this.setState({ userEmailId:email,userEmailError:false })}
                    />
                    <FormValidationMessage>
                        {userEmailError && 'This field is required'}
                    </FormValidationMessage>

                    <View style={{ flexDirection:'row',alignContent:'center',marginTop:-5 }}>
                        <Icon name='key-variant'
                                type='material-community'
                                iconStyle={{ paddingLeft:18,marginRight:0,paddingRight:0 }}
                        />        
                        <FormLabel containerStyle={{paddingBottom:12,marginLeft:0,paddingLeft:0 }}
                                    labelStyle={{ fontSize:18,marginLeft:6,color:Colors.charcoal}}     
                        >
                            Password
                        </FormLabel>
                    </View>  
                    <FormInput  value={userPassword}
                                shake={ userPasswordError }
                                placeholder='*********'  
                                secureTextEntry  
                                placeholderTextColor='#D3D3D3' 
                                containerStyle={{ marginTop:-5}}  
                                returnKeyType='next'
                                returnKeyLabel='next'
                                onChangeText={(password) => this.setState({ userPassword:password,userPasswordError:false })}
                    />
                    <FormValidationMessage>
                        { userPasswordError && 'This field is required'}
                    </FormValidationMessage>

                    <View style={{ flexDirection:'row',alignContent:'center',marginTop:-5 }}>
                        <Icon name='key-variant'
                                type='material-community'
                                iconStyle={{ paddingLeft:18,marginRight:0,paddingRight:0 }}
                        />        
                        <FormLabel containerStyle={{paddingBottom:12,marginLeft:0,paddingLeft:0 }}
                                    labelStyle={{ fontSize:18,marginLeft:6,color:Colors.charcoal}}     
                        >
                            Confirm Password
                        </FormLabel>
                    </View>
                    <FormInput  value={userConfirmPassword}
                                shake={ userConfirmPasswordError } 
                                placeholder='*********'  
                                secureTextEntry  
                                placeholderTextColor='#D3D3D3'
                                containerStyle={{ marginTop:-5}}
                                onChangeText={(confirmPassword) => this.setState({ userConfirmPassword:confirmPassword,userConfirmPasswordError:false })}
                    />
                    <FormValidationMessage>
                        {userConfirmPasswordError && 'This field is required'}
                    </FormValidationMessage>

                    <Button raised
                            rightIcon ={{ name: 'login',type:'entypo',color:Colors.snow }}
                            title='SIGN IN'
                            color={Colors.snow}
                            textStyle={{ fontSize:18}}
                            containerViewStyle={{ borderRadius:30,marginTop:10,elevation:5 }}
                            buttonStyle={{ borderWidth:2,borderRadius:30,backgroundColor:Colors.charcoal}}
                            onPress={ this.formValidation }
                            onLongPress={ this.formValidation }
                    />
                    <TouchableOpacity onPress={ this.goToLoginScreen } onLongPress={ this.goToLoginScreen } style={{alignItems:'center'}}>
                        <Text style={ styles.registerText }>Already a User, Login</Text>
                    </TouchableOpacity>
                </Card>
                {
                    this.state.loading && 
                        <Loader />
                }                     
            </ScrollView>    
        )
    }
}
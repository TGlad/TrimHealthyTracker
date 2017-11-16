import React, { Component } from 'react'
import { ScrollView, Text, Image, View,TouchableOpacity,AsyncStorage,Keyboard,LayoutAnimation,Platform,Alert } from 'react-native'
import { FormLabel, FormInput,FormValidationMessage,Button,Card,Icon } from 'react-native-elements'
import * as firebase from 'firebase'
import SplashScreen from 'react-native-splash-screen';

import {firebaseApp} from '../Lib/firebase';
import { Constants } from '../Utils/Constants'
import { Metrics,Colors } from '../Themes'
import Loader from '../Components/Loader'
import styles from './Styles/LoginScreenStyles';

export default class Register extends Component {
    static navigationOptions = {
        header:null
    };
    keyboardDidShowListener = {}
    keyboardDidHideListener = {}
    constructor(props){
        super(props);

        this.state = {
            userEmailId:'',
            userPassword:'',
            loading:true,
            visibleHeight: Metrics.screenHeight,
        }
        this.formValidation = this.formValidation.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.goToRegisterScreen = this.goToRegisterScreen.bind(this)
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
        const { userEmailId,userPassword } = this.state;
        if(userEmailId === ''){
            return this.setState({ userEmailError: true })
        } else if(userPassword === ''){
            return this.setState({ userPasswordError: true });
        } else {
            this.loginUser();
        }
    }

    loginUser(){
        const self = this;
        const { userEmailId,userPassword } = this.state;
        const { navigate } = this.props.navigation;
        console.log(userEmailId,userPassword)
        this.setState({ loading:true })
        firebaseApp.auth().signInWithEmailAndPassword(userEmailId , userPassword)
        .then(function(response){
            //console.log(response);
            var user = firebaseApp.auth().currentUser;
            let key = `${Constants.store}:${Constants.userInfo}`;
            let userInfo = {
                name: user.displayName,
                email:user.email,
                userId:user.uid,
            }
            try{
                AsyncStorage.setItem(key, JSON.stringify(userInfo));
                self.setState({ loading: false })
                navigate('DashboardScreen');
            }catch(error){
                Alert.alert(error)
                self.setState({ loading: false })
            }
            
        })
        .catch(error => {
            self.setState({ loading: false,error:error })
            Alert.alert(
                'Something is not right!',
                error.message,
                [
                    {text: 'OK'},
                ]
            );

        })
    }
    
    goToRegisterScreen(){
        const { navigate } = this.props.navigation;
        navigate('RegisterScreen');
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }
    componentWillMount(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
        const self = this;
        const { navigate } = this.props.navigation;

        let key = `${Constants.store}:${Constants.userInfo}`;
		AsyncStorage.getItem(key, (err, value) => {
			if (value !== null) {
                let userInfo = JSON.parse(value);
                console.log(userInfo)
                self.setState({
                    loading:false
                });
                navigate('DashboardScreen');
			} else {
                self.setState({
                    loading:false
                });
            }
        });
    }
    render(){
        const { userEmailId,userPassword,userEmailError,
                userPasswordError,visibleHeight } = this.state;
        return(
            <ScrollView contentContainerStyle={{ flexGrow : 1,justifyContent: 'center' }}
                        centerContent
                        style={[ styles.container,{ height: visibleHeight }]}
                        keyboardShouldPersistTaps='always'
            >
                {
                    !this.state.loading &&
                        <Card title='SIGN IN' containerStyle={{ elevation:10}} titleStyle={{ fontSize:22,fontWeight:'200'}}>
                            <View style={{ flexDirection:'row',alignContent:'center' }}>
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
                                        returnKeyType='next'   
                                        onChangeText={(email) => this.setState({ userEmailId:email,userEmailError:false })}
                            />
                            <FormValidationMessage>
                                {userEmailError && 'This field is required'}
                            </FormValidationMessage>

                            <View style={{ flexDirection:'row',alignContent:'center' }}>
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
                                        onChangeText={(password) => this.setState({ userPassword:password,userPasswordError:false })}
                            />
                            <FormValidationMessage>
                                { userPasswordError && 'This field is required'}
                            </FormValidationMessage>

                            <Button raised
                                    rightIcon ={{ name: 'login',type:'entypo',color:Colors.snow }}
                                    title='SIGN IN'
                                    color={Colors.snow}
                                    textStyle={{ fontSize:18}}
                                    containerViewStyle={{ borderRadius:30,marginTop:20,elevation:5 }}
                                    buttonStyle={{ borderWidth:2,borderRadius:30,backgroundColor:Colors.charcoal}}
                                    onPress={ this.formValidation }
                                    onLongPress={ this.formValidation }
                            />
                            <TouchableOpacity onPress={ this.goToRegisterScreen } onLongPress={ this.goToRegisterScreen } style={{alignItems:'center',marginTop:10}}>
                                <Text style={ styles.registerText }>New User, Register ?</Text>
                            </TouchableOpacity>
                        </Card>                     
                    }
                    {
                        this.state.loading && 
                            <Loader />
                    }
            </ScrollView>    
        )
    }
}
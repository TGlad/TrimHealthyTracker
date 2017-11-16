import React,{ Component } from 'react';
import { View,Text,Modal } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';

export default class Loader extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    handleCloseModal = () => {
        console.log("Modal Closed")
    }
    render(){
        return(
            <Modal  transparent={true}
                    animationType='fade'         
                    visible={this.props.isVisible}
                    onRequestClose={this.handleCloseModal}
            >
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center',alignItems: 'center',backgroundColor:'#00000090' }}>
                    <View style={{ width: 120, height: 120,backgroundColor:'#fff',elevation:40,borderRadius:20 }}>
                        <MaterialIndicator />
                    </View>
                </View>        
            </Modal>    
        )
    }
}
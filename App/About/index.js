import React,{ Component } from 'react';
import { View,Text,ScrollView,Linking } from 'react-native';


import { Colors } from '../Themes'
import styles from './AboutStyles'

const UrlText = [
    {
        'text':'Official​ ​THM(c)​ ​books​ ​on​ ​Amazon',
        'url':'http://amzn.to/2ytj1Rp'
    },
    {
        'text':'Official​ ​THM(c)​ ​Website',
        'url':'https://trimhealthymama.com/'
    },
    {
        'text':'Podcast',
        'url':'https://itunes.apple.com/us/podcast/trim-healthy-podcast-with-serene-and-pearl/id1202267992?mt=2'
    },
    {
        'text':'THM​ ​Facebook​ ​Page',
        'url':'https://www.facebook.com/TrimHealthyMama/'
    },
    
]

export default class Dashboard extends Component {
    static navigationOptions = ({ navigation }) => {
        return{
            title:'About/FAQ', 
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
        
    }
    goToUrl(data){
        const url = data.url
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              Alert.alert('Sorry Link can not be opened');
            }
        });
    }
    render(){
        return(
            <ScrollView style={{ marginHorizontal:10 }}
                        showsVerticalScrollIndicator={false}

            >
                <Text style={ styles.headerText }>
                    +What​ ​is​ ​Trim​ ​Healthy​ ​Tracker?
                </Text>
                <Text>    
                    Trim​ ​Healthy​ ​Tracker​ ​is​ ​an​ ​app​ ​to​ ​help​ ​you​ ​along​ ​your​ ​Trim​ ​Healthy​ ​Mama(c)​ ​journey.​ ​It​ ​is​ ​a​ ​tool
                    that​ ​can​ ​help​ ​you​ ​keep​ ​track​ ​of​ ​your​ ​meals​ ​and​ ​fuel​ ​types,​ ​to​ ​motivate​ ​you​ ​to​ ​stay​ ​on​ ​plan,​ ​and
                    reflect​ ​to​ ​see​ ​how​ ​you​ ​are​ ​currenting​ ​“doing”​ ​THM(c).​ ​This​ ​app​ ​is​ ​not​ ​affiliated​ ​nor​ ​endorsed​ ​by
                    THM(c).
                </Text>
                <Text style={ styles.headerText }>    
                    +What​ ​are​ ​S​ ​meals​ ​and​ ​E​ ​meals?
                </Text>  
                <Text>  
                    The​ ​terms​ ​“S”,​ ​“E”,​ ​“FP”,​ ​“XO”,​ ​etc.​ ​are​ ​terms​ ​from​ ​and​ ​used​ ​by​ ​Trim​ ​Healthy​ ​Mama(c)​ ​to​ ​denote
                    different​ ​fuel​ ​types.​ ​This​ ​app​ ​will​ ​make​ ​more​ ​sense​ ​if​ ​you​ ​are​ ​already​ ​familiar​ ​with​ ​the​ ​basics​ ​of
                    the​ ​THM(c)​ ​plan,​ ​whether​ ​you​ ​are​ ​just​ ​getting​ ​started​ ​or​ ​a​ ​long-term​ ​follower.​ ​To​ ​learn​ ​more
                    about​ ​them,​ ​and​ ​about​ ​THM(c),​ ​please​ ​refer​ ​to​ ​THM(c)​ ​books​ ​and​ ​website.
                </Text>    
                <Text style={ styles.headerText }> 
                    +How​ ​do​ ​I​ ​use​ ​this​ ​app?
                </Text>
                <Text>    
                    Get​ ​started​ ​by​ ​tracking​ ​your​ ​meals​ ​for​ ​a​ ​day.​ ​No​ ​need​ ​to​ ​look​ ​up​ ​every​ ​single​ ​food,​ ​calorie​ ​or
                    nutrient​ ​like​ ​other​ ​meal​ ​trackers...just​ ​chose​ ​whether​ ​it​ ​was​ ​an​ ​“S”,​ ​“E”,​ ​or​ ​something​ ​else.​ ​The
                    more​ ​meals​ ​you​ ​keep​ ​track​ ​of​ ​in​ ​the​ ​app,​ ​the​ ​more​ ​info​ ​about​ ​your​ ​choices​ ​is​ ​reflected​ ​back​ ​to
                    you.​ ​Go​ ​to​ ​the​ ​analyze​ ​page,​ ​pick​ ​a​ ​length​ ​of​ ​time,​ ​and​ ​see​ ​what​ ​your​ ​current​ ​mix​ ​of​ ​fuels​ ​is.​ ​Are
                    you​ ​stuck​ ​in​ ​an​ ​S​ ​rut?​ ​Too​ ​many​ ​crossovers?​ ​The​ ​data​ ​is​ ​right​ ​there​ ​in​ ​front​ ​of​ ​you.​ ​Think​ ​about
                    how​ ​you​ ​are​ ​feeling,​ ​and​ ​what​ ​kind​ ​of​ ​results​ ​you​ ​are​ ​getting.​ ​Remember,​ ​the​ ​right​ ​combo​ ​of
                    fuels​ ​is​ ​different​ ​for​ ​everyone,​ ​and​ ​can​ ​change​ ​depending​ ​on​ ​your​ ​season.
                </Text>
                <Text style={ styles.headerText }>    
                    +How​ ​can​ ​I​ ​learn​ ​more​ ​about​ ​THM(c)?
                </Text>
                <View style={{flexDirection:'column'}}>
                    {
                        UrlText.map((data,index) => {
                            return(
                                <Text style={ styles.linkText }
                                      key={index}  
                                      onPress={ this.goToUrl.bind(this,data)}
                                >
                                 {`${data.text}` } 
                                </Text>        
                            )
                        })
                    }
                </View>    
                <Text style={ styles.headerText }>
                    +Feedback/Contact
                </Text>
                <Text>    
                    To​ ​let​ ​us​ ​know​ ​if​ ​something​ ​isn’t​ ​working​ ​right​ ​in​ ​the​ ​app,​ ​or​ ​to​ ​give​ ​any​ ​other​ ​feedback,​ ​please
                    email​ ​us​ ​at:
                    trimhealthytrackerapp@gmail.com
                </Text>    
            </ScrollView>    
        )
    }
}
import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ART,
  LayoutAnimation,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

const {
  Surface,
  Group,
  Rectangle,
  Shape,
} = ART;

const d3 = {
    scale,
    shape,
};

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import AnimShape from './AnimShape';
import { Colors,Metrics } from '../Themes';

import styles from './Styles/PieStyles';

export default class Pie extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            highlightedIndex: 0 
        }
        this._createPieChart = this._createPieChart.bind(this);
        this._value = this._value.bind(this);
        this._label = this._label.bind(this);
        this._color = this._color.bind(this);
        this._onPieItemSelected = this._onPieItemSelected.bind(this);
        this._getPercentageValue = this._getPercentageValue.bind(this);
    }

    _value(item) { 
        const { totalValue } = this.state;
        console.log(totalValue);
        return ((item.count/totalValue)*100).toFixed(2); 
    }
    
    _label(item) { 
        return item.name; 
    }
    _color(index) { 
        return Colors.colors[index]; 
    } 
    _onPieItemSelected(index) {
        this.setState({ highlightedIndex: index});
    } 
    _createPieChart(index) {
        var arcs = d3.shape.pie()
            .value(this._value)
            (this.props.data);
    
        var hightlightedArc = d3.shape.arc()
          .outerRadius(this.props.pieWidth/2 + 10)
          .padAngle(.05)
          .innerRadius(30);
    
        var arc = d3.shape.arc()
          .outerRadius(this.props.pieWidth/2)
          .padAngle(.05)
          .innerRadius(30);
    
        var arcData = arcs[index];
        var path = (this.state.highlightedIndex == index) ? hightlightedArc(arcData) : arc(arcData);
    
         return {
           path,
           color: this._color(index),
        };
    }
    _getPercentageValue(item){
        const { totalValue } = this.state;
        return ((item.count/totalValue)*100).toFixed(2);   
    }
    componentWillMount(){
        let totalValue = 0;
        console.log(this.props.data);
        this.props.data.map( (item,index) => {
            totalValue += item.count
        })
        this.setState({ 
            totalValue,
            data:this.props.data,
         });
    }
    componentWillReceiveProps(nextProps){
        let totalValue = 0;
        console.log(nextProps.data);
        nextProps.data.map( (item,index) => {
            totalValue += item.count
        })
        this.setState({ 
            totalValue,
            data:nextProps.data 
        });
    }
   
    render(){
        const margin = 20;
        const x = this.props.pieWidth / 2 + margin;
        const y = this.props.pieHeight / 2 + margin;
        return(
            <View >
                <View style={{ width:Metrics.screenWidth,marginHorizontal:(Metrics.screenWidth-this.props.pieWidth)/2-margin }}>
                    <Surface width={Metrics.screenWidth} height={this.props.height} style={{ justifyContent:'center',alignItems:'center'}}>
                        <Group x={x} y={y}>
                        {
                            this.state.data &&
                                this.state.data.map( (item, index) =>
                                (<AnimShape
                                    key={'pie_shape_' + index}
                                    color={this._color(index)}
                                    d={ () => this._createPieChart(index)}
                                />)
                                )
                        }
                        </Group>
                    </Surface>
                </View>    
                <View style={{ flexDirection:'row',flexWrap:'wrap',alignItems:'center',position:'relative'}}>
                    {
                        this.props.data.map( (item, index) => {
                            var fontWeight = this.state.highlightedIndex == index ? 'bold' : 'normal';
                            return (
                                <TouchableWithoutFeedback key={index} onPress={() => this._onPieItemSelected(index)}  >
                                    <View style={{ paddingHorizontal:32,paddingVertical:10,flexDirection:'row' }}>
                                        <Text style={{height:10,width:10,borderWidth:2,borderColor:this._color(index),backgroundColor:this._color(index),alignSelf:'center',marginTop:5,marginRight:8}}></Text>
                                        <Text style={[styles.label, {color: this._color(index), fontWeight: fontWeight}]}>
                                            {this._label(item)}: {this._getPercentageValue(item)}%
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        })
                    }
                </View>
            </View>
        )
    }
}
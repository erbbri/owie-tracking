import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { Checkbox, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';

import { AntDesign } from '@expo/vector-icons';

import { HistoryContext } from '../context/HistoryContext';

export default class RenderHistory extends Component {
    constructor(props) {
        super(props);
      }

    static contextType = HistoryContext; 

    render(){  
        const tempDate = this.props.date; 
        const dateArray = tempDate.split("-"); 
        const newDate = dateArray[0] + "-" + dateArray[1] + "-" + dateArray[2]; 

        if(this.props.trackerType == "checkbox"){
         return (
          <View style={[styles.view, {backgroundColor: this.props.backgroundColor}]}>
          <Text style={{color: this.props.dateColor, fontSize: 22, marginTop: 2}}> {newDate} </Text>
          <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: '2%'}}></View>
          <AntDesign
                name="checksquareo"
                size={25}
                color= "gray"
              />
          <Text style={{color: this.props.color, fontSize: 22, marginTop: 2}}> {this.props.trackerName} </Text>
          </View>
          <View style={{backgroundColor: 'transparent', marginRight: 10}}>
          </View>
          </View>
        );
      }
      if(this.props.trackerType == 'text'){
        return(
          <View style={[styles.view, {backgroundColor: this.props.backgroundColor}]}>
          <Text style={{color: this.props.dateColor, fontSize: 22, marginTop: 2}}> {newDate} </Text>
          <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: '2%'}}></View>
          <Text style={{color: this.props.color, fontSize: 22, marginTop: 2}}>{this.props.trackerName} </Text>
          </View>
          <Text style={{color: 'gray', fontSize: 20, marginTop: 2, paddingLeft: 10}}>{this.props.input}</Text>
          <View style={{backgroundColor: 'transparent', marginRight: 10}}>
          </View>
          </View>
          )
      }
      if(this.props.trackerType == 'slider'){
        return(
          <View style={[styles.view, {backgroundColor: this.props.backgroundColor}]}>
          <Text style={{color: this.props.dateColor, fontSize: 22, marginTop: 2}}> {newDate} </Text>
          <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: '2%'}}></View>
          <Text style={{color: this.props.color, fontSize: 22, marginTop: 2}}>{this.props.trackerName} </Text>
          </View>
          <Text style={{color: 'gray', fontSize: 22, marginTop: 2}}> Slider Value: {this.props.scale} </Text>
          <View style={{backgroundColor: 'transparent', marginRight: 10}}>
          </View>
          </View>
          )
      }
      else {return null}
      }
    }; 
      
     
     RenderHistory.propTypes = {
        trackerType: PropTypes.string,
        trackerName: PropTypes.string,
        trackerID: PropTypes.any,
        date: PropTypes.string,
        checked: PropTypes.any, 
        scale: PropTypes.any,
        input: PropTypes.any, 
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
        dateColor: PropTypes.string,
      }
    
      const styles = StyleSheet.create({
        view: {
          marginLeft: '2%',
          marginRight: '2%',
         // flexDirection: 'row',
         // alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 8,
          paddingTop: 3,
          paddingBottom: 3,
          borderColor: 'black',
          borderWidth: 1,
         // flex: 1,
        },
      });


import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Slider } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { Checkbox, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';

import { HistoryContext } from '../context/HistoryContext';

export default class RenderTracker extends Component {
  constructor(props) {
          super(props);
          this.state = { isSelected: 'unchecked', toRender: true, sliderValue: 0, text: '' }; 
        }

  static contextType = HistoryContext; 

  isChecked(){
    if (this.state.isSelected === 'checked') {
      return false; 
    }
    else{
      return true; 
    }; 
  }

  updateText = async (newText)=> {
   await this.setState({text: newText})
    console.log(this.state.text)
  }

  sliderMoved(value){
    this.setState({sliderValue: value})
  }
  
  setChecked(isSelected){
    if(isSelected === 'checked'){
      this.setState({isSelected: 'unchecked'}); 
    }
    else {
      this.setState({isSelected: 'checked'});
    }
  }

  buttonPress(trackerID, trackerName, trackerType){
    const context = this.context
    var day = String(new Date().getDate()).padStart(2, '0'); 
    var month = String(new Date().getMonth() + 1).padStart(2, '0'); 
    var year = new Date().getFullYear(); 
    var date = day + '-' + month + '-' + year; 
    //console.log(date)
    if(trackerType == 'checkbox'){
      context.addNewEntry(trackerID, trackerName, trackerType, date, this.state.isSelected , 0, '')
    }
    if(trackerType == 'text'){
      context.addNewEntry(trackerID, trackerName, trackerType, date, 'unchecked', 0, this.state.text)
    }
    if(trackerType == 'slider'){
      context.addNewEntry(trackerID, trackerName, trackerType, date, 'unchecked', this.state.sliderValue, '')
    }
    this.setState({toRender: false})
  }


  render(){  
    if(this.props.trackerType == 'checkbox' && this.state.toRender == true){
    return (
      <View style={[styles.view, {backgroundColor: this.props.backgroundColor}]}>
      <View style={{backgroundColor: 'transparent', flexDirection: 'row'}}>
      <View style={{marginLeft: '2%'}}></View>
      <Checkbox
        color={'#3a5140'}
        status={this.state.isSelected}
        onPress={() => this.setChecked(this.state.isSelected)
        }
      ></Checkbox>
      <Text style={{color: this.props.color, fontSize: 22, marginTop: 2}}>{this.props.trackerName}</Text>
      </View>
      <View style={{backgroundColor: 'transparent', marginRight: 10}}>
      <IconButton icon="checkbox-marked-circle-outline" size={30} color={this.props.color} disabled={this.isChecked()} onPress={() => this.buttonPress(this.props.trackerID, this.props.trackerName, this.props.trackerType)}/> 
      </View>
      </View>
    );
    }
    if (this.props.trackerType == 'text' && this.state.toRender == true){
    return(
      <View style={[styles.textview, {backgroundColor: this.props.backgroundColor}]}>
      <View style={{backgroundColor: this.props.backgroundColor, alignSelf: 'flex-start', paddingBottom: 2,
          flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',}}>
      <Text style={{ color: this.props.color, fontSize: 22,}}>   {this.props.trackerName}</Text>
      <View style={{backgroundColor: 'transparent', marginRight: 10, alignSelf: 'flex-end'}}>
      <IconButton icon="checkbox-marked-circle-outline" size={30} color={this.props.color} onPress={() => this.buttonPress(this.props.trackerID, this.props.trackerName, this.props.trackerType)}/> 
      </View>
      </View>
      <View style={{backgroundColor: 'transparent', borderWidth: 2, borderColor: 'gray', 
        width: '95%', height: '60%', }}>
      <TextInput
        placeholder=' Type Here...'
        style={{fontSize: 20, textAlignVertical: 'top'}}
        multiline={true}
        numberOfLines={5}
        value={this.state.text}
        onChangeText={(newText) => this.updateText(newText)}
      />
      </View>
      </View>
      )
    }
    else if (this.props.trackerType == 'slider' && this.state.toRender == true){
      return(
        <View style={[styles.sliderview, {backgroundColor: this.props.backgroundColor}]}>
        <View style={{backgroundColor: this.props.backgroundColor, alignSelf: 'flex-start', paddingBottom: 2,
          flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',}}>
      <Text style={{ color: this.props.color, fontSize: 22,}}>   {this.props.trackerName}</Text>
      <View style={{backgroundColor: 'transparent', marginRight: 10, alignSelf: 'flex-end'}}>
      <IconButton icon="checkbox-marked-circle-outline" size={30} color={this.props.color} onPress={() => this.buttonPress(this.props.trackerID, this.props.trackerName, this.props.trackerType)}/> 
      </View>
      </View>
      <View style={{ backgroundColor: 'transparent', width: '100%', alignItems: 'center', paddingTop: 4}}>
        <Slider
          maximumValue={this.props.sliderMax} minimumValue={this.props.sliderMin} 
          step={1} trackStyle={{height: 10, backgroundColor: 'transparent'}}
          thumbStyle={{width: 20, height: 20, color: "#aad5b5", backgroundColor: '#aad5b5'}}
          thumbProps={{
            children: (
              <View
                style={{
                  marginTop: -25,
                  width: 30,
                  backgroundColor: 'transparent',
                }}>
                <Text style={{ color: this.props.color, fontSize: 20}}> {this.state.sliderValue} </Text>
                </View>
            )}}
          value={this.state.sliderValue} 
          onValueChange={value => this.sliderMoved(value)} 
          style={styles.slider}></Slider>
          </View>
        <View style={{marginRight: 10, backgroundColor: this.props.backgroundColor, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between',
      marginLeft: '15%', marginRight: '15%'}}>
          <Text style={{ color: this.props.color, fontSize: 20}}>{this.props.sliderMin}</Text>
          <Text style={{ color: this.props.color, fontSize: 20}}>{this.props.sliderMax}</Text>
        </View>
        </View>
        )
      }
    else {
      return(null);
    }
  }
  };
  
 
 RenderTracker.propTypes = {
    trackerType: PropTypes.string,
    trackerName: PropTypes.string,
    trackerID: PropTypes.any,
    sliderMin: PropTypes.any,
    sliderMax: PropTypes.any,
    color: PropTypes.string,
    backgroundColor: PropTypes.string, 
  }

  const styles = StyleSheet.create({
    view: {
      marginLeft: '2%',
      marginRight: '2%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
      paddingTop: 3,
      paddingBottom: 3,
      borderColor: 'black',
      borderWidth: 1,
      flex: 1,
    },

    sliderview: {
      marginLeft: '2%',
      marginRight: '2%',
      alignItems: 'center',
      marginTop: 8,
      paddingTop: 3,
      paddingBottom: 10,
      borderColor: 'black',
      borderWidth: 1,
      flex: 2,
    },
    
    textview: {
      marginLeft: '2%',
      marginRight: '2%',
      alignItems: 'center',
      marginTop: 8,
      paddingTop: 3,
      paddingBottom: 10,
      borderColor: 'black',
      borderWidth: 1,
      flex: 1,
    },

    slider: {
      width: '70%',
      height: 40,

    }
  });
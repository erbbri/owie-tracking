import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { Checkbox } from 'react-native-paper';
import PropTypes from 'prop-types';

export default class RenderTracker extends Component {
  constructor(props) {
          super(props);
          this.state = { isSelected: 'unchecked' }; 
        }
  
  setChecked(isSelected){
    if(isSelected === 'checked'){
      this.setState({isSelected: 'unchecked'}); 
    }
    else {
      this.setState({isSelected: 'checked'}); 
    }
  }

  render(){  
    if(this.props.trackerType == 'checkbox'){
    return (
      <View style={[styles.view, {backgroundColor: this.props.backgroundColor}]}>
      <View style={{marginLeft: '2%'}}></View>
      <Checkbox
        color={'#3a5140'}
        status={this.state.isSelected}
        onPress={() => this.setChecked(this.state.isSelected)
        }
      ></Checkbox>
      <Text style={{color: this.props.color, fontSize: 22}}>{this.props.trackerName}</Text>
      </View>
    );
    }
    else if (this.props.trackerType == 'slider'){
    return(
      <View style={[styles.sliderview, {backgroundColor: this.props.backgroundColor}]}>
      <View style={{backgroundColor: this.props.backgroundColor, alignSelf: 'center'}}>
      <Text style={{ color: this.props.color, fontSize: 22}}>   {this.props.trackerName}</Text>
      <Text></Text>
      </View>
      <Slider maximumValue={this.props.sliderMax} minimumValue={this.props.sliderMin} 
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
              <Text style={{ color: this.props.color, fontSize: 20}}> {this.state.value} </Text>
              </View>
          )}}
        value={this.state.value} onValueChange={value => this.setState({ value })} style={styles.slider}></Slider>
      <View style={{backgroundColor: this.props.backgroundColor, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between',
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

    slider: {
      width: '70%',
      height: 40,

    }
  });
import React, { Component, useContext } from 'react';
import { TextInput, StyleSheet, Modal, Pressable } from 'react-native';
import { Slider } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { Checkbox, IconButton, Colors, Button } from 'react-native-paper';
import PropTypes from 'prop-types';

import { TrackersContext } from '../context/TrackersContext';


export default class EditTracker extends Component {
  constructor(props) {
          super(props);
          this.state = { modalVisible: false, newName: ''}; 
        }

  static contextType = TrackersContext; 

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible})
  }

  remove(trackerName){
      const context = this.context; 
      context.removeTracker(trackerName); 
      context.refreshTrackers(); 
  }

  edit(newName, trackerName){
      const context = this.context;
      if (newName) {
        context.editName(newName, trackerName); 
        console.log('new name'); 
      // context.refreshTrackers(); 
      }
  }
  

  render(){  
    const { modalVisible } = this.state; 
    if(this.props.trackerType == 'checkbox'){
    return (
      <View>
      <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <TextInput value={this.newName} placeholder={this.props.trackerName}/>
            <IconButton icon="check" onPress={() => console.log('pressedS')} />
            <IconButton icon="close" onPress={() => this.setModalVisible(!modalVisible)} />
            </View>
          </View>
      </Modal>

      <View style={[styles.view, {backgroundColor: this.props.backgroundColor}]}>
      <View style={{marginLeft: '2%'}}></View>
      <Checkbox
        color={'#3a5140'}
        status={'checked'}
        disabled={true}
      ></Checkbox>
      <Text style={{color: this.props.color, fontSize: 22}}>{this.props.trackerName}</Text>
      <IconButton icon="circle-edit-outline" onPress={()=>this.setModalVisible(true)} />
      <IconButton icon="trash-can-outline" onPress={()=>this.remove(this.props.trackerName)} />
      </View>
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
 
EditTracker.propTypes = {
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

    }, 

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: 'transparent',
    },

    
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      width: '90%',
      height: '30%',
      padding: 80,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
  });
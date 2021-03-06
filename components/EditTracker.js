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
          this.state = { EditCheckModalVisible: false, 
                    EditSliderModalVisible: false, 
                    DeleteModalVisible: false, 
                    NewName: 'one',
                  }; 
        };
  
  static contextType = TrackersContext; 

  handleChange = (name) => {
    console.log(name)
    this.setNewName(name)
  }

  handlePress = () => {
      console.log(this.state.NewName)
      this.changeName(this.state.NewName, this.props.trackerID)
      this.setEditCheckModalVisible(false)
      this.setEditSliderModalVisible(false)
  }

  setNewName = (name) => {
    this.setState({NewName: name})
  }

  setEditCheckModalVisible = (visible) => {
    this.setState({EditCheckModalVisible: visible})
  }

  setEditSliderModalVisible = (visible) => {
    this.setState({EditSliderModalVisible: visible})
  }

  setDeleteModalVisible = (visible) => {
    this.setState({DeleteModalVisible: visible})
  }

  async remove(trackerID, notifID){
      const context = this.context; 
      await context.removeTracker(trackerID, notifID); 
      context.refreshTrackers(); 
  }

  changeName(NewName, trackerID){
      const context = this.context;
      if (NewName) {
        context.editName(NewName, trackerID); 
        console.log('new name'); 
        context.refreshTrackers(); 
      }
  }

  render(){  
    const { EditCheckModalVisible } = this.state; 
    const { EditSliderModalVisible } = this.state; 
    const { DeleteModalVisible } = this.state; 
    const { NewName } = this.state; 

    if(this.props.trackerType == 'checkbox'){
    return (
      <View>
      <Modal
          transparent={true}
          visible={EditCheckModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setEditCheckModalVisible(!EditCheckModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {backgroundColor: this.props.backgroundColor}]}>
            <Text style={{color: this.props.color, fontSize: 25, alignSelf: 'center', marginTop: 10}}>Rename Tracker:</Text>
            <View style={{backgroundColor:'transparent', flexDirection: 'row', alignItems: 'center', flex: 1}}>
             <View style={{ marginLeft: 40, marginTop: 0, borderWidth: 2, borderColor: 'gray', backgroundColor: 'transparent', width: '70%'}}>
              <TextInput style={{fontSize: 22}} 
                placeholder={" " + this.props.trackerName} 
                onChangeText={name => this.handleChange(name)}/>
              </View>
             <IconButton style={{marginTop: 5}} icon="check" size={30} onPress={() => this.handlePress()} />
             </View>
            <View style={{flex: 1, backgroundColor: 'transparent', height: '60%', width: '99%', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <IconButton icon="close" size={30} onPress={() => this.setEditCheckModalVisible(!EditCheckModalVisible)} />
            </View>
            </View>
          </View>
      </Modal>

      <Modal
          transparent={true}
          visible={DeleteModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setDeleteModalVisible(!DeleteModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {backgroundColor: this.props.backgroundColor}]}>
            <View style={{backgroundColor:'transparent', padding: 10, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 2}}>
              <Text style={{color: this.props.color, fontSize: 25}}> 
                Are you sure you want to delete {this.props.trackerName}?</Text> 
             </View> 
            <View style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-around', margin: 3, flex: 1 }}>
            <Button style={{width: '48%', borderRadius: 15, justifyContent: 'center'}} mode="contained" color={this.props.color} size={40} onPress={() => this.remove(this.props.trackerID, this.props.notifID)}> Yes, Delete </Button>
            <Button style={{width: '48%', borderRadius: 15, justifyContent: 'center'}} mode="contained" color={this.props.color}  size={40} onPress={() => this.setDeleteModalVisible(!DeleteModalVisible)}> No Go Back</Button>
            </View>
            </View>
            </View>
      </Modal>

      <View style={[styles.view, {backgroundColor: this.props.backgroundColor}]}>
      <View style={{marginLeft: '2%', backgroundColor: 'transparent', flexDirection: 'row', 
        width: '99%', paddingTop: 5, paddingBottom: 5, alignItems: 'center'}}>
      <Checkbox
        color={'#3a5140'}
        status={'checked'}
        disabled={true}
      ></Checkbox>
      <Text style={{color: this.props.color, fontSize: 22, width: '64%', paddingLeft: 12}}>{this.props.trackerName}</Text>
      <IconButton color={this.props.color} icon="circle-edit-outline" onPress={()=>this.setEditCheckModalVisible(true)} />
      <IconButton color={this.props.color} icon="trash-can-outline" onPress={()=>this.setDeleteModalVisible(true)} />
      </View>
      </View>
      </View>
    );
    }
    if (this.props.trackerType == 'text'){
      return(
        <View>
<Modal
          transparent={true}
          visible={EditCheckModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setEditCheckModalVisible(!EditCheckModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {backgroundColor: this.props.backgroundColor}]}>
            <Text style={{color: this.props.color, fontSize: 25, alignSelf: 'center', marginTop: 10}}>Rename Tracker:</Text>
            <View style={{backgroundColor:'transparent', flexDirection: 'row', alignItems: 'center', flex: 1}}>
             <View style={{ marginLeft: 40, marginTop: 0, borderWidth: 2, borderColor: 'gray', backgroundColor: 'transparent', width: '70%'}}>
              <TextInput style={{fontSize: 22}} 
                placeholder={" " + this.props.trackerName} 
                onChangeText={name => this.handleChange(name)}/>
              </View>
             <IconButton style={{marginTop: 5}} icon="check" size={30} onPress={() => this.handlePress()} />
             </View>
            <View style={{flex: 1, backgroundColor: 'transparent', height: '60%', width: '99%', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <IconButton icon="close" size={30} onPress={() => this.setEditCheckModalVisible(!EditCheckModalVisible)} />
            </View>
            </View>
          </View>
      </Modal>

      <Modal
          transparent={true}
          visible={DeleteModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setDeleteModalVisible(!DeleteModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {backgroundColor: this.props.backgroundColor}]}>
            <View style={{backgroundColor:'transparent', padding: 10, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 2}}>
              <Text style={{color: this.props.color, fontSize: 25}}> 
                Are you sure you want to delete {this.props.trackerName}?</Text> 
             </View> 
            <View style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-around', margin: 3, flex: 1 }}>
            <Button style={{width: '48%', borderRadius: 15, justifyContent: 'center'}} mode="contained" color={this.props.color} size={40} onPress={() => this.remove(this.props.trackerID, this.props.notifID)}> Yes, Delete </Button>
            <Button style={{width: '48%', borderRadius: 15, justifyContent: 'center'}} mode="contained" color={this.props.color}  size={40} onPress={() => this.setDeleteModalVisible(!DeleteModalVisible)}> No Go Back</Button>
            </View>
            </View>
            </View>
      </Modal>
       
        <View style={[styles.textview, {backgroundColor: this.props.backgroundColor}]}>
        <View style={{backgroundColor: this.props.backgroundColor, alignSelf: 'flex-start', paddingBottom: 2,
          flexDirection: 'row', width: '99%', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{ color: this.props.color, fontSize: 22, width: '75%', paddingLeft: 12}}>{this.props.trackerName}</Text>
        <View style={{backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end',}}>
          <IconButton color={this.props.color} icon="circle-edit-outline" onPress={()=>this.setEditCheckModalVisible(true)} />
          <IconButton color={this.props.color} icon="trash-can-outline" onPress={()=>this.setDeleteModalVisible(true)} />
        </View>
        </View>
        <View style={{backgroundColor: 'transparent', borderWidth: 2, borderColor: 'gray', 
          width: '95%', height: '60%', }}>
        <TextInput
          editable={false}
          placeholder=' Type Here...'
          style={{fontSize: 20, textAlignVertical: 'top'}}
          multiline={true}
          numberOfLines={5}
        />
        </View>
        </View>
        </View>
        )
      }
    else if (this.props.trackerType == 'slider'){
      return(
        <View> 
          <Modal
          transparent={true}
          visible={EditSliderModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setEditSliderModalVisible(!EditSliderModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {backgroundColor: this.props.backgroundColor}]}>
            <Text style={{color: this.props.color, fontSize: 25, alignSelf: 'center', marginTop: 10}}>Rename Tracker:</Text>
            <View style={{backgroundColor:'transparent', flexDirection: 'row', alignItems: 'center', flex: 2}}>
             <View style={{ marginLeft: 40, marginTop: 40, borderWidth: 2, borderColor: 'gray', backgroundColor: 'transparent', width: '70%'}}>
              <TextInput style={{fontSize: 22}} 
                placeholder={" " + this.props.trackerName} 
                onChangeText={name => this.handleChange(name)}/>
              </View>
             <IconButton style={{marginTop: 35}} icon="check" size={30} onPress={() => this.handlePress()} />
             </View>
            <View style={{flex: 1, backgroundColor: 'transparent', height: '60%', width: '99%', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <IconButton icon="close" size={30} onPress={() => this.setEditSliderModalVisible(!EditSliderModalVisible)} />
            </View>
            </View>
          </View>
      </Modal>

      <Modal
          transparent={true}
          visible={DeleteModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setDeleteModalVisible(!DeleteModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {backgroundColor: this.props.backgroundColor}]}>
            <View style={{backgroundColor:'transparent', padding: 10, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 2}}>
              <Text style={{color: this.props.color, fontSize: 25}}> 
                Are you sure you want to delete {this.props.trackerName}?</Text> 
             </View> 
            <View style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-around', margin: 3, flex: 1 }}>
            <Button style={{width: '48%', borderRadius: 15, justifyContent: 'center'}} mode="contained" color={this.props.color} size={40} onPress={() => this.remove(this.props.trackerID, this.props.notifID)}> Yes, Delete </Button>
            <Button style={{width: '48%', borderRadius: 15, justifyContent: 'center'}} mode="contained" color={this.props.color}  size={40} onPress={() => this.setDeleteModalVisible(!DeleteModalVisible)}> No Go Back</Button>
            </View>
            </View>
            </View>
      </Modal>

        <View style={[styles.sliderview, {backgroundColor: this.props.backgroundColor}]}>
        <View style={{backgroundColor: this.props.backgroundColor, alignSelf: 'flex-start', paddingBottom: 2,
          flexDirection: 'row', justifyContent: 'space-between', width: '99%', alignItems: 'center',}}>
        <Text style={{ color: this.props.color, fontSize: 22, paddingLeft: 12, width: '75%', paddingLeft: 12}}>{this.props.trackerName}</Text>
        <View style={{backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end',}}>
          <IconButton color={this.props.color} icon="circle-edit-outline" onPress={()=>this.setEditSliderModalVisible(true)} />
          <IconButton color={this.props.color} icon="trash-can-outline" onPress={()=>this.setDeleteModalVisible(true)} />
        </View>
        </View>
        <View style={{ backgroundColor: 'transparent', width: '100%', alignItems: 'center', paddingTop: 4}}>
        <Slider disabled={true} maximumValue={this.props.sliderMax} minimumValue={this.props.sliderMin} 
          step={1} trackStyle={{height: 10, backgroundColor: 'transparent'}}
          thumbStyle={{width: 20, height: 20, color: "gray", backgroundColor: 'gray'}}
          thumbProps={{
            children: (
              <View
                style={{
                  marginTop: -25,
                  width: 30,
                  backgroundColor: 'transparent',
                }}>
                </View>
            )}}
          value={this.state.value} onValueChange={value => this.setState({ value })} style={styles.slider}></Slider>
          </View>
        <View style={{backgroundColor: this.props.backgroundColor, flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between',
      marginLeft: '15%', marginRight: '15%'}}>
          <Text style={{ color: this.props.color, fontSize: 20}}>{this.props.sliderMin}</Text>
          <Text style={{ color: this.props.color, fontSize: 20}}>{this.props.sliderMax}</Text>
        </View>
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
    trackerID: PropTypes.any, 
    notifID: PropTypes.any,
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
      borderRadius: 20,
      width: '90%',
      height: '30%',
      //padding: 20,
      //alignItems: "center",
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
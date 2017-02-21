/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  Image,
  View
} from 'react-native';


var REQUEST_URL = 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0';


export default class reactNative extends Component {
	state = {
		dataSource: new ListView.DataSource({
	        rowHasChanged: (row1, row2) => row1 !== row2,
	       }),
	    loaded: false,
    }

	componentDidMount() {
    	this.fetchData();
  	}

	fetchData() {
	    fetch(REQUEST_URL)
	      .then((response) => response.json())
	      .then((responseData) => {
	        this.setState({
	          dataSource: this.state.dataSource.cloneWithRows(responseData.subjects),
	          loaded: true,
	        });
	      })
	     .done();
  }

  render() {
    if(!this.state.loaded){
    	return this.renderLoadingView();
    }	
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  }

  renderLoadingView(){
  	return(
		<View style={styles.container}>
			<Text>
				Loading moives...
			</Text>
		</View>
  	);
  }

  renderMovie(subject){
  	return(
		<View style={styles.container}>
			<Image 
			source={{uri:subject.cover}}
			style={styles.thumbnail}
			/>
			<View style={styles.rightContainer}>
				<Text style={styles.title}>{subject.title}</Text>
				<Text style={styles.year}>{subject.rate}</Text>
			</View>
		</View>
  	);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer:{
    flex:1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  year:{
    textAlign:'center',
  },
  title:{
    fontSize:20,
    marginBottom:8,
    textAlign:'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('reactNative', () => reactNative);

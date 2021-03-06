import React, { Component} from 'react';
import { connect } from 'react-redux';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import { setSearchField, requestRobots } from './actions';
// import {robots} from './robots';
import './App.css';
import ErrorBoundry from './ErrorBoundry';

// const state ={
// 	robots: robots,
// 	searchfield: ''
// }

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

class App extends Component {
	// constructor(){
	// 	super()
	// 	this.state = {
	// 		robots: [],
	// 		// searchfield: ''
	// 	}
	// }
	componentDidMount() {
		console.log(this.props.store)
		document.title = "RoboRedux"
		this.props.onRequestRobots();
		// fetch('https://jsonplaceholder.typicode.com/users')
		// 	.then(response => {
		// 	return response.json();
		// })
		// .then(users => {
		// 	this.setState({ robots:users })
		// })
		// this.setState({ robots: robots});
	}
	// onSearchChange = (event) => {
	// 	this.setState({ searchfield: event.target.value})
	// }
	render(){
		// const { robots } = this.state;
		const { searchField, onSearchChange, robots, isPending} = this.props;
		const filterRobotsName = robots.filter(robots => {
			if (robots.name.toLowerCase().includes(searchField.toLowerCase()))
			{
				return robots.name;
			}

			else if (robots.email.toLowerCase().includes(searchField.toLowerCase()))
			{
				return robots.email;
			}	
			else if (robots.website.toLowerCase().includes(searchField.toLowerCase()))
			{
				return robots.website;
			}	
			else{
				return '';
			}
		})
	if (isPending)
		{ 
			return <h1 className='tc'>Loading</h1>
		}
	else {
	if (filterRobotsName == '')
	{
		return(
			<div className='tc'>	
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<p1>Search found no robots</p1>
				</Scroll>
			</div>
			)
	}else {		
	return(
		<div className='tc'>	
			<h1 className='f1'>RoboFriends</h1>
			<SearchBox searchChange={onSearchChange}/>
			<Scroll>
				<ErrorBoundry>
					<CardList robots={filterRobotsName}/>
				</ErrorBoundry>
			</Scroll>
		</div>
		);
	}
	}
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
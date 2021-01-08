import React, { Component} from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
// import {robots} from './robots';
import './App.css';
import ErrorBoundry from './ErrorBoundry';

// const state ={
// 	robots: robots,
// 	searchfield: ''
// }

class App extends Component {
	constructor(){
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users').then(response => {
			return response.json();
		})
		.then(users => {
			this.setState({robots:users})
		})
		// this.setState({ robots: robots});
	}
	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value})
	}
	render(){
		const filterRobotsName = this.state.robots.filter(robots => {
			if (robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase()))
			{
				return robots.name;
			}

			else if (robots.email.toLowerCase().includes(this.state.searchfield.toLowerCase()))
			{
				return robots.email;
			}
						// ispravno
			// else if (robots.desc.toLowerCase().includes(this.state.searchfield.toLowerCase()))
			// {
			// 	return robots.desc;
			// }

			//neispravno
			// else { 
			// 	return robots; 
			// }
			// else if(robots.id.toLowerCase().includes(this.state.searchfield.toLowerCase())){
			// 	return robots.id;
			// }
			// else(robots.email.toLowerCase().includes(this.state.searchfield.toLowerCase()))
 
				// robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase()),

				// robots.email.toLowerCase().includes(this.state.searchfield.toLowerCase())	
			else{
				return '';
			}
		})
		
		// const filterRobots = this.state.robots.filter(robots => {
		// 	return robots.email.toLowerCase().includes(this.state.searchfield.toLowerCase());	
		// })
	if (this.state.robots.lenght === 0)
		{ 
			// return <h1>Loading</h1>
			return <h1>Loading</h1>
		}
	else {
	if (filterRobotsName === '')
	{
		return(
			<div className='tc'>	
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<p1>Search found no robots</p1>
				</Scroll>
			</div>
			)
	}else {		
	return(
		<div className='tc'>	
			<h1 className='f1'>RoboFriends</h1>
			<SearchBox searchChange={this.onSearchChange}/>
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

export default App;
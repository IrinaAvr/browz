import React from 'react';
import './App.css';
import ItemsList from './ItemsList';
import * as clients from './clients.json';
import Iframe from 'react-iframe';


var Customers = clients.Customers;

var countries = Customers.map(function(item){
				return item.Country
			})
			
var countries2 = Customers.map((item) =>{return{'Country':item.Country, 'City': item.City}});
	
console.log(countries2);
var uniqueCountries = countries.filter(onlyUnique);

//var n = countries.includes(uniqueCountries)

//var uniqueCountriesInd = uniqueCountries.map((val)=>{return{'Count':countries.includes(val), 'Country':val}});

//console.log(uniqueCountriesInd);

uniqueCountries.sort((a, b)=> a.localeCompare(b));

//console.log(uniqueCountries);

var selectedCountry = uniqueCountries[0];
var cities;

var uniqueCitiesList, selectedCity;
var companiesList, selectedCompany; 

var srcMapsURL;
	
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}



//function App()
class App extends React.Component {
	constructor(props) {
		super(props);

		this.InitComponent();
		
		this.state = { 	uniqueCountries: uniqueCountries,
						selectedCountry: selectedCountry,
						uniqueCitiesList: uniqueCitiesList,
						selectedCity: selectedCity,
						companiesList:companiesList,
						selectedCompany: selectedCompany,
						srcMapsURL:srcMapsURL
					};
	   
    }
	
	InitComponent(){
		
		this.FilterCities(selectedCountry);
		
		this.FilterCompanies(selectedCity);
	
	}
	
	
	FilterCities(country){
		//alert("FilterCities " + item);
		//console.log(Customers);
		cities = Customers.filter((item) => item.Country === country)
				.map(({City, CompanyName}) => ({City, CompanyName}));
				
		let citiesList = cities.map(function(item){
								return item.City;
							});

		uniqueCitiesList = citiesList.filter(onlyUnique); 
		//console.log(uniqueCitiesList);
		//this.setState({uniqueCitiesList: uniqueCitiesList});
		//console.log(uniqueCitiesList);
		selectedCity = uniqueCitiesList[0];
		//this.setState({selectedCity: selectedCity});
		//console.log(this.state.selectedCity);
		this.FilterCompanies(selectedCity);
	
	}

	FilterCompanies(city){
	
		companiesList = cities.filter((item) => item.City === city)		    
			.map(function(item){
							return item.CompanyName;
						});
		
		selectedCompany = companiesList[0];
		//console.log("companiesList" + this.state);
		
		//console.log("selectedCompany" + this.state);				
		this.ReloadMap();
	}
	
	ReloadMap(){
		let searchString = encodeURI(selectedCountry + "," + selectedCity+  "," + selectedCompany.replace('', '+')); ;//+  "," + selectedCompany.replace('', '+')) 
		srcMapsURL = "https://maps.google.com/maps?q=" + searchString + "&t=&z=11&ie=UTF8&iwloc=&output=embed"; //encodeURI();

	}
	
	/* onlyUnique(value, index, self) { 
		return self.indexOf(value) === index;
	} */

	onSelectCountry =(item, e) =>{
		
		selectedCountry = item;
		this.setState({selectedCountry: item});
		
		this.FilterCities(item);
		//alert(selectedCity);
		
		this.setState({uniqueCitiesList: uniqueCitiesList});
		this.setState({selectedCity: selectedCity});
		this.setState({companiesList: companiesList});				
		this.setState({selectedCompany: selectedCompany});
		this.setState({srcMapsURL: srcMapsURL});
		//alert(srcMapsURL);
	}
	
	onSelectCity =(item) =>{
		//alert("SelectCity " + item);
		
		selectedCity = item;
		this.setState({selectedCity: item});
			
		this.FilterCompanies(item);
		this.setState({companiesList: companiesList});				
		this.setState({selectedCompany: selectedCompany});
		this.setState({srcMapsURL: srcMapsURL});
		//alert(srcMapsURL);
	} 
	onSelectCompany =(item) =>{
		
		//alert("SelectCompany " + item);
		selectedCompany = item;
		this.setState({selectedCompany: item});
		
		//console.log("onselectedCompany" + this.state);	
		this.ReloadMap();
		this.setState({srcMapsURL:srcMapsURL});
		
	} 


	

	render() {
	return (
		<div className="App">
							
			
					<table >
					<thead>
					<tr>
						<th>Countries</th>
						<th>Cities</th>
						<th>Companies</th>
						<th>Map</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td ><ItemsList list = {this.state.uniqueCountries} onClickMethod={this.onSelectCountry} selected = {this.state.selectedCountry}></ItemsList></td>
						<td ><ItemsList list = {this.state.uniqueCitiesList} onClickMethod={this.onSelectCity} selected = {this.state.selectedCity}></ItemsList></td>
						<td ><ItemsList list = {this.state.companiesList} onClickMethod={this.onSelectCompany} selected = {this.state.selectedCompany}></ItemsList></td>
						<td >	
						<div className="mapouter">
						<div className="gmap_canvas">
						<Iframe url={this.state.srcMapsURL}
							width="500px"
							height="300px"
							id="gmap_canvas"
							frameBorder="0"
							display="initial"
							position="relative"></Iframe>
						
						</div>
						</div>
						</td>
					</tr>
					</tbody>
				</table>

			
		</div>
  );

}



}

export default App;

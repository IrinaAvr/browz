import React from 'react';
import ItemsList from './ItemsList';
import Iframe from 'react-iframe';
import './App.css';
import * as clients from './clients.json';


var Customers = clients.Customers;
var countries = Customers.map(function(item){return item.Country});
var uniqueCountries = countries.filter(onlyUnique);
var CountryInd = [];

uniqueCountries.sort((a, b) => a.localeCompare(b));
uniqueCountries.forEach(function(item, i, arr)
{
	let citiesList = Customers.filter((obj) => obj.Country === item)
		.map((item) =>{return item.City;})
	let uniqueCitiesList = citiesList.filter(onlyUnique);
	let CitiesInd = [];
	uniqueCitiesList.forEach(function(item2, i2, arr2)
	{
		let companiesList = Customers.filter((obj) => (obj.Country === item && obj.City === item2))
			.map((el) => {return el.CompanyName;});
		companiesList.sort((a, b) => a.localeCompare(b)); //Sort Companies By ABC
		CitiesInd.push({
				 City: item2,
				 Ind: companiesList.length,
				 companiesList: companiesList
			});
		CitiesInd.sort(CompareObjectByInd); //Sort Cities By Count of Company desc                       
	});
	CountryInd.push({
					Country: item,
					Ind: uniqueCitiesList.length,
					CitiesInd: CitiesInd
					});
	CitiesInd = [];
});
CountryInd.sort(CompareObjectByInd); //Sort Countries By Count of Cities desc
uniqueCountries = CountryInd.map((item) => {return item.Country});
var selectedCountry = uniqueCountries[0];
var cities;
var uniqueCitiesList, selectedCity;
var companiesList, selectedCompany;
var srcMapsURL;

function onlyUnique(value, index, self)
{
   return self.indexOf(value) === index;
}

function CompareObjectByInd(a, b)
{
   if (a.Ind > b.Ind) return -1;
   if (b.Ind > a.Ind) return 1;
   return 0;
}
class App extends React.Component
{
   constructor(props)
   {
		super(props);
		this.InitComponent();
		this.state = {
				 uniqueCountries: uniqueCountries,
				 selectedCountry: selectedCountry,
				 uniqueCitiesList: uniqueCitiesList,
				 selectedCity: selectedCity,
				 companiesList: companiesList,
				 selectedCompany: selectedCompany,
				 srcMapsURL: srcMapsURL
		};
   }
   InitComponent()
   {
		this.FilterCities(selectedCountry);
		this.FilterCompanies(selectedCity);
   }
   FilterCities(country)
   {
		cities = CountryInd.filter((item) => item.Country === country).map((item) =>
		{
		 return item.CitiesInd;
		});
		//console.log(cities);
		let citiesList = cities[0].map(function(item)
		{
		 return item.City;
		});

		uniqueCitiesList = citiesList.filter(onlyUnique);
		selectedCity = uniqueCitiesList[0];
		this.FilterCompanies(selectedCity);
   }
   
   FilterCompanies(city)
   {
        console.log(cities[0]);  
          
		companiesList = cities[0].filter((item) => item.City === city)[0].companiesList;
		console.log(companiesList);  

		selectedCompany = companiesList[0];
		this.ReloadMap();
   }
   
   ReloadMap()
      {	
        let searchString = encodeURI(selectedCountry + "," + selectedCity + "," + selectedCompany);
        srcMapsURL = "https://maps.google.com/maps?q=" + searchString + "&t=&z=11&ie=UTF8&iwloc=&output=embed"; //encodeURI();
      }
      /* onlyUnique(value, index, self) {

      return self.indexOf(value) === index;

      } */
   onSelectCountry = (item, e) =>
   {
      selectedCountry = item;
      this.setState({selectedCountry: item});
      this.FilterCities(item);
      this.setState({uniqueCitiesList: uniqueCitiesList});
      this.setState({selectedCity: selectedCity});
      this.setState({companiesList: companiesList});
      this.setState({selectedCompany: selectedCompany});
      this.setState({srcMapsURL: srcMapsURL});
   }
   onSelectCity = (item) =>
   {
      selectedCity = item;
      this.setState({selectedCity: item});
      this.FilterCompanies(item);
      this.setState({companiesList: companiesList});
      this.setState({selectedCompany: selectedCompany});
      this.setState({srcMapsURL: srcMapsURL});
   }
   onSelectCompany = (item) =>
   {
      selectedCompany = item;
      this.setState({selectedCompany: item});
      this.ReloadMap();
      this.setState({srcMapsURL: srcMapsURL});
   }

 

    render(){
        return(	<div className="App">
				   <table cellspacing="0">
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
							<td>
							   <ItemsList list={this.state.uniqueCountries} onClickMethod={this.onSelectCountry} selected={this.state.selectedCountry}></ItemsList>
							</td>
							<td>
							   <ItemsList list={this.state.uniqueCitiesList} onClickMethod={this.onSelectCity} selected={this.state.selectedCity}></ItemsList>
							</td>
							<td>
							   <ItemsList list={this.state.companiesList} onClickMethod={this.onSelectCompany} selected={this.state.selectedCompany}></ItemsList>
							</td>
							<td>
							   <div className="mapouter">
								 <div className="gmap_canvas">
									 <Iframe url={this.state.srcMapsURL} width="500px" height="300px" id="gmap_canvas" frameBorder="0" display="initial" position="relative"></Iframe>
								  </div>
							   </div>
							</td>
						 </tr>
					  </tbody>
				   </table>
				</div>);
			}
	
}export default App;



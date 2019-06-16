import React from 'react';
//import Item from './item.js';
          
class ItemsList extends React.Component {
	constructor(props) {
		super(props);
		//this.handleClick = this.handleClick.bind(this);
		//alert(this.props.selected);
		this.state={selected:this.props.selected}
    } 


    handleClick = (item, e) =>{
	
		this.setState({selected: item});
		this.props.onClickMethod(item,e);
		//alert("ItemList Click " + item );
		//console.log(item);
    }
	
	styleSwitch = (item, e) =>{
		//alert(item);
		//alert(this.props.selected);
		if (item === this.props.selected)
			return "selItem";
		else
			return "liItem";
	}
	componentWillReceiveProps(nextProps){
		console.log(nextProps.selected);
		this.setState({selected: nextProps.selected});
		
		
	}

    render(){
		return(
		<div className = "DivList">         
			<ul>
			  { this.props.list.map(function(item) {
				return <li className= {this.state.selected === item ? 'selItem': 'liItem' } key={item} name={item} onClick={this.handleClick.bind(this,item)}>{item}</li>}, this)
			  }
			</ul>
        </div>);
    }
}
export default ItemsList;
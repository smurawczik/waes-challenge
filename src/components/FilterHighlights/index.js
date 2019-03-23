import React, { Component } from 'react';
import { connect } from 'react-redux';

class FilterHighlights extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	filteredHighlights: [],
	  	selectedColor: null,
	  	highlights: props.highlights,
	  };
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			highlights: nextProps.highlights
		}, () => {
			this.filter(this.state.selectedColor)
		});
	}

	filter(color) {
		const { highlights } = this.state;

		const filtered = highlights.filter(h => h.color === color);
		
		this.setState({
			filteredHighlights: filtered,
			selectedColor: color,
		});
	}

	render() {
		const { filteredHighlights } = this.state;

		return (
			<div className="filter-highlights">
				<div className="filter-highlights--filter-buttons">
					<button onClick={this.filter.bind(this, 'red')} className="filter-highlights--filter-button filter-highlights--filter-button-red"></button>
					<button onClick={this.filter.bind(this, 'green')} className="filter-highlights--filter-button filter-highlights--filter-button-green"></button>
					<button onClick={this.filter.bind(this, 'yellow')} className="filter-highlights--filter-button filter-highlights--filter-button-yellow"></button>
				</div>
				<div className="filter-highlights--filtered">
					{
						filteredHighlights && filteredHighlights.map((h, i) => {
							return <div key={i}><p className={`filter-highlights--filtered-texts filter-highlights--filtered-texts-${h.color}`}>{h.value}</p></div>
						})
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
 	highlights: state.highlights
});

export default connect(mapStateToProps, null)(FilterHighlights);
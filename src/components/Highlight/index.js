import React, { Component } from 'react';
import { connect } from 'react-redux';

import { onTextareaChange, onHighlight } from '../../actions/';

class Highlight extends Component {
	constructor(props) {
	  super(props);

	  this.textarea = React.createRef();
	}

	componentDidMount() {
	  this.textarea.current.focus();
	}

	highlightSelection(color) {
		const { onHighlight } = this.props;
		const { current } = this.textarea;

		const start = current.selectionStart;
    // obtain the index of the last selected character
    const end = current.selectionEnd;
    // obtain the selected text
    const value = current.value.substring(start, end);

    onHighlight && onHighlight({
    	value,
    	color,
    	start,
    	end,
    });
	}

	buildHighlights() {
		const { highlights } = this.props;
		let { mainTextareaValue } = this.props;
		let markup = mainTextareaValue;

		if (highlights) {
			let joined = "";
			highlights.forEach((highlight, i) => {
				console.log(mainTextareaValue, joined);
				markup = mainTextareaValue.substring(highlight.start, highlight.end)
				if (i === 0)
					joined = mainTextareaValue.slice(0, highlight.start) + `<mark>${markup}</mark>` + mainTextareaValue.slice(highlight.end)
				else 
					joined = joined.slice(0, highlight.start) + `<mark>${markup}</mark>` + joined.slice(highlight.end)
			});

			return [joined];
		}

		return mainTextareaValue;
	}

  render() {
  	const { onTextareaChange, mainTextareaValue } = this.props;

    return (
    	<React.Fragment>
	    	<div className="highlight">
	    		<div className="highlight--selectors">
	    			<button onClick={this.highlightSelection.bind(this, 'red')} className="highlight--selectors-button highlight--selectors-button-red"></button>
	    			<button onClick={this.highlightSelection.bind(this, 'green')} className="highlight--selectors-button highlight--selectors-button-green"></button>
	    			<button onClick={this.highlightSelection.bind(this, 'yellow')} className="highlight--selectors-button highlight--selectors-button-yellow"></button>
	    		</div>
	      	<div className="highlight--container">
		      	<div className="highlight--textarea-shadow">
			      	<div className="highlight--textarea-shadow-content" dangerouslySetInnerHTML={{ __html: this.buildHighlights()}}></div>
		      	</div>
		        <textarea 
		        	className="highlight--textarea" 
		        	value={mainTextareaValue} 
		        	onChange={onTextareaChange}
		        	ref={this.textarea}
		        >
		        </textarea>
	        </div>
	      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
 ...state
});

const mapDispatchToProps = dispatch => ({
 onTextareaChange: (event) => dispatch(onTextareaChange(event.target.value)),
 onHighlight: (data) => dispatch(onHighlight(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Highlight);

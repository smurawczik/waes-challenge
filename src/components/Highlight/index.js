import React, { Component } from 'react';
import { connect } from 'react-redux';

import { onTextareaChange, onHighlight } from '../../actions/';

export class Highlight extends Component {
	constructor(props) {
	  super(props);

	  this.textarea = React.createRef();
	  this.highlights = React.createRef();
	  this.createMarksConfig();
	}

	/**
	 * creates initial configuration to handle three kinds of highlights
	 */
	createMarksConfig() {
		this.markConfig = {
			red: {
				openMark: "は",
				openMarkReplace: "<mark class='red'>",
				closeMark: "ほ",
				closeMarkReplace: "</mark>",
			},
			green: {
				openMark: "な",
				openMarkReplace: "<mark class='green'>",
				closeMark: "の",
				closeMarkReplace: "</mark>",
			},
			yellow: {
				openMark: "た",
				openMarkReplace: "<mark class='yellow'>",
				closeMark: "と",
				closeMarkReplace: "</mark>",
			}
		}
	}

	/**
	 * focus main textarea on start
	 */
	componentDidMount() {
	  this.textarea.current.focus();
	}

	/**
	 * dispatches a new highlight given a color and textareas positions
	 * @param  {String}
	 */
	highlightSelection(color) {
		const { onHighlight } = this.props;
		const { current } = this.textarea;

		const start = current.selectionStart;
    // obtain the index of the last selected character
    const end = current.selectionEnd;
    // obtain the selected text
    const value = current.value.substring(start, end);

    if (value && start !== end) {
	    onHighlight && onHighlight({
	    	id: this.generateId(),
	    	value,
	    	color,
	    	start,
	    	end,
	    });
    }

    this.clearTextSelection();
	}

	/**
	 * generates a unique id
	 * @return {String}
	 */
	generateId() {
		 return Math.random().toString(36).substring(2, 15)
	}

	clearTextSelection() {
	  if (window.getSelection().empty) {
	    window.getSelection().empty();
	  } else if (window.getSelection().removeAllRanges) {
	    window.getSelection().removeAllRanges();
	  }
	}

	/**
	 * returns html with highlights in it
	 * @return {String}
	 */
	buildHighlights() {
		let { mainTextareaValue, highlights } = this.props;

		if (highlights) {
			let joined = this.highlightsToMarks();

			return this.replaceAllMarks(joined);
		}

		return mainTextareaValue;
	}

	/**
	 * replaces all marks in highlight string to have proper HTML rendered, based on the color of each highlight
	 * @param  {String}
	 * @return {String}
	 */
	replaceAllMarks(str) {
		const { markConfig } = this;
		const { red, green, yellow } = markConfig;
		return str
			.replace(new RegExp(`${yellow.openMark}`, 'g'), yellow.openMarkReplace)
			.replace(new RegExp(`${yellow.closeMark}`, 'g'), yellow.closeMarkReplace)
			.replace(new RegExp(`${red.openMark}`, 'g'), red.openMarkReplace)
			.replace(new RegExp(`${red.closeMark}`, 'g'), red.closeMarkReplace)
			.replace(new RegExp(`${green.openMark}`, 'g'), green.openMarkReplace)
			.replace(new RegExp(`${green.closeMark}`, 'g'), green.closeMarkReplace)
	}

	/**
	 * iterates highlights and adds marks to understand which highlight has which color
	 * @return {String}
	 */
	highlightsToMarks() {
		const { highlights } = this.props;
		let { mainTextareaValue } = this.props;
		let sub = "";

		let joined = mainTextareaValue;
		highlights.forEach((highlight, i) => {
			const openMark = this.markConfig[highlight.color].openMark;
			const closeMark = this.markConfig[highlight.color].closeMark;
			
			const spaceIncrementer = i * (openMark.length + closeMark.length);

			sub = mainTextareaValue.substring(highlight.start, highlight.end)
			joined = [joined.slice(0, highlight.start + spaceIncrementer), openMark + sub + closeMark, joined.slice(highlight.end + spaceIncrementer)].join('');
		});

		return joined;
	}

	/**
	 * makes sure that highlight backdrop is scrolled along with textarea scroll
	 * @param  {Event}
	 */
	textareaScrollScroll(event) {
    const scrollTop = event.target.scrollTop;
    this.highlights.current.scrollTop = scrollTop;
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
		      	<div className="highlight--textarea-shadow" ref={this.highlights}>
			      	<div className="highlight--textarea-shadow-content" dangerouslySetInnerHTML={{ __html: this.buildHighlights()}}></div>
		      	</div>
		        <textarea 
		        	className="highlight--textarea" 
		        	value={mainTextareaValue} 
		        	onChange={onTextareaChange}
		        	onScroll={this.textareaScrollScroll.bind(this)}
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

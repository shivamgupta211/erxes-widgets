import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  category: PropTypes.object, // eslint-disable-line
  searchStr: PropTypes.string,
  onUpdateSearchString: PropTypes.func,
};

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  handleSearchInput(event) {
    event.preventDefault();
    const { onUpdateSearchString } = this.props;
    onUpdateSearchString(event.target.value);
  }

  render() {
    const { searchStr = ' ' } = this.props;
    return (
      <div className="erxes-searchbar">
        <div className="erxes-knowledge-container">
          <input value={searchStr} onChange={this.handleSearchInput} />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = propTypes;

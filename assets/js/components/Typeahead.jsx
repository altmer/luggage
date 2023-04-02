import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DebounceInput from 'react-debounce-input';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';

const blockUnwantedButtons = (e) => {
  if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
    e.preventDefault();
    return false;
  }
  return true;
};

export class Typeahead extends Component {
  constructor() {
    super();

    this.selectItem = this.selectItem.bind(this);
    this.getSelectedItem = this.getSelectedItem.bind(this);

    this.hideDropdown = this.hideDropdown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.state = {
      dropdownOpen: false,
      selectedIndex: 0,
      term: '',
    };
  }

  getSelectedItem() {
    if (this.state.selectedIndex < this.props.items.length) {
      return this.props.items[this.state.selectedIndex];
    }
    return null;
  }

  selectItem(item) {
    if (!item) {
      return;
    }
    this.setState({ term: '' });
    this.props.onSelect(item);
    this.hideDropdown();
  }

  hideDropdown() {
    this.setState({
      dropdownOpen: false,
      selectedIndex: 0,
    });
  }

  handleChange(e) {
    const term = e.target.value;
    this.setState({ term });
    this.hideDropdown();

    if (!term || term.length < this.props.minLength) {
      return;
    }

    this.props.onChange(term);

    this.setState({
      dropdownOpen: true,
      selectedIndex: 0,
    });
  }

  handleKeyUp(e) {
    switch (e.key) {
      case 'Enter':
        this.selectItem(this.getSelectedItem());
        break;
      case 'ArrowDown':
        if (this.state.selectedIndex < this.props.items.length - 1) {
          this.setState(state => ({ selectedIndex: state.selectedIndex + 1 }));
        }
        break;
      case 'ArrowUp':
        if (this.state.selectedIndex > 0) {
          this.setState(state => ({ selectedIndex: state.selectedIndex - 1 }));
        }
        break;
      case 'Escape':
        this.hideDropdown();
        break;
      default:
        break;
    }
  }

  renderItems() {
    const selectedIndex = this.state.selectedIndex;
    return this.props.items.map((item, index) => {
      let classname = '';
      if (index === selectedIndex) {
        classname = 'selected';
      }
      return (
        <DropdownItem
          key={item.id}
          onClick={() => this.selectItem(item)}
          className={classname}
        >
          {this.props.renderItem(item)}
        </DropdownItem>
      );
    });
  }

  render() {
    return (
      <span className="typeahead">
        <DebounceInput
          autoFocus={this.props.autoFocus}
          debounceTimeout={this.props.delay}
          className={this.props.className}
          placeholder={this.props.placeholder}
          value={this.state.term}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          onBlur={() => setTimeout(this.hideDropdown, 200)}
          onKeyDown={blockUnwantedButtons}
          onKeyPress={blockUnwantedButtons}
        />
        <Dropdown
          isOpen={this.state.dropdownOpen && this.props.items.length > 0}
          toggle={() => {}}
        >
          <DropdownMenu>
            {this.renderItems()}
          </DropdownMenu>
        </Dropdown>
      </span>
    );
  }
}

Typeahead.propTypes = {
  autoFocus: PropTypes.bool,
  minLength: PropTypes.number,
  delay: PropTypes.number,
  className: PropTypes.string,
  placeholder: PropTypes.string,

  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
};

Typeahead.defaultProps = {
  autoFocus: false,
  minLength: 3,
  delay: 500,
  className: '',
  placeholder: '',
};

export default Typeahead;

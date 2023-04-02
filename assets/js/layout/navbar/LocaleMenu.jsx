import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledNavDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class LocaleMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClickEn = this.props.setLocale.bind(null, 'en');
    this.handleClickDe = this.props.setLocale.bind(null, 'de');
    this.handleClickRu = this.props.setLocale.bind(null, 'ru');
  }

  render() {
    return (
      <UncontrolledNavDropdown className="locale-menu">
        <DropdownToggle caret className="nav-link" tag="a">
          {this.props.locale.toUpperCase()}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem className="locale-link-en" onClick={this.handleClickEn}>
            EN
          </DropdownItem>
          <DropdownItem className="locale-link-de" onClick={this.handleClickDe}>
            DE
          </DropdownItem>
          <DropdownItem className="locale-link-ru" onClick={this.handleClickRu}>
            RU
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledNavDropdown>
    );
  }
}

LocaleMenu.propTypes = {
  locale: PropTypes.string.isRequired,
  setLocale: PropTypes.func.isRequired,
};

export default LocaleMenu;

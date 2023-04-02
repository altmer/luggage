import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { UncontrolledNavDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Translate } from 'react-i18nify';

import Avatar from '../../users/components/Avatar';

export const UserMenu = props => (
  <UncontrolledNavDropdown className="user-menu">
    <DropdownToggle className="nav-link" tag="a">
      <Avatar {...props.user} />
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem className="user-link" tag={Link} to={`/users/${props.user.id}/show`} >
        <Translate value="users.myProfile" />
      </DropdownItem>
      <DropdownItem className="user-link" tag={Link} to="/users/edit">
        <Translate value="users.changePassword" />
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem className="user-link" onClick={props.signOut}>
        <Translate value="sessions.logout" />
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledNavDropdown>
);

UserMenu.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.shape({
      thumb: PropTypes.string,
    }),
    initials: PropTypes.string,
    color: PropTypes.string,
  }),
  signOut: PropTypes.func.isRequired,
};

UserMenu.defaultProps = {
  user: {
    avatar: {
      thumb: null,
    },
  },
};

export default UserMenu;

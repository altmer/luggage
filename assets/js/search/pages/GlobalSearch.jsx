import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-i18nify';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';

import { search } from '../ducks';

import Typeahead from '../../components/Typeahead';
import PostSearchItem from '../../posts/components/PostSearchItem';

const renderItem = item => (<PostSearchItem {...item} />);

export const GlobalSearch = props => (
  <div className="global-search">
    <div className="container">
      <div className="text-right">
        <a className="search-close" role="button" tabIndex="0" onClick={props.onClose}>
          <img src="/images/cross.svg" alt="close" />
        </a>
      </div>
      <Typeahead
        autoFocus
        className="form-control"
        items={props.items}
        placeholder={I18n.t('common.search')}
        renderItem={renderItem}
        onChange={props.search}
        onSelect={props.onSelect}
      />
    </div>
  </div>
);

GlobalSearch.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,

  search: PropTypes.func.isRequired,

  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => (
  {
    items: state.search.results,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onSelect(item) {
      dispatch(push(`/posts/${item.id}/show`));
    },
    onClose() {
      dispatch(goBack());
    },
    search(term) {
      dispatch(search(term));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GlobalSearch);

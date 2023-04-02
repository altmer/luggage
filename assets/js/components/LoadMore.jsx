import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-i18nify';

import Loading from './Loading';

export const LoadMore = props => (
  <div className="row">
    <div className="col-12">
      {props.show && !props.fetching &&
      <a
        href="#0"
        onClick={props.onClick}
        className="load-more-link"
      >
        <Translate value="common.loadMore" />
      </a>
      }
      {props.show && props.fetching &&
        <Loading />
      }
    </div>
  </div>
);

LoadMore.propTypes = {
  fetching: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LoadMore;

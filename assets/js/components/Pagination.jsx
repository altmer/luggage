import React from 'react';
import PropTypes from 'prop-types';

import { Pagination as BootstrapPagination, PaginationItem, PaginationLink } from 'reactstrap';

export const Pagination = props => (
  <BootstrapPagination>
    {(props.page > 1) && <PaginationItem>
      <PaginationLink
        tag="button"
        previous
        onClick={() => props.onPaginate(props.page - 1)}
      />
    </PaginationItem>}
    {(props.page > 1) && <PaginationItem>
      <PaginationLink
        tag="button"
        onClick={() => props.onPaginate(props.page - 1)}
      >
        {props.page - 1}
      </PaginationLink>
    </PaginationItem>}
    <PaginationItem active>
      <PaginationLink tag="button">
        {props.page}
      </PaginationLink>
    </PaginationItem>
    {(props.page < props.totalPages) && <PaginationItem>
      <PaginationLink
        tag="button"
        onClick={() => props.onPaginate(props.page + 1)}
      >
        {props.page + 1}
      </PaginationLink>
    </PaginationItem>}
    {(props.page < props.totalPages) && <PaginationItem>
      <PaginationLink
        tag="button"
        next
        onClick={() => props.onPaginate(props.page + 1)}
      />
    </PaginationItem>}
  </BootstrapPagination>
);

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired,
};

export default Pagination;

import React from 'react';
import Loader from 'halogen/RingLoader';

export const PageLoading = () => (
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="page-loading">
          <Loader color="#0275d8" size="128px" />
        </div>
      </div>
    </div>
  </div>
);

export default PageLoading;

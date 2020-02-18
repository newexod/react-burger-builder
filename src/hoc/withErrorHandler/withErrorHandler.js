import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import ReactAux from '../ReactAux/ReactAux';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <ReactAux>
        <Modal 
          show={error}
          modalClosed={clearError}
        >
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </ReactAux>
    );
  }
}

export default withErrorHandler;
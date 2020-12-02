import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../components/loading';

const LoadableComponent = (component, haveLoading = false) => {
  return Loadable({
    loader: () => component,
    loading: () => {
      if (haveLoading) {
        return <Loading />
      }
      return null
    }
  })
};

export default LoadableComponent
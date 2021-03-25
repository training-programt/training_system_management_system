import React, { forwardRef } from 'react'
import { withRouter } from "react-router-dom";

const withRouterForwardRef = Component => {
  const WithRouter = withRouter(({ forwardedRef, ...props }) => (
    <Component ref={forwardedRef} {...props} />
  ));
  return forwardRef((props, ref) => (
    <WithRouter {...props} forwardedRef={ref} />
  ));
};

export default withRouterForwardRef
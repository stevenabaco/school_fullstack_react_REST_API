/* eslint-disable import/no-anonymous-default-export */
import React, { Component, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from './Context';

export default ({ component: Component, ...rest }) => {
  const context = useContext(Context.Context);

  return (
    <Route {...rest} render={ props => context.authenticatedUser ? (
      <Component {...props} />
    ) : (<Redirect to={{ pathname: '/signin' }} />)
    } />
  )
};
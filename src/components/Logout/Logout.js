import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import { Navigate } from 'react-router-dom';

const Logout = (props) => {
  useEffect(() => {
    props.logout();
  }, []);

  return <Navigate replace to={'/'} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);

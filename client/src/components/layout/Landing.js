import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/posts" />;
  }

  return (
    <div className="dark-overlay">
      <div className="landing-inner">
        <i className="fas fa-kiwi-bird x-large" />
        <h1 className="x-large"> Twuntter 2.0 is come!!!</h1>
        <p className="lead">
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </p>
        <div className="buttons">
          <Link to="/register" className="btn btn-primary">Sign Up</Link>
          <Link to="/login" className="btn btn-light">Login</Link>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);

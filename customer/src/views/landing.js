import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../components/LoadingSpinner';

const Landing = ({ isAuthenticated, loading }) => {
  if (loading) {
    return (
      <LoadingSpinner />
    )
  }

  if (isAuthenticated) {
    return <Redirect to="/app" />
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Trambolin</h1>
          <p className="lead">
            Mutlu çalışanlar, mutlu hayatlar!
          </p>
          <div className="buttons">
            <Link to="/user/register" className="btn btn-primary mr-3">Üye Ol</Link>
            <Link to="/user/login" className="btn btn-light">Giriş Yap</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  loading: auth.loading
})

export default connect(mapStateToProps)(Landing);

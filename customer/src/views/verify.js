import React, { useEffect, useState } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';



const Verify = ({ match }) => {
  const [load, setLoad] = useState({
    loading: true,
    error: null
  });
  const { token } = match.params;
  const { loading, error } = load;

  const logIt = () => {
    console.log('click');
  }

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const verified = jwt.verify(token, "jwt");
        setLoad({ status: 'success', payload: verified });
      } catch (error) {
        setLoad({ status: 'failure', error });
      }
    };
    verifyToken();
  }, [token]);

  const styles = {
    verifyInner: { backgroundColor: '#fff', transform: error ? 'translateY(100%)' : null }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <Redirect to="/error" />
  return (
    <div className="verify" >
      <div className="dark-overlay">
        <div className="verify-inner" style={styles.verifyInner}>
          <h1 className="x-large" style={{ marginBottom: 0 }}>{error ? 'Kayboldun Sanırım?' : 'Tramboline hoş geldiniz!'}</h1>
          {!error &&
            <img alt='Verification background' style={{ marginBottom: '1rem' }} src={require('../assets/logo192.png')} />
          }
          <p className="lead-verify">
            {error ? '' : `Trambolin ailesine katıldığınızı görmekten çok mutlu olduk.`}
          </p>
          <p className="lead-verify">
            {error ? '' : `Onay işleminizi tamamlamak için aşağıdaki butona tıklayın!`}
          </p>
          {
            !error ? (
              <div style={{ marginBottom: '2rem', marginTop: '2rem' }}>
                <Button onClick={logIt} className="btn btn-primary medium">Onayla</Button>
              </div>
            )
              :
              (
                <div style={{ marginBottom: '2rem', marginTop: '2rem' }}>
                  <Button onClick={logIt} className="btn btn-primary medium">Anasayfaya Dön</Button>
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default Verify;
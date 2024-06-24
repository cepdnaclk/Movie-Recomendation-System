import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Login.css'; 

const Login = ({ setAuthenticated }) => {
  const [isGoogleScriptLoaded, setGoogleScriptLoaded] = useState(false);

  useEffect(() => {
    const checkGoogleScript = () => {
      if (window.google) {
        setGoogleScriptLoaded(true);
      }
    };

    const intervalId = setInterval(checkGoogleScript, 100);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isGoogleScriptLoaded) {
      /* global google */
      google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",         // have to replace with actual Google Client ID
        callback: handleCredentialResponse
      });

      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "medium", type: "standard", text: "signin_with" }
      );

      // google.accounts.id.renderButton(
      //   document.getElementById("signUpDiv"),
      //   { theme: "outline", size: "medium", type: "standard", text: "signup_with" }
      // );

      google.accounts.id.prompt();
    }
  }, [isGoogleScriptLoaded]);

  const handleCredentialResponse = (response) => {
    const data = jwtDecode(response.credential);
    console.log("ID: " + data.sub);
    console.log('Full Name: ' + data.name);
    console.log('Given Name: ' + data.given_name);
    console.log('Family Name: ' + data.family_name);
    console.log("Image URL: " + data.picture);
    console.log("Email: " + data.email);

    // Simulate successful login by setting authentication status
    localStorage.setItem('isAuthenticated', 'true');
    setAuthenticated(true);
  };

  return (
    <div className="login-container">
      <div className="login-card">

      <h1><i>Explore MovieMania Masterpieces</i><br/><br/>Login to MovieMania<br/><br/></h1>
        <div id="signInDiv"></div>
        
        
        {/* <div id="signUpDiv" style={{ marginTop: '20px' }}></div> */}
      </div>
    </div>
  );
};

export default Login;
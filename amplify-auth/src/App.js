import './App.css';
import React, {useState, useEffect} from 'react'
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignUp } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

Amplify.configure({
  Auth: {
    userPoolId: 'eu-west-1_bmoS3dAFE',
    region: 'eu-west-1',
    userPoolWebClientId: '2fckl9pl3s8i3hlldbivegha9c',
    mandatorySignIn: true,
    oauth: {},
  }
})

const AuthStateApp = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
      console.log(authState);
    })
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <div>Hello, {user.username}</div>
      <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignUp
        headerText="My Custom Sign Up Text"
        slot="sign-up"
        usernameAlias='email'
      />
    </AmplifyAuthenticator>
  );
}

export default AuthStateApp;

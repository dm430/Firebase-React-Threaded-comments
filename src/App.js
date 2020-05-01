import React from 'react';
import './App.css';

import { useAuth, signInWithPopup, signOut, AuthProviders } from './hooks/firebaseAuth';
import MasterCommentThread from './components/comments/masterCommentThread';

function App() {
  const user = useAuth();

  return (
    <div className="App">
      <header className="App-header">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
      </header>

      {!user && <button onClick={() => signInWithPopup(AuthProviders.Google)}>login</button>}
      {user && <button onClick={() => signOut()}>logout</button>}

      <MasterCommentThread type="deal" slug="1234" maxThreadDepth={3} />

      <script src="https://kit.fontawesome.com/d3739dd889.js" crossorigin="anonymous"></script>
    </div>
  );
}

export default App;

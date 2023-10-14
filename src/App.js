import React from 'react'
import Login from './Components/Login';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProtectedRoute from './Components/AuthProtection/ProtectedRoute';
import Maincomponet from './Components/MainWrapper/Maincomponet';
import UserContext from './Components/Contexts/UserContext';
import Note from './Components/Note';
import Notescontext from './Components/Contexts/Notescontext';

const App = () => {
    return (
        <UserContext>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <ProtectedRoute path="/all-notes" component={Maincomponet} />
                    <Notescontext>
                        <ProtectedRoute path="/note/:id" component={Note} />
                        <ProtectedRoute exact path="/trash" component={Maincomponet} />
                        <ProtectedRoute exact path="/trash/:id" component={Note} />
                    </Notescontext>
                </Switch>
            </Router>
        </UserContext>
    )
}

export default App

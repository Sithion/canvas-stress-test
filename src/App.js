import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Routes from './routes';
import * as _ from 'lodash';


const CreateLink = ({name, path}) => path !== '/' && (
    <Route
        key={`${name}-link`}
        path={path}
        exact
        children={({match}) => (
            <div className={`item ${match ? 'active' : ''}`}>
                <Link to={path}>{_.capitalize(name)}</Link>
            </div>
        )}
    />
);


class App extends Component{
    constructor(...args){
        super(...args);
        this.renderRoute = this.renderRoute.bind(this);
        this.page = React.createRef();
    }

    renderRoute = ({name, path, component}) =>{
        return (
            <Route exact
                   key={`${name}-route`}
                   component={component}
                   path={path}
            />
        );
    };

    render(){
        return (
            <Router>
                <Switch>
                    <div className="app">
                        <header key='header' className="app-header">
                            <div className="menu">
                                {_.map(Routes, CreateLink)}
                            </div>
                        </header>
                        <div key='page' className="page" ref={this.page}>
                            {_.map(Routes, this.renderRoute)}
                        </div>
                    </div>
                </Switch>
            </Router>);
    }
}

export default App;

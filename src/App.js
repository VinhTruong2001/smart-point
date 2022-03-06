import './App.css';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import routes from './routes';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import { connect } from 'react-redux';
import { setUser } from './actions/index';
import callApi from './utils/apiCaller';
import { useEffect } from 'react';

function App({ dispatch }) {
  useEffect(() => {
    enableCORSAnywhere();
    const user = JSON.parse(sessionStorage.getItem("session"))
    if (user) {
      callApi(
        'GET',
        '/api/useruid/',
        null,
        {'Authorization': `Token ${user.token}`}
      ).then(() => {
        dispatch(setUser(user));
      }).catch(() => {
        dispatch(setUser(null));
        sessionStorage.removeItem("session")
      })
    }
  }, [dispatch]);

  const enableCORSAnywhere = () => {
    var cors_api_host = 'sunt-cors-anywhere.herokuapp';
    var cors_api_url = 'https://' + cors_api_host + '.com/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
  }
  
  const showContentMenus = (routes) => {
    var result = '';

    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return  <Route 
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                ></Route>
      }) 
    }
    return <Switch>{result}</Switch>
  }

  return (
    <Router>
      <div className="App relative min-h-screen flex flex-col">
        <Header />

        <main className="relative top-16 flex-1">
            <ScrollToTop />
            { showContentMenus(routes) }
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default connect(null, null)(App);

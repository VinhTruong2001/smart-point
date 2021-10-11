import './App.css';
import Header from './components/header/Header'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import routes from './routes';

function App() {
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
      <div className="App relative">
        <Header />

        <main className="relative top-16">
          { showContentMenus(routes) }
        </main>

        {/* Footer */}

      </div>
    </Router>
  );
}

export default App;

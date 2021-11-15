import './App.css';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import routes from './routes';
import ScrollToTop from './components/scrollToTop/ScrollToTop';

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

export default App;

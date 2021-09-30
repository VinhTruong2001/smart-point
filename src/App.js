import './App.css';
import Header from './components/header/Header'
import SearchAndFilter from './components/searchAndFilter/SearchAndFilter';
import TemplatesShow from './components/templatesShow/TemplatesShow';

function App() {
  return (
    <div className="App relative">
      {/* Header */}
      <Header />

      {/* Search */}
      <SearchAndFilter />

      {/* Body */}
      <main className="px-4 md:px-10 lg:px-30 xl:px-60">
        <TemplatesShow />
      </main>

      {/* Footer */}

    </div>
  );
}

export default App;

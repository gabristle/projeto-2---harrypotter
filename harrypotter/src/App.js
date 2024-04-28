import HeaderHP from './components/HeaderHP';
import Footer from './components/Footer';
import { CharacterProvider } from './components/CharacterContext';
import './App.css';

function App() {
  return (
    <CharacterProvider>
      <div>
        <HeaderHP />
        <Footer />
      </div>
    </CharacterProvider>
  );
}

export default App;
import './App.css';
import Header from './components/Header'
import Slider from './components/Slider'
import Main from './components/Main';
import Footer from './components/Footer';
import spruceImg from './img/spruce.png'

function App() {
  return (
    <div className="App">
      <div className='orangeBackground'>
        <Header />
        <img src={spruceImg} alt="My Image" className=''/>
        <Slider />
      </div>
      <Main />
      <Footer />
    </div>
  );
}

export default App;

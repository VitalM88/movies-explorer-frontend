import './Main.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';


function Main({isLoggedIn}) {
  return (
    <div className="main">
      <Header 
        state="header_main" 
        isLoggedIn={isLoggedIn}
      />
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs /> 
      <AboutMe />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default Main;
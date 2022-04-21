import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

import NavBar from "./components/NavBar";
import NavMenu from "./components/NavMenu";

import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage";
import CollectionPage from "./pages/CollectionPage";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Cart />
        <NavMenu />
        <Switch>
          <Route path='/products/:handle' component={ProductPage} />
          <Route exact path='/' component={HomePage} />
          <Route path='/collections/:handle' component={CollectionPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

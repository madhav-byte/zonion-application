
import { BrowserRouter as Router,Route, NavLink, Switch } from 'react-router-dom';
import './App.css';
import About from './Components/About';
import AddRestaurent from './Components/AddRestaurent';
import Home from './Components/Home';
import Login from './Components/Login';
import Navigator from './Components/Navigator';
import RestaurentDetails from './Components/RestaurentDetails';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


function App() {
 return(
    <Router>

 <div>
      <h1>Zonions</h1>

        <Navigator/>

            <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login"  component={Login} />
            <Route path="/about" component={About} />
            <Route path="/addRestaurent" component={AddRestaurent}/>
            <Route path="/details/:id" component={RestaurentDetails}/>
           
            </Switch>
        

    
 </div>
 </Router>
 )
}

export default App;

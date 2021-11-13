import { Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './containers/home/Home';
import Signup from './containers/signup/Signup';
import Signin from './containers/signin/Signin';
import PrivateRoute from './components/HOC/PrivateRoute'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from "../src/redux/actions/auth.actions"
import Products from './containers/product/Products';
import Orders from './containers/order/Orders';
import Category from './containers/category/Category';
import { getInitialData } from "../src/redux/actions/initialData.action"


function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // if authenticated is true that means user is already logged in and we don't need to dispatch this action
  // if authenticated is false then we will make it true and we'll dispatch that action
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, [])

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/category" component={Category} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;

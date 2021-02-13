import { Route, Router, Switch, useHistory, useParams } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducer/userReducer';
import {BrowserRouter} from 'react-router-dom'
import UserProfile from './pages/UserProfile';




export const UserContext=createContext()

const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)


  

  useEffect(()=>{
    const user=JSON.parse (localStorage.getItem('user'))
    if(user){
      console.log(user)
      dispatch({type: "USER", payload: user})
      // history.push('/')
      
    }
    else if(!user) {
      
      history.push('/login')
    }
  },[])
  return(<Switch>
    
    <Route exact path='/register'>
      <Register/>
    </Route >
    <Route exact path='/login'>
      <Login/>
    </Route>
    <Route exact path='/create-post'>
      <CreatePost/>
    </Route>
    <Route exact path='/profile'>
      <Profile/>
    </Route>
    <Route exact path='/profile/:userId'>
      <UserProfile/>
    </Route>
    <Route exact path='/'>
      <Home/>
    </Route>
    
   
  </Switch>)
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  
  return (
    // <UserContext.Provider value={{state,dispatch}}>
    // <BrowserRouter>
    //   <Navbar/>
    //   {/* <Routing/> */}
    //   <Switch>
    //    <Router exact path="/hello">
    //      <Hello/>
    //     </Router>
    //   </Switch>
    // </BrowserRouter>
    // </UserContext.Provider>
<UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar/>

      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

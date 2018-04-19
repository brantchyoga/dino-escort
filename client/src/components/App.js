import React, { Component } from 'react';
import './App.css';
import {Home} from './Home';
import Details from './Details';
import Cart from './Cart';
import Congrats from './Congrats';
import LandingPage from './LandingPage';
import img from '../img/dino-irritator-challengeri.png'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import dino1img from "../img/dino-irritator-challengeri.png";
import dino2img from "../img/dino-oxalaia.png";
import dino3img from "../img/dino-spinosaurs.png";
import dino4img from "../img/dino-nyctosaurus.png";
import dino5img from "../img/dino-pterodaustro.png";
import dino6img from "../img/dino-pteranodon.png";
import dino7img from "../img/dino-shastasaurus.png";
import dino8img from "../img/dino-opthalmusaurus.png";
import dino9img from "../img/dino-mosasurus.png";

import {UserProfile} from './UserProfile';
import axios from 'axios';

var dinos = {
   dino1:{
    name: "Irritator Challengeri",
    category: "land",
    img_path: dino1img,
    img_headshot_path: "",
    text: "Banjo unicorn butcher pabst venmo jianbing, williamsburg wolf vegan dreamcatcher cornhole master cleanse fixie. Tilde brooklyn taiyaki 8-bit, skateboard cronut post-ironic pok pok. Schlitz post-ironic normcore green juice chartreuse, pop-up polaroid food truck squid sriracha fingerstache la croix salvia.",
    capacity : "5",
    cost_hourly: 50
  },

   dino2:{
    name: "Oxalaia Quilombensis",
    category: "land",
    img_path: dino2img,
    img_headshot_path: "",
    text: "Banjo unicorn butcher pabst venmo jianbing, williamsburg wolf vegan dreamcatcher cornhole master cleanse fixie. Tilde brooklyn taiyaki 8-bit, skateboard cronut post-ironic pok pok. Schlitz post-ironic normcore green juice chartreuse, pop-up polaroid food truck squid sriracha fingerstache la croix salvia.",
    capacity : "15",
    cost_hourly: 75
  },

   dino3:{
    name: "Spinosaurus Aegyptiacus",
    category: "land",
    img_path: dino3img,
    img_headshot_path: "",
    text: "Banjo unicorn butcher pabst venmo jianbing, williamsburg wolf vegan dreamcatcher cornhole master cleanse fixie. Tilde brooklyn taiyaki 8-bit, skateboard cronut post-ironic pok pok. Schlitz post-ironic normcore green juice chartreuse, pop-up polaroid food truck squid sriracha fingerstache la croix salvia.",
    capacity: "30",
    cost_hourly: 120
  },

   dino4:{
    name: "Nyctosaurus",
    category: "air",
    img_path: dino4img,
    img_headshot_path: "",
    text: "Banjo unicorn butcher pabst venmo jianbing, williamsburg wolf vegan dreamcatcher cornhole master cleanse fixie. Tilde brooklyn taiyaki 8-bit, skateboard cronut post-ironic pok pok. Schlitz post-ironic normcore green juice chartreuse, pop-up polaroid food truck squid sriracha fingerstache la croix salvia.",
    capacity : "1",
    cost_hourly: 20
  },

   dino5:{
    name: "Pterodaustro",
    category: "air",
    img_path: dino5img,
    img_headshot_path: "",
    text: "Banjo unicorn butcher pabst venmo jianbing, williamsburg wolf vegan dreamcatcher cornhole master cleanse fixie. Tilde brooklyn taiyaki 8-bit, skateboard cronut post-ironic pok pok. Schlitz post-ironic normcore green juice chartreuse, pop-up polaroid food truck squid sriracha fingerstache la croix salvia.",
    capacity : "2",
    cost_hourly: 40
  },

   dino6:{
    name: "Pteranodon",
    category: "air",
    img_path: dino6img,
    img_headshot_path: "",
    text: "Banjo unicorn butcher pabst venmo jianbing, williamsburg wolf vegan dreamcatcher cornhole master cleanse fixie. Tilde brooklyn taiyaki 8-bit, skateboard cronut post-ironic pok pok. Schlitz post-ironic normcore green juice chartreuse, pop-up polaroid food truck squid sriracha fingerstache la croix salvia.",
    capacity: "2",
    cost_hourly: 40
  },

   dino7:{
    name: "Shastasaurus Pacificus",
    category: "water",
    img_path: dino7img,
    img_headshot_path: "",
    text: "Banjo unicorn butcher pabst venmo jianbing, williamsburg wolf vegan dreamcatcher cornhole master cleanse fixie. Tilde brooklyn taiyaki 8-bit, skateboard cronut post-ironic pok pok. Schlitz post-ironic normcore green juice chartreuse, pop-up polaroid food truck squid sriracha fingerstache la croix salvia.",
    capacity: "100",
    cost_hourly: 300
  },

   dino8:{
    name: "Opthalmusarus Iceniucs",
    category: "water",
    img_path: dino8img,
    img_headshot_path: "",
    text: "Banjo unicorn butcher pabst venmo jianbing, williamsburg wolf vegan dreamcatcher cornhole master cleanse fixie. Tilde brooklyn taiyaki 8-bit, skateboard cronut post-ironic pok pok. Schlitz post-ironic normcore green juice chartreuse, pop-up polaroid food truck squid sriracha fingerstache la croix salvia.",
    capacity: "20",
    cost_hourly: 90
  },

   dino9:{
    name: "Mosasaurs Hoffmannii",
    category: "water",
    img_path: dino9img,
    img_headshot_path: "",
    text: "Banjo unicorn butcher pabst venmo jianbing, williamsburg wolf vegan dreamcatcher cornhole master cleanse fixie. Tilde brooklyn taiyaki 8-bit, skateboard cronut post-ironic pok pok. Schlitz post-ironic normcore green juice chartreuse, pop-up polaroid food truck squid sriracha fingerstache la croix salvia.",
    capacity: "7",
    cost_hourly: 60
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      token: '',
      user: {},
      cart: [],
      current: {},
      redirectDetail: false,
      redirectCart: false,
      redirectCongrats: false
    }
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.logout = this.logout.bind(this)
    this.handleDetailClick = this.handleDetailClick.bind(this)

  }

  liftTokenToState(data){
    console.log(data.user, data.token);
    this.setState({
      token: data.token,
      user:data.user
    })
  }

  logout(){
    console.log('logging out');
    localStorage.removeItem('mernToken')
    this.setState({token:'',user:{}})
  }

  componentDidMount() {
    var token = localStorage.getItem('mernToken')
    console.log(this.state.current);
    if(token === 'undefined' || token === 'null' || token === ''|| token === undefined){
      localStorage.removeItem('mernToken')
      this.setState({
        token:'',
        user:{}
      })
    } else {
      axios.post('/auth/me/from/token', {token}).then(result=>{
        localStorage.setItem('mernToken', result.data.token)
        this.setState({
          token: result.data.token,
          user: result.data.user,
        })
      }).catch(error=>console.log(error))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.redirectDetail || this.state.redirectCart || this.state.redirectCongrats) {
      this.setState({
        redirectDetail: false,
        redirectCart: false,
        redirectCongrats: false
      })
    }
  }

  handleDetailClick(e,number){
    e.preventDefault()
    console.log('bullshit')
    var dino = `dino${number}`
    console.log(number);
    console.log(dino);
    this.setState({
      current: dinos[dino],
      redirectDetail: true
    })
  }

  addToCart = (e, dino) =>{
    e.preventDefault()
    console.log('add to cart hit')
    this.setState({
      cart:[...this.state.cart, dino],
      redirectCart: true
    })
  }

  bookClick = (e) =>{
    e.preventDefault()
    console.log('hit go to congrats route')
    this.setState({
      redirectCongrats: true,
    })
  }

  removeFromCart = (e,index)=>{
    e.preventDefault()
    console.log(index);
    var newCart = this.state.cart
    newCart.splice(index,1)
    console.log(newCart);
    this.setState({
      cart:newCart
    })
  }
  render() {

    let theUser = this.state.user
    if (typeof theUser === 'object' && Object.keys(theUser).length > 0){
      return(
        <div>
          <Router>
            <div>
              <nav className="nav">
                <Link class-="link" to='/'>Dino List</Link>{' '}
                <Link class-="link" to="/cart">Cart</Link>{' '}
                <Link to="/detail"/>{' '}
                <UserProfile user={theUser} logout={this.logout} />
              </nav>

              <Route exact path='/' component={()=> (
                <LandingPage
                  dinos={dinos}
                  detailClick={this.handleDetailClick}
                  redirectD={this.state.redirectDetail}
                  redirectC={this.state.redirectCart}

                />)}
              />
              <Route path='/cart' component={()=> (
                <Cart
                  cart={this.state.cart}
                  user={theUser}
                  congrats={this.state.redirectCongrats}
                  removeFromCart={this.removeFromCart}
                  bookClick={this.bookClick}
                />)}
              />
              <Route path='/detail' component={()=> (
                <Details
                  dino={this.state.current}
                  addToCart={this.addToCart}
                  redirectC={this.state.redirectCart}
                />)}
              />
            </div>
          </Router>
        </div>
      )
    } else {
      return (
        <div className="App">
          <Home liftToken={this.liftTokenToState} />
        </div>
      )
    }
  }
}

export default App;

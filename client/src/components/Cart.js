import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Congrats from './Congrats'

import 'react-datepicker/dist/react-datepicker.css';


class Cart extends Component {
  constructor(props){
    super(props)
    this.state = {
      startDate: moment(),
      endDate: moment(),
    }
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date,
    });
  }
  handleChangeEnd(date) {
    this.setState({
      endDate: date,
    });
  }
  componentDidMount(){
    this.setState({
      startDate: moment(),
      endDate: moment(),
    })
  }

  render(){
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    var dinosInCart = this.props.cart
    console.log(dinosInCart)
    console.log(this.props.congrats)
    var cashDueArray = dinosInCart.map(dino=>{
      return dino.cost_hourly
    })
    let cashDue = 0
    for(let cost of cashDueArray){
      cashDue += cost
    }
    let date = (this.state.startDate._d).toString()
    console.log(date);
    var jsxDinos = dinosInCart.map((dino,index)=> {
      return(
      <div key={index} className='dinocard'>
        <h3 className='dinotitle underline'>{dino.name}</h3>
        <button onClick={e=>this.props.removeFromCart(e,index)}>Remove From Cart</button>
        <p className='inline'>Gold Cost: ${dino.cost_hourly}/hour</p>
        <div className='dino-image'>
          <img className='image' src={dino.img_path}/>
        </div>
      </div>)
    })

    if(cashDue === 0){
      return(
        <div className='container'>
          <h1>Cart in empty</h1>
        </div>
      )
    } else {
      if(this.props.congrats){
        return(
          <div className="congrats-card">
            <Congrats />
            <h4>Booked Date: {date}</h4>
            <h4>Gold Due: ${cashDue}</h4>
          </div>
        )
      } else {
        return(
          <div className='container'>
            <h1>You Have Selected</h1>
            {jsxDinos}

            <div>
              <h3 className='underline'>Pick a date</h3>

              <DatePicker
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
                showTimeSelect
                timeFormat="HH"
                timeIntervals={60}
                dateFormat="LLL"
                timeCaption="time"
            />

            <DatePicker
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeEnd}
                showTimeSelect
                timeFormat="HH"
                timeIntervals={60}
                dateFormat="LLL"
                timeCaption="time"
            />
              <button type="submit" onClick={this.props.bookClick}>Book All In Cart!</button>
            </div>
          </div>
        )
      }
    }
  }
}
export default Cart

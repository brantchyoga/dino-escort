import React, {Component} from 'react';
import axios from 'axios';



class Login extends Component {
  constructor(props){
    super()
    this.state = {
      email: '',
      password: ''
    }
    // this.handleEmailChange = this.handleEmailChange.bind(this)
    // this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmailChange=(e)=>{
    this.setState({email:e.target.value})
  }
  handlePasswordChange=(e)=>{
    this.setState({password:e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    axios.post('/auth/login', {
      email:this.state.email,
      password:this.state.password
    }).then(result=>{
      console.log(result.data);
      localStorage.setItem('mernToken', result.data.token)
      this.props.liftToken(result.data)
    }).catch(err=> console.log(err))
  }

  render(){
    return(
      <form className='card-back' onSubmit={this.handleSubmit}>
        <div className="box">
          Email: <input type='text' value={this.state.email} onChange={this.handleEmailChange} />
          <br />
          Password: <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          <br />
          <button type='submit'>Login</button>
        </div>

      </form>
    )
  }
}
export default Login;

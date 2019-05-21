import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import {getTokenMutation} from './queries/queries'


class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      name : '',
      email : '',
      password : '',
      confirm_password : '',
      submit : ''
    }
  }



  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    console.log(this.props)
    this.props.getTokenMutation({
        variables: {
            date: this.state.date,
            day: this.state.day,
            start_time: this.state.start_time,
            end_time: this.state.end_time,
            module_name : this.state.module_name,
            module_details : this.state.module_details,
        }
    }).then(res => {
      console.log(res)
      localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
    });
  }

  render()
  
  {
    const elements = [' ','Bug id-1022', 'Bug id-862', 'Bug id-863','Bug id-1040', 'fBug id-998'];
    const my_select_tag = <select required name=" module_name" className="form-input">
        {elements.map((value, index) => {
        return <option key={index}>{value}</option>
      })}

    </select>
    return(
      <div className = "registration_content" >
        <form className ="registration-form"  onSubmit={this.handleSubmit}>
         < img  className="img"src={require('../Images/employee.png')}/>
          <label className="date">Date</label>
          <input className="form-input" required  type="date"/>
          <label className="day">Day</label>
          <select className="form-input">   
              <option>Monday</option>
              <option>tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
          </select>
          <input className="form-input"  required type ="text" id='name'  onChange={this.handleChange} value={this.state.name} />
          <label for="start">Start Time</label>
          <input type="time"  required name="start_time" className="form-input" name="appt" min="9:00" max="22:00" required></input>
          <label for="stop">Start Time</label>
          <input type="time"   className="form-input"  name="stop_time" min="9:00" max="22:00" required></input>
          <label>Modul-Name </label>
          {my_select_tag}
          <label >Modul-Details</label>
          <input className="form-input" required  name="module_details" type="text" id='details'onChange={this.handleChange} name ="details" value={this.state.details} /> 
          <button className="login-button">Submit</button >


          
         

        </form>
      </div>
    )
  }


}

export default compose(
    graphql(getTokenMutation, { name: "getTokenMutation" })
)(Home);

import React, { Component } from "react";
import { userService } from "./auth/UserService";
import axios from 'axios';

export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
          user: {},
          singleinfo: {}
        };
      }
     // authHeader()
     componentDidMount() {
          let user = JSON.parse(localStorage.getItem('user'));
          if (user)
          {  
            this.setState({user:user},  () => {
              //console.log(this.state.user);
            }); 
            //console.log(this.props)
          }

          axios.get(`http://localhost:3000/shop/`+this.props.match.params.id)
          .then(res => {
            this.setState({singleinfo: res.data });
          }) 

     }

     handleSubmit = ev => {
        ev.preventDefault();
        const { name, telephone, address, url, zip, description } = ev.target;
        this.setState({ error: null });
        userService.update(name.value, telephone.value, address.value, url.value, zip.value, this.props.match.params.id, this.state.user, description.value )
        .then(res => {
           
          })
          .catch(res => {
            this.setState({ error: res.error });
          });
      };


    render() {   
      const { error } = this.state; 
      return (
        <div>  { this.props.match.params.id && this.state.user ?    

        <fieldset>
        <form className='ClaimForm' onSubmit={this.handleSubmit}>
          <div role='alert'>
            {error && <p className='form-error'>{error}</p>}
          </div>
          <div>
            <label htmlFor='claim-name-input' className='form-label'>
              Shop Name
            </label>
            <input
              className='form-input'
              ref={this.firstInput}
              id='claim-name-input'
              name='name'
              required
              defaultValue={this.state.singleinfo.name}
            />
          </div>
          <div>
            <label htmlFor='claim-telephone-input' className='form-label'>
              Phone
            </label>
            <input
              className='form-input'
              id='claim-telephone-input'
              name='telephone'
              required
              defaultValue={this.state.singleinfo.telephone}
            />
          </div>
          <div>
            <label htmlFor='claim-address-input' className='form-label'>
              Address
            </label>
            <input
              className='form-input'
              id='claim-address-input'
              name='address'
              required
              defaultValue={this.state.singleinfo.address}
            />
          </div>
          <div>
            <label htmlFor='claim-url-input' className='form-label'>
              Url
            </label>
            <input
              className='form-input'
              id='claim-url-input'
              name='url'
              required
              defaultValue={this.state.singleinfo.url}
            />
          </div>
          <div>
            <label htmlFor='claim-zip-input' className='form-label'>
              Zipcode
            </label>
            <input
              className='form-input'
              id='claim-zip-input'
              name='zip'
              required
              defaultValue={this.state.singleinfo.zip}
            />
          </div>

          <div>
            <label htmlFor='claim-description-input' className='form-label'>
              Description
            </label>
            <input
              className='form-input'
              id='claim-description-input'
              name='description'
              required
              defaultValue={this.state.singleinfo.description}
            />
          </div>
          <button type='submit' className='button'>
            Edit
          </button>
        </form>
      </fieldset>: <div> </div>} 
      </div>
      );
    }
  }
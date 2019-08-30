import React, { Component } from "react";
import { userService } from "./auth/UserService";

export default class Claim extends Component {

    constructor(props) {
        super(props);
        this.state = {
          user: {}
        };
      }
     // authHeader()
     componentDidMount() {
          let user = JSON.parse(localStorage.getItem('user'));
          if (user)
          {  
            this.setState({user:user},  () => {
              console.log(this.state.user);
            }); 
            console.log(this.props)
          }
     }

     handleSubmit = ev => {
        ev.preventDefault();
        const { name, telephone, address, url, zip, description, statecode, city } = ev.target;
        this.setState({ error: null });
        userService.claim(name.value, telephone.value, address.value, url.value, zip.value, this.props.match.params.id, this.state.user, description.value, statecode.value, city.value )
        .then(res => {
            this.props.history.push('/');
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
            />
          </div>
          <div>
            <label htmlFor='claim-statecode-input' className='form-label'>
              Url
            </label>
            <input
              className='form-input'
              id='claim-statecode-input'
              name='statecode'
              required
            />
          </div>
          <div>
            <label htmlFor='claim-city-input' className='form-label'>
              Url
            </label>
            <input
              className='form-input'
              id='claim-city-input'
              name='city'
              required
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
            />
          </div>
          <button type='submit' className='button'>
            Claim
          </button>
        </form>
      </fieldset>: <div> </div>} 
      </div>
      );
    }
  }
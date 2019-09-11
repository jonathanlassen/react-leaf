/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import { userService } from './auth/UserService';

export default class Claim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      singleinfo: {},
    };
  }

  // authHeader()
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.setState({ user }, () => {
        // console.log(this.state.user);
      });
      // console.log(this.props)
    }

    axios
      .get(
        `https://powerful-wildwood-94772.herokuapp.com/shop/${this.props.match.params.id}`
      )
      .then(res => {
        this.setState({ singleinfo: res.data });
      });
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const {
      name,
      telephone,
      address,
      url,
      zip,
      description,
      statecode,
      city,
    } = ev.target;
    this.setState({ error: null });
    userService
      .claim(
        name.value,
        telephone.value,
        address.value,
        url.value,
        zip.value,
        this.props.match.params.id,
        this.state.user,
        description.value,
        statecode.value,
        city.value
      )
      .then(res => {
        this.props.history.push('/map');
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="flex justify-center">
        {' '}
        {this.props.match.params.id && this.state.user ? (
          <form className="ClaimForm" onSubmit={this.handleSubmit}>
            <fieldset className="w-1/2 bg-indigo-100 p-8 mt-8">
              <div role="alert">
                {error && <p className="form-error">{error}</p>}
              </div>
              <div>
                <label htmlFor="claim-name-input" className="form-label">
                  Shop Name
                </label>
                <input
                  className="form-input"
                  ref={this.firstInput}
                  id="claim-name-input"
                  name="name"
                  required
                  defaultValue={this.state.singleinfo.name}
                />
              </div>
              <div>
                <label htmlFor="claim-telephone-input" className="form-label">
                  Phone
                </label>
                <input
                  className="form-input"
                  id="claim-telephone-input"
                  name="telephone"
                  required
                  defaultValue={this.state.singleinfo.telephone}
                />
              </div>
              <div>
                <label htmlFor="claim-address-input" className="form-label">
                  Address
                </label>
                <input
                  className="form-input"
                  id="claim-address-input"
                  name="address"
                  required
                  defaultValue={this.state.singleinfo.address}
                />
              </div>
              <div>
                <label htmlFor="claim-url-input" className="form-label">
                  Url
                </label>
                <input
                  className="form-input"
                  id="claim-url-input"
                  name="url"
                  required
                  defaultValue={this.state.singleinfo.url}
                />
              </div>
              <div>
                <label htmlFor="claim-statecode-input" className="form-label">
                  Statecode
                </label>
                <input
                  className="form-input"
                  id="claim-statecode-input"
                  name="statecode"
                  required
                  defaultValue={this.state.singleinfo.statecode}
                />
              </div>
              <div>
                <label htmlFor="claim-city-input" className="form-label">
                  City
                </label>
                <input
                  className="form-input"
                  id="claim-city-input"
                  name="city"
                  required
                  defaultValue={this.state.singleinfo.city}
                />
              </div>
              <div>
                <label htmlFor="claim-zip-input" className="form-label">
                  Zipcode
                </label>
                <input
                  className="form-input"
                  id="claim-zip-input"
                  name="zip"
                  required
                  defaultValue={this.state.singleinfo.zip}
                />
              </div>

              <div>
                <label htmlFor="claim-description-input" className="form-label">
                  Description
                </label>
                <input
                  className="form-input"
                  id="claim-description-input"
                  name="description"
                  required
                  defaultValue={this.state.singleinfo.description}
                />
              </div>
              <button type="submit" className="submitButton">
                Claim
              </button>
            </fieldset>
          </form>
        ) : (
          <div> </div>
        )}
      </div>
    );
  }
}

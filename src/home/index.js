import React, { Component } from 'react';
import { Container } from 'reactstrap';
import UserRepos from './containers/UserRepos';
import Stepper from '../components/stepper';
import 'font-awesome/css/font-awesome.min.css';
import './style.css';

class Home extends Component {
  render() {
    return (
      <div id="home">
        <Stepper />
      </div>
    );
  }
}

export default Home;

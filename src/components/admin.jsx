import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router-dom'
import RoutesDash from '../../src/components/Routes';
import TopNavigation from './../components/topNavigation';
import SideNavigation from './../components/sideNavigation';
import Footer from './../components/Footer';
import './../index.css'

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.renderRedirect = this.renderRedirect.bind(this)
    this.listeArticle = this.listeArticle.bind(this)
  }

  renderRedirect = () => {
    if (localStorage.getItem('login') == 'false') {
      return <Redirect to='/login' />
    } else {
      console.log('test');
    }

  }

  listeArticle = (e) => {
    const action = { type: "GETARTICLE", value: e }
    this.props.dispatch(action)
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="container-fluid">
          {this.renderRedirect()}
          <SideNavigation />
          <TopNavigation />
          <div id="content" className="container-fluid contenuDash">
            <RoutesDash />
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Admin;
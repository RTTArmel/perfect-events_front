import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class TopNavigation extends Component {

    constructor(props) {
        super(props);
        this.deconnection = this.deconnection.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
    }
    state = {
        collapse: true
    }

    renderRedirect = () => {
        if (localStorage.getItem('login') == 'false') {
            return <Redirect to='/login' />
        } else {
            console.log('test');
        }
    }

    deconnection(e) {
        console.log('local deconnection: ', localStorage.getItem('login'));
        const action = { type: "DECONNECT", value: e }
        this.props.dispatch(action)
    }

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <div className='container-fluid topbar-fixed'>

                <MDBNavbar id="Totalhome"
                    dark
                    expand="md"
                    scrolling
                    className='position-fixed'
                    style={{ position: 'absolute', zIndex: '5', float: 'left', height: '100px', width: '87%', marginTop: '-6%',  marginLeft: '10%' }}
                >

                    <MDBNavbarBrand className="bonjour">
                        {this.renderRedirect()}
                        <strong>Bonjour {localStorage.getItem('user')}</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        image="../images/hamburger3.gif"
                        onClick={() => this.onClick()}
                    />
                    <MDBCollapse
                        id="navbarCollapse"
                        isOpen={this.state.collapse}
                        navbar
                    >

                        <MDBNavbarNav right>
                            <MDBNavItem className='item' onClick={() => { this.deconnection() }}>
                                <MDBNavLink rel="noopener noreferrer" className="nav-link Ripple-parent accueil" href="/login"><MDBIcon icon="sign-out-alt" className="mr-3" />Deconnexion</MDBNavLink>
                            </MDBNavItem>

                        </MDBNavbarNav>
                    </MDBCollapse>

                </MDBNavbar>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        client: state
    }
}
export default connect(mapStateToProps)(TopNavigation);
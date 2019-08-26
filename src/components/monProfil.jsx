import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profil from './profil.jsx';
import EditProfil from './editProfil.jsx';
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const MonProfil = () => {
    return (
        <div>
            <MDBNavbar  className="" expand="md" scrolling>
                <MDBNavbarNav left>
                    <MDBNavItem>
                        <MDBNavLink rel="noopener noreferrer" to="/admin/monProfil/show" className="nav-link Ripple-parent">Mon Profil</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink rel="noopener noreferrer" to="/admin/monProfil/edit" className="nav-link Ripple-parent">Modifier</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBNavbar>
            <div>
                <Switch>
                    <Route path='/admin/monProfil/show' exact component={Profil} />
                    <Route path='/admin/monProfil/edit' component={EditProfil} />
                </Switch>
            </div>
        </div>
    )
}

export default MonProfil;
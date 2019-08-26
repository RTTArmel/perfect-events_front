import React from 'react';
import logo from "../images/logoPM.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" className="img-fluid" src={logo} />
            </a>
            <MDBListGroup className="list-group-flush" id="lien-dasboard-total">
                <NavLink id="lien-dasboard" to="/admin/monProfil" >
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3" />
                        Mon Profil
                    </MDBListGroupItem>
                </NavLink>

                <NavLink id="lien-dasboard" exact={true} to="/admin/upload">
                    <MDBListGroupItem>
                        <MDBIcon icon="download" className="mr-3" />
                        Ajouter Article
                    </MDBListGroupItem>
                </NavLink>

                <NavLink id="lien-dasboard" to="/admin/article" >
                    <MDBListGroupItem>
                        <MDBIcon icon="clipboard-list" className="mr-3" />
                        Liste des Articles
                    </MDBListGroupItem>
                </NavLink>

                <NavLink id="lien-dasboard" to="/" >
                    <MDBListGroupItem>
                        <MDBIcon icon="home" className="mr-3" />
                        Accueil ExtraComm
                    </MDBListGroupItem>
                </NavLink>

            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;
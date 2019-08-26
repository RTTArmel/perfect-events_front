import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import Footer from './../components/Footer';
import { Redirect } from 'react-router-dom'
import { MDBNavbar, MDBInput, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBContainer } from "mdbreact";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask } from "mdbreact";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { confirmAlert } from 'react-confirm-alert'; // Import
import './article.css'
import 'react-confirm-alert/src/react-confirm-alert.css'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseID: "",
            comment: [],
            modal: false,
        };
    }

    // toggle = () => {
    //     this.setState({
    //         modal: !this.state.modal,
    //     });
    // }

    // toggleCollapse = collapseID => () =>
    //     this.setState(prevState => ({
    //         collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    //     }));

    renderRedirect = () => {
        if (this.state.redirect) {
            var url = '/service/' + this.state._id
            return <Redirect to={url} />
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/service").then(res => {
            var tab = []
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].active == true) {
                    tab.push(res.data[i])
                }
            }
            this.setState({ comment: tab })
        })
    }

    // componentWillUpdate() {
    //     axios.get("http://localhost:8080/service").then(res => {
    //         console.log('res comment: ', res.data)
    //         this.setState({ comment: res.data })
    //         console.log('comment: ', this.state.comment)
    //     })
    // }

    render() {
        return (
            <div className="homePage container-fluid">
                <div>
                    <MDBNavbar id="Totalhome"
                        color="bg-primary"
                        dark
                        expand="md"
                        scrolling
                    >

                        <MDBNavbarBrand>
                            <img src="../images/logoPM.png" id="logo-header" alt="imagelogo" />
                        </MDBNavbarBrand>
                        <MDBNavbarToggler
                        // onClick={this.toggleCollapse("navbarCollapse")}
                        />
                        <MDBCollapse
                            id="navbarCollapse"
                            isOpen={this.state.collapseID}
                            navbar
                        >

                            <MDBNavbarNav right>
                                <MDBNavItem className='item'>
                                    <MDBNavLink to="#" className="accueil">Services</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem className='item'>
                                    <MDBNavLink to="#" className="accueil">Prestataires</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem className='item'>
                                    <MDBNavLink to="/login" className="accueil">Connexion</MDBNavLink>
                                </MDBNavItem>
                                {/* <MDBNavItem>
                                    <MDBNavLink to="/register" className="accueil">Créer Compte</MDBNavLink>
                                </MDBNavItem> */}
                            </MDBNavbarNav>
                        </MDBCollapse>

                    </MDBNavbar>
                    <center>
                        <MDBCarousel id="slider"
                            activeItem={1}
                            length={4}
                            showControls={true}
                            showIndicators={true}
                        >
                            <MDBCarouselInner>
                                <MDBCarouselItem id='slid' itemId="1">
                                    <MDBView>

                                        <img id='slid1'
                                            className="d-block w-100"
                                            src="../images/sary1.jpeg"
                                            alt="Décoration"
                                        />

                                        <MDBMask overlay="black-light" />
                                    </MDBView>
                                    <MDBCarouselCaption>
                                        <h3 className="h3-responsive " id="h3slide">Perfect Events vous offre les meilleures décorations<br /><br />pour vos salles <br />et<br /> pour votre hôtel</h3><br /><br /><br /><br /><br /><br />
                                    </MDBCarouselCaption>
                                </MDBCarouselItem>
                                <MDBCarouselItem id='slid' itemId="2">
                                    <MDBView>
                                        <img id='slid1'
                                            className="d-block w-100"
                                            src="../images/sary2.jpeg"
                                            alt="Second slide"
                                        />
                                        <MDBMask overlay="black-strong" />
                                    </MDBView>
                                    <MDBCarouselCaption>
                                        <h3 className="h3-responsive" id="h3slide">L'ambiance dans la salle sera</h3><br />
                                        <h5 className="h3-responsive" id="h3slide">INNOUBLIABLE</h5>
                                        <h5 className="h3-responsive" id="h3slide">Votre paradis à votre disposition</h5><br /><br /><br /><br /><br /><br />
                                    </MDBCarouselCaption>
                                </MDBCarouselItem>
                                <MDBCarouselItem id='slid' itemId="3">
                                    <MDBView>
                                        <img id='slid1'
                                            className="d-block w-100"
                                            src="../images/sary3.jpeg"
                                            alt="Third slide"
                                        />
                                        <MDBMask overlay="black-slight" />
                                    </MDBView>
                                    <MDBCarouselCaption>
                                        <h3 className="h3-responsive" id="h3slide">Transport luxueux et confortable</h3><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                    </MDBCarouselCaption>
                                </MDBCarouselItem>
                                <MDBCarouselItem id='slid' itemId="4">
                                    <MDBView>
                                        <img id='slid1'
                                            className="d-block w-100"
                                            src="../images/sary4.jpeg"
                                            alt="Mattonit's item"
                                        />
                                        <MDBMask overlay="black-light" />
                                    </MDBView>
                                    <MDBCarouselCaption>
                                        <h3 className="h3-responsive" id="h3slide">Tout en dégustant les meilleures goûts du rêve</h3><br /><br /><br /><br /><br /><br /><br /><br />
                                    </MDBCarouselCaption>
                                </MDBCarouselItem>
                            </MDBCarouselInner>
                        </MDBCarousel>
                    </center>

                    <hr />

                </div>
                {/* {this.renderRedirect()} */}

                <div className='container-fluid'>
                    <div className='row'>
                        {this.state.comment.length > 0 ? (this.state.comment.sort((a, b) => { return b._id - a._id }).map((service, _id) => (
                            <div className='col-md-12 carte' key={_id}>
                                <div className="card mask rgba-white-slight">
                                    <div class="card-body">
                                        {service._id % 2 == 0 ? (<div className='container-fluid'>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <img class="card-img-top img-thumbnail" src={"http://localhost:8080/service/" + service.image} alt={service.titre} style={{ width: 'auto', height: '100%', float: 'right' }} />
                                                </div>
                                                <div className="col-md-2">
                                                    <img class="card-img-top img-thumbnail" src={"http://localhost:8080/service/" + service.image1} alt={service.titre} style={{ width: '100%', maxHeight: '300px' }} />
                                                    <img class="card-img-top img-thumbnail" src={"http://localhost:8080/service/" + service.image2} alt={service.titre} style={{ width: '100%', maxHeight: '300px' }} />
                                                </div>
                                                <div className="col-md-6">
                                                    <center>
                                                        <h5 class="card-title">{service.titre}</h5>
                                                        <p class="test">Description: <br />Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad minus magni similique dignissimos assumenda labore iure velit voluptatibus doloribus adipisci soluta voluptas illum vero, excepturi sapiente laborum deserunt, sint ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam facilis quae! Laborum maxime dolores aspernatur error fugit perspiciatis, recusandae, voluptas accusantium libero molestiae laudantium iure porro similique voluptatibus quis?</p>
                                                        <p class="test">Prix: {service.prix}</p>
                                                        <MDBBtn rounded className="button" id="boutton" onClick={e => {
                                                            confirmAlert({
                                                                customUI: ({ onClose }) => {
                                                                    return (
                                                                        <center>
                                                                            <div className="custom-ui">
                                                                                <table>
                                                                                    <td>
                                                                                        <img class="card-img-top img-thumbnail sary" src={"http://localhost:8080/service/" + service.image} alt={service.titre} />
                                                                                        {/* <img class="card-img-top img-thumbnail sary" src={"https://tsiorytahback.herokuapp.com/service/" + service.image} alt={service.titre} /><br /> */}
                                                                                        <p className="text-pop">{service.titre}</p>
                                                                                        <p className="text-pop">Prix: {service.prix}</p>
                                                                                    </td>
                                                                                    <td>

                                                                                        <p className="text-pop">Veillez remplir ce Formulaire pour valider votre Inscription </p>
                                                                                        <MDBInput size="sm" label="Nom" icon="user" id="un" type="text" className="input" name="nom" value={this.state.value} placeholder="nom d'utilisateur" onChange={this.handleChange} />
                                                                                        <MDBInput size="sm" label="Prenom" icon="user" id="deux" type="text" className="input" name="prenom" value={this.state.value} placeholder="prenom d'utilisateur" onChange={this.handleChange} />
                                                                                        <MDBInput size="sm" label="Téléphone" icon="phone" id="ml" type="number" className="input" name="telephone" value={this.state.value} placeholder="exemple@exemple.com" onChange={this.handleChange} />
                                                                                        <MDBInput size="sm" label="Adresse e-mail" icon="at" id="trois" type="email" className="input" name="email" value={this.state.value} placeholder="spécialités d'utilisateur" onChange={this.handleChange} />
                                                                                        <center>
                                                                                            <button className="btn btn-dark"
                                                                                                onClick={() => {
                                                                                                    if (this.state.email != "") {
                                                                                                        const data = new FormData()
                                                                                                        data.append('nom', this.state.nom);
                                                                                                        data.append('prenom', this.state.prenom);
                                                                                                        data.append('telephone', this.state.telephone);
                                                                                                        data.append('email', this.state.email);
                                                                                                        data.append('atelier', service._id);
                                                                                                        // fetch('https://tsiorytahback.herokuapp.com/particulier/' + service._id, {
                                                                                                        fetch('http://localhost:8080/service', {
                                                                                                            method: 'POST',
                                                                                                            body: data,
                                                                                                        }).then((response) => {
                                                                                                            console.log(response);
                                                                                                        });
                                                                                                        onClose();
                                                                                                    }
                                                                                                }
                                                                                                }
                                                                                            >Valider</button>
                                                                                        </center>
                                                                                    </td>
                                                                                </table>
                                                                            </div>
                                                                        </center>
                                                                    );
                                                                }
                                                            })
                                                        }}>S'inscrire</MDBBtn>
                                                    </center>
                                                </div>
                                            </div>
                                        </div>) : (
                                                <div className='container-fluid'>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <center>
                                                                <h5 class="card-title">{service.titre}</h5>
                                                                <p class="test">Description: <br />Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad minus magni similique dignissimos assumenda labore iure velit voluptatibus doloribus adipisci soluta voluptas illum vero, excepturi sapiente laborum deserunt, sint ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam facilis quae! Laborum maxime dolores aspernatur error fugit perspiciatis, recusandae, voluptas accusantium libero molestiae laudantium iure porro similique voluptatibus quis?</p>
                                                                <p class="test">Prix: {service.prix}</p>
                                                                <MDBBtn rounded className="button" id="boutton" onClick={e => {
                                                                    confirmAlert({
                                                                        customUI: ({ onClose }) => {
                                                                            return (
                                                                                <center>
                                                                                    <div className="custom-ui">
                                                                                        <table>
                                                                                            <td>
                                                                                                <img class="card-img-top img-thumbnail sary" src={"http://localhost:8080/service/" + service.image} alt={service.titre} />
                                                                                                {/* <img class="card-img-top img-thumbnail sary" src={"https://tsiorytahback.herokuapp.com/service/" + service.image} alt={service.titre} /><br /> */}
                                                                                                <p className="text-pop">{service.titre}</p>
                                                                                                <p className="text-pop">Prix: {service.prix}</p>
                                                                                            </td>
                                                                                            <td>

                                                                                                <p className="text-pop">Veillez remplir ce Formulaire pour valider votre Inscription </p>
                                                                                                <MDBInput size="sm" label="Nom" icon="user" id="un" type="text" className="input" name="nom" value={this.state.value} placeholder="nom d'utilisateur" onChange={this.handleChange} />
                                                                                                <MDBInput size="sm" label="Prenom" icon="user" id="deux" type="text" className="input" name="prenom" value={this.state.value} placeholder="prenom d'utilisateur" onChange={this.handleChange} />
                                                                                                <MDBInput size="sm" label="Téléphone" icon="phone" id="ml" type="number" className="input" name="telephone" value={this.state.value} placeholder="exemple@exemple.com" onChange={this.handleChange} />
                                                                                                <MDBInput size="sm" label="Adresse e-mail" icon="at" id="trois" type="email" className="input" name="email" value={this.state.value} placeholder="spécialités d'utilisateur" onChange={this.handleChange} />
                                                                                                <center>
                                                                                                    <button className="btn btn-dark"
                                                                                                        onClick={() => {
                                                                                                            if (this.state.email != "") {
                                                                                                                const data = new FormData()
                                                                                                                data.append('nom', this.state.nom);
                                                                                                                data.append('prenom', this.state.prenom);
                                                                                                                data.append('telephone', this.state.telephone);
                                                                                                                data.append('email', this.state.email);
                                                                                                                data.append('atelier', service._id);
                                                                                                                // fetch('https://tsiorytahback.herokuapp.com/particulier/' + service._id, {
                                                                                                                fetch('http://localhost:8080/service', {
                                                                                                                    method: 'POST',
                                                                                                                    body: data,
                                                                                                                }).then((response) => {
                                                                                                                    console.log(response);
                                                                                                                });
                                                                                                                onClose();
                                                                                                            }
                                                                                                        }
                                                                                                        }
                                                                                                    >Valider</button>
                                                                                                </center>
                                                                                            </td>
                                                                                        </table>
                                                                                    </div>
                                                                                </center>
                                                                            );
                                                                        }
                                                                    })
                                                                }}>S'inscrire</MDBBtn>
                                                            </center>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <img class="card-img-top img-thumbnail" src={"http://localhost:8080/service/" + service.image} alt={service.titre} style={{ width: 'auto', height: '100%', float: 'right' }} />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <img class="card-img-top img-thumbnail" src={"http://localhost:8080/service/" + service.image1} alt={service.titre} style={{ width: '100%', maxHeight: '300px' }} />
                                                            <img class="card-img-top img-thumbnail" src={"http://localhost:8080/service/" + service.image2} alt={service.titre} style={{ width: '100%', maxHeight: '300px' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                    </div>
                                    {/* <img class="card-img-top img-thumbnail" src={"https://tsiorytahback.herokuapp.com/service/" + service.image} alt={service.titre} /> */}

                                </div>
                                <br />
                            </div>
                        )
                        )) : ''}
                    </div>
                </div>

                <Footer />
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        client: state
    }
}
export default connect(mapStateToProps)(Home)



{/* <MDBContainer key={_id}>
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                        <MDBModalHeader>{article.titre}</MDBModalHeader>
                                        <MDBModalBody>
                                            <center>
                                                <img class="card-img-top img-thumbnail" src={"http:localhost:8080/service/" + article.image} alt={article.image} />
                                                <img class="card-img-top img-thumbnail" src={"http:localhost:8080/service/" + article.image1} alt={article.image1} />
                                                <img class="card-img-top img-thumbnail" src={"http:localhost:8080/service/" + article.image2} alt={article.image2} />
                                                <p>{article.description}</p>
                                                <p>{article.prix}</p>
                                            </center>
                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={() => { this.toggle() }}>Close</MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModal>
                                </MDBContainer> */}


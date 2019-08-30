import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import Footer from './../components/Footer';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { MDBNavbar, MDBInput, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBContainer } from "mdbreact";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask } from "mdbreact";
import { MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { confirmAlert } from 'react-confirm-alert';
import './article.css'
import 'react-confirm-alert/src/react-confirm-alert.css'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            password: '',
            collapseID: "",
            comment: [],
            list: [],
            clientList: [],
            modal: '',
            service: [],
            resultat: []
        };
        this.handleChange = this.handleChange.bind(this)
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }


    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    renderRedirect = () => {
        if (this.state.redirect) {
            var url = '/service/' + this.state._id
            return <Redirect to={url} />
        }
    }

    componentDidMount() {

        // for (let i=0; i<6; i++){
        //     localStorage.removeItem('afficheList'+i)
        // }
        axios.get("https://perfect-back.herokuapp.com/service").then(res => {
            var tab = []
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].active == true) {
                    tab.push(res.data[i])
                }
                // localStorage.setItem('idService' + res.data[i]._id, res.data[i]._id)
            }
            this.setState({ comment: tab })

            axios.get('https://perfect-back.herokuapp.com/getList').then(response => {
                this.setState({ list: response.data })
                var tab1 = []
                var obj = {}
                var out = []
                for (let i = 0; i < this.state.list.length; i++) {
                    tab1.push(this.state.list[i].idClient)
                    obj[tab1[i]] = 0;
                }
                for (let j in obj) {
                    console.log('j:', j);
                    out.push(j)
                }
                this.setState({ clientList: out })
                for (let k = 0; k < out.length; k++) {
                    localStorage.setItem('clientList' + k, out[k])
                }
                console.log('out:', out);
                console.log('list:', this.state.list);
                if (this.state.list.length < this.state.comment.length) {
                    for (let j = 0; j < this.state.list.length; j++) {
                        localStorage.setItem('afficheList' + this.state.comment[j]._id, this.state.list[j].afficheList)
                    }
                    for (let j = this.state.list.length; j < this.state.comment.length; j++) {
                        // localStorage.setItem('afficheList' + this.state.comment[j]._id, 'false')
                    }
                } else {
                    for (let j = 0; j < this.state.list.length; j++) {
                        localStorage.setItem('afficheList' + this.state.list[j]._id, this.state.list[j].afficheList)
                    }
                }


                //DEBUT
                var listService = []
                var tabListOK = []
                for (let i = 0; i < this.state.list.length; i++) {
                    if (localStorage.getItem('idClient') == this.state.list[i].idClient) {
                        listService.push(this.state.list[i])
                    }
                }
                console.log('ListService:', listService);

                for (let j = 0; j < listService.length; j++) {
                    console.log('test:', res);

                    tabListOK.push(res.data[listService[j].idService])
                }
                this.setState({ service: tabListOK })
                console.log('OK:', tabListOK);

                var resul = []
                for (let x = 0; x < tabListOK.length; x++) {
                    if (listService[x].afficheList == 'true') {
                        localStorage.setItem('afficheList' + tabListOK[x]._id, 'true')
                        // resul.push({ idServ: tabListOK[x]._id, aff: true })
                    } else {
                        localStorage.setItem('afficheList' + tabListOK[x]._id, 'false')
                        // resul.push({ idServ: tabListOK[x]._id, aff: false })
                    }
                }
                this.setState({ resultat: resul })
                console.log('res mody:', this.state.resultat);
                //FIN 

            })
        })

    }

    affichages() {
        axios.get("https://perfect-back.herokuapp.com/service").then(res => {
            axios.get('https://perfect-back.herokuapp.com/getList').then(response => {
                var listService = []
                var tabListOK = []
                for (let i = 0; i < response.data.length; i++) {
                    if (localStorage.getItem('idClient') == response.data[i].idClient) {
                        listService.push(response.data[i])
                    }
                }
                console.log('ListService:', listService);

                for (let j = 0; j < listService.length; j++) {
                    console.log('test:', res);

                    tabListOK.push(res.data[listService[j].idService])
                }
                this.setState({ service: tabListOK })
                console.log('OK:', tabListOK);

                var resul = []
                for (let x = 0; x < tabListOK.length; x++) {
                    if (listService[x].afficheList == 'true') {
                        localStorage.setItem('afficheList' + tabListOK[x]._id, true)
                        // resul.push({ idServ: tabListOK[x]._id, aff: true })
                    } else {
                        resul.push({ idServ: tabListOK[x]._id, aff: false })
                    }
                }
                this.setState({ resultat: resul })
                console.log('res mody:', this.state.resultat);
            })
        })

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    triage(categorie) {
        axios.get("https://perfect-back.herokuapp.com/service").then(res => {
            console.log('res comment: ', res.data)
            var tab = []
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].categorie == categorie && res.data[i].active == true) {
                    tab.push(res.data[i])
                }
            }
            this.setState({ comment: tab })
            console.log('comment: ', this.state.comment)
        })
    }

    signin() {
        axios.post('https://perfect-back.herokuapp.com/signin', {
            nom: this.state.nom,
            password: this.state.password
        })
            .then((response) => {
                console.log(response);

                if (response.data == 'ko') {
                    console.log('connexion échoué');

                } else {
                    console.log("post ok: res.data ", response.data);
                    localStorage.setItem('idClient', parseInt(response.data._id))
                    localStorage.setItem('nomClient', response.data.nom)
                    console.log('reducer REGISTER: ', localStorage.getItem('login'));
                }
            })
            .catch((error) => {
                console.log("erreur be: ", error);
            });
    }

    render() {
        return (
            <div className="homePage container-fluid">
                <div>

                    {/* ***Navbar*** */}
                    <MDBNavbar id="Totalhome"
                        color="bg-primary"
                        dark
                        expand="md"
                        scrolling
                        className='position-fixed'
                        style={{ position: 'absolute', zIndex: '1000', float: 'left', width: '103.2%', marginLeft: '-3%' }}
                    >

                        <MDBNavbarBrand>
                            <img src="../images/logoPM.png" id="logo-header" alt="imagelogo" />
                        </MDBNavbarBrand>
                        <MDBNavbarToggler
                            image="../images/hamburger3.gif"
                            onClick={this.toggleCollapse("navbarCollapse")}
                        />
                        <MDBCollapse
                            id="navbarCollapse"
                            isOpen={this.state.collapseID}
                            navbar
                        >

                            <MDBNavbarNav right>
                                <MDBNavItem className='item'>
                                    <MDBNavLink to="#" className="item accueil">Services</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem className='item'>
                                    <MDBNavLink to="/list" className="item accueil">Mes Listes</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem className='item'>
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2 item accueil">Prestataires</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem onClick={() => this.triage("Tete")}>Têtes de cortège</MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => this.triage("Salle")}>Salles de réception</MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => this.triage("Deco")}>Décorations</MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => this.triage("Trait")}>Services traiteurs</MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => this.triage("Photo")}>Photographes/VIdéastes</MDBDropdownItem>
                                            <MDBDropdownItem divider />
                                            <MDBDropdownItem onClick={() => this.componentDidMount()}>Afficher tous</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                                <MDBNavItem className='item'>
                                    <MDBNavLink to="/" className="accueil" onClick={() => {
                                        confirmAlert({
                                            customUI: ({ onClose }) => {
                                                return (

                                                    <div className="custom-ui">

                                                        <h3 className="text-pop">FORMULAIRE DE CONNEXION</h3>
                                                        <MDBInput size="sm" label="Nom ou adresse e-mail" icon="user" id="un" type="text" className="input" name="nom" value={this.state.value} placeholder="nom d'utilisateur" onChange={this.handleChange} />
                                                        <MDBInput size="sm" label="Mots de passe" icon="lock" id="trois" type="passWord" className="input" name="password" value={this.state.value} placeholder="spécialités d'utilisateur" onChange={this.handleChange} />
                                                        <center>
                                                            <button className="btn btn-dark"
                                                                onClick={() => {
                                                                    {
                                                                        this.signin({
                                                                            nom: this.state.nom,
                                                                            password: this.state.password
                                                                        })
                                                                    }
                                                                    { this.componentDidMount() }
                                                                    onClose()
                                                                }}
                                                            >Valider</button>
                                                        </center>

                                                    </div>

                                                );
                                            }
                                        })
                                    }}>Connexion</MDBNavLink>
                                </MDBNavItem>

                            </MDBNavbarNav>
                        </MDBCollapse>

                    </MDBNavbar>



                    <center>
                        <MDBCarousel id="slider"
                            light
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
                    {/* <button onClick={() => { this.affichages() }}>testRes</button> */}
                </div>
                {/* {this.renderRedirect()} */}
                <div className='container-fluid'>
                    <div className='row'>
                        <p style={{ marginLeft: '43%' }}>************** {this.state.comment.length} résultats **************</p>
                        {this.state.comment.length > 0 ? (this.state.comment.sort((a, b) => { return b._id - a._id }).map((service, _id) => (
                            <div key={_id}>
                                {localStorage.setItem('idService' + service._id, service._id)}
                                <div className="card col-md-12 carte ">
                                    <div class="card-body">
                                        {service._id % 2 == 0 ? (
                                            <div className='container-fluid'>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <img class="card-img-top img-thumbnail" src={"https://perfect-back.herokuapp.com/service/" + service.image} alt={service.titre} style={{ width: '80%', height: '100%', maxHeight: '100%', float: 'left', border: "none" }} />

                                                        <img class="card-img-top img-thumbnail" src={"https://perfect-back.herokuapp.com/service/" + service.image1} alt={service.titre} style={{ width: '20%', height: '50%', border: "none" }} /><br />
                                                        <img class="card-img-top img-thumbnail" src={"https://perfect-back.herokuapp.com/service/" + service.image2} alt={service.titre} style={{ width: '20%', height: '50%', border: "none" }} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <center>
                                                            <h2 class="card-title" style={{ color: 'rgb(255, 20, 51)', fontWeight: 'bold' }}>{service.titre}</h2>
                                                        </center>
                                                        <h5 class="test"><u>Description:</u> <br />Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad minus magni similique dignissimos assumenda labore iure velit voluptatibus doloribus adipisci soluta voluptas illum vero, excepturi sapiente laborum deserunt, sint ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam facilis quae! Laborum maxime dolores aspernatur error fugit perspiciatis, recusandae, voluptas accusantium libero molestiae laudantium iure porro similique voluptatibus quis?</h5>
                                                        <p>
                                                            {
                                                                (localStorage.getItem('idClient') && localStorage.getItem('afficheList' + service._id) == 'true') ?
                                                                    (
                                                                        <MDBBtn onClick={(e) => {
                                                                            localStorage.setItem('afficheList' + service._id, 'false')
                                                                            this.componentDidMount()
                                                                            // axios.put('https://perfect-back.herokuapp.com/updateList/' + service._id, {
                                                                            //     idClient: localStorage.getItem('idClient'),
                                                                            //     idService: localStorage.getItem('idService' + service._id),
                                                                            //     afficheList: false
                                                                            // }).then(res => {
                                                                            //     localStorage.setItem('afficheList' + service._id, 'false')
                                                                            //     { this.componentDidMount() }
                                                                            // })
                                                                        }}>Retirer de ma Liste</MDBBtn>
                                                                    ) : (
                                                                        (localStorage.getItem('idClient') && localStorage.getItem('afficheList' + service._id) == 'false') ?
                                                                            (
                                                                                <MDBBtn onClick={(e) => {
                                                                                    localStorage.setItem('afficheList' + service._id, 'true')
                                                                                    this.componentDidMount()
                                                                                    // axios.put('https://perfect-back.herokuapp.com/updateList/' + service._id, {
                                                                                    //     idClient: localStorage.getItem('idClient'),
                                                                                    //     idService: localStorage.getItem('idService' + service._id),
                                                                                    //     afficheList: true
                                                                                    // }).then(res => {
                                                                                    //     localStorage.setItem('afficheList' + service._id, 'true')
                                                                                    //     console.log('get local: ', localStorage.getItem('afficheList' + service._id))
                                                                                    //     { this.componentDidMount() }
                                                                                    // })
                                                                                }}>Ajouter dans ma Liste</MDBBtn>
                                                                            ) : (
                                                                                (!localStorage.getItem('idClient') && localStorage.getItem('afficheList' + service._id) == 'false') ?
                                                                                    (
                                                                                        <MDBBtn onClick={(e) => {
                                                                                            confirmAlert({
                                                                                                customUI: ({ onClose }) => {
                                                                                                    return (
                                                                                                        <div className="custom-ui">

                                                                                                            <p className="text-pop">Veillez vous connecter afin d'Ajouter ce Service </p>
                                                                                                            <MDBInput size="sm" label="Nom ou adresse e-mail" icon="user" id="un" type="text" className="input" name="nom" value={this.state.value} placeholder="nom d'utilisateur" onChange={this.handleChange} />
                                                                                                            <MDBInput size="sm" label="Mots de passe" icon="lock" id="trois" type="passWord" className="input" name="password" value={this.state.value} placeholder="spécialités d'utilisateur" onChange={this.handleChange} />
                                                                                                            <center>
                                                                                                                <button className="btn btn-dark"
                                                                                                                    onClick={() => {
                                                                                                                        axios.post('https://perfect-back.herokuapp.com/signin', {
                                                                                                                            nom: this.state.nom,
                                                                                                                            password: this.state.password
                                                                                                                        })
                                                                                                                            .then((response) => {
                                                                                                                                if (response.data == 'ko') {
                                                                                                                                    console.log('connexion échoué');

                                                                                                                                } else {
                                                                                                                                    console.log("post ok: res.data ", response.data);
                                                                                                                                    localStorage.setItem('idClient', parseInt(response.data._id))
                                                                                                                                    localStorage.setItem('nomClient', response.data.nom)
                                                                                                                                        (localStorage.getItem('idClient') && localStorage.getItem('afficheList' + service._id) == 'true') ? (
                                                                                                                                            localStorage.setItem('afficheList' + service._id, 'false')
                                                                                                                                            // axios.put('https://perfect-back.herokuapp.com/updateList/' + service._id, {
                                                                                                                                            //     idClient: localStorage.getItem('idClient'),
                                                                                                                                            //     idService: localStorage.getItem('idService' + service._id),
                                                                                                                                            //     afficheList: false
                                                                                                                                            // }).then(res => {
                                                                                                                                            //     console.log(localStorage.getItem('afficheList'))
                                                                                                                                            //     { this.componentDidMount() }
                                                                                                                                            // })
                                                                                                                                        ) : (
                                                                                                                                            localStorage.setItem('afficheList' + service._id, 'true')
                                                                                                                                            // axios.post('https://perfect-back.herokuapp.com/postList', {
                                                                                                                                            //     idClient: localStorage.getItem('idClient'),
                                                                                                                                            //     idService: localStorage.getItem('idService' + service._id),
                                                                                                                                            //     afficheList: true
                                                                                                                                            // }).then(res => {
                                                                                                                                            //     console.log('affichage OK ', localStorage.getItem('idClient'));

                                                                                                                                            //     localStorage.setItem('afficheList' + service._id, 'true')
                                                                                                                                            // })
                                                                                                                                        )
                                                                                                                                }
                                                                                                                            })
                                                                                                                            .catch((error) => {
                                                                                                                                console.log("erreur be: ", error);
                                                                                                                            });
                                                                                                                        this.componentDidMount()
                                                                                                                        onClose()
                                                                                                                    }}
                                                                                                                >Valider</button>
                                                                                                            </center>

                                                                                                        </div>
                                                                                                    );
                                                                                                }
                                                                                            })
                                                                                            { this.componentDidMount() }
                                                                                        }}>Ajouter dans ma Liste</MDBBtn>
                                                                                    ) : (
                                                                                        (!localStorage.getItem('idClient') && localStorage.getItem('afficheList' + service._id) == 'true') ?
                                                                                            (
                                                                                                <MDBBtn onClick={(e) => {
                                                                                                    confirmAlert({
                                                                                                        customUI: ({ onClose }) => {
                                                                                                            return (
                                                                                                                <div className="custom-ui">

                                                                                                                    <p className="text-pop">Veillez vous connecter afin d'Ajouter ce Service </p>
                                                                                                                    <MDBInput size="sm" label="Nom ou adresse e-mail" icon="user" id="un" type="text" className="input" name="nom" value={this.state.value} placeholder="nom d'utilisateur" onChange={this.handleChange} />
                                                                                                                    <MDBInput size="sm" label="Mots de passe" icon="lock" id="trois" type="passWord" className="input" name="password" value={this.state.value} placeholder="spécialités d'utilisateur" onChange={this.handleChange} />
                                                                                                                    <center>
                                                                                                                        <button className="btn btn-dark"
                                                                                                                            onClick={() => {
                                                                                                                                axios.post('https://perfect-back.herokuapp.com/signin', {
                                                                                                                                    nom: this.state.nom,
                                                                                                                                    password: this.state.password
                                                                                                                                })
                                                                                                                                    .then((response) => {
                                                                                                                                        if (response.data == 'ko') {
                                                                                                                                            console.log('connexion échoué');

                                                                                                                                        } else {
                                                                                                                                            console.log("post ok: res.data ", response.data);
                                                                                                                                            localStorage.setItem('idClient', parseInt(response.data._id))
                                                                                                                                            localStorage.setItem('nomClient', response.data.nom)
                                                                                                                                                (localStorage.getItem('idClient') && localStorage.getItem('afficheList' + service._id) == 'true') ? (
                                                                                                                                                    localStorage.setItem('afficheList' + service._id, 'false')
                                                                                                                                                    // axios.put('https://perfect-back.herokuapp.com/updateList/' + service._id, {
                                                                                                                                                    //     idClient: localStorage.getItem('idClient'),
                                                                                                                                                    //     idService: localStorage.getItem('idService' + service._id),
                                                                                                                                                    //     afficheList: false
                                                                                                                                                    // }).then(res => {
                                                                                                                                                    //     console.log(localStorage.getItem('afficheList'))
                                                                                                                                                    //     { this.componentDidMount() }
                                                                                                                                                    // })
                                                                                                                                                ) : (
                                                                                                                                                    localStorage.setItem('afficheList' + service._id, 'true')
                                                                                                                                                    // axios.put('https://perfect-back.herokuapp.com/updateList/' + service._id, {
                                                                                                                                                    //     idClient: localStorage.getItem('idClient'),
                                                                                                                                                    //     idService: localStorage.getItem('idService' + service._id),
                                                                                                                                                    //     afficheList: true
                                                                                                                                                    // }).then(res => {
                                                                                                                                                    //     localStorage.setItem('afficheList' + service._id, 'true')
                                                                                                                                                    //     console.log(localStorage.getItem('afficheList'))
                                                                                                                                                    //     { this.componentDidMount() }
                                                                                                                                                    // })
                                                                                                                                                )
                                                                                                                                        }
                                                                                                                                    })
                                                                                                                                    .catch((error) => {
                                                                                                                                        console.log("erreur be: ", error);
                                                                                                                                    });
                                                                                                                                this.componentDidMount()
                                                                                                                                onClose()
                                                                                                                            }}
                                                                                                                        >Valider</button>
                                                                                                                    </center>

                                                                                                                </div>
                                                                                                            );
                                                                                                        }
                                                                                                    })
                                                                                                    { this.componentDidMount() }
                                                                                                }}>Ajouter dans ma Liste</MDBBtn>
                                                                                            ) : (<MDBBtn onClick={() => {
                                                                                                localStorage.setItem('afficheList' + service._id, 'false')
                                                                                                this.componentDidMount()
                                                                                            }}>Ajouter dans ma Liste</MDBBtn>)
                                                                                    )
                                                                            )

                                                                    )
                                                            }
                                                        </p>

                                                    </div>
                                                </div>
                                                <br />
                                            </div>) : (
                                                <div className='container-fluid'>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <center>
                                                                <h2 class="card-title" style={{ color: 'rgb(255, 20, 51)', fontWeight: 'bold' }}>{service.titre}</h2>
                                                            </center>
                                                            <h5 class="test"><u>Description:</u> <br />Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad minus magni similique dignissimos assumenda labore iure velit voluptatibus doloribus adipisci soluta voluptas illum vero, excepturi sapiente laborum deserunt, sint ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nam facilis quae! Laborum maxime dolores aspernatur error fugit perspiciatis, recusandae, voluptas accusantium libero molestiae laudantium iure porro similique voluptatibus quis?</h5>
                                                            <p>
                                                                {
                                                                    (localStorage.getItem('idClient') && localStorage.getItem('afficheList' + service._id) == 'true') ?
                                                                        (
                                                                            <MDBBtn onClick={(e) => {
                                                                                localStorage.setItem('afficheList' + service._id, 'false')
                                                                                this.componentDidMount()
                                                                                // axios.put('https://perfect-back.herokuapp.com/updateList/' + service._id, {
                                                                                //     idClient: localStorage.getItem('idClient'),
                                                                                //     idService: localStorage.getItem('idService' + service._id),
                                                                                //     afficheList: false
                                                                                // }).then(res => {
                                                                                //     localStorage.setItem('afficheList' + service._id, 'false')
                                                                                //     { this.componentDidMount() }
                                                                                // })
                                                                            }}>Retirer de ma Liste</MDBBtn>
                                                                        ) : (
                                                                            (localStorage.getItem('idClient') && localStorage.getItem('afficheList' + service._id) == 'false') ?
                                                                                (
                                                                                    <MDBBtn onClick={(e) => {
                                                                                        localStorage.setItem('afficheList' + service._id, 'true')
                                                                                        this.componentDidMount()
                                                                                        // axios.put('https://perfect-back.herokuapp.com/updateList/' + service._id, {
                                                                                        //     idClient: localStorage.getItem('idClient'),
                                                                                        //     idService: localStorage.getItem('idService' + service._id),
                                                                                        //     afficheList: true
                                                                                        // }).then(res => {
                                                                                        //     localStorage.setItem('afficheList' + service._id, 'true')
                                                                                        //     console.log('get local: ', localStorage.getItem('afficheList' + service._id))
                                                                                        //     { this.componentDidMount() }
                                                                                        // })
                                                                                    }}>Ajouter dans ma Liste</MDBBtn>
                                                                                ) : (
                                                                                    (!localStorage.getItem('idClient') && localStorage.getItem('afficheList' + service._id) == 'false') ?
                                                                                        (
                                                                                            <MDBBtn onClick={(e) => {
                                                                                                confirmAlert({
                                                                                                    customUI: ({ onClose }) => {
                                                                                                        return (
                                                                                                            <div className="custom-ui">

                                                                                                                <p className="text-pop">Veillez vous connecter afin d'Ajouter ce Service </p>
                                                                                                                <MDBInput size="sm" label="Nom ou adresse e-mail" icon="user" id="un" type="text" className="input" name="nom" value={this.state.value} placeholder="nom d'utilisateur" onChange={this.handleChange} />
                                                                                                                <MDBInput size="sm" label="Mots de passe" icon="lock" id="trois" type="passWord" className="input" name="password" value={this.state.value} placeholder="spécialités d'utilisateur" onChange={this.handleChange} />
                                                                                                                <center>
                                                                                                                    <button className="btn btn-dark"
                                                                                                                        onClick={() => {
                                                                                                                            axios.post('https://perfect-back.herokuapp.com/signin', {
                                                                                                                                nom: this.state.nom,
                                                                                                                                password: this.state.password
                                                                                                                            })
                                                                                                                                .then((response) => {
                                                                                                                                    if (response.data == 'ko') {
                                                                                                                                        console.log('connexion échoué');

                                                                                                                                    } else {
                                                                                                                                        console.log("post ok: res.data ", response.data);
                                                                                                                                        localStorage.setItem('idClient', parseInt(response.data._id))
                                                                                                                                        localStorage.setItem('nomClient', response.data.nom)
                                                                                                                                            (localStorage.getItem('idClient') && localStorage.getItem('afficheList' + service._id) == 'true') ? (
                                                                                                                                                localStorage.setItem('afficheList' + service._id, 'false')
                                                                                                                                                // axios.put('https://perfect-back.herokuapp.com/updateList/' + service._id, {
                                                                                                                                                //     idClient: localStorage.getItem('idClient'),
                                                                                                                                                //     idService: localStorage.getItem('idService' + service._id),
                                                                                                                                                //     afficheList: false
                                                                                                                                                // }).then(res => {
                                                                                                                                                //     console.log(localStorage.getItem('afficheList'))
                                                                                                                                                //     { this.componentDidMount() }
                                                                                                                                                // })
                                                                                                                                            ) : (
                                                                                                                                                localStorage.setItem('afficheList' + service._id, 'true')
                                                                                                                                                // axios.post('https://perfect-back.herokuapp.com/postList', {
                                                                                                                                                //     idClient: localStorage.getItem('idClient'),
                                                                                                                                                //     idService: localStorage.getItem('idService' + service._id),
                                                                                                                                                //     afficheList: true
                                                                                                                                                // }).then(res => {
                                                                                                                                                //     console.log('affichage OK ', localStorage.getItem('idClient'));

                                                                                                                                                //     localStorage.setItem('afficheList' + service._id, 'true')
                                                                                                                                                // })
                                                                                                                                            )
                                                                                                                                    }
                                                                                                                                })
                                                                                                                                .catch((error) => {
                                                                                                                                    console.log("erreur be: ", error);
                                                                                                                                });
                                                                                                                            this.componentDidMount()
                                                                                                                            onClose()
                                                                                                                        }}
                                                                                                                    >Valider</button>
                                                                                                                </center>

                                                                                                            </div>
                                                                                                        );
                                                                                                    }
                                                                                                })
                                                                                                { this.componentDidMount() }
                                                                                            }}>Ajouter dans ma Liste</MDBBtn>
                                                                                        ) : (
                                                                                            (!localStorage.getItem('idClient') && localStorage.getItem('afficheList' + service._id) == 'true') ?
                                                                                                (
                                                                                                    <MDBBtn onClick={(e) => {
                                                                                                        confirmAlert({
                                                                                                            customUI: ({ onClose }) => {
                                                                                                                return (
                                                                                                                    <div className="custom-ui">

                                                                                                                        <p className="text-pop">Veillez vous connecter afin d'Ajouter ce Service </p>
                                                                                                                        <MDBInput size="sm" label="Nom ou adresse e-mail" icon="user" id="un" type="text" className="input" name="nom" value={this.state.value} placeholder="nom d'utilisateur" onChange={this.handleChange} />
                                                                                                                        <MDBInput size="sm" label="Mots de passe" icon="lock" id="trois" type="passWord" className="input" name="password" value={this.state.value} placeholder="spécialités d'utilisateur" onChange={this.handleChange} />
                                                                                                                        <center>
                                                                                                                            <button className="btn btn-dark"
                                                                                                                                onClick={() => {
                                                                                                                                    axios.post('https://perfect-back.herokuapp.com/signin', {
                                                                                                                                        nom: this.state.nom,
                                                                                                                                        password: this.state.password
                                                                                                                                    })
                                                                                                                                        .then((response) => {
                                                                                                                                            if (response.data == 'ko') {
                                                                                                                                                console.log('connexion échoué');

                                                                                                                                            } else {
                                                                                                                                                console.log("post ok: res.data ", response.data);
                                                                                                                                                localStorage.setItem('idClient', parseInt(response.data._id))
                                                                                                                                                localStorage.setItem('nomClient', response.data.nom)
                                                                                                                                                    (localStorage.getItem('idClient') && localStorage.getItem('afficheList' + service._id) == 'true') ? (
                                                                                                                                                        localStorage.setItem('afficheList' + service._id, 'false')
                                                                                                                                                        // axios.put('https://perfect-back.herokuapp.com/updateList/' + service._id, {
                                                                                                                                                        //     idClient: localStorage.getItem('idClient'),
                                                                                                                                                        //     idService: localStorage.getItem('idService' + service._id),
                                                                                                                                                        //     afficheList: false
                                                                                                                                                        // }).then(res => {
                                                                                                                                                        //     console.log(localStorage.getItem('afficheList'))
                                                                                                                                                        //     { this.componentDidMount() }
                                                                                                                                                        // })
                                                                                                                                                    ) : (
                                                                                                                                                        localStorage.setItem('afficheList' + service._id, 'true')
                                                                                                                                                        // axios.put('https://perfect-back.herokuapp.com/updateList/' + service._id, {
                                                                                                                                                        //     idClient: localStorage.getItem('idClient'),
                                                                                                                                                        //     idService: localStorage.getItem('idService' + service._id),
                                                                                                                                                        //     afficheList: true
                                                                                                                                                        // }).then(res => {
                                                                                                                                                        //     localStorage.setItem('afficheList' + service._id, 'true')
                                                                                                                                                        //     console.log(localStorage.getItem('afficheList'))
                                                                                                                                                        //     { this.componentDidMount() }
                                                                                                                                                        // })
                                                                                                                                                    )
                                                                                                                                            }
                                                                                                                                        })
                                                                                                                                        .catch((error) => {
                                                                                                                                            console.log("erreur be: ", error);
                                                                                                                                        });
                                                                                                                                    this.componentDidMount()
                                                                                                                                    onClose()
                                                                                                                                }}
                                                                                                                            >Valider</button>
                                                                                                                        </center>

                                                                                                                    </div>
                                                                                                                );
                                                                                                            }
                                                                                                        })
                                                                                                        { this.componentDidMount() }
                                                                                                    }}>Ajouter dans ma Liste</MDBBtn>
                                                                                                ) : (<MDBBtn onClick={() => {
                                                                                                    localStorage.setItem('afficheList' + service._id, 'false')
                                                                                                    this.componentDidMount()
                                                                                                }}>Ajouter dans ma Liste</MDBBtn>)
                                                                                        )
                                                                                )

                                                                        )
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <img class="card-img-top img-thumbnail" src={"https://perfect-back.herokuapp.com/service/" + service.image} alt={service.titre} style={{ width: '80%', height: '100%', float: 'right', border: "none" }} />

                                                            <img class="card-img-top img-thumbnail" src={"https://perfect-back.herokuapp.com/service/" + service.image1} alt={service.titre} style={{ width: '20%', height: '50%', border: "none" }} />
                                                            <img class="card-img-top img-thumbnail" src={"https://perfect-back.herokuapp.com/service/" + service.image2} alt={service.titre} style={{ width: '20%', height: '50%', border: "none" }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                    </div>
                                    {/* <img class="card-img-top img-thumbnail" src={"https://tsiorytahback.herokuapp.com/service/" + service.image} alt={service.titre} /> */}

                                </div>
                                <br />
                            </div >
                        )
                        )) : ''
                        }
                    </div>
                </div >

                <Footer />
            </div >

        )
    }
}


const mapStateToProps = (state) => {
    return {
        client: state
    }
}
export default connect(mapStateToProps)(Home)

// {
//     (localStorage.getItem('idClient') && localStorage.getItem('afficheList' + service._id) == 'true') ?
//     (
//         <MDBBtn onClick={(e) => {
//             axios.put('https://perfect-back.herokuapp.com/updateList/' + service._id, {
//                 idClient: localStorage.getItem('idClient'),
//                 idService: localStorage.getItem('idService' + service._id),
//                 afficheList: false
//             }).then(res => {
//                 console.log(localStorage.getItem('afficheList'))
//                 this.componentDidMount()
//             })
//         }}>Retirer de ma Liste</MDBBtn>
//     ) : (
//         (localStorage.getItem('idClient') && localStorage.getItem('afficheList' + service._id) == 'false') ?
//             (
//                 <MDBBtn onClick={(e) => {
//                     axios.put('https://perfect-back.herokuapp.com/updateList/' + service._id, {
//                         idClient: localStorage.getItem('idClient'),
//                         idService: localStorage.getItem('idService' + service._id),
//                         afficheList: true
//                     }).then(res => {
//                         console.log(localStorage.getItem('afficheList'))
//                         this.componentDidMount()
//                     })
//                 }}>Retirer de ma Liste</MDBBtn>
//             ) : (
//                 <MDBBtn onClick={(e) => {
//                     confirmAlert({
//                         customUI: ({ onClose }) => {
//                             return (
//                                 <center>
//                                     <div className="custom-ui">

//                                         <p className="text-pop">Veillez vous connecter afin d'Ajouter ce Service </p>
//                                         <MDBInput size="sm" label="Nom ou adresse e-mail" icon="user" id="un" type="text" className="input" name="nom" value={this.state.value} placeholder="nom d'utilisateur" onChange={this.handleChange} />
//                                         <MDBInput size="sm" label="Mots de passe" icon="lock" id="trois" type="passWord" className="input" name="password" value={this.state.value} placeholder="spécialités d'utilisateur" onChange={this.handleChange} />
//                                         <center>
//                                             <button className="btn btn-dark"
//                                                 onClick={() => {
//                                                     axios.post('https://perfect-back.herokuapp.com/signin', {
//                                                         nom: this.state.nom,
//                                                         password: this.state.password
//                                                     })
//                                                         .then((response) => {
//                                                             console.log("post ok: res.data ", response.data);
//                                                             localStorage.setItem('idClient', parseInt(response.data._id))
//                                                             localStorage.setItem('nomClient', response.data.nom)
//                                                             console.log('reducer REGISTER: ', localStorage.getItem('login'));
//                                                             axios.post('https://perfect-back.herokuapp.com/postList', {
//                                                                 idClient: localStorage.getItem('idClient'),
//                                                                 idService: localStorage.getItem('idService' + service._id),
//                                                                 afficheList: true
//                                                             }).then(res => {
//                                                                 localStorage.setItem('afficheList' + service._id, 'true')
//                                                             })
//                                                         })
//                                                         .catch((error) => {
//                                                             console.log("erreur be: ", error);
//                                                         });
//                                                     this.componentDidMount()
//                                                     onClose()
//                                                 }}
//                                             >Valider</button>
//                                         </center>

//                                     </div>
//                                 </center>
//                             );
//                         }
//                     })
//                     this.componentDidMount()
//                 }}>Ajouter dans ma Liste</MDBBtn>
//             )
//     )
// }
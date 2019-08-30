import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { MDBContainer, MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { confirmAlert } from 'react-confirm-alert'; // Import
import './article.css'
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            titre: '',
            description: '',
            prix: '',
            image: "",
            image1: "",
            image2: "",
            comment: [],
            date: '',
            active: true,
            modal: false,
        };
        this.handleChange = this.handleChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.handleUploadImage = this.handleUploadImage.bind(this)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    handleUploadImage(ev) {
        const data = new FormData();
        data.append('image', this.uploadInput.files[0]);
        data.append('image1', this.uploadInput1.files[0]);
        data.append('image2', this.uploadInput2.files[0]);
        data.append('titre', this.state.titre);
        data.append('description', this.state.description);
        data.append('categorie', this.state.categorie);
        data.append('utilisateur', localStorage.getItem('id'))
        data.append('active', this.state.active)

        // fetch('https://tsiorytahback.herokuapp.com/profil/' + localStorage.getItem('atelier'), {
        fetch('https://perfect-back.herokuapp.com/service/' + localStorage.getItem('serviceUpdate'), {
            method: 'PUT',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                this.setState({
                    image: `https://perfect-back.herokuapp.com/service/${body.image}`+ localStorage.getItem('serviceUpdate') + '.jpg',
                    image1: `https://perfect-back.herokuapp.com/service/${body.image1}`+ localStorage.getItem('serviceUpdate') + '.jpg',
                    image2: `https://perfect-back.herokuapp.com/service/${body.image2}`+ localStorage.getItem('serviceUpdate') + '.jpg',
                    // image: `https://tsiorytahback.herokuapp.com/profil/${body.titre}` + localStorage.getItem('atelier') + '.jpg',
                });
            });
        });
    }

    toggle = () => {
        this.handleUploadImage()
        this.componentDidMount()
        this.setState({
            modal: !this.state.modal,
        });
    }

    componentDidMount() {
        var tab = []
        console.log('props: ', this.props)
        axios.get("https://perfect-back.herokuapp.com/service").then(res => {
            console.log('res comment: ', res.data)
            for (let i = 0; i < res.data.length; i++) {
                if (localStorage.getItem('id') == res.data[i].utilisateur) {
                    tab.push(res.data[i])
                }
            }
            this.setState({ comment: tab })
            console.log('comment: ', this.state.comment)
        })
    }

    render() {
        return (
            // // AJOUT
            <div className='container-fluid'>
                {/* <center onSubmit={event => {
                    event.preventDefault()
                }}> */}
                <table className="table container-fluid" style={{ marginLeft: '10%' }}>
                    <tbody>
                        {(this.state.comment.length > 0) ? (
                            this.state.comment.sort((a, b) => { return b._id - a._id }).map((user, _id) => (
                                <tr key={_id}>
                                    <td>
                                        <img class="card-img-top img-thumbnail image" src={"https://perfect-back.herokuapp.com/service/" + user.image} alt={user.titre} />
                                        <td>
                                            <img class="card-img-top img-thumbnail image1" src={"https://perfect-back.herokuapp.com/service/" + user.image1} alt={user.titre} />
                                        </td>
                                        <td>
                                            <img class="card-img-top img-thumbnail image1" src={"https://perfect-back.herokuapp.com/service/" + user.image2} alt={user.titre} />
                                        </td>
                                    </td>
                                    <td>
                                        <strong>{user.titre}</strong>
                                        <p id="description" onChange={this.handleChange}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos rerum itaque numquam, porro autem at maxime? Nemo porro ipsa tempore voluptas ullam, nam itaque doloremque, distinctio obcaecati eaque cumque quo.</p>
                                    </td>
                                    <td>
                                        {/* (DES)ACTIVATION */}
                                        {(user.active == true) ?
                                            (<MDBBtn onClick={(e) => {
                                                // e.preventDefault()
                                                console.log('active: ', user.active);

                                                // axios.get('https://tsiorytahback.herokuapp.com/desactivation/' + user._id)
                                                axios.get('https://perfect-back.herokuapp.com/desactivation/' + user._id)
                                                    .then(res => {
                                                        console.log('desactivation ok', res);
                                                        console.log('active: ', user.active);
                                                        { this.componentDidMount() }
                                                    })
                                                    .catch(res => {
                                                        console.log('erreur desactivation: ', res);

                                                    })
                                            }}>Desactiver</MDBBtn>) : (<MDBBtn onClick={(e) => {
                                                // e.preventDefault()
                                                // axios.get('https://tsiorytahback.herokuapp.com/desactivation/' + user._id)
                                                axios.get('https://perfect-back.herokuapp.com/activation/' + user._id)
                                                    .then(res => {
                                                        console.log('activation ok', res);
                                                        console.log('active: ', user.active);
                                                        { this.componentDidMount() }
                                                    })
                                            }}>Activer</MDBBtn>)
                                        }
                                    </td>

                                    <td>
                                        {/* SUPPRESSION */}
                                        {/* <button className="btn btn-danger"
                                            onClick={() => {
                                                confirmAlert({
                                                    customUI: ({ onClose }) => {
                                                        return (
                                                            <center>
                                                                <div className="custom-ui" id="popup">
                                                                    <table>
                                                                        <td>
                                                                            <img class="card-img-top img-thumbnail sary" src={"https://perfect-back.herokuapp.com/service/" + user.image} alt={user.titre} /><br />
                                                                        </td>
                                                                        <td>
                                                                            <h6 className="text-pop">Suppression du Produit: </h6><br />
                                                                            <h6 className="text-pop">{user.titre}</h6><br />
                                                                        </td>
                                                                    </table>
                                                                    <button className="btn btn-dark"
                                                                        onClick={() => {
                                                                            // props.deleteUser(user.id); //Appel de la fonction deleteUser App.js
                                                                            onClose();
                                                                        }}
                                                                    >
                                                                        OUI
                                                            </button><a>&nbsp;&nbsp;</a>
                                                                    <button className="btn btn-dark" onClick={onClose}>NON</button>
                                                                </div>
                                                            </center>
                                                        );
                                                    }
                                                })
                                            }
                                            }
                                        >DELETE</button>
                                        <a>&nbsp;</a> */}
                                        {/* MODIFICATION */}
                                        <button className="btn btn-success"
                                            onClick={() => {
                                                localStorage.setItem('atelier', user._id)
                                                confirmAlert({
                                                    customUI: ({ onClose }) => {
                                                        return (
                                                            <form id='ID_FORMULAIRE' key={_id}>
                                                                {localStorage.setItem('serviceUpdate', user._id)}
                                                                <div className="custom-ui" id="popup">
                                                                    <div className="form-group">
                                                                        <div className='container'>
                                                                            <div className='row'>
                                                                                <div className='col-md-9'></div>
                                                                                <div className='col-md-3 custom-control custom-switch'>
                                                                                    <input ref="box1" name="active" type="checkbox" class="custom-control-input" id="customSwitches1" onClick={() => {
                                                                                        this.setState({ active: true })
                                                                                    }} />
                                                                                    <label class="custom-control-label" for="customSwitches1">Publier</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='container'>
                                                                            <MDBContainer isOpen={this.state.modal}>
                                                                                <div className='row'>
                                                                                    <div className='col-md-6'>
                                                                                        <select class="form-control form-control-lg" id='type' name="categorie" value={this.state.value} onChange={this.handleChange}>
                                                                                            <label for='type'>Catégorie</label>
                                                                                            <option value=''>Choisir le Type de service (Obligatoire)</option>
                                                                                            <option value='Tete'>Tête de cortège</option>
                                                                                            <option value='Salle'>Salle de réception</option>
                                                                                            <option value='Deco'>Décorations</option>
                                                                                            <option value='Trait'>Service traiteur</option>
                                                                                            <option value='Photo'>Photographe/Vidéaste</option>
                                                                                        </select>                                                                                                <MDBInput label={user.titre} id="un" type="text" className="input black-textform-control" id="inputGroup-sizing-default" name="titre" value={this.state.value} onChange={this.handleChange} />
                                                                                        <MDBInput label={user.description} id="ml" type="textarea" rows="2" className="input black-text" name="description" value={this.state.value} onChange={this.handleChange} />
                                                                                    </div>
                                                                                    <div className='col-md-6'>
                                                                                        <center>
                                                                                            <input className='btn btn-dark' ref={(ref) => { this.uploadInput = ref; }} type="file" name="image" /><br />
                                                                                            <input className='btn btn-dark' ref={(ref1) => { this.uploadInput1 = ref1; }} type="file" name="image1" /><br />
                                                                                            <input className='btn btn-dark' ref={(ref2) => { this.uploadInput2 = ref2; }} type="file" name="image2" /><br />
                                                                                            <MDBBtn className="button" id="boutton" onClick={() => {
                                                                                                this.toggle()
                                                                                                onClose()
                                                                                            }}>Confirmer</MDBBtn>
                                                                                            <button className="btn btn-dark" onClick={onClose}>Annuler</button>
                                                                                        </center>
                                                                                    </div>
                                                                                </div>
                                                                            </MDBContainer>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        );
                                                    }
                                                })
                                            }
                                            }
                                        >Edit</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                                <tr>
                                    <td colSpan={4}></td>
                                </tr>
                            )}
                    </tbody>
                </table>
                {/* </center> */}



                {/* 

             <div className='container'>
              <div className='row'>
                     {this.state.comment.length > 0 ? (this.state.comment.sort((a, b) => { return b._id - a._id }).map((article, _id) => (
                            <div className='col-md-5 carte' key={_id}>
                                <div className="card">
                                    <button onClick={this.toggle}><img class="card-img-top img-thumbnail" src={"https://perfect-back.herokuapp.com/service/" + article.image} alt={article.titre} /></button>
                                    <div class="card-body">
                                        <center>
                                            <h5 class="card-title">{article.titre}</h5>
                                            <p class="test">{article.prix}</p>
                                        </center>
                                    </div>
                                    <MDBContainer  key={_id}>
                                        <MDBModal isOpen={this.state.modal}>
                                            <MDBModalHeader>{this.props.titre}</MDBModalHeader>
                                            <MDBModalBody>
                                                <center>
                                                    <img class="card-img-top img-thumbnail" src={"https://perfect-back.herokuapp.com/service/" + article.image} alt={article.titre} />
                                                    <p>{article.description}</p>
                                                    <p>{article.prix}</p>
                                                </center>
                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                <MDBBtn color="secondary" onClick={() => { this.toggle() }}>Close</MDBBtn>
                                            </MDBModalFooter>
                                        </MDBModal>
                                    </MDBContainer>
                                </div>
                                <br />
                            </div>
                    )
                    )) : ''}
                </div>
            </div> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listeArticle: state
    }
}

export default connect(mapStateToProps)(Article)
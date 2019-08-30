
import React, { Component } from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Redirect } from 'react-router-dom'

class PostFrontToBack extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            titre: '',
            description: '',
            utilisateur: '',
            prix: '',
            image: '',
            image1: '',
            image2: '',
            date: '',
            active: true,
            modal: false
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this)
    }

    renderRedirect = () => {
        this.setState({
            modal: !this.state.modal,
        })
        return <Redirect to='/admin/article' />
    }

    toggle = () => {
        this.handleUploadImage()
        this.setState({
            modal: !this.state.modal,
            titre: '',
            description: '',
            prix: '',
            utilisateur: '',
            image: '',
            image1: '',
            image2: '',
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUploadImage(ev) {
        const data = new FormData();
        data.append('image', this.uploadInput.files[0]);
        data.append('image1', this.uploadInput1.files[0]);
        data.append('image2', this.uploadInput2.files[0]);
        data.append('titre', this.state.titre);
        data.append('description', this.state.description);
        data.append('prix', this.state.prix);
        data.append('categorie', this.state.categorie);
        data.append('active', true);
        data.append('utilisateur', localStorage.getItem('id'))

        fetch('http://localhost:8080/service', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                this.setState({
                    image: `http://localhost:8080/service/${body.image}`,
                    image1: `http://localhost:8080/service/${body.image1}`,
                    image2: `http://localhost:8080/service/${body.image2}`
                });
                console.log('ity ilay body.fil', body.image);
            });
        });
    }

    render() {
        return (

            <div className='container w-100 contenuDash'> {/* //DEBUT */}
                <center>
                    <div class="card" style={{ width: "500px", marginLeft: "10%", marginBottom: '1%' }}>

                        <h5 class="card-header info-color white-text text-center">
                            <strong>NOUVEAU PRODUIT</strong>
                        </h5>

                        <div class="card-body">

                            <form class="text">
                                <select class="form-control form-control-lg" id='type' name="categorie" value={this.state.value} onChange={this.handleChange}>
                                    <option value=''>Choisir le Type de service (Obligatoire)</option>
                                    <option value='Tete'>Tête de cortège</option>
                                    <option value='Salle'>Salle de réception</option>
                                    <option value='Deco'>Décorations</option>
                                    <option value='Trait'>Service traiteur</option>
                                    <option value='Photo'>Photographe/Vidéaste</option>
                                </select>
                                <MDBInput label="Titre du Service" icon="hands-helping" id="un" type="text" className="input black-text" name="titre" value={this.state.value} onChange={this.handleChange} />
                                <MDBInput label="Descriptions" size="lg" icon="pencil-alt" id="ml" type="textarea" rows="3" className="input black-text" name="description" value={this.state.value} onChange={this.handleChange} />
                                <MDBInput label="Prix (facultatif)" size="lg" icon="money-bill-wave" id="pw" type="number" className="input black-text" name="prix" value={this.state.value} onChange={this.handleChange} />
                                {/* <MDBInput label="Utilisateur" size="lg" icon="at" id="pw" type="text" className="input black-text" name="utilisateur" value={this.state.value} onChange={this.handleChange} /> */}
                                <input class='btn btn-brown' ref={(ref) => { this.uploadInput = ref; }} type="file" name="image" />
                                <input class='btn btn-brown' ref={(ref1) => { this.uploadInput1 = ref1; }} type="file" name="image1" />
                                <input class='btn btn-brown' ref={(ref2) => { this.uploadInput2 = ref2; }} type="file" name="image2" />
                            </form>
                        </div>
                        <MDBContainer>
                            <MDBBtn onClick={this.toggle}>Ajouter</MDBBtn>
                            <MDBModal isOpen={this.state.modal}>
                                <MDBModalHeader>Enregistrement...</MDBModalHeader>
                                <MDBModalBody><center>Ajout du Produit avec succés</center></MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="secondary" onClick={() => { this.renderRedirect() }}>Close</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                        </MDBContainer>
                    </div>
                </center>
            </div>
        );
    }
}

export default PostFrontToBack;

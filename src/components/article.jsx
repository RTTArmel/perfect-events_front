import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
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
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    componentDidMount() {
        var tab = []
        console.log('props: ', this.props)
        axios.get("http://localhost:8080/profil").then(res => {
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
            <center onSubmit={event => {
                event.preventDefault()
            }}>
                <table className="table table-bordered">
                    <tbody>
                        {(this.state.comment.length > 0) ? (
                            this.state.comment.sort((a, b) => { return b._id - a._id }).map((user, _id) => (
                                <tr key={_id}>
                                    <td>
                                        <p id="titre" onChange={this.handleChange}><img class="card-img-top img-thumbnail image" src={"http://localhost:8080/profil/" + user.image} alt={user.titre} /></p>
                                        <p id="prix" style={{textAlign: "right"}} onChange={this.handleChange}>Prix: {user.prix}</p>
                                    </td>
                                    <td>
                                    <strong>{user.titre}</strong>
                                        <p id="description" onChange={this.handleChange}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos rerum itaque numquam, porro autem at maxime? Nemo porro ipsa tempore voluptas ullam, nam itaque doloremque, distinctio obcaecati eaque cumque quo.</p>
                                        <p>
                                            {/* SUPPRESSION */}
                                            <button className="btn btn-danger"
                                                onClick={() => {
                                                    confirmAlert({
                                                        customUI: ({ onClose }) => {
                                                            return (
                                                                <center>
                                                                    <div className="custom-ui" id="popup">
                                                                        <table>
                                                                            <td>
                                                                                <img class="card-img-top img-thumbnail sary" src={"http://localhost:8080/profil/" + user.image} alt={user.titre} /><br />
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
                                            >X</button>
                                            <a>&nbsp;</a>
                                            {/* MODIFICATION */}
                                            <button className="btn btn-success"
                                                onClick={() => {
                                                    confirmAlert({
                                                        customUI: ({ onClose }) => {
                                                            return (
                                                                <form id='ID_FORMULAIRE'>
                                                                    <center>
                                                                        <div className="custom-ui" id="popup">
                                                                            <input name='inputStoreID' placeholder={user.prix} id="entree" className="modif"></input><br />
                                                                            <p id="e"></p><br />

                                                                            <button className="btn btn-dark"
                                                                                onClick={(e) => {
                                                                                    user.prix = document.forms['ID_FORMULAIRE'].elements['inputStoreID'].value //Affectation du contenu de l'input dans user.prix 
                                                                                    if (isNaN(user.prix) || user.prix == "") {
                                                                                        var valid = "Entrer un Nombre"
                                                                                        e.preventDefault()
                                                                                        document.getElementById('e').innerHTML = valid; //Affichage de la variable valid dans le paragraphe e
                                                                                    } else {
                                                                                        valid = "";
                                                                                        document.getElementById('e').innerHTML = valid;
                                                                                        // props.updateUser(user.prix, user) //Appel de la fonction updateUser App.js
                                                                                        // props.editRow(user.id); //Appel de la fonction editRow App.js
                                                                                        onClose();
                                                                                    }
                                                                                }
                                                                                }
                                                                            >OK</button><a>&nbsp;&nbsp;</a>

                                                                            <button className="btn btn-dark" onClick={onClose}>Annuler</button>
                                                                        </div>
                                                                    </center>
                                                                </form>
                                                            );
                                                        }
                                                    })
                                                }
                                                }
                                            >Edit</button>
                                        </p>
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
            </center>





            // <div className='container'>
            //     <div className='row'>
            //         {this.state.comment.length > 0 ? (this.state.comment.sort((a, b) => { return b._id - a._id }).map((article, _id) => (
            //                 <div className='col-md-5 carte' key={_id}>
            //                     <div className="card">
            //                         <button onClick={this.toggle}><img class="card-img-top img-thumbnail" src={"http://localhost:8080/profil/" + article.image} alt={article.titre} /></button>
            //                         <div class="card-body">
            //                             <center>
            //                                 <h5 class="card-title">{article.titre}</h5>
            //                                 <p class="test">{article.prix}</p>
            //                             </center>
            //                         </div>
            //                         <MDBContainer  key={_id}>
            //                             <MDBModal isOpen={this.state.modal}>
            //                                 <MDBModalHeader>{this.props.titre}</MDBModalHeader>
            //                                 <MDBModalBody>
            //                                     <center>
            //                                         <img class="card-img-top img-thumbnail" src={"http://localhost:8080/profil/" + article.image} alt={article.titre} />
            //                                         <p>{article.description}</p>
            //                                         <p>{article.prix}</p>
            //                                     </center>
            //                                 </MDBModalBody>
            //                                 <MDBModalFooter>
            //                                     <MDBBtn color="secondary" onClick={() => { this.toggle() }}>Close</MDBBtn>
            //                                 </MDBModalFooter>
            //                             </MDBModal>
            //                         </MDBContainer>
            //                     </div>
            //                     <br />
            //                 </div>
            //         )
            //         )) : ''}
            //     </div>
            // </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listeArticle: state
    }
}

export default connect(mapStateToProps)(Article)
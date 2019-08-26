import React from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux'
import './editProfil.css'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class EditProfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nom: '', email: '', password: '', pwd: '', modal: false }
        this.handleChange = this.handleChange.bind(this)
        this.enregistrement = this.enregistrement.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
    }

    renderRedirect = () => {
        if(localStorage.getItem('login')=='true'){
            return <Redirect to='/admin' />
        } else {
            console.log('test');
        }
        
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    enregistrement(e) {
        const action = { type: "EDIT_PROFIL", value: e }
        this.props.dispatch(action) 
        this.renderRedirect()  
    }

    toggle = () => {
        this.enregistrement()
        this.setState({
            modal: !this.state.modal,
            });
    }

    render() {
        return (
            <div id="totaledit">
                {/* formulaire inscription  */}
                <form>
                    <div className="form-group">                                                        
                        <MDBInput label="Nom" black-text size="lg" icon="user" id="un" type="text" className="input" name="nom" value={this.state.value} placeholder={this.state.nom} onChange={this.handleChange} />
                        <MDBInput label="Adresse e-mail" size="lg" icon="at" id="ml" type="email" className="input" name="email" value={this.state.value} placeholder={this.state.email} onChange={this.handleChange} />
                        <MDBInput label="Mots de passe" size="lg" icon="lock" id="pw" type="passWord" className="input" name="password" value={this.state.value} placeholder={this.state.password} onChange={this.handleChange} />
                        <MDBInput label="Confirmer Mots de passe" size="lg" icon="unlock"  id="" type="passWord" className="input" data-type="passWord" name="pwd" value={this.state.value} placeholder={this.state.pwd} onChange={this.handleChange} />
                    <p id='pass'></p>
                        <MDBBtn gradient="purple" className="button" id="boutton"  onClick={e => {
                    e.preventDefault()
                    this.toggle()
                    console.log('local enregistrement: ', localStorage.getItem('login'));
                    this.enregistrement({
                        nom: this.state.nom,
                        email: this.state.email,
                        password: this.state.password,
                        pwd: this.state.pwd
                    })
                }}>Confirmer</MDBBtn>
                    </div>
                </form>
                <MDBContainer>
                        <MDBModal isOpen={this.state.modal}>
                            <MDBModalHeader>Enregistrement...</MDBModalHeader>
                            <MDBModalBody><center>Modificatin terminée avec succés</center></MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={()=>{this.toggle()}}>Close</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </MDBContainer>
            </div>

                                        
        )
    }
}
const mapStateToProps = (state) => {
    return {
        client: state
    }
}
export default connect(mapStateToProps)(EditProfil)



    /*     enregistrement = () => {
            this.setState({connecte: true})
            axios.post("http://localhost:8080/register", {
                nom: this.state.nom,
                email: this.state.email,
                password: this.state.password,
                pwd: this.state.pwd
            })
                .then(res => {
                    console.log("post ok: res.data ", res.data);
                })
                .catch(errr => {
                    console.log("connect: ", this.state.connecte);
                    console.log("state: ", this.state);
                    console.log("erreur post: ", errr);
    
                })
        } */
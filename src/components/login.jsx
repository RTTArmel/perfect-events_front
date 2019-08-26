import React, {Fragment} from 'react';
import { MDBInput, MDBBtn } from "mdbreact";
import './register.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Link } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nom: '', password: '' }
        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
    }

    renderRedirect = () => {
        if (localStorage.getItem('login') == 'true') {
            return <Redirect to='/admin' />
        } else {
            console.log('test');
        }

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    login(e) {
        console.log('local login: ', localStorage.getItem('login'));
        const action = { type: "LOGIN", value: e }
        this.props.dispatch(action)
    }


    render() {
        return (
            <div id="totalregister">
                {this.renderRedirect()}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7 logo"></div>
                        <div className="col-md-5">
                            <div className="login-wrap">
                                <div className="login-html">
                                    <div className="login-form">
                                        <div className="form-group">
                                            <center>
                                                <img id="image-login" src="../images/logoPM.png" alt="logoimage" />
                                            </center><br />
                                            <form>
                                                <div className="form-group">
                                                    <MDBInput label="Nom" size="lg" icon="user" id="user" type="text" className="input" name="nom" onChange={this.handleChange} value={this.state.value} />
                                                    <MDBInput label="Password" size="lg" icon="lock" id="pass" type="passWord" className="input" name="password" onChange={this.handleChange} value={this.state.value} />
                                                    <Fragment>
                                                        <MDBBtn gradient="purple" className="button" id="boutton"  onClick={e => {
                                                this.login({
                                                    nom: this.state.nom,
                                                    password: this.state.password,
                                                })
                                                this.setState({ nom: '', password: '' })
                                            }}>Se connecter</MDBBtn>
                                                    </Fragment>
                                                </div>
                                            </form>
                                            <center><a href="/register">S'inscrire</a></center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        client: state
    }
}
export default connect(mapStateToProps)(Login)
import axios from 'axios'

const initialState = {
  client: [{
    nom: '',
    email: '',
    password: '',
    pwd: ''
  }]
}

function connexion(state = initialState, action) {
  let nextState = [0]
  switch (action.type) {

    //postAdmin 8080
    case 'REGISTER':
      console.log("action: ", action.value);
      //axios.post('https://shrouded-shore-94366.herokuapp.com/', action.value)
      axios.post('http://localhost:8080/register/', action.value)
        .then((response) => {
          console.log("post ok: res.data ", response.data);
          localStorage.setItem('id', parseInt(response.data._id))
          localStorage.setItem('user', response.data.nom)
          localStorage.setItem('login', 'true')
          console.log('reducer REGISTER: ', localStorage.getItem('login'));
        })
        .catch((error) => {
          console.log("erreur be: ", error);
        });
      break;

      case 'EDIT_PROFIL':
      console.log("action: ", action.value);
      //axios.post('https://shrouded-shore-94366.herokuapp.com/', action.value)
      axios.put("http://localhost:8080/register/"+localStorage.getItem('id'), action.value)
        .then((response) => {
          console.log("put ok: res.data ", response.data);
          localStorage.setItem('user', response.data[localStorage.getItem('id')].nom)
          console.log('reducer EDIT: ', localStorage.getItem('login'));
        })
        .catch((error) => {
          console.log("erreur be: ", error);
        });
      break;

    //postLogin 8080
    case 'LOGIN':
      console.log("action: ", action.value);
      //axios.post('https://shrouded-shore-94366.herokuapp.com/', action.value)
      axios.post('http://localhost:8080/login', action.value)      
        .then((response) => {
          if (response.data.nom == action.value.nom) {
            localStorage.setItem('id', response.data._id)
            localStorage.setItem('user', response.data.nom)
            localStorage.setItem('login', 'true')
            console.log('TSIORY response: ', response.data);
          }
          console.log("post ok: res.data ", response);
        })
        .catch((error) => {
          console.log("erreur be: ", error);
        });
      break;

    case 'DECONNECT':
      localStorage.setItem('login', 'false');
      break;

      

    case 'GETARTICLE':
      //axios.get('https://shrouded-shore-94366.herokuapp.com/')
      axios.get('http://localhost:8080/')
        .then(function (response) {
          nextState = response.data
          console.log("ttt", nextState);
          return nextState
        })
        .catch(function (error) {

          console.log(error);
        })
      break;

    default:
      return state
  }
}

export default connexion
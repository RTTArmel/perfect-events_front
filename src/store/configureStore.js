import { createStore } from 'redux';
import connexion from './reducer/reducer_admin'

export default createStore(connexion)
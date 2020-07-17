/**
 * @file Defining remote for authentication
 * @author Michel Charles <mcharl05@nyit.edu>
 */

import { internalAxios } from './internal.axios';
import { Login } from '../models/login';


export const checkLoginCredentials = async (login: Login) => {
    const response = await internalAxios.post('/login', login)
    return response;
}


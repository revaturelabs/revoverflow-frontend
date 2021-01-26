/**
 * @file Defining remote for authentication
 * @author Michel Charles <mcharl05@nyit.edu>
 */

import { authAxios, internalAxios } from './internal.axios';
import { user } from '../models/user';


export const checkLoginCredentials = async (token: string | undefined) => {
    const response = await internalAxios.post(`/login/${token}`)
    return response;
}

export const getUserById = async (id: number) => {
    const response = await authAxios.get<user>(`/user/${id}`);
    return response;
}
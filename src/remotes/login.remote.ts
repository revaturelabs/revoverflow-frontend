/**
 * @file Defining remote for authentication
 * @author Michel Charles <mcharl05@nyit.edu>
 */

import { authAxios, internalAxios } from './internal.axios';
import { user } from '../models/user';

export const getUserById = async (id: number) => {
    const response = await authAxios.get<user>(`/user/${id}`);
    console.log("login Remote")
    return response;
}
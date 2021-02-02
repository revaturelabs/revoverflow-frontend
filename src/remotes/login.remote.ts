/**
 * @file Defining remote for authentication
 * @author Michel Charles <mcharl05@nyit.edu>
 */

import { authAxios, internalAxios } from './internal.axios';

export const getUserById = async (email: string | null) => {
    const response = await authAxios.get(`/user/${email}/points`);
    console.log("login Remote")
    return response;
}
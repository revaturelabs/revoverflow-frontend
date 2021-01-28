/**
 * @file Defining remote for authentication
 * @author Michel Charles <mcharl05@nyit.edu>
 */

import { authAxios, internalAxios } from './internal.axios';
import { user } from '../models/user';


export const checkLoginCredentials = async (token: string | undefined) => {
  const response = await internalAxios.post(`/user/login`, {


    headers: {

      Authorization: `Bearer ${token}`,
      'Access-Conotrol-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Expose-Headers': '*'

    }
  })

  return response;
}

export const getUserById = async (id: number) => {
  const response = await authAxios.get<user>(`/user/${id}`);
  return response;
}
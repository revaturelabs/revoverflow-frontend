/**
 * @author Stephen Wong
 */

import { authAxios } from './internal.axios'

export const getLocations = async () => {
    const response = await authAxios.get<Location[]>(`/locations`);
    return response.data;
}
/**
 * @file Setting up connection configs to server-side
 * @author Michel Charles <mcharl05@nyit.edu>
 */

import Axios from "axios";

const server = "http://localhost:8080";

export const internalAxios = Axios.create({
    baseURL: server,
});

export const authAxios = Axios.create({
    baseURL: server,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
});
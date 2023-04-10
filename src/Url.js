import axios from 'axios'

const BASEURl = "https://tired-crow-leather-jacket.cyclic.app/api"

export const Req = axios.create({
    baseURL:BASEURl
})
import  {css} from 'styled-components'
export const mobile = (prop) =>{
    return css`
    @media only screen and (max-width: 480px) and (min-width: 320px) {
        ${prop}
    }
    `
}
export const tablet =(prop) =>{
    return css`
    @media only screen and (max-width: 768px) and (min-width: 481px) {
        ${prop}
    }
    `
}
export const monitor =(prop) =>{
    return css`
    @media only screen and (max-width: 1060px) and (min-width: 768px) {
        ${prop}
    }
    `
}
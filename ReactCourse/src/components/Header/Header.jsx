//import {useState } from 'react';
import SelectUser from '../SelectUser/SelectUser';
//import Button from '../Button/Button';
import Logo from '../logo/logo';


const logos = ['/logo.svg', '/vite.svg']
function Header() {
    return ( 
        <>
        <Logo image={logos[0]}/>
        <SelectUser /> 
        </>                
    );
}

export default Header
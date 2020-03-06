import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import logo from '../../assets/apoio.png'
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { signUpRequest } from '../../store/modules/auth/actions';


const schema = Yup.object().shape({
    email: Yup.string().email('Insert a valid e-mail.').required('E-mail is required'),
    password: Yup.string().required('Password is required.').min(6, 'Password must have at least 6 characters'),
    username: Yup.string().required('Username is required.') 
})

export default function SignUp() {
    const dispatch = useDispatch();

    function handleSubmit({username,email,password}){
        dispatch(signUpRequest(username,email,password));
    }
    return (
        <>
            <img src={logo} height={128} width={128} alt="GoServices" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <Input type="text" name="username" placeholder="Username" id=""/>    
                <Input type="email" name="email" placeholder="E-mail" id=""/>
                <Input type="password" name="password" placeholder="Your password" id=""/>

                <button type="submit">Create Account</button>
                <Link to="/">Already registered?</Link>
            </Form>
        </>
    )
}

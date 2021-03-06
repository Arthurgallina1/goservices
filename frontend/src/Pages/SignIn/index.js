import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import logo from '../../assets/apoio.png'
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { signInRequest } from '../../store/modules/auth/actions'

const schema = Yup.object().shape({
    email: Yup.string().email('Insert a valid e-mail.').required('E-mail is required'),
    password: Yup.string().required('Password is required.')
})

export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading )

    function handleSubmit({email, password}){
        
        dispatch(signInRequest(email, password));
    }

    return (
        <>
            <img src={logo} height={128} width={128} alt="GoServices" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="email" type="email" placeholder="E-mail" id=""/>
                <Input name="password" type="password" placeholder="Your password" id=""/>

    <button type="submit">{ loading ? 'Loading...' : 'Login' }</button>
                <Link to="/register">Create free account.</Link>
            </Form>
        </>
    )
}

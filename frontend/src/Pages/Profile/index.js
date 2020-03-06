import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from './styles';
import { Form, Input } from '@rocketseat/unform'; 

export default function Profile() {

    const profile = useSelector(state => state.user.profile)

    function handleSubmit(data) {

    }
    return (
        <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
                <Input name="name" placeholder="Full name" />
                <Input name="email" placeholder="Your e-mail" />

                <hr />
                <Input type="password" name="password" placeholder="Your current password" />
                <Input type="password" name="newPasswor" placeholder="New password" />
                <Input type="password" name="confirmPassword" placeholder="Confirm new password" />   

                <button type="submit">Update profile</button>
            </Form>
            <button type="button">Logout</button>
            
        </Container>
    )
}

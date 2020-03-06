import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from './styles';
import { Form, Input } from '@rocketseat/unform'; 
import { updateProfileRequest } from '../../store/modules/user/actions';
import AvatarInput from './AvatarInput'

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile)

    function handleSubmit(data) {
        dispatch(updateProfileRequest(data));
    }
    

    return (
        <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
                <AvatarInput name="avatar_id" />
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

import React from 'react'
import { useSelector } from 'react-redux';
import { Container, Profile, Content } from './styles';
import logo from '../../assets/apoio.png'
import { Link } from 'react-router-dom'
import Notifications from '../Notifications'


export default function Header() {
    const profile = useSelector(state => state.user.profile);
    return (
        <Container>
            <Content>
                <nav>
                    <img src={logo} height={42} widht={42} alt="GoServices" />
                    <Link to="/dashboard">Dashboard</Link>
                </nav>

                <aside>
                    <Notifications />
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                            <Link to="/profile">My Profile</Link>
                        </div>
                        <img src={profile.avatar.url || 'https://api.adorable.io/avatars/50/abott@adorable.png'} alt="" />
                    </Profile>
                </aside>
            </Content>
        </Container>
    )
}

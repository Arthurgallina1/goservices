import React, { useState, useEffect, useMemo } from 'react';
import { Container, Badge, Scroll, NotificationList, Notification } from './styles';
import { MdNotifications } from 'react-icons/md'

import { parseISO, formatDistance } from 'date-fns';
// import en from 'data-fns/locale/p
import api from '../../services/api'


export default function Notifications() {

    const [visible, setVisible ] = useState(false);
    const [notifications, setNotifications ] = useState([]);

    const hasUnread = useMemo(
        () => Boolean(notifications.find(notification => notification.read === false)), 
        [notifications]
    );

    useEffect( () => {
        async function loadNotifications() {
            const response = await api.get('/notifications');
            //pega obj inteiro e adiciona o horário formatado (eg: 3 days ago)
            const data = response.data.map(notification => ({
                ...notification,
                timeDistance: formatDistance(
                    parseISO(notification.createdAt), new Date(),{ addSufix: true})})
            )
            setNotifications(data);
        }
        loadNotifications();
    }, [])

    async function handleMarkAsRead(id) {
        await api.put(`/notifications/${id}`);

        setNotifications(
            notifications.map(notification =>
                notification._id === id ? { ...notification, read: true } : notification
                )
        )
    }

    function handleToggleVisible(){
        setVisible(!visible);
    }

    return (
        <Container>
            <Badge hasUnread={hasUnread} onClick={handleToggleVisible}>
                <MdNotifications color="#7159c1" size={20}/>
            </Badge>

            <NotificationList visible={visible}>
              <Scroll>
                  {
                      notifications.map(notification => (
                        <Notification key={notification._id} unread={!notification.read}>
                            <p>{notification.content}</p>
                            <time>{notification.timeDistance} ago.</time>
                            {
                                !notification.read && (
                                    <button 
                                        type="button" 
                                        onClick={() => handleMarkAsRead(notification._id)}>
                                            Mark as read.
                                        </button>
                                )
                            }
                        </Notification>
                      ))
                  }
                
            
              </Scroll>
            </NotificationList>
        </Container>
    )
}

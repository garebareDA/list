import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Chat from '../components/Chat';

function Group() {
    const [room, setRoom] = useState("");
    const {groupID} = useParams<{groupID: string}>();
    fetch('/api/group/' + groupID, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }).then((res) => {
        res.json().then((json) => {
            setRoom(json.name);
        });
    });

    return (
        <div>
            <div>{room}</div>
        </div>
    )
}

export default Group;

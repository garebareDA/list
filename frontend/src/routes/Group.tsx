import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import * as clipboard from "clipboard-polyfill/text";

import Chat from '../components/Chat';

function Group() {
    const [room, setRoom] = useState("example");
    const [copy, setCopy] = useState("リンクをコピー");
    const { groupID } = useParams<{ groupID: string }>();
    const copyOnlick = () => {
        clipboard.writeText(location.href).then(
            () => {
                setTimeout(() => { setCopy("リンクをコピー!") }, 5000);
                setCopy("コピーした！");
            },
            () => { setCopy("コピーエラー！") }
        );
    }

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
            
            <FrexContainer>
                <RoomName>{room}</RoomName>
                <CopyButton onClick={copyOnlick}>{copy}</CopyButton>
            </FrexContainer>
            <FlextContainerChat>
                
            </FlextContainerChat>
        </div>
    )
}

export default Group;

const RoomName = styled.div`
    color:white;
    font-size: 32px;
    color: white;
    padding-right: 16px;
`
const CopyButton = styled.button`
    box-shadow: 0 1px 25px 0 rgba(0, 0, 0, .5);
    outline: none;
    border: none;
    border-radius: 1em;
    width:128px;
    height:32px;
    color:white;
    background-color: #005eff;

    :hover {
        background-color: #054ecb;
    };

    :active {
        background-color: #005eff;
    };
`

const FrexContainer = styled.div`
    display:flex;
    justify-content: center;
    padding:24px;
`

const FlextContainerChat = styled.div`
    display:flex;
    justify-content: center;
`

import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import * as clipboard from "clipboard-polyfill/text";
import io from "socket.io-client";

import Chat from '../components/Chat';
import ModalInput from '../components/ModalInput';

function Group() {
    const [room, setRoom] = useState("example");
    const [copy, setCopy] = useState("リンクをコピー");
    const [modal, setModal] = useState(true);
    const [socket, setSocket] = useState(io("http://localhost:8000/"));
    const { groupID } = useParams<{ groupID: string }>();

    socket.io.on("error", (error:any) => {
        console.log(error);
    });

    socket.on("connect_error", (err:any) => {
        console.log(`connect_error due to ${err.message}`);
    });

    const copyOnlick = () => {
        clipboard.writeText(location.href).then(
            () => {
                setTimeout(() => { setCopy("リンクをコピー!") }, 5000);
                setCopy("コピーした！");
            },
            () => { setCopy("コピーエラー！") }
        );
    }

    const CloseModal = () => {
        console.log("aaaaa");
        setModal(false);
        socket.connect();
        socket.emit("join", room);
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
            const icon = localStorage.getItem(room + "/icon");
            const name = localStorage.getItem(room + "/name");
            if (icon == null || icon == "" || name == null || name == "") {
                setModal(true);
            } else {
                CloseModal();
            }
        });
    });

    return (
        <div>
            <ModalInput isOpen={modal} roomName={room} Close={CloseModal} />
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

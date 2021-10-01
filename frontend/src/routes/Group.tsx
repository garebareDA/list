import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import * as clipboard from "clipboard-polyfill/text";
import socketio from '../lib/socket';

import Chat from '../components/Chat';
import ModalInput from '../components/ModalInput';

type User = {
    id: string,
    name: string,
    icon: string,
}

function Group() {
    const [room, setRoom] = useState("example");
    const [copy, setCopy] = useState("リンクをコピー");
    const [icon, setIcon] = useState("");
    const [name, setName] = useState("");
    const [id, setID] = useState("");
    const [message, setMessage] = useState("");
    const [modal, setModal] = useState(true);
    const [socket, setSocket] = useState(socketio);
    const { groupID } = useParams<{ groupID: string }>();
    let userList: User[] = [];

    useEffect(() => {
        fetch('/api/group/' + groupID, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }).then((res) => {
            res.json().then((json) => {
                setRoom(json.name);
                SetUser();
            });
        });
    }, []);

    useEffect(() => {
        //Socket.ioのメッセージ送信
        console.log(message);
        socket.emit("message", message);
    }, [message])

    const copyOnlick = () => {
        clipboard.writeText(location.href).then(
            () => {
                setTimeout(() => { setCopy("リンクをコピー!") }, 5000);
                setCopy("コピーした！");
            },
            () => { setCopy("コピーエラー！") }
        );
    }

    const SetUser = () => {
        const icon = localStorage.getItem(groupID + "/icon");
        const name = localStorage.getItem(groupID + "/name");
        const id = localStorage.getItem(groupID + "/id");
        if (icon == null || icon == ""
            || name == null || name == ""
            || id == null || id == "") {
            setModal(true);
            return
        }

        setModal(false);
        setIcon(icon);
        setName(name);
        setID(id);
        setModal(false);
        socket.emit("join", groupID);
    }

    return (
        <div>
            <ModalInput isOpen={modal} roomName={groupID} Close={SetUser} />
            <FrexContainer>
                <RoomName>{room}</RoomName>
                <CopyButton onClick={copyOnlick}>{copy}</CopyButton>
            </FrexContainer>
            <FlextContainerChat>
                {
                    modal
                        ? <div />
                        : <Chat user={{ img: icon, name: name, message: "" }} sendTo={null} send={{ setMessage: setMessage, message: message }} />
                }

                {

                    modal
                        ? <div />
                        : <div />
                }
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

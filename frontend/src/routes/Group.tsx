import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import * as clipboard from "clipboard-polyfill/text";
import socketio from '../lib/socket';

import Chat from '../components/Chat';
import ModalInput from '../components/ModalInput';
import ModalError from '../components/ModalError'

interface User {
    name: string,
    icon: string,
    room: string,
    message: string,
}

function Group() {
    const [room, setRoom] = useState("NotFound");
    const [copy, setCopy] = useState("リンクをコピー");
    const [icon, setIcon] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [modal, setModal] = useState(true);
    const [socket, setSocket] = useState(socketio);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { groupID } = useParams<{ groupID: string }>();
    const [users, setUsers] = useState<{ [key: string]: User }>({});
    const socketRef = useRef(socket);

    useEffect(() => {
        socketRef.current.on("connect", () => {
            console.log("connect");
        });

        socketRef.current.on("error", (err: any) => {
            console.error(err)
            setErrorMessage("接続エラー");
            setError(true);
        })

        socketRef.current.on("disconnect", (msg: any) => {
            console.log(msg)
        })

        fetch('/api/group/' + groupID, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }).then((res) => {
            return res.json();
        }).then((data: User) => {
            setRoom(data.name);
            SetUser();
        }).catch((error) => {
            console.error(error);
            setErrorMessage("このルームは存在していません");
            setError(true);
        });
    }, []);

    useEffect(() => {
        sendMessage();
    }, [message])

    const sendMessage = () => {
        if (message.length > 128) return;
        const user: User = {
            name: name,
            icon: icon,
            room: groupID,
            message: message.slice(0, 128),
        }
        socket.emit("message", JSON.stringify(user));
    }

    const SetUser = () => {
        const icon = localStorage.getItem(groupID + "/icon");
        const name = localStorage.getItem(groupID + "/name");
        if (icon === null || icon === ""
            || name === null || name === "") {
            setModal(true);
            return
        }

        setModal(false);
        setIcon(icon);
        setName(name.slice(0, 28));
        const user: User = {
            name: name.slice(0, 28),
            icon: icon,
            room: groupID,
            message: message,
        }
        socketRef.current.emit("join", JSON.stringify(user));

        socketRef.current.on("quit", (msg: string) => {
            setUsers((users) => {
                delete users[msg]
                return users;
            } );
        });

        socketRef.current.on("message", (msg: string, id:string) => {
            if(id === socketRef.current.id) return;
            if(!id) return;
            const user: User = JSON.parse(msg);

            if(user.name === "" || user.icon == "") return;
            setUsers((users) => {
                return {...users, [id]:user}
            });
        });

        socketRef.current.on("members", (id: string) => {
            if(id === socketRef.current.id) return;
            socket.emit("message", JSON.stringify(user));
        });
    }

    const copyOnlick = () => {
        clipboard.writeText(location.href).then(
            () => {
                setTimeout(() => { setCopy("リンクをコピー!") }, 5000);
                setCopy("コピーした！");
            },
            () => { setCopy("コピーエラー！") }
        );
    }

    return (
        <div>
            <ModalError open={error} message={errorMessage} />
            <ModalInput isOpen={modal && !error} roomName={groupID} Close={SetUser} />
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
                    Object.keys(users).map((key, index) => {
                        const user = users[key];
                        return <Chat user={{ img: user.icon, name: user.name, message: user.message }} sendTo={null} send={null} />
                    })
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
    flex-wrap:wrap;
    justify-content: center;
    align-items: center;
`

import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Chat from '../components/Chat';
import Icon from '../../image/garebaremin-export.png'

function Home() {
    const [room, setRoom] = useState("");
    const history = useHistory();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoom(event.target.value);
    }

    const onClickRoom = () => {
        fetch('/api/group', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                name: room,
            })
        }).then((res) => res.json()
        ).then((json) => {
            history.push("/group/" + json.id);
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <div>
            <AutoCenter>
                <TitleText> ListChat </TitleText>
                <TextArea maxLength={32} placeholder="ルーム名" onChange={handleChange} ></TextArea>
                <RoomCreateButton onClick={onClickRoom} disabled={room == ""}>ルームを作成</RoomCreateButton>
            </AutoCenter>
            <PreviewChat>
                <Chat user={{ img: Icon, name: "ガレバレ", message: "たぶん、リアルタイムなチャットです" }} sendTo={null} send={null} />
                <Chat user={{ img: Icon, name: "ガレバレ", message: "たぶん、一覧で表示されます" }} sendTo={null} send={null} />
                <Chat user={{ img: Icon, name: "ガレバレ", message: "たぶん、みんなで使えます" }} sendTo={null} send={null} />
            </PreviewChat>
        </div>
    );
}

export default Home;

const TitleText = styled.div`
    font-size: 32px;
    color: white;
    padding:32px;
`

const TextArea = styled.input`
    box-shadow: 0 1px 25px 0 rgba(0, 0, 0, .5);
    border-radius: 1em;
    padding: 1em;
    background-color: snow;
    width: 50%;
    max-width: 512px;
    min-width:128px;
    box-sizing: border-box;
    max-height: 32px;
    font-size: 100%;
    line-height: 1.2;
    outline: none;
    resize:none;
    border: none;
`

const RoomCreateButton = styled.button`
    box-shadow: 0 1px 25px 0 rgba(0, 0, 0, .5);
    outline: none;
    border: none;
    border-radius: 1em;
    width:128px;
    height:32px;
    color:white;
    background-color: #005eff;
    margin: 8px;

    :hover {
        background-color: #054ecb;
    };

    :active {
        background-color: #005eff;
    };

    :disabled {
        color: gray;
        background-color: #bababa;
    }
`

const AutoCenter = styled.div`
    text-align:center;
    padding-top:128px;
    padding-bottom: 80px;
`

const PreviewChat = styled.div`
    width:auto;
    height:auto;
    margin: 0 auto;
    display:flex;
    flex-wrap:wrap;
    justify-content: center;
    align-items: center;
`

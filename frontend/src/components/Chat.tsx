import React, { useState } from 'react';
import styled from 'styled-components';

type Porps = {
    user: SendTo,
    sendTo: null | SendTo,
    send: null | Send,
}

type Send = {
    setMessage: Function,
    message: string,
}

type SendTo = {
    img: string,
    name: string,
    message: string
}

const Chat: React.FC<Porps> = ({ user, sendTo, send }) => {
    const [count, setCount] = useState(0);
    const handleCount = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const r = event.target.value.replace(/[\n\r]/g, "")
        send?.setMessage(r);
        setCount(r.length);
    }

    const handlekeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key == 'Enter') {
            send?.setMessage("");
        }
    }

    const handleRemove = () => {
        send?.setMessage("");
    }

    return (
        <BackGround>
            <IconContainer>
                <Icon src={user.img} alt="画像" />
                <Name>{user.name}</Name>
            </IconContainer>
            {send
                ? <div>
                    <TextArea maxLength={128} onChange={handleCount} onKeyPress={handlekeyPress} value={send.message}></TextArea>
                    <TextDitailContainer>
                        <div>128/{count}</div>
                        <RemoveButton onClick={handleRemove}>R</RemoveButton>
                    </TextDitailContainer>
                </div>
                : <Message>{user.message}</Message>
            }

            {sendTo
                ?
                <div>
                    <img src={sendTo.img} alt="画像" />
                    <div>{sendTo.name}</div>
                </div>
                : <div />
            }

        </BackGround>
    )
}

export default Chat;

const BackGround = styled.div`
    background-color:white;
    border-radius: 1em;
    padding:8px;
    margin: 8px;
    width: auto;
    max-width:256px;
    height: auto;
`
const IconContainer = styled.div`
    padding-top: 16px;
    display: flex;
    justify-content:center;
    align-items: center;
`
const Icon = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 4em;
`
const Name = styled.div`
    margin-left: 4px;
    font-size: 16px;
    font-weight:bold;
`
const Message = styled.div`
    margin:8px;
    padding:16px;
    border-style:solid;
    border-width:1px;
    border-radius: 0.3em;
    border-color: #dcdcdc;
    background-color: #ffffff;
    word-wrap: break-word;
`

const TextArea = styled.textarea`
    border: none;
    outline: none;
    resize:none;
    overflow: hidden;
    border-radius: 1em;
    padding:8px;
    height:80px;
    max-height:256px;
    max-width:256px;
    margin:8px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .5);
`

const TextDitailContainer = styled.div`
    display: flex;
    justify-content:space-between;
`

const RemoveButton = styled.button`
    width: 24px;
    height: 24px;
    box-shadow: 0 0px 8px 3px rgba(0, 0, 0, .5);
    outline: none;
    border: none;
    border-radius: 4em;
    color:white;
    background-color: #005eff;

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

import React from 'react';
import styled from 'styled-components';

type Porps = {
    me: SendTo,
    sendTo: null | SendTo
}

type SendTo = {
    img: string,
    name: string,
    message: string
}

const Chat: React.FC<Porps> = ({ me, sendTo }) => {
    return (
        <BackGround>
            <IconContainer>
                <Icon src={me.img} alt="画像" />
                <Name>{me.name}</Name>
            </IconContainer>
            <Message>{me.message}</Message>

            {sendTo
                ? <div>
                    <img src={sendTo.img} alt="画像" />
                    <div>{sendTo.name}</div>
                    <div>{sendTo.message}</div>
                </div>
                : <div/>
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
`
const SendMessage = styled.div`
    padding: 8px;
    text-align:center
`

const SendMessageInput = styled.input`
    border-radius: 1em;
    border-width:1px;
    border-style:solid;
    border-color: #dcdcdc;
    outline: none;
    resize:none;
`

const SendMessageButton = styled.button`
    margin:8px;
    border-radius: 1em;
    border-width:1px;
    border-style:solid;
    border-color: #dcdcdc;
    outline: none;
    resize:none;
`

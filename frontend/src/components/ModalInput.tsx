import Modal from 'react-modal'
import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    isOpen: boolean,
    Close: Function,
    roomName: string,
}

const ModalInput: React.FC<Props> = (Props) => {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileType = event.target.value.split('.').pop();
        if (fileType == "png" || fileType == "jpg" || fileType == "jpeg" || fileType == "gif") {
            fetch(event.target.value).then((res) => {
                if (res.status == 200) {
                    setIcon(event.target.value);
                }
            });
        }
    }

    const submit = () => {
        if (icon != "" && name != "") {
            localStorage.setItem(Props.roomName + "/icon", icon);
            localStorage.setItem(Props.roomName + "/name", name.slice(0, 28));
            localStorage.setItem(Props.roomName + "/id", uuidv4());
            Props.Close(false);
        }
    }

    return (
        <Modal isOpen={Props.isOpen} style={customStyles} ariaHideApp={false}>
            <Padding>
                <div>ユーザー設定をしてください</div>
            </Padding>

            <Text>名前:</Text>
            <InputTextArea maxLength={28} type="text" onChange={handleName} />

            <Text>アイコンURL:</Text>
            <Notes>*自動で中央に収縮されます</Notes>
            <InputTextArea type="text" onChange={handleIcon} />

            <Padding>
                <IconImg src={icon} alt="" />
            </Padding>

            <Padding>
                <Submit disabled={name == "" || icon == ""} onClick={submit}>決定</Submit>
            </Padding>
        </Modal>
    )
}

export default ModalInput;

const InputTextArea = styled.input`
    border-radius: 2em;
    padding: 1em;
    margin:8px;
    background-color: snow;
    line-height: 1.2;
    box-sizing: border-box;
    box-shadow: 0 0.5px 5px 0 rgba(0, 0, 0, .5);
    width: 100%;
    max-width:256px;
    height:32px;
    outline: none;
    resize:none;
    border: none;
`

const Submit = styled.button`
    outline: none;
    border: none;
    border-radius: 1em;
    width:50%;
    max-width:256px;
    height:32px;
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

const Notes = styled.div`
    font-size:8px;
    color: #ff6464;
    padding-left:16px;
`

const Text = styled.div`
    font-size:16px;
`

const Padding = styled.div`
    padding:8px;
    text-align:center;
`

const customStyles = {
    content: {
        borderRadius: '3em',
        padding: '60px',
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const IconImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 4em;
`

import styled from 'styled-components';

import Chat from '../components/Chat';

function Home() {
    return (
        <div>
            <AutoCenter>
                <TitleText> ListChat </TitleText>
                <TextArea maxLength={32} placeholder="ルーム名"></TextArea>
                <RoomCreateButton>ルームを作成</RoomCreateButton>
            </AutoCenter>
            <PreviewChat>
                <Chat me={{ img: "https://pbs.twimg.com/profile_images/1437747193234944002/a9f_91G8_400x400.jpg", name: "ガレバレ", message: "たぶん、リアルタイムなチャットです" }} sendTo={null} />
                <Chat me={{ img: "https://pbs.twimg.com/profile_images/1437747193234944002/a9f_91G8_400x400.jpg", name: "ガレバレ", message: "たぶん、一覧で表示されます" }} sendTo={null} />
                <Chat me={{ img: "https://pbs.twimg.com/profile_images/1437747193234944002/a9f_91G8_400x400.jpg", name: "ガレバレ", message: "たぶん、みんなで使えます" }} sendTo={null} />
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
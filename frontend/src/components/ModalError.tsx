const Modal = require('react-modal');
import { useHistory } from 'react-router'
import styled from 'styled-components';

type Props = {
    message: string,
    open: boolean,
}

const ModalError: React.FC<Props> = (Poprs) => {
    const history = useHistory();
    const backToHome = () => {
        history.push("/");
    }

    return (
        <Modal isOpen={Poprs.open} style={customStyles} ariaHideApp={false}>
            <Container>
                <Message>{Poprs.message}</Message>
                <Button onClick={backToHome}>ホームに戻る</Button>
            </Container>
        </Modal>
    )
}

export default ModalError;

const Container = styled.div`
    text-align:center;
`

const Message = styled.div`
    font-size: 16px;
    text-align: center;
`

const Button = styled.button`
    width: 80px;
    height: auto;
    font-size:16px;
    margin: 16px;
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
    };
`
const customStyles = {
    content: {
        borderRadius: '3em',
        padding: '60px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

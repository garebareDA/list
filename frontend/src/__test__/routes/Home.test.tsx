import { render, fireEvent } from '@testing-library/react'
import fetchMock, { MockResponseInit } from 'jest-fetch-mock';
import Home from '../../routes/Home'

jest.mock('socket.io-client')
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useHistory: () => ({ push: jest.fn() })
}));

test('HomeRender', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot()
});

test('onClickRoom', () => {
    const value = "room";
    fetchMock.enableMocks();
    fetchMock.mockIf('/api/group', (request: Request): Promise<MockResponseInit> => {
        request.json().then((json) => { expect(json.name).toBe(value) });

        const res = JSON.stringify(
            {
                name: "room",
                id: "123",
            }
        );

        return new Promise((resolve, reject) => {
            resolve({
                body: res
            })
        })
    });

    const { getByText, getByPlaceholderText, debug } = render(<Home />);
    const roomCreateButton = getByText("ルームを作成");
    const input = getByPlaceholderText("ルーム名");

    fireEvent.change(input, { target: { value: value } });
    expect((input as HTMLInputElement).value).toBe(value);

    fireEvent.click(roomCreateButton);
});



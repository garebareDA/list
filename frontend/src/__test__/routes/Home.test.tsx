import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Home from '../../routes/Home'

test('HomeRender', () => {
    const {asFragment} = render(<Home />);
    expect(asFragment()).toMatchSnapshot()
});

test('onClickRoom', () => {
    const {getByText, getByPlaceholderText, debug} = render(<Home />);
    const roomCreateButton = getByText("ルームを作成");
    const input  = getByPlaceholderText("ルーム名");

    const value = "room";
    fireEvent.change(input, { target: { value: value } });
    expect((input as HTMLInputElement).value).toBe(value);

    fireEvent.click(roomCreateButton);
    
});



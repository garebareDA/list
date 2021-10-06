import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom'
import fetchMock, { MockResponseInit } from 'jest-fetch-mock';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import Group from '../../routes/Group';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn().mockReturnValue({ groupID: "12345" }),
}))

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: jest.fn((element, node) => {
        return element
    })
}))

test('GroupRender', async () => {
    fetchMock.enableMocks();
    fetchMock.mockResponse((req: Request): Promise<MockResponseInit> => {
        expect(req.url).toBe("/api/group/12345");
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

    let component: ReactTestRenderer;
    await act(async () => {
        component = create(<Group />);
    }).then(() => {
        expect(component.toJSON()).toMatchSnapshot();
    });
});

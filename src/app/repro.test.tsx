import "@testing-library/jest-dom";
import {useRouter} from 'next/router';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import mockRouter from 'next-router-mock/async';
import Link from "next/link";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";

jest.mock('next/router', () => jest.requireActual('next-router-mock/async'))

describe('next-router-mock', () => {
    it('next/link can be tested too', async () => {
        render(
            <Link href="/example">Example Link</Link>,
            {
                wrapper: ({children}) => <MemoryRouterProvider async onPush={args => {
                    console.log('onPush', args);
                }}>{children}</MemoryRouterProvider>
            }
        );
        fireEvent.click(screen.getByText('Example Link'));
        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: '/example?foo=bar',
                pathname: '/example',
                query: {foo: 'bar'},
            });
        });
    });
});
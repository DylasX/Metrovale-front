/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Chat from '@/chat/components/index';
import { UserProvider } from '@/shared/context/userContext';

describe('Chat component', () => {
  test('Can render', () => {
    render(
      <UserProvider>
        <Chat />
      </UserProvider>
    );
    expect(screen.getByText('Connect')).toBeDefined();
  });

  test('Can connect to a room', () => {
    // search for input field name by data-testid
    expect(screen.getByTestId('name')).toBeDefined();
    //search for input room by data-testid
    expect(screen.getByTestId('room')).toBeDefined();

    //fill the input field with name and room value "Dylas" and "Default"
    const nameInput = screen.getByTestId('name') as HTMLInputElement;
    const roomInput = screen.getByTestId('room') as HTMLInputElement;

    //should change firing the onChange event with values Testing and TestingRoom
    fireEvent.change(nameInput, { target: { value: 'Testing' } });
    fireEvent.change(roomInput, { target: { value: 'TestingRoom' } });

    //check if the input field value is changed
    expect(nameInput.value).toBe('Testing');
    expect(roomInput.value).toBe('TestingRoom');

    //search for the button connect by data-testid
    const connectButton = screen.getByTestId('connect');

    //click the connect button
    fireEvent.click(connectButton);

    //TODO: should be define a strategy to test socket client
  });
});

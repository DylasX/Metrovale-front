import { ChangeEvent, useEffect, useState, KeyboardEvent } from 'react';
import { socket } from '@/chat/lib/socket';
import { useDataContext } from '@/shared/hooks/useDataContext';
import { User } from '@/shared/interfaces/user';
import { Message } from '@/shared/interfaces/messages';
import { socket as gameSocket } from '@/game/lib/socket';

function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const { updateUser, user } = useDataContext();
  const [values, setValues] = useState({
    name: 'Dylas',
    room: 'Default',
  });

  //state to store messages
  const [messages, setMessages] = useState<Message[]>([]);

  // Event handler to update state based on input field name
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const sendMessage = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    //emit message to socket server when enter key is pressed and with error validation also restart the textfield to blank
    if (event.key === 'Enter' && value.trim() !== '') {
      event.preventDefault();
      socket.emit('message', { text: value.trim(), name: user.name });
      event.currentTarget.value = '';
    }
  };

  const onMessages = (data: Message) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onUserInfo(data: User) {
      updateUser(data);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('userInfo', onUserInfo);
    //chat messages
    socket.on('messageClient', onMessages);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('userInfo', onUserInfo);
      socket.off('messageClient', onMessages);
    };
  }, [updateUser]);

  return (
    <aside className='flex flex-col  border-r-2 border-black  w-full md:w-1/4  pt-5 md:pt-20 px-4 py-8'>
      {!isConnected && (
        <section className='flex flex-col space-y-2 mb-2'>
          <div className='relative'>
            <label
              htmlFor='name'
              className='mb-2 text-md font-bold text-black uppercase'
            >
              Name
            </label>
            <input
              id='name'
              name='name'
              type='text'
              className='p-2.5 w-full text-sm text-black border-2 border-black bg-zinc-50 rounded-lg focus:outline-none'
              placeholder='Enter your name'
              value={values.name}
              onChange={handleChange}
              data-testid='name'
            />
          </div>
          <div className='relative'>
            <label
              htmlFor='room'
              className='mb-2 text-md font-bold text-black uppercase'
            >
              Room
            </label>
            <input
              type='text'
              id='room'
              name='room'
              className='p-2.5 w-full text-sm text-black border-2 border-black bg-zinc-50 rounded-lg focus:outline-none'
              placeholder='Enter room name'
              value={values.room}
              onChange={handleChange}
              data-testid='room'
            />
          </div>
        </section>
      )}
      <button
        className={`rounded-md  bg-black mt-4 mb-4 ${
          !isConnected ? 'ml-2 -translate-x-0' : 'translate-x-2'
        } bg-black-400  md:translate-x-0`}
        disabled={isConnected}
        data-testid='connect'
        onClick={() => {
          try {
            socket.connect();
            gameSocket.connect();
            scrollTo(0, 0);
            socket.emit('join', { room: values.room, name: values.name });
            gameSocket.emit('join', { room: values.room, name: values.name });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <span
          className={`block font-black uppercase -translate-y-2 rounded-md border-2 border-black  p-2 text-lg hover:-translate-y-3 -translate-x-2 active:translate-x-0 active:translate-y-0 transition-all bg-teal-600`}
        >
          {isConnected ? `${user.name}` : 'Connect'}
        </span>
      </button>
      {isConnected && (
        <section className='flex-grow'>
          <div className='relative'>
            <label
              htmlFor='message'
              className='mb-2 text-md font-bold text-black uppercase'
            >
              Your messages
            </label>
            <textarea
              id='message'
              rows={4}
              className='p-2.5 w-full text-sm text-black border-2 border-black rounded-lg bg-zinc-50 placeholder-slate-700  focus:outline-none'
              placeholder='Write your thoughts here...'
              onKeyDown={sendMessage}
              data-testid='message'
            ></textarea>
          </div>
          {messages.length ? (
            <div className='mt-5 max-h-[820px] overflow-y-auto text-black text-md font-bold'>
              Messages
              <ul id='messageList' className='mt-4 mr-0'>
                {messages.map((message, index) => (
                  <li
                    key={message.name + index}
                    className='p-2.5 w-full text-sm text-black rounded-lg border-2 mb-2 border-black bg-zinc-50 relative'
                  >
                    <div className='absolute top-0 left-0 w-full h-2 bg-teal-600  border-b-black border-b-2'></div>
                    <span className='mt-2'>
                      {message.name}: {message.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ''
          )}
        </section>
      )}
    </aside>
  );
}

export default Chat;

import React, { Suspense, useEffect } from 'react';
import Info from '@/assets/icons/Info.svg?react';
import Analytics from '@/assets/icons/Analytics.svg?react';
import { useDataContext } from '@/shared/hooks/useDataContext';
import { socket } from '@/game/lib/socket';
import { User } from '@/shared/interfaces/user';

const Game: React.FC = () => {
  //import svg dinamically from assets/images using random number between 1 and 105
  const random = Math.floor(Math.random() * 105) + 1;
  const Avatar = React.lazy(
    () => import(`@/assets/images/peep-${random}.svg?react`)
  );

  const { user, updateUser } = useDataContext();

  useEffect(() => {
    function onUserInfo(data: User) {
      updateUser(data);
    }

    socket.on('userInfo', onUserInfo);

    return () => {
      socket.off('userInfo', onUserInfo);
    };
  }, [updateUser]);

  if (!user.name || !user.room) {
    return (
      <section className='flex flex-col md:p-10 py-0 pt-5 px-5 items-center w-full md:w-1/2 justify-center ml-auto mr-auto text-justify'>
        <h2 className='text-xl mb-5 font-extrabold'>Crime in Metrovale</h2>
        <span className=''>
          In this thrilling turn-based multiplayer browser game, players are
          trapped in a building in Metrovale City after a murder. Each player is
          assigned a role: most are Innocents with tasks to complete, while one
          is the secret Assassin. The game alternates between task rounds and
          voting rounds. During task rounds, players perform role-specific
          actions, while the Assassin tries to sabotage and eliminate players
          unnoticed. In voting rounds, players discuss and vote on who they
          think the Assassin is. If the Assassin is correctly identified, the
          Innocents win; if not, the game continues. Communication, strategy,
          and observation are crucial as players work to identify the Assassin
          and avoid being deceived.
        </span>
      </section>
    );
  }

  return (
    <section className='w-full flex flex-col  px-4 py-0 md:py-12 animate-fade-up animate-once animate-duration-[1500ms] animate-ease-out'>
      <div className='flex flex-row pt-4 md:pt-16'>
        <h1 className='text-2xl font-black mr-2 uppercase'>User info</h1>
        <Info className='w-10 h-10 fill-teal-600' />
      </div>

      <div className='flex flex-row mt-2 h-3/4 md:h-1/4 border-2 border-r-4 border-b-4 border-black shadow-neobrutalism rounded-sm px-10 py-5 relative bg-zinc-50'>
        <div className='absolute top-0 left-0 w-full h-50 bg-teal-600 h-10 border-b-black border-b-2'></div>
        <div className='avatar w-2/5 md:w-1/12  min-h-0  border-2 border-black mt-10 rounded-sm relative bg-slate-100'>
          <Suspense fallback={<></>}>
            <Avatar className='w-full h-full rounded-sm text-re' />
          </Suspense>
        </div>
        <div className='info flex-grow mb-4 mt-10'>
          <h2 className='ml-4 text-2xl font-bold uppercase'>{user.name}</h2>
          <h3 className='ml-4 text-xl'>Citizen</h3>
          <h3 className='ml-4 text-xl'>Alive</h3>
        </div>
      </div>
      <div className='flex flex-row pt-16'>
        <h2 className='text-2xl font-black mr-2 uppercase'>Game status</h2>
        <Analytics className='w-10 h-10 fill-teal-600' />
      </div>
      <div className='flex flex-row mt-2 min-h-56 h-full border-2 border-r-4 border-b-4 border-black shadow-neobrutalism rounded-sm px-10 py-5 relative bg-zinc-50'>
        <div className='absolute top-0 left-0 w-full h-50 bg-teal-600 h-10 border-b-black border-b-2'></div>
        <div className='info flex-grow mb-4 mt-12'>
          {user.isAdmin ? (
            <button
              className={`rounded-md  
            bg-black ml-auto mb-4 
            -translate-x-0
            bg-black-400  md:translate-x-0`}
              data-testid='startGame'
            >
              <span
                className={`block font-black uppercase -translate-y-2 rounded-md border-2 border-black  p-2 text-lg hover:-translate-y-3 -translate-x-2 active:translate-x-0 active:translate-y-0 transition-all bg-teal-600`}
              >
                {'Start game'}
              </span>
            </button>
          ) : (
            <span>Waiting host to start game...</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Game;

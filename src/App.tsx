import Chat from '@/chat/components/';
import Game from '@/game/components/';
import Footer from '@/shared/components/Footer';
import { DataProvider } from '@/shared/context/dataContext';

function App() {
  return (
    <DataProvider>
      <div className='flex flex-col h-screen'>
        <main className='flex-grow flex flex-col-reverse md:flex-row bg-yellow-50'>
          <Chat />
          <Game />
        </main>
        <Footer />
      </div>
    </DataProvider>
  );
}

export default App;

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='border-b-2 border-t-2 border-black text-black py-8 px-10 uppercase bg-yellow-50'>
      <div className='container mx-auto flex justify-between items-center'>
        <p className='text-md'>© 2024 All rights reserved</p>
        <p className='text-md'>
          Made with love by <span className='font-bold'>Dylas</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

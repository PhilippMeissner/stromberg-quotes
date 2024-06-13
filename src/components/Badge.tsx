import {FunctionalComponent, h} from 'preact';

const Badge: FunctionalComponent = () => {
  return (
    <a href='https://dyve.agency/de' rel="nofollow noopener noreferrer" target='_blank'>
      <div
        className='bg-gradient-to-tl from-gray-700 to-gray-800 absolute top-0 right-0 bg-black p-4 text-white rotate-45 transform text-center min-w-badge translate-x-14 translate-y-10 overflow-hidden'>
        powered by <span className="font-bold">dyve</span>
      </div>
    </a>
  );
};

export default Badge;

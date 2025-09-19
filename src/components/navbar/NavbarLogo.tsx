
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-invitopia-700 to-invitopia-500">
        Invitopia
      </span>
    </Link>
  );
};

export default NavbarLogo;

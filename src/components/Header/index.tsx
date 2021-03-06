import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { Container } from './styles';




interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <NavLink exact activeClassName="active" to="/">Listagem</NavLink>
        <NavLink activeClassName="active" to="/import">Importar</NavLink>
      </nav>
    </header>
  </Container>
);

export default Header;

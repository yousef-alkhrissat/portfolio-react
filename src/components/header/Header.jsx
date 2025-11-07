import React from 'react';
import CTA from './CTA';
import HeaderSocials from './HeaderSocials';
import './header.scss';

const Header = () => {
  return (
    <header id="home">
      <div className="container header__container">
        <h5>Hello I'm</h5>
        <h1>Yousef Alkhrissat</h1>
        <h5 className="text-light">Full-stack Developer | Project Manager | Business Analyst</h5>
        <CTA />
        <a href="#contact" className="scroll__down">
          Scroll Down
        </a>
        <HeaderSocials />
      </div>
    </header>
  );
};

export default Header;

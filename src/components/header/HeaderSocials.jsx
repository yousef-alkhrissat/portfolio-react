import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaFacebook, FaGithub } from 'react-icons/fa';

const HeaderSocials = () => {
  return (
    <div className="header__socials">
      <a href="https://www.linkedin.com/in/yousef-alkhrissat/" target="_blank" rel="noreferrer" ><BsLinkedin /></a>
      <a href="https://github.com/yousef-alkhrissat" target="_blank" rel="noreferrer" ><FaGithub /></a>
      <a href="https://facebook.com/joseph.khraistopher/" target="_blank" rel="noreferrer" ><FaFacebook /></a>
    </div>
  )
}

export default HeaderSocials
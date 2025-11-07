import React from 'react';
import { FaAward } from 'react-icons/fa';
import { VscFolderLibrary } from 'react-icons/vsc';
import { FaProjectDiagram } from 'react-icons/fa';
import ME from '../../assets/me.jpg';
import './intro.scss';

const Intro = () => {
  return (
    <section id="about">
      <h5>Get to know</h5>
      <h2>About Me</h2>
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="me" />
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>6+ years</small>
            </article>
            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>20+ Completed Projects</small>
            </article>
            <article className="about__card">
              <FaProjectDiagram className="about__icon" />
              <h5>PM & BA</h5>
              <small>Agile & Strategic</small>
            </article>
          </div>
          <p>Hi there! I'm Yousef, a Full-stack Developer with 6+ years of experience, 
          specializing in both technical development and strategic project management. 
          Based in Amman, Jordan, I bring a unique blend of technical expertise and 
          business acumen to every project.</p>
          <p>As a developer, I excel at building robust and scalable applications using 
          the Node.js ecosystem, including NodeJs, NestJs, ExpressJs, along with various 
          databases (MySQL, PostgreSQL, Oracle), and DevOps tools (Docker, Nginx, Apache).</p>
          <p>As a Project Manager and Business Analyst, I've successfully led cross-functional 
          teams, managed project lifecycles from conception to delivery, conducted stakeholder 
          analysis, created comprehensive project documentation, and ensured alignment between 
          business objectives and technical solutions. I'm skilled in Agile methodologies, 
          requirements gathering, process improvement, and delivering projects on time and 
          within budget.</p>
          <a href="#contact" className="btn btn-primary">Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default Intro
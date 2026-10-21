import { stack } from '../data'

const facts = [
  ['Based in', 'Amman, Jordan (UTC+3)'],
  ['Working since', 'February 2019'],
  ['Eligible for', 'The EU Blue Card'],
  ['Studied', 'Computer Technology, Al Balqaa Applied University'],
]

export default function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="in">
        <div className="about-top" data-reveal-group>
          <div data-reveal>
            <h2 id="about-title" className="section-title">About me</h2>
            <div className="about-copy">
              <p>
                I work close to the product. I check feature requests with the people asking for
                them, so engineering time goes to what customers actually use.
              </p>
              <p>
                I test like QA because I have done the job: Selenium, Postman and JMeter, and
                training QA engineers on several teams. I have worked AI-first since Copilot was
                only an autocomplete, and LLM features and AI coding tools are part of how I ship today.
              </p>
            </div>
          </div>
          <dl className="about-facts" data-reveal>
            {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </div>

        <h3 className="skills-title" data-reveal>Skills</h3>
        <div className="skills" data-reveal-group>
          {stack.map(g => (
            <div key={g.group} className="skill-group" data-reveal>
              <h4>{g.group}</h4>
              <p className="skill-sum">{g.summary}</p>
              <ul role="list">
                {g.items.map(([name, line]) => <li key={name} title={line}>{name}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

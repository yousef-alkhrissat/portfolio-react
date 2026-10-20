export default function Intro() {
  return (
    <section className="intro" aria-label="Introduction" data-reveal-group>
      <p className="statement" data-reveal>
        Seven years building the parts of a product nobody sees: the queue that takes the spike,
        the cache that keeps a call alive.
      </p>

      <div className="intro-body" data-reveal>
        <p>
          Right now I’m a senior software engineer at Merit Incentives in Amman, working on its
          e-commerce and loyalty points system. Before that: Sowtek, a multi-tenant VoIP platform
          on NestJS and Asterisk, procurement SaaS at UBA, a social network at Baaz, a code judge
          for children at Hello World Kids, and international shipping for Zalatimo.
        </p>
        <p>
          Ten roles since 2019, most of them in Amman, one fully remote for a US client. I like
          the problems that only show up under real load.
        </p>
      </div>

      <figure className="intro-figure" data-reveal>
        <img src="/images/world/switchboard.jpg" alt="An operator at a telephone switchboard in Milwaukee, 1930" width="1000" height="1000" loading="lazy" />
      </figure>
      <p className="intro-note" data-reveal>
        Milwaukee, 1930. An operator routes calls by hand, the job Asterisk and Redis did for Sowtek.
      </p>
    </section>
  )
}

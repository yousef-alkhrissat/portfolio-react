// All content on the page lives here. Components only lay it out.

export const EMAIL = 'yousef.alkhrissat@gmail.com'
export const PHONE = '+962793773311'
export const PHONE_LABEL = '+962 7 9377 3311'
export const LINKEDIN = 'https://linkedin.com/in/yousef-alkhrissat'
export const CV = '/Yousef Alkhrissat - CV.pdf'

export const projects = [
  { id: 'sowtek', name: 'Sowtek', company: 'Axelerated Solutions', kind: 'VoIP & unified comms', year: '2025', link: 'https://sowtek.com/' },
  { id: 'shooty', name: 'Shooty', company: 'UBA', kind: 'Content production SaaS', year: '2024', link: 'https://shooty.com/' },
  { id: 'baaz-portal', name: 'Baaz', company: 'Baaz', kind: 'Social platform', year: '2024', link: 'https://www.baaz.com/', archived: true },
  { id: 'hellocode', name: 'Hellocode', company: 'Hello World Kids', kind: 'Coding school for kids', year: '2023', link: 'https://hellocode.me/en/' },
  { id: 'zalatimo', name: 'Zalatimo', company: 'Rhinosoft', kind: 'E-commerce, sweets since 1860', year: '2022', link: 'https://zalatimo.com/en' },
  { id: 'himam', name: 'Himam', company: 'Rhinosoft', kind: 'Arabic learning platform', year: '2022', link: 'https://hla.himam.com/landing-page' },
  { id: 'epic-academy', name: 'Epic Academy', company: 'Aspire IT Services', kind: 'Live classroom platform', year: '2021', link: 'https://aspire.jo/careers/epic-academy/' },
  { id: 'weight-watchers', name: 'Weight Watchers', company: 'Aspire IT Services', kind: 'Wellness programs', year: '2020', link: 'https://www.weightwatchers.com/us' },
  { id: 'scholastic', name: 'Scholastic', company: 'Aspire IT Services', kind: 'Publishing & export', year: '2020', link: 'https://export.scholastic.com/en' },
  { id: 'point-trader-group', name: 'Point Trader', company: 'Freelance', kind: 'Forex brokerage', year: 'Freelance', link: 'https://www.pointfxltd.com/' },
  { id: 'null-tech', name: 'Null Tech', company: 'Freelance', kind: 'Software consultancy', year: 'Freelance', link: 'https://null-tech.net/' },
  { id: 'rateme', name: 'RateMe', company: 'Freelance', kind: 'Peer-review platform', year: 'Freelance', link: 'https://rateme.gaztech.io/' },
]

export const cases = [
  {
    id: 'sowtek', grow: 5,
    title: 'Call state that survives the rush',
    where: 'Sowtek · Axelerated Solutions',
    text: 'Live call state moved out of MySQL into Redis keys with TTLs, so peak traffic stopped hammering the database. RabbitMQ carries the telecom events behind it, isolated per tenant.',
  },
  {
    id: 'shooty', grow: 2,
    title: '30% faster, platform-wide',
    where: 'Shooty · UBA',
    text: 'GraphQL resolvers rebuilt over Elasticsearch and Redis cut API response times by 30%. Heavy transactions moved to their own services over RabbitMQ.',
  },
  {
    id: 'hellocode', grow: 3,
    title: 'A code runner for children',
    where: 'Hellocode · Hello World Kids',
    text: 'A LeetCode-style judge that runs student code on isolated AWS infrastructure. Queues absorb a whole classroom submitting at once, and answers still come back in under a second.',
  },
  {
    id: 'zalatimo', grow: 2,
    title: 'DHL shipping, by the gram',
    where: 'Zalatimo · Rhinosoft',
    text: 'The billing plugin could not price international DHL parcels. A locale-triggered matrix of fixed fee × weight priced them anyway, and orders abroad went through.',
  },
]

// Months since Jan 2019, used to draw each job as a span.
export const TRACE_START = 2019
export const TRACE_END = 2026.85

export const jobs = [
  {
    company: 'Merit Incentives', role: 'Senior Software Engineer', where: 'Amman',
    from: 2026.74, to: null, dates: 'Sep 2026 — now',
    text: 'Working on the e-commerce and loyalty points system.',
    tags: [],
  },
  {
    company: 'Axelerated Solutions', role: 'Senior Back-End Developer', where: 'Amman',
    from: 2025.25, to: 2026.74, dates: 'Apr 2025 — Sep 2026',
    text: 'Multi-tenant backend for a telecom platform on NestJS and Asterisk, with strict data isolation between clients. Real-time call-state tracking on Redis TTLs, event processing over RabbitMQ and MySQL, and a modular redesign across VoIP, ticketing and social modules. I audit feature requests with product to keep effort on core workflows, and train the QA team.',
    tags: ['NestJS', 'Asterisk', 'Redis', 'RabbitMQ', 'MySQL'],
  },
  {
    company: 'FGI Worldwide', role: 'Fullstack Software Engineer', where: 'Remote, US',
    from: 2024.92, to: 2025.08, dates: 'Dec 2024 — Feb 2025',
    text: 'Laravel APIs and React components for a US client on a fully remote contract, working asynchronously across time zones.',
    tags: ['Laravel', 'React', 'PHP'],
  },
  {
    company: 'UBA', role: 'Senior Fullstack Software Engineer', where: 'Amman',
    from: 2024.33, to: 2024.92, dates: 'May — Dec 2024',
    text: 'Core backend features and React modules for high-volume procurement SaaS. GraphQL APIs over Elasticsearch and Redis cut response times by 30% platform-wide; a decoupled microservice layer over RabbitMQ isolated the heavy transaction loads.',
    tags: ['GraphQL', 'Elasticsearch', 'Redis', 'RabbitMQ', 'React'],
  },
  {
    company: 'Baaz', role: 'Fullstack Software Engineer', where: 'Amman',
    from: 2023.83, to: 2024.33, dates: 'Nov 2023 — May 2024',
    text: 'REST and GraphQL features for a high-concurrency social platform. Redis caching and tuned Elasticsearch indices for scale; PostgreSQL and MongoDB models that kept up with fast-changing features. The role ended when Baaz shut its regional platform.',
    tags: ['GraphQL', 'Redis', 'Elasticsearch', 'PostgreSQL', 'MongoDB'],
  },
  {
    company: 'Hello World Kids', role: 'Senior Software Engineer', where: 'Amman',
    from: 2023.08, to: 2023.83, dates: 'Feb — Nov 2023',
    text: 'Conceived and built a LeetCode-style feature that grades student code in real time. Led the Laravel and AWS backend, ran scripts on isolated infrastructure, and used RabbitMQ to absorb evaluation spikes during classroom hours.',
    tags: ['Laravel', 'AWS', 'RabbitMQ'],
  },
  {
    company: 'Rhinosoft', role: 'Senior Software Engineer', where: 'Amman',
    from: 2022.08, to: 2022.83, dates: 'Feb — Nov 2022',
    text: 'Solved DHL international shipping for Zalatimo.com with a locale-triggered fixed fee × weight matrix that got round the billing plugin. Node.js microservices on NestJS and Express over MongoDB, Redis and RabbitMQ; code reviews, mentoring and QA training.',
    tags: ['NestJS', 'Express', 'MongoDB', 'Redis', 'RabbitMQ'],
  },
  {
    company: 'Luminus Education Group', role: 'Software Engineer', where: 'Amman',
    from: 2021.83, to: 2022.08, dates: 'Nov 2021 — Feb 2022',
    text: 'Internal systems on Node.js that automated business processes for one of Jordan’s largest private education groups.',
    tags: ['Node.js'],
  },
  {
    company: 'Aspire IT Services', role: 'Software Engineer', where: 'Amman',
    from: 2019.83, to: 2021.83, dates: 'Nov 2019 — Nov 2021',
    text: 'Shaped EPIC Academy’s product and its software specification. Full-stack systems on NestJS, Express and React; PostgreSQL and MongoDB schemas with Redis and RabbitMQ for real-time classrooms; Selenium (Java), Postman and JMeter for automation and load testing.',
    tags: ['NestJS', 'React', 'PostgreSQL', 'Selenium', 'JMeter'],
  },
  {
    company: 'NCIT Solutions', role: 'Software Engineer', where: 'Amman',
    from: 2019.08, to: 2019.83, dates: 'Feb — Nov 2019',
    text: 'First role: Node.js, React and NestJS applications with real-time features on WebSockets and Redis.',
    tags: ['Node.js', 'NestJS', 'WebSockets'],
  },
]

// Each skill carries one line on where it was used, shown on hover.
export const stack = [
  {
    group: 'Backend',
    summary: 'NestJS first, Laravel when the team runs PHP.',
    items: [
      ['Node.js', 'Every role since 2019.'],
      ['NestJS', 'Telecom at Axelerated, microservices at Rhinosoft, EPIC Academy.'],
      ['TypeScript', 'The default for anything new.'],
      ['Express', 'Rhinosoft and Aspire services.'],
      ['Laravel', 'The Hellocode judge, FGI’s US client.'],
      ['PHP', 'Laravel work at Hello World Kids and FGI.'],
      ['GraphQL', 'UBA’s 30% faster API, Baaz.'],
      ['REST', 'Everywhere, versioned.'],
      ['WebSockets', 'Live classrooms and call state.'],
    ],
  },
  {
    group: 'Data & messaging',
    summary: 'Queues for spikes, caches for state, the right store for each.',
    items: [
      ['PostgreSQL', 'Baaz and EPIC Academy schemas.'],
      ['MySQL', 'Multi-tenant telecom data at Axelerated.'],
      ['MongoDB', 'Rhinosoft services, Baaz models.'],
      ['Redis', 'Call-state TTLs, caching layers, sessions.'],
      ['RabbitMQ', 'Telecom events, code evaluation, transactions.'],
      ['Elasticsearch', 'Search and data retrieval at UBA and Baaz.'],
      ['Oracle', 'Database and cloud work.'],
      ['Asterisk', 'Call routing for Sowtek.'],
    ],
  },
  {
    group: 'Cloud & delivery',
    summary: 'Containers, Linux and the servers they run on.',
    items: [
      ['AWS', 'Isolated code execution for Hellocode.'],
      ['DigitalOcean', 'Smaller products and freelance work.'],
      ['Oracle Cloud', 'Hosted services.'],
      ['Docker', 'Every service ships in a container.'],
      ['Linux', 'Where it all runs.'],
      ['Nginx', 'Reverse proxy and TLS.'],
      ['CI/CD', 'Pipelines that block on tests.'],
    ],
  },
  {
    group: 'Testing',
    summary: 'I have trained QA engineers on several teams.',
    items: [
      ['Selenium (Java)', 'UI automation at Aspire.'],
      ['Postman', 'API suites and contract checks.'],
      ['JMeter', 'Load tests before launch, not after.'],
      ['Playwright', 'End-to-end checks, this site included.'],
      ['Regression testing', 'Kept green across releases.'],
      ['QA training', 'Automation, performance and manual testing.'],
    ],
  },
  {
    group: 'AI engineering',
    summary: 'Using Copilot since it was only an autocomplete.',
    items: [
      ['Claude & OpenAI APIs', 'LLM features wired into production backends.'],
      ['Tool calling', 'Models that call real services.'],
      ['MCP', 'Model Context Protocol servers and clients.'],
      ['Agents', 'Agentic coding and testing loops, daily.'],
      ['Prompt engineering', 'Evaluated, not guessed.'],
      ['Workflow automation', 'Repetitive work taken off the team.'],
    ],
  },
  {
    group: 'Architecture',
    summary: 'Boring, isolated, observable.',
    items: [
      ['Microservices', 'Split where the load is, not everywhere.'],
      ['Event-driven design', 'RabbitMQ at four companies.'],
      ['Multi-tenant systems', 'Strict data isolation at Axelerated.'],
      ['Real-time systems', 'Calls, classrooms, social feeds.'],
      ['Domain-driven design', 'Modules that match the business.'],
      ['Requirements review', 'Auditing requests with product owners.'],
      ['Mentoring', 'Code reviews and junior engineers.'],
    ],
  },
]

export const credits = [
  { title: 'Amman Skyline at Sunset', by: 'Ibrahim nabeel salah', licence: 'CC BY 4.0', page: 'https://commons.wikimedia.org/w/index.php?curid=194095059' },
  { title: 'Wisconsin Bell Telephone Company Switchboard', by: 'Gary Langebartels / FortepanIowa', licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Wisconsin_Bell_Telephone_Company_Switchboard.jpg' },
]

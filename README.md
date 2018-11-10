# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


## TODO

**React Knowledge specific**

- webpack aliases to find components and resolve paths - but don't bother
- tree shaking (rm dead code) and code splitting ()
    - move away from babel imports and webpack to node native modules (see ESM module loader STD JS for imoprts and exports)
    - vendor not vendor - webpack common chunks
    - code splitting by route
    - wal mart even has above the fold code splitting
    - index.js not working with tree shaking
    
- [ ] how to organise stuff: container vs component dir vs api and other?
    - look at recompose
    - hooks in alpha 
    - type script definitely for new code base - complex tree of data
    - proptypes useless typescript can auto generate
    
- [ ] error boundaries and how to use them https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
    - what other things are new in react 16?
    - in the next version of react?
    - how best to keep up to date?
- browser fetch vs axios (problems testing browser fetch)
    - fetch ok but need to poly fill to server side
    - nock fake endpoint
    
- css modules with predictable names in tests

- our use of state, when would you use redux, other options
    - use context
    - redux more around pub/sub event sourcing - on way out
     
- On testing
    - Snapshot testing for markup / JSX assertions
    - Behavioural testing
    - Integration testing
        - how cypress may help
    - capybara style testing https://github.com/kentcdodds/react-testing-library
    
    - suspense https://reactjs.org/blog/2018/10/23/react-v-16-6.html
    - cognito - aws amplify
    - auth zero
    - 1 login - guy from RB

- **Keep upto date**
    - watch videos https://www.reactjsvideos.com/#/search
    - any react conf keynotes
    - follow on twitter
        - https://twitter.com/leeb
        - https://twitter.com/dan_abramov
        - about 2 more from reactjsvideos
    - signup to react status newsletter
        - https://react.statuscode.com/
        - or http://reactjsnewsletter.com/
    
- **Practical build**
    - login (via Github and/or user in backend)
    - set JWT and authorize on routes

**Minor and style**

- [ ] .jsx for JSX files yes or no?
- [ ] airbnb style guide for JS? ; on end of lines?
- [ ] move out botton-region and top-region into separate dumb components
- [ ] change all shallow to const wrapper

**Other**

- [ ] add rubocop

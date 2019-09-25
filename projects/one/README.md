# One

This is a baby step.  Create a web server that returns files from a directory.
Stream the files.

# Commands

yarn start - start the server
yarn dev - start with nodemon and inspector, chrome://inspect to hook up
yarn test - runs jest tests


## Questions

Can you use --inspect with nodemon?
  Yes, just need to open the dedicated debugger for node from Chome.

What is a good way to send requests during dev?
  curl "http://localhost:3333" is quick.
  curl -i "http://localhost:3333" includes headers in the response.

Debugging is when things are broken and you don't know why.  I want to TDD.

How to TDD Node?
  supertest
  If I use supertest, I don't have to start the server listening.

Let's compare the blocking vs non-blocking reads.
  https://nodejs.org/en/docs/guides/simple-profiling/
  ab -r -k -c 200 -n 4800 "http://localhost:3333/hello.txt"

How do we test binary responses?
  https://visionmedia.github.io/superagent/
  Create a custom parser using superagent (lower level under supertest).

  JPEGs are binary.
  When we test, we just have to ensure we're encoding the buffer with the same
  encoding we're loading the fixture with.

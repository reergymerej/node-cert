# One

This is a baby step.  Create a web server that returns files from a directory.
Stream the files.


## Questions

Can you use --inspect with nodemon?
  Yes, just need to open the dedicated debugger for node from Chome.

What is a good way to send requests during dev?
  curl "http://localhost:3000" is quick.

Debugging is when things are broken and you don't know why.  I want to TDD.

How to TDD Node?
  supertest
  There doesn't seem to be a lot here.  Let's noodle through it.
  Regular modules and simple logic, that's easy.
  We may want to test what happens when we send a request.  That will require
  the server being up and running.
  If the test requires the main app, will it be running as a server?

  If I use supertest, I don't have to start the server listening.

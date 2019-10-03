# URL Shortener

Simple API.  Storage.  Redirection.

## Questions

When testing, do we mock the db?
  https://dev.to/bobbypriambodo/comment/27jj

  Unit tests, yes, mock.
  Integration/E2E, no, hit a db.

  We don't want to get into the weeds with testing philosophy.  We need to know
  how to do both.  We can test our endpoints with supertest, not sure if that
  counts as unit or integration.

  you shouldn't unit test your database access code
  https://www.petrikainulainen.net/programming/testing/writing-tests-for-data-access-code-unit-tests-are-waste/

## Design

Presentation
  Routing - connects request (API version) to business layer

Business Logic Layer - speaks in generalizations
  getUrlForThisID
  saveUrl

Data Access Layer - knows how to build and run queries, data models
  insert into x, return id
  select from blah, return model

  We don't have to store the converted id in the db.  Just store the int and the
  BLL can do the translations for us.

App
  Application level concerns like which database we use, host, passwords, etc
  are managed at the app level.  The app assembles its pieces (presentation,
  bll, dal) given a context.  Presentation can talk to BLL (injection), BLL can
  talk to DAL (injection).

  Keeping the configuration in the app level allows us to change environments
  for dev, prod, and testing.

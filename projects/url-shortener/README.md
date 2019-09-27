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
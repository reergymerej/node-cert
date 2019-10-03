# Data Access Layer

This is the layer of code that knows how to save/retrieve persisted objects.  It
doesn't understand models or relationships in a business sense.  It only deals
with saving/retrieving.  Imagine that it is a magician's helper.  The BLL asks
it for stuff, it fetches it.  The BLL gives it stuff to store, it puts it away.
That's it.

When interacting with DAL, always use async methods.

## Features of a Data Access Layer
http://www.databasedev.co.uk/data-access-layer.html

A Data Access Layer should provide the following features:

  * Connect to the database
  * Open and Close connections
  * Support for CRUD operations
  * Transaction management
  * Provider independence
  * Concurrency management

## Start

Let's begin with a limited view.  We need to save a url.  How do we do that?


## DB

sequelize ORM
postgres

When should you make the db connection?
We could create a singleton or maybe use a connection pool.

### PG

```sql
create database test;
create user tester with encrypted password 'tester';
```


How can we ensure we're writing unit tests and integration separately?
  We need to mock the ORM.
  Mock the db connection.

  > Data access code has a very strong relationship with the used data storage.
  > That relationship is so strong that the data access code itself isn’t useful
  > without the data storage. That is why it makes no sense to isolate our data
  > access code from the used data storage.
  https://www.petrikainulainen.net/programming/testing/writing-tests-for-data-access-code-unit-tests-are-waste/

Don't unit test DAL.  Use integration tests.


I don't want to specify the connection specifics from the app.  The DAL should
connect automatically based on environment.

# Streams

https://nodejs.org/dist/latest-v12.x/docs/api/stream.html

Let's make a writeable stream and send stuff to it.
https://nodejs.org/dist/latest-v12.x/docs/api/stream.html#stream_api_for_stream_implementers

All calls to .write between the internal .write and the callback will be
buffered.

What can I do with streams?

Let's create a write stream and log when things go into it.

## Readable

When reading from a stream, .read calls the internal ._read, which should call
.push.  .push adds data to the buffer.

How does one of the builtin streams work?
  .push adds to the buffer
  a buffer is used to soften the differences between two sides of data transfer
  data sources should add to the buffer
  reading should pull from the buffer

  OK, it looks like the normal way to use the stream (as a creator) is just to
  push to it when you get data.  Putting "push" inside "_read" is just a trick
  to make it wait until the consumer asks for data.
  https://github.com/substack/stream-handbook


Let's make a big ass file with a stream.

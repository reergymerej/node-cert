# Buffers and Streams 9%

## Buffers

https://nodejs.org/dist/latest-v12.x/docs/api/buffer.html
https://www.tutorialspoint.com/nodejs/nodejs_buffers.htm
https://www.w3resource.com/node.js/nodejs-buffer.php
https://www.freecodecamp.org/news/do-you-want-a-better-understanding-of-buffer-in-node-js-check-this-out-2e29de2968e8/

What is a buffer?
  A buffer is like an array of ints, but it's stored outside V8.  It is used for
  octet streams (tcp, file access) for reading binary data.  JS is OK with
  unicode, but not binary.  Buffers allow Node to handle binary.

  used to manipulate streams of binary data
  similar to arrays of ints 0-255
  Node provides Buffer class which provides instances to store raw data similar
  to an array of integers but corresponds to a raw memory allocation outside the
  V8 heap.

They could hold old data if not initialized.

### What can we do with buffers?

create them
b = Buffer.from('a')

view as a string
b.toString()
'a'

as JSON
b.toJSON()
{ type: 'Buffer', data: [ 97 ] }

Notice that the buffer holds 97, not 'a'.  Why?
  Buffer.from(string[, encoding]) creates a buffer containing string encoded
  with encoding.

  'a' encoding to UTF8 equals the codepoint 97.

Buffers hold integers 0-255.

b
<Buffer 61>

Why 61?  Why not 97?
  The numbers show in the buffer are hex.
  a = codepoint 97 in utf8
  97 = 61 in hex

Buffer.alloc(size) creates a zero-filled buffer of size.

Can we change the size?
  no

If you use allocUnsafe, you can get dirty data.  What's the difference between
allocUnsafe and allocUnsafeSlow?
  allocUnsafe uses chunks from a preallocated buffer, avoiding GC.
  allocUnsafeSlow creates a new Buffer (not pooled)
  Create unsafe is faster than filling.  If we use the pooled version, it ties
  up resources others may want.  Using allocUnsafeSlow creates a new "dirty"
  buffer, which is faster than filling, but slower than using the pooled buffer.
  This may be a good idea when we want to hold onto the buffer for a while,
  tying up the pool.

What's the official reason to use a buffer?
  https://flaviocopes.com/node-buffers/

  It's about memory.  We get input faster than we can use it.  We put that in
  the buffer.  This happens with streams.  A stream is used to send us video.
  We fill our buffer with it.  Our transcoder pulls from the buffer as it
  processes.

How do we deal with buffer overflow?  Our buffer size can't be increased when it
gets full.
https://medium.com/front-end-weekly/js-buffers-matter-sometimes-56150a35417f
  It looks like .fill defaults to buffer.length.
  https://snyk.io/blog/exploiting-buffer/
  Seems like recent versions are pretty safe.  I don't think we can do a buffer
  overflow when writing data.

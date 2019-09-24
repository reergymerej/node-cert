This is a list of security issues.

https://nodejs.org/dist/latest-v12.x/docs/api/buffer.html#buffer_buffer

For example, if an attacker can cause an application to receive a number where a string is expected, the application may call new Buffer(100) instead of new Buffer("100"), it will allocate a 100 byte buffer instead of allocating a 3 byte buffer with content "100". This is commonly possible using JSON API calls. Since JSON distinguishes between numeric and string types, it allows injection of numbers where a naive application might expect to always receive a string.


https://nodejs.org/en/docs/guides/debugging-getting-started/

We recommend that you never have the debugger listen on a public IP address. If you need to allow remote debugging connections we recommend the use of ssh tunnels instead. We provide the following example for illustrative purposes only. Please understand the security risk of allowing remote access to a privileged service before proceeding.

# node-retry
This is about how to design a resilient system that is capable of handling transient failures while communicating with other resources over a network. It helps tackle the thundering herd problem.

## Explining the concept like you're 5

Imagine you are playing a game where you have to ask your mom for a toy. Sometimes, your mom might say "no" or not respond at all, but you really want the toy, so you keep asking until she says "yes".

Now imagine that you are using a computer program to talk to other computers over the internet, and sometimes those computers might not respond or give you the wrong information. In that case, you can also keep asking until you get the right information. That's called "retrying".

However, if you keep asking too many times too quickly, it might make the other computers really busy and not able to respond. To prevent this, you need to wait a little longer each time you ask, like counting to 10 or 20 before you ask again. This is called "backoff".

But if lots of people are all trying to ask for the same thing, waiting the same amount of time before asking again can still cause a big problem. So instead of all waiting the same amount of time, everyone can wait a little bit longer or shorter, like counting to a random number between 5 and 15 before asking again. This is called "jitter".

By using retry, backoff, and jitter, the computer program can keep asking for information from other computers until it gets the right information, but without overwhelming those computers with too many requests all at once.

---

This is an example in javascript with axios interceptor. For Java based applications, the same can be done using [resilience4j](https://resilience4j.readme.io/docs/retry)

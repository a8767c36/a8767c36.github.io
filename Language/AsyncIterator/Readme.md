
<h3>Async Iterator Extensions - Proposal</h3>

This proposal defines a set of extension functions for the interface AsyncIterator.

The difference between an extension function and an interface is
that an interface requires every provider (aka. implementing class) to provide these methods,
while extension functions are provided (implemented) only once (globally)
and can then operate on every instance of the interface.

Therefore extension functions significantly reduce the workload for providers of AsyncIterator
by not requiring them to themselves provide a lot of method implementations.
Also, extension functions are easier to test as there is only one implementation to be tested.

<a name="methods"><b>Methods</b></a>

`AsyncIterator<T1>.map(Mapper<T1, T2>) : AsyncIterator<T2>`

Returns a new `AsyncIterator` that consists the original items after they have been applied to the `Mapper`.

`AsyncIterator<T>.filter(Predicate<T>) : AsyncIterator<T>`

Returns a new `AsyncIterator` that contains those of the original items that match a given `Predicate`.

`AsyncIterator<T>.forEach(Consumer<T>) : Promise`

This method is eager (see below).
Consumes all items of the iterator.
Returns a promise that fulfills/rejects when the iterator ends/errors.

`AsyncIterator<T>.eager() : AsyncIterator<T>`

By default, `AsyncIterator` is lazy, i.e. items are generated on demand.
`.eager()` makes the iterator generate items as quickly as possible,
buffering them until they are further consumed.

`AsyncIterator<T>.throw(?)`

Signals an error back to the source.
It is the source's decision whether this should terminate the iterator with an error.
The source could also catch the error and ignore it.

`AsyncIterator<T>.return(?)`

Signals end of consumption back to the source.
It is the source's decision whether it should stop generating items and therefore end the iterator.

`AsyncIterator<T>.collect() : Promise<Array<T>>`

Collects all items from the iterator into an array.

<a name="interfaces"><b>Other Definitions</b></a>

`Mapper<T1, T2> : (T1 => T2)`

A function that transforms an item of type `T1` into an item of type `T2`.

`Consumer<T> : (T => void)`

A function that takes an argument and returns no result.

`Predicate<T> : (T => boolean)`

A function that takes an argument and returns true/false.


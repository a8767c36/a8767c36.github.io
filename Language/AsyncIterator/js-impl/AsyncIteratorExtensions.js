
const AsyncIteratorProto = (async function* () { }).prototype.__proto__;

AsyncIteratorProto.forEach = async function (consumer) {
	for await (let item of this) {
		await consumer(item);
	}
};

AsyncIteratorProto.map = async function* (mapper) {
	for await (let item of this) {
		yield mapper(item);
	}
};

AsyncIteratorProto.filter = async function* (predicate) {
	for await (let item of this) {
		if (await predicate(item)) {
			yield item;
		}
	}
};

AsyncIteratorProto.eager = function () {
	let asyncIt = (async function* () {
		let buffer = [ ];
		let callback = () => null;
		let is_errored = false;
		let is_ended   = false;
		let error_value = null;
		let end_value   = null;
		this
			.forEach(item => {
				buffer.push(item);
				callback();
			})
			.then(end => {
				is_ended = true;
				end_value = end;
				callback();
			})
			.catch(error => {
				is_errored = true;
				error_value = error;
				callback();
			});
		yield;
		while (true) {
			let p = new Promise(f => callback = f);
			yield* buffer;
			if (is_errored)  throw error_value;
			if (is_ended  )  return end_value;
			await p;
		}
	}).call(this);
	asyncIt.next();
	return asyncIt;
};

AsyncIteratorProto.collect = async function () {
	let buffer = [ ];
	for await (let item of this) {
		buffer.push(item);
	}
	return buffer;
};

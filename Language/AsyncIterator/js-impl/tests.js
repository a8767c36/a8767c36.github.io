


export async function test_forEach () {
	await fromList([1, 2, 5, 4])
		.forEach(item => console.log(`Got item: ${item}`));
}

export async function test_map () {
	await fromList([1, 2, 5, 4])
		.map(item => item * item)
		.forEach(item => console.log(`Got item: ${item}`));
}

export async function test_filter () {
	await fromList([1, 2, 5, 4])
		.filter(item => item % 2 == 0)
		.forEach(item => console.log(`Got item: ${item}`));
}

export async function test_eager () {
	await fromList([1, 2, 5, 4])
		.map(x => console.log(x))
		.eager();
}

export async function test_collect () {
	console.log(
		await fromList([1, 2, 5, 4]).collect()
	);
}






async function* fromList (list) {
	for await (let item of list) {
		yield item;
	}
}

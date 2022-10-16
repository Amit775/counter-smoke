export function withoutId<S, T extends S & { id: any }>(obj: T): S {
	delete obj.id;
	return obj;
}
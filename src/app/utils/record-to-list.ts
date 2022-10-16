import { WithId } from "./with-id.type";

export function recordToList<T>(items: { [id: string]: T }): WithId<T>[] {
	return Object.entries(items).map(
		([id, item]) => ({ id, ...item } as WithId<T>)
	);
}
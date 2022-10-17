import { WithId } from "./with-id.type";
import { withoutId } from "./without-id";

export function listToRecord<T, V = unknown>(items: WithId<T>[], value?: V): Record<string, T | V> {
	return items.reduce((result, item) => {
		result[item.id] = value ?? withoutId(item);
		return result;
	}, {} as Record<string, T | V>);
}

export function listToRecordAsKeys<T>(items: string[], value: T): Record<string, T> {
	return items.reduce((result, item) => {
		result[item] = value;
		return result;
	}, {} as Record<string, T>)
}
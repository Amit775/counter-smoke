import { WithId } from "../utils/with-id.type";

export type SmokeContent = {
	timestamp: number;
	labels: Record<string, true>;
	id?: string;
};

export type ISmoke = WithId<SmokeContent>;

export const createEmptySmoke = (timestamp: number = Date.now()): SmokeContent => ({
	timestamp,
	labels: {},
});

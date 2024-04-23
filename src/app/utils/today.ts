export const today = (timestamp: number) => {
	const smokeDate = new Date(timestamp).setHours(0, 0, 0, 0);
	const todayDate = new Date().setHours(0, 0, 0, 0);
	return smokeDate === todayDate;
};

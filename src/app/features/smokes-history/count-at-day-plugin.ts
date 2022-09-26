import { DayElement, Instance } from "flatpickr/dist/types/instance";
import { Plugin } from "flatpickr/dist/types/options";

export function CountAtDayPlugin(counts: Record<number, number>): Plugin {
	return (flatpickr: Instance) => {
		function setCounts() {
			const days = flatpickr.days.childNodes
		}

		function onDayCreate(dates: Date[], dateString: string, instance: Instance, dayElement: DayElement): void {
			const count = counts[dayElement.dateObj.valueOf()];
			dayElement.innerHTML += `<span class="day-count-wrapper"><span class="day-count ${+dayElement.innerHTML<10 ? 'correct-single-dates' : ''}">${count ?? 0}</span></span>`
		}
		return {
			onDayCreate,
			onReady: [
				() => flatpickr.loadedPlugins.push('count-at-day')
			]
		}
	}
}
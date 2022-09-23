import { Directive, Input, ViewContainerRef } from "@angular/core";

@Directive({
	standalone: true,
	selector: 'ng-template[lazy]',
})
export class LazyDirective<C> {

	@Input('lazy') set name(name: string) {
		console.log(name);
		this.host.clear();
		if (name == null) return;

		this.loadComponent(name);
	}
	constructor(private host: ViewContainerRef) { }

	private async loadComponent(name: string): Promise<void> {
		const module = await import(`src/app/features/${name}/${name}.component`);
		this.host.createComponent(module['ISmokeComponent']);
	}
}
import { signalStore } from '@ngrx/signals';
import { withInitializedFeature } from './fearures/initialized.feature';
import { withLabelsFeature } from './fearures/labels.feature';
import { withLoadingFeature } from './fearures/loading.feature';
import { withShortcutFeature } from './fearures/shortcut.feature';
import { withSmokerFeature } from './fearures/smoker.feature';
import { withSmokesFeature } from './fearures/smokes.feature';

export const Store = signalStore(
	{ providedIn: 'root' },
	withInitializedFeature(),
	withShortcutFeature(),
	withLoadingFeature(),
	withSmokesFeature(),
	withLabelsFeature(),
	withSmokerFeature()
);

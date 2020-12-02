import { combineReducers } from 'redux';
import ingredients from './ingredient_cocktail';
import descriptions from './description_cocktail';
import gouts from './gout_cocktail';
import aliases from './alias_ingredient';
import family_of from './family_ingredient';
import filter_family_of from './filter_family_of';

export default combineReducers({
	ingredients,
	descriptions,
	gouts,
	aliases,
	family_of,
	filter_family_of,
});
import { combineReducers } from 'redux';
import ingredients from './ingredient_cocktail';
import descriptions from './description_cocktail';
import gouts from './gout_cocktail';
import aliases from './alias_ingredient';
export default combineReducers({
	ingredients,
	descriptions,
	gouts,
	aliases,
});

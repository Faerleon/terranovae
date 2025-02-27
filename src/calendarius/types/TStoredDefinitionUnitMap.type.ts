import { TOptionsBaseUnit } from './TOptionsBaseUnit.type';
import { TOptionsDerivedUnit } from './TOptionsDerivedUnit.type';

/** the defined system is stored into a map */
export type TStoredDefinitionUnitMap = Map<
	string,
	TOptionsBaseUnit | TOptionsDerivedUnit
>;

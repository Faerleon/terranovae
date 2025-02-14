import {
  Args,
  BaseUnit,
  DefinedSystem,
  DerivedUnit,
  UnitDefinition,
} from './types';

/**
 *
 * @param args
 */
export function createUnitDefinition(args: Args): DefinedSystem {
  const definedSystem: DefinedSystem = {
    list: new Map<string, BaseUnit | DerivedUnit>(),
  };

  /**
   *
   * @param name
   * @param definedBy
   */
  const define = (name: string, definedBy: UnitDefinition) => {
    let inBase = 0;
    // get all units in the definition and check if they exist
    for (const definitionFragment of definedBy) {
      const [defByName] = definitionFragment;
      const alreadyDefined =
        definedSystem.list.get(definitionFragment[0]) !== undefined;
      if (!alreadyDefined) throw new Error('ERR_NO_DEFINITION: ' + defByName);

      // calculate each unit into its child unit until the base unit is used
      const convertedToBaseUnit = convertToBaseUnit(
        definitionFragment,
        definedSystem,
      );
      inBase += convertedToBaseUnit;
    }

    // store that value
    definedSystem.list.set(name, { name, inBase });
  };

  /**
   *
   * @param name
   */
  const base = (name: string) => {
    definedSystem.list.set(name, { name, base: true });
  };

  args(define, base);

  return definedSystem;
}

/**
 *
 * @param definitionFragment
 * @param definedSystem
 */
function convertToBaseUnit(
  definitionFragment: [string, number],
  definedSystem: DefinedSystem,
): number {
  const [name, value] = definitionFragment;
  const child = definedSystem.list.get(name);
  if ((child as BaseUnit).base) return value;
  return (child as DerivedUnit).inBase * value;
}

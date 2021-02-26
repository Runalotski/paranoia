// Import Modules
import { paranoiaActor } from "./actor/actor.js";
import { paranoiaActorSheet } from "./actor/actor-sheet.js";
import { paranoiaItem } from "./item/item.js";
import { paranoiaItemSheet } from "./item/item-sheet.js";
import { ParanoiaRPGDoDie } from "./paranoiarpgDice.js";
import { ParanoiaRPGComputerDie } from "./paranoiarpgDice.js";

Hooks.once('init', async function() {

  game.paranoia = {
    paranoiaActor,
    paranoiaItem
  };
    
  // Set FVTT version constant
  const is07x = game.data.version.split('.')[1] === '7';

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };
    
    // If the FVTT version is > V0.7.x initalise the Base and Stress dice terms
  if (is07x) {
    CONFIG.Dice.terms['d'] = ParanoiaRPGDoDie;
    CONFIG.Dice.terms['s'] = ParanoiaRPGComputerDie;
  }

  // Define custom Entity classes
  CONFIG.Actor.entityClass = paranoiaActor;
  CONFIG.Item.entityClass = paranoiaItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("paranoia", paranoiaActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("paranoia", paranoiaItemSheet, { makeDefault: true });

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });

  Handlebars.registerHelper('ifEql', function(v1, v2) {
    return v1 == v2;
  });
});
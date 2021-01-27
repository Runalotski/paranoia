// Import Modules
import { paranoiaActor } from "./actor/actor.js";
import { paranoiaActorSheet } from "./actor/actor-sheet.js";
import { paranoiaItem } from "./item/item.js";
import { paranoiaItemSheet } from "./item/item-sheet.js";

Hooks.once('init', async function() {

  game.paranoia = {
    paranoiaActor,
    paranoiaItem
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

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
});
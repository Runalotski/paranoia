/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
import { PARANOIA } from '../config.js'

export class paranoiaActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["paranoia", "sheet", "character"],
      template: "systems/paranoia/templates/actor/actor-sheet.html",
      width: 600,
      height: 600,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    data.dtypes = ["String", "Number", "Boolean"];
    for (let attr of Object.values(data.data.attributes)) {
      attr.isCheckbox = attr.dtype === "Boolean";
    }
      
    for (let [key, abil] of Object.entries(data.data.stats)){
        abil.label = game.i18n.localize(PARANOIA.stats[key])
    }
      
    for (let [key, abil] of Object.entries(data.data.skills)){
        abil.label = game.i18n.localize(PARANOIA.skills[key])
    }
    
    data.actor.data.moxie.icon = this._getClickIcon(data.actor.data.moxie.value, 'moxie');
      
    data.actor.data.treason.icon = this._getClickIcon(data.actor.data.treason.value, 'treason', '<i class="fas fa-star"></i>', '<i class="far fa-star"></i>');
     
    data.actor.data.damage.icon = this._getDamageClickIcon();
      
    return data;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Update Inventory Item
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.getOwnedItem(li.data("itemId"));
      item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      this.actor.deleteOwnedItem(li.data("itemId"));
      li.slideUp(200, () => this.render(false));
    });

    // Rollable abilities.
    html.find('.rollable').click(this._onRoll.bind(this));
      
    html.find('.click-stat-level').on('click contextmenu', this._onClickStatLevel.bind(this)); // Toggle for radio buttons
  }

  /* -------------------------------------------- */

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      data: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data["type"];

    // Finally, create the item!
    return this.actor.createOwnedItem(itemData);
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if (dataset.roll) {
      let roll = new Roll(dataset.roll, this.actor.data.data);
      let label = dataset.label ? `Rolling ${dataset.label}` : '';
      consol.log(roll.roll())
      roll.roll().toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label
      });
    }
  }
    
  _onClickStatLevel(event) {
    event.preventDefault();
    this.actor.checkMarks(this.actor, event);
    this._onSubmit(event);
  }
    
  _getClickIcon(level, stat, usedPoint = '<i class="fas fa-circle"></i>', unUsedPoint = '<i class="far fa-circle"></i>') {
    const maxPoints = this.object.data.data[stat].max;
    const icons = {};

    for (let i = 0; i <= maxPoints; i++) {
      let iconHtml = '';

      for (let iconColumn = 1; iconColumn <= maxPoints; iconColumn++) {
        iconHtml += iconColumn <= i ? usedPoint : unUsedPoint;
      }

      icons[i] = iconHtml;
    }

    return icons[level];
  }
    
    _getDamageClickIcon() {
    const damageLabels = ['<div class="trackdata-value">hurt</div>',
                         '<div class="trackdata-value">injured</div>',
                         '<div class="trackdata-value">maimed</div>',
                         '<div class="trackdata-value">dead</div>']
    const maxPoints = this.object.data.data.damage.max;
    const icons = {};
    const usedPoint = '<i class="trackdata-value fas fa-check-square"></i>';
    const unUsedPoint = '<i class="trackdata-value far fa-square"></i>';

    for (let i = 0; i <= maxPoints; i++) {
      let iconHtml = '';

      for (let iconColumn = 1; iconColumn <= maxPoints; iconColumn++) {
        iconHtml += damageLabels[iconColumn-1];
        iconHtml += iconColumn <= i ? usedPoint : unUsedPoint;
      }

      icons[i] = iconHtml;
    }
        
    return icons[this.object.data.data.damage.value];
  }

}

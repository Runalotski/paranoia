export class ParanoiaRPGDoDie extends Die {
  constructor(termData) {
    termData.faces = 6;
    super(termData);
  }

  /* -------------------------------------------- */

  /** @override */
  static DENOMINATION = 'd';

  /** @override */
  get total() {
    return this.results.length;
  }

  /* -------------------------------------------- */

  /** @override */
  static getResultLabel(result) {
    return {
      1: '<img src="systems/paranoia/ui/die/paranoia-dice-w1.png" />',
      2: '<img src="systems/paranoia/ui/die/paranoia-dice-w1.png" />',
      3: '<img src="systems/paranoia/ui/die/paranoia-dice-w1.png" />',
      4: '<img src="systems/paranoia/ui/die/paranoia-dice-w1.png" />',
      5: '<img src="systems/paranoia/ui/die/paranoia-dice-w6.png" />',
      6: '<img src="systems/paranoia/ui/die/paranoia-dice-w6.png" />',
    }[result];
  }
}
export class ParanoiaRPGComputerDie extends Die {
  constructor(termData) {
    termData.faces = 6;
    super(termData);
  }

  /* -------------------------------------------- */

  /** @override */
  static DENOMINATION = 's';

  /** @override */
  get total() {
    return this.results.length;
  }

  /* -------------------------------------------- */

  /** @override */
  static getResultLabel(result) {
    return {
      1: '<img src="systems/paranoia/ui/die/paranoia-dice-bc.png" />',
      2: '<img src="systems/paranoia/ui/die/paranoia-dice-b1.png" />',
      3: '<img src="systems/paranoia/ui/die/paranoia-dice-b1.png" />',
      4: '<img src="systems/paranoia/ui/die/paranoia-dice-b1.png" />',
      5: '<img src="systems/paranoia/ui/die/paranoia-dice-b1.png" />',
      6: '<img src="systems/paranoia/ui/die/paranoia-dice-b1.png" />',
    }[result];
  }
}

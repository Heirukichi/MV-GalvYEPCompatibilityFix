/*:
 * @plugindesc
 * Version 1.0.1
 * - Last update: 01-03-2020 [MM-DD-YYYY] by Heirukichi
 *
 * @author Heirukichi - heirukichiworks.wordpress.com
 *
 * @help
 * This is an appendix of HRK_GalvYepMC_CompatibilityFix.js. Without it, this
 * plugin does not work. This small piece of code restores the waving effect of
 * SRD Shaking Text plugin. Be sure to place this below it.
 *
 * This plugin is under the same license as HRK_GalvYepMC_CompatibilityFix
 * plugin. Check it for more information.
 *
 * ----------------------------------------------------------------------------
 * WARNING
 * ----------------------------------------------------------------------------
 * When adjusting your message window size, this plugin only allows you to move
 * each character by half of its height, any movement that shifts the original
 * position by more than that might result in the engine creating a new line in
 * your message window to have enough space to move your text characters.
 */
(function() {
//-----------------------------------------------------------------------------
// * Create Shaking Character
//-----------------------------------------------------------------------------
HRK.GYCFix.Window_Message.createShakingChar =
    Window_Message.prototype.createShakingCharacter;
Window_Message.prototype.createShakingCharacter = function(textState, c, w, h){
  HRK.GYCFix.Window_Message.createShakingChar.call(this, textState, c, w, h);
  var lastSpr = this._shakingSprites.length - 1;
  if (this._shakingSprites[lastSpr].y > this._extraHeight) {
    var sprHeight = this._shakingSprites[lastSpr].height
    this._extraHeight = this._shakingSprites[lastSpr].y + sprHeight / 2;
    this.adjustDynamicBoxHeight();
  }
}; // Create Shaking Character
})();
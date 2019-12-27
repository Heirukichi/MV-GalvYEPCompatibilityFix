/*:
 * @plugindesc
 * Version 1.0.0
 * - Last update: 12-27-2019 [MM-DD-YYYY] by Heirukichi
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
    this._extraHeight = this._shakingSprites[lastSpr].y + sprHeight - 1;
    this.adjustDynamicBoxHeight();
  }
}; // Create Shaking Character
})();

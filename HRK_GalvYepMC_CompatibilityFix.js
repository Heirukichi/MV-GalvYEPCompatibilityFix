/*****************************************************************************
 * HEIRUKICHI COMPATIBILITY FIX FOR GALV'S MESSAGE STYLES AND YANFLY MESSAGE
 * CORE PLUGINS
 * ---------------------------------------------------------------------------
 * HRK_GalvYepMC_CompatibilityFix.js
 * ---------------------------------------------------------------------------
 * @version 0.1.0
 * @author Heirukichi
 * - Last update: 12-21-2019 [MM-DD-YYYY]
 * ---------------------------------------------------------------------------
 * REQUIRED FILES
 * ---------------------------------------------------------------------------
 * - GALV_MessageStyles.js
 * - YEP_MessageCore.js
 *****************************************************************************/ 
//-----------------------------------------------------------------------------
// Set Imported Value
//-----------------------------------------------------------------------------
var Imported = Imported || {};
Imported.HRK_GYMC_CompatibilityFix = true;
//-----------------------------------------------------------------------------
// Set New Objects
//-----------------------------------------------------------------------------
var HRK = HRK || {};
HRK.GYCFix = HRK.GYCFix || {};
HRK.GYCFix.Window_Message = HRK.GYCFix.Window_Message || {};
/*:
 * @plugindesc
 * Version 0.1.0
 * - Last update: 12-21-2019 [MM-DD-YYYY] by Heirukichi
 *
 * @author Heirukichi - heirukichiworks.wordpress.com
 *
 * @param Message Window Settings
 * @default
 *
 * @param Text-Based Height
 * @parent Message Window Settings
 * @type boolean
 * @on YES
 * @off NO
 * @desc
 * Calculate messages height based on text height?
 * If set to false, Dynamic Window Height is ignored.
 * @default true
 *
 * @param Dynamic Window Height
 * @parent Message Window Settings
 * @type boolean
 * @on YES
 * @off NO
 * @desc
 * Set dynamic window height?
 * If set to true, other ways to adjust messages height are ignored.
 * @default true
 *
 * @help
 * ============================================================================
 * HEIRUKICHI'S COMPATIBILITY FIX FOR GALV MESSAGE STYLES AND YEP MESSAGE CORE
 * ============================================================================
 * DESCRIPTION
 * ----------------------------------------------------------------------------
 * This plugin fixes compatibility issues between Galv's Message Styles and YEP
 * Message Core. The main issue addressed by this plugin is the one concerning
 * word wrapping.
 *
 * ----------------------------------------------------------------------------
 * REQUIREMENTS
 * ----------------------------------------------------------------------------
 * This plugin is meant as a fix for compatibility issues between YEP Message
 * Core and Galv Message Styles, as such, both those plugins are required to
 * use this plugin. Without them, this plugin is useless (if not harmful).
 *
 * ----------------------------------------------------------------------------
 * INSTRUCTIONS
 * ----------------------------------------------------------------------------
 * To use this plugin install it in your project and be sure to place it right
 * below Galv Message Styles plugin, which, on the other hand, should be placed
 * right after YEP Message Core. This guarantees that no other plugin interacts
 * with this fix.
 *
 * If you are using other plugins that require one of the two aforementioned
 * ones to work, you can place them after this one.
 *
 * ----------------------------------------------------------------------------
 * TERMS OF USE
 * ----------------------------------------------------------------------------
 * This plugin is under the GNU General Public License 3.0, this means that:
 *
 * - You are free to use this script for both commercial and non-commercial
 *   projects as long as proper credit is given to me (Heirukichi) and a link
 *   to my webside is provided (https://heirukichiworks.wordpress.com);
 * - You can modify this script as long as the modified script is distributed
 *   under the same license as the original and a link to the original is also
 *   provided.
 *
 * You can review the complete license here:
 * https://www.gnu.org/licenses/gpl-3.0.html
 *
 * IMPORTANT NOTICE
 * If you want to distribute this plugin, instead of pasting the whole code,
 * provide a link to my website instead.
 *
 * IMPORTANT NOTICE 2
 * When modifying this code, change its version number according to the changes
 * you made and modify the description to show who edited it and what version
 * you contributed to.
 *
 * Example:
 * John Smith edits the code and upgrades it to version 1.5.1
 * The plugin description has to show this:
 * - Last edit: MM-DD-YYYY by John Smith, version 1.5.1
 */
(function() {  
//-----------------------------------------------------------------------------
// ** Window_Message
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// * Process New Line Alias Handler
//-----------------------------------------------------------------------------
HRK.GYCFix.Window_Message.procNLOld = Window_Message.prototype.processNewLine;
HRK.GYCFix.Window_Message.processNewLine = function(textState) {
  this._lineShowFast = false;
  Window_Base.prototype.processNewLine.call(this, textState);
  if (this.needsNewPage(textState) && !Galv.Mstyle.testActive)
    this.startPause();
}; // Process New Line Alias Handler

//-----------------------------------------------------------------------------
// * Process New Line
//-----------------------------------------------------------------------------
Window_Message.prototype.processNewLine = function(textState) {
  if (Imported.Galv_MessageStyles)
    return HRK.GYCFix.Window_Message.processNewLine.call(this, textState);
  return HRK.GYCFix.Window_Message.procNLOld.call(this, textState);
}; // Process New Line

//-----------------------------------------------------------------------------
// * Set Word Wrap
//-----------------------------------------------------------------------------
HRK.GYCFix.Window_Message.setWordWrap = Window_Base.prototype.setWordWrap;
Window_Base.prototype.setWordWrap = function(text) {
  text = HRK.GYCFix.Window_Message.setWordWrap.call(this, text);
  console.log("Word Wrap attirbute: " + this._wordWrap);
  if (this._wordWrap)
    this._totalLines = 1;
  return (text);
}; // Set Word Wrap

//-----------------------------------------------------------------------------
// * Process Normal Character
//-----------------------------------------------------------------------------
HRK.GYCFix.Window_Message.processNormalCharacter = 
    Window_Base.prototype.processNormalCharacter;
Window_Base.prototype.processNormalCharacter = function(textState) {
  if (Imported.YEP_MessageCore) {
    if (this.checkWordWrap(textState)) {
      this._totalLines += 1;
      var newHeight = this.fittingHeight(this._totalLines);
      this.height = Math.max(this.height, newHeight);
      return this.processNewLine(textState);
    }
    Yanfly.Message.Window_Base_processNormalCharacter.call(this, textState);
  } else
    HRK.GYCFix.Window_Message.processNormalCharacter;
}; // Process Normal Character

//-----------------------------------------------------------------------------
// * Face Offset
//-----------------------------------------------------------------------------
HRK.GYCFix.Window_Message.faceOffset = function() {
  var foffset = Window_Base._faceWidth + 25;
  if (Imported.Galv_MessageStyles)
    foffset = (($gameMessage.bustPos == 1) ? 0 : Galv.MB.w);
  return foffset;
}; // Face Offset

//-----------------------------------------------------------------------------
// * Horizontal Offset
//-----------------------------------------------------------------------------
HRK.GYCFix.Window_Message.horzOffset = function() {
  var horzPadding = 0;
  if ($gameMessage._faceName)
    horzPadding += HRK.GYCFix.Window_Message.faceOffset();
  if (Imported.Galv_MessageStyles)
    horzPadding += Galv.Mstyle.padding[1] + Galv.Mstyle.padding[3];
  return horzPadding;
}; // Horizontal Offset

//-----------------------------------------------------------------------------
// * Galv Message Styles Text Width
//-----------------------------------------------------------------------------
HRK.GYCFix.Window_Message.galvWidth = function() {
  var minWidth = 0;
  if (Imported.YEP_MessageCore)
    return this.wordwrapWidth();
  for (var i = 0; i < $gameMessage._texts.length; i++) {
    var lineWidth = this.testWidthEx($gameMessage._texts[i]);
    if (minWidth < lineWidth)
      minWidth = lineWidth;
  }
  return minWidth;
}; // Galv Message Styles Text Width

//-----------------------------------------------------------------------------
// * Caclulate Text Width
//-----------------------------------------------------------------------------
HRK.GYCFix.Window_Message.textWidth = function() {
  var minWidth = 0;
  var xO = HRK.GYCFix.Window_Message.horzOffset();
  var maxWidth = Graphics.boxWidth;
  if (Imported.YEP_MessageCore)
    maxWidth = Math.min(Yanfly.Param.MSGDefaultWidth, maxWidth);
  if (Imported.Galv_MessageStyles)
    minWidth = HRK.GYCFix.Window_Message.galvWidth.call(this);
  else
    minWidth = maxWidth;
  return Math.min(maxWidth, minWidth + this.standardPadding() * 2 + xO);
}; // Calculate Text Width

//-----------------------------------------------------------------------------
// * Calculate Total Text Width
//-----------------------------------------------------------------------------
HRK.GYCFix.Window_Message.totTextWidth = function() {
  var textW = HRK.GYCFix.Window_Message.textWidth.call(this);
  return Math.min(Graphics.boxWidth, textW);
}; // Calculate Total Text Width

//-----------------------------------------------------------------------------
// * Minimum Lines Height
//-----------------------------------------------------------------------------
HRK.GYCFix.Window_Message.minLinesHeight = function() {
  if ($gameMessage._faceName)
    return (Window_Base._faceHeight + this.standardPadding() * 2);
  return 0;
}; // Minimum Lines Height

//-----------------------------------------------------------------------------
// * Change Window Dimensions
//-----------------------------------------------------------------------------
Window_Message.prototype.changeWindowDimensions = function() {
	if (this.pTarget != null) {
		var h = 0;
    var textWidth = 0;
		var minFaceHeight = HRK.GYCFix.Window_Message.minLinesHeight.call(this);
		this.resetFontSettings();
    textWidth = HRK.GYCFix.Window_Message.totTextWidth.call(this);
		this.resetFontSettings();
		this.width = Math.min(Graphics.boxWidth,textWidth);
		
		// Calculate minimum lines
		if ($gameMessage._faceName) {
			textWidth += 15;
			if (Imported.Galv_MessageBusts) {
				if ($gameMessage.bustPos == 1) textWidth += Galv.MB.w;
				minFaceHeight = 0;
			}
		};
		
		// Calculate text height
		var textState = { index: 0 };
		textState.text = this.convertEscapeCharacters($gameMessage.allText());
		var allLineHeight = this.calcTextHeight(textState,true);
		var height = allLineHeight + this.standardPadding() * 2;
		var minHeight = this.fittingHeight($gameMessage._texts.length);
		this.height = Math.max(height,minHeight,minFaceHeight);
		this.height += Galv.Mstyle.padding[0] + Galv.Mstyle.padding[2];
		this.yOffset = -Galv.Mstyle.yOffet - this.height;
		
	} else {
		this.yOffset = 0;
		this.width = this.windowWidth();
		this.height = Galv.Mstyle.Window_Message_windowHeight.call(this);
		this.x = (Graphics.boxWidth - this.width) / 2;
	};
};
})(); // End of HRK_GalvYepMC_CompatibilityFix plugin

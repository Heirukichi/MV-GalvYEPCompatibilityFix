/*****************************************************************************
 * HEIRUKICHI COMPATIBILITY FIX FOR GALV'S MESSAGE STYLES AND YANFLY MESSAGE
 * CORE PLUGINS
 * ---------------------------------------------------------------------------
 * HRK_GalvYepMC_CompatibilityFix.js
 * ---------------------------------------------------------------------------
 * @version 0.1.0
 * @author Heirukichi
 * - Last update: 12-20-2019 [MM-Dd-YYYY]
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
 * @plugindesc v.0.1.0 - Last update: 12-20-2019 [MM-DD-YYYY] by Heirukichi
 *
 * @author Heirukichi - heirukichiworks.wordpress.com
 *
 *
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
// * Caclulate Text Width
//-----------------------------------------------------------------------------
HRK.GYCFix.Window_Message.textWidth = function() {
  var minWidth = 0;
  var xO = HRK.GYCFix.Window_Message.horzOffset();
  var maxWidth = Graphics.boxWidth;
  // Check if YEP_MessageCore is imported
  if (Imported.YEP_MessageCore)
    maxWidth = Math.min(Yanfly.Param.MSGDefaultWidth, maxWidth);
  // Calculate Maximum Width for Text
  if (Imported.Galv_MessageStyles) {
    if (!Imported.YEP_MessageCore) {
      for (var i = 0; i < $gameMessage._texts.length; i++) {
        var lineWidth = this.testWidthEx($gameMessage._texts[i]);
        if (minWidth < lineWidth)
          minWidth = lineWidth;
      }
    }
    else
      minWidth = this.wordwrapWidth():
  }
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
// * Change Window Dimensions
//-----------------------------------------------------------------------------
Window_Message.prototype.changeWindowDimensions = function() {
	if (this.pTarget != null) {
		// Calc max width and line height to get dimensions
		var w = 10;
		var h = 0;
    var textWidth = 0;

		// Calc text width
		this.resetFontSettings();
    textWidth = HRK.GYCFix.Window_Message.totTextWidth.call(this);
		this.resetFontSettings();
		this.width = Math.min(Graphics.boxWidth,w);
		
		// Calc minimum lines
		var minFaceHeight = 0;
		if ($gameMessage._faceName) {
			w += 15;
			if (Imported.Galv_MessageBusts) {
				if ($gameMessage.bustPos == 1) w += Galv.MB.w;
				minFaceHeight = 0;
			} else {
				minFaceHeight = Window_Base._faceHeight + this.standardPadding() * 2;
			};
		};
		
		// Calc text height
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
/*****************************************************************************
 * HEIRUKICHI COMPATIBILITY FIX FOR GALV'S MESSAGE STYLES AND YANFLY MESSAGE
 * CORE PLUGINS
 * ---------------------------------------------------------------------------
 * HRK_GalvYepMC_CompatibilityFix.js
 * ---------------------------------------------------------------------------
 * @version 1.0.1
 * @author Heirukichi
 * - Last update: 12-27-2019 [MM-DD-YYYY]
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
Imported.HRK_GalvYepMC_CompatibilityFix = true;
//-----------------------------------------------------------------------------
// Set New Objects
//-----------------------------------------------------------------------------
var HRK = HRK || {};
HRK.GYCFix = HRK.GYCFix || {};
HRK.GYCFix.Window_Message = HRK.GYCFix.Window_Message || {};
/*:
 * @plugindesc
 * Version 1.0.1
 * - Last update: 12-27-2019 [MM-DD-YYYY] by Heirukichi
 *
 * @author Heirukichi - heirukichiworks.wordpress.com
 *
 * @param Message Window Settings
 * @default
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
 * @param Top Offset
 * @parent Message Window Settings
 * @type number
 * @desc
 * Distance between the bottom of the sprite and the window.
 * This only applies to messages displayed above characters (Top option).
 * @default
 * 150
 *
 * @param Bottom Offset
 * @parent Message Window Settings
 * @type number
 * @desc
 * Distance between the bottom of the sprite and the window.
 * Only used for messages displayed below characters (Bottom option).
 * @default
 * 50
 *
 * @param Horizontal Offset
 * @parent Message Window Settings
 * @type number
 * @desc
 * Horizontal distance between the sprite and the window.
 * Only used for messages that use the Middle option.
 * @default
 * 50
 *
 * @param Middle Text Side
 * @parent Message Window Settings
 * @type boolean
 * @desc
 * @on RIGHT
 * @off LEFT
 * @desc
 * Message position in relation to the sprite.
 * @default
 * true
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
 * ============================================================================
 * REQUIREMENTS
 * ----------------------------------------------------------------------------
 * This plugin is meant as a fix for compatibility issues between YEP Message
 * Core and Galv Message Styles, as such, both those plugins are required to
 * use this plugin. Without them, this plugin is useless (if not harmful).
 *
 * ============================================================================
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
 * Show Text
 * ----------------------------------------------------------------------------
 * This plugin affects the Show Text event command. It greatly changes how the
 * message position is processed. When using this plugin, the text position
 * defined in the said event command is treated as a mere preference, there are
 * no absolutes in where your text is displayed.
 *
 * The plugin automatically moves your message in a place where the player is
 * able to read it. This means that, if there is no space above one character
 * and the message is supposed to be displayed using the "Top" feature, it will
 * still be moved below the speaking character.
 *
 * The same applies to the plugin parameter used to display messages making use
 * of the "Middle" feature. You can express a preference, but if the message
 * meets the edge of the screen, it will be automatically displayed on the
 * opposite side.
 *
 * ----------------------------------------------------------------------------
 * WARNING
 * ----------------------------------------------------------------------------
 * The plugin automatically moves the message because, when the charcter is too
 * close to one side, it means that there is enough space on the other side,
 * however, this is no longer true if your message is too big (either wide or
 * tall). Always check your total message height and width to make sure that it
 * fits at least in one position.
 *
 * In addition, try to avoid using very wide messages when displaying them on
 * one side, it is possible to display a message that is 600 pixels wide if the
 * speaking character is positioned closer to one edge of the screen, but when
 * the space left is not enough, the large message will be moved regardless of
 * its total size, making it impossible to read. The maximum width for side
 * messages should be
 * (total resolution width / 2 - horizontal offset - tile size)
 * Anything bigger than that is better displayed above or below the speaking
 * character.
 *
 * ============================================================================
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
// * Parameters
//-----------------------------------------------------------------------------
HRK.Parameters = PluginManager.parameters('HRK_GalvYepMC_CompatibilityFix');
HRK.Param = HRK.Param || {};
HRK.Param.DynamicHeight = (HRK.Parameters['Dynamic Window Height'] == "true");
HRK.Param.VertDistTop = Number(HRK.Parameters['Top Offset']);
HRK.Param.VertDistBot = Number(HRK.Parameters['Bottom Offset']);
HRK.Param.HorzDist = Number(HRK.Parameters['Horizontal Offset']);
HRK.Param.MidTextPos = (HRK.Parameters['Middle Text Side'] == "true") ? 0 : -1;
HRK.Param.MidTextMod = (HRK.Parameters['Middle Text Side'] == "true") ? 1 : -1;

//=============================================================================
// ** Window_Message
//=============================================================================

//-----------------------------------------------------------------------------
// * Initialize
//-----------------------------------------------------------------------------
HRK.GYCFix.Window_Message.initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function() {
  HRK.GYCFix.Window_Message.initialize.call(this);
  this.xOffset = 0;
}; // Initialize

//-----------------------------------------------------------------------------
// * Horizontal Shifted Position
//-----------------------------------------------------------------------------
Window_Message.prototype.horzShiftPos = function() {
  var widthMod = this._horzPosExtra * this.width;
  var tileShift = this._horzPosMod * -24; // 24 is half a tile width
  var tailShift =
      this._horzPosMod * (this._tailSprite.height + HRK.Param.HorzDist);
  return widthMod + tailShift + tileShift;
}; // Horizontal Shifted Position

//-----------------------------------------------------------------------------
// * Out Of Screen
//-----------------------------------------------------------------------------
Window_Message.prototype.outOfScreen = function(xPos, horzShift) {
  if (xPos + horzShift < 0)
    return true;
  if (xPos + horzShift + this.width > Graphics.boxWidth)
    return true;
  return false;
}; // Out of Screen

//-----------------------------------------------------------------------------
// * Switch Horizontal Side
//-----------------------------------------------------------------------------
Window_Message.prototype.switchHorzSide = function() {
  if ($gameMessage._positionType != 1)
    return;
  this._horzPosExtra = (-1 - this._horzPosExtra);
  this._horzPosMod *= -1;
}; // Switch Horizontal Side

//-----------------------------------------------------------------------------
// * Update Horizontal Position
//-----------------------------------------------------------------------------
Window_Message.prototype.updateHorzPos = function() {
  var posX = this.pTarget.screenX();
  if ($gameMessage._positionType == 1) {
    this._horzPosMod = HRK.Param.MidTextMod;
    this._horzPosExtra = HRK.Param.MidTextPos;
    if (this.outOfScreen(posX, this.horzShiftPos()))
      this.switchHorzSide();
    posX += this.horzShiftPos();
  } else {
    posX -= this.width / 2;
  }
  if (posX + this.width > Graphics.boxWidth) {
    posX = Graphics.boxWidth - this.width;
  } else if (posX < 0) {
    posX = 0;
  }
  this.x = posX;
  this._tailSprite.x = this.pTarget.screenX() - this.x;
  if ($gameMessage._positionType == 1)
    this._tailSprite.x += (26 + HRK.Param.VertDistBot) * this._horzPosMod;
  // The 26 above comes from half a tile + 2 pixels. Both are fixed values.
}; // Update Horizontal Position

//-----------------------------------------------------------------------------
// * Update Vertical Position
//-----------------------------------------------------------------------------
Window_Message.prototype.updateVertPos = function() {
  var posY = this.pTarget.screenY() + this.yOffset;
  if ($gameMessage._positionType == 1)
    posY += (HRK.Param.VertDistBot - HRK.Param.VertDistTop) / 2;
  if (posY + this.height > Graphics.boxHeight) {
    var maxY = Graphics.boxHeight - this.height;
    var galvPopY = this.pTarget.screenY() - Galv.Mstyle.yOffset - this.height;
    posY = Math.min(maxY, galvPopY);
    this.tailPos = 0;
  } else if (posY < 0) {
    posY = Math.max(this.ptarget.screenY() + 15, 0);
    this.tailPos = 2;
  } else {
    this.tailPos = $gameMessage._positionType;
  }
  this.y = posY;
}; // Update Vertical Position

//-----------------------------------------------------------------------------
// * Vertical Tail Position
//-----------------------------------------------------------------------------
Window_Message.prototype.getVertTailPos = function() {
  var yPos = HRK.Param.VertDistBot - HRK.Param.VertDistTop;
  this._tailSprite.scale.y = this._horzPosMod;
  this._tailSprite.y = (this.height + yPos) / 2 + 48;
  this._tailSprite.rotation = Math.PI / 2;
  this._tailSprite.z = this.z + 1;
  this._tailSprite.opacity += 50;
}; // Vertical Tail Position

//-----------------------------------------------------------------------------
// * Update Text Box Position
//-----------------------------------------------------------------------------
Window_Message.prototype.updateTextBoxPosition = function() {
	this.updateHorzPos();
	this.updateVertPos();
	if (this.openness > 200) {
		if (this.tailPos == 1) { // MID
      this.getVertTailPos();
		} else if (this.tailPos == 2) { // BOT
      this._tailSprite.rotation = 0;
			this._tailSprite.y = 2;
			this._tailSprite.scale.y = -1;
			this._tailSprite.opacity += 50;
		} else if (this.tailPos == 0) { // TOP
      this._tailSprite.rotation = 0;
			this._tailSprite.scale.y = 1;
			this._tailSprite.y = this.height - 2;
			this._tailSprite.opacity += 50;
		}
	}
}; // Update Text Box Position

//-----------------------------------------------------------------------------
// * Update Float Placement
//-----------------------------------------------------------------------------
Window_Message.prototype.updateFloatPlacement = function() {
	if (!this._tailSprite) this.createWindowTail();
	if (this.pTarget == null) {
		this._tailSprite.opacity = 0;
		return;
	};
	
	if (this.openness < 255) this._tailSprite.opacity = 0;
	this.updateTextBoxPosition();
	this.updateFloats(this.x,this.width,this.y,this.height);
}; // Update Float Placement

//-----------------------------------------------------------------------------
// * Text Bubble Settings
//-----------------------------------------------------------------------------
HRK.GYCFix.Window_Message.setPSetOld = Window_Message.prototype.setPopSettings;
Window_Message.prototype.setPopSettings = function() {
  this.xOffset = 0;
	this.tailPos = $gameMessage._positionType;
	switch ($gameMessage._positionType) {
    case 0: // TOP
      this.yOffset = -(this.height + HRK.Param.VertDistTop);
      break;
		case 1: // MIDDLE
			this.yOffset = -(this.height / 2);
			break;
		case 2: // BOTTOM
			this.yOffset = HRK.Param.VertDistBot;
	}
}; // Text Bubble Settings

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
  if (this._wordWrap)
    this._totalLines = 1;
  return (text);
}; // Set Word Wrap

//-----------------------------------------------------------------------------
// * Adjust Out Of Screen Box
//-----------------------------------------------------------------------------
Window_Base.prototype.adjustOutOfScreenBox = function() {
  if (this.y + this.height > Graphics.boxHeight) {
    $gameMessage._positionType = 0;
    this.yOffset  = -(this.height + HRK.Param.VertDistTop);
  } else if (this.y < 0) {
    $gameMessage._positionType = 2;
    this.yOffset = HRK.Param.VertDistBot;
  }
} // Adjust Out Of Screen Box

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
      var dY = 0;
      if (HRK.Param.DynamicHeight) {
        dY = this.height - Math.max(this.height, newHeight);
        this.height = Math.max(this.height, newHeight);
      }
      if ($gameMessage._positionType == 0)
        this.yOffset += dY;
      else if ($gameMessage._positionType == 1)
        this.yOffset += dY / 2;
      this.adjustOutOfScreenBox();
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
  if (Imported.Galv_MessageStyles && Imported.Galv_MessageBusts)
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
		this.width = Math.min(Graphics.boxWidth, textWidth);
		
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
		this.yOffset = -Galv.Mstyle.yOffset - this.height;
		
	} else {
		this.yOffset = 0;
		this.width = this.windowWidth();
		this.height = Galv.Mstyle.Window_Message_windowHeight.call(this);
		this.x = (Graphics.boxWidth - this.width) / 2;
	};
}; // Change Window Dimensions

//=============================================================================
 // * Window_NameBox
//=============================================================================

//-----------------------------------------------------------------------------
// * Get New Y Position
//-----------------------------------------------------------------------------
Window_NameBox.prototype.nameY = function() {
  if ($gameMessage.positionType() === 0) {
    this.y = this._parentWindow.y + this._parentWindow.height;
    this.y -= eval(Yanfly.Param.MSGNameBoxBufferY);
  } else {
    this.y = this._parentWindow.y;
    this.y -= this.height;
    this.y += eval(Yanfly.Param.MSGNameBoxBufferY);
  }
}; // Get New Y Position

//-----------------------------------------------------------------------------
// * Adjust Y Position
//-----------------------------------------------------------------------------
HRK.GYCFix.Window_Message.adjustY = Window_NameBox.prototype.adjustPositionY;
Window_NameBox.prototype.adjustPositionY = function() {
  if (Imported.Galv_MessageStyles) {
    this.nameY();
  } else {
    HRK.GYCFix.Window_Message.adjustY.call(this);
  }
}; // Adjust Y Position

})(); // End of HRK_GalvYepMC_CompatibilityFix plugin

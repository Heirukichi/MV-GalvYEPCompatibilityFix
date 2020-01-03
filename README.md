# Galv's Message Styles and YEP Message Core
## Compatibility Fix by Heirukichi
----------
## Description
This plugin, meant for RPG Maker MV, fixes compatibility issues between Galv's Message Styles and YEP Message Core. Not only that, it adds extra features to make life easier when handling messages in your game and also improves the code to make it easier to maintain.

----------
## Table of Contents
* [Description](#description)
* [Installation](#installation)
  * [Required Plugins](#required-plugins)
  * [Parameters Configuration](#parameters-configuration)
  * [Instructions](#instructions)
    * [Warning](#warning)
    * [Macros](#macros)
    * [Shaking Text](#shaking-text)
      * [Warning](#shaking-text-warning)
* [License](#license)
  * [Important Notice](#important-notice)
* [Credits](#credits)

----------
## Installation
I recommend to install this plugin immediately after Galv's Message Styles plugin. I also recommend placing the latter right after YEP Message Core. Doing this will greatly decrease compatibility issues with other plugins.

### Required Plugins
This is a compatibility fix between two different plugins and therefore it requires both of them to run properly. The required plugins are:
* YEP Message Core
* Galv's Message Styles
Both of them have to be installed in your project and active. If either of them is not installed, this plugin is not going to work properly.

### Parameters Configuration
A short description for each parameter can be found in your engine after installing this plugin. Due to its small size, however, the text box in the engine is not meant for long and detailed descriptions. This readme, on the other hand, contains detailed information on each plugin parameter.

Name | Type | Description
---- | ---- | -----------
Dynamic Window Height | Boolean | Tells the engine if messages height has to adapt to the text or not. When false, a fixed window height has to be specified. When true, message boxes change their height as soon as a new line no longer fits. If this value is true, other ways to handle message height are disabled.
Top Offset | Number | This value represents the distance (in pixels) between the bottom of the sprite and the bottom of the message window. It is only used when the Show Text command makes use of the *"Top"* option.
Bottom Offset | Number | Similarly to the previous parameter, this parameter represents the distance (in pixels) between the bottom of the sprite and the top of the messave window. It is only used when the Show Text command makes use of the *"Bottom"* option.
Horizontal Offset | Number | This plugin adds a new feature to display message bubbles even when the *"Middle*" option of the Show Text command is selected. The distance (in pixels) between the edge of the sprite close to the message window and the edge of the message window close to the sprite itself is set using this parameter.
Middle Text Side | Boolean | Message window position **preferred side**. Normally, the engine will try to place messages that make use of the *"Middle"* option on the side defined using this parameter. When this parameter is true, the preferred side is right, when false, it is left.

Everything that cannot be configured in this plugin can be set using YEP Message Core parameters as usual; the same applies to Galv's Message Styles configuration.

### Instructions
When configuring and using this plugin, it is only possible to express a preference regarding the message position. Depending on the message size, the engine might automatically move it to the opposite position. This happens when the message does not fit in the screen.

#### Warning
As mentioned aboge, the engine automatically changes the message position when it does no longer fit in the screen. While this is very useful to make sure that the player is always able to read the text being displayed, it does not guarantee that your message can actually fit in the screen. In order to avoid unpleasant situations where your text is impossible to read, following these two simple rules might be helpful:
* Messages that make use of either the *"Top"* or *"Bottom"* option should have a total height that is less than `(total height - biggest vertical offset - tile height) / 2`;
* Messages that make use of the *"Middle"* option should have a total width that is less than `(total width - horizontal offset - tile width) / 2`.
If these conditions are satisfied, no strange issue should arise.

### Macros
If you are using Yanfly's Macros Extension Plugin together with this plugin, you have to be careful not to include any `\pop[X]` code in your macros. The reason is that Galv's Message Styles plugin looks for matches in the event itself (Game_Interpreter), before Yanfly's macros are converted. Any other macro can be used normally.

### Shaking Text
If you are using SRD Shaking Text plugin, a compatibility option is included. Just add the appendix of this plugin to your plugin list and place it after SRD Shaking Text plugin. Be sure to place the original SRD Shaking Text plugin **below** the main compatibility fix plugin and to place the appendix **after** SRD Shaking Text.

The correct plugin order is the follwing:
1. YEP Message Core
2. Galv Message Styles
3. Heirukichi GalvYep Compatibility Fix
4. SRD Shaking Text
5. Heirukichi GalvYep Compatibility Fix Appendix

Putting plugins between the main compatibility fix plugin and SRD Shaking Text plugin is possible as long as they are compatible with them.

#### Shaking Text Warning
When using the appendix to add compatibility with SRD Shaking Text plugin, be sure to set your characters shaking properly. Any shaking that shifts the character by more than 50% of its total height might result in the engine creating new lines of text to have enough space for the shaking effect. Keep this in mind whan changing SRD Shaking Text plugin parameters.

----------
## License
This plugin is licensed under the GNU General Public License 3.0. This means that you can:

* use this plugin for both commercial and non commercial projects as long as
  * proper credit is given to me (Heirukichi);
  * a link to my website is provided;
* modify this plugin as much as you want as long as
  * you do not pretend you wrote the whole plugin;
  * you still give credit to me for the original work;
  * you provide a link to my website instead of reposting my plugin when you post the modified version of the plugin.
  
You can review the complete license [here](https://www.gnu.org/licenses/gpl-3.0.html) or in the [license file](/LICENSE).

If you are using this plugin for a commercial game, I would like to receive a link of your game page. The link does not need to contain a free copy of your game and it is only used to keep track of games where my plugins are being used.

While this is not mandatory for non commercial games, I really appreciate if you could send me a link regardless of your game being commercial or not. You can contact me using the Contacts form on my website or by sending me a private message on RPG Maker Web forum.

### IMPORTANT NOTICE
You are free to distribute this plugin as long as you provide a link to my website with it. In case you downloaded this plugin from my website, provide a link to its download page instead of copy/pasting the code.

----------
## Credits
Credits go to Galv and Yanfly for the original plugins. Do not forget to also add them to your game credits.

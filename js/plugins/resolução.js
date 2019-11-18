// ================================================ =============================
// ResolutionChanger.js
// ================================================ =============================
 
/*:
*plugindesc Alterar resolução do jogo facilmente.
*author: Kielleds
*/

(function() {
 
    var parameters = PluginManager.parameters('ResolutionChanger');   
   var wdth = Number(parameters['Width'] || 1200);
    var hght = Number(parameters['Height'] || 800);
   var _Scene_Base_create = Scene_Base.prototype.create;
 
   Scene_Base.prototype.create = function() {
      _Scene_Base_create.call(this);
      Graphics.width = wdth;
      Graphics.height = hght;   
   };
 
})();
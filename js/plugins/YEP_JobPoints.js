//=============================================================================
// Yanfly Engine Plugins - Job Points
// YEP_JobPoints.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_JobPoints = true;

var Yanfly = Yanfly || {};
Yanfly.JP = Yanfly.JP || {};

//=============================================================================
 /*:
 * @plugindesc v1.04a Esse plugin por si só não faz muito, mas ele habilita
 * personagens a adquirirem JP (job points) usados para outros plugins.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param JP Text
 * @desc Isso muda como você quer que JP apareça no jogo.
 * @default JP
 *
 * @param JP Icon
 * @desc Esse é o ícone usado para JP.
 * Use 0 se você não quiser usar um ícone.
 * @default 188
 *
 * @param Max JP
 * @desc  Esse é o JP máximo que um personagem pode ter por classe.
 * Use 0 se você não quiser ter um limite.
 * @default 0
 *
 * @param JP Per Action
 * @desc Essa é a quantidade de JP que um personagem ganha para a classe
 * dele/dela toda hora que ele/ela realizar uma acão.
 * @default 10 + Math.randomInt(10)
 *
 * @param JP Per Level
 * @desc Essa é a quantidade de JP que um personagem ganha por level up.
 * @default 100 + Math.randomInt(100)
 *
 * @param JP Per Enemy
 * @desc Essa é a quantidade de JP dada por inimigo derrotado.
 * @default 50 + Math.randomInt(10)
 *
 * @param Show Results
 * @desc Upon winning, show how much JP is earned for default?
 * NO - false     YES - true
 * @default true
 *
 * @param JP Gained in Battle
 * @desc  Ajusta como o texto de JP ganho é mostrado depois da batalha.
 * %1 - Personagem     %2 Valor     %3 JP
 * @default %1 gains %2%3!
 *
 * @param ---Menu---
 * @default
 *
 * @param Show In Menu
 * @desc  Mostrar JP no menu principal?
 * NÃO - false     SIM - true
 * @default true
 *
 * @param Menu Format
 * @desc Como o formato de texto do JP aparece no menu.
 * %1 - Valor     %2 - Quantidade     %3 - Ícone
 * @default %1\c[4]%2\c[0]%3
 *
 * @param ---Victory Aftermath---
 * @default
 *
 * @param Enable Aftermath
 * @desc Habilita janelas de Victory Aftermath.
 * NÃO - false     SIM - true
 * @default true
 *
 * @param Aftermath Text
 * @desc Texto usado para descrever quanto de JP foi ganho.
 * @default JP Earned
 *
 * @param Aftermath Format
 * @desc Como o formato de texto do JP aparece no aftermath.
 * %1 - Valor     %2 - Quantidade     %3 - Ícone
 * @default +%1\c[4]%2\c[0]%3
 *
 * @param Aftermath JP Earned
 * @desc Descreve quanto de JP é ganho por personagem.
 * @default JP Earned in Battle
 *
 * @help
 * ============================================================================
 * Introducão
 * ============================================================================
 *
 * Esse plugin por si só não vai mudar nenhum funcionamento principal de jogo,
 * mas em vez disso, ele funciona em combinação com outros plugins que fazem
 * uso das funções desse plugin se você quiser incorporar Job Points em seu
 * jogo.
 *
 * Quando Job Points são ganhos, eles são dados para a classe atual do
 * personagem. Se o personagem trocar de classe, então os Job Points irão
 * ser mudados para os Job Points daquela classe até ser revertido de volta.
 *
 * ============================================================================
 * Compatibilidade Victory Aftermath
 * ============================================================================
 *
 * Se você tem o plugin YEP_VictoryAftermath instalado e quer fazer uso das
 * janelas de JP, posicione este plugin abaixo do YEP_VictoryAftermath no
 * gerenciamento de plugins.
 *
 * Depois disso, se você quiser definir o tempo da janela de JP a aparecer em
 * um certo ponto em vez do plugin fazer isso automaticamente, insira "JP" no
 * parâmetro "Victory Order" dentro do Victory Aftermath onde você quer que
 * a janela de JP apareça.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Aqui estão alguns notetags relacionados a Job Points.
 *
 * Notetags de Personagem
 *   <Starting JP: x>
 *   Estabelece o valor de JP inicial do personagem para x para a classe
 *   inicial do personagem.
 *
 *   <Class x Starting JP: y>
 *   Estabelece o valor de JP inicial do personagem para classe x para ser y.
 *
 *   <JP Rate: x%>
 *   Isso muda a taxa de JP ganho por x%. Por padrão, todos os objetos tem uma
 *   taxa padrão de 100%. Aumentar isso para 200% irá aumentar o JP ganho por
 *   duas vezes enquanto que 50% irá reduzir pela metade o JP ganho.
 *
 * Notetags de Habilidade e Item
 *   <JP Gain: x>
 *   Isso faz com que o personagem, quando usando essa habilidade ou item, a
 *   ganhar quantidade x de JP em vez da quantidade de JP padrão achada nos
 *   parâmetros.
 *
 *   <Target JP Gain: x>
 *   Isso faz com que o personagem alvo afetado por essa habilidade ou item
 *   ganhe quantidade x de JP.
 *
 *
 * Notetag de Classe, Arma, Armadura, e Estado
 *   <JP Rate: x%>
 *   Isso muda a taxa do JP ganho por x%. Por padrão, todos os objetos tem uma
 *   taxa padrão de 100%. Aumentar isso para 200% irá aumentar o JP ganho por
 *   duas vezes enquanto que 50% irá reduzir pela metade o JP ganho.
 *
 * Notetag de Inimigo
 *   <JP: x>
 *   Quando o inmigo é derrotado, os membros presentes da party irão ganhar
 *   x de JP cada.
 *
 * ============================================================================
 * Comandos de Plugin
 * ============================================================================
 *
 * Para aqueles que querem saber como dar, remover, ou estabelecer o JP para
 * um personagem manualmente, você pode usar os seguintes Comandos de Plugin.
 *
 * Comandos de Plugin:
 *
 *   gainJp actorId jp
 *   gainJp actorId jp classId
 *   Substitua 'actorId' com o ID do personagem que você quer mudar seu JP.
 *   Substitua 'jp' com a quantidade de JP que você quer alterar. Se você
 *   estiver usando 'classId', substitua-o com o ID da classe do personagem
 *   que você quer alterar. Esse comando irá permitir o personagem a ganhar
 *   JP.
 *
 *   loseJp actorId jp
 *   loseJp actorId jp classId
 *   Substitua 'actorId' com o ID do personagem que você quer mudar seu JP.
 *   Substitua 'jp' com a quantidade de JP que você quer alterar. Se você
 *   estiver usando 'classId', substitua-o com o ID da classe do personagem
 *   que você quer alterar. Esse comando irá causar o personagem a perder
 *   JP.
 *
 *   setJp actorId jp
 *   setJp actorId jp classId
 *   Substitua 'actorId' com o ID do personagem que você quer mudar seu JP.
 *   Substitua 'jp' com a quantidade de JP que você quer alterar. Se você
 *   estiver usando 'classId', substitua-o com o ID da classe do personagem
 *   que você quer alterar. Esse comando irá estabelecer o JP do personagem
 *   para um valor específico.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.04a:
 * - Added failsafes to prevent JP from turning into NaN midbattle.
 * - Added failsafes to prevent no-target scopes from crashing the game.
 *
 * Version 1.03:
 * - Added 'Show Results' parameter to show/hide JP earned after battle for
 * those who aren't using the Victory Aftermath plugin.
 *
 * Version 1.02:
 * - Fixed a bug that would gain JP for changing classes of a higher level.
 *
 * Version 1.01:
 * - Added failsafes to prevent JP from turning into NaN.
 * 
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_JobPoints');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.Jp = String(Yanfly.Parameters['JP Text']);
Yanfly.Icon.Jp = Number(Yanfly.Parameters['JP Icon']);
Yanfly.Param.JpMax = String(Yanfly.Parameters['Max JP']);
Yanfly.Param.JpPerAction = String(Yanfly.Parameters['JP Per Action']);
Yanfly.Param.JpPerEnemy = String(Yanfly.Parameters['JP Per Enemy']);
Yanfly.Param.JpShowResults = eval(String(Yanfly.Parameters['Show Results']));
Yanfly.Param.JpTextFormat = String(Yanfly.Parameters['JP Gained in Battle']);
Yanfly.Param.JpShowMenu = String(Yanfly.Parameters['Show In Menu']);
Yanfly.Param.JpMenuFormat = String(Yanfly.Parameters['Menu Format']);
Yanfly.Param.JpPerLevel = String(Yanfly.Parameters['JP Per Level']);
Yanfly.Param.JpEnableAftermath = String(Yanfly.Parameters['Enable Aftermath']);
Yanfly.Param.JpAftermathText = String(Yanfly.Parameters['Aftermath Text']);
Yanfly.Param.JpAftermathFmt = String(Yanfly.Parameters['Aftermath Format']);
Yanfly.Param.JpAftermathEarn = String(Yanfly.Parameters['Aftermath JP Earned']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.JP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.JP.DataManager_isDatabaseLoaded.call(this)) return false;
    this.processJPNotetags1($dataActors);
    this.processJPNotetags2($dataSkills);
    this.processJPNotetags2($dataItems);
    this.processJPNotetags3($dataEnemies);
    this.processJPNotetags4($dataClasses);
    this.processJPNotetags4($dataWeapons);
    this.processJPNotetags4($dataArmors);
    this.processJPNotetags4($dataStates);
    return true;
};

DataManager.processJPNotetags1 = function(group) {
  var note1 = /<(?:STARTING JP):[ ](\d+)>/i;
  var note2 = /<(?:CLASS)[ ](\d+)[ ](?:STARTING JP):[ ](\d+)>/i;
  var note3 = /<(?:JP RATE):[ ](\d+)([%％])>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.startingJp = {};
    obj.jpRate = 1.0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.startingJp[obj.classId] = parseInt(RegExp.$1);
      } else if (line.match(note2)) {
        obj.startingJp[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(note3)) {
        obj.jpRate = parseFloat(RegExp.$1 * 0.01);
      }
    }
  }
};

DataManager.processJPNotetags2 = function(group) {
  var note1 = /<(?:GAIN JP|JP GAIN):[ ](\d+)>/i;
  var note2 = /<(?:TARGET GAIN JP|TARGET JP GAIN):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.gainJp = Yanfly.Param.JpPerAction;
    obj.targetGainJp = 0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.gainJp = parseInt(RegExp.$1);
      } else if (line.match(note2)) {
        obj.targetGainJp = parseInt(RegExp.$1);
      }
    }
  }
};

DataManager.processJPNotetags3 = function(group) {
  var note1 = /<(?:JP):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.jp = Yanfly.Param.JpPerEnemy;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.jp = parseInt(RegExp.$1);
      }
    }
  }
};

DataManager.processJPNotetags4 = function(group) {
  var note1 = /<(?:JP RATE):[ ](\d+)([%％])>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.jpRate = 1.0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.jpRate = parseFloat(RegExp.$1 * 0.01);
      }
    }
  }
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.JP.BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    Yanfly.JP.BattleManager_makeRewards.call(this);
    this._rewards.jp = $gameTroop.jpTotal();
    this.gainJp();
};

BattleManager.gainJp = function() {
    var jp = $gameTroop.jpTotal();
    $gameMessage.newPage();
    $gameParty.members().forEach(function(actor) {
      actor.gainJp(jp);
    });
};

Yanfly.JP.BattleManager_displayRewards = BattleManager.displayRewards;
BattleManager.displayRewards = function() {
    Yanfly.JP.BattleManager_displayRewards.call(this);
    this.displayJpGain();
};

BattleManager.displayJpGain = function() {
    if (!Yanfly.Param.JpShowResults) return;
    var jp = $gameTroop.jpTotal();
    $gameMessage.newPage();
    $gameParty.members().forEach(function(actor) {
      var fmt = Yanfly.Param.JpTextFormat;
      var text = fmt.format(actor.name(), Yanfly.Util.toGroup(actor.battleJp()),
        Yanfly.Param.Jp);
      $gameMessage.add('\\.' + text);
    });
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.JP.Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
    Yanfly.JP.Game_Battler_useItem.call(this, item);
    if (!$gameParty.inBattle()) return;
    if (this.isActor()) this.gainJp(eval(item.gainJp), this.currentClass().id);
};

Yanfly.JP.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    Yanfly.JP.Game_Battler_onBattleStart.call(this);
    this._battleJp = 0;
};

Yanfly.JP.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    Yanfly.JP.Game_Battler_onBattleEnd.call(this);
    this._battleJp = 0;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.JP.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.JP.Game_Actor_setup.call(this, actorId);
    this.initJp();
};

Game_Actor.prototype.jp = function(classId) {
    if (!this._jp) this.initJp();
    if (!this._jp) return 0;
    if (classId === undefined) classId = this.currentClass().id;
    if (!this._jp[classId]) this._jp[classId] = 0;
    return this._jp[classId];
};

Game_Actor.prototype.initJp = function() {
    var actor = this.actor();
    for (var i = 0; i < $dataClasses.length; i++) {
      if (actor.startingJp) {
        var jp = actor.startingJp[i] || 0;
        this.setJp(jp, i);
      }
    }
};

Game_Actor.prototype.setJp = function(value, classId) {
    value = parseInt(value);
    if (value === NaN) value = 0;
    classId = classId || this.currentClass().id;
    if (!this._jp) this._jp = {};
    if (!this._jp[classId]) this._jp[classId] = 0;
    this._jp[classId] = Math.max(0, value);
    if (Yanfly.Param.JpMax > 0) {
      this._jp[classId] = Math.min(Yanfly.Param.JpMax, value);
    }
};

Game_Actor.prototype.jpRate = function() {
    var rate = 1.0;
    rate *= this.actor().jpRate;
    rate *= this.currentClass().jpRate;
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item) rate *= item.jpRate;
    }
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (state) rate *= state.jpRate;
    }
    return rate;
};

Game_Actor.prototype.gainJp = function(value, classId) {
    value = parseInt(value);
    if (value === NaN) value = 0;
    classId = classId || this.currentClass().id;
    value = Math.floor(value * this.jpRate());
    if ($gameParty.inBattle()) {
      this._battleJp = this._battleJp || 0;
      this._battleJp += value;
    }
    this.setJp(this.jp(classId) + value, classId);
};

Game_Actor.prototype.loseJp = function(value, classId) {
    classId = classId || this.currentClass().id;
    this.setJp(this.jp(classId) - value, classId);
};

Game_Actor.prototype.battleJp = function() {
    this._battleJp = this._battleJp || 0;
    return this._battleJp;
};

Yanfly.JP.Game_Actor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp) {
    this._preventJpLevelUpGain = true;
    Yanfly.JP.Game_Actor_changeClass.call(this, classId, keepExp);
    this._preventJpLevelUpGain = false;
};

Yanfly.JP.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    Yanfly.JP.Game_Actor_levelUp.call(this);
    if (this._preventJpLevelUpGain) return;
    var value = eval(Yanfly.Param.JpPerLevel)
    this.gainJp(value, this.currentClass().id);
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.jp = function() {
    return eval(this.enemy().jp);
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.JP.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.JP.Game_Action_applyItemUserEffect.call(this, target);
    if (target) this.applyItemJpEffect(target);
};

Game_Action.prototype.applyItemJpEffect = function(target) {
    var item = this.item();
    if (!item) return;
    if (target.isActor()) target.gainJp(item.targetGainJp);
};

Yanfly.JP.Game_Action_hasItemAnyValidEffects =
    Game_Action.prototype.hasItemAnyValidEffects;
Game_Action.prototype.hasItemAnyValidEffects = function(target) {
    var item = this.item();
    if (!item) return;
    if (target.isActor() && item.targetGainJp !== 0) return true;
    return Yanfly.JP.Game_Action_hasItemAnyValidEffects.call(this, target);
};

//=============================================================================
// Game_Troop
//=============================================================================

Game_Troop.prototype.jpTotal = function() {
    return this.deadMembers().reduce(function(r, enemy) {
        return r + enemy.jp();
    }, 0);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.JP.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.JP.Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'gainJp') this.modifyJp('gain', args);
    if (command === 'loseJp') this.modifyJp('lose', args);
    if (command === 'setJp') this.modifyJp('set', args);
};

Game_Interpreter.prototype.modifyJp = function(type, args) {
    if (!args) return;
    var actorId = parseInt(args[0]);
    var actor = $gameActors.actor(actorId);
    var jpValue = args[1] || 0;
    jpValue = parseInt(jpValue);
    var classId = args[2] || 0;
    classId = parseInt(classId);
    if (jpValue <= 0) return;
    if (classId <= 0) classId = actor.currentClass().id;
    if (type === 'gain') {
      actor.gainJp(jpValue, classId);
    } else if (type === 'lose') {
      actor.loseJp(jpValue, classId);
    } else if (type === 'set') {
      actor.setJp(jpValue, classId);
    }
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.JP.Window_Base_dASS = Window_Base.prototype.drawActorSimpleStatus;
Window_Base.prototype.drawActorSimpleStatus = function(actor, wx, wy, ww) {
    this._drawMenuJP = eval(Yanfly.Param.JpShowMenu);
    Yanfly.JP.Window_Base_dASS.call(this, actor, wx, wy, ww);
    this._drawMenuJP = undefined;
};

Yanfly.JP.Window_Base_drawActorClass = Window_Base.prototype.drawActorClass;
Window_Base.prototype.drawActorClass = function(actor, wx, wy, ww) {
    ww = ww || 168;
    Yanfly.JP.Window_Base_drawActorClass.call(this, actor, wx, wy, ww);
    if (!this._drawMenuJP) return;
    var classId = actor.currentClass().id;
    this.drawActorJp(actor, classId, wx, wy, ww, 'right');
};

Window_Base.prototype.drawActorJp = function(actor, id, wx, wy, ww, align) {
    var jp = actor.jp(id);
    var icon = '\\i[' + Yanfly.Icon.Jp + ']';
    var fmt = Yanfly.Param.JpMenuFormat;
    var text = fmt.format(Yanfly.Util.toGroup(jp), Yanfly.Param.Jp, icon);
    if (align === 'left') {
      wx = 0;
    } else if (align === 'center') {
      wx += (ww - this.textWidthEx(text)) / 2;
    } else {
      wx += ww - this.textWidthEx(text);
    }
    this.drawTextEx(text, wx, wy);
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

//=============================================================================
// Window_VictoryJp
//=============================================================================

if (Imported.YEP_VictoryAftermath && eval(Yanfly.Param.JpEnableAftermath)) {

function Window_VictoryJp() {
    this.initialize.apply(this, arguments);
}

Window_VictoryJp.prototype = Object.create(Window_VictoryExp.prototype);
Window_VictoryJp.prototype.constructor = Window_VictoryJp;

Window_VictoryJp.prototype.drawActorGauge = function(actor, index) {
    this.clearGaugeRect(index);
    var rect = this.gaugeRect(index);
    this.changeTextColor(this.normalColor());
    this.drawActorName(actor, rect.x + 2, rect.y);
    this.drawLevel(actor, rect);
    this.drawJpGained(actor, rect);
};

Window_VictoryJp.prototype.drawJpGained = function(actor, rect) {
    var wy = rect.y + this.lineHeight() * 1;
    this.changeTextColor(this.systemColor());
    this.drawText(Yanfly.Param.JpAftermathEarn, rect.x + 2, wy, rect.width - 4,
      'left');
    var bonusJp = 1.0 * actor.battleJp() * this._tick /
      Yanfly.Param.VAGaugeTicks;
    var value = Yanfly.Util.toGroup(parseInt(bonusJp));
    var fmt = Yanfly.Param.JpAftermathFmt;
    var icon = '\\i[' + Yanfly.Icon.Jp + ']';
    var JpText = fmt.format(value, Yanfly.Param.Jp, icon);
    this.changeTextColor(this.normalColor());
    wx = rect.x + rect.width - this.textWidthEx(JpText);
    this.drawTextEx(JpText, wx, wy);
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.JP.Scene_Battle_addCustomVictorySteps =
    Scene_Battle.prototype.addCustomVictorySteps;
Scene_Battle.prototype.addCustomVictorySteps = function(array) {
    array = Yanfly.JP.Scene_Battle_addCustomVictorySteps.call(this, array);
    if (!array.contains('JP')) array.push('JP');
    return array;
};

Yanfly.JP.Scene_Battle_updateVictorySteps =
    Scene_Battle.prototype.updateVictorySteps;
Scene_Battle.prototype.updateVictorySteps = function() {
    Yanfly.JP.Scene_Battle_updateVictorySteps.call(this);
    if (this.isVictoryStep('JP')) this.updateVictoryJp();
};

Scene_Battle.prototype.updateVictoryJp = function() {
    if (!this._victoryJpWindow) {
      this.createVictoryJp();
    } else if (this._victoryJpWindow.isReady()) {
      if (this.victoryTriggerContinue()) this.finishVictoryJp();
    }
};

Scene_Battle.prototype.createVictoryJp = function() {
    this._victoryTitleWindow.refresh(Yanfly.Param.JpAftermathText);
    this._victoryJpWindow = new Window_VictoryJp();
    this.addWindow(this._victoryJpWindow);
    this._victoryJpWindow.open();
};

Scene_Battle.prototype.finishVictoryJp = function() {
    SoundManager.playOk();
    this._victoryJpWindow.close();
    this.processNextVictoryStep();
};

}; // Imported.YEP_VictoryAftermath

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

//=============================================================================
// End of File
//=============================================================================

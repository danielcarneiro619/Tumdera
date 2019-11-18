//=============================================================================================
// KG - Skill Tree
//=============================================================================================

 /*:
 @plugindesc Este plugin cria uma tela de árvore de habilidades.
 @author King Gerar
 
 @param OptAddOnMainMenu
 @desc Deseja adicionar um comando que leva à árvore de habilidades ao menu principal? (Yes ou No)
 @default Yes
 
 @param TxtMainMenuCommand
 @desc Texto que será exibido no comando no menu principal.
 @default Skill Tree
 
 @param OptShowHeaderScene
 @desc Deseja exibir um cabeçalho com o nome da tela de árvore de habilidades? (Yes ou No)
 @default Yes
 
 @param HeaderHeight
 @desc Altura (em pixels) do cabeçalho.
 @default 72
 
 @param TxtSkillTreeSceneName
 @desc Texto que será exibido como nome da tela de árvore de habilidades.
 @default Árvore de Habilidades
 
 @param TxtSkillTreeSceneNameAlign
 @desc Texto que será exibido como nome da tela de menu principal.
 @default Left
 
 @param NmbVisibleCols
 @desc Número de colunas visíveis na tela da árvore de habilidades.
 @default 6
 
 @param NmbVisibleRows
 @desc Número de linhas visíveis na tela da árvore de habilidades.
 @default 5
 
 @param TxtAvailablePoints
 @desc Texto que indica a quantidade de pontos disponíveis.
 @default Pontos:
 
 @param TxtRequiredPoints
 @desc Texto que indica a quantidade de pontos necessária para liberar um habilidade.
 @default Pontos Requeridos:
 
 @param TxtLearnedSkill
 @desc Texto que indica que uma habilidade da árvore de habilidades já foi aprendida.
 @default Aprendida
 ---------------------------------------------------------------------------------------------
 @help Para utilizar o sistema de árvore de habilidades é preciso, antes, criar
 as árvores dentro do código do plugin. O código já apresenta um exemplo de
 árvore de habilidades, contendo 15 espaços e 5 habilidades. A árvore de
 habilidades é criada como uma matriz semelhante à uma tabela, em que cada
 célula/quadradinho é uma habilidade.
 As células que forem ficar vazias devem conter somente o código "vazio"
 incluindo as aspas, conforme o exemplo:
 
 ["vazio"],
 
 Por outro lado, as células que possuirão habilidades deverão ser escritas da
 seguinte forma:
 
 [id da skill, sup-esq, sup-cen, sup-dir, cen-esq, cen-dir, inf-esq, inf-cen, inf-dir],
 
 Em que:
 id da skill = Id da habilidade exibida dna célula em questão.
 sup-esq = Id da habilidade à posição superior-esquerda, se fizer ligação com a em questão.
 sup-cen = Id da habilidade à posição superior-central, se fizer ligação com a em questão.
 sup-dir = Id da habilidade à posição superior-direita, se fizer ligação com a em questão.
 cen-esq = Id da habilidade à posição centro-esquerda, se fizer ligação com a em questão.
 cen-dir = Id da habilidade à posição centro-direita, se fizer ligação com a em questão.
 inf-esq = Id da habilidade à posição inferior-esquerda, se fizer ligação com a em questão.
 inf-cen = Id da habilidade à posição inferior-central, se fizer ligação com a em questão.
 inf-dir = Id da habilidade à posição inferior-direita, se fizer ligação com a em questão.
 
 Se algum dos campos acima não possuir id para preencher, coloque 0 (zero).
 ---------------------------------------------------------------------------------------------
 É importante lembrar que, a primeira habilidade da árvore (que inicia a
 ramificação) deve estar atribuída ao personagem desde o início. Você pode
 fazer isso na aba classes do banco de dados, no campo "Skills to Learn".
 
 Árvores de habilidades criadas, deve-se atribuir a árvore aos personagens.
 Para isso, é preciso adicionar a tag <SkillTree:n>, onde n é o id da árvore
 de habilidades desejada. Cada personagem pode ter somente uma árvore de
 habilidades e todas as tags devem ser adicionadas no campo de notas.
 
 Você também deve definir com quantos pontos de habilidade o personagem começa,
 utilizando a tag <StartPoints:n>, onde n é a quantidade de pontos.
 
 E ainda deve definir quantos pontos de habilidade o personagem ganha ao ganhar
 um nível, utilizando a tag <LevelPoints:n>, onde n é a quantidade de pontos.
 
 Por último, defina quantos pontos será necessário para liberar a habilidade
 adicionando a tag <Points:n>, onde n é a quantidade de pontos.
 */
 
//=============================================================================
// Árvores de Habilidades
//=============================================================================
	SkillTrees = new Array(1);
	SkillTrees[0] = [
									["vazio"],
									["vazio"],
									[11, 0, 0, 0, 0, 0, 12, 0, 13],
									["vazio"],
									["vazio"],
									
									["vazio"],
									[12, 0, 0, 11, 0, 0, 0, 14, 0],
									["vazio"],
									[13, 11, 0, 0, 0, 0, 0, 15, 0],
									["vazio"],
									
									["vazio"],
									[14, 0, 12, 0, 0, 0, 0, 0, 0],
									["vazio"],
									[15, 0, 13, 0, 0, 0, 0, 0, 0],
									["vazio"]
									]
 
	KG_SkillTreeConfig = {
		optAddOnMainMenu: (PluginManager.parameters('KG - Skill Tree')['OptAddOnMainMenu']).toLowerCase(),
		txtMainMenuCommand: PluginManager.parameters('KG - Skill Tree')['TxtMainMenuCommand'],
		
		optShowHeaderScene: (PluginManager.parameters('KG - Skill Tree')['OptShowHeaderScene']).toLowerCase(),
		headerHeight: Number(PluginManager.parameters('KG - Skill Tree')['HeaderHeight']),
		txtSkillTreeSceneName: PluginManager.parameters('KG - Skill Tree')['TxtSkillTreeSceneName'],
		txtSkillTreeSceneNameAlign: (PluginManager.parameters('KG - Skill Tree')['TxtSkillTreeSceneNameAlign']).toLowerCase(),
		
		nmbVisibleCols: Number(PluginManager.parameters('KG - Skill Tree')['NmbVisibleCols']),
		nmbVisibleRows: Number(PluginManager.parameters('KG - Skill Tree')['NmbVisibleRows']),
		txtAvailablePoints: PluginManager.parameters('KG - Skill Tree')['TxtAvailablePoints'],
		txtRequiredPoints: PluginManager.parameters('KG - Skill Tree')['TxtRequiredPoints'],
		txtLearnedSkill: PluginManager.parameters('KG - Skill Tree')['TxtLearnedSkill'],
	};
	
//=============================================================================
// Scene_SkillTree
//-----------------------------------------------------------------------------
// Esta classe é responsável por exibir a tela de árvore de habilidade.
//=============================================================================
	function Scene_SkillTree() {
    this.initialize.apply(this, arguments);
	}

	Scene_SkillTree.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_SkillTree.prototype.constructor = Scene_SkillTree;

	Scene_SkillTree.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_SkillTree.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
		this.createWindowHeader();
		this.createWindowHelp();
		this.createWindowSkillTree();
		this.createWindowPoints();
		this.windowSkillTree.refresh(this.actor());
		this.windowSkillPoints.refresh(this.actor());
		this.windowSkillTree.selectFirstItem();
		this.windowSkillTree.activate();
	};
	
	Scene_SkillTree.prototype.createWindowHeader = function() {
		this.windowHeader = new Window_SceneHeader();
    this.addWindow(this.windowHeader);
	};
	
	Scene_SkillTree.prototype.createWindowHelp = function() {
		this.windowHelp = new Window_SkillHelp(3);
		this.addWindow(this.windowHelp);
		this.windowHelp.y = this.windowHeader.height;
	};
	
	Scene_SkillTree.prototype.createWindowSkillTree = function() {
		this.windowSkillTree = new Window_SkillTree(this.windowHelp.y + this.windowHelp.height)
		this.windowSkillTree.setHandler('ok',     this.onSkillOk.bind(this));
    this.windowSkillTree.setHandler('cancel', this.popScene.bind(this));
		this.addWindow(this.windowSkillTree);
		this.windowSkillTree.setHelpWindow(this.windowHelp);
	};
	
	Scene_SkillTree.prototype.createWindowPoints = function() {
		this.windowSkillPoints = new Window_SkillPoints(this.windowSkillTree.y)
		this.addWindow(this.windowSkillPoints);
	};
	
	Scene_SkillTree.prototype.onSkillOk = function() {
		var selectedCell = this.windowSkillTree._data[this.windowSkillTree.index()]
		if (selectedCell[0] === "vazio" || this.actor().isLearnedSkill(this.windowSkillTree._data[this.windowSkillTree.index()][0])) {
			this.windowSkillTree.activate();
		} else {
			var selectedSkill = $dataSkills[this.windowSkillTree._data[this.windowSkillTree.index()][0]];
			var reqPoints = Number(selectedSkill.meta.Points);
			if (this.actor().skillPoints >= reqPoints && this.windowSkillTree.canLearnThisSkill()) {
				this.actor().skillPoints -= Number($dataSkills[this.windowSkillTree._data[this.windowSkillTree.index()][0]].meta.Points);
				this.actor().learnSkill(this.windowSkillTree._data[this.windowSkillTree.index()][0]);
				this.windowSkillTree.refresh(this.actor());
				this.windowSkillPoints.refresh(this.actor());
				this.windowSkillTree.activate();
			} else {
				SoundManager.playBuzzer();
				this.windowSkillTree.activate();
			};
		};	
	};
		
//=============================================================================
// Window_SceneHeader
//-----------------------------------------------------------------------------
// Esta janela exibe o nome da tela atual.
//=============================================================================
	function Window_SceneHeader() {
		this.initialize.apply(this, arguments);
	}

	Window_SceneHeader.prototype = Object.create(Window_Base.prototype);
	Window_SceneHeader.prototype.constructor = Window_SceneHeader;

	Window_SceneHeader.prototype.initialize = function() {
		Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, KG_SkillTreeConfig.headerHeight);
		this.drawContents();
	};
	
	Window_SceneHeader.prototype.drawContents = function() {
		this.drawText(KG_SkillTreeConfig.txtSkillTreeSceneName, 0, 0, this.contentsWidth(), KG_SkillTreeConfig.txtSkillTreeSceneNameAlign);
	};
	
//=============================================================================
// Window_SkillTree
//-----------------------------------------------------------------------------
// Esta janela exibe a árvore de habilidades.
//=============================================================================
	function Window_SkillTree() {
		this.initialize.apply(this, arguments);
	}

	Window_SkillTree.prototype = Object.create(Window_Selectable.prototype);
	Window_SkillTree.prototype.constructor = Window_SkillTree;

	Window_SkillTree.prototype.initialize = function(y) {
    Window_Selectable.prototype.initialize.call(this, 0, y, Graphics.boxWidth - 240, Graphics.boxHeight - y);
		this._data = [];
	};
	
	Window_SkillTree.prototype.maxCols = function() {
		return KG_SkillTreeConfig.nmbVisibleCols;
	};

	Window_SkillTree.prototype.spacing = function() {
		return 0;
	};
	
	Window_SkillTree.prototype.itemHeight = function() {
    return this.contentsHeight() / KG_SkillTreeConfig.nmbVisibleRows;
	};
	
	Window_SkillTree.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
	};
	
	Window_SkillTree.prototype.updateHelp = function() {
    if (this.index() != -1) {
			if (this._data[this.index()] != "vazio") {
				this._helpWindow.refresh(this.actor, $dataSkills[this._data[this.index()][0]])
			} else {
				this._helpWindow.contents.clear()
			};
		};
	};
	
	Window_SkillTree.prototype.refresh = function(actor) {
		if (this.contents) {
      this.contents.clear();
			if (actor) { this.actor = actor };
			this._data = SkillTrees[$dataActors[this.actor.actorId()].meta.SkillTree];
      this.drawAllItems();
    };
	};
	
	Window_SkillTree.prototype.drawItem = function(index) {
		if (this._data[index] != "vazio") {
			var skill = $dataSkills[this._data[index][0]];
			var rect = this.itemRect(index);
			this.changePaintOpacity(this.actor.isLearnedSkill(this._data[index][0]));
			this.drawAllLinks(index, rect);
			this.contents.clearRect(rect.x + (Math.floor(rect.width - 64) / 2), rect.y + (Math.floor(rect.height - 64) / 2), 64, 64);
			this.drawBigIcon(skill.iconIndex, rect.x + (Math.floor(rect.width - 64) / 2), rect.y + (Math.floor(rect.height - 64) / 2));
			this.changePaintOpacity(1);
    };
	};
	
	Window_SkillTree.prototype.changePaintOpacity = function(enabled) {
    this.contents.paintOpacity = enabled ? 255 : 125;
	};
	
	Window_SkillTree.prototype.selectFirstItem = function() {
		var n = 0;
		while (this._data[n][0] === "vazio") { n++ };
		this.select(n);
	};
	
	Window_SkillTree.prototype.drawBigIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var sx = iconIndex % 16 * 32;
    var sy = Math.floor(iconIndex / 16) * 32;
		this.contents._context.imageSmoothingEnabled = false;
    this.contents.blt(bitmap, sx, sy, 32, 32, x, y, 64, 64);
	};
	
	Window_SkillTree.prototype.drawAllLinks = function(index, rect) {
		var x = rect.x + Math.floor(rect.width / 2);
		var y = rect.y + Math.floor(rect.height / 2);
		var xO = x;
		var yO = y;
		if (this.topRow() > 0 && index > (this.maxCols() * this.topRow()) && index < (this.maxCols() * this.topRow() + this.maxCols())) {
			var startLinkId = 0;
		} else {
			var startLinkId = 5;
		};
		for (n = startLinkId; n < this._data[index].length; n++) {
			if (this._data[index][n] === 0) { continue };
			xO = x;
			yO = y;
			if (n === 1) {
				xO -= rect.width;
				yO -= rect.height;
			} else if (n === 2) {
				yO -= rect.height;
			} else if (n === 3) {
				xO += rect.width;
				yO -= rect.height;
			} else if (n === 4) {
				xO -= rect.width;
			} else if (n === 5) {
				xO += rect.width;
			} else if (n === 6) {
				xO -= rect.width;
				yO += rect.height;
			} else if (n === 7) {
				yO += rect.height;
			} else if (n === 8) {
				xO += rect.width;
				yO += rect.height;
			};
			this.drawUnidirectLine(x, y, xO, yO, 0)
		};
	};
	
	Window_SkillTree.prototype.canLearnThisSkill = function() {
		var existsLink = false;
		for (n = 1; n < this._data[this.index()].length; n++) {
			if (this._data[this.index()][n] != 0 && this.actor.isLearnedSkill(this._data[this.index()][n])) {
				existsLink = true;
				break;
			};
		};
		return existsLink;
	};
	
//=============================================================================
// Window_SkillPoints
//-----------------------------------------------------------------------------
// Esta janela exibe a árvore de habilidades.
//=============================================================================
	function Window_SkillPoints() {
		this.initialize.apply(this, arguments);
	}

	Window_SkillPoints.prototype = Object.create(Window_Base.prototype);
	Window_SkillPoints.prototype.constructor = Window_SkillPoints;

	Window_SkillPoints.prototype.initialize = function(y, actor) {
    Window_Base.prototype.initialize.call(this, Graphics.boxWidth - 240, y, 240, Graphics.boxHeight - y);
	};
	
	Window_SkillPoints.prototype.refresh = function(actor) {
		this.contents.clear();
		this.drawActorName(actor, 0, 0);
		this.drawActorFace(actor, (this.contentsWidth() - 144) / 2, this.lineHeight());
		this.drawActorClass(actor, 0, this.lineHeight() + 144);
		this.drawActorLevel(actor, 0, 144 + (this.lineHeight() * 2));
		this.drawHorzLine(144 + (this.lineHeight() * 3));
		this.drawText(KG_SkillTreeConfig.txtAvailablePoints, 0, 144 + (this.lineHeight() * 4), this.contentsWidth());
		this.drawText(actor.skillPoints, 0, 144 + (this.lineHeight() * 5), this.contentsWidth(), 'right');
	};
	
	Window_SkillPoints.prototype.drawHorzLine = function(y) {
    var lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.normalColor());
    this.contents.paintOpacity = 255;
	};
	
//=============================================================================
// Window_SkillHelp
//-----------------------------------------------------------------------------
// Esta janela exibe o nome e a descrição de uma habilidade da árvore de
// habilidades.
//=============================================================================
	function Window_SkillHelp() {
    this.initialize.apply(this, arguments);
	}

	Window_SkillHelp.prototype = Object.create(Window_Base.prototype);
	Window_SkillHelp.prototype.constructor = Window_SkillHelp;

	Window_SkillHelp.prototype.initialize = function(numLines) {
    var height = this.fittingHeight(numLines || 2);
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, height);
	};

	Window_SkillHelp.prototype.refresh = function(actor, skill) {
    this.contents.clear();
		this.changeTextColor(this.systemColor());
		this.drawText(skill.name, 0, 0, this.contentsWidth());
		if (actor.isLearnedSkill(skill.id)) {
			this.drawText(KG_SkillTreeConfig.txtLearnedSkill, 0, 0, this.contentsWidth(), 'right');
			this.resetTextColor();
		} else {
			this.drawText(KG_SkillTreeConfig.txtRequiredPoints, 0, 0, this.contentsWidth() - this.textWidth("00"), 'right');
			this.resetTextColor();
			this.drawText(skill.meta.Points, 0, 0, this.contentsWidth(), 'right');
		};
    this.drawTextEx(skill.description, 0, this.lineHeight());
	};
	
//=============================================================================
// Scene_Menu
//-----------------------------------------------------------------------------
// Esta classe é responsável por exibir a tela de menu principal.
//=============================================================================
	var KG_SkillTree_SceneMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		KG_SkillTree_SceneMenu_createCommandWindow.call(this);
    if (KG_SkillTreeConfig.optAddOnMainMenu === "yes") { this._commandWindow.setHandler('skillTree', this.commandPersonal.bind(this)) };
	};
	
	var KG_SkillTree_SceneMenu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
	Scene_Menu.prototype.onPersonalOk = function() {
		KG_SkillTree_SceneMenu_onPersonalOk.call(this);
		if (this._commandWindow.currentSymbol() === 'skillTree') {
			SceneManager.push(Scene_SkillTree);
		};
	};
	
//=============================================================================
// Window_Base
//-----------------------------------------------------------------------------
// Esta função cria uma linha entre dois pontos.
//=============================================================================
	Window_Base.prototype.drawUnidirectLine = function(x, y, x2, y2, color) {
    this.contents.diagonalLine(x, y, x2, y2, this.textColor(color));
  };
	
//=============================================================================
// Window_MenuCommand
//-----------------------------------------------------------------------------
// Esta classe é responsável por exibir a janela de comandos no menu principal.
//=============================================================================
	var KG_SkillTree_MenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
	Window_MenuCommand.prototype.makeCommandList = function() {
		KG_SkillTree_MenuCommand_makeCommandList.call(this);
		this.addSkillTreeCommand();
	};
	
	Window_MenuCommand.prototype.addSkillTreeCommand = function() {
    this.addCommand(KG_SkillTreeConfig.txtMainMenuCommand, 'skillTree', true);
	};
	
//=============================================================================
// Bitmap
//-----------------------------------------------------------------------------
// Esta função desenha uma linha entre dois pontos em uma janela.
//=============================================================================
	Bitmap.prototype.diagonalLine = function(x, y, x2, y2, color) {
    var context = this._context;
	  context.lineWidth = 3;
	  context.strokeStyle = color;
	  context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x2, y2);
    context.stroke();
  };
	
//=============================================================================
// Game_Actor
//-----------------------------------------------------------------------------
// Esta função adiciona o parâmetro de pontos de habildade ao personagem.
//=============================================================================
	var KG_SkillTree_Game_Actor_setup = Game_Actor.prototype.setup;
	Game_Actor.prototype.setup = function(actorId){
		KG_SkillTree_Game_Actor_setup.call(this, actorId);
    this.skillPoints = Number($dataActors[this._actorId].meta.StartPoints);
	};
	
	var KG_SkillTree_Game_Actor_levelUp = Game_Actor.prototype.levelUp;
	Game_Actor.prototype.levelUp = function() {
		KG_SkillTree_Game_Actor_levelUp.call(this);
    this.skillPoints += Number($dataActors[this._actorId].meta.LevelPoints);
	};
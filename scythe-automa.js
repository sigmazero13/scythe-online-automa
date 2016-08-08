// TODO: Input power, faction, etc
// TODO: automatic scoring (need battle resolution though)
var ICON_DD = 30;
var ICON_SD = 96;
var FACTION_DD = 30;
var FACTION_SD = 100;

var iconindex = [
  'move', 'factory', 'turn', 'phase2', 'isolated', 'phase1', 'star', 'attack', 'ignore',
  'popularity', 'gold', 'power', 'encounter', 'powercard', 'resource', 'enlist', 'mech',
  'worker', 'character', 'charormech', 'facobj'
];

var factionindex = [
  'black', 'blue', 'red', 'yellow', 'white'
];

var fs = {
  dupe: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  takerandom: function(col) {
    var index = Math.floor(Math.random() * col.length);
    var item = col[index];
    col.splice(index, 1);
    return item;
  },
  renderAnnotation: function(t) {
    return '<span class="card-annotation">'+t+'</span>';
  },
  renderFactionOption: function(f, t) {
    var html = fs.renderAnnotation('(');
    html += '<canvas class="faction-canvas" data-faction-color="' + f + '" height="'+FACTION_DD+'" width="'+FACTION_DD+'"></canvas>';
    html += t;
    html += fs.renderAnnotation(')');
    return html;
  },
  renderIcon: function(type) {
    return '<canvas class="icon-canvas" data-icon-type="' + type + '" height="'+ICON_DD+'" width="'+ICON_DD+'"></canvas>';
  }
};

var deck, discards, phase, profile, stars, tracker;

var takeCard = function() {
  if (deck.length == 0) {
    deck = fs.dupe(cards);
  }
  return fs.takerandom(deck);
};

var countMoveActions = function(card, phase) {
  return countActions(card, phase, 'move');
}

var countGetsActions = function(card, phase) {
  return countActions(card, phase, 'gets');
}

var countEnlistActions = function(card, phase) {
  return countActions(card, phase, 'enlist');
}

var countActions = function(card, phase, action) {
  var list = card.actions[phase][action];
  return !list ? 0 : list.length;
}

var renderEnlistAction = function(card, phase, index) {
  var enlist = card.actions[phase].enlist[index];
  return enlist ? (fs.renderIcon('enlist') + fs.renderIcon(enlist)) : '';
};

var renderGetsAction = function(card, phase, index) {
  var pac = card.actions[phase].gets[index];
  var html = ""
  for (var i = 0; i < pac.q; i++) {
    html += fs.renderIcon(pac.t);
  }
  if (pac.faction)
    html = fs.renderFactionOption(pac.faction, html);
  return html;
};

var renderMoveAction = function(card, phase, index) {
  var pac = card.actions[phase].move[index];
  var fac = pac.faction;
  var html = "";
  if (pac.t == 'attack') {
    html += fs.renderIcon(pac.t);
    if (pac.p) {
      html += '<span class="card-annotation">' + pac.p + '</span>';
    }
    html += fs.renderIcon(pac.o);
  } else {
    if (pac.t !== 'facobj')
      html += fs.renderIcon('move')
    html += fs.renderIcon(pac.t);
  }
  if (pac.faction) {
    html = fs.renderFactionOption(pac.faction, html);
  }
  return html;
};

var renderActionSet = function(card, phase, counter, render,
    outerjoin, innerjoin) {
  var ht = '';
  var ij = innerjoin ? innerjoin : '';
  var ct = counter(card, phase) - (innerjoin ? 1 : 0);
  for (var i = 0; i < ct; i++) {
    ht += render(card, phase, i) + ij + outerjoin;
  }
  if (innerjoin)
    ht += render(card, phase, ct) + outerjoin;
  return ht;
}

var renderNormal = function(card) {
  var htmlMove = '';
  var htmlGets = '';
  var htmlEnlist = '';

  if (card.skip && profile.type == 'easy') {
    htmlEnlist = htmlGets = htmlMove = 'Automa skips this round.';
  } else {
    htmlMove = renderActionSet(card, phase, countMoveActions,
      renderMoveAction, '', '<span class="card-annotation or-slash">/</span>');
    htmlGets = renderActionSet(card, phase, countGetsActions,
      renderGetsAction, '');
    htmlEnlist = renderActionSet(card, phase, countEnlistActions,
      renderEnlistAction, '', ',');
  }

  document.getElementById('normalCard-actions-move').innerHTML = htmlMove;
  document.getElementById('normalCard-actions-gets').innerHTML = htmlGets;
  document.getElementById('normalCard-actions-enlist').innerHTML = htmlEnlist;
  document.getElementById('deck-count').innerHTML = deck.length;
  document.getElementById('card-count').innerHTML = cards.length;

  renderCanvas();

};

var renderCanvas = function() {

  var doDraw = function(element, src, index, indextype, sd, dd) {
    var context = element.getContext('2d');
    var image = new Image();
    image.src = src;
    image.onload = function() {
      var ii = index.indexOf(element.getAttribute(indextype));
      context.drawImage(image, ii * sd, 0, sd, sd, 0, 0, dd, dd);
    };
  }

  var icons = document.getElementsByClassName('icon-canvas')
  for (var i = 0; i < icons.length; i++)
    doDraw(icons[i], 'assets/icons.png', iconindex, 'data-icon-type', ICON_SD, ICON_DD);

  var factions = document.getElementsByClassName('faction-canvas');
  for (var i = 0; i < factions.length; i++) {
    doDraw(factions[i], 'assets/factions-96x96.png', factionindex, 'data-faction-color', FACTION_SD, FACTION_DD);
  }

};

var renderCombat = function(card) {
  var htmlCombat = '<table class="table is-narrow"><thead><tr>';
  var arr = ['0-7', '8-13', '14+', 'P', 'R'];
  for (var i = 0; i < arr.length; i++) {
    htmlCombat += '<th>' + arr[i] + '</th>'
  }
  htmlCombat += '</tr></thead><tbody><tr>';
  if (card) {
    var cc = card.combat;
    for (var i = 0; i < 3; i++) {
      htmlCombat += '<td>' + cc.spend[i] + '</td>'
    }
    htmlCombat += '<td>' + cc.cards + '</td>';
    htmlCombat += '<td>' + cc.resources + '</td>';
  } else {
    for (var i = 0; i < 5; i++) {
      htmlCombat += '<td></td>';
    }
  }
  '</tr></tbody></table>';
  document.getElementById('combat-card-actions').innerHTML = htmlCombat;
  document.getElementById('deck-count').innerHTML = deck.length;
  document.getElementById('card-count').innerHTML = cards.length;
};

var findProfile = function(profiles, type) {
  return profiles.find(function(profile) {
    return profile.t == type;
  });
};

var renderCardPhase = function(phase) {
  var acards = document.getElementsByClassName('acard');
  for (var i = 0; i < acards.length; i++) {
    acards[i].className = 'acard message is-' + (phase == 1 ? 'danger' : 'success');
  }
}

var renderStars = function(stars) {
  var sts = '';
  for (var i = 6; i > 0; i--) {
    sts += ' ' + (i > stars ? '&#9734;' : '&#9733;');
  }
  document.getElementById('stars').innerHTML = sts;
}

var selectDifficulty = function() {
  if (tracker > -1 || (stars > 0 && stars < 6))
  if (!confirm('If you change the difficulty, the game will reset.'))
    return false;
  resetGame();
  return true;
};

var startGame = function() {
  resetGame();
  document.getElementById('start').setAttribute('disabled', 'disabled');
  document.getElementById('difficulty').setAttribute('disabled', 'disabled');
  document.getElementById('combatstar').setAttribute('disabled', 'disabled');
  document.getElementById('playcard').removeAttribute('disabled');
  document.getElementById('playcombatcard').removeAttribute('disabled');
  document.getElementById('combatstar').removeAttribute('disabled');
}

var checkEndGame = function() {
  return stars >= 6;
}

var endGame = function() {
  document.getElementById('phase').innerHTML = 'Game Over';
  document.getElementById('playcard').setAttribute('disabled', 'disabled');
  document.getElementById('playcombatcard').setAttribute('disabled', 'disabled');
  document.getElementById('combatstar').setAttribute('disabled', 'disabled');
}

var addCombatStar = function() {
  if (combatstars == 0) return false;
  combatstars--;
  stars++;
  renderStars(stars);
  if (combatstars == 0) {
    document.getElementById('combatstar').setAttribute('disabled', 'disabled');
  }
  if (checkEndGame()) endGame();
}

var resetGame = function() {
  tracker = -1;
  stars = 0;
  combatstars = 2;
  phase = 0;
  deck = [];
  discards = {
    main: [],
    battle: []
  };
  var difficulty = document.getElementById('difficulty').value;
  profile = findProfile(profiles, difficulty);
  document.getElementById('normalCard-actions-move').innerHTML = '';
  document.getElementById('normalCard-actions-gets').innerHTML = '';
  document.getElementById('normalCard-actions-enlist').innerHTML = '';
  document.getElementById('phase').innerHTML = 'Phase I';
  document.getElementById('river-state').innerHTML = 'cannot';
  document.getElementById('deck-count').innerHTML = cards.length;
  document.getElementById('card-count').innerHTML = cards.length;
  renderStars(stars);
  renderCardPhase(phase);
  document.getElementById('start').removeAttribute('disabled');
  document.getElementById('difficulty').removeAttribute('disabled');
  document.getElementById('playcard').setAttribute('disabled', 'disabled');
  document.getElementById('playcombatcard').setAttribute('disabled', 'disabled');
  document.getElementById('combatstar').setAttribute('disabled', 'disabled');
}

var normalCard = function() {
  if (checkEndGame()) return false;
  var card = takeCard();
  if (card.star) tracker++;
  // Phase II should start -after- the star has been assigned, not before.
  var saphase = profile.grid[tracker - 1];
  phase = phase == 1 ? 1 : saphase == 2 ? 1 : 0;
  var sastars = profile.grid[tracker];
  if (sastars == 2) stars++;
  renderStars(stars);
  renderCardPhase(phase);
  document.getElementById('phase').innerHTML = (phase == 0) ? 'Phase I' : 'Phase II';
  document.getElementById('river-state').innerHTML = tracker > profile.rivers ? 'can' : 'cannot';
  renderNormal(card);
  renderCombat();
  discards.main.push(card);
  if (checkEndGame()) endGame();
};

var combatCard = function() {
  var card = takeCard();
  renderCombat(card);
  discards.battle.push(card);
};

resetGame();

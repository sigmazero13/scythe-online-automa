// TODO: Input power, faction, etc
// TODO: automatic scoring (need battle resolution though)

var fs = {
  dupe: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  takerandom: function(col) {
    var index = Math.floor(Math.random() * col.length);
    var item = col[index];
    col.splice(index, 1);
    return item;
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
  return enlist ? enlist : 'none';
};

var renderGetsAction = function(card, phase, index) {
  var pac = card.actions[phase].gets[index];
  var fac = pac.faction;
  var type = pac.t;
  var qty = pac.q;
  fac = fac ? (fac + ' faction gain ') : 'gain ';
  return fac + qty + ' ' + type;
};

var renderMoveAction = function(card, phase, index) {
  var pac = card.actions[phase].move[index];
  var fac = pac.faction;
  var type = pac.t;
  var power = pac.p;
  fac = fac ? (fac + ' faction ') : '';
  if (type == 'attack')
    type = 'attack (req. ' + power + ' power)';
  if (type == 'factory')
    type = '<b>character</b> towards <b>fac/obj</b>';
  return fac + type;
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
      renderMoveAction, '<br />', '; or');
    htmlGets = renderActionSet(card, phase, countGetsActions,
      renderGetsAction, '<br />');
    htmlEnlist = renderActionSet(card, phase, countEnlistActions,
      renderEnlistAction, '', ',');
  }

  document.getElementById('normalCard-actions-move').innerHTML = htmlMove;
  document.getElementById('normalCard-actions-gets').innerHTML = htmlGets;
  document.getElementById('normalCard-actions-enlist').innerHTML = htmlEnlist;
  document.getElementById('deck-count').innerHTML = deck.length;
  document.getElementById('card-count').innerHTML = cards.length;

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
  var sa = profile.grid[tracker];
  phase = phase == 1 ? 1 : sa == 2 ? 1 : 0;
  if (sa == 2) stars++;
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

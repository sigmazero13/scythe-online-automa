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
    console.debug('shuffling');
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
  var type = pac.type;
  var qty = pac.quantity;
  fac = fac ? ('If you are ' + fac+ ' faction, gain ') : 'gain ';
  return fac + qty + ' ' + type;
};

var renderMoveAction = function(card, phase, index) {
  var pac = card.actions[phase].move[index];
  var fac = pac.faction;
  var type = pac.type;
  fac = fac ? ('If you are ' + fac+ ' faction, move ') : 'move ';
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
  // Check to see if we skip this turn
  // Check to see if they can cross rivers?
  // Check to see rank II
  var htmlMove = '';
  var htmlGets = '';
  var htmlEnlist = '';

  if (card.skip) {
    htmlMove = 'Automa skips this round.';
    htmlGets = '';
    htmlEnlist = '';
  } else {
    htmlMove = renderActionSet(card, phase, countMoveActions,
      renderMoveAction, '<br />', '; otherwise');
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

var renderCombat = function() {
  //document.getElementById('combatCard').innerHTML = active.id;
};

var findProfile = function(profiles, type) {
  return profiles.find(function(profile) {
    return profile.type == type;
  });
};

var startGame = function() {
  // TODO: Check for game in progress
  // TODO: Read mode from dropdown
  tracker = -1;
  stars = 0;
  phase = 0;
  deck = [];
  discards = {
    main: [],
    battle: []
  };
  profile = findProfile(profiles, 'easy');
  console.log(profile);
  console.log(profiles);
  document.getElementById('normalCard-actions-move').innerHTML = '';
  document.getElementById('normalCard-actions-gets').innerHTML = '';
  document.getElementById('normalCard-actions-enlist').innerHTML = '';
  document.getElementById('phase').innerHTML = 'I';
  document.getElementById('deck-count').innerHTML = cards.length;
  document.getElementById('card-count').innerHTML = cards.length;
}

var normalCard = function() {
  var card = takeCard();
  tracker++;
  phase = phase == 1 ? 1 : profile.grid[tracker] == 2 ? 1 : 0;
  document.getElementById('phase').innerHTML = (phase == 0) ? 'I' : 'II';
  // TODO: End game
  // TODO: Chane color of cards
  renderNormal(card);
  discards.main.push(card);
};

var combatCard = function() {
  var card = takeCard();
  renderCombat(card);
  discards.battle.push(card);
};

startGame();

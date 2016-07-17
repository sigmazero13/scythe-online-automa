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

for (var i = 0; i < cards.length; i++) {
  console.log(cards[i].id);
}

var tracker = 0;
var phase = 0;
var deck = [];
var active = {};
var discards = {
  main: [],
  battle: []
};

var takeCard = function() {
  if (deck.length == 0) {
    console.debug('shuffling');
    deck = fs.dupe(cards);
  }
  active = fs.takerandom(deck);
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

var countActions = function(card, phase, type) {
  var list = card.actions[phase][type];
  return !list ? 0 : list.length;
}

var renderEnlistAction = function(i) {
  return active.actions[phase].enlist[i];
};

var renderGetsAction = function(i) {
  var fac = active.actions[phase].gets[i].faction;
  var type = active.actions[phase].gets[i].type;
  var qty = active.actions[phase].gets[i].quantity;
  fac = fac ? ('If you are ' + fac+ ' faction ') : '';
  return fac + qty + ' ' + type;
};

var renderMoveAction = function(i) {
  var fac = active.actions[phase].move[i].faction;
  var type = active.actions[phase].move[i].type;
  fac = fac ? ('If you are ' + fac+ ' faction, move ') : 'move ';
  return fac + type;
};

var renderActionSet = function(card, phase, counter, render,
  outerjoin, innerjoin) {
  var ht = '';
  var ij = innerjoin ? innerjoin : '';
  var ct = counter(card, phase) - (innerjoin ? 1 : 0);
  for (var i = 0; i < ct; i++) {
    ht += render(i) + ij + outerjoin;
  }
  if (innerjoin)
    ht += render(ct) + outerjoin;
  return ht;
}

var renderNormal = function() {
  // Check to see if we skip this turn
  // Check to see if they can cross rivers?
  // Check to see rank II
  var htmlMove = '';
  var htmlGets = '';
  var htmlEnlist = '';

  if (active.skip) {
    htmlMove = 'Automa skips this round.';
    htmlGets = '';
    htmlEnlist = '';
  } else {

    htmlMove = renderActionSet(active, phase, countMoveActions,
      renderMoveAction, '<br />', '; otherwise');
    htmlGets = renderActionSet(active, phase, countGetsActions,
      renderGetsAction, '<br />');
    htmlEnlist = renderActionSet(active, phase, countEnlistActions,
      renderEnlistAction, '', ',');
  }
  document.getElementById('normalCard-actions-move').innerHTML = htmlMove;
  document.getElementById('normalCard-actions-gets').innerHTML = htmlGets;
  document.getElementById('normalCard-actions-enlist').innerHTML = htmlEnlist;
};

var renderCombat = function() {
  document.getElementById('combatCard').innerHTML = active.id;
};

var normalCard = function() {
  takeCard();
  renderNormal();
  discards.main.push(active);
  active = {};
};

var combatCard = function() {
  takeCard();
  renderCombat();
  discards.battle.push(active);
  active = {};
};

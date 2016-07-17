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
var deck = [];
var active = {};
var discards = {
  main: [],
  battle: []
};

var takeCard = function() {
  if (deck.length == 0) deck = fs.dupe(cards);
  active = fs.takerandom(deck);
};

var renderNormal = function() {
  // Check to see if we skip this turn
  // Check to see if they can cross rivers?
  // Check to see rank II
  document.getElementById('normalCard').innerHTML = active.id;
};

var renderCombat = function() {
  document.getElementById('combatCard').innerHTML = active.id;
};

var normalCard = function() {
  takeCard();
  renderNormal();
  discards.main.push(card);
};

var combatCard = function() {
  takeCard();
  renderCombat();
  discards.battle.push(card);
};

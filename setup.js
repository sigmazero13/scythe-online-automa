var turns      = [];

var findCard = function(cards,cardNumber){
  return cards.find(function(card) {
    return card.id == cardNumber - 1;
  });
}

var roundTracker = function(){
  var roundCard = $('span#card-id').text()+'';
  $('#last-played-card').text(roundCard);
  $('#current-card-number').show();
  $('#ccard div.message-header').text('Combat Card');
  turns.push(roundCard);
  var msg = 'turn '+(turns.length)+', card #'+roundCard;
  if( findCard(cards,roundCard).star ) msg += ', advancing track';
  console.log( msg );
  if (phase == 1) console.log( turns );
  $('#turn-info').text('Turn '+turns.length);
  $('.centered-cardmeta').attr(
    'title',
    'Last 5 cards (non-combat): '+turns.slice(-6).reverse().join(', '));

  var decklist = '';
  for(var card of deck){
    decklist += (card.id + 1) + ' ';
  }
  console.log(decklist);
}

// turn tracker
$('#playcombatcard').click(function(){
  var combatCardNumber = discards.battle[discards.battle.length-1].id + 1;
  $('#ccard div.message-header').text('Combat Card #'+combatCardNumber);
});
$('#playcard').click( roundTracker );
$('#checklastcard').click( function(){
  $('#last-played-card').text($('span#card-id').text()+'');  
  $('#ccard div.message-header').text('Combat Card');
  $('#checklastcard').hide();
  $('#showpresentcard').show();
});

$('#showpresentcard').hide();
$('#showpresentcard').click( function(){
  if ( ! discards.main.length ){ return false; }
  var card = discards.main[discards.main.length - 1];
  renderNormal(card,phase);
  renderCombat(card);
  renderIsCombat(false);
  renderCardPhase(phase);
  $('#last-played-card').text($('span#card-id').text()+'');
  $('#ccard div.message-header').text('Combat Card');
  $('#checklastcard').removeAttr('disabled').show();
  $('#showpresentcard').hide();
});
// reset
$('#reset').click(function(){ 
  turns.length = 0; $('#tracker').attr('title','');
  $('#current-card-number').hide();
  $('span#card-id').text('');
  $('#showpresentcard').hide();
  $('#checklastcard').show().attr('disabled','disabled');
});

$('#current-card-number').hide().append('<span id="last-played-card"></span>');
$('span#card-id').hide();
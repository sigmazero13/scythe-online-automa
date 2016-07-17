var profiles = [{
  autometta: {
    type: 'easy',
    rivers: 5,
    grid: [0,0,0,0,0,1,1,1,1,1,2,1,1,1,1,2,1,1,2,1,2,1,2,2]
  }
}];
var cards = [{
  id: 0,
  actions: [{
    move: [
      {
        type: 'worker',
        faction: 'blue'
      },
      {
        type: 'factory'
      },
      {
        type: 'character'
      }
    ],
    gets: {
      power: 1,
      worker: 1
    },
    enlist: {
      power: 1
    }
  },{
    move: [{
      type: 'worker'
    }],
    gets: {
      power: 4
    },
    enlist: {
      power: 1
    }
  }],
  combat: {
    spend: [6, 7, 7],
    cards: 1,
    resources: 1
  },
  star: true
}];

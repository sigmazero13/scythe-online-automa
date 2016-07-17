var profiles = [{
  type: 'easy',
  name: 'Autometta',
  rivers: 5,
  phase: 11,
  grid: [0,0,0,0,0,1,1,1,1,1,2,1,1,1,1,2,1,1,2,1,2,1,2,2]
}];
/*
{
  id: 0,
  skip: false,
  star: false,
  combat: {
    spend: [],
    cards: 0,
    resources: 0
  },
  actions: [{
    move: [],
    gets: [],
    enlist: []
  },{
    move: [],
    gets: [],
    enlist: []
  }],
}
*/
var cards = [{
  id: 0,
  skip: false,
  star: true,
  combat: {
    spend: [6, 7, 7],
    cards: 1,
    resources: 1
  },
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
    gets: [{
      type: 'power',
      quantity: 1
    },{
      type: 'worker',
      quantity: 1
    }],
    enlist: ['power']
  },{
    move: [{
      type: 'worker'
    }],
    gets: [{
      type: 'power',
      quantity: 4
    }],
    enlist: ['power']
  }]
},{
  id: 1,
  skip: false,
  star: true,
  combat: {
    spend: [5,6,7],
    cards: 2,
    resources: 2
  },
  actions: [{
    move: [{
      faction: 'white',
      type: 'factory'
    },{
      type: 'worker'
    }],
    gets: [{
      faction: 'yellow',
      type: 'gold',
      quantity: 1
    },{
      type: 'gold',
      quantity: 1
    }],
    enlist: []
  },{
    move: [{
      faction: 'white',
      type: 'factory'
    },{
      type: 'worker'
    }],
    gets: [{
      faction: 'yellow',
      type: 'gold',
      quantity: 1
    },{
      type: 'powercard',
      quantity: 1
    },{
      type: 'character',
      quantity: 1
    }],
    enlist: ['gold']
  }]
},{
  id: 2,
  skip: false,
  star: true,
  combat: {
    spend: [3,7,7],
    cards: 0,
    resources: 0
  },
  actions: [{
    move: [{
      type: 'worker'
    }],
    gets: [{
      type: 'power',
      quantity: 3
    }],
    enlist: []
  },{
    move: [{
      type: 'worker'
    }],
    gets: [{
      type: 'power',
      quantity: 2
    },{
      type: 'worker',
      quantity: 1
    }],
    enlist: ['popularity']
  }]
}];

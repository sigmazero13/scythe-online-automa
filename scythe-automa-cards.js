var profiles = [{
  t: 'easy',
  name: 'Autometta',
  rivers: 5,
  phase: 11,
  grid: [0,0,0,0,0,1,1,1,1,1,2,1,1,1,1,2,1,1,2,1,2,1,2,2]
},{
  t: 'normal',
  name: 'Automa',
  rivers: 4,
  phase: 10,
  grid: [0,0,0,0,1,1,1,1,1,2,1,1,1,1,2,1,1,2,1,2,2,2]
},{
  t: 'hard',
  name: 'Automaszyna',
  rivers: 3,
  phase: 10,
  grid: [0,0,0,1,1,1,1,1,1,2,1,1,2,1,2,1,2,2,2]
},{
  t: 'very hard',
  name: 'Ultimaszyna',
  rivers: 0,
  phase: 9,
  grid: [1,1,1,1,1,1,1,1,2,1,1,2,1,2,1,2,2,2]
}];

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
        t: 'worker',
        faction: 'blue'
      },
      {
        t: 'facobj'
      },
      {
        t: 'character'
      }
    ],
    gets: [{
      t: 'power',
      q: 1
    },{
      t: 'worker',
      q: 1
    }],
    enlist: ['power']
  },{
    move: [{
      t: 'worker'
    }],
    gets: [{
      t: 'power',
      q: 4
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
      t: 'facobj'
    },{
      t: 'worker'
    }],
    gets: [{
      faction: 'yellow',
      t: 'gold',
      q: 1
    },{
      t: 'gold',
      q: 1
    }],
    enlist: []
  },{
    move: [{
      faction: 'white',
      t: 'facobj'
    },{
      t: 'worker'
    }],
    gets: [{
      faction: 'yellow',
      t: 'gold',
      q: 1
    },{
      t: 'powercard',
      q: 1
    },{
      t: 'charormech',
      q: 1
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
      t: 'worker'
    }],
    gets: [{
      t: 'power',
      q: 3
    }],
    enlist: []
  },{
    move: [{
      t: 'worker'
    }],
    gets: [{
      t: 'power',
      q: 2
    },{
      t: 'worker',
      q: 1
    }],
    enlist: ['popularity']
  }]
},{
  id: 3,
  skip: true,
  star: false,
  combat: {
    spend: [0,1,2],
    cards: 1,
    resources: 0
  },
  actions: [{
    move: [{
      t: 'worker'
    }],
    gets: [{
      faction: 'yellow',
      t: 'gold',
      q: 1
    },{
      t: 'powercard',
	    q: 1,
    },{
      t: 'powercard'
    }],
    enlist: ['powercard']
  },{
    move: [{
      t: 'worker'
    }],
    gets: [{
      faction: 'yellow',
      t: 'gold',
      q: 1
    },{
      t: 'gold',
      q: 2
    }],
    enlist: ['power']
  }]
},{
  id: 4,
  skip: false,
  star: true,
  combat: {
    spend: [2,4,7],
    cards: 1,
    resources: 4
  },
  actions: [{
    move: [{
      faction: 'green',
      t: 'facobj'
    },{
      t: 'worker'
    }],
    gets: [{
      faction: 'purple',
      t: 'charormech',
      q: 1
    },{
      t: 'worker',
      q: 1
    },{
      t: 'gold',
      q: 1
    }],
    enlist: ['gold']
  },{
    move: [{
      t: 'mech'
    }],
    gets: [{
      t: 'power',
      q: 4
    },{
      t: 'worker',
      q: 1
    }],
    enlist: ['powercard']
  }]
},{
  id: 5,
  skip: false,
  star: true,
  combat: {
    spend: [7,7,7],
    cards: 1,
    resources: 0
  },
  actions: [{
    move: [{
      t: 'worker'
    }],
    gets: [{
      t: 'power',
      q: 2
    }],
    enlist: []
  },{
    move: [{
      t: 'mech'
    }],
    gets: [{
      faction: 'yellow',
      t: 'gold',
      q: 1
    },{
      t: 'power',
      q: 2
    },{
      t: 'charormech',
      q: 1
    }],
    enlist: ['power']
  }]
},{
  id: 6,
  skip: true,
  star: true,
  combat: {
    spend: [5,7,7],
    cards: 0,
    resources: 2
  },
  actions: [{
    move: [{
      faction: 'black',
      t: 'attack',
      o: 'charormech',
      p: 5
    },{
      t: 'worker'
    }],
    gets: [{
      t: 'worker',
      q: 1
    },{
      t: 'gold',
      q: 1
    }],
    enlist: ['popularity']
  },{
    move: [{
      faction: 'black',
      t: 'attack',
      o: 'charormech',
      p: 5
    },{
      t: 'mech'
    }],
    gets: [{
      faction: 'red',
      t: 'charormech',
      q: 1
    },{
      t: 'charormech',
      q: 1
    },{
      t: 'powercard',
      q: 1
    }],
    enlist: ['gold']
  }]
},{
  id: 7,
  skip: true,
  star: true,
  combat: {
    spend: [0,5,7],
    cards: 2,
    resources: 1
  },
  actions: [{
    move: [{
      faction: 'purple',
      t: 'facobj'
    },{
      t: 'mech'
    },{
      t: 'worker'
    }],
    gets: [{
      faction: 'red',
      t: 'charormech',
      q: 1
    },{
      t: 'charormech',
      q: 1
    }],
    enlist: []
  },{
    move: [{
      faction: 'purple',
      type: 'facobj'
    },{
      t: 'mech'
    }],
    gets: [{
      faction: 'black',
      t: 'power',
      q: 1
    },{
      t: 'gold',
      q: 1
    },{
      t: 'charormech',
      q: 1
    }],
    enlist: ['gold']
  }]
},{
  id: 8,
  skip: false,
  star: true,
  combat: {
    spend: [4,7,7],
    cards: 1,
    resources: 3
  },
  actions: [{
    move: [{
      faction: 'white',
      t: 'facobj'
    },{
      t: 'mech'
    },{
      t: 'worker'
    }],
    gets: [{
      t: 'worker',
      q: 1
    },{
      t: 'charormech',
      q: 1
    }],
    enlist: ['popularity']
  },{
    move: [{
      faction: 'white',
      t: 'facobj'
    },{
      t: 'mech'
    }],
    gets: [{
      t: 'power',
      q: 3
    },{
      t: 'worker',
      q: 1
    }],
    enlist: ['popularity']
  }]
},{
  id: 9,
  skip: false,
  star: true,
  combat: {
    spend: [0,0,0],
    cards: 1,
    resources: 1
  },
  actions: [{
    move: [{
      t: 'mech'
    },{
      t: 'worker'
    }],
    gets: [{
      t: 'charormech',
      q: 1
    },{
      t: 'power',
      q: 2
    }],
    enlist: []
  },{
    move: [{
      t: 'mech'
    }],
    gets: [{
      t: 'gold',
      q: 2
    },{
      t: 'charormech',
      q: 1
    }],
    enlist: []
  }]
},{
  id: 10,
  skip: false,
  star: true,
  combat: {
    spend: [6,7,7],
    cards: 2,
    resources: 0
  },
  actions: [{
    move: [{
      t: 'mech'
    },{
      t: 'facobj'
    },{
      t: 'character'
    }],
    gets: [{
      faction: 'red',
      t: 'worker',
      q: 1
    },{
      t: 'worker',
      q: 1
    },{
      t: 'gold',
      q: 1
    }],
    enlist: []
  },{
    move: [{
      faction: 'blue',
      t: 'worker'
    },{
      t: 'facobj'
    },{
      t: 'character'
    }],
    gets: [{
      t: 'power',
      q: 3
    },{
      t: 'worker',
      q: 1
    }],
    enlist: ['powercard']
  }]
},{
  id: 11,
  skip: false,
  star: true,
  combat: {
    spend: [4,5,7],
    cards: 2,
    resources: 1
  },
  actions: [{
    move: [{
      faction: 'blue',
      t: 'worker'
    },{
      t: 'mech'
    }],
    gets: [{
      t: 'power',
      q: 4
    }],
    enlist: []
  },{
    move: [{
      faction: 'blue',
      t: 'worker'
    },{
      t: 'mech'
    }],
    gets: [{
      t: 'powercard',
      q: 1
    },{
      t: 'gold',
      q: 1
    },{
      t: 'charormech',
      q: 1
    }],
    enlist: ['power']
  }]
},{
  id: 12,
  skip: false,
  star: true,
  combat: {
    spend: [3,5,7],
    cards: 3,
    resources: 0
  },
  actions: [{
    move: [{
      faction: 'black',
      t: 'attack',
      o: 'charormech',
      p: 4
    },{
      t: 'facobj'
    },{
      t: 'character'
    }],
    gets: [{
      t: 'gold',
      q: 1
    }],
    enlist: []
  },{
    move: [{
      faction: 'black',
      t: 'attack',
      o: 'charormech',
      p: 5
    },{
      t: 'facobj'
    },{
      t: 'character'
    }],
    gets: [{
      t: 'powercard',
      q: 1
    },{
      t: 'gold',
      q: 2
    }],
    enlist: ['gold']
  }]
},{
  id: 13,
  skip: false,
  star: true,
  combat: {
    spend: [1,1,1],
    cards: 1,
    resources: 0
  },
  actions: [{
    move: [{
      t: 'facobj'
    },{
      t: 'character'
    }],
    gets: [{
      t: 'worker',
      q: 1
    },{
      t: 'powercard',
      q: 1
    }],
    enlist: ['powercard']
  },{
    move: [{
      t: 'attack',
      o: 'charormech',
      p: 7
    },{
      t: 'attack',
      o: 'worker'
    },{
      t: 'mech'
    }],
    gets: [{
      t: 'power',
      q: 3
    }],
    enlist: ['popularity']
  }]
},{
  id: 14,
  skip: false,
  star: true,
  combat: {
    spend: [7,7,7],
    cards: 0,
    resources: 2
  },
  actions: [{
    move: [{
      t: 'facobj'
    },{
      t: 'character'
    }],
    gets: [{
      t: 'power',
      q: 3
    },{
      t: 'gold',
      q: 1
    }],
    enlist: ['gold']
  },{
    move: [{
      t: 'attack',
      o: 'charormech',
      p: 1
    },{
      t: 'attack',
      o: 'worker'
    },{
      t: 'facobj'
    },{
      t: 'character'
    }],
    gets: [{
      faction: 'yellow',
      t: 'gold',
      q: 1
    },{
      t: 'gold',
      q: 1
    }],
    enlist: ['powercard']
  }]
},{
  id: 15,
  skip: false,
  star: true,
  combat: {
    spend: [5,7,7],
    cards: 1,
    resources: 4
  },
  actions: [{
    move: [{
      t: 'facobj'
    },{
      t: 'character'
    }],
    gets: [{
      t: 'charormech',
      q: 1
    }],
    enlist: []
  },{
    move: [{
      t: 'attack',
      o: 'charormech',
      p: 5
    },{
      t: 'attack',
      o: 'worker'
    },{
      t: 'mech'
    }],
    gets: [{
      faction: 'black',
      t: 'power',
      q: 1
    },{
      t: 'charormech',
      q: 1
    },{
      t: 'gold',
      q: 1
    }],
    enlist: []
  }]
},{
  id: 16,
  skip: true,
  star: false,
  combat: {
    spend: [7,7,7],
    cards: 2,
    resources: 2
  },
  actions: [{
    move: [{
      t: 'attack',
      o: 'charormech',
      p: 6
    },{
      t: 'attack',
      o: 'worker'
    },{
      t: 'worker'
    }],
    gets: [{
      t: 'gold',
      q: 2
    }],
    enlist: ['power']
  },{
    move: [{
      t: 'attack',
      o: 'charormech',
      p: 8
    },{
      t: 'worker'
    }],
    gets: [{
      faction: 'yellow',
      t: 'gold',
      q: 1
    },{
      t: 'gold',
      q: 1
    },{
      t: 'worker',
      q: 1
    }],
    enlist: ['popularity']
  }]
},{
  id: 17,
  skip: false,
  star: true,
  combat: {
    spend: [1,1,7],
    cards: 0,
    resources: 1
  },
  actions: [{
    move: [{
      t: 'facobj'
    },{
      t: 'character'
    }],
    gets: [{
      faction: 'green',
      t: 'worker',
      q: 1
    },{
      t: 'worker',
      q: 1
    },{
      t: 'gold',
      q: 1
    }],
    enlist: []
  },{
    move: [{
      t: 'facobj'
    },{
      t: 'character'
    }],
    gets: [{
      faction: 'green',
      t: 'charormech',
      q: 1
    },{
      t: 'worker',
      q: 1
    },{
      t: 'gold',
      q: 2
    }],
    enlist: []
  }]
},{
  id: 18,
  skip: false,
  star: true,
  combat: {
    spend: [7,7,7],
    cards: 1,
    resources: 1
  },
  actions: [{
    move: [{
      t: 'attack',
      o: 'worker'
    },{
      t: 'worker'
    }],
    gets: [{
      t: 'worker',
      q: 1
    }],
    enlist: []
  },{
    move: [{
      faction: 'green',
      t: 'facobj'
    },{
      t: 'attack',
      o: 'worker'
    },{
      t: 'worker'
    }],
    gets: [{
      t: 'power',
      q: 3
    },{
      t: 'gold',
      q: 1
    }],
    enlist: ['powercard']
  }]
}];

/* Template
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
  }]
}
*/

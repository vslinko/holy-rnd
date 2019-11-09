function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}

const me = API.getCurrentPosition();

const enemies = API.getEnemies().map(e => {
  return {
    ...e.position,
    distance: getDistance(me, e.position),
  }
});

const nearestEnemy = enemies.concat().sort((a, b) => a.distance - b.distance)[0]


console.log(me, nearestEnemy, API.getActionPointsCount())

if (nearestEnemy.distance <= API.getActionPointsCount()) {
  console.log('<=3')
  API.move(nearestEnemy.x, nearestEnemy.y)
} else if (nearestEnemy.distance > 3 && nearestEnemy.distance <= 4) {
  if (me.x != nearestEnemy.x) {
    console.log('~4x')
    API.move(
      me.x + (nearestEnemy.x == 0 ? 0 : (nearestEnemy.x > me.x ? -1 : 1)),
      me.y,
    );
    } else {
    console.log('~4y')
    API.move(
      me.x,
      me.y + (nearestEnemy.y == 0 ? 0 : (nearestEnemy.y > me.y ? -1 : 1)),
    );
  }
} else if (nearestEnemy.distance > 4 && nearestEnemy.distance <= 5) {
  if (me.x != nearestEnemy.x) {
    console.log('~5x')
    API.move(
      me.x + (nearestEnemy.x == 0 ? 0 : (nearestEnemy.x > me.x ? 1 : -1)),
      me.y,
    );
    } else {
    console.log('~5y')
    API.move(
      me.x,
      me.y + (nearestEnemy.y == 0 ? 0 : (nearestEnemy.y > me.y ? 1 : -1)),
    );
  }
} else {
  console.log('>5')
  API.move(
    me.x + (nearestEnemy.x == 0 ? 0 : (nearestEnemy.x > me.x ? 1 : -1)),
    me.y + (nearestEnemy.y == 0 ? 0 : (nearestEnemy.y > me.y ? 1 : -1)),
  );
}

console.log()

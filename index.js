function getDistance(p1, p2) {
  return Math.round(Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)))
}

const me = API.getCurrentPosition();
const size = API.getArenaSize();

const enemies = API.getEnemies().map(e => {
  return {
    ...e.position,
    distance: getDistance(me, e.position),
  }
});

const nearestEnemy = enemies.concat().sort((a, b) => a.distance - b.distance)[0]

const diffX = me.x != nearestEnemy.x
const diffY = me.y != nearestEnemy.y
const moveType = diffX && diffY ? 'DIAGONAL' : (
  diffX ? 'X' : 'Y'
)

switch (moveType) {
  case 'DIAGONAL':
    API.move(
      me.x + (nearestEnemy.x > me.x ? 1 : -1),
      me.y + (nearestEnemy.y > me.y ? 1 : -1),
    );
    break;
  case 'X':
      API.move(
        me.x + Math.max(-2, Math.min(2, nearestEnemy.x - me.x)),
        me.y
      );
      break;
  case 'Y':
      API.move(
        me.x,
        me.y + Math.max(-2, Math.min(2, nearestEnemy.y - me.y)),
      );
      break;
}

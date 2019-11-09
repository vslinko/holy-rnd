// function getDistance(p1, p2) {
//   return Math.round(Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)))
// }
function getDistance(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}

const me = API.getCurrentPosition();

const enemies = API.getEnemies().map(e => {
  return {
    ...e.position,
    distance: getDistance(me, e.position),
  }
});

const nearestEnemy = enemies.concat().sort((a, b) => a.distance - b.distance)[0]

const diffX = me.x != nearestEnemy.x
const diffY = me.y != nearestEnemy.y
const oddDistance = nearestEnemy.distance % 2 == 0
const moveType = diffX && diffY ? 'DIAGONAL' : (
  diffX ? 'X' : 'Y'
)

if (nearestEnemy.distance === 4) {
  // continue
} else if (nearestEnemy.distance < 4) {
  API.move(nearestEnemy.x, nearestEnemy.y)
} else {
  API.move(
    me.x + (nearestEnemy.x == 0 ? 0 : (nearestEnemy.x > me.x ? 1 : -1)),
    me.y + (nearestEnemy.y == 0 ? 0 : (nearestEnemy.y > me.y ? 1 : -1)),
  );
}

// switch (moveType) {
//   case 'DIAGONAL':
//     API.move(
//       me.x + (nearestEnemy.x > me.x ? 1 : -1),
//       me.y + (nearestEnemy.y > me.y ? 1 : -1),
//     );
//     break;
//   case 'X':
//       if (nearestEnemy.distance == 5) {
//         API.move(
//           me.x + Math.max(-1, Math.min(1, nearestEnemy.x - me.x)),
//           me.y
//         );
//       } else if (nearestEnemy.distance == 4) {
//         API.move(
//           me.x,
//           me.y
//         );
//       } else {
//         API.move(
//           me.x + Math.max(-3, Math.min(3, nearestEnemy.x - me.x)),
//           me.y
//         );
//       }
//       break;
//   case 'Y':
//       if (nearestEnemy.distance == 5) {
//         API.move(
//           me.x,
//           me.y + Math.max(-1, Math.min(1, nearestEnemy.y - me.y)),
//         );
//       } else if (nearestEnemy.distance == 4) {
//         API.move(
//           me.x,
//           me.y,
//         );
//       } else {
//         API.move(
//           me.x,
//           me.y + Math.max(-3, Math.min(3, nearestEnemy.y - me.y)),
//         );
//       }
//       break;
// }

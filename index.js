// git@github.com:vslinko/holy-rnd.git

function getDistance(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}

const me = API.getCurrentPosition();
const enemies = API.getEnemies();

const map = new Array(API.getArenaSize()).fill(0)
  .map(() => new Array(API.getArenaSize()).fill(0));

enemies.forEach((e) => {
  for (let x = Math.max(0, e.position.x - 4); x < Math.min(e.position.x + 4, API.getArenaSize()); x++) {
    for (let y = Math.max(0, e.position.y - 4); y < Math.min(e.position.y + 4, API.getArenaSize()); y++) {
      if (x == e.position.x && y == e.position.y) {
        if (getDistance(me, e.position) <= API.getActionPointsCount()) {
          map[x][y] += 2
        } else if (e.name !== 'nin-jin') {
          map[x][y] -= 10
        }
      } else if (getDistance({x,y}, e.position) <= 3) {
        map[x][y] -= 10
      }
    }
  }
});

const possibleMoves = []
for (let x = Math.max(0, me.x - 4); x < Math.min(me.x + 4, API.getArenaSize()); x++) {
  for (let y = Math.max(0, me.y - 4); y < Math.min(me.y + 4, API.getArenaSize()); y++) {
    const distanceFromMe = getDistance({x,y}, me)
    const myCell = x == me.x && y == me.y
    const couldMove = myCell || distanceFromMe <= API.getActionPointsCount()
    if (couldMove) {
      if (map[x][y] == 0 && !myCell && distanceFromMe <= 2) {
        const minDistance = Math.min(...enemies.map(e => getDistance({ x, y }, e.position)))
        if (minDistance > 0) {
          map[x][y] += 1/minDistance
        }
      }

      possibleMoves.push({ x, y, score: map[x][y]})
    }
  }
}

const bestMove = possibleMoves.sort((a, b) => b.score - a.score)[0]

// console.log(map)
// console.log(possibleMoves)
// console.log(bestMove)

API.move(bestMove.x, bestMove.y)
function getAdjacents(digit) {
  const keypad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', ''],
  ];

  const curRow = keypad.find((row) => row.indexOf(digit) !== -1);
  const xi = keypad.indexOf(curRow);
  const yi = curRow.indexOf(digit);

  const lft = curRow[yi - 1];
  const rgt = curRow[yi + 1];
  const top = keypad[xi - 1] && keypad[xi - 1][yi];
  const btm = keypad[xi + 1] && keypad[xi + 1][yi];

  return [digit, lft, rgt, top, btm].filter((n) => n);
}

function combine(adj) {
  if (adj.length === 1) return [];

  const [first, second] = adj;
  const result = first.map((a) => second.map((b) => a + b));

  return [...[].concat.apply([], result), ...combine(adj.splice(1))];
}

function getCombos(adj) {
  const [first, second, ...rest] = adj;

  if (adj.length === 0) return [];
  if (adj.length === 1) return first;
  if (adj.length === 2) return combine(adj);

  return getCombos([combine([first, second]), ...rest]);
}

function getPINs(number = '') {
  const digits = number.toString().split('') || [];
  const adjacents = digits.map((digit) => getAdjacents(digit));

  return getCombos(adjacents);
}

getPINs('369');

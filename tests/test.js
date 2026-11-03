// Tests du moteur de conception : node tests/test.js
const assert = require('assert');
const T = require('../tesla.js');
const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) / Math.abs(b) <= tol, msg + ' : ' + a + ' au lieu de ' + b);

// 1. Wheeler : r = 1 in, h = 4 in, N = 100 -> 1·10000 / (9 + 40) = 204,08 µH
near(T.wheelerSolenoid(25.4, 101.6, 100), 204.08e-6, 1e-4, 'Wheeler solénoïde');
// 2. Spirale plate : R = 2 in, W = 1 in, N = 10 -> 4·100 / (16 + 11) = 14,81 µH
near(T.wheelerSpiral(50.8, 25.4, 10), 14.815e-6, 1e-4, 'Wheeler spirale');
// 3. Sphère isolée de 100 mm : 4·π·ε0·0,05 = 5,563 pF
near(T.sphereCap(100), 5.5633e-12, 1e-4, 'capacité de la sphère');
// 4. Medhurst : r = 5 cm, h = 40 cm -> 0,29·40 + 0,41·5 + 1,94·√(125/40) = 17,08 pF
near(T.medhurst(50, 400), 17.079e-12, 1e-3, 'Medhurst');
// 5. Résonance : L = 1 mH, C = 1 nF -> 159,15 kHz
near(T.resonance(1e-3, 1e-9), 159154.9, 1e-5, 'résonance');

// 6. Bobine complète : le primaire trouvé résonne bien à la fréquence du secondaire
const r = T.design({ mode: 'sgtc', coilDia: 100, windLen: 400, wireDia: 0.3, topDia: 150, primCapNf: 20, primInnerDia: 140, primPitch: 8 });
assert.ok(r.ok);
assert.strictEqual(r.sec.turns, 1333);
const n = r.prim.turns;
const Lp = T.wheelerSpiral(140 / 2 + n * 8 / 2, n * 8, n);
near(T.resonance(Lp, 20e-9), r.sec.f, 1e-6, 'accord primaire / secondaire');

// 7. Plus de hauteur -> fréquence plus basse (même tube, même fil)
const s = T.sweep({ coilDia: 100, wireDia: 0.3, topDia: 150 }, 40);
for (let i = 1; i < s.length; i++) assert.ok(s[i].f < s[i - 1].f, 'la fréquence doit baisser quand la hauteur augmente');

// 8. Erreurs et avertissements
assert.ok(!T.design({ mode: 'sgtc', coilDia: 0, windLen: 400, wireDia: 0.3, topDia: 0, primCapNf: 20, primInnerDia: 140, primPitch: 8 }).ok);
const w = T.design({ mode: 'sstc', coilDia: 100, windLen: 150, wireDia: 1, topDia: 0, primTurns: 5 });
const codes = w.issues.map((i) => i.code);
for (const c of ['fewTurns', 'aspectLow', 'noTop']) assert.ok(codes.includes(c), c);

console.log('OK : tous les tests passent');

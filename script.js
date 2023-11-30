/*
	振り子シミュレーション
	2023/11/30 ESモジュールに変更
	2020/10/21 新規作成
*/

import RungeKuttaSolver from "./RungeKuttaSolver.js";
import Viewer from "./Viewer.js";

const info = document.getElementById("info");

//min～maxのランダムな値
const random = (min,max) => (max - min) * Math.random() + min;

//条件
const m = random(1,10);
const l = random(0.1,1.0);
const th = random(-3,3);

const g = 9.80665;	//[m/s2]

// th'' = - g * sin(th) / l
const rks = new RungeKuttaSolver(0.01,[th,0],function(t,x){
	return [
		x[1],
		-g * Math.sin(x[0]) / l
	];
});

const vw = new Viewer("cv",300,300,150);

setInterval(function(){
	const th = rks.getX()[0];
	const dth = rks.getX()[1];
	
	//速度(x,yの各成分)
	const vx = l * dth * Math.cos(th);
	const vy = l * dth * Math.sin(th);
	
	//位置(y方向)
	const py = -l * Math.cos(th);
	
	//運動エネルギー
	const E = m * (vx * vx + vy * vy) * 0.5;
	
	//位置エネルギー
	const U = m * g * (l + py);
	
	//表示
	vw.draw(th,l,m);
	
	info.innerHTML = [
		"t[s]=" + rks.getTime().toFixed(2),
		"th[rad]=" + th.toFixed(2),
		"th'[rad/s]=" + dth.toFixed(2),
		"L[m]=" + l.toFixed(2),
		"M[kg]=" + m.toFixed(2),
		"E[J]=" + (E + U).toFixed(4),
	].join("<br>");
	
	for(let i=0;i<3;i++) rks.step();
},30);
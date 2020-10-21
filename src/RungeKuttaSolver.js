/*
	Runge–Kutta法による連立常微分方程式の計算
	2020/10/21 新規作成
*/

//[v1] + [v2]
const add = function(v1,v2){
	return v1.map((e,i) => e + v2[i]);
};

//[v1] + [v2] + [v3] + [v4]
const add4 = function(v1,v2,v3,v4){
	return v1.map((e,i) => e + v2[i] + v3[i] + v4[i]);
};

//k * [v]
const mul = function(k,v){
	return v.map(e => e * k);
};

module.exports = function(dt,x,f){
	
	let t = 0;
	const dt2 = dt * 0.5;
	const dt6 = dt / 6;
	
	this.step = function(){
		const k1 = f(t, x);
		const k2 = f(t + dt2, add(x,mul(dt2,k1)));
		const k3 = f(t + dt2, add(x,mul(dt2,k2)));
		const k4 = f(t + dt, add(x,mul(dt,k3)));
		
		x = add(x,mul(dt6,add4(k1,mul(2,k2),mul(2,k3),k4)));
		t += dt;
	};
	
	this.getX = function(){
		return x;
	};
	
	this.getTime = function(){
		return t;
	};
}
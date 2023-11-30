/*
	Runge–Kutta法による連立常微分方程式の計算
	2023/11/30 ESモジュールのクラスに変更
	2020/10/21 新規作成
*/

//[v1] + [v2]
const add = (v1,v2) => v1.map((e,i) => e + v2[i]);

//[v1] + [v2] + [v3] + [v4]
const add4 = (v1,v2,v3,v4) => v1.map((e,i) => e + v2[i] + v3[i] + v4[i]);

//k * [v]
const mul = (k,v) => v.map(e => e * k);

export default class{
	constructor(dt,x,f){
		this.dt = dt;
		this.x = x;
		this.f = f;
		this.t = 0;
		this.dt2 = dt * 0.5;
		this.dt6 = dt / 6;
	}
	
	step(){
		const k1 = this.f(this.t, this.x);
		const k2 = this.f(this.t + this.dt2, add(this.x,mul(this.dt2,k1)));
		const k3 = this.f(this.t + this.dt2, add(this.x,mul(this.dt2,k2)));
		const k4 = this.f(this.t + this.dt, add(this.x,mul(this.dt,k3)));
		
		this.x = add(this.x,mul(this.dt6,add4(k1,mul(2,k2),mul(2,k3),k4)));
		this.t += this.dt;
	}
	
	getX(){
		return this.x;
	}
	
	getTime(){
		return this.t;
	}
}

//質量m[kg]で密度d[km/m3]の球の半径
const getR = function(m){
//	const d = 1000; //水
	const d = 7870; //鉄
	return Math.pow((m/d)*3/(4*Math.PI),1/3);
};

//中心を描く
const drawCenter = function(ctx,r){
	ctx.beginPath();
	ctx.arc(0,0,r,0,Math.PI * 2);
	ctx.fill();
};

//振り子を描く
const drawArm = function(ctx,l,r){
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(0,l);
	ctx.stroke();
	ctx.closePath();
	
	ctx.beginPath();
	ctx.arc(0,l,r,0,Math.PI * 2);
	ctx.fill();
};

//表示画面
//scale[px/m]
export default function(elementId,width,height,scale){
	const canvas = document.getElementById(elementId);
	canvas.width = width;
	canvas.height = height;
	
	const ctx = canvas.getContext("2d");
	ctx.fillStyle = "rgba(0,0,0,1.0)";
	ctx.strokeStyle = "rgba(0,0,0,1.0)";
	
	this.draw = function(th,l,m){
		ctx.save();
		ctx.clearRect(0,0,width,height);
		ctx.translate(width * 0.5,height * 0.5);
		
		drawCenter(ctx,5);
		
		ctx.rotate(-th);
		drawArm(ctx,l * scale,getR(m) * scale);
		
		ctx.restore();
	};
}
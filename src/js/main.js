var cnv,ctx,lines=[],particles=[]
function init(){
	cnv=document.getElementsByClassName("cnv")[0]
	cnv.width=window.innerWidth
	cnv.height=window.innerHeight
	ctx=cnv.getContext("2d")
	create_lines()
	particles.push(new Particle(cnv.width/2,cnv.height/2,true))
	requestAnimationFrame(render)
}
function render(){
	ctx.clearRect(0,0,cnv.width,cnv.height)
	ctx.fillStyle="#000000"
	ctx.fillRect(0,0,cnv.width,cnv.height)
	for (var l of lines){
		l.draw()
	}
	for (var p of particles){
		p.draw()
	}
	requestAnimationFrame(render)
}
function mouseMove(e){
	if (lines.length==0){return}
	var x=Math.min(Math.max(e.clientX,0),cnv.width)
	var y=Math.min(Math.max(e.clientY,0),cnv.height)
	for (var p of particles){
		if (p.mouse==false){continue}
		p.pos={x,y}
		p.update()
	}
}
function create_lines(){
	fetch("./data/board.txt").then((r)=>r.text()).then(function(b){
		b=b.split("\n")
		let w=b[0].split(" ")[0]
		let h=b[0].split(" ")[1]
		let CW=50
		let CH=50
		cnv.width=CW*w
		cnv.height=CH*h
		lines.push(new Line(0,0,cnv.width,0,false))
		lines.push(new Line(cnv.width,0,cnv.width,cnv.height,false))
		lines.push(new Line(cnv.width,cnv.height,0,cnv.height,false))
		lines.push(new Line(0,cnv.height,0,0,false))
		var x=0,y=0
		for (var l of b.slice(1)){
			for (var c of l.split(",")){
				if (c.includes("1")){
					lines.push(new Line(x*CW,y*CH,(x+1)*CW,y*CH))
				}
				if (c.includes("2")){
					lines.push(new Line((x+1)*CW,y*CH,(x+1)*CW,(y+1)*CH))
				}
				if (c.includes("3")){
					lines.push(new Line((x+1)*CW,(y+1)*CH,x*CW,(y+1)*CH))
				}
				if (c.includes("4")){
					lines.push(new Line(x*CW,(y+1)*CH,x*CW,y*CH))
				}
				x++
			}
			x=0
			y++
		}
	})
}
document.addEventListener("DOMContentLoaded",init,false)
document.addEventListener("mousemove",mouseMove,false)

class Particle{
	constructor(x,y,mouse=false){
		this.pos={x,y}
		this.mouse=mouse
		this.rays=null
	}
	gen_rays(){
		var a=[],a1=[],a2=[],a3=[],a4=[]
		var off=0.00001
		for (var l of lines){
			a.push(new Ray(this.pos.x,this.pos.y,l.a.x,l.a.y))
			var ang=Math.atan2(l.a.y-this.pos.y,l.a.x-this.pos.x)
			var d=Math.sqrt((l.a.x-this.pos.x)*(l.a.x-this.pos.x)+(l.a.y-this.pos.y)*(l.a.y-this.pos.y))
			a.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang-off*100),this.pos.y+d*Math.sin(ang-off*1000)))
			a.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang+off*100),this.pos.y+d*Math.sin(ang+off*1000)))
			a1.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang-off*75),this.pos.y+d*Math.sin(ang-off*750)))
			a1.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang+off*75),this.pos.y+d*Math.sin(ang+off*750)))
			a2.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang-off*50),this.pos.y+d*Math.sin(ang-off*500)))
			a2.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang+off*50),this.pos.y+d*Math.sin(ang+off*500)))
			a3.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang-off*25),this.pos.y+d*Math.sin(ang-off*250)))
			a3.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang+off*25),this.pos.y+d*Math.sin(ang+off*250)))
			a4.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang-off),this.pos.y+d*Math.sin(ang-off)))
			a4.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang+off),this.pos.y+d*Math.sin(ang+off)))
			a.push(new Ray(this.pos.x,this.pos.y,l.b.x,l.b.y))
			var ang=Math.atan2(l.b.y-this.pos.y,l.b.x-this.pos.x)
			var d=Math.sqrt((l.b.x-this.pos.x)*(l.b.x-this.pos.x)+(l.b.y-this.pos.y)*(l.b.y-this.pos.y))
			a.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang-off*100),this.pos.y+d*Math.sin(ang-off*1000)))
			a.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang+off*100),this.pos.y+d*Math.sin(ang+off*1000)))
			a1.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang-off*75),this.pos.y+d*Math.sin(ang-off*750)))
			a1.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang+off*75),this.pos.y+d*Math.sin(ang+off*750)))
			a2.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang-off*50),this.pos.y+d*Math.sin(ang-off*500)))
			a2.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang+off*50),this.pos.y+d*Math.sin(ang+off*500)))
			a3.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang-off*25),this.pos.y+d*Math.sin(ang-off*250)))
			a3.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang+off*25),this.pos.y+d*Math.sin(ang+off*250)))
			a4.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang-off),this.pos.y+d*Math.sin(ang-off)))
			a4.push(new Ray(this.pos.x,this.pos.y,this.pos.x+d*Math.cos(ang+off),this.pos.y+d*Math.sin(ang+off)))
		}
		return [a4,a3,a2,a1,a]
	}
	update(){
		if (this.rays==null){
			this.rays=this.gen_rays()
		}
		for (var rg of this.rays){
			for (var r of rg){
				r.pos={x:this.pos.x,y:this.pos.y}
				r.update()
			}
		}
	}
	draw(){
		if (this.rays==null){
			return
		}
		for (var rg of this.rays){
			this.draw_light(rg)
		}
		for (var rg of this.rays){
			break
			for (var r of rg){
				r.draw()
			}
		}
		ctx.beginPath()
		ctx.fillStyle="#a020b0"
		ctx.arc(this.pos.x,this.pos.y,5,0,Math.PI*2)
		ctx.fill()
	}
	draw_light(rs){
		var a=[],b=[]
		for (var r of rs){
			b.push([Math.atan2(r.pos2.y-this.pos.y,r.pos2.x-this.pos.x),b.length])
		}
		b.sort((a,b)=>a[0]-b[0])
		for (var o of b){
			a.push(rs[o[1]])
		}
		ctx.beginPath()
		ctx.fillStyle="#ffffff80"
		ctx.moveTo(a[0].end.x,a[0].end.y)
		for (var i=1;i<a.length+1;i++){
			ctx.lineTo(a[i%a.length].end.x,a[i%a.length].end.y)
		}
		ctx.fill()
	}
}
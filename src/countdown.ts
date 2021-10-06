/*
/// <reference path="./typings/globals/jquery/index.d.ts" />
import "./myJS5.js";

declare global {
    interface String {
        trim(): string;
        toHankakuNum(): string;
		replaceAll(org:string, dest:string) : string;
    }
}*/

//import $ = require("jquery");
//import * as $ from 'jquery';

//// <reference path="myJS2.js" />

class CountdownTimer  {
	tid:any = null
	private elem:any = null
	private tl:any = null
	originalD:string = ''
	tasks:string = ''
	private msg:string = ''

	constructor(elem:any, tl:any, originalD:string, tasks:string, msg:string){
		this.initialize( elem, tl, originalD, tasks, msg )
	}

	initialize(elem:any, tl:any, originalD:string, tasks:string, msg:string){
		this.elem = document.getElementById(elem)
		this.tl = tl
		this.originalD = originalD
		this.tasks = tasks
		this.msg = msg
		document.getElementById('tasks').innerHTML = tasks
	}
	
	countDown(){
		let timer:string = ''
		let today:any = new Date()
		let day:number = Math.floor((this.tl-today)/(24*60*60*1000))
		let hour:number = Math.floor(((this.tl-today)%(24*60*60*1000))/(60*60*1000))
		let min:number = Math.floor(((this.tl-today)%(24*60*60*1000))/(60*1000))%60
		let sec:number = Math.floor(((this.tl-today)%(24*60*60*1000))/1000)%60%60
		let milli:number = Math.floor(((this.tl-today)%(24*60*60*1000))/10)%100
		if ( ( this.tl - today ) > 0 ){
			if (day) timer += '<span class="day">'+day+'days</span>'
			if (hour) timer += '<span class="hour">'+hour+':</span>'
			timer += '<span class="min">'+this.addZero(min)+'.</span><span class="sec">'+this.addZero(sec)+'</span><span class="milli">'+this.addZero(milli)+'</span>'
			this.elem.innerHTML = timer
			
			//if ( !this.tid )
				this.tid = setTimeout(()=>{this.countDown();},10 )
		} else {
			if ( (document.querySelector('#sndON') as any).checked )
				this.play()
			this.elem.innerHTML = this.msg
			return
		}
	}

	addZero(num){ return ('0'+num).slice(-2); }
	play(){
		let audio = new Audio('img/snd.mp3');
		audio.play();
	}
}
function plusDateText( d=0, h=0, m=0, s=0 ){
	let tm = new Date()
	tm.setDate(tm.getDate() + d)
	tm.setHours(tm.getHours() + h)
	tm.setMinutes(tm.getMinutes() + m)
	tm.setSeconds(tm.getSeconds() + s)
	//d = '2013/8/30 00:00:00'
	return tm.getFullYear() + '/' + (tm.getMonth() + 1) +'/' + tm.getDate() + ' ' + 
		String(tm.getHours()).padStart(2, '0') + ':' + String(tm.getMinutes()).padStart(2, '0') +':' + 
		String(tm.getSeconds()).padStart(2, '0')
}
function CDT(){
	let snd = localStorage.getItem('sndON')
	if ( snd == 'false' )
		(document.querySelector('#sndON') as HTMLInputElement).checked = false
	
	let d = localStorage.getItem('CDT_DATE')
	let t = localStorage.getItem('CDT_TASKS')
	if ( t ) 
		t = t.replaceAll('\n', '<br>')
	if ( !d )
	{
		d = plusDateText(1,0,0)
		/*let someDate = new Date();
		let numberOfDaysToAdd = 1;
		someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
		//d = '2013/8/30 00:00:00'
		d = someDate.getFullYear() + '/' + (someDate.getMonth() + 1) +'/' + someDate.getDate() + ' ' + someDate.getHours() + ':00:00'
		*/
	}
	if ( !t )
		t = 'Hi-Pri Tasks: test!'
	
	let tl = new Date(d)
	let timer = new CountdownTimer('CDT', tl, d, t, 'done!')
	timer.countDown()
	document.getElementById('inputArea').addEventListener('click', function(e:any){
		if ( e.target.className != "cClickable" )
		{
			e.stopPropagation()
	 		e.preventDefault()
		}
	})
	document.getElementById('sndON').addEventListener('change', function(e){
		localStorage.setItem('sndON', (this as any).checked )
		console.log( localStorage.getItem('sndON') )
	})
	document.querySelector('body').addEventListener('click', function(e:any){
		console.log(e.target.className)
		if ( e.target.className == "cClickable" )
			return true
		clearTimeout(timer.tid)
		timer.tid = null;
		(document.getElementById('inputCDT') as HTMLInputElement).value = timer.originalD;
		(document.getElementById('inputTasks') as HTMLTextAreaElement).value = timer.tasks.replaceAll('<br>', '\n') 
		//$('#inputArea').fadeIn(400)
		document.getElementById('inputArea').style.display = 'block'
		e.stopPropagation()
	 	e.preventDefault()
	})
	document.querySelectorAll('.cBtn_deadline').forEach((v:any) => {
		v.addEventListener('click', function(e:any){
			let cName = e.target.className.replace('cBtn_deadline', '').replaceAll('t_','').trim()
			console.log(cName)
			const el = document.getElementById('inputCDT') as HTMLInputElement
			let f = ''
			switch ( cName ){
				case '3m': f = plusDateText(0,0,0,180 +1); break;
				case '5m': f = plusDateText(0,0,0,300 +1); break;
				case '10m': f = plusDateText(0,0,0,600 +1); break;
				case '1h': f = plusDateText(0,0,0,3600 +1); break;
				case '1d': f = plusDateText(0,0,0,86400 +1); break;
			}
			el.value = f
		})
	})
	document.querySelectorAll('.cBtn_color').forEach((v:any) => {
		v.addEventListener('click', function(e:any){
			let cName = e.target.className.replace('cBtn_color', '').trim()
			console.log(cName)
			const el = document.getElementById('inputTasks') as HTMLTextAreaElement
			let t = cName.toLowerCase().substr(1)
			if ( t == 'yellow' )
				window.insertTextareaSelect('#inputTasks', '', '', true )
			else
				window.insertTextareaSelect('#inputTasks', '<'+t+'>', '</'+t+'>', true )
			//el.value = el.value + t
		})
	})
	document.getElementById('buttonSet').addEventListener('click', function(e){
		timer.originalD = (document.getElementById('inputCDT') as any).value.trim().toHankakuNum()
		timer.tasks = (document.getElementById('inputTasks') as any).value.replaceAll('\n', '<br>')
		localStorage.setItem('CDT_DATE', timer.originalD)
		localStorage.setItem('CDT_TASKS', timer.tasks)
		timer.initialize('CDT', new Date(timer.originalD), timer.originalD, timer.tasks, 'done!')
		timer.countDown()
		//$('#inputArea').fadeOut(400)
		document.getElementById('inputArea').style.display = 'none'
		e.stopPropagation()
	 	e.preventDefault()
	})

}
window.onload = function(){
	CDT()
}

function toggleFullScreen(){
	if (!document.fullscreenElement){
		document.documentElement.requestFullscreen()
	} else {
		if (document.exitFullscreen)
			document.exitFullscreen()
	}
}

document.addEventListener('keyup', function(e){
	let tag = (e.target as any).tagName.toLowerCase()
	if ( tag == 'input' || tag == 'textarea')
		return false
	if (e.key.toLowerCase() == 'f') {
		toggleFullScreen();
	}
}, false);
var isIphoneOrAndroid_var = -1
var isIphone_var = -1
function isIphoneOrAndroid(){
	if ( isIphoneOrAndroid_var != -1 )
		return isIphoneOrAndroid_var
	if ( /iphone|ipad|ipod|android|vita/i.test(navigator.userAgent) )
	{
		isIphoneOrAndroid_var = true
		return true
	}
	isIphoneOrAndroid_var = false
	return false
}
function isIphone(){
	if ( isIphone_var != -1 )
		return isIphone_var
	
	if ( /iphone|ipad|ipod/i.test(navigator.userAgent) )
	{
		isIphone_var = true
		return true
	}
	isIphone_var = false
	return false
}
function isLocalhost(){
	return location.hostname.indexOf('localhost') !== -1
}
function getWindowEvent(){
	if(window.event) return window.event
	var caller = arguments.callee.caller
	while(caller)
	{
		var ob = caller.arguments[0]
		if(ob && ob.constructor == MouseEvent) return ob
		caller = caller.caller
	}
	return null
}
function getOffsetX( e ){
	if ( e.offsetX==undefined)
		return e.offset().left
	
	return e.offsetX
}
function getOffsetY( e ){
	if ( e.offsetY==undefined)
		return e.offset().top
	return e.offsetY
}
function getRand( max, min ){
	if ( min == undefined )
		min = 0
	return min + parseInt( Math.random() * (max-min+1) )
}
function getRandPM(){
	return ( getRand(1) ? 1 : -1 )
}
function getRandAlpha( length ) {
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
	var randomstring = ''
	for (var i=0; i<length; i++)
	{
		var rnum = Math.floor(Math.random() * chars.length)
		randomstring += chars.substring(rnum,rnum+1)
	}
	return randomstring
}
function pad(number, length){
	var str = '' + number
	while (str.length < length) {
		str = '0' + str
	}
	return str
}
function isImageLoaded(img){
	if (!img.complete)
		return false
	if (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0)
		return false
	
	return true;
}
function extractNum( str ){
	if ( str )
	{
		var match = str.match(/[0-9]+/)
		if ( match )
			return match[0]
	}
	return false
}
function isDeltaInRange( a, b, range ){
	if ( Math.abs( Math.abs( a ) -  Math.abs( b ) ) <= range )
		return true;
	return false;
}
function radToDeg( rad ){
	return ( ( rad ) * 180.0 / Math.PI )
}
function degToRad( deg ){
	return ( ( deg ) * Math.PI / 180.0 )
}
function getQueryAry(){
	var result = {}
	var str = location.search.substring( 1 )
	var params = str.split( '&' )
	for ( var i=0; i < params.length; i++ )
	{
		var kv = params[ i ].split( '=' )
		result[ kv[0] ] = decodeURIComponent( kv[1] )
	}
	return result
}
function getParameterByName(name){
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]")
	var regexS = "[\\?&]" + name + "=([^&#]*)"
	var regex = new RegExp(regexS)
	var results = regex.exec(window.location.search)
	if(results == null)
		return ""
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "))
}
function keywordCounter( str, keyword ){
	var strlength = keyword.length
	var ans = 0
	var i = 0
	while ( ( i = str.indexOf( keyword,i ) ) != -1)
	{
		i += strlength
		ans++
	}
	return ans
}
function getStringBetweenTexts( srcString, text1, text2 ){
	var beginPos = srcString.indexOf( text1 ) + text1.length
	var endPos = srcString.indexOf( text2, beginPos )
	if ( beginPos == -1 || endPos == -1 )
		return -1
	
	return srcString.slice( beginPos, endPos )
}
function is2Byte( str, exceptionAry ){
    var value = str.replaceAry( exceptionAry, '' )
    return escape(value).length - value.length != 0
}
function unescapeHTML(input) {
  var y = document.createElement('textarea')
  y.innerHTML = input
  return y.value
}
function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(';')
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf('='))
		y=ARRcookies[i].substr(ARRcookies[i].indexOf('=')+1)
		x=x.replace(/^\s+|\s+$/g,'')
		if (x==c_name)
			return unescape(y)
	}
}
function setCookie(c_name,value,exdays){
	if ( exdays == undefined )
		exdays = 365
	var exdate=new Date()
	exdate.setDate(exdate.getDate() + exdays)
	var c_value=escape(value) + ((exdays==null) ? '' : "; expires="+exdate.toUTCString())
	document.cookie=c_name + '=' + c_value
}
function insertTextareaSelect(sel, f, e, bEraseTag=false){
	let el = document.querySelector(sel)
	let len = el.value.length
	let start = el.selectionStart
	let end = el.selectionEnd
	let selected = el.value.substring(start, end)
	if ( bEraseTag )
		selected = selected.replace(/<[^>]+>/g, '')
	
	let replace = f + selected + e
	el.value = el.value.substring(0,start) + replace + el.value.substring(end,len)
}
// color		///
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
// prototypes	///
String.prototype.replaceAll = function (org, dest){
  return this.split(org).join(dest)
}
String.prototype.replaceAry = function ( aryList, replaceChar ){
	var text = this
	for ( var i=0; i < aryList.length; i++ )
		text = text.replaceAll( aryList[i], replaceChar )
	
	return text
}
String.prototype.replaceAt = function(index, char){
	return this.substr(0, index) + char + this.substr(index+char.length)
}
String.prototype.regexIndexOf = function(regex, startpos){
	var indexOf = this.substring(startpos || 0).search(regex)
	return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf
}
String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g,'')
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/,'')
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,'')
}
String.prototype.isAlpha = function(){
	return this.match( /[^A-Za-z\s.-]+/ ) == null
}
String.prototype.isNumber = function(){
	return this.match( /[^0-9]+/ ) == null
}
String.prototype.isAlNum = function(){
	return this.match(/[^0-9A-Za-z]+/) == null
}
String.prototype.toHankakuNum = function(){
	var han = '0123456789.,--+'
	var zen = '０１２３４５６７８９．，－ー＋'
	var str = ''
	for ( var i=0; i< this.length; i++)
	{
		var c = this.charAt(i)
		var n = zen.indexOf(c,0)
		if (n >= 0) c = han.charAt(n)
		str += c
	}
	return str
}
String.prototype.nl2br = function( str ){
	return str.replace(/\n/g, "<br>")
}
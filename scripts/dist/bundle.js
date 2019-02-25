!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Position=class{isNear(t){throw new Error("Method not implemented.")}constructor(t,e){this.i=t,this.j=e}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=i(2),s=i(3),o=i(4);let r={width:1e3,height:500,halfWidth:500,lineWidth:2,background:{Default:"#08a107",Orange:"#f60",Green:"#f80"},borderColor:{White:"#fff",Green:"#f80"},colorMap:{Orange:"#f60",Green:"#f80"}},l={Default:"12px 'Segoe UI',Arial,sans-serif",Heading:"14px 'Segoe UI',Arial,sans-serif"},h={Default:70,Pixel50:50},a=Math.ceil(70*r.height/100),c=Math.ceil(12*r.width/100),d=(Math.ceil(30*r.height/100/2),Math.ceil(12*r.width/100),Math.ceil(60*a/100)),u=Math.ceil(c/2),f=(Math.ceil(r.width-c/2),{xPosition:{TeamA:c-u/4,TeamB:r.width-c+u/4},yPosition:r.height/2,radius:d/3}),y=(Math.ceil(2*r.height/100),"");window.onload=function(){let t=document.getElementById("text-penta");document.getElementById("btn-convert").onclick=(()=>{let e=o.Serializer.serialize(t.textContent);d.drawPentatonic(e)});let e=0,i=0,a=document.getElementById("penta-representation"),c=a.getContext("2d"),d=new n.Playground(a,c,new s.Styles(20,20));d.setGroundStyles(),setTimeout(function(){d.drawCorner(5,5),d.drawCorner(5,r.height-5),d.drawCorner(r.width-5,5),d.drawCorner(r.width-5,r.height-5),setTimeout(function(){d.drawLine(r.width/2,0,r.width/2,r.height),y="Half-Way Line",e=r.width/2+h.Default,i=r.height/6,setTimeout(function(){d.drawArrowLine(r.halfWidth,i,e,i),d.writeText(y,e+10,i,l.Heading),d.drawCenterSpot(r.width/2,r.height/2,f.radius),setTimeout(function(){y="Team - A",e=Math.ceil(r.width/4)-Math.ceil(y.length/2),i=20,d.writeText(y,e,i,l.Heading),setTimeout(function(){y="Team - B",e=r.width-r.width/3.5,d.writeText(y,e,i,l.Heading),setTimeout(function(){d.drawArrowLine(r.halfWidth,r.height/2,r.halfWidth+2*f.radius,r.height/2,!1),y="Center Spot",e=r.halfWidth+2*f.radius,i=r.height/2-10,d.writeText(y,e,i,l.Heading)},500)},500)},1e3)},500)},500)},5e3)}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Playground=class{constructor(t,e,i){this.canvasElement=t,this.context=e,this.styles=i}setGroundStyles(){let t=this.canvasElement.width;console.log("Width is "+t),this.canvasElement.style.border=this.styles.borderWidth+"px solid "+this.styles.borderColor,this.canvasElement.style.margin="auto 25px",this.canvasElement.style.background=this.styles.background}drawCenterSpot(t,e,i){this.context.beginPath(),this.context.arc(t,e,i,0,2*Math.PI),this.context.fillStyle=this.styles.fillColor,this.context.fill(),this.context.lineWidth=this.styles.lineWidth,this.context.strokeStyle=this.styles.borderColor,this.context.stroke()}drawCorner(t,e){this.context.beginPath(),this.context.arc(t,e,10,0,2*Math.PI),this.context.fillStyle=this.styles.fillColor,this.context.fill(),this.context.lineWidth=this.styles.lineWidth,this.context.strokeStyle=this.styles.borderColor,this.context.stroke()}writeText(t,e,i,n=this.styles.font.Default,s=this.styles.textColor){this.context.font=n,this.context.fillStyle=s,this.context.fillText(t,e,i)}drawLine(t,e,i,n){this.context.beginPath(),this.context.moveTo(t,e),this.context.lineTo(i,n),this.context.stroke(),this.context.lineWidth=this.styles.lineWidth,this.context.fillStyle=this.styles.fillColor,this.context.fill()}drawArrowLine(t,e,i,n,s=!1){let o;this.context.beginPath(),this.context.moveTo(t,e),this.context.lineTo(i,n),this.context.strokeStyle=this.styles.fillColor,this.context.lineWidth=this.styles.lineWidth,this.context.stroke();let r=i,l=n;if(s)for(o=0;o<=2;o++)t=r,e=0==o||2==o?l+4:l-4,i=2==o?r:r-4,n=2==o?l-4:l,this.context.beginPath(),this.context.moveTo(t,e),this.context.lineTo(i,n),this.context.lineWidth=2,this.context.strokeStyle=this.styles.fillColor,this.context.stroke();else for(o=0;o<=2;o++)t=r,e=0==o||2==o?l-4:l+4,i=2==o?r:r+4,n=2==o?l+4:l,this.context.beginPath(),this.context.moveTo(t,e),this.context.lineTo(i,n),this.context.lineWidth=this.styles.lineWidth,this.context.strokeStyle=this.styles.fillColor,this.context.stroke()}drawRectangle(t,e,i,n){this.context.beginPath(),this.context.fillStyle=this.styles.fillColor,this.context.fill(),this.context.fillRect(t,e,i,n),this.context.lineWidth=this.styles.lineWidth,this.context.strokeStyle=this.styles.borderColor,this.context.strokeRect(t,e,i,n)}drawPentatonic(t){console.log("trying to draw: "+t),console.log("errors: "+t.errors),console.log("Warnings: "+t.warnings),t.penta}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Styles=class{constructor(t,e){this.widthCell=t,this.heightCell=e,this.background="#fff0e6",this.borderColor="#343653",this.lineWidth=2,this.borderWidth=10,this.fillColor="#9a2424",this.textColor="#00639f",this.font={Default:"12px 'Segoe UI',Arial,sans-serif",Heading:"14px 'Segoe UI',Arial,sans-serif"}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=i(5),s=i(7),o=i(8),r=i(0),l=i(9),h=i(10);class a{static serialize(t){let e=new n.PentaWarningError,i=e.penta,s=t.split("\n");if(s.length<this.minLines)return e.addError("Text for penta should contain: \nauthor, nbLine nbCols, "),e;i.author=t[0];let o=t[1].split(" ").map(t=>Number(t));return 2!=o.length?(e.addError('2nd line should provide nb of lines and columns like this "<nbLines> <nbCols>"'),e):(i.lines=o[0],i.columns=o[1],this.fillAreas(e,s,2),this.fillEnonce(e,s,2+i.lines),e)}static fillAreas(t,e,i){let n,r={};for(let l=i;l<i+t.penta.lines;l++)if(""!=(n=e[l])&&null!=n)for(let e=0;e<t.penta.columns;e++){let i=new o.Cell(l,e),h=r[n[e]];null==h&&(h=new s.Area(n[e]),r[n[e]]=h),i.area=h,t.penta.cells[l][e]=i}t.penta.fillAreaSize()}static fillEnonce(t,e,i){let n,s=e.length,o={};for(let h=i;h<s;h++){if(""==(n=e[h]))continue;if(n.startsWith("-")){let e=n.substr(1).split(",").map(t=>+t);if(4!=e.length){t.addError('For a diffOne, you should have 4 numbers: "-0,1,2,3" for example. Here: '+n);continue}let i=new r.Position(e[0],e[1]),s=new r.Position(e[2],e[3]);if(i==s){t.addError("Difference one should concern 2 different positions, here: "+n);continue}i.isNear(s)||t.addWarning("Difference one should concert 2 near positions, here: "+n),t.penta.diffOnes.push(new l.Diff(i,s));continue}let i=n.split(",");if(3!=i.length){t.addError("Bad input, should be x,y,z, but was "+n);continue}if(1!=i[0].length){t.addError("Bad input: "+i[0]+" in line "+n);continue}let s=i[0],a=+i[1],c=+i[2],d=t.penta.cells[a][c];try{console.log("nb is "+s);let t=+s;console.log("Success converting nb to number: "+t),d.values.push(s)}catch(t){null==o[s]?o[s]=[new r.Position(a,c)]:o[s].push(new r.Position(a,c))}}for(let e in o)t.penta.sisters.push(new h.Sister(e,e,o[e]))}}a.minLines=12,e.Serializer=a},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=i(6);e.PentaWarningError=class{constructor(){this.penta=new n.Pentatonic,this.warnings=[],this.errors=[]}addWarning(t){this.warnings.push(t)}addError(t){this.errors.push(t)}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Pentatonic=class{constructor(t=0,e=0){this.id=0,this.version=0,this.areas="",this.difficulty=0,this.author="",this.filename="",this.lines=t,this.columns=e,this.cells=[],this.diffOnes=[]}fillAreaSize(){this.getAllAreas().forEach(t=>{let e=this.getAreaCells(t),i=e.size;e.forEach(t=>t.area.size=i)})}cellArray(){return[].concat.apply([],this.cells)}getAllAreas(){let t=new Set;return this.cellArray().forEach(e=>{t.add(e.area)}),t}getAreaCells(t){return new Set(this.cellArray().filter(e=>e.area.id==t.id))}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Area=class{constructor(t="0",e=0){this.id=t,this.size=e}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=i(0);e.Cell=class{constructor(t,e){this.position=new n.Position(t,e),this.values=[]}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Diff=class{constructor(t,e){this.position1=t,this.position2=e}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Sister=class{constructor(t,e,i){this.id=t,this.symbol=e,this.positions=i}}}]);
//# sourceMappingURL=bundle.js.map
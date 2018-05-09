function DragListener(){this.agents=[],this.currentAgentName=null,this.dragger}function Dragger(t,i,g,e,r,n,s){t=t?t:event,this.originalX=[],this.originalY=[],this.draggingObjs=i,this.dragsX=g,this.dragsY=e,this.sigMove=r,this.dragListener=n,this.cleanUpUtil=s,this.dragListener&&(this.dragListener.dragger=this);for(var a=0;a<i.length;a++)this.originalX[a]=parseInt(i[a].style.left),this.originalY[a]=parseInt(i[a].style.top);this.mouseX=t.clientX,this.mouseY=t.clientY,this.isDragging=!1,this.initDragger(t)}DragListener.DRAGGING_STARTED="draggingStarted",DragListener.DRAGGING_FINISHED="draggingFinished",DragListener.DRAGGING="dragging",DragListener.prototype.registerAgent=function(t){this.agents[t]=[]},DragListener.prototype.publishEvent=function(t,i,g){this.agents[t][i]=g},DragListener.prototype.notify=function(t,i){var g=this.agents[this.currentAgentName];if(g){var e=g[t];if(e){var r=this.dragger?this.dragger.draggingObjs:null;e(i,r)}}},DragListener.prototype.isDragging=function(){return null!=this.currentAgentName},DragListener.prototype.setCurrentAgentName=function(t){this.currentAgentName=t},DragListener.prototype.getCurrentAgentName=function(){return this.currentAgentName};var invokeDragging=function(t){return function(i){t.dragging(i)}},invokeDraggingFinished=function(t){return function(i){t.draggingFinished(i)}};Dragger.prototype.addAnotherDraggingObject=function(t,i){t=t?t:event,this.draggingObjs[this.draggingObjs.length]=i,this.originalX[this.originalX.length]=parseInt(i.style.left),this.originalY[this.originalY.length]=parseInt(i.style.top),this.initDragger(t)},Dragger.prototype.initDragger=function(t){this.isDragging=!1,this.mouseX=t.clientX,this.mouseY=t.clientY,document.onmousemove=invokeDragging(this),document.onmouseup=invokeDraggingFinished(this)},Dragger.prototype.dragging=function(t){var i=t?t:event,g=!1,e=0,r=0;if(this.dragsX&&(e=i.clientX-this.mouseX,g=Math.abs(e)>this.sigMove),this.dragsY&&(r=i.clientY-this.mouseY,g=g||Math.abs(r)>this.sigMove),!this.isDragging&&g){this.isDragging=!0,this.dragListener&&this.dragListener.notify(DragListener.DRAGGING_STARTED,t);for(var n=0;n<this.draggingObjs.length;n++)this.draggingObjs[n].style.display="block"}if(this.isDragging){if(e){for(var n=0;n<this.draggingObjs.length;n++){parseInt(this.originalX[n]+e)}if(e)for(var n=0;n<this.draggingObjs.length;n++)this.draggingObjs[n].style.left=parseInt(this.originalX[n]+e)+"px"}if(r){for(var n=0;n<this.draggingObjs.length;n++){parseInt(this.originalY[n]+r)}if(r)for(var n=0;n<this.draggingObjs.length;n++)this.draggingObjs[n].style.top=parseInt(this.originalY[n]+r)+"px"}(e||r)&&this.dragListener.notify(DragListener.DRAGGING,t)}},Dragger.prototype.draggingFinished=function(t){document.onmousemove="default",document.onmouseup="default",this.isDragging?(this.isDragging=!1,this.cleanUpUtil&&this.cleanUpUtil(),this.dragListener&&(this.dragListener.notify(DragListener.DRAGGING_FINISHED,t),this.dragListener.setCurrentAgentName(null))):this.dragListener&&this.dragListener.setCurrentAgentName(null)},Dragger.prototype.clearDraggingObjects=function(){for(var t=0;t<this.draggingObjs.length;t++){var i=this.draggingObjs[t];i&&(i.parentNode&&i.parentNode.removeChild(i),i=null)}};
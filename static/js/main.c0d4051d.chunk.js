(this["webpackJsonppulo-do-gato"]=this["webpackJsonppulo-do-gato"]||[]).push([[0],{12:function(e,t,n){e.exports={container:"startgame_container__qGNPD",message:"startgame_message__i736C",tip:"startgame_tip__33UIg",init:"startgame_init__lkADs"}},16:function(e,t,n){e.exports={container:"gameover_container__2MKZ8",message:"gameover_message__2PDYs",restart:"gameover_restart__xI9i6"}},19:function(e,t,n){e.exports={container:"loading_container__3V_wZ",img:"loading_img__9xYrz"}},22:function(e,t,n){e.exports={canvaContainer:"scene-1_canvaContainer__2Oiz4"}},24:function(e,t,n){e.exports={ui:"ui_ui__3YHo6"}},25:function(e,t,n){e.exports={score:"Score_score__2k693"}},31:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var s=n(6),i=n.n(s),a=n(21),r=n.n(a),o=(n(31),n(9)),c=n(22),u=n.n(c),h=n(1),l=n(3),d=n(0),p=n(11),m=n(15),f=n(2),v=["antialias","engineOptions","adaptToDeviceRatio","sceneOptions","onRender","onSceneReady"];var b=function(e){var t=Object(s.useRef)(null),n=e.antialias,i=e.engineOptions,a=e.adaptToDeviceRatio,r=e.sceneOptions,o=e.onRender,c=(e.onSceneReady,Object(m.a)(e,v));return Object(s.useEffect)((function(){if(t.current){var s=new d.Engine(t.current,n,i,a),c=new d.Scene(s,r);c.isReady()?e.onSceneReady(c):c.onReadyObservable.addOnce((function(t){return e.onSceneReady(t)})),s.runRenderLoop((function(){"function"===typeof o&&o(c),c.render()}));var u=function(){c.getEngine().resize()};return window&&window.addEventListener("resize",u),function(){c.getEngine().dispose(),window&&window.removeEventListener("resize",u)}}}),[a,n,i,o,e,t,r]),Object(f.jsx)("canvas",Object(p.a)(Object(p.a)({ref:t},c),{},{style:{width:"100%",height:"100%"}}))},O=n(4),y=n(5),w=n(14),j=n(8),g=n(7),x=Object(y.a)((function e(t){Object(O.a)(this,e),this.scene=t,this._mesh=void 0,this._parent=void 0,this._texture=void 0,this._sounds=void 0,this.events={},this.states={}})),M=new function(){return this.isLoading=!1,this.onUpdateLoading=new d.Observable,this.onGameOver=new d.Observable,this.onStartgame=new d.Observable,this},k=function(e){Object(j.a)(n,e);var t=Object(g.a)(n);function n(e,s,i){var a;return Object(O.a)(this,n),(a=t.call(this,s)).ground=e,a.moveOpts=i,a.states={died:!1},a.events={die:a.die.bind(Object(w.a)(a))},a.initSounds(),M.onGameOver.add((function(t){t||(a.states.died=!1,a._mesh.position=new d.Vector3(-1.5,1,3.55),a._mesh.rotation.x=-Math.PI/2,a._mesh.physicsImpostor=new d.PhysicsImpostor(a._mesh,d.PhysicsImpostor.BoxImpostor,{mass:.8,restitution:0}),a._mesh.rotationQuaternion=null,a._mesh.physicsImpostor.registerOnPhysicsCollide(e.mesh.invisibleGround.physicsImpostor,(function(){i.jumping.canJump=!0,i.jumping.isJumping=!1})))})),a}return Object(y.a)(n,[{key:"initSounds",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){var t;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=new d.Sound("fall","assets/scene-1/songs/fall.mp3",this.scene,null,{volume:.5}),this._sounds={fall:t};case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"die",value:function(){var e,t;this.states.died=!0,this._sounds.fall.play(),null===(e=this.mesh)||void 0===e||null===(t=e.physicsImpostor)||void 0===t||t.dispose(),this.scene.beginDirectAnimation(this.mesh,function(){var e=.2,t=[],n=[],s=new d.Animation("ySlide","position.y",e,d.Animation.ANIMATIONTYPE_FLOAT,d.Animation.ANIMATIONLOOPMODE_CONSTANT),i=new d.Animation("Rotation","rotation.x",e,d.Animation.ANIMATIONTYPE_FLOAT,d.Animation.ANIMATIONLOOPMODE_CONSTANT);return t.push({frame:0,value:-.56}),t.push({frame:.8*e,value:1}),t.push({frame:2.3*e,value:-6}),s.setKeys(t),n.push({frame:0,value:-Math.PI/2}),n.push({frame:.8*e,value:Math.PI/2}),i.setKeys(n),[s,i]}(),0,5,!1),M.onGameOver.notifyObservers(!0)}},{key:"initMesh",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){var t,n,s=this;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.SceneLoader.ImportMeshAsync("","assets/scene-1/meshes/cat/","cat.babylon",this.scene);case 2:t=e.sent,(n=t.meshes[0]).name="player",n.parent=null,n.position=new d.Vector3(-1.5,1,3.55),n.rotation.y+=-Math.PI/2,n.physicsImpostor=new d.PhysicsImpostor(n,d.PhysicsImpostor.BoxImpostor,{mass:.8,restitution:0}),n.rotationQuaternion=null,this._mesh=n,this._mesh.physicsImpostor.registerOnPhysicsCollide(this.ground.mesh.invisibleGround.physicsImpostor,(function(){s.moveOpts.jumping.canJump=!0,s.moveOpts.jumping.isJumping=!1}));case 12:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"mesh",get:function(){return this._mesh}}]),n}(x),_=Object(y.a)((function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;Object(O.a)(this,e),this.mesh=t,this.next=n,this.next=null})),S=function(){function e(){Object(O.a)(this,e),this._head=null,this._last=null,this._size=0}return Object(y.a)(e,[{key:"head",get:function(){return this._head}},{key:"last",get:function(){return this._last}},{key:"size",get:function(){return this._size}},{key:"removeFirstItem",value:function(){this._head&&(this._head=this._head.next,this._size--)}},{key:"addItem",value:function(e){this.head||(this._head=e),this.last&&(this.last.next=e),this._size++,this._last=e}},{key:"clear",value:function(){this._head=null}}]),e}(),I=["velocityX","velocityY","instancesQty"],P=function(){function e(t,n,s,i){var a=this,r=i.velocityX,o=void 0===r?0:r,c=i.velocityY,u=void 0===c?0:c,h=(i.instancesQty,Object(m.a)(i,I));Object(O.a)(this,e),this.name=void 0,this.container=void 0,this.parent=void 0,this.meshes=void 0,this.instances=void 0,this.instancesQty=0,this.parent=h.parent,this.container=new d.Mesh("".concat(t,"-infinity-container"),s),this.name=t,this.meshes=n,this.instances=new S,this.initializeMeshes(h.despawnPlace),this.fillSpawnSpace(h.spawnPlace,h.despawnPlace),s.onBeforeRenderObservable.add((function(){for(var e=s.getAnimationRatio(),t=a.instances.head;t;)t.mesh.position.x+=o*e,t.mesh.position.y+=u*e,t=t.next,a.instances.last.mesh.position.x<h.spawnPlace.x&&a.addInstance(),t&&t.mesh.position.x<h.despawnPlace.x&&a.removeInstance()}))}return Object(y.a)(e,[{key:"removeInstance",value:function(){this.instances.head.mesh.dispose(),this.instances.removeFirstItem()}},{key:"initializeMeshes",value:function(e){var t,n=this;null===(t=this.parent)||void 0===t||t.addChild(this.container),this.meshes.forEach((function(e){var t;e.setEnabled(!1),null===(t=n.parent)||void 0===t||t.addChild(e)}))}},{key:"positionLastMesh",value:function(e){var t=this.instances.last.mesh.getBoundingInfo().boundingBox.extendSizeWorld,n=this.instances.last.mesh.position,s=e.getBoundingInfo().boundingBox.extendSizeWorld,i=n.x+t.x+s.x,a=n.y,r=n.z;e.position=new d.Vector3(i,a,r)}},{key:"fillSpawnSpace",value:function(e,t){this.instances.addItem(new _(this.getMesh()));var n=!1;for(this.instances.last.mesh.position=new d.Vector3(t.x,t.y,t.z);!n;){var s=this.getMesh();this.positionLastMesh(s),this.instances.addItem(new _(s)),this.instances.last.mesh.position.x>e.x&&(n=!0)}}},{key:"addInstance",value:function(){var e=this.getMesh();this.positionLastMesh(e),this.instances.addItem(new _(e))}},{key:"getMesh",value:function(){var e,t=Math.floor(Math.random()*this.meshes.length),n=this.meshes[t].clone();return n.setEnabled(!0),null===(e=this.container)||void 0===e||e.addChild(n),n.name="".concat(this.instancesQty,"-").concat(this.name),this.instancesQty++,n}}]),e}(),A=function(e){Object(j.a)(n,e);var t=Object(g.a)(n);function n(){return Object(O.a)(this,n),t.apply(this,arguments)}return Object(y.a)(n,[{key:"initMesh",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){var t,n,s;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=d.MeshBuilder.CreatePlane("sky",{width:10,height:20}),n=new d.StandardMaterial("skyMaterial",this.scene),s=new d.Mesh("sky",this.scene),t.position.z=5,t.position.y=.3,n.diffuseColor=new d.Color3(95/255,165/255,245/255),n.specularColor=new d.Color3(0,0,0),t.material=n,new P("sky",[t],this.scene,{velocityX:-.01,parent:s,spawnPlace:{z:20,x:26,y:0},despawnPlace:{z:20,x:-30,y:0}});case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"initSounds",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw new Error("Method not implemented.");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),n}(x);function T(e,t){var n=d.MeshBuilder.CreatePlane("slider-ground",{width:10,height:2}),s=new d.StandardMaterial("groundMaterial",e);return s.diffuseTexture=new d.Texture("assets/scene-1/textures/calcada.png",e),s.specularColor=new d.Color3(0,0,0),n.material=s,n.rotationQuaternion=null,n.rotation.x=Math.PI/2,n.position.y=-1.02,n.position.z=3.36,new P("slider-ground",[n],e,{velocityX:-.05,parent:t,spawnPlace:{x:8,z:3.36,y:-1.02},despawnPlace:{x:-8,z:3.36,y:-1.02}}),n}function E(e){var t=d.MeshBuilder.CreateBox("invisible-ground",{size:1}),n=new d.StandardMaterial("groundMaterial",e);return t.position=new d.Vector3(-1.5,-1.5,3.55),n.alpha=0,t.material=n,t.physicsImpostor=new d.PhysicsImpostor(t,d.PhysicsImpostor.BoxImpostor,{mass:0,restitution:0}),t}var C=function(e){Object(j.a)(n,e);var t=Object(g.a)(n);function n(){return Object(O.a)(this,n),t.apply(this,arguments)}return Object(y.a)(n,[{key:"initMesh",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){var t,n,s;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=new d.Mesh("ground",this.scene),n=T(this.scene,t),s=E(this.scene),t.addChild(n),t.addChild(s),this._mesh={invisibleGround:s,sliderGround:n};case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"initSounds",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw new Error("Method not implemented.");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"mesh",get:function(){return this._mesh}}]),n}(x),L=function(e){Object(j.a)(n,e);var t=Object(g.a)(n);function n(){return Object(O.a)(this,n),t.apply(this,arguments)}return Object(y.a)(n,[{key:"initMesh",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){var t,n;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.SceneLoader.ImportMeshAsync("","assets/scene-1/meshes/background/casas/","test.babylon",this.scene);case 2:t=e.sent,n=new d.Mesh("background",this.scene),t.meshes.forEach((function(e){n.addChild(e)})),new P("background",t.meshes,this.scene,{velocityX:-.05,parent:n,spawnPlace:{z:13,x:26,y:-2},despawnPlace:{z:13,x:-15,y:-1.5}});case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"initSounds",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw new Error("Method not implemented.");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),n}(x);function z(e){var t=new d.ArcRotateCamera("camera",-Math.PI/2,Math.PI/2,0,new d.Vector3(0,0,0),e);return t.radius=0,t}var D=n(23);function R(e,t,n){var s=new d.Vector3(0,1,0);e&&e.mesh.physicsImpostor&&(n.jumping.isJumping=!0,n.jumping.canJump=!1,e.mesh.physicsImpostor.setLinearVelocity(new d.Vector3(0,0,0)),e.mesh.physicsImpostor.applyImpulse(s.scale(5.5),e.mesh.getAbsolutePosition()))}function B(e,t,n){var s=Object(p.a)({},n),i={},a=e,r=new d.Sound("jump","assets/scene-1/songs/jump.mp3",e,null,{volume:.3});return a.actionManager=new d.ActionManager(e),M.onGameOver.add((function(e){e||(n.jumping.canJump=!0,n.jumping.isJumping=!1)})),a.actionManager.registerAction(new d.ExecuteCodeAction(d.ActionManager.OnKeyDownTrigger,(function(e){i[e.sourceEvent.key]="keydown"===e.sourceEvent.type}))),a.actionManager.registerAction(new d.ExecuteCodeAction(d.ActionManager.OnKeyUpTrigger,(function(e){i[e.sourceEvent.key]="keydown"===e.sourceEvent.type}))),a.onPointerObservable.add((function(e){s.jumping.canJump&&D.isMobile&&R(t,0,s)})),a.onBeforeRenderObservable.add((function(){i[" "]&&s.jumping.canJump&&(r.play(),R(t,0,s))})),s}var N=new function(){var e=this;return this.score=0,this.onUpdateScore=new d.Observable,this.onUpdateScore.add((function(t){e.score=t})),this},V=function(){function e(t,n){var s=this;Object(O.a)(this,e),this.scene=t,this.player=n,this.prevTime=(new Date).getTime(),this.currentTime=(new Date).getTime(),this.trySpawnTime=(new Date).getTime(),this.obstacleLimit=void 0,this.trySpawnTimeout=0,this.activeElement=[],this.obstacles=[],this.container=void 0,this.obstacleCounter=0,this.createObstacles(),this.container=new d.Mesh("obstacles-container"),this.createObstaclesLimit(),M.onGameOver.add((function(e){e||(s.activeElement.forEach((function(e){e.dispose()})),s.activeElement=[])})),M.onStartgame.add((function(e){e||t.onBeforeRenderObservable.add((function(){s.spawnWithDelay(1e3,2e3)}))})),this.scene.onBeforeRenderObservable.add((function(){for(var e=s.scene.getAnimationRatio(),t=s.activeElement.length-1;t>=0;t--)s.activeElement[t].position.x+=-.05*e,s.jumpedObstacle(s.activeElement[t])&&!s.player.states.died&&N.onUpdateScore.notifyObservers(++N.score),s.checkObstacleHit(s.activeElement[t]),s.checkObstacleHitsLimit(s.activeElement[t],t)}))}return Object(y.a)(e,[{key:"checkObstacleHit",value:function(e){var t;null!==(t=this.player.mesh)&&void 0!==t&&t.intersectsMesh(e)&&!this.player.states.died&&this.player.events.die()}},{key:"checkObstacleHitsLimit",value:function(e,t){var n;null!==(n=this.obstacleLimit)&&void 0!==n&&n.intersectsMesh(e)&&(this.activeElement[t].dispose(),this.activeElement.splice(t,1))}},{key:"jumpedObstacle",value:function(e){var t=e.getChildMeshes()[0],n=!!t&&t.intersectsMesh(this.player.mesh);return n&&t.dispose(),n}},{key:"canSpawn",value:function(e,t){var n=this.currentTime-this.prevTime>t,s=this.currentTime-this.prevTime>e,i=!1;return this.currentTime-this.trySpawnTime>this.trySpawnTimeout&&(this.trySpawnTime=this.currentTime,s&&(i=Math.random()>.5,n&&(i=!0))),i&&(this.prevTime=this.currentTime),i}},{key:"generateElement",value:function(){var e=this.obstacleCounter,t=this.obstacles,n=Math.floor(Math.random()*t.length);return this.obstacleCounter++,t[n].clone("obstacle-".concat(e))}},{key:"spawnObstacle",value:function(){var e=this.generateElement(),t=d.MeshBuilder.CreatePlane("pointPlane",{width:1,height:5},this.scene),n=new d.StandardMaterial("planeMateral",this.scene);e.position.z=3.55,e.position.y=-1,e.position.x=3,n.alpha=0,t.rotation.y=Math.PI/2,t.material=n,t.position=new d.Vector3(3,-1,3.55),e.addChild(t),this.container.addChild(e),this.activeElement.push(e)}},{key:"createObstacles",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){var t,n,s,i;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.SceneLoader.ImportMeshAsync(null,"assets/scene-1/meshes/obstacles/trash/","trash.babylon",this.scene);case 2:return(t=e.sent).meshes[0].rotationQuaternion=null,t.meshes[0].rotation.y=Math.PI,t.meshes[0].rotation.x=-Math.PI/2,t.meshes[0].position.z=-100,t.meshes[0].name="trash",this.container.addChild(t.meshes[0]),e.next=11,d.SceneLoader.ImportMeshAsync(null,"assets/scene-1/meshes/obstacles/dog/","dog.babylon",this.scene);case 11:return(n=e.sent).meshes[0].scaling=new d.Vector3(.5,.5,.5),n.meshes[0].rotationQuaternion=null,n.meshes[0].rotation.y=Math.PI/2,n.meshes[0].position.z=-100,n.meshes[0].name="dog",this.container.addChild(n.meshes[0]),e.next=20,d.SceneLoader.ImportMeshAsync(null,"assets/scene-1/meshes/obstacles/cone/","cone.babylon",this.scene);case 20:return(s=e.sent).meshes[0].scaling=new d.Vector3(.5,.5,.5),s.meshes[0].rotationQuaternion=null,s.meshes[0].rotation.y=Math.PI/2,s.meshes[0].position.z=-100,s.meshes[0].name="cone",this.container.addChild(s.meshes[0]),e.next=29,d.SceneLoader.ImportMeshAsync(null,"assets/scene-1/meshes/obstacles/bucket/","bucket.babylon",this.scene);case 29:(i=e.sent).meshes[0].scaling=new d.Vector3(.005,.005,.005),i.meshes[0].rotationQuaternion=null,i.meshes[0].rotation.y=Math.PI/2,i.meshes[0].position.z=-100,i.meshes[0].name="bucket",this.container.addChild(i.meshes[0]),this.obstacles=[t.meshes[0],s.meshes[0],n.meshes[0],i.meshes[0]];case 37:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"createObstaclesLimit",value:function(){this.obstacleLimit=d.MeshBuilder.CreatePlane("plane",{width:10,height:10},this.scene),this.obstacleLimit.position=new d.Vector3(-10,0,3.5),this.obstacleLimit.rotationQuaternion=null,this.obstacleLimit.rotation.y=-Math.PI/2}},{key:"spawnWithDelay",value:function(e,t){this.currentTime=(new Date).getTime(),this.trySpawnTimeout=Math.floor(e/4),this.canSpawn(e,t)&&this.spawnObstacle()}}]),e}(),U=function(e){Object(j.a)(n,e);var t=Object(g.a)(n);function n(){return Object(O.a)(this,n),t.apply(this,arguments)}return Object(y.a)(n,[{key:"initMesh",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){var t,n,s;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=d.MeshBuilder.CreatePlane("mountain",{width:20,height:4}),n=new d.StandardMaterial("mountainMaterial",this.scene),s=new d.Mesh("mountain",this.scene),t.position.z=5,t.position.y=.3,n.diffuseTexture=new d.Texture("assets/scene-1/textures/mountains.png",this.scene),n.diffuseTexture.hasAlpha=!0,n.specularColor=new d.Color3(0,0,0),t.material=n,n.diffuseTexture.wrapU=d.Texture.CLAMP_ADDRESSMODE,n.diffuseTexture.wrapV=d.Texture.CLAMP_ADDRESSMODE,new P("mountain",[t],this.scene,{velocityX:-.01,parent:s,spawnPlace:{z:17,x:26,y:.1},despawnPlace:{z:17,x:-15,y:.1}});case 12:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"initSounds",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw new Error("Method not implemented.");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),n}(x),J=function(e){Object(j.a)(n,e);var t=Object(g.a)(n);function n(){return Object(O.a)(this,n),t.apply(this,arguments)}return Object(y.a)(n,[{key:"initSounds",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw new Error("method is not implemented yet");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"initMesh",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){var t,n,s,i;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=d.MeshBuilder.CreatePlane("street",{width:10,height:10}),n=new d.StandardMaterial("streetMaterial",this.scene),s=new d.Texture("assets/scene-1/textures/street.png",this.scene),i=new d.Mesh("street",this.scene),s.wAng=-Math.PI/2,t.position.z=5,t.position.y=.3,t.rotation.x=Math.PI/2,n.diffuseTexture=s,n.specularColor=new d.Color3(0,0,0),t.material=n,new P("street",[t],this.scene,{velocityX:-.05,parent:i,spawnPlace:{z:10.5,x:26,y:-1.4},despawnPlace:{z:10.5,x:-15,y:-1.4}});case 12:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),n}(x),G=function(e){Object(j.a)(n,e);var t=Object(g.a)(n);function n(){return Object(O.a)(this,n),t.apply(this,arguments)}return Object(y.a)(n,[{key:"initMesh",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){var t,n,s,i;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=d.MeshBuilder.CreatePlane("fence",{width:.2,height:1}),n=new d.StandardMaterial("fenceMaterial",this.scene),s=new d.Texture("assets/scene-1/textures/fence.png",this.scene),i=new d.Mesh("fence",this.scene),t.position.z=5,t.position.y=.3,n.diffuseTexture=s,n.diffuseTexture.hasAlpha=!0,n.specularColor=new d.Color3(0,0,0),t.material=n,n.diffuseTexture.wrapU=d.Texture.CLAMP_ADDRESSMODE,n.diffuseTexture.wrapV=d.Texture.CLAMP_ADDRESSMODE,new P("fence",[t],this.scene,{velocityX:-.05,parent:i,spawnPlace:{z:14.7,x:26,y:-1},despawnPlace:{z:14.7,x:-15,y:-1}});case 13:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"initSounds",value:function(){var e=Object(l.a)(Object(h.a)().mark((function e(){return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw new Error("Method not implemented.");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),n}(x),Q=function(){var e=Object(l.a)(Object(h.a)().mark((function e(t){return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return M.onUpdateLoading.notifyObservers(!0),e.next=3,Promise.all(t);case 3:M.onUpdateLoading.notifyObservers(!1);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function K(e){return F.apply(this,arguments)}function F(){return(F=Object(l.a)(Object(h.a)().mark((function e(t){var n,s,i,a,r,o,c,u;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.enablePhysics(null,new d.AmmoJSPlugin(!1)),z(t),n={jumping:{canJump:!1,isJumping:!1,jumpStartTime:0}},s=new J(t),i=new G(t),a=new A(t),r=new U(t),o=new L(t),c=new C(t),u=new k(c,t,n),e.next=12,Q([u.initMesh(),s.initMesh(),i.initMesh(),a.initMesh(),r.initMesh(),o.initMesh(),c.initMesh()]);case 12:new d.HemisphericLight("light",new d.Vector3(0,0,0),t).intensity=2,new V(t,u),new d.Sound("BgMusic","assets/scene-1/songs/bg-music.mp3",t,null,{loop:!0,autoplay:!0,volume:.2}),n=B(t,u,n);case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function X(){return Object(f.jsx)(b,{antialias:!0,id:"babylonscene",adaptToDeviceRatio:!0,onSceneReady:K})}var Y=Object(s.memo)(X),H=n(24),W=n.n(H),Z=n(19),q=n.n(Z),$=n.p+"static/media/loading-screen.33f82ac5.png";var ee=function(){return Object(f.jsx)("div",{className:q.a.container,children:Object(f.jsx)("img",{className:q.a.img,src:$})})},te=n(25),ne=n.n(te);var se=function(e){return Object(f.jsx)("span",{className:ne.a.score,children:e.score})},ie=n(16),ae=n.n(ie),re=n.p+"static/media/click-sound-effect.848866fb.mp3",oe=n.p+"static/media/hover-sound-effect.c151afb9.mp3",ce=new Audio(re),ue=new Audio(oe);var he=function(){var e=Object(s.useCallback)((function(){var e;M.onGameOver.notifyObservers(!1),N.onUpdateScore.notifyObservers(0),null===(e=document.getElementById("babylonscene"))||void 0===e||e.focus(),ce.play()}),[]);return Object(f.jsxs)("div",{className:ae.a.container,children:[Object(f.jsxs)("span",{className:ae.a.message,children:["SE FUDEU",Object(f.jsx)("br",{})," KKKK KA JOTA"]}),Object(f.jsx)("button",{className:ae.a.restart,onClick:e,onMouseEnter:function(){return ue.play()},children:"restart"})]})},le=n(12),de=n.n(le),pe=new Audio(re),me=new Audio(oe);var fe=function(){var e=Object(s.useCallback)((function(){var e;M.onStartgame.notifyObservers(!1),null===(e=document.getElementById("babylonscene"))||void 0===e||e.focus(),pe.play()}),[]);return Object(f.jsxs)("div",{className:de.a.container,children:[Object(f.jsx)("span",{className:de.a.message,children:"PULO DO GATO"}),Object(f.jsx)("span",{className:de.a.tip,children:"APERTA BARRA DE ESPA\xc7O PARA PULAR"}),Object(f.jsx)("button",{className:de.a.init,onClick:e,onMouseEnter:function(){return me.play()},children:"INICIAR"})]})};function ve(e){var t=Object(s.useState)(!0),n=Object(o.a)(t,2),i=n[0],a=n[1],r=Object(s.useState)(!1),c=Object(o.a)(r,2),u=c[0],h=c[1],l=Object(s.useState)(!0),d=Object(o.a)(l,2),p=d[0],m=d[1];return Object(s.useEffect)((function(){M.onUpdateLoading.add((function(e){a(e)})),M.onGameOver.add((function(e){h(e)})),M.onStartgame.add((function(e){e||m(!1)}))}),[]),Object(f.jsxs)("div",{className:W.a.ui,children:[!i&&p&&Object(f.jsx)(fe,{}),i?Object(f.jsx)(ee,{}):Object(f.jsx)(se,{score:e.score}),u&&Object(f.jsx)(he,{})]})}var be=function(){var e=Object(s.useState)(0),t=Object(o.a)(e,2),n=t[0],i=t[1];return Object(s.useEffect)((function(){N.onUpdateScore.add((function(e){i(e)}))}),[]),Object(f.jsxs)("div",{className:u.a.canvaContainer,children:[Object(f.jsx)(Y,{}),Object(f.jsx)(ve,{score:n})]})},Oe=function(){return Object(f.jsx)(be,{})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ye=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,43)).then((function(t){var n=t.getCLS,s=t.getFID,i=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),s(e),i(e),a(e),r(e)}))};n(26)().then((function(){r.a.render(Object(f.jsx)(i.a.StrictMode,{children:Object(f.jsx)(Oe,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)})),ye()}))}},[[42,1,2]]]);
//# sourceMappingURL=main.c0d4051d.chunk.js.map
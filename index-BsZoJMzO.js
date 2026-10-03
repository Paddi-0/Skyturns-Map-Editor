var $0=Object.defineProperty;var K0=(n,t,e)=>t in n?$0(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var gt=(n,t,e)=>K0(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();const bs=.5,fr=.15,Su={1:"#4BCC21",2:"#FF4B43",3:"#F2E945",4:"#2F94BF",5:"#9839A8",6:"#FA5AEA",7:"#FF8A27",8:"#51DBB9",9:"#A8A8A8",0:"#555555"};class Mu extends Error{}const Ne=(n,t)=>{if(!n)throw new Mu(t)},Xs=n=>n==null?[]:Array.isArray(n)?n:typeof n=="object"?Object.values(n):[],Qe=n=>String(n),Qi=n=>Number(n);function Se(n){const t=/^(left|right)#(-?\d+)$/.exec(n);return Ne(t,`Invalid leg key '${n}'`),{hand:t[1],gridIndex:t[2]}}const Bi=(n,t)=>`${n}#${t}`;function Ts(n){Ne(n&&typeof n=="object","Geometry must be an object"),Ne(n.legs,"Json must have 'legs' element"),Ne(n.intersections,"Json must have 'intersections' element"),Ne(n.start,"Json must have 'start' element");const t={legs:new Map,nodes:new Map,ways:new Map,intersections:new Map,treasures:new Map,finish:[],preserved:{}};for(const[r,o]of Object.entries(n.legs)){Ne(o.nodes,"Leg must have 'nodes' element"),Ne(o.ways,"Leg must have 'ways' element"),Ne(o.color===void 0,`Leg '${r}' uses the old colour system; not supported`);const{hand:c,gridIndex:l}=Se(r);t.legs.set(r,{key:r,hand:c,gridIndex:l,wayIds:[]})}for(const r of Xs(n.intersections)){Ne(r.id!=null,"Missing id for intersection"),Ne(r.right!=null&&r.left!=null,`Missing right or left for intersection '${r.id}'`),Ne(r.z!=null,`Missing z for intersection '${r.id}'`);const o={id:Qe(r.id),right:Qe(r.right),left:Qe(r.left),z:Qi(r.z),color:Qi(r.color)};Ne(t.legs.has(Bi("right",o.right))&&t.legs.has(Bi("left",o.left)),`Intersection id '${o.id}' is missing legs`),t.intersections.set(o.id,o)}for(const r of Xs(n.treasures)){Ne(r.id!=null,"Missing id for treasure"),Ne(r.right!=null&&r.left!=null,`Missing right or left for treasure '${r.id}'`),Ne(r.z!=null,`Missing z for treasure '${r.id}'`);const o={id:Qe(r.id),right:Qe(r.right),left:Qe(r.left),z:Qi(r.z),type:Qe(r.type)};t.treasures.set(o.id,o)}for(const[r,o]of Object.entries(n.legs)){const c=t.legs.get(r);for(const l of Xs(o.nodes)){Ne(l.id!=null,"Missing id for node");const u=Qe(l.id);if(t.nodes.has(u))continue;Ne(l.loc||l.intersection!=null,`Missing loc or intersection for node '${u}'`);const f={id:u,leg:r};l.intersection!=null?(f.intersection=Qe(l.intersection),Ne(t.intersections.has(f.intersection),`No intersection found for node '${u}'`)):f.loc={x:Qi(l.loc.x),y:Qi(l.loc.y)},t.nodes.set(u,f)}for(const l of Xs(o.ways)){Ne(l.id!=null,"Missing id for way"),Ne(l.n1!=null&&l.n2!=null,`Missing n1 or n2 for way '${l.id}'`);const u={id:Qe(l.id),leg:r,n1:Qe(l.n1),n2:Qe(l.n2),color:Qi(l.color)};t.ways.set(u.id,u),c.wayIds.push(u.id)}}for(const r of t.ways.values())Ne(t.nodes.has(r.n1),`No n1 found for way '${r.id}'`),Ne(t.nodes.has(r.n2),`No n2 found for way '${r.id}'`);t.start=Qe(n.start);const e=typeof n.finish=="string"?[{nodeId:n.finish}]:Xs(n.finish);for(const r of e)r.nodeId!=null?t.finish.push({nodeId:Qe(r.nodeId)}):r.intersectionId!=null&&t.finish.push({intersectionId:Qe(r.intersectionId)});n.mushiBoard!=null&&(t.mushiBoard=Qe(n.mushiBoard));const i=new Set(["legs","intersections","treasures","start","finish","mushiBoard"]);for(const[r,o]of Object.entries(n))!i.has(r)&&o!==void 0&&(t.preserved[r]=o);return t}const Rc=(n,t)=>{const e=n.nodes.get(t);return e.intersection!=null?{id:t,intersection:e.intersection}:{id:t,loc:{x:e.loc.x,y:e.loc.y}}};function Ui(n){const t={};for(const i of n.legs.values()){const r=[],o=[];for(const c of i.wayIds){const l=n.ways.get(c);r.push(Rc(n,l.n1),Rc(n,l.n2)),o.push({id:l.id,n1:l.n1,n2:l.n2,color:l.color})}t[i.key]={nodes:r,ways:o}}const e={legs:t,intersections:[...n.intersections.values()].map(i=>({id:i.id,right:i.right,left:i.left,z:i.z,color:i.color})),start:n.start,finish:n.finish.map(i=>({...i})),treasures:[...n.treasures.values()].map(i=>({id:i.id,type:i.type,z:i.z,right:i.right,left:i.left}))};return n.mushiBoard!=null&&(e.mushiBoard=n.mushiBoard),{...e,...structuredClone(n.preserved)}}function Eu(n){return Ne(n&&typeof n=="object"&&n.geometry,"Not a Skyturns draft: missing 'geometry'"),{metadata:structuredClone(n.metadata??{}),geometry:Ts(n.geometry)}}function zo(n){const t=structuredClone(n.metadata),e=t.details??(t.details={});return e.treasures=Object.fromEntries([...n.geometry.treasures.values()].map(i=>[i.id,i.type])),{metadata:t,geometry:Ui(n.geometry)}}function jl(n){if(n!=null&&n.geometry)return Eu(n);if(n!=null&&n.legs){const{legs:t,intersections:e,treasures:i,start:r,finish:o,mushiBoard:c,startNodes:l,billboards:u,...f}=n;return{metadata:f,geometry:Ts({legs:t,intersections:e,treasures:i,start:r,finish:o,mushiBoard:c,startNodes:l,billboards:u})}}throw new Mu("Not a Skyturns map file")}const Un=n=>Number(n)*bs,J0=n=>String(Math.round(n/bs));function j0(n,t,e,i){const r=Un(t);return n==="left"?{x:r,y:e,z:i}:{x:e,y:r,z:i}}function ki(n,t,e){return{x:Un(t),y:Un(n),z:e}}function Ae(n,t){const e=n.nodes.get(t);if(!e)throw new Error(`unknown node ${t}`);if(e.intersection!=null){const o=n.intersections.get(e.intersection);return ki(o.right,o.left,o.z)}const{hand:i,gridIndex:r}=Se(e.leg);return j0(i,r,e.loc.x,e.loc.y)}const Q0=n=>Number.isInteger(n)&&n>=0&&n<=9;function tf(n){const t=[],e=new Set;for(const c of n.ways.values())e.add(c.n1),e.add(c.n2);const i=[...n.nodes.keys()].filter(c=>!e.has(c)).length;i&&t.push({key:"orphanNodes",n:i}),(!n.start||!n.nodes.has(n.start))&&t.push({key:"noStart"}),n.finish.length===0&&t.push({key:"noFinish"});const r=[...n.ways.values(),...n.intersections.values()].filter(c=>!Q0(c.color)).length;r&&t.push({key:"badColor",n:r});let o=0;for(const c of n.ways.values()){const l=Ae(n,c.n1),u=Ae(n,c.n2);Math.hypot(l.x-u.x,l.y-u.y,l.z-u.z)<1e-6&&o++}return o&&t.push({key:"zeroLength",n:o}),t}class pn extends Error{}const ef=fr*3,Dc=.5,ja=n=>n==="left"?"right":"left";function Sr(n){let t=0;for(const e of n){const i=Number(e);Number.isInteger(i)&&i>t&&(t=i)}return String(t+1)}const Ke=(n,t)=>[...n.ways.values()].filter(e=>e.n1===t||e.n2===t);function Le(n,t){const e=n.nodes.get(t);if(e.intersection==null)return{...e.loc};const i=n.intersections.get(e.intersection),{hand:r}=Se(e.leg);return{x:Un(r==="right"?i.left:i.right),y:i.z}}function Ql(n,t){const e=Ke(n,t)[0];if(e)return e.color;const i=n.nodes.get(t);return i!=null&&i.intersection?n.intersections.get(i.intersection).color:1}function wu(n,t,e){const i=Bi(t,e);return n.legs.has(i)||n.legs.set(i,{key:i,hand:t,gridIndex:e,wayIds:[]}),i}function tc(n,t,e,i,r,o){const c=Sr(n.ways.keys());n.ways.set(c,{id:c,leg:t,n1:e,n2:i,color:r});const l=n.legs.get(t).wayIds,u=o?l.indexOf(o):-1;return u>=0?l.splice(u+1,0,c):l.push(c),c}function dr(n,t){const e=Sr(n.nodes.keys());return n.nodes.set(e,{id:e,...t}),e}function Qa(n,t,e){const i=n.nodes.get(t);if(!i)throw new pn("unknown node");const r=Ql(n,t),o=dr(n,{leg:i.leg,loc:{...e}}),c=tc(n,i.leg,t,o,r);return{node:o,way:c}}function nf(n,t,e){const i=n.nodes.get(t);if(!i)throw new pn("unknown node");let r,o;if(i.intersection!=null){r=i.intersection;const f=ja(Se(i.leg).hand);o=[...n.nodes.values()].find(p=>p.intersection===r&&Se(p.leg).hand===f).id}else{const f=Ql(n,t),{hand:p,gridIndex:m}=Se(i.leg),g=J0(i.loc.x),v=i.loc.y,M=wu(n,ja(p),g);r=Sr(n.intersections.keys());const S=p==="right"?{id:r,right:m,left:g,z:v,color:f}:{id:r,right:g,left:m,z:v,color:f};n.intersections.set(r,S),delete i.loc,i.intersection=r,o=dr(n,{leg:M,intersection:r})}const c=Le(n,o),{node:l,way:u}=Qa(n,o,{x:c.x+e,y:c.y});return{intersection:r,pinned:o,node:l,way:u}}function bu(n,t,e){const i=n.ways.get(t);if(!i)throw new pn("unknown way");const r=Le(n,i.n1),o=Le(n,i.n2),c=dr(n,{leg:i.leg,loc:e?{...e}:{x:(r.x+o.x)/2,y:(r.y+o.y)/2}}),l=i.n2;i.n2=c;const u=tc(n,i.leg,c,l,i.color,i.id);return{node:c,way:u}}function bi(n,t,e){const i=n.nodes.get(t);if(!i||i.intersection!=null)throw new pn("only free nodes move in their plane");i.loc={x:e.x,y:e.y}}function Vs(n,t,e){const i=n.intersections.get(t);if(!i)throw new pn("unknown crossing");i.z=e}function sf(n,t,e){const i=n.nodes.get(t),r=n.nodes.get(e);if(!i||!r||t===e||i.leg!==r.leg||Ke(n,t).some(c=>c.n1===e||c.n2===e)||Ke(n,t).length!==1)return!1;for(const c of Ke(n,t))c.n1===t&&(c.n1=e),c.n2===t&&(c.n2=e);return af(n,e),lf(n,t,e),n.nodes.delete(t),!0}const rf=.5;function of(n,t,e){const i=n.nodes.get(t),r=n.ways.get(e);if(!i||!r||i.intersection!=null||Ke(n,t).length!==1)return!1;const o=Se(i.leg),c=Se(r.leg);if(o.hand===c.hand)return!1;const l=ia(n,r.n1),u=ia(n,r.n2),f=Un(o.gridIndex),[p,m]=o.hand==="right"?[l.y,u.y]:[l.x,u.x];if(Math.abs(m-p)<1e-9)return!1;const g=(f-p)/(m-p);if(g<0||g>1)return!1;const v={x:l.x+(u.x-l.x)*g,y:l.y+(u.y-l.y)*g,z:l.z+(u.z-l.z)*g},M=ia(n,t);if(Math.hypot(v.x-M.x,v.y-M.y,v.z-M.z)>rf)return!1;const{node:S}=bu(n,e,{x:0,y:0}),_=Sr(n.intersections.keys());n.intersections.set(_,o.hand==="right"?{id:_,right:o.gridIndex,left:c.gridIndex,z:v.z,color:r.color}:{id:_,right:c.gridIndex,left:o.gridIndex,z:v.z,color:r.color});for(const y of[i,n.nodes.get(S)])delete y.loc,y.intersection=_;return!0}function ia(n,t){const e=n.nodes.get(t),{hand:i,gridIndex:r}=Se(e.leg),o=Le(n,t),c=Un(r);return i==="right"?{x:o.x,y:c,z:o.y}:{x:c,y:o.x,z:o.y}}function af(n,t){const e=new Set;for(const i of Ke(n,t)){const r=i.n1===t?i.n2:i.n1;e.has(r)?ec(n,i.id):e.add(r)}}function lf(n,t,e){n.start===t&&(n.start=e),n.mushiBoard===t&&(n.mushiBoard=e);for(const i of n.finish)"nodeId"in i&&i.nodeId===t&&(i.nodeId=e)}function ec(n,t){const e=n.ways.get(t);if(!e)return;n.ways.delete(t);const i=n.legs.get(e.leg);i&&(i.wayIds=i.wayIds.filter(r=>r!==t))}function cf(n,t){const e=n.legs.get(t);if(!e)return!1;if(e.wayIds.length)return!0;for(const i of n.intersections.values())if(Bi("right",i.right)===t||Bi("left",i.left)===t)return!0;for(const i of n.treasures.values())if(Bi("right",i.right)===t||Bi("left",i.left)===t)return!0;return[...n.nodes.values()].some(i=>i.leg===t)}function hf(n,t,e,i){if(!i)return;const r=ja(e),o=new Set,c=new Set,l=new Set,u=new Set,f=g=>{if(o.has(g))return;o.add(g);const v=n.nodes.get(g);v.intersection!=null?l.add(v.intersection):Se(v.leg).hand===e&&u.add(g);for(const M of Ke(n,g)){const S=Se(M.leg).hand;S!==e&&c.add(M.id);const _=M.n1===g?M.n2:M.n1;o.has(_)||S===e&&(n.nodes.get(_).intersection!=null||v.intersection!=null)||f(_)}};for(const g of t)if(g.kind==="way"){const v=n.ways.get(g.id);v&&(f(v.n1),f(v.n2))}else if(g.kind==="node")n.nodes.has(g.id)&&f(g.id);else{const v=[...n.nodes.values()].find(M=>M.intersection===g.id&&Se(M.leg).hand===r);v&&f(v.id)}const p=g=>{const{hand:v,gridIndex:M}=Se(g);return wu(n,v,String(Number(M)+i))};for(const g of u){const v=n.nodes.get(g);v.loc={x:v.loc.x+i*bs,y:v.loc.y}}const m=new Map;for(const g of c){const v=n.ways.get(g),M=v.leg,S=p(M),_=n.legs.get(M);_.wayIds=_.wayIds.filter(y=>y!==g),n.legs.get(S).wayIds.push(g),v.leg=S;for(const y of[v.n1,v.n2]){const P=n.nodes.get(y);P.leg===M&&(P.leg=S,m.set(y,S))}}for(const g of l){const v=n.intersections.get(g);r==="right"?v.right=String(Number(v.right)+i):v.left=String(Number(v.left)+i);for(const M of n.nodes.values())M.intersection===g&&Se(M.leg).hand===r&&!m.has(M.id)&&(M.leg=p(M.leg))}Tu(n)}function Tu(n){for(const t of[...n.legs.keys()])cf(n,t)||n.legs.delete(t)}function uf(n,t){n.start===t&&(n.start=void 0),n.mushiBoard===t&&(n.mushiBoard=void 0),n.finish=n.finish.filter(e=>!("nodeId"in e&&e.nodeId===t))}function Au(n,t){const e=n.intersections.get(t);if(e){for(const i of n.nodes.values()){if(i.intersection!==t)continue;const{hand:r}=Se(i.leg);i.loc={x:Un(r==="right"?e.left:e.right),y:e.z},delete i.intersection}n.intersections.delete(t),n.finish=n.finish.filter(i=>!("intersectionId"in i&&i.intersectionId===t))}}function Nc(n,t){const e=n.nodes.get(t);if(e){for(const i of Ke(n,t))ec(n,i.id);n.nodes.delete(t),uf(n,t),e.intersection!=null&&Au(n,e.intersection)}}function ff(n,t){const e=new Set,i=new Set,r=new Set,o=new Set;for(const c of t)if(c.kind==="intersection"){e.add(c.id);for(const l of n.nodes.values())l.intersection===c.id&&o.add(l.id)}else if(c.kind==="node"){i.add(c.id);for(const l of Ke(n,c.id))r.add(l.id)}else r.add(c.id);for(const c of r){const l=n.ways.get(c);l&&(o.add(l.n1),o.add(l.n2))}if(r.size>=n.ways.size)return!1;for(const c of e)Au(n,c);for(const c of i)Nc(n,c);for(const c of r)ec(n,c);for(const c of o)!i.has(c)&&n.nodes.has(c)&&Ke(n,c).length===0&&Nc(n,c);return Tu(n),!0}function df(n,t){const e=new Set;for(const u of t){if(u.kind==="node"&&e.add(u.id),u.kind==="way"){const f=n.ways.get(u.id);f&&(e.add(f.n1),e.add(f.n2))}if(u.kind==="intersection")for(const f of n.nodes.values())f.intersection===u.id&&e.add(f.id)}const i=[...n.ways.values()].filter(u=>e.has(u.n1)&&e.has(u.n2));if(i.length===0)throw new pn("Nothing to duplicate");const r=new Map,o=new Map,c=u=>{if(r.has(u))return r.get(u);const f=n.nodes.get(u);let p;if(f.intersection!=null){if(!o.has(f.intersection)){const m=n.intersections.get(f.intersection),g=Sr(n.intersections.keys());n.intersections.set(g,{...m,id:g,z:m.z+Dc}),o.set(f.intersection,g)}p=dr(n,{leg:f.leg,intersection:o.get(f.intersection)})}else p=dr(n,{leg:f.leg,loc:{x:f.loc.x,y:f.loc.y+Dc}});return r.set(u,p),p};for(const u of i)tc(n,u.leg,c(u.n1),c(u.n2),u.color);for(const[u,f]of o)for(const p of[...n.nodes.values()])p.intersection===u&&!r.has(p.id)&&c(p.id);const l=[];for(const[,u]of r)n.nodes.get(u).intersection==null&&l.push({kind:"node",id:u});for(const[,u]of o)l.push({kind:"intersection",id:u});return l}const Uc=(n,t,e)=>{const i=n.ways.get(t),r=i.n1===e?i.n2:i.n1;return Le(n,e).x<Le(n,r).x?"north":"south"};function pf(n,t){const e=new Set,i=new Set,r=(o,c)=>{var f;const l=c?Uc(n,c,o):void 0;i.add(o);const u=((f=n.nodes.get(o))==null?void 0:f.intersection)!=null;for(const p of Ke(n,o)){if(u&&c&&Uc(n,p.id,o)===l)continue;e.add(p.id);const m=p.n1===o?p.n2:p.n1;i.has(m)||r(m,p.id)}};for(const o of t){if(o.kind==="way"){const c=n.ways.get(o.id);c&&(r(c.n1,c.id),r(c.n2,c.id))}o.kind==="node"&&r(o.id)}return e}function tl(n,t,e){if(!(Number.isInteger(e)&&e>=0&&e<=9))throw new pn("colour must be 0-9");for(const i of t)i.kind==="intersection"&&(n.intersections.get(i.id).color=e);for(const i of pf(n,t))n.ways.get(i).color=e}function mf(n,t){const e=t[0];if(!e)return null;let i;e.kind==="intersection"?i=n.intersections.get(e.id).color:e.kind==="way"?i=n.ways.get(e.id).color:i=Ql(n,e.id);const r=(i+1)%10;return tl(n,t,r),r}const nc=n=>n.length===1?n[0]:null;function gf(n,t){const e=nc(t);if(!e||e.kind==="way")throw new pn("Must select one node or intersection to set start");if(e.kind==="intersection"){const i=[...n.nodes.values()].find(r=>r.intersection===e.id&&Se(r.leg).hand==="right");if(!i)throw new pn("Must select one node or intersection to set start");n.start=i.id}else n.start=e.id}function vf(n,t,e){const i=nc(t);if(!i||i.kind==="way")throw new pn("Must select one node or intersection to set finish");const r=i.kind==="node"?{nodeId:i.id}:{intersectionId:i.id},o=c=>"nodeId"in c&&"nodeId"in r&&c.nodeId===r.nodeId||"intersectionId"in c&&"intersectionId"in r&&c.intersectionId===r.intersectionId;if(!e){n.finish=[r];return}n.finish.some(o)?n.finish=n.finish.filter(c=>!o(c)):n.finish.push(r)}function _f(n,t){const e=nc(t);if(!e||e.kind!=="node")throw new pn("Must select one node set mushi board");n.mushiBoard=e.id}const xf={legs:{"right#0":{nodes:[{id:"3",intersection:"15"},{id:"2",loc:{y:0,x:5}},{id:"1",loc:{y:0,x:0}},{id:"3",intersection:"15"}],ways:[{id:"1",n1:"3",n2:"2",color:6},{id:"2",n1:"1",n2:"3",color:6}]},"left#3":{nodes:[{id:"32",intersection:"15"},{id:"33",loc:{y:0,x:1.7}}],ways:[{id:"17",n1:"32",n2:"33",color:6}]}},intersections:[{id:"15",z:0,right:"0",left:"3",color:6}],finish:[{nodeId:"2"}],mushiBoard:"33",start:"1"},yf={preset:"Lefty",lightAngle:65,runnerColor:"rgba(0,0,0,1)",skyGradient:{color1:"rgba(42,137,173,1)",color2:"rgba(50,160,208,1)",color3:"rgba(212,235,255,1)",color4:"rgba(212,235,255,1)",pos2:.5,pos3:1},cloud:{speed:59,spawnDelay:130,scale:[250,600],opacity:.7,ambientColor:"rgba(241,250,255,1)",diffuseColor:"rgba(255,255,255,1)",specularColor:"rgba(255,255,255,1)"},way:{ambientColor:"rgba(167,169,171,1)",diffuseColor:"rgba(217,202,185,1)"}};function Pu(n=Math.random){const t=1+Math.floor(n()*9),e=structuredClone(xf);e.legs["right#0"].ways[0].color=t,e.legs["right#0"].ways[1].color=t,e.legs["left#3"].ways[0].color=t,e.intersections[0].color=t;const i=Math.floor(Date.now()/1e3);return Eu({metadata:{id:crypto.randomUUID(),version:0,created:i,updated:i,skySettings:yf},geometry:e})}function Ao(n){const t=/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/.exec(n??"");return t?{r:+t[1],g:+t[2],b:+t[3],a:t[4]===void 0?1:+t[4]}:{r:0,g:0,b:0,a:1}}const Sf=({r:n,g:t,b:e,a:i})=>`rgba(${Math.round(n)},${Math.round(t)},${Math.round(e)},${+i.toFixed(3)})`,Mf=({r:n,g:t,b:e})=>"#"+[n,t,e].map(i=>Math.round(i).toString(16).padStart(2,"0")).join("");function Ef(n,t=1){const e=parseInt(n.replace("#",""),16);return{r:e>>16&255,g:e>>8&255,b:e&255,a:t}}function wf(n){const t=e=>{const i=Ao(e);return`rgb(${i.r},${i.g},${i.b})`};return`linear-gradient(to bottom, ${t(n.color1)} 0%, ${t(n.color2)} ${n.pos2*100}%, ${t(n.color3)} ${n.pos3*100}%, ${t(n.color4)} 100%)`}const Dr=[{preset:"Warm Up",cloud:{ambientColor:"rgba(217,231,242,1)",diffuseColor:"rgba(255,255,255,1)",opacity:.7,scale:[100,600],spawnDelay:125,specularColor:"rgba(255,255,255,1)",speed:10},lightAngle:65,runnerColor:"rgba(0,0,0,1)",skyGradient:{color1:"rgba(47,148,191,1)",color2:"rgba(212,235,255,1)",color3:"rgba(255,255,255,1)",color4:"rgba(255,255,255,1)",pos2:1,pos3:1},way:{ambientColor:"rgba(163,160,165,1)",diffuseColor:"rgba(159,158,157,0)"}},{preset:"Flow",cloud:{ambientColor:"rgba(186,201,222,1)",diffuseColor:"rgba(235,245,255,1)",opacity:.64,scale:[650,1e3],spawnDelay:345,specularColor:"rgba(255,247,241,1)",speed:20},lightAngle:65,runnerColor:"rgba(0,0,0,1)",skyGradient:{color1:"rgba(47,148,191,1)",color2:"rgba(53,168,217,1)",color3:"rgba(212,235,255,1)",color4:"rgba(212,235,255,1)",pos2:.1,pos3:.6},way:{ambientColor:"rgba(166,166,166,1)",diffuseColor:"rgba(227,221,191,1)"}},{preset:"Lefty",cloud:{ambientColor:"rgba(241,250,255,1)",diffuseColor:"rgba(255,255,255,1)",opacity:.7,scale:[250,600],spawnDelay:130,specularColor:"rgba(255,255,255,1)",speed:59},lightAngle:65,runnerColor:"rgba(0,0,0,1)",skyGradient:{color1:"rgba(42,137,173,1)",color2:"rgba(50,160,208,1)",color3:"rgba(212,235,255,1)",color4:"rgba(212,235,255,1)",pos2:.5,pos3:1},way:{ambientColor:"rgba(167,169,171,1)",diffuseColor:"rgba(217,202,185,1)"}},{preset:"Slalom",cloud:{ambientColor:"rgba(153,177,205,1)",diffuseColor:"rgba(192,192,192,1)",opacity:.7,scale:[230,590],spawnDelay:120,specularColor:"rgba(200,200,200,1)",speed:10},lightAngle:65,runnerColor:"rgba(0,0,0,1)",skyGradient:{color1:"rgba(193,212,222,1)",color2:"rgba(255,254,235,1)",color3:"rgba(234,234,234,1)",color4:"rgba(255,255,255,1)",pos2:.5,pos3:.8},way:{ambientColor:"rgba(163,160,165,1)",diffuseColor:"rgba(159,158,157,0)"}},{preset:"Mills",cloud:{ambientColor:"rgba(209,123,138,1)",diffuseColor:"rgba(255,238,218,1)",opacity:.5,scale:[100,630],spawnDelay:185,specularColor:"rgba(255,251,234,1)",speed:15},lightAngle:360,runnerColor:"rgba(0,0,0,1)",skyGradient:{color1:"rgba(227,204,90,1)",color2:"rgba(255,246,151,1)",color3:"rgba(234,192,181,1)",color4:"rgba(139,136,118,1)",pos2:.4,pos3:1},way:{ambientColor:"rgba(197,192,198,1)",diffuseColor:"rgba(222,218,191,1)"}},{preset:"Trouble",cloud:{ambientColor:"rgba(54,54,80,1)",diffuseColor:"rgba(255,229,183,1)",opacity:.35,scale:[150,600],spawnDelay:55,specularColor:"rgba(255,217,166,1)",speed:8},lightAngle:225,runnerColor:"rgba(0,0,0,1)",skyGradient:{color1:"rgba(255,174,160,1)",color2:"rgba(255,208,145,1)",color3:"rgba(148,153,184,1)",color4:"rgba(148,153,184,1)",pos2:.2,pos3:.9},way:{ambientColor:"rgba(157,163,177,1)",diffuseColor:"rgba(228,226,177,1)"}},{preset:"Icy Forest Intersections",cloud:{ambientColor:"rgba(207,226,255,1)",diffuseColor:"rgba(249,240,255,1)",opacity:.7,scale:[100,420],spawnDelay:210,specularColor:"rgba(249,240,255,1)",speed:10},lightAngle:180,runnerColor:"rgba(0,0,0,1)",skyGradient:{color1:"rgba(224,214,231,1)",color2:"rgba(235,214,217,1)",color3:"rgba(214,178,217,1)",color4:"rgba(151,164,236,1)",pos2:.1,pos3:.7},way:{ambientColor:"rgba(223,230,255,1)",diffuseColor:"rgba(250,218,255,1)"}},{preset:"Sahara Sun Rocks",cloud:{ambientColor:"rgba(177,180,195,1)",diffuseColor:"rgba(255,212,133,1)",opacity:.86,scale:[290,680],spawnDelay:30,specularColor:"rgba(255,236,163,1)",speed:60},lightAngle:39,runnerColor:"rgba(0,0,0,1)",skyGradient:{color1:"rgba(169,208,234,1)",color2:"rgba(212,235,255,1)",color3:"rgba(255,251,219,1)",color4:"rgba(207,189,161,1)",pos2:.2,pos3:.5},way:{ambientColor:"rgba(164,145,113,1)",diffuseColor:"rgba(255,234,200,1)"}}],bf={en:{title:"Skyturns Map Editor",new:"New",open:"Open…",save:"Save",saveAs:"Save as…",menuFile:"File",syncDraft:"Sync to phone",cloudDrafts:"Cloud drafts…",logout:"Log out",loginLabel:"Log in",synced:'Synced to the phone: "{name}" (version {rev}). Open Create on the phone to find it.',unsavedTitle:"Unsaved changes",unsavedBody:"{name} has changes that are not saved. Save them first?",saveBtn:"Save",discardBtn:"Don't save",cancelBtn:"Cancel",viewHint:"Hold V and scroll to cycle views",view:"View",perspective:"3D",top:"Top",sideX:"Side (X)",sideY:"Side (Y)",frame:"Frame all",language:"中文",tour:"Tour",shortcuts:"All shortcuts (?)",inspector:"Inspector",collapse:"Show / hide the panel",stats:"Map",name:"Name",legs:"Roads",ways:"Segments",nodes:"Nodes",crossings:"Crossings",shrooms:"Mushrooms",finishes:"Finish points",checks:"Checks",allGood:"No problems found",dropHint:"Drop a Skyturns map (.json) here, or use Open.",unnamed:"(unnamed)",opened:"Opened",saved:"Saved",openFailed:"Could not open this file",orphanNodes:"{n} node(s) are not connected to any segment (the game drops them on save)",noFinish:"The map has no finish point",noStart:"The start node does not exist",badColor:"{n} segment(s) or crossing(s) use a colour outside 0-9",zeroLength:"{n} segment(s) have zero length",helpTitle:"How to use",controls:"Right drag: orbit · Middle drag: pan · Wheel: zoom · Left: select / edit",grid:"Grid",gridOff:"off",sky:"Sky",preset:"Preset",custom:"(custom)",gradient:"Sky gradient",gradTop:"Top",gradBottom:"Bottom",pos2:"Colour 2 at",pos3:"Colour 3 at",lightAngle:"Light angle",runnerColor:"Runner colour",wayAmbient:"Road ambient light",wayDiffuse:"Road direct light",clouds:"Clouds",cloudSpeed:"Speed",cloudDelay:"Spawn delay",cloudOpacity:"Opacity",cloudScaleMin:"Size min",cloudScaleMax:"Size max",cloudAmbient:"Cloud ambient",cloudDiffuse:"Cloud diffuse",cloudSpecular:"Cloud highlight",skyNote:"Sky and clouds are not drawn in the editor; these values are saved with the map and used by the game.",modeMove:"Move (Q)",modeSnap:"Snap (W)",modeNav:"Select",modeBuild:"Build (R)",modeNode:"New road (E / B)",undo:"Undo",redo:"Redo",selection:"Selection",nothingSelected:"Nothing selected. Click a node, crossing or road; drag on empty space to box-select.",selectedCount:"{n} selected",node:"Node",crossing:"Crossing",road:"Road",along:"Along road",height:"Height",color:"Colour",dAlong:"Δ along",dHeight:"Δ height",length:"Length",slope:"Slope °",setStart:"Start (S)",setFinish:"Finish (F)",addFinish:"Add finish (Shift+F)",setBoard:"Mushi board (M)",duplicate:"Duplicate (D)",delete:"Delete (Del)",help:"As in the game: Move drags a node or crossing (a road's yellow middle marker adds a node); Snap does the same in 45° steps; Select only selects (click toggles, drag a box); Build drags a flat road along X or Y from a node or crossing, turning makes a crossing; New road drags a road out of a node (hold B to keep going, Esc to stop). Holding Q / W / E / R switches mode while held. A dragged road end joins a node or crosses a road under the mouse unless Shift is held. G: grab the selection, a click drops it. 0-9: colour, C: next colour, S start, F finish, Shift+F add finish, M mushi board, D duplicate, Delete. Editor extras: arrow keys nudge (Shift x5), grid, typed values."},zh:{title:"Skyturns 地图编辑器",new:"新建",open:"打开…",save:"保存",saveAs:"另存为…",menuFile:"文件",syncDraft:"同步到手机",cloudDrafts:"云端草稿…",logout:"退出登录",loginLabel:"登录",synced:"已同步到手机：“{name}”（第 {rev} 版）。在手机上打开“创作”就能看到。",unsavedTitle:"有未保存的修改",unsavedBody:"{name} 有还没保存的修改，要先保存吗？",saveBtn:"保存",discardBtn:"不保存",cancelBtn:"取消",viewHint:"按住 V 滚动滚轮，循环切换视角",view:"视角",perspective:"3D",top:"俯视",sideX:"侧视（X）",sideY:"侧视（Y）",frame:"显示全部",language:"English",tour:"新手引导",shortcuts:"全部快捷键（?）",inspector:"属性",collapse:"展开 / 收起面板",stats:"地图",name:"名称",legs:"道路",ways:"路段",nodes:"节点",crossings:"交叉路口",shrooms:"蘑菇",finishes:"终点",checks:"检查",allGood:"没有发现问题",dropHint:"把 Skyturns 地图文件（.json）拖到这里，或点“打开”。",unnamed:"（未命名）",opened:"已打开",saved:"已保存",openFailed:"无法打开这个文件",orphanNodes:"{n} 个节点没有连接任何路段（游戏保存时会丢掉它们）",noFinish:"地图没有终点",noStart:"起点节点不存在",badColor:"{n} 个路段或交叉路口的颜色不在 0–9 之内",zeroLength:"{n} 个路段长度为 0",helpTitle:"操作说明",controls:"右键拖动：旋转 · 中键拖动：平移 · 滚轮：缩放 · 左键：选择和编辑",grid:"网格",gridOff:"关",sky:"天空",preset:"预设",custom:"（自定义）",gradient:"天空渐变",gradTop:"顶部",gradBottom:"底部",pos2:"颜色 2 位置",pos3:"颜色 3 位置",lightAngle:"光照角度",runnerColor:"小人颜色",wayAmbient:"道路环境光",wayDiffuse:"道路直射光",clouds:"云朵",cloudSpeed:"速度",cloudDelay:"生成间隔",cloudOpacity:"透明度",cloudScaleMin:"最小尺寸",cloudScaleMax:"最大尺寸",cloudAmbient:"云环境光",cloudDiffuse:"云漫反射",cloudSpecular:"云高光",skyNote:"编辑器里不画天空和云朵；这些数值会随地图保存，由游戏使用。",modeMove:"移动（Q）",modeSnap:"吸附（W）",modeNav:"选择",modeBuild:"建造（R）",modeNode:"延伸（E / B）",undo:"撤销",redo:"重做",selection:"选中对象",nothingSelected:"没有选中任何东西。点击节点、交叉路口或道路；在空白处拖动可以框选。",selectedCount:"已选中 {n} 个",node:"节点",crossing:"交叉路口",road:"道路",along:"沿路位置",height:"高度",color:"颜色",dAlong:"水平长度",dHeight:"高度差",length:"长度",slope:"坡度 °",setStart:"起点（S）",setFinish:"终点（F）",addFinish:"追加终点（Shift+F）",setBoard:"蘑菇牌子（M）",duplicate:"复制（D）",delete:"删除（Del）",help:"和游戏一样：移动 —— 拖节点或交叉路口（拖道路中间的黄点是加节点）；吸附 —— 同样的移动，但按 45° 对齐；选择 —— 只选择（单击切换，拖动框选）；建造 —— 从节点或交叉路口沿 X 或 Y 拖出一条水平道路，换方向会建交叉路口；延伸 —— 从节点拖出新道路（按住 B 连续延伸，Esc 结束）。按住 Q / W / E / R 时临时切换到对应模式。拖动路端时会自动合并到鼠标下的节点或和鼠标下的道路相交，按住 Shift 则不会。G：抓起选中的东西，单击放下。0–9：设颜色，C：下一个颜色，S 起点，F 终点，Shift+F 追加终点，M 蘑菇牌子，D 复制，Delete 删除。编辑器额外功能：方向键微调（Shift 5 倍）、网格、输入数值。"}};let ic=(()=>{try{const n=localStorage.getItem("skyturns-editor-lang");if(n==="en"||n==="zh")return n}catch{}return navigator.language.startsWith("zh")?"zh":"en"})();const mn=()=>ic;function Tf(n){ic=n;try{localStorage.setItem("skyturns-editor-lang",n)}catch{}}function Ct(n,t={}){let e=bf[ic][n];for(const[i,r]of Object.entries(t))e=e.replace(`{${i}}`,String(r));return e}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const sc="169",_i={ROTATE:0,DOLLY:1,PAN:2},ys={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Af=0,Oc=1,Pf=2,Cu=1,Cf=2,ii=3,Mi=0,nn=1,xn=2,xi=0,As=1,Fc=2,Bc=3,kc=4,If=5,Oi=100,Lf=101,Rf=102,Df=103,Nf=104,Uf=200,Of=201,Ff=202,Bf=203,el=204,nl=205,kf=206,zf=207,Hf=208,Gf=209,Xf=210,Vf=211,Wf=212,Yf=213,qf=214,il=0,sl=1,rl=2,Ls=3,ol=4,al=5,ll=6,cl=7,rc=0,Zf=1,$f=2,yi=0,Kf=1,Jf=2,jf=3,Qf=4,td=5,ed=6,nd=7,Iu=300,Rs=301,Ds=302,hl=303,ul=304,Ho=306,fl=1e3,zi=1001,dl=1002,wn=1003,id=1004,Nr=1005,In=1006,sa=1007,Hi=1008,ci=1009,Lu=1010,Ru=1011,pr=1012,oc=1013,Xi=1014,ri=1015,Mr=1016,ac=1017,lc=1018,Ns=1020,Du=35902,Nu=1021,Uu=1022,Rn=1023,Ou=1024,Fu=1025,Ps=1026,Us=1027,Bu=1028,cc=1029,ku=1030,hc=1031,uc=1033,vo=33776,_o=33777,xo=33778,yo=33779,pl=35840,ml=35841,gl=35842,vl=35843,_l=36196,xl=37492,yl=37496,Sl=37808,Ml=37809,El=37810,wl=37811,bl=37812,Tl=37813,Al=37814,Pl=37815,Cl=37816,Il=37817,Ll=37818,Rl=37819,Dl=37820,Nl=37821,So=36492,Ul=36494,Ol=36495,zu=36283,Fl=36284,Bl=36285,kl=36286,sd=3200,rd=3201,Hu=0,od=1,Hn="",zn="srgb",Ei="srgb-linear",fc="display-p3",Go="display-p3-linear",Po="linear",Pe="srgb",Co="rec709",Io="p3",ts=7680,zc=519,ad=512,ld=513,cd=514,Gu=515,hd=516,ud=517,fd=518,dd=519,zl=35044,Hc="300 es",oi=2e3,Lo=2001;class Yi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const o=r.indexOf(e);o!==-1&&r.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let o=0,c=r.length;o<c;o++)r[o].call(this,t);t.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Gc=1234567;const ar=Math.PI/180,mr=180/Math.PI;function li(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]+"-"+tn[t&255]+tn[t>>8&255]+"-"+tn[t>>16&15|64]+tn[t>>24&255]+"-"+tn[e&63|128]+tn[e>>8&255]+"-"+tn[e>>16&255]+tn[e>>24&255]+tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]).toLowerCase()}function We(n,t,e){return Math.max(t,Math.min(e,n))}function dc(n,t){return(n%t+t)%t}function pd(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function md(n,t,e){return n!==t?(e-n)/(t-n):0}function lr(n,t,e){return(1-e)*n+e*t}function gd(n,t,e,i){return lr(n,t,1-Math.exp(-e*i))}function vd(n,t=1){return t-Math.abs(dc(n,t*2)-t)}function _d(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function xd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function yd(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Sd(n,t){return n+Math.random()*(t-n)}function Md(n){return n*(.5-Math.random())}function Ed(n){n!==void 0&&(Gc=n);let t=Gc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function wd(n){return n*ar}function bd(n){return n*mr}function Td(n){return(n&n-1)===0&&n!==0}function Ad(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Pd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Cd(n,t,e,i,r){const o=Math.cos,c=Math.sin,l=o(e/2),u=c(e/2),f=o((t+i)/2),p=c((t+i)/2),m=o((t-i)/2),g=c((t-i)/2),v=o((i-t)/2),M=c((i-t)/2);switch(r){case"XYX":n.set(l*p,u*m,u*g,l*f);break;case"YZY":n.set(u*g,l*p,u*m,l*f);break;case"ZXZ":n.set(u*m,u*g,l*p,l*f);break;case"XZX":n.set(l*p,u*M,u*v,l*f);break;case"YXY":n.set(u*v,l*p,u*M,l*f);break;case"ZYZ":n.set(u*M,u*v,l*p,l*f);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ln(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function xe(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Yn={DEG2RAD:ar,RAD2DEG:mr,generateUUID:li,clamp:We,euclideanModulo:dc,mapLinear:pd,inverseLerp:md,lerp:lr,damp:gd,pingpong:vd,smoothstep:_d,smootherstep:xd,randInt:yd,randFloat:Sd,randFloatSpread:Md,seededRandom:Ed,degToRad:wd,radToDeg:bd,isPowerOfTwo:Td,ceilPowerOfTwo:Ad,floorPowerOfTwo:Pd,setQuaternionFromProperEuler:Cd,normalize:xe,denormalize:Ln};class Rt{constructor(t=0,e=0){Rt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(We(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),o=this.x-t.x,c=this.y-t.y;return this.x=o*i-c*r+t.x,this.y=o*r+c*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class jt{constructor(t,e,i,r,o,c,l,u,f){jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,o,c,l,u,f)}set(t,e,i,r,o,c,l,u,f){const p=this.elements;return p[0]=t,p[1]=r,p[2]=l,p[3]=e,p[4]=o,p[5]=u,p[6]=i,p[7]=c,p[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,o=this.elements,c=i[0],l=i[3],u=i[6],f=i[1],p=i[4],m=i[7],g=i[2],v=i[5],M=i[8],S=r[0],_=r[3],y=r[6],P=r[1],b=r[4],I=r[7],z=r[2],F=r[5],N=r[8];return o[0]=c*S+l*P+u*z,o[3]=c*_+l*b+u*F,o[6]=c*y+l*I+u*N,o[1]=f*S+p*P+m*z,o[4]=f*_+p*b+m*F,o[7]=f*y+p*I+m*N,o[2]=g*S+v*P+M*z,o[5]=g*_+v*b+M*F,o[8]=g*y+v*I+M*N,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],o=t[3],c=t[4],l=t[5],u=t[6],f=t[7],p=t[8];return e*c*p-e*l*f-i*o*p+i*l*u+r*o*f-r*c*u}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],o=t[3],c=t[4],l=t[5],u=t[6],f=t[7],p=t[8],m=p*c-l*f,g=l*u-p*o,v=f*o-c*u,M=e*m+i*g+r*v;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/M;return t[0]=m*S,t[1]=(r*f-p*i)*S,t[2]=(l*i-r*c)*S,t[3]=g*S,t[4]=(p*e-r*u)*S,t[5]=(r*o-l*e)*S,t[6]=v*S,t[7]=(i*u-f*e)*S,t[8]=(c*e-i*o)*S,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,o,c,l){const u=Math.cos(o),f=Math.sin(o);return this.set(i*u,i*f,-i*(u*c+f*l)+c+t,-r*f,r*u,-r*(-f*c+u*l)+l+e,0,0,1),this}scale(t,e){return this.premultiply(ra.makeScale(t,e)),this}rotate(t){return this.premultiply(ra.makeRotation(-t)),this}translate(t,e){return this.premultiply(ra.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ra=new jt;function Xu(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function gr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Id(){const n=gr("canvas");return n.style.display="block",n}const Xc={};function Mo(n){n in Xc||(Xc[n]=!0,console.warn(n))}function Ld(n,t,e){return new Promise(function(i,r){function o(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:i()}}setTimeout(o,e)})}function Rd(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Dd(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Vc=new jt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Wc=new jt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ws={[Ei]:{transfer:Po,primaries:Co,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[zn]:{transfer:Pe,primaries:Co,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Go]:{transfer:Po,primaries:Io,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(Wc),fromReference:n=>n.applyMatrix3(Vc)},[fc]:{transfer:Pe,primaries:Io,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(Wc),fromReference:n=>n.applyMatrix3(Vc).convertLinearToSRGB()}},Nd=new Set([Ei,Go]),ve={enabled:!0,_workingColorSpace:Ei,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Nd.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;const i=Ws[t].toReference,r=Ws[e].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return Ws[n].primaries},getTransfer:function(n){return n===Hn?Po:Ws[n].transfer},getLuminanceCoefficients:function(n,t=this._workingColorSpace){return n.fromArray(Ws[t].luminanceCoefficients)}};function Cs(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function oa(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let es;class Ud{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{es===void 0&&(es=gr("canvas")),es.width=t.width,es.height=t.height;const i=es.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=es}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=gr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),o=r.data;for(let c=0;c<o.length;c++)o[c]=Cs(o[c]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Cs(e[i]/255)*255):e[i]=Cs(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Od=0;class Vu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=li(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let c=0,l=r.length;c<l;c++)r[c].isDataTexture?o.push(aa(r[c].image)):o.push(aa(r[c]))}else o=aa(r);i.url=o}return e||(t.images[this.uuid]=i),i}}function aa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ud.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fd=0;class hn extends Yi{constructor(t=hn.DEFAULT_IMAGE,e=hn.DEFAULT_MAPPING,i=zi,r=zi,o=In,c=Hi,l=Rn,u=ci,f=hn.DEFAULT_ANISOTROPY,p=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=li(),this.name="",this.source=new Vu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=o,this.minFilter=c,this.anisotropy=f,this.format=l,this.internalFormat=null,this.type=u,this.offset=new Rt(0,0),this.repeat=new Rt(1,1),this.center=new Rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=p,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Iu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case fl:t.x=t.x-Math.floor(t.x);break;case zi:t.x=t.x<0?0:1;break;case dl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case fl:t.y=t.y-Math.floor(t.y);break;case zi:t.y=t.y<0?0:1;break;case dl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=Iu;hn.DEFAULT_ANISOTROPY=1;class oe{constructor(t=0,e=0,i=0,r=1){oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,o=this.w,c=t.elements;return this.x=c[0]*e+c[4]*i+c[8]*r+c[12]*o,this.y=c[1]*e+c[5]*i+c[9]*r+c[13]*o,this.z=c[2]*e+c[6]*i+c[10]*r+c[14]*o,this.w=c[3]*e+c[7]*i+c[11]*r+c[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,o;const u=t.elements,f=u[0],p=u[4],m=u[8],g=u[1],v=u[5],M=u[9],S=u[2],_=u[6],y=u[10];if(Math.abs(p-g)<.01&&Math.abs(m-S)<.01&&Math.abs(M-_)<.01){if(Math.abs(p+g)<.1&&Math.abs(m+S)<.1&&Math.abs(M+_)<.1&&Math.abs(f+v+y-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(f+1)/2,I=(v+1)/2,z=(y+1)/2,F=(p+g)/4,N=(m+S)/4,X=(M+_)/4;return b>I&&b>z?b<.01?(i=0,r=.707106781,o=.707106781):(i=Math.sqrt(b),r=F/i,o=N/i):I>z?I<.01?(i=.707106781,r=0,o=.707106781):(r=Math.sqrt(I),i=F/r,o=X/r):z<.01?(i=.707106781,r=.707106781,o=0):(o=Math.sqrt(z),i=N/o,r=X/o),this.set(i,r,o,e),this}let P=Math.sqrt((_-M)*(_-M)+(m-S)*(m-S)+(g-p)*(g-p));return Math.abs(P)<.001&&(P=1),this.x=(_-M)/P,this.y=(m-S)/P,this.z=(g-p)/P,this.w=Math.acos((f+v+y-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bd extends Yi{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);const r={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:In,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const o=new hn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);o.flipY=!1,o.generateMipmaps=i.generateMipmaps,o.internalFormat=i.internalFormat,this.textures=[];const c=i.count;for(let l=0;l<c;l++)this.textures[l]=o.clone(),this.textures[l].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,o=this.textures.length;r<o;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Vu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vi extends Bd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Wu extends hn{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=wn,this.minFilter=wn,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class kd extends hn{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=wn,this.minFilter=wn,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qn{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,o,c,l){let u=i[r+0],f=i[r+1],p=i[r+2],m=i[r+3];const g=o[c+0],v=o[c+1],M=o[c+2],S=o[c+3];if(l===0){t[e+0]=u,t[e+1]=f,t[e+2]=p,t[e+3]=m;return}if(l===1){t[e+0]=g,t[e+1]=v,t[e+2]=M,t[e+3]=S;return}if(m!==S||u!==g||f!==v||p!==M){let _=1-l;const y=u*g+f*v+p*M+m*S,P=y>=0?1:-1,b=1-y*y;if(b>Number.EPSILON){const z=Math.sqrt(b),F=Math.atan2(z,y*P);_=Math.sin(_*F)/z,l=Math.sin(l*F)/z}const I=l*P;if(u=u*_+g*I,f=f*_+v*I,p=p*_+M*I,m=m*_+S*I,_===1-l){const z=1/Math.sqrt(u*u+f*f+p*p+m*m);u*=z,f*=z,p*=z,m*=z}}t[e]=u,t[e+1]=f,t[e+2]=p,t[e+3]=m}static multiplyQuaternionsFlat(t,e,i,r,o,c){const l=i[r],u=i[r+1],f=i[r+2],p=i[r+3],m=o[c],g=o[c+1],v=o[c+2],M=o[c+3];return t[e]=l*M+p*m+u*v-f*g,t[e+1]=u*M+p*g+f*m-l*v,t[e+2]=f*M+p*v+l*g-u*m,t[e+3]=p*M-l*m-u*g-f*v,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,o=t._z,c=t._order,l=Math.cos,u=Math.sin,f=l(i/2),p=l(r/2),m=l(o/2),g=u(i/2),v=u(r/2),M=u(o/2);switch(c){case"XYZ":this._x=g*p*m+f*v*M,this._y=f*v*m-g*p*M,this._z=f*p*M+g*v*m,this._w=f*p*m-g*v*M;break;case"YXZ":this._x=g*p*m+f*v*M,this._y=f*v*m-g*p*M,this._z=f*p*M-g*v*m,this._w=f*p*m+g*v*M;break;case"ZXY":this._x=g*p*m-f*v*M,this._y=f*v*m+g*p*M,this._z=f*p*M+g*v*m,this._w=f*p*m-g*v*M;break;case"ZYX":this._x=g*p*m-f*v*M,this._y=f*v*m+g*p*M,this._z=f*p*M-g*v*m,this._w=f*p*m+g*v*M;break;case"YZX":this._x=g*p*m+f*v*M,this._y=f*v*m+g*p*M,this._z=f*p*M-g*v*m,this._w=f*p*m-g*v*M;break;case"XZY":this._x=g*p*m-f*v*M,this._y=f*v*m-g*p*M,this._z=f*p*M+g*v*m,this._w=f*p*m+g*v*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+c)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],o=e[8],c=e[1],l=e[5],u=e[9],f=e[2],p=e[6],m=e[10],g=i+l+m;if(g>0){const v=.5/Math.sqrt(g+1);this._w=.25/v,this._x=(p-u)*v,this._y=(o-f)*v,this._z=(c-r)*v}else if(i>l&&i>m){const v=2*Math.sqrt(1+i-l-m);this._w=(p-u)/v,this._x=.25*v,this._y=(r+c)/v,this._z=(o+f)/v}else if(l>m){const v=2*Math.sqrt(1+l-i-m);this._w=(o-f)/v,this._x=(r+c)/v,this._y=.25*v,this._z=(u+p)/v}else{const v=2*Math.sqrt(1+m-i-l);this._w=(c-r)/v,this._x=(o+f)/v,this._y=(u+p)/v,this._z=.25*v}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(We(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,o=t._z,c=t._w,l=e._x,u=e._y,f=e._z,p=e._w;return this._x=i*p+c*l+r*f-o*u,this._y=r*p+c*u+o*l-i*f,this._z=o*p+c*f+i*u-r*l,this._w=c*p-i*l-r*u-o*f,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,o=this._z,c=this._w;let l=c*t._w+i*t._x+r*t._y+o*t._z;if(l<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,l=-l):this.copy(t),l>=1)return this._w=c,this._x=i,this._y=r,this._z=o,this;const u=1-l*l;if(u<=Number.EPSILON){const v=1-e;return this._w=v*c+e*this._w,this._x=v*i+e*this._x,this._y=v*r+e*this._y,this._z=v*o+e*this._z,this.normalize(),this}const f=Math.sqrt(u),p=Math.atan2(f,l),m=Math.sin((1-e)*p)/f,g=Math.sin(e*p)/f;return this._w=c*m+this._w*g,this._x=i*m+this._x*g,this._y=r*m+this._y*g,this._z=o*m+this._z*g,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,e=0,i=0){U.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Yc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Yc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,o=t.elements;return this.x=o[0]*e+o[3]*i+o[6]*r,this.y=o[1]*e+o[4]*i+o[7]*r,this.z=o[2]*e+o[5]*i+o[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,o=t.elements,c=1/(o[3]*e+o[7]*i+o[11]*r+o[15]);return this.x=(o[0]*e+o[4]*i+o[8]*r+o[12])*c,this.y=(o[1]*e+o[5]*i+o[9]*r+o[13])*c,this.z=(o[2]*e+o[6]*i+o[10]*r+o[14])*c,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,o=t.x,c=t.y,l=t.z,u=t.w,f=2*(c*r-l*i),p=2*(l*e-o*r),m=2*(o*i-c*e);return this.x=e+u*f+c*m-l*p,this.y=i+u*p+l*f-o*m,this.z=r+u*m+o*p-c*f,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r,this.y=o[1]*e+o[5]*i+o[9]*r,this.z=o[2]*e+o[6]*i+o[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,o=t.z,c=e.x,l=e.y,u=e.z;return this.x=r*u-o*l,this.y=o*c-i*u,this.z=i*l-r*c,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return la.copy(this).projectOnVector(t),this.sub(la)}reflect(t){return this.sub(la.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(We(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const la=new U,Yc=new qn;class $n{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Tn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Tn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Tn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const o=i.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let c=0,l=o.count;c<l;c++)t.isMesh===!0?t.getVertexPosition(c,Tn):Tn.fromBufferAttribute(o,c),Tn.applyMatrix4(t.matrixWorld),this.expandByPoint(Tn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ur.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ur.copy(i.boundingBox)),Ur.applyMatrix4(t.matrixWorld),this.union(Ur)}const r=t.children;for(let o=0,c=r.length;o<c;o++)this.expandByObject(r[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Tn),Tn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ys),Or.subVectors(this.max,Ys),ns.subVectors(t.a,Ys),is.subVectors(t.b,Ys),ss.subVectors(t.c,Ys),ui.subVectors(is,ns),fi.subVectors(ss,is),Ti.subVectors(ns,ss);let e=[0,-ui.z,ui.y,0,-fi.z,fi.y,0,-Ti.z,Ti.y,ui.z,0,-ui.x,fi.z,0,-fi.x,Ti.z,0,-Ti.x,-ui.y,ui.x,0,-fi.y,fi.x,0,-Ti.y,Ti.x,0];return!ca(e,ns,is,ss,Or)||(e=[1,0,0,0,1,0,0,0,1],!ca(e,ns,is,ss,Or))?!1:(Fr.crossVectors(ui,fi),e=[Fr.x,Fr.y,Fr.z],ca(e,ns,is,ss,Or))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Tn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Tn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const jn=[new U,new U,new U,new U,new U,new U,new U,new U],Tn=new U,Ur=new $n,ns=new U,is=new U,ss=new U,ui=new U,fi=new U,Ti=new U,Ys=new U,Or=new U,Fr=new U,Ai=new U;function ca(n,t,e,i,r){for(let o=0,c=n.length-3;o<=c;o+=3){Ai.fromArray(n,o);const l=r.x*Math.abs(Ai.x)+r.y*Math.abs(Ai.y)+r.z*Math.abs(Ai.z),u=t.dot(Ai),f=e.dot(Ai),p=i.dot(Ai);if(Math.max(-Math.max(u,f,p),Math.min(u,f,p))>l)return!1}return!0}const zd=new $n,qs=new U,ha=new U;class qi{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):zd.setFromPoints(t).getCenter(i);let r=0;for(let o=0,c=t.length;o<c;o++)r=Math.max(r,i.distanceToSquared(t[o]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;qs.subVectors(t,this.center);const e=qs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(qs,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ha.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(qs.copy(t.center).add(ha)),this.expandByPoint(qs.copy(t.center).sub(ha))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Qn=new U,ua=new U,Br=new U,di=new U,fa=new U,kr=new U,da=new U;class Xo{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Qn.copy(this.origin).addScaledVector(this.direction,e),Qn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){ua.copy(t).add(e).multiplyScalar(.5),Br.copy(e).sub(t).normalize(),di.copy(this.origin).sub(ua);const o=t.distanceTo(e)*.5,c=-this.direction.dot(Br),l=di.dot(this.direction),u=-di.dot(Br),f=di.lengthSq(),p=Math.abs(1-c*c);let m,g,v,M;if(p>0)if(m=c*u-l,g=c*l-u,M=o*p,m>=0)if(g>=-M)if(g<=M){const S=1/p;m*=S,g*=S,v=m*(m+c*g+2*l)+g*(c*m+g+2*u)+f}else g=o,m=Math.max(0,-(c*g+l)),v=-m*m+g*(g+2*u)+f;else g=-o,m=Math.max(0,-(c*g+l)),v=-m*m+g*(g+2*u)+f;else g<=-M?(m=Math.max(0,-(-c*o+l)),g=m>0?-o:Math.min(Math.max(-o,-u),o),v=-m*m+g*(g+2*u)+f):g<=M?(m=0,g=Math.min(Math.max(-o,-u),o),v=g*(g+2*u)+f):(m=Math.max(0,-(c*o+l)),g=m>0?o:Math.min(Math.max(-o,-u),o),v=-m*m+g*(g+2*u)+f);else g=c>0?-o:o,m=Math.max(0,-(c*g+l)),v=-m*m+g*(g+2*u)+f;return i&&i.copy(this.origin).addScaledVector(this.direction,m),r&&r.copy(ua).addScaledVector(Br,g),v}intersectSphere(t,e){Qn.subVectors(t.center,this.origin);const i=Qn.dot(this.direction),r=Qn.dot(Qn)-i*i,o=t.radius*t.radius;if(r>o)return null;const c=Math.sqrt(o-r),l=i-c,u=i+c;return u<0?null:l<0?this.at(u,e):this.at(l,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,o,c,l,u;const f=1/this.direction.x,p=1/this.direction.y,m=1/this.direction.z,g=this.origin;return f>=0?(i=(t.min.x-g.x)*f,r=(t.max.x-g.x)*f):(i=(t.max.x-g.x)*f,r=(t.min.x-g.x)*f),p>=0?(o=(t.min.y-g.y)*p,c=(t.max.y-g.y)*p):(o=(t.max.y-g.y)*p,c=(t.min.y-g.y)*p),i>c||o>r||((o>i||isNaN(i))&&(i=o),(c<r||isNaN(r))&&(r=c),m>=0?(l=(t.min.z-g.z)*m,u=(t.max.z-g.z)*m):(l=(t.max.z-g.z)*m,u=(t.min.z-g.z)*m),i>u||l>r)||((l>i||i!==i)&&(i=l),(u<r||r!==r)&&(r=u),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,Qn)!==null}intersectTriangle(t,e,i,r,o){fa.subVectors(e,t),kr.subVectors(i,t),da.crossVectors(fa,kr);let c=this.direction.dot(da),l;if(c>0){if(r)return null;l=1}else if(c<0)l=-1,c=-c;else return null;di.subVectors(this.origin,t);const u=l*this.direction.dot(kr.crossVectors(di,kr));if(u<0)return null;const f=l*this.direction.dot(fa.cross(di));if(f<0||u+f>c)return null;const p=-l*di.dot(da);return p<0?null:this.at(p/c,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Te{constructor(t,e,i,r,o,c,l,u,f,p,m,g,v,M,S,_){Te.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,o,c,l,u,f,p,m,g,v,M,S,_)}set(t,e,i,r,o,c,l,u,f,p,m,g,v,M,S,_){const y=this.elements;return y[0]=t,y[4]=e,y[8]=i,y[12]=r,y[1]=o,y[5]=c,y[9]=l,y[13]=u,y[2]=f,y[6]=p,y[10]=m,y[14]=g,y[3]=v,y[7]=M,y[11]=S,y[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Te().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/rs.setFromMatrixColumn(t,0).length(),o=1/rs.setFromMatrixColumn(t,1).length(),c=1/rs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*o,e[5]=i[5]*o,e[6]=i[6]*o,e[7]=0,e[8]=i[8]*c,e[9]=i[9]*c,e[10]=i[10]*c,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,o=t.z,c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),f=Math.sin(r),p=Math.cos(o),m=Math.sin(o);if(t.order==="XYZ"){const g=c*p,v=c*m,M=l*p,S=l*m;e[0]=u*p,e[4]=-u*m,e[8]=f,e[1]=v+M*f,e[5]=g-S*f,e[9]=-l*u,e[2]=S-g*f,e[6]=M+v*f,e[10]=c*u}else if(t.order==="YXZ"){const g=u*p,v=u*m,M=f*p,S=f*m;e[0]=g+S*l,e[4]=M*l-v,e[8]=c*f,e[1]=c*m,e[5]=c*p,e[9]=-l,e[2]=v*l-M,e[6]=S+g*l,e[10]=c*u}else if(t.order==="ZXY"){const g=u*p,v=u*m,M=f*p,S=f*m;e[0]=g-S*l,e[4]=-c*m,e[8]=M+v*l,e[1]=v+M*l,e[5]=c*p,e[9]=S-g*l,e[2]=-c*f,e[6]=l,e[10]=c*u}else if(t.order==="ZYX"){const g=c*p,v=c*m,M=l*p,S=l*m;e[0]=u*p,e[4]=M*f-v,e[8]=g*f+S,e[1]=u*m,e[5]=S*f+g,e[9]=v*f-M,e[2]=-f,e[6]=l*u,e[10]=c*u}else if(t.order==="YZX"){const g=c*u,v=c*f,M=l*u,S=l*f;e[0]=u*p,e[4]=S-g*m,e[8]=M*m+v,e[1]=m,e[5]=c*p,e[9]=-l*p,e[2]=-f*p,e[6]=v*m+M,e[10]=g-S*m}else if(t.order==="XZY"){const g=c*u,v=c*f,M=l*u,S=l*f;e[0]=u*p,e[4]=-m,e[8]=f*p,e[1]=g*m+S,e[5]=c*p,e[9]=v*m-M,e[2]=M*m-v,e[6]=l*p,e[10]=S*m+g}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hd,t,Gd)}lookAt(t,e,i){const r=this.elements;return gn.subVectors(t,e),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),pi.crossVectors(i,gn),pi.lengthSq()===0&&(Math.abs(i.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),pi.crossVectors(i,gn)),pi.normalize(),zr.crossVectors(gn,pi),r[0]=pi.x,r[4]=zr.x,r[8]=gn.x,r[1]=pi.y,r[5]=zr.y,r[9]=gn.y,r[2]=pi.z,r[6]=zr.z,r[10]=gn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,o=this.elements,c=i[0],l=i[4],u=i[8],f=i[12],p=i[1],m=i[5],g=i[9],v=i[13],M=i[2],S=i[6],_=i[10],y=i[14],P=i[3],b=i[7],I=i[11],z=i[15],F=r[0],N=r[4],X=r[8],ot=r[12],w=r[1],L=r[5],Z=r[9],$=r[13],Q=r[2],st=r[6],K=r[10],lt=r[14],j=r[3],St=r[7],Mt=r[11],Lt=r[15];return o[0]=c*F+l*w+u*Q+f*j,o[4]=c*N+l*L+u*st+f*St,o[8]=c*X+l*Z+u*K+f*Mt,o[12]=c*ot+l*$+u*lt+f*Lt,o[1]=p*F+m*w+g*Q+v*j,o[5]=p*N+m*L+g*st+v*St,o[9]=p*X+m*Z+g*K+v*Mt,o[13]=p*ot+m*$+g*lt+v*Lt,o[2]=M*F+S*w+_*Q+y*j,o[6]=M*N+S*L+_*st+y*St,o[10]=M*X+S*Z+_*K+y*Mt,o[14]=M*ot+S*$+_*lt+y*Lt,o[3]=P*F+b*w+I*Q+z*j,o[7]=P*N+b*L+I*st+z*St,o[11]=P*X+b*Z+I*K+z*Mt,o[15]=P*ot+b*$+I*lt+z*Lt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],o=t[12],c=t[1],l=t[5],u=t[9],f=t[13],p=t[2],m=t[6],g=t[10],v=t[14],M=t[3],S=t[7],_=t[11],y=t[15];return M*(+o*u*m-r*f*m-o*l*g+i*f*g+r*l*v-i*u*v)+S*(+e*u*v-e*f*g+o*c*g-r*c*v+r*f*p-o*u*p)+_*(+e*f*m-e*l*v-o*c*m+i*c*v+o*l*p-i*f*p)+y*(-r*l*p-e*u*m+e*l*g+r*c*m-i*c*g+i*u*p)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],o=t[3],c=t[4],l=t[5],u=t[6],f=t[7],p=t[8],m=t[9],g=t[10],v=t[11],M=t[12],S=t[13],_=t[14],y=t[15],P=m*_*f-S*g*f+S*u*v-l*_*v-m*u*y+l*g*y,b=M*g*f-p*_*f-M*u*v+c*_*v+p*u*y-c*g*y,I=p*S*f-M*m*f+M*l*v-c*S*v-p*l*y+c*m*y,z=M*m*u-p*S*u-M*l*g+c*S*g+p*l*_-c*m*_,F=e*P+i*b+r*I+o*z;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/F;return t[0]=P*N,t[1]=(S*g*o-m*_*o-S*r*v+i*_*v+m*r*y-i*g*y)*N,t[2]=(l*_*o-S*u*o+S*r*f-i*_*f-l*r*y+i*u*y)*N,t[3]=(m*u*o-l*g*o-m*r*f+i*g*f+l*r*v-i*u*v)*N,t[4]=b*N,t[5]=(p*_*o-M*g*o+M*r*v-e*_*v-p*r*y+e*g*y)*N,t[6]=(M*u*o-c*_*o-M*r*f+e*_*f+c*r*y-e*u*y)*N,t[7]=(c*g*o-p*u*o+p*r*f-e*g*f-c*r*v+e*u*v)*N,t[8]=I*N,t[9]=(M*m*o-p*S*o-M*i*v+e*S*v+p*i*y-e*m*y)*N,t[10]=(c*S*o-M*l*o+M*i*f-e*S*f-c*i*y+e*l*y)*N,t[11]=(p*l*o-c*m*o-p*i*f+e*m*f+c*i*v-e*l*v)*N,t[12]=z*N,t[13]=(p*S*r-M*m*r+M*i*g-e*S*g-p*i*_+e*m*_)*N,t[14]=(M*l*r-c*S*r-M*i*u+e*S*u+c*i*_-e*l*_)*N,t[15]=(c*m*r-p*l*r+p*i*u-e*m*u-c*i*g+e*l*g)*N,this}scale(t){const e=this.elements,i=t.x,r=t.y,o=t.z;return e[0]*=i,e[4]*=r,e[8]*=o,e[1]*=i,e[5]*=r,e[9]*=o,e[2]*=i,e[6]*=r,e[10]*=o,e[3]*=i,e[7]*=r,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),o=1-i,c=t.x,l=t.y,u=t.z,f=o*c,p=o*l;return this.set(f*c+i,f*l-r*u,f*u+r*l,0,f*l+r*u,p*l+i,p*u-r*c,0,f*u-r*l,p*u+r*c,o*u*u+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,o,c){return this.set(1,i,o,0,t,1,c,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,o=e._x,c=e._y,l=e._z,u=e._w,f=o+o,p=c+c,m=l+l,g=o*f,v=o*p,M=o*m,S=c*p,_=c*m,y=l*m,P=u*f,b=u*p,I=u*m,z=i.x,F=i.y,N=i.z;return r[0]=(1-(S+y))*z,r[1]=(v+I)*z,r[2]=(M-b)*z,r[3]=0,r[4]=(v-I)*F,r[5]=(1-(g+y))*F,r[6]=(_+P)*F,r[7]=0,r[8]=(M+b)*N,r[9]=(_-P)*N,r[10]=(1-(g+S))*N,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let o=rs.set(r[0],r[1],r[2]).length();const c=rs.set(r[4],r[5],r[6]).length(),l=rs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),t.x=r[12],t.y=r[13],t.z=r[14],An.copy(this);const f=1/o,p=1/c,m=1/l;return An.elements[0]*=f,An.elements[1]*=f,An.elements[2]*=f,An.elements[4]*=p,An.elements[5]*=p,An.elements[6]*=p,An.elements[8]*=m,An.elements[9]*=m,An.elements[10]*=m,e.setFromRotationMatrix(An),i.x=o,i.y=c,i.z=l,this}makePerspective(t,e,i,r,o,c,l=oi){const u=this.elements,f=2*o/(e-t),p=2*o/(i-r),m=(e+t)/(e-t),g=(i+r)/(i-r);let v,M;if(l===oi)v=-(c+o)/(c-o),M=-2*c*o/(c-o);else if(l===Lo)v=-c/(c-o),M=-c*o/(c-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return u[0]=f,u[4]=0,u[8]=m,u[12]=0,u[1]=0,u[5]=p,u[9]=g,u[13]=0,u[2]=0,u[6]=0,u[10]=v,u[14]=M,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(t,e,i,r,o,c,l=oi){const u=this.elements,f=1/(e-t),p=1/(i-r),m=1/(c-o),g=(e+t)*f,v=(i+r)*p;let M,S;if(l===oi)M=(c+o)*m,S=-2*m;else if(l===Lo)M=o*m,S=-1*m;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return u[0]=2*f,u[4]=0,u[8]=0,u[12]=-g,u[1]=0,u[5]=2*p,u[9]=0,u[13]=-v,u[2]=0,u[6]=0,u[10]=S,u[14]=-M,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const rs=new U,An=new Te,Hd=new U(0,0,0),Gd=new U(1,1,1),pi=new U,zr=new U,gn=new U,qc=new Te,Zc=new qn;class Zn{constructor(t=0,e=0,i=0,r=Zn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,o=r[0],c=r[4],l=r[8],u=r[1],f=r[5],p=r[9],m=r[2],g=r[6],v=r[10];switch(e){case"XYZ":this._y=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-p,v),this._z=Math.atan2(-c,o)):(this._x=Math.atan2(g,f),this._z=0);break;case"YXZ":this._x=Math.asin(-We(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(l,v),this._z=Math.atan2(u,f)):(this._y=Math.atan2(-m,o),this._z=0);break;case"ZXY":this._x=Math.asin(We(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-m,v),this._z=Math.atan2(-c,f)):(this._y=0,this._z=Math.atan2(u,o));break;case"ZYX":this._y=Math.asin(-We(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(g,v),this._z=Math.atan2(u,o)):(this._x=0,this._z=Math.atan2(-c,f));break;case"YZX":this._z=Math.asin(We(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-p,f),this._y=Math.atan2(-m,o)):(this._x=0,this._y=Math.atan2(l,v));break;case"XZY":this._z=Math.asin(-We(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(g,f),this._y=Math.atan2(l,o)):(this._x=Math.atan2(-p,v),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return qc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Zc.setFromEuler(this),this.setFromQuaternion(Zc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Zn.DEFAULT_ORDER="XYZ";class pc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Xd=0;const $c=new U,os=new qn,ti=new Te,Hr=new U,Zs=new U,Vd=new U,Wd=new qn,Kc=new U(1,0,0),Jc=new U(0,1,0),jc=new U(0,0,1),Qc={type:"added"},Yd={type:"removed"},as={type:"childadded",child:null},pa={type:"childremoved",child:null};class He extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=He.DEFAULT_UP.clone();const t=new U,e=new Zn,i=new qn,r=new U(1,1,1);function o(){i.setFromEuler(e,!1)}function c(){e.setFromQuaternion(i,void 0,!1)}e._onChange(o),i._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Te},normalMatrix:{value:new jt}}),this.matrix=new Te,this.matrixWorld=new Te,this.matrixAutoUpdate=He.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=He.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.multiply(os),this}rotateOnWorldAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.premultiply(os),this}rotateX(t){return this.rotateOnAxis(Kc,t)}rotateY(t){return this.rotateOnAxis(Jc,t)}rotateZ(t){return this.rotateOnAxis(jc,t)}translateOnAxis(t,e){return $c.copy(t).applyQuaternion(this.quaternion),this.position.add($c.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Kc,t)}translateY(t){return this.translateOnAxis(Jc,t)}translateZ(t){return this.translateOnAxis(jc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Hr.copy(t):Hr.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(Zs,Hr,this.up):ti.lookAt(Hr,Zs,this.up),this.quaternion.setFromRotationMatrix(ti),r&&(ti.extractRotation(r.matrixWorld),os.setFromRotationMatrix(ti),this.quaternion.premultiply(os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qc),as.child=t,this.dispatchEvent(as),as.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Yd),pa.child=t,this.dispatchEvent(pa),pa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ti.multiply(t.parent.matrixWorld)),t.applyMatrix4(ti),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qc),as.child=t,this.dispatchEvent(as),as.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const c=this.children[i].getObjectByProperty(t,e);if(c!==void 0)return c}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let o=0,c=r.length;o<c;o++)r[o].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,t,Vd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,Wd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let o=0,c=r.length;o<c;o++)r[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function o(l,u){return l[u.uuid]===void 0&&(l[u.uuid]=u.toJSON(t)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(t.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const u=l.shapes;if(Array.isArray(u))for(let f=0,p=u.length;f<p;f++){const m=u[f];o(t.shapes,m)}else o(t.shapes,u)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let u=0,f=this.material.length;u<f;u++)l.push(o(t.materials,this.material[u]));r.material=l}else r.material=o(t.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const u=this.animations[l];r.animations.push(o(t.animations,u))}}if(e){const l=c(t.geometries),u=c(t.materials),f=c(t.textures),p=c(t.images),m=c(t.shapes),g=c(t.skeletons),v=c(t.animations),M=c(t.nodes);l.length>0&&(i.geometries=l),u.length>0&&(i.materials=u),f.length>0&&(i.textures=f),p.length>0&&(i.images=p),m.length>0&&(i.shapes=m),g.length>0&&(i.skeletons=g),v.length>0&&(i.animations=v),M.length>0&&(i.nodes=M)}return i.object=r,i;function c(l){const u=[];for(const f in l){const p=l[f];delete p.metadata,u.push(p)}return u}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}He.DEFAULT_UP=new U(0,1,0);He.DEFAULT_MATRIX_AUTO_UPDATE=!0;He.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pn=new U,ei=new U,ma=new U,ni=new U,ls=new U,cs=new U,th=new U,ga=new U,va=new U,_a=new U,xa=new oe,ya=new oe,Sa=new oe;class En{constructor(t=new U,e=new U,i=new U){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),Pn.subVectors(t,e),r.cross(Pn);const o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(t,e,i,r,o){Pn.subVectors(r,e),ei.subVectors(i,e),ma.subVectors(t,e);const c=Pn.dot(Pn),l=Pn.dot(ei),u=Pn.dot(ma),f=ei.dot(ei),p=ei.dot(ma),m=c*f-l*l;if(m===0)return o.set(0,0,0),null;const g=1/m,v=(f*u-l*p)*g,M=(c*p-l*u)*g;return o.set(1-v-M,M,v)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,ni)===null?!1:ni.x>=0&&ni.y>=0&&ni.x+ni.y<=1}static getInterpolation(t,e,i,r,o,c,l,u){return this.getBarycoord(t,e,i,r,ni)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(o,ni.x),u.addScaledVector(c,ni.y),u.addScaledVector(l,ni.z),u)}static getInterpolatedAttribute(t,e,i,r,o,c){return xa.setScalar(0),ya.setScalar(0),Sa.setScalar(0),xa.fromBufferAttribute(t,e),ya.fromBufferAttribute(t,i),Sa.fromBufferAttribute(t,r),c.setScalar(0),c.addScaledVector(xa,o.x),c.addScaledVector(ya,o.y),c.addScaledVector(Sa,o.z),c}static isFrontFacing(t,e,i,r){return Pn.subVectors(i,e),ei.subVectors(t,e),Pn.cross(ei).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pn.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),Pn.cross(ei).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return En.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return En.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,o){return En.getInterpolation(t,this.a,this.b,this.c,e,i,r,o)}containsPoint(t){return En.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return En.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,o=this.c;let c,l;ls.subVectors(r,i),cs.subVectors(o,i),ga.subVectors(t,i);const u=ls.dot(ga),f=cs.dot(ga);if(u<=0&&f<=0)return e.copy(i);va.subVectors(t,r);const p=ls.dot(va),m=cs.dot(va);if(p>=0&&m<=p)return e.copy(r);const g=u*m-p*f;if(g<=0&&u>=0&&p<=0)return c=u/(u-p),e.copy(i).addScaledVector(ls,c);_a.subVectors(t,o);const v=ls.dot(_a),M=cs.dot(_a);if(M>=0&&v<=M)return e.copy(o);const S=v*f-u*M;if(S<=0&&f>=0&&M<=0)return l=f/(f-M),e.copy(i).addScaledVector(cs,l);const _=p*M-v*m;if(_<=0&&m-p>=0&&v-M>=0)return th.subVectors(o,r),l=(m-p)/(m-p+(v-M)),e.copy(r).addScaledVector(th,l);const y=1/(_+S+g);return c=S*y,l=g*y,e.copy(i).addScaledVector(ls,c).addScaledVector(cs,l)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Yu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mi={h:0,s:0,l:0},Gr={h:0,s:0,l:0};function Ma(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class kt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=zn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ve.toWorkingColorSpace(this,e),this}setRGB(t,e,i,r=ve.workingColorSpace){return this.r=t,this.g=e,this.b=i,ve.toWorkingColorSpace(this,r),this}setHSL(t,e,i,r=ve.workingColorSpace){if(t=dc(t,1),e=We(e,0,1),i=We(i,0,1),e===0)this.r=this.g=this.b=i;else{const o=i<=.5?i*(1+e):i+e-i*e,c=2*i-o;this.r=Ma(c,o,t+1/3),this.g=Ma(c,o,t),this.b=Ma(c,o,t-1/3)}return ve.toWorkingColorSpace(this,r),this}setStyle(t,e=zn){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const c=r[1],l=r[2];switch(c){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=r[1],c=o.length;if(c===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(c===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=zn){const i=Yu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Cs(t.r),this.g=Cs(t.g),this.b=Cs(t.b),this}copyLinearToSRGB(t){return this.r=oa(t.r),this.g=oa(t.g),this.b=oa(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=zn){return ve.fromWorkingColorSpace(en.copy(this),t),Math.round(We(en.r*255,0,255))*65536+Math.round(We(en.g*255,0,255))*256+Math.round(We(en.b*255,0,255))}getHexString(t=zn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ve.workingColorSpace){ve.fromWorkingColorSpace(en.copy(this),e);const i=en.r,r=en.g,o=en.b,c=Math.max(i,r,o),l=Math.min(i,r,o);let u,f;const p=(l+c)/2;if(l===c)u=0,f=0;else{const m=c-l;switch(f=p<=.5?m/(c+l):m/(2-c-l),c){case i:u=(r-o)/m+(r<o?6:0);break;case r:u=(o-i)/m+2;break;case o:u=(i-r)/m+4;break}u/=6}return t.h=u,t.s=f,t.l=p,t}getRGB(t,e=ve.workingColorSpace){return ve.fromWorkingColorSpace(en.copy(this),e),t.r=en.r,t.g=en.g,t.b=en.b,t}getStyle(t=zn){ve.fromWorkingColorSpace(en.copy(this),t);const e=en.r,i=en.g,r=en.b;return t!==zn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(mi),this.setHSL(mi.h+t,mi.s+e,mi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(mi),t.getHSL(Gr);const i=lr(mi.h,Gr.h,e),r=lr(mi.s,Gr.s,e),o=lr(mi.l,Gr.l,e);return this.setHSL(i,r,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,o=t.elements;return this.r=o[0]*e+o[3]*i+o[6]*r,this.g=o[1]*e+o[4]*i+o[7]*r,this.b=o[2]*e+o[5]*i+o[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new kt;kt.NAMES=Yu;let qd=0;class Zi extends Yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qd++}),this.uuid=li(),this.name="",this.type="Material",this.blending=As,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=el,this.blendDst=nl,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=Ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ts,this.stencilZFail=ts,this.stencilZPass=ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==As&&(i.blending=this.blending),this.side!==Mi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==el&&(i.blendSrc=this.blendSrc),this.blendDst!==nl&&(i.blendDst=this.blendDst),this.blendEquation!==Oi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ls&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ts&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ts&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ts&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}if(e){const o=r(t.textures),c=r(t.images);o.length>0&&(i.textures=o),c.length>0&&(i.images=c)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let o=0;o!==r;++o)i[o]=e[o].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class qu extends Zi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.combine=rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Fe=new U,Xr=new Rt;class Nn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=zl,this.updateRanges=[],this.gpuType=ri,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Xr.fromBufferAttribute(this,e),Xr.applyMatrix3(t),this.setXY(e,Xr.x,Xr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix3(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Ln(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=xe(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array),r=xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,o){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array),r=xe(r,this.array),o=xe(o,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==zl&&(t.usage=this.usage),t}}class Zu extends Nn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class $u extends Nn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class se extends Nn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Zd=0;const yn=new Te,Ea=new He,hs=new U,vn=new $n,$s=new $n,Ve=new U;class Be extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=li(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Xu(t)?$u:Zu)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const o=new jt().getNormalMatrix(t);i.applyNormalMatrix(o),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return yn.makeRotationFromQuaternion(t),this.applyMatrix4(yn),this}rotateX(t){return yn.makeRotationX(t),this.applyMatrix4(yn),this}rotateY(t){return yn.makeRotationY(t),this.applyMatrix4(yn),this}rotateZ(t){return yn.makeRotationZ(t),this.applyMatrix4(yn),this}translate(t,e,i){return yn.makeTranslation(t,e,i),this.applyMatrix4(yn),this}scale(t,e,i){return yn.makeScale(t,e,i),this.applyMatrix4(yn),this}lookAt(t){return Ea.lookAt(t),Ea.updateMatrix(),this.applyMatrix4(Ea.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hs).negate(),this.translate(hs.x,hs.y,hs.z),this}setFromPoints(t){const e=[];for(let i=0,r=t.length;i<r;i++){const o=t[i];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new se(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $n);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const o=e[i];vn.setFromBufferAttribute(o),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const i=this.boundingSphere.center;if(vn.setFromBufferAttribute(t),e)for(let o=0,c=e.length;o<c;o++){const l=e[o];$s.setFromBufferAttribute(l),this.morphTargetsRelative?(Ve.addVectors(vn.min,$s.min),vn.expandByPoint(Ve),Ve.addVectors(vn.max,$s.max),vn.expandByPoint(Ve)):(vn.expandByPoint($s.min),vn.expandByPoint($s.max))}vn.getCenter(i);let r=0;for(let o=0,c=t.count;o<c;o++)Ve.fromBufferAttribute(t,o),r=Math.max(r,i.distanceToSquared(Ve));if(e)for(let o=0,c=e.length;o<c;o++){const l=e[o],u=this.morphTargetsRelative;for(let f=0,p=l.count;f<p;f++)Ve.fromBufferAttribute(l,f),u&&(hs.fromBufferAttribute(t,f),Ve.add(hs)),r=Math.max(r,i.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nn(new Float32Array(4*i.count),4));const c=this.getAttribute("tangent"),l=[],u=[];for(let X=0;X<i.count;X++)l[X]=new U,u[X]=new U;const f=new U,p=new U,m=new U,g=new Rt,v=new Rt,M=new Rt,S=new U,_=new U;function y(X,ot,w){f.fromBufferAttribute(i,X),p.fromBufferAttribute(i,ot),m.fromBufferAttribute(i,w),g.fromBufferAttribute(o,X),v.fromBufferAttribute(o,ot),M.fromBufferAttribute(o,w),p.sub(f),m.sub(f),v.sub(g),M.sub(g);const L=1/(v.x*M.y-M.x*v.y);isFinite(L)&&(S.copy(p).multiplyScalar(M.y).addScaledVector(m,-v.y).multiplyScalar(L),_.copy(m).multiplyScalar(v.x).addScaledVector(p,-M.x).multiplyScalar(L),l[X].add(S),l[ot].add(S),l[w].add(S),u[X].add(_),u[ot].add(_),u[w].add(_))}let P=this.groups;P.length===0&&(P=[{start:0,count:t.count}]);for(let X=0,ot=P.length;X<ot;++X){const w=P[X],L=w.start,Z=w.count;for(let $=L,Q=L+Z;$<Q;$+=3)y(t.getX($+0),t.getX($+1),t.getX($+2))}const b=new U,I=new U,z=new U,F=new U;function N(X){z.fromBufferAttribute(r,X),F.copy(z);const ot=l[X];b.copy(ot),b.sub(z.multiplyScalar(z.dot(ot))).normalize(),I.crossVectors(F,ot);const L=I.dot(u[X])<0?-1:1;c.setXYZW(X,b.x,b.y,b.z,L)}for(let X=0,ot=P.length;X<ot;++X){const w=P[X],L=w.start,Z=w.count;for(let $=L,Q=L+Z;$<Q;$+=3)N(t.getX($+0)),N(t.getX($+1)),N(t.getX($+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Nn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let g=0,v=i.count;g<v;g++)i.setXYZ(g,0,0,0);const r=new U,o=new U,c=new U,l=new U,u=new U,f=new U,p=new U,m=new U;if(t)for(let g=0,v=t.count;g<v;g+=3){const M=t.getX(g+0),S=t.getX(g+1),_=t.getX(g+2);r.fromBufferAttribute(e,M),o.fromBufferAttribute(e,S),c.fromBufferAttribute(e,_),p.subVectors(c,o),m.subVectors(r,o),p.cross(m),l.fromBufferAttribute(i,M),u.fromBufferAttribute(i,S),f.fromBufferAttribute(i,_),l.add(p),u.add(p),f.add(p),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(S,u.x,u.y,u.z),i.setXYZ(_,f.x,f.y,f.z)}else for(let g=0,v=e.count;g<v;g+=3)r.fromBufferAttribute(e,g+0),o.fromBufferAttribute(e,g+1),c.fromBufferAttribute(e,g+2),p.subVectors(c,o),m.subVectors(r,o),p.cross(m),i.setXYZ(g+0,p.x,p.y,p.z),i.setXYZ(g+1,p.x,p.y,p.z),i.setXYZ(g+2,p.x,p.y,p.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(l,u){const f=l.array,p=l.itemSize,m=l.normalized,g=new f.constructor(u.length*p);let v=0,M=0;for(let S=0,_=u.length;S<_;S++){l.isInterleavedBufferAttribute?v=u[S]*l.data.stride+l.offset:v=u[S]*p;for(let y=0;y<p;y++)g[M++]=f[v++]}return new Nn(g,p,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Be,i=this.index.array,r=this.attributes;for(const l in r){const u=r[l],f=t(u,i);e.setAttribute(l,f)}const o=this.morphAttributes;for(const l in o){const u=[],f=o[l];for(let p=0,m=f.length;p<m;p++){const g=f[p],v=t(g,i);u.push(v)}e.morphAttributes[l]=u}e.morphTargetsRelative=this.morphTargetsRelative;const c=this.groups;for(let l=0,u=c.length;l<u;l++){const f=c[l];e.addGroup(f.start,f.count,f.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const u=this.parameters;for(const f in u)u[f]!==void 0&&(t[f]=u[f]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const u in i){const f=i[u];t.data.attributes[u]=f.toJSON(t.data)}const r={};let o=!1;for(const u in this.morphAttributes){const f=this.morphAttributes[u],p=[];for(let m=0,g=f.length;m<g;m++){const v=f[m];p.push(v.toJSON(t.data))}p.length>0&&(r[u]=p,o=!0)}o&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const c=this.groups;c.length>0&&(t.data.groups=JSON.parse(JSON.stringify(c)));const l=this.boundingSphere;return l!==null&&(t.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const r=t.attributes;for(const f in r){const p=r[f];this.setAttribute(f,p.clone(e))}const o=t.morphAttributes;for(const f in o){const p=[],m=o[f];for(let g=0,v=m.length;g<v;g++)p.push(m[g].clone(e));this.morphAttributes[f]=p}this.morphTargetsRelative=t.morphTargetsRelative;const c=t.groups;for(let f=0,p=c.length;f<p;f++){const m=c[f];this.addGroup(m.start,m.count,m.materialIndex)}const l=t.boundingBox;l!==null&&(this.boundingBox=l.clone());const u=t.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const eh=new Te,Pi=new Xo,Vr=new qi,nh=new U,Wr=new U,Yr=new U,qr=new U,wa=new U,Zr=new U,ih=new U,$r=new U;class Re extends He{constructor(t=new Be,e=new qu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,c=r.length;o<c;o++){const l=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,o=i.morphAttributes.position,c=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const l=this.morphTargetInfluences;if(o&&l){Zr.set(0,0,0);for(let u=0,f=o.length;u<f;u++){const p=l[u],m=o[u];p!==0&&(wa.fromBufferAttribute(m,t),c?Zr.addScaledVector(wa,p):Zr.addScaledVector(wa.sub(e),p))}e.add(Zr)}return e}raycast(t,e){const i=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Vr.copy(i.boundingSphere),Vr.applyMatrix4(o),Pi.copy(t.ray).recast(t.near),!(Vr.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(Vr,nh)===null||Pi.origin.distanceToSquared(nh)>(t.far-t.near)**2))&&(eh.copy(o).invert(),Pi.copy(t.ray).applyMatrix4(eh),!(i.boundingBox!==null&&Pi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Pi)))}_computeIntersections(t,e,i){let r;const o=this.geometry,c=this.material,l=o.index,u=o.attributes.position,f=o.attributes.uv,p=o.attributes.uv1,m=o.attributes.normal,g=o.groups,v=o.drawRange;if(l!==null)if(Array.isArray(c))for(let M=0,S=g.length;M<S;M++){const _=g[M],y=c[_.materialIndex],P=Math.max(_.start,v.start),b=Math.min(l.count,Math.min(_.start+_.count,v.start+v.count));for(let I=P,z=b;I<z;I+=3){const F=l.getX(I),N=l.getX(I+1),X=l.getX(I+2);r=Kr(this,y,t,i,f,p,m,F,N,X),r&&(r.faceIndex=Math.floor(I/3),r.face.materialIndex=_.materialIndex,e.push(r))}}else{const M=Math.max(0,v.start),S=Math.min(l.count,v.start+v.count);for(let _=M,y=S;_<y;_+=3){const P=l.getX(_),b=l.getX(_+1),I=l.getX(_+2);r=Kr(this,c,t,i,f,p,m,P,b,I),r&&(r.faceIndex=Math.floor(_/3),e.push(r))}}else if(u!==void 0)if(Array.isArray(c))for(let M=0,S=g.length;M<S;M++){const _=g[M],y=c[_.materialIndex],P=Math.max(_.start,v.start),b=Math.min(u.count,Math.min(_.start+_.count,v.start+v.count));for(let I=P,z=b;I<z;I+=3){const F=I,N=I+1,X=I+2;r=Kr(this,y,t,i,f,p,m,F,N,X),r&&(r.faceIndex=Math.floor(I/3),r.face.materialIndex=_.materialIndex,e.push(r))}}else{const M=Math.max(0,v.start),S=Math.min(u.count,v.start+v.count);for(let _=M,y=S;_<y;_+=3){const P=_,b=_+1,I=_+2;r=Kr(this,c,t,i,f,p,m,P,b,I),r&&(r.faceIndex=Math.floor(_/3),e.push(r))}}}}function $d(n,t,e,i,r,o,c,l){let u;if(t.side===nn?u=i.intersectTriangle(c,o,r,!0,l):u=i.intersectTriangle(r,o,c,t.side===Mi,l),u===null)return null;$r.copy(l),$r.applyMatrix4(n.matrixWorld);const f=e.ray.origin.distanceTo($r);return f<e.near||f>e.far?null:{distance:f,point:$r.clone(),object:n}}function Kr(n,t,e,i,r,o,c,l,u,f){n.getVertexPosition(l,Wr),n.getVertexPosition(u,Yr),n.getVertexPosition(f,qr);const p=$d(n,t,e,i,Wr,Yr,qr,ih);if(p){const m=new U;En.getBarycoord(ih,Wr,Yr,qr,m),r&&(p.uv=En.getInterpolatedAttribute(r,l,u,f,m,new Rt)),o&&(p.uv1=En.getInterpolatedAttribute(o,l,u,f,m,new Rt)),c&&(p.normal=En.getInterpolatedAttribute(c,l,u,f,m,new U),p.normal.dot(i.direction)>0&&p.normal.multiplyScalar(-1));const g={a:l,b:u,c:f,normal:new U,materialIndex:0};En.getNormal(Wr,Yr,qr,g.normal),p.face=g,p.barycoord=m}return p}class Er extends Be{constructor(t=1,e=1,i=1,r=1,o=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:o,depthSegments:c};const l=this;r=Math.floor(r),o=Math.floor(o),c=Math.floor(c);const u=[],f=[],p=[],m=[];let g=0,v=0;M("z","y","x",-1,-1,i,e,t,c,o,0),M("z","y","x",1,-1,i,e,-t,c,o,1),M("x","z","y",1,1,t,i,e,r,c,2),M("x","z","y",1,-1,t,i,-e,r,c,3),M("x","y","z",1,-1,t,e,i,r,o,4),M("x","y","z",-1,-1,t,e,-i,r,o,5),this.setIndex(u),this.setAttribute("position",new se(f,3)),this.setAttribute("normal",new se(p,3)),this.setAttribute("uv",new se(m,2));function M(S,_,y,P,b,I,z,F,N,X,ot){const w=I/N,L=z/X,Z=I/2,$=z/2,Q=F/2,st=N+1,K=X+1;let lt=0,j=0;const St=new U;for(let Mt=0;Mt<K;Mt++){const Lt=Mt*L-$;for(let fe=0;fe<st;fe++){const ne=fe*w-Z;St[S]=ne*P,St[_]=Lt*b,St[y]=Q,f.push(St.x,St.y,St.z),St[S]=0,St[_]=0,St[y]=F>0?1:-1,p.push(St.x,St.y,St.z),m.push(fe/N),m.push(1-Mt/X),lt+=1}}for(let Mt=0;Mt<X;Mt++)for(let Lt=0;Lt<N;Lt++){const fe=g+Lt+st*Mt,ne=g+Lt+st*(Mt+1),et=g+(Lt+1)+st*(Mt+1),ht=g+(Lt+1)+st*Mt;u.push(fe,ne,ht),u.push(ne,et,ht),j+=6}l.addGroup(v,j,ot),v+=j,g+=lt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Er(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Os(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function cn(n){const t={};for(let e=0;e<n.length;e++){const i=Os(n[e]);for(const r in i)t[r]=i[r]}return t}function Kd(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Ku(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ve.workingColorSpace}const mc={clone:Os,merge:cn};var Jd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ye extends Zi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jd,this.fragmentShader=jd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Os(t.uniforms),this.uniformsGroups=Kd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const c=this.uniforms[r].value;c&&c.isTexture?e.uniforms[r]={type:"t",value:c.toJSON(t).uuid}:c&&c.isColor?e.uniforms[r]={type:"c",value:c.getHex()}:c&&c.isVector2?e.uniforms[r]={type:"v2",value:c.toArray()}:c&&c.isVector3?e.uniforms[r]={type:"v3",value:c.toArray()}:c&&c.isVector4?e.uniforms[r]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?e.uniforms[r]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?e.uniforms[r]={type:"m4",value:c.toArray()}:e.uniforms[r]={value:c}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Ju extends He{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Te,this.projectionMatrix=new Te,this.projectionMatrixInverse=new Te,this.coordinateSystem=oi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const gi=new U,sh=new Rt,rh=new Rt;class Mn extends Ju{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=mr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ar*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return mr*2*Math.atan(Math.tan(ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(gi.x,gi.y).multiplyScalar(-t/gi.z),gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(gi.x,gi.y).multiplyScalar(-t/gi.z)}getViewSize(t,e){return this.getViewBounds(t,sh,rh),e.subVectors(rh,sh)}setViewOffset(t,e,i,r,o,c){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ar*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,o=-.5*r;const c=this.view;if(this.view!==null&&this.view.enabled){const u=c.fullWidth,f=c.fullHeight;o+=c.offsetX*r/u,e-=c.offsetY*i/f,r*=c.width/u,i*=c.height/f}const l=this.filmOffset;l!==0&&(o+=t*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const us=-90,fs=1;class Qd extends He{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Mn(us,fs,t,e);r.layers=this.layers,this.add(r);const o=new Mn(us,fs,t,e);o.layers=this.layers,this.add(o);const c=new Mn(us,fs,t,e);c.layers=this.layers,this.add(c);const l=new Mn(us,fs,t,e);l.layers=this.layers,this.add(l);const u=new Mn(us,fs,t,e);u.layers=this.layers,this.add(u);const f=new Mn(us,fs,t,e);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,o,c,l,u]=e;for(const f of e)this.remove(f);if(t===oi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(t===Lo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const f of e)this.add(f),f.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,c,l,u,f,p]=this.children,m=t.getRenderTarget(),g=t.getActiveCubeFace(),v=t.getActiveMipmapLevel(),M=t.xr.enabled;t.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,o),t.setRenderTarget(i,1,r),t.render(e,c),t.setRenderTarget(i,2,r),t.render(e,l),t.setRenderTarget(i,3,r),t.render(e,u),t.setRenderTarget(i,4,r),t.render(e,f),i.texture.generateMipmaps=S,t.setRenderTarget(i,5,r),t.render(e,p),t.setRenderTarget(m,g,v),t.xr.enabled=M,i.texture.needsPMREMUpdate=!0}}class ju extends hn{constructor(t,e,i,r,o,c,l,u,f,p){t=t!==void 0?t:[],e=e!==void 0?e:Rs,super(t,e,i,r,o,c,l,u,f,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class tp extends Vi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new ju(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:In}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Er(5,5,5),o=new Ye({name:"CubemapFromEquirect",uniforms:Os(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:nn,blending:xi});o.uniforms.tEquirect.value=e;const c=new Re(r,o),l=e.minFilter;return e.minFilter===Hi&&(e.minFilter=In),new Qd(1,10,this).update(t,c),e.minFilter=l,c.geometry.dispose(),c.material.dispose(),this}clear(t,e,i,r){const o=t.getRenderTarget();for(let c=0;c<6;c++)t.setRenderTarget(this,c),t.clear(e,i,r);t.setRenderTarget(o)}}const ba=new U,ep=new U,np=new jt;class si{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=ba.subVectors(i,e).cross(ep.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(ba),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||np.getNormalMatrix(t),r=this.coplanarPoint(ba).applyMatrix4(t),o=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ci=new qi,Jr=new U;class gc{constructor(t=new si,e=new si,i=new si,r=new si,o=new si,c=new si){this.planes=[t,e,i,r,o,c]}set(t,e,i,r,o,c){const l=this.planes;return l[0].copy(t),l[1].copy(e),l[2].copy(i),l[3].copy(r),l[4].copy(o),l[5].copy(c),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=oi){const i=this.planes,r=t.elements,o=r[0],c=r[1],l=r[2],u=r[3],f=r[4],p=r[5],m=r[6],g=r[7],v=r[8],M=r[9],S=r[10],_=r[11],y=r[12],P=r[13],b=r[14],I=r[15];if(i[0].setComponents(u-o,g-f,_-v,I-y).normalize(),i[1].setComponents(u+o,g+f,_+v,I+y).normalize(),i[2].setComponents(u+c,g+p,_+M,I+P).normalize(),i[3].setComponents(u-c,g-p,_-M,I-P).normalize(),i[4].setComponents(u-l,g-m,_-S,I-b).normalize(),e===oi)i[5].setComponents(u+l,g+m,_+S,I+b).normalize();else if(e===Lo)i[5].setComponents(l,m,S,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(t){return Ci.center.set(0,0,0),Ci.radius=.7071067811865476,Ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(Jr.x=r.normal.x>0?t.max.x:t.min.x,Jr.y=r.normal.y>0?t.max.y:t.min.y,Jr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Jr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Qu(){let n=null,t=!1,e=null,i=null;function r(o,c){e(o,c),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){n=o}}}function ip(n){const t=new WeakMap;function e(l,u){const f=l.array,p=l.usage,m=f.byteLength,g=n.createBuffer();n.bindBuffer(u,g),n.bufferData(u,f,p),l.onUploadCallback();let v;if(f instanceof Float32Array)v=n.FLOAT;else if(f instanceof Uint16Array)l.isFloat16BufferAttribute?v=n.HALF_FLOAT:v=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)v=n.SHORT;else if(f instanceof Uint32Array)v=n.UNSIGNED_INT;else if(f instanceof Int32Array)v=n.INT;else if(f instanceof Int8Array)v=n.BYTE;else if(f instanceof Uint8Array)v=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)v=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:g,type:v,bytesPerElement:f.BYTES_PER_ELEMENT,version:l.version,size:m}}function i(l,u,f){const p=u.array,m=u.updateRanges;if(n.bindBuffer(f,l),m.length===0)n.bufferSubData(f,0,p);else{m.sort((v,M)=>v.start-M.start);let g=0;for(let v=1;v<m.length;v++){const M=m[g],S=m[v];S.start<=M.start+M.count+1?M.count=Math.max(M.count,S.start+S.count-M.start):(++g,m[g]=S)}m.length=g+1;for(let v=0,M=m.length;v<M;v++){const S=m[v];n.bufferSubData(f,S.start*p.BYTES_PER_ELEMENT,p,S.start,S.count)}u.clearUpdateRanges()}u.onUploadCallback()}function r(l){return l.isInterleavedBufferAttribute&&(l=l.data),t.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=t.get(l);u&&(n.deleteBuffer(u.buffer),t.delete(l))}function c(l,u){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const p=t.get(l);(!p||p.version<l.version)&&t.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const f=t.get(l);if(f===void 0)t.set(l,e(l,u));else if(f.version<l.version){if(f.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(f.buffer,l,u),f.version=l.version}}return{get:r,remove:o,update:c}}class Vo extends Be{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const o=t/2,c=e/2,l=Math.floor(i),u=Math.floor(r),f=l+1,p=u+1,m=t/l,g=e/u,v=[],M=[],S=[],_=[];for(let y=0;y<p;y++){const P=y*g-c;for(let b=0;b<f;b++){const I=b*m-o;M.push(I,-P,0),S.push(0,0,1),_.push(b/l),_.push(1-y/u)}}for(let y=0;y<u;y++)for(let P=0;P<l;P++){const b=P+f*y,I=P+f*(y+1),z=P+1+f*(y+1),F=P+1+f*y;v.push(b,I,F),v.push(I,z,F)}this.setIndex(v),this.setAttribute("position",new se(M,3)),this.setAttribute("normal",new se(S,3)),this.setAttribute("uv",new se(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vo(t.width,t.height,t.widthSegments,t.heightSegments)}}var sp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,op=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ap=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,up=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,dp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,vp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_p=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,yp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Mp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ep=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,wp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Tp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ap=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Pp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Cp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ip=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Dp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Np="gl_FragColor = linearToOutputTexel( gl_FragColor );",Up=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Op=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Fp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Bp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,kp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Hp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$p=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Kp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Jp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,tm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,em=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,nm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,im=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,sm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,rm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,om=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,am=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,um=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_m=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ym=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Mm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Em=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Tm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Am=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Pm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Im=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Dm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Nm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Um=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Om=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,km=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,zm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Hm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Gm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Xm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ym=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$m=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Km=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,jm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,t1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,e1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,n1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const i1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,s1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,o1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,l1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,h1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,u1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,f1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,d1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,p1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,g1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,v1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,y1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,M1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,w1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,b1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,T1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,P1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,R1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,D1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,U1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,O1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Jt={alphahash_fragment:sp,alphahash_pars_fragment:rp,alphamap_fragment:op,alphamap_pars_fragment:ap,alphatest_fragment:lp,alphatest_pars_fragment:cp,aomap_fragment:hp,aomap_pars_fragment:up,batching_pars_vertex:fp,batching_vertex:dp,begin_vertex:pp,beginnormal_vertex:mp,bsdfs:gp,iridescence_fragment:vp,bumpmap_pars_fragment:_p,clipping_planes_fragment:xp,clipping_planes_pars_fragment:yp,clipping_planes_pars_vertex:Sp,clipping_planes_vertex:Mp,color_fragment:Ep,color_pars_fragment:wp,color_pars_vertex:bp,color_vertex:Tp,common:Ap,cube_uv_reflection_fragment:Pp,defaultnormal_vertex:Cp,displacementmap_pars_vertex:Ip,displacementmap_vertex:Lp,emissivemap_fragment:Rp,emissivemap_pars_fragment:Dp,colorspace_fragment:Np,colorspace_pars_fragment:Up,envmap_fragment:Op,envmap_common_pars_fragment:Fp,envmap_pars_fragment:Bp,envmap_pars_vertex:kp,envmap_physical_pars_fragment:Kp,envmap_vertex:zp,fog_vertex:Hp,fog_pars_vertex:Gp,fog_fragment:Xp,fog_pars_fragment:Vp,gradientmap_pars_fragment:Wp,lightmap_pars_fragment:Yp,lights_lambert_fragment:qp,lights_lambert_pars_fragment:Zp,lights_pars_begin:$p,lights_toon_fragment:Jp,lights_toon_pars_fragment:jp,lights_phong_fragment:Qp,lights_phong_pars_fragment:tm,lights_physical_fragment:em,lights_physical_pars_fragment:nm,lights_fragment_begin:im,lights_fragment_maps:sm,lights_fragment_end:rm,logdepthbuf_fragment:om,logdepthbuf_pars_fragment:am,logdepthbuf_pars_vertex:lm,logdepthbuf_vertex:cm,map_fragment:hm,map_pars_fragment:um,map_particle_fragment:fm,map_particle_pars_fragment:dm,metalnessmap_fragment:pm,metalnessmap_pars_fragment:mm,morphinstance_vertex:gm,morphcolor_vertex:vm,morphnormal_vertex:_m,morphtarget_pars_vertex:xm,morphtarget_vertex:ym,normal_fragment_begin:Sm,normal_fragment_maps:Mm,normal_pars_fragment:Em,normal_pars_vertex:wm,normal_vertex:bm,normalmap_pars_fragment:Tm,clearcoat_normal_fragment_begin:Am,clearcoat_normal_fragment_maps:Pm,clearcoat_pars_fragment:Cm,iridescence_pars_fragment:Im,opaque_fragment:Lm,packing:Rm,premultiplied_alpha_fragment:Dm,project_vertex:Nm,dithering_fragment:Um,dithering_pars_fragment:Om,roughnessmap_fragment:Fm,roughnessmap_pars_fragment:Bm,shadowmap_pars_fragment:km,shadowmap_pars_vertex:zm,shadowmap_vertex:Hm,shadowmask_pars_fragment:Gm,skinbase_vertex:Xm,skinning_pars_vertex:Vm,skinning_vertex:Wm,skinnormal_vertex:Ym,specularmap_fragment:qm,specularmap_pars_fragment:Zm,tonemapping_fragment:$m,tonemapping_pars_fragment:Km,transmission_fragment:Jm,transmission_pars_fragment:jm,uv_pars_fragment:Qm,uv_pars_vertex:t1,uv_vertex:e1,worldpos_vertex:n1,background_vert:i1,background_frag:s1,backgroundCube_vert:r1,backgroundCube_frag:o1,cube_vert:a1,cube_frag:l1,depth_vert:c1,depth_frag:h1,distanceRGBA_vert:u1,distanceRGBA_frag:f1,equirect_vert:d1,equirect_frag:p1,linedashed_vert:m1,linedashed_frag:g1,meshbasic_vert:v1,meshbasic_frag:_1,meshlambert_vert:x1,meshlambert_frag:y1,meshmatcap_vert:S1,meshmatcap_frag:M1,meshnormal_vert:E1,meshnormal_frag:w1,meshphong_vert:b1,meshphong_frag:T1,meshphysical_vert:A1,meshphysical_frag:P1,meshtoon_vert:C1,meshtoon_frag:I1,points_vert:L1,points_frag:R1,shadow_vert:D1,shadow_frag:N1,sprite_vert:U1,sprite_frag:O1},dt={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},envMapRotation:{value:new jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new Rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new Rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},dn={basic:{uniforms:cn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:cn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:cn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:cn([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:cn([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:cn([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:cn([dt.points,dt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:cn([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:cn([dt.common,dt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:cn([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:cn([dt.sprite,dt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new jt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:cn([dt.common,dt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:cn([dt.lights,dt.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};dn.physical={uniforms:cn([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new Rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new Rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new Rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};const jr={r:0,b:0,g:0},Ii=new Zn,F1=new Te;function B1(n,t,e,i,r,o,c){const l=new kt(0);let u=o===!0?0:1,f,p,m=null,g=0,v=null;function M(P){let b=P.isScene===!0?P.background:null;return b&&b.isTexture&&(b=(P.backgroundBlurriness>0?e:t).get(b)),b}function S(P){let b=!1;const I=M(P);I===null?y(l,u):I&&I.isColor&&(y(I,1),b=!0);const z=n.xr.getEnvironmentBlendMode();z==="additive"?i.buffers.color.setClear(0,0,0,1,c):z==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(n.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(P,b){const I=M(b);I&&(I.isCubeTexture||I.mapping===Ho)?(p===void 0&&(p=new Re(new Er(1,1,1),new Ye({name:"BackgroundCubeMaterial",uniforms:Os(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(z,F,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(p)),Ii.copy(b.backgroundRotation),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,I.isCubeTexture&&I.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),p.material.uniforms.envMap.value=I,p.material.uniforms.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,p.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(F1.makeRotationFromEuler(Ii)),p.material.toneMapped=ve.getTransfer(I.colorSpace)!==Pe,(m!==I||g!==I.version||v!==n.toneMapping)&&(p.material.needsUpdate=!0,m=I,g=I.version,v=n.toneMapping),p.layers.enableAll(),P.unshift(p,p.geometry,p.material,0,0,null)):I&&I.isTexture&&(f===void 0&&(f=new Re(new Vo(2,2),new Ye({name:"BackgroundMaterial",uniforms:Os(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(f)),f.material.uniforms.t2D.value=I,f.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,f.material.toneMapped=ve.getTransfer(I.colorSpace)!==Pe,I.matrixAutoUpdate===!0&&I.updateMatrix(),f.material.uniforms.uvTransform.value.copy(I.matrix),(m!==I||g!==I.version||v!==n.toneMapping)&&(f.material.needsUpdate=!0,m=I,g=I.version,v=n.toneMapping),f.layers.enableAll(),P.unshift(f,f.geometry,f.material,0,0,null))}function y(P,b){P.getRGB(jr,Ku(n)),i.buffers.color.setClear(jr.r,jr.g,jr.b,b,c)}return{getClearColor:function(){return l},setClearColor:function(P,b=1){l.set(P),u=b,y(l,u)},getClearAlpha:function(){return u},setClearAlpha:function(P){u=P,y(l,u)},render:S,addToRenderList:_}}function k1(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=g(null);let o=r,c=!1;function l(w,L,Z,$,Q){let st=!1;const K=m($,Z,L);o!==K&&(o=K,f(o.object)),st=v(w,$,Z,Q),st&&M(w,$,Z,Q),Q!==null&&t.update(Q,n.ELEMENT_ARRAY_BUFFER),(st||c)&&(c=!1,I(w,L,Z,$),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Q).buffer))}function u(){return n.createVertexArray()}function f(w){return n.bindVertexArray(w)}function p(w){return n.deleteVertexArray(w)}function m(w,L,Z){const $=Z.wireframe===!0;let Q=i[w.id];Q===void 0&&(Q={},i[w.id]=Q);let st=Q[L.id];st===void 0&&(st={},Q[L.id]=st);let K=st[$];return K===void 0&&(K=g(u()),st[$]=K),K}function g(w){const L=[],Z=[],$=[];for(let Q=0;Q<e;Q++)L[Q]=0,Z[Q]=0,$[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:Z,attributeDivisors:$,object:w,attributes:{},index:null}}function v(w,L,Z,$){const Q=o.attributes,st=L.attributes;let K=0;const lt=Z.getAttributes();for(const j in lt)if(lt[j].location>=0){const Mt=Q[j];let Lt=st[j];if(Lt===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(Lt=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(Lt=w.instanceColor)),Mt===void 0||Mt.attribute!==Lt||Lt&&Mt.data!==Lt.data)return!0;K++}return o.attributesNum!==K||o.index!==$}function M(w,L,Z,$){const Q={},st=L.attributes;let K=0;const lt=Z.getAttributes();for(const j in lt)if(lt[j].location>=0){let Mt=st[j];Mt===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(Mt=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(Mt=w.instanceColor));const Lt={};Lt.attribute=Mt,Mt&&Mt.data&&(Lt.data=Mt.data),Q[j]=Lt,K++}o.attributes=Q,o.attributesNum=K,o.index=$}function S(){const w=o.newAttributes;for(let L=0,Z=w.length;L<Z;L++)w[L]=0}function _(w){y(w,0)}function y(w,L){const Z=o.newAttributes,$=o.enabledAttributes,Q=o.attributeDivisors;Z[w]=1,$[w]===0&&(n.enableVertexAttribArray(w),$[w]=1),Q[w]!==L&&(n.vertexAttribDivisor(w,L),Q[w]=L)}function P(){const w=o.newAttributes,L=o.enabledAttributes;for(let Z=0,$=L.length;Z<$;Z++)L[Z]!==w[Z]&&(n.disableVertexAttribArray(Z),L[Z]=0)}function b(w,L,Z,$,Q,st,K){K===!0?n.vertexAttribIPointer(w,L,Z,Q,st):n.vertexAttribPointer(w,L,Z,$,Q,st)}function I(w,L,Z,$){S();const Q=$.attributes,st=Z.getAttributes(),K=L.defaultAttributeValues;for(const lt in st){const j=st[lt];if(j.location>=0){let St=Q[lt];if(St===void 0&&(lt==="instanceMatrix"&&w.instanceMatrix&&(St=w.instanceMatrix),lt==="instanceColor"&&w.instanceColor&&(St=w.instanceColor)),St!==void 0){const Mt=St.normalized,Lt=St.itemSize,fe=t.get(St);if(fe===void 0)continue;const ne=fe.buffer,et=fe.type,ht=fe.bytesPerElement,Pt=et===n.INT||et===n.UNSIGNED_INT||St.gpuType===oc;if(St.isInterleavedBufferAttribute){const Et=St.data,Zt=Et.stride,Ht=St.offset;if(Et.isInstancedInterleavedBuffer){for(let Kt=0;Kt<j.locationSize;Kt++)y(j.location+Kt,Et.meshPerAttribute);w.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Et.meshPerAttribute*Et.count)}else for(let Kt=0;Kt<j.locationSize;Kt++)_(j.location+Kt);n.bindBuffer(n.ARRAY_BUFFER,ne);for(let Kt=0;Kt<j.locationSize;Kt++)b(j.location+Kt,Lt/j.locationSize,et,Mt,Zt*ht,(Ht+Lt/j.locationSize*Kt)*ht,Pt)}else{if(St.isInstancedBufferAttribute){for(let Et=0;Et<j.locationSize;Et++)y(j.location+Et,St.meshPerAttribute);w.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let Et=0;Et<j.locationSize;Et++)_(j.location+Et);n.bindBuffer(n.ARRAY_BUFFER,ne);for(let Et=0;Et<j.locationSize;Et++)b(j.location+Et,Lt/j.locationSize,et,Mt,Lt*ht,Lt/j.locationSize*Et*ht,Pt)}}else if(K!==void 0){const Mt=K[lt];if(Mt!==void 0)switch(Mt.length){case 2:n.vertexAttrib2fv(j.location,Mt);break;case 3:n.vertexAttrib3fv(j.location,Mt);break;case 4:n.vertexAttrib4fv(j.location,Mt);break;default:n.vertexAttrib1fv(j.location,Mt)}}}}P()}function z(){X();for(const w in i){const L=i[w];for(const Z in L){const $=L[Z];for(const Q in $)p($[Q].object),delete $[Q];delete L[Z]}delete i[w]}}function F(w){if(i[w.id]===void 0)return;const L=i[w.id];for(const Z in L){const $=L[Z];for(const Q in $)p($[Q].object),delete $[Q];delete L[Z]}delete i[w.id]}function N(w){for(const L in i){const Z=i[L];if(Z[w.id]===void 0)continue;const $=Z[w.id];for(const Q in $)p($[Q].object),delete $[Q];delete Z[w.id]}}function X(){ot(),c=!0,o!==r&&(o=r,f(o.object))}function ot(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:l,reset:X,resetDefaultState:ot,dispose:z,releaseStatesOfGeometry:F,releaseStatesOfProgram:N,initAttributes:S,enableAttribute:_,disableUnusedAttributes:P}}function z1(n,t,e){let i;function r(f){i=f}function o(f,p){n.drawArrays(i,f,p),e.update(p,i,1)}function c(f,p,m){m!==0&&(n.drawArraysInstanced(i,f,p,m),e.update(p,i,m))}function l(f,p,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,f,0,p,0,m);let v=0;for(let M=0;M<m;M++)v+=p[M];e.update(v,i,1)}function u(f,p,m,g){if(m===0)return;const v=t.get("WEBGL_multi_draw");if(v===null)for(let M=0;M<f.length;M++)c(f[M],p[M],g[M]);else{v.multiDrawArraysInstancedWEBGL(i,f,0,p,0,g,0,m);let M=0;for(let S=0;S<m;S++)M+=p[S];for(let S=0;S<g.length;S++)e.update(M,i,g[S])}}this.setMode=r,this.render=o,this.renderInstances=c,this.renderMultiDraw=l,this.renderMultiDrawInstances=u}function H1(n,t,e,i){let r;function o(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const N=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function c(N){return!(N!==Rn&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(N){const X=N===Mr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(N!==ci&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==ri&&!X)}function u(N){if(N==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let f=e.precision!==void 0?e.precision:"highp";const p=u(f);p!==f&&(console.warn("THREE.WebGLRenderer:",f,"not supported, using",p,"instead."),f=p);const m=e.logarithmicDepthBuffer===!0,g=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(g===!0){const N=t.get("EXT_clip_control");N.clipControlEXT(N.LOWER_LEFT_EXT,N.ZERO_TO_ONE_EXT)}const v=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),y=n.getParameter(n.MAX_VERTEX_ATTRIBS),P=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),I=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),z=M>0,F=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:u,textureFormatReadable:c,textureTypeReadable:l,precision:f,logarithmicDepthBuffer:m,reverseDepthBuffer:g,maxTextures:v,maxVertexTextures:M,maxTextureSize:S,maxCubemapSize:_,maxAttributes:y,maxVertexUniforms:P,maxVaryings:b,maxFragmentUniforms:I,vertexTextures:z,maxSamples:F}}function G1(n){const t=this;let e=null,i=0,r=!1,o=!1;const c=new si,l=new jt,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(m,g){const v=m.length!==0||g||i!==0||r;return r=g,i=m.length,v},this.beginShadows=function(){o=!0,p(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(m,g){e=p(m,g,0)},this.setState=function(m,g,v){const M=m.clippingPlanes,S=m.clipIntersection,_=m.clipShadows,y=n.get(m);if(!r||M===null||M.length===0||o&&!_)o?p(null):f();else{const P=o?0:i,b=P*4;let I=y.clippingState||null;u.value=I,I=p(M,g,b,v);for(let z=0;z!==b;++z)I[z]=e[z];y.clippingState=I,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=P}};function f(){u.value!==e&&(u.value=e,u.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function p(m,g,v,M){const S=m!==null?m.length:0;let _=null;if(S!==0){if(_=u.value,M!==!0||_===null){const y=v+S*4,P=g.matrixWorldInverse;l.getNormalMatrix(P),(_===null||_.length<y)&&(_=new Float32Array(y));for(let b=0,I=v;b!==S;++b,I+=4)c.copy(m[b]).applyMatrix4(P,l),c.normal.toArray(_,I),_[I+3]=c.constant}u.value=_,u.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,_}}function X1(n){let t=new WeakMap;function e(c,l){return l===hl?c.mapping=Rs:l===ul&&(c.mapping=Ds),c}function i(c){if(c&&c.isTexture){const l=c.mapping;if(l===hl||l===ul)if(t.has(c)){const u=t.get(c).texture;return e(u,c.mapping)}else{const u=c.image;if(u&&u.height>0){const f=new tp(u.height);return f.fromEquirectangularTexture(n,c),t.set(c,f),c.addEventListener("dispose",r),e(f.texture,c.mapping)}else return null}}return c}function r(c){const l=c.target;l.removeEventListener("dispose",r);const u=t.get(l);u!==void 0&&(t.delete(l),u.dispose())}function o(){t=new WeakMap}return{get:i,dispose:o}}class t0 extends Ju{constructor(t=-1,e=1,i=1,r=-1,o=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=o,this.far=c,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,o,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let o=i-t,c=i+t,l=r+e,u=r-e;if(this.view!==null&&this.view.enabled){const f=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=f*this.view.offsetX,c=o+f*this.view.width,l-=p*this.view.offsetY,u=l-p*this.view.height}this.projectionMatrix.makeOrthographic(o,c,l,u,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ss=4,oh=[.125,.215,.35,.446,.526,.582],Fi=20,Ta=new t0,ah=new kt;let Aa=null,Pa=0,Ca=0,Ia=!1;const Di=(1+Math.sqrt(5))/2,ds=1/Di,lh=[new U(-Di,ds,0),new U(Di,ds,0),new U(-ds,0,Di),new U(ds,0,Di),new U(0,Di,-ds),new U(0,Di,ds),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class ch{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100){Aa=this._renderer.getRenderTarget(),Pa=this._renderer.getActiveCubeFace(),Ca=this._renderer.getActiveMipmapLevel(),Ia=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,i,r,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Aa,Pa,Ca),this._renderer.xr.enabled=Ia,t.scissorTest=!1,Qr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Rs||t.mapping===Ds?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Aa=this._renderer.getRenderTarget(),Pa=this._renderer.getActiveCubeFace(),Ca=this._renderer.getActiveMipmapLevel(),Ia=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:In,minFilter:In,generateMipmaps:!1,type:Mr,format:Rn,colorSpace:Ei,depthBuffer:!1},r=hh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hh(t,e,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=V1(o)),this._blurMaterial=W1(o,t,e)}return r}_compileMaterial(t){const e=new Re(this._lodPlanes[0],t);this._renderer.compile(e,Ta)}_sceneToCubeUV(t,e,i,r){const l=new Mn(90,1,e,i),u=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],p=this._renderer,m=p.autoClear,g=p.toneMapping;p.getClearColor(ah),p.toneMapping=yi,p.autoClear=!1;const v=new qu({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1}),M=new Re(new Er,v);let S=!1;const _=t.background;_?_.isColor&&(v.color.copy(_),t.background=null,S=!0):(v.color.copy(ah),S=!0);for(let y=0;y<6;y++){const P=y%3;P===0?(l.up.set(0,u[y],0),l.lookAt(f[y],0,0)):P===1?(l.up.set(0,0,u[y]),l.lookAt(0,f[y],0)):(l.up.set(0,u[y],0),l.lookAt(0,0,f[y]));const b=this._cubeSize;Qr(r,P*b,y>2?b:0,b,b),p.setRenderTarget(r),S&&p.render(M,l),p.render(t,l)}M.geometry.dispose(),M.material.dispose(),p.toneMapping=g,p.autoClear=m,t.background=_}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===Rs||t.mapping===Ds;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=fh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uh());const o=r?this._cubemapMaterial:this._equirectMaterial,c=new Re(this._lodPlanes[0],o),l=o.uniforms;l.envMap.value=t;const u=this._cubeSize;Qr(e,0,0,3*u,2*u),i.setRenderTarget(e),i.render(c,Ta)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let o=1;o<r;o++){const c=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),l=lh[(r-o-1)%lh.length];this._blur(t,o-1,o,c,l)}e.autoClear=i}_blur(t,e,i,r,o){const c=this._pingPongRenderTarget;this._halfBlur(t,c,e,i,r,"latitudinal",o),this._halfBlur(c,t,i,i,r,"longitudinal",o)}_halfBlur(t,e,i,r,o,c,l){const u=this._renderer,f=this._blurMaterial;c!=="latitudinal"&&c!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const p=3,m=new Re(this._lodPlanes[r],f),g=f.uniforms,v=this._sizeLods[i]-1,M=isFinite(o)?Math.PI/(2*v):2*Math.PI/(2*Fi-1),S=o/M,_=isFinite(o)?1+Math.floor(p*S):Fi;_>Fi&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Fi}`);const y=[];let P=0;for(let N=0;N<Fi;++N){const X=N/S,ot=Math.exp(-X*X/2);y.push(ot),N===0?P+=ot:N<_&&(P+=2*ot)}for(let N=0;N<y.length;N++)y[N]=y[N]/P;g.envMap.value=t.texture,g.samples.value=_,g.weights.value=y,g.latitudinal.value=c==="latitudinal",l&&(g.poleAxis.value=l);const{_lodMax:b}=this;g.dTheta.value=M,g.mipInt.value=b-i;const I=this._sizeLods[r],z=3*I*(r>b-Ss?r-b+Ss:0),F=4*(this._cubeSize-I);Qr(e,z,F,3*I,2*I),u.setRenderTarget(e),u.render(m,Ta)}}function V1(n){const t=[],e=[],i=[];let r=n;const o=n-Ss+1+oh.length;for(let c=0;c<o;c++){const l=Math.pow(2,r);e.push(l);let u=1/l;c>n-Ss?u=oh[c-n+Ss-1]:c===0&&(u=0),i.push(u);const f=1/(l-2),p=-f,m=1+f,g=[p,p,m,p,m,m,p,p,m,m,p,m],v=6,M=6,S=3,_=2,y=1,P=new Float32Array(S*M*v),b=new Float32Array(_*M*v),I=new Float32Array(y*M*v);for(let F=0;F<v;F++){const N=F%3*2/3-1,X=F>2?0:-1,ot=[N,X,0,N+2/3,X,0,N+2/3,X+1,0,N,X,0,N+2/3,X+1,0,N,X+1,0];P.set(ot,S*M*F),b.set(g,_*M*F);const w=[F,F,F,F,F,F];I.set(w,y*M*F)}const z=new Be;z.setAttribute("position",new Nn(P,S)),z.setAttribute("uv",new Nn(b,_)),z.setAttribute("faceIndex",new Nn(I,y)),t.push(z),r>Ss&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function hh(n,t,e){const i=new Vi(n,t,e);return i.texture.mapping=Ho,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Qr(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function W1(n,t,e){const i=new Float32Array(Fi),r=new U(0,1,0);return new Ye({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function uh(){return new Ye({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function fh(){return new Ye({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function vc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Y1(n){let t=new WeakMap,e=null;function i(l){if(l&&l.isTexture){const u=l.mapping,f=u===hl||u===ul,p=u===Rs||u===Ds;if(f||p){let m=t.get(l);const g=m!==void 0?m.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==g)return e===null&&(e=new ch(n)),m=f?e.fromEquirectangular(l,m):e.fromCubemap(l,m),m.texture.pmremVersion=l.pmremVersion,t.set(l,m),m.texture;if(m!==void 0)return m.texture;{const v=l.image;return f&&v&&v.height>0||p&&v&&r(v)?(e===null&&(e=new ch(n)),m=f?e.fromEquirectangular(l):e.fromCubemap(l),m.texture.pmremVersion=l.pmremVersion,t.set(l,m),l.addEventListener("dispose",o),m.texture):null}}}return l}function r(l){let u=0;const f=6;for(let p=0;p<f;p++)l[p]!==void 0&&u++;return u===f}function o(l){const u=l.target;u.removeEventListener("dispose",o);const f=t.get(u);f!==void 0&&(t.delete(u),f.dispose())}function c(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:c}}function q1(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&Mo("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Z1(n,t,e,i){const r={},o=new WeakMap;function c(m){const g=m.target;g.index!==null&&t.remove(g.index);for(const M in g.attributes)t.remove(g.attributes[M]);for(const M in g.morphAttributes){const S=g.morphAttributes[M];for(let _=0,y=S.length;_<y;_++)t.remove(S[_])}g.removeEventListener("dispose",c),delete r[g.id];const v=o.get(g);v&&(t.remove(v),o.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,e.memory.geometries--}function l(m,g){return r[g.id]===!0||(g.addEventListener("dispose",c),r[g.id]=!0,e.memory.geometries++),g}function u(m){const g=m.attributes;for(const M in g)t.update(g[M],n.ARRAY_BUFFER);const v=m.morphAttributes;for(const M in v){const S=v[M];for(let _=0,y=S.length;_<y;_++)t.update(S[_],n.ARRAY_BUFFER)}}function f(m){const g=[],v=m.index,M=m.attributes.position;let S=0;if(v!==null){const P=v.array;S=v.version;for(let b=0,I=P.length;b<I;b+=3){const z=P[b+0],F=P[b+1],N=P[b+2];g.push(z,F,F,N,N,z)}}else if(M!==void 0){const P=M.array;S=M.version;for(let b=0,I=P.length/3-1;b<I;b+=3){const z=b+0,F=b+1,N=b+2;g.push(z,F,F,N,N,z)}}else return;const _=new(Xu(g)?$u:Zu)(g,1);_.version=S;const y=o.get(m);y&&t.remove(y),o.set(m,_)}function p(m){const g=o.get(m);if(g){const v=m.index;v!==null&&g.version<v.version&&f(m)}else f(m);return o.get(m)}return{get:l,update:u,getWireframeAttribute:p}}function $1(n,t,e){let i;function r(g){i=g}let o,c;function l(g){o=g.type,c=g.bytesPerElement}function u(g,v){n.drawElements(i,v,o,g*c),e.update(v,i,1)}function f(g,v,M){M!==0&&(n.drawElementsInstanced(i,v,o,g*c,M),e.update(v,i,M))}function p(g,v,M){if(M===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,v,0,o,g,0,M);let _=0;for(let y=0;y<M;y++)_+=v[y];e.update(_,i,1)}function m(g,v,M,S){if(M===0)return;const _=t.get("WEBGL_multi_draw");if(_===null)for(let y=0;y<g.length;y++)f(g[y]/c,v[y],S[y]);else{_.multiDrawElementsInstancedWEBGL(i,v,0,o,g,0,S,0,M);let y=0;for(let P=0;P<M;P++)y+=v[P];for(let P=0;P<S.length;P++)e.update(y,i,S[P])}}this.setMode=r,this.setIndex=l,this.render=u,this.renderInstances=f,this.renderMultiDraw=p,this.renderMultiDrawInstances=m}function K1(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,c,l){switch(e.calls++,c){case n.TRIANGLES:e.triangles+=l*(o/3);break;case n.LINES:e.lines+=l*(o/2);break;case n.LINE_STRIP:e.lines+=l*(o-1);break;case n.LINE_LOOP:e.lines+=l*o;break;case n.POINTS:e.points+=l*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",c);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function J1(n,t,e){const i=new WeakMap,r=new oe;function o(c,l,u){const f=c.morphTargetInfluences,p=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,m=p!==void 0?p.length:0;let g=i.get(l);if(g===void 0||g.count!==m){let w=function(){X.dispose(),i.delete(l),l.removeEventListener("dispose",w)};var v=w;g!==void 0&&g.texture.dispose();const M=l.morphAttributes.position!==void 0,S=l.morphAttributes.normal!==void 0,_=l.morphAttributes.color!==void 0,y=l.morphAttributes.position||[],P=l.morphAttributes.normal||[],b=l.morphAttributes.color||[];let I=0;M===!0&&(I=1),S===!0&&(I=2),_===!0&&(I=3);let z=l.attributes.position.count*I,F=1;z>t.maxTextureSize&&(F=Math.ceil(z/t.maxTextureSize),z=t.maxTextureSize);const N=new Float32Array(z*F*4*m),X=new Wu(N,z,F,m);X.type=ri,X.needsUpdate=!0;const ot=I*4;for(let L=0;L<m;L++){const Z=y[L],$=P[L],Q=b[L],st=z*F*4*L;for(let K=0;K<Z.count;K++){const lt=K*ot;M===!0&&(r.fromBufferAttribute(Z,K),N[st+lt+0]=r.x,N[st+lt+1]=r.y,N[st+lt+2]=r.z,N[st+lt+3]=0),S===!0&&(r.fromBufferAttribute($,K),N[st+lt+4]=r.x,N[st+lt+5]=r.y,N[st+lt+6]=r.z,N[st+lt+7]=0),_===!0&&(r.fromBufferAttribute(Q,K),N[st+lt+8]=r.x,N[st+lt+9]=r.y,N[st+lt+10]=r.z,N[st+lt+11]=Q.itemSize===4?r.w:1)}}g={count:m,texture:X,size:new Rt(z,F)},i.set(l,g),l.addEventListener("dispose",w)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)u.getUniforms().setValue(n,"morphTexture",c.morphTexture,e);else{let M=0;for(let _=0;_<f.length;_++)M+=f[_];const S=l.morphTargetsRelative?1:1-M;u.getUniforms().setValue(n,"morphTargetBaseInfluence",S),u.getUniforms().setValue(n,"morphTargetInfluences",f)}u.getUniforms().setValue(n,"morphTargetsTexture",g.texture,e),u.getUniforms().setValue(n,"morphTargetsTextureSize",g.size)}return{update:o}}function j1(n,t,e,i){let r=new WeakMap;function o(u){const f=i.render.frame,p=u.geometry,m=t.get(u,p);if(r.get(m)!==f&&(t.update(m),r.set(m,f)),u.isInstancedMesh&&(u.hasEventListener("dispose",l)===!1&&u.addEventListener("dispose",l),r.get(u)!==f&&(e.update(u.instanceMatrix,n.ARRAY_BUFFER),u.instanceColor!==null&&e.update(u.instanceColor,n.ARRAY_BUFFER),r.set(u,f))),u.isSkinnedMesh){const g=u.skeleton;r.get(g)!==f&&(g.update(),r.set(g,f))}return m}function c(){r=new WeakMap}function l(u){const f=u.target;f.removeEventListener("dispose",l),e.remove(f.instanceMatrix),f.instanceColor!==null&&e.remove(f.instanceColor)}return{update:o,dispose:c}}class e0 extends hn{constructor(t,e,i,r,o,c,l,u,f,p=Ps){if(p!==Ps&&p!==Us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&p===Ps&&(i=Xi),i===void 0&&p===Us&&(i=Ns),super(null,r,o,c,l,u,p,i,f),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=l!==void 0?l:wn,this.minFilter=u!==void 0?u:wn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const n0=new hn,dh=new e0(1,1),i0=new Wu,s0=new kd,r0=new ju,ph=[],mh=[],gh=new Float32Array(16),vh=new Float32Array(9),_h=new Float32Array(4);function Bs(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let o=ph[r];if(o===void 0&&(o=new Float32Array(r),ph[r]=o),t!==0){i.toArray(o,0);for(let c=1,l=0;c!==t;++c)l+=e,n[c].toArray(o,l)}return o}function Ge(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Xe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Wo(n,t){let e=mh[t];e===void 0&&(e=new Int32Array(t),mh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Q1(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function tg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2fv(this.addr,t),Xe(e,t)}}function eg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;n.uniform3fv(this.addr,t),Xe(e,t)}}function ng(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4fv(this.addr,t),Xe(e,t)}}function ig(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Xe(e,t)}else{if(Ge(e,i))return;_h.set(i),n.uniformMatrix2fv(this.addr,!1,_h),Xe(e,i)}}function sg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Xe(e,t)}else{if(Ge(e,i))return;vh.set(i),n.uniformMatrix3fv(this.addr,!1,vh),Xe(e,i)}}function rg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Xe(e,t)}else{if(Ge(e,i))return;gh.set(i),n.uniformMatrix4fv(this.addr,!1,gh),Xe(e,i)}}function og(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function ag(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2iv(this.addr,t),Xe(e,t)}}function lg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;n.uniform3iv(this.addr,t),Xe(e,t)}}function cg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4iv(this.addr,t),Xe(e,t)}}function hg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function ug(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2uiv(this.addr,t),Xe(e,t)}}function fg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;n.uniform3uiv(this.addr,t),Xe(e,t)}}function dg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4uiv(this.addr,t),Xe(e,t)}}function pg(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let o;this.type===n.SAMPLER_2D_SHADOW?(dh.compareFunction=Gu,o=dh):o=n0,e.setTexture2D(t||o,r)}function mg(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||s0,r)}function gg(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||r0,r)}function vg(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||i0,r)}function _g(n){switch(n){case 5126:return Q1;case 35664:return tg;case 35665:return eg;case 35666:return ng;case 35674:return ig;case 35675:return sg;case 35676:return rg;case 5124:case 35670:return og;case 35667:case 35671:return ag;case 35668:case 35672:return lg;case 35669:case 35673:return cg;case 5125:return hg;case 36294:return ug;case 36295:return fg;case 36296:return dg;case 35678:case 36198:case 36298:case 36306:case 35682:return pg;case 35679:case 36299:case 36307:return mg;case 35680:case 36300:case 36308:case 36293:return gg;case 36289:case 36303:case 36311:case 36292:return vg}}function xg(n,t){n.uniform1fv(this.addr,t)}function yg(n,t){const e=Bs(t,this.size,2);n.uniform2fv(this.addr,e)}function Sg(n,t){const e=Bs(t,this.size,3);n.uniform3fv(this.addr,e)}function Mg(n,t){const e=Bs(t,this.size,4);n.uniform4fv(this.addr,e)}function Eg(n,t){const e=Bs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function wg(n,t){const e=Bs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function bg(n,t){const e=Bs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Tg(n,t){n.uniform1iv(this.addr,t)}function Ag(n,t){n.uniform2iv(this.addr,t)}function Pg(n,t){n.uniform3iv(this.addr,t)}function Cg(n,t){n.uniform4iv(this.addr,t)}function Ig(n,t){n.uniform1uiv(this.addr,t)}function Lg(n,t){n.uniform2uiv(this.addr,t)}function Rg(n,t){n.uniform3uiv(this.addr,t)}function Dg(n,t){n.uniform4uiv(this.addr,t)}function Ng(n,t,e){const i=this.cache,r=t.length,o=Wo(e,r);Ge(i,o)||(n.uniform1iv(this.addr,o),Xe(i,o));for(let c=0;c!==r;++c)e.setTexture2D(t[c]||n0,o[c])}function Ug(n,t,e){const i=this.cache,r=t.length,o=Wo(e,r);Ge(i,o)||(n.uniform1iv(this.addr,o),Xe(i,o));for(let c=0;c!==r;++c)e.setTexture3D(t[c]||s0,o[c])}function Og(n,t,e){const i=this.cache,r=t.length,o=Wo(e,r);Ge(i,o)||(n.uniform1iv(this.addr,o),Xe(i,o));for(let c=0;c!==r;++c)e.setTextureCube(t[c]||r0,o[c])}function Fg(n,t,e){const i=this.cache,r=t.length,o=Wo(e,r);Ge(i,o)||(n.uniform1iv(this.addr,o),Xe(i,o));for(let c=0;c!==r;++c)e.setTexture2DArray(t[c]||i0,o[c])}function Bg(n){switch(n){case 5126:return xg;case 35664:return yg;case 35665:return Sg;case 35666:return Mg;case 35674:return Eg;case 35675:return wg;case 35676:return bg;case 5124:case 35670:return Tg;case 35667:case 35671:return Ag;case 35668:case 35672:return Pg;case 35669:case 35673:return Cg;case 5125:return Ig;case 36294:return Lg;case 36295:return Rg;case 36296:return Dg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ng;case 35679:case 36299:case 36307:return Ug;case 35680:case 36300:case 36308:case 36293:return Og;case 36289:case 36303:case 36311:case 36292:return Fg}}class kg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=_g(e.type)}}class zg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Bg(e.type)}}class Hg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let o=0,c=r.length;o!==c;++o){const l=r[o];l.setValue(t,e[l.id],i)}}}const La=/(\w+)(\])?(\[|\.)?/g;function xh(n,t){n.seq.push(t),n.map[t.id]=t}function Gg(n,t,e){const i=n.name,r=i.length;for(La.lastIndex=0;;){const o=La.exec(i),c=La.lastIndex;let l=o[1];const u=o[2]==="]",f=o[3];if(u&&(l=l|0),f===void 0||f==="["&&c+2===r){xh(e,f===void 0?new kg(l,n,t):new zg(l,n,t));break}else{let m=e.map[l];m===void 0&&(m=new Hg(l),xh(e,m)),e=m}}}class Eo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=t.getActiveUniform(e,r),c=t.getUniformLocation(e,o.name);Gg(o,c,this)}}setValue(t,e,i,r){const o=this.map[e];o!==void 0&&o.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let o=0,c=e.length;o!==c;++o){const l=e[o],u=i[l.id];u.needsUpdate!==!1&&l.setValue(t,u.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,o=t.length;r!==o;++r){const c=t[r];c.id in e&&i.push(c)}return i}}function yh(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Xg=37297;let Vg=0;function Wg(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let c=r;c<o;c++){const l=c+1;i.push(`${l===t?">":" "} ${l}: ${e[c]}`)}return i.join(`
`)}function Yg(n){const t=ve.getPrimaries(ve.workingColorSpace),e=ve.getPrimaries(n);let i;switch(t===e?i="":t===Io&&e===Co?i="LinearDisplayP3ToLinearSRGB":t===Co&&e===Io&&(i="LinearSRGBToLinearDisplayP3"),n){case Ei:case Go:return[i,"LinearTransferOETF"];case zn:case fc:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Sh(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const c=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Wg(n.getShaderSource(t),c)}else return r}function qg(n,t){const e=Yg(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Zg(n,t){let e;switch(t){case Kf:e="Linear";break;case Jf:e="Reinhard";break;case jf:e="Cineon";break;case Qf:e="ACESFilmic";break;case ed:e="AgX";break;case nd:e="Neutral";break;case td:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const to=new U;function $g(){ve.getLuminanceCoefficients(to);const n=to.x.toFixed(4),t=to.y.toFixed(4),e=to.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Kg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rr).join(`
`)}function Jg(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function jg(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const o=n.getActiveAttrib(t,r),c=o.name;let l=1;o.type===n.FLOAT_MAT2&&(l=2),o.type===n.FLOAT_MAT3&&(l=3),o.type===n.FLOAT_MAT4&&(l=4),e[c]={type:o.type,location:n.getAttribLocation(t,c),locationSize:l}}return e}function rr(n){return n!==""}function Mh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Eh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Qg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hl(n){return n.replace(Qg,ev)}const tv=new Map;function ev(n,t){let e=Jt[t];if(e===void 0){const i=tv.get(t);if(i!==void 0)e=Jt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Hl(e)}const nv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wh(n){return n.replace(nv,iv)}function iv(n,t,e,i){let r="";for(let o=parseInt(t);o<parseInt(e);o++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function bh(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function sv(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Cu?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Cf?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ii&&(t="SHADOWMAP_TYPE_VSM"),t}function rv(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Rs:case Ds:t="ENVMAP_TYPE_CUBE";break;case Ho:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ov(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ds:t="ENVMAP_MODE_REFRACTION";break}return t}function av(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case rc:t="ENVMAP_BLENDING_MULTIPLY";break;case Zf:t="ENVMAP_BLENDING_MIX";break;case $f:t="ENVMAP_BLENDING_ADD";break}return t}function lv(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function cv(n,t,e,i){const r=n.getContext(),o=e.defines;let c=e.vertexShader,l=e.fragmentShader;const u=sv(e),f=rv(e),p=ov(e),m=av(e),g=lv(e),v=Kg(e),M=Jg(o),S=r.createProgram();let _,y,P=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M].filter(rr).join(`
`),_.length>0&&(_+=`
`),y=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M].filter(rr).join(`
`),y.length>0&&(y+=`
`)):(_=[bh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+p:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rr).join(`
`),y=[bh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.envMap?"#define "+p:"",e.envMap?"#define "+m:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==yi?"#define TONE_MAPPING":"",e.toneMapping!==yi?Jt.tonemapping_pars_fragment:"",e.toneMapping!==yi?Zg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,qg("linearToOutputTexel",e.outputColorSpace),$g(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(rr).join(`
`)),c=Hl(c),c=Mh(c,e),c=Eh(c,e),l=Hl(l),l=Mh(l,e),l=Eh(l,e),c=wh(c),l=wh(l),e.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,_=[v,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,y=["#define varying in",e.glslVersion===Hc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Hc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const b=P+_+c,I=P+y+l,z=yh(r,r.VERTEX_SHADER,b),F=yh(r,r.FRAGMENT_SHADER,I);r.attachShader(S,z),r.attachShader(S,F),e.index0AttributeName!==void 0?r.bindAttribLocation(S,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S);function N(L){if(n.debug.checkShaderErrors){const Z=r.getProgramInfoLog(S).trim(),$=r.getShaderInfoLog(z).trim(),Q=r.getShaderInfoLog(F).trim();let st=!0,K=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(st=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,S,z,F);else{const lt=Sh(r,z,"vertex"),j=Sh(r,F,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+Z+`
`+lt+`
`+j)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):($===""||Q==="")&&(K=!1);K&&(L.diagnostics={runnable:st,programLog:Z,vertexShader:{log:$,prefix:_},fragmentShader:{log:Q,prefix:y}})}r.deleteShader(z),r.deleteShader(F),X=new Eo(r,S),ot=jg(r,S)}let X;this.getUniforms=function(){return X===void 0&&N(this),X};let ot;this.getAttributes=function(){return ot===void 0&&N(this),ot};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=r.getProgramParameter(S,Xg)),w},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Vg++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=z,this.fragmentShader=F,this}let hv=0;class uv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),o=this._getShaderStage(i),c=this._getShaderCacheForMaterial(t);return c.has(r)===!1&&(c.add(r),r.usedTimes++),c.has(o)===!1&&(c.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new fv(t),e.set(t,i)),i}}class fv{constructor(t){this.id=hv++,this.code=t,this.usedTimes=0}}function dv(n,t,e,i,r,o,c){const l=new pc,u=new uv,f=new Set,p=[],m=r.logarithmicDepthBuffer,g=r.reverseDepthBuffer,v=r.vertexTextures;let M=r.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(w){return f.add(w),w===0?"uv":`uv${w}`}function y(w,L,Z,$,Q){const st=$.fog,K=Q.geometry,lt=w.isMeshStandardMaterial?$.environment:null,j=(w.isMeshStandardMaterial?e:t).get(w.envMap||lt),St=j&&j.mapping===Ho?j.image.height:null,Mt=S[w.type];w.precision!==null&&(M=r.getMaxPrecision(w.precision),M!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",M,"instead."));const Lt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,fe=Lt!==void 0?Lt.length:0;let ne=0;K.morphAttributes.position!==void 0&&(ne=1),K.morphAttributes.normal!==void 0&&(ne=2),K.morphAttributes.color!==void 0&&(ne=3);let et,ht,Pt,Et;if(Mt){const je=dn[Mt];et=je.vertexShader,ht=je.fragmentShader}else et=w.vertexShader,ht=w.fragmentShader,u.update(w),Pt=u.getVertexShaderID(w),Et=u.getFragmentShaderID(w);const Zt=n.getRenderTarget(),Ht=Q.isInstancedMesh===!0,Kt=Q.isBatchedMesh===!0,ge=!!w.map,ae=!!w.matcap,B=!!j,sn=!!w.aoMap,re=!!w.lightMap,he=!!w.bumpMap,Xt=!!w.normalMap,Ee=!!w.displacementMap,Yt=!!w.emissiveMap,R=!!w.metalnessMap,T=!!w.roughnessMap,W=w.anisotropy>0,it=w.clearcoat>0,ct=w.dispersion>0,nt=w.iridescence>0,Dt=w.sheen>0,vt=w.transmission>0,wt=W&&!!w.anisotropyMap,ue=it&&!!w.clearcoatMap,ut=it&&!!w.clearcoatNormalMap,bt=it&&!!w.clearcoatRoughnessMap,Vt=nt&&!!w.iridescenceMap,Wt=nt&&!!w.iridescenceThicknessMap,Tt=Dt&&!!w.sheenColorMap,te=Dt&&!!w.sheenRoughnessMap,$t=!!w.specularMap,_e=!!w.specularColorMap,k=!!w.specularIntensityMap,xt=vt&&!!w.transmissionMap,J=vt&&!!w.thicknessMap,rt=!!w.gradientMap,_t=!!w.alphaMap,yt=w.alphaTest>0,le=!!w.alphaHash,Oe=!!w.extensions;let Je=yi;w.toneMapped&&(Zt===null||Zt.isXRRenderTarget===!0)&&(Je=n.toneMapping);const de={shaderID:Mt,shaderType:w.type,shaderName:w.name,vertexShader:et,fragmentShader:ht,defines:w.defines,customVertexShaderID:Pt,customFragmentShaderID:Et,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:M,batching:Kt,batchingColor:Kt&&Q._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&Q.instanceColor!==null,instancingMorph:Ht&&Q.morphTexture!==null,supportsVertexTextures:v,outputColorSpace:Zt===null?n.outputColorSpace:Zt.isXRRenderTarget===!0?Zt.texture.colorSpace:Ei,alphaToCoverage:!!w.alphaToCoverage,map:ge,matcap:ae,envMap:B,envMapMode:B&&j.mapping,envMapCubeUVHeight:St,aoMap:sn,lightMap:re,bumpMap:he,normalMap:Xt,displacementMap:v&&Ee,emissiveMap:Yt,normalMapObjectSpace:Xt&&w.normalMapType===od,normalMapTangentSpace:Xt&&w.normalMapType===Hu,metalnessMap:R,roughnessMap:T,anisotropy:W,anisotropyMap:wt,clearcoat:it,clearcoatMap:ue,clearcoatNormalMap:ut,clearcoatRoughnessMap:bt,dispersion:ct,iridescence:nt,iridescenceMap:Vt,iridescenceThicknessMap:Wt,sheen:Dt,sheenColorMap:Tt,sheenRoughnessMap:te,specularMap:$t,specularColorMap:_e,specularIntensityMap:k,transmission:vt,transmissionMap:xt,thicknessMap:J,gradientMap:rt,opaque:w.transparent===!1&&w.blending===As&&w.alphaToCoverage===!1,alphaMap:_t,alphaTest:yt,alphaHash:le,combine:w.combine,mapUv:ge&&_(w.map.channel),aoMapUv:sn&&_(w.aoMap.channel),lightMapUv:re&&_(w.lightMap.channel),bumpMapUv:he&&_(w.bumpMap.channel),normalMapUv:Xt&&_(w.normalMap.channel),displacementMapUv:Ee&&_(w.displacementMap.channel),emissiveMapUv:Yt&&_(w.emissiveMap.channel),metalnessMapUv:R&&_(w.metalnessMap.channel),roughnessMapUv:T&&_(w.roughnessMap.channel),anisotropyMapUv:wt&&_(w.anisotropyMap.channel),clearcoatMapUv:ue&&_(w.clearcoatMap.channel),clearcoatNormalMapUv:ut&&_(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:bt&&_(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Vt&&_(w.iridescenceMap.channel),iridescenceThicknessMapUv:Wt&&_(w.iridescenceThicknessMap.channel),sheenColorMapUv:Tt&&_(w.sheenColorMap.channel),sheenRoughnessMapUv:te&&_(w.sheenRoughnessMap.channel),specularMapUv:$t&&_(w.specularMap.channel),specularColorMapUv:_e&&_(w.specularColorMap.channel),specularIntensityMapUv:k&&_(w.specularIntensityMap.channel),transmissionMapUv:xt&&_(w.transmissionMap.channel),thicknessMapUv:J&&_(w.thicknessMap.channel),alphaMapUv:_t&&_(w.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Xt||W),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:Q.isPoints===!0&&!!K.attributes.uv&&(ge||_t),fog:!!st,useFog:w.fog===!0,fogExp2:!!st&&st.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:m,reverseDepthBuffer:g,skinning:Q.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:ne,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numLightProbes:L.numLightProbes,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&Z.length>0,shadowMapType:n.shadowMap.type,toneMapping:Je,decodeVideoTexture:ge&&w.map.isVideoTexture===!0&&ve.getTransfer(w.map.colorSpace)===Pe,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===xn,flipSided:w.side===nn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Oe&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&w.extensions.multiDraw===!0||Kt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return de.vertexUv1s=f.has(1),de.vertexUv2s=f.has(2),de.vertexUv3s=f.has(3),f.clear(),de}function P(w){const L=[];if(w.shaderID?L.push(w.shaderID):(L.push(w.customVertexShaderID),L.push(w.customFragmentShaderID)),w.defines!==void 0)for(const Z in w.defines)L.push(Z),L.push(w.defines[Z]);return w.isRawShaderMaterial===!1&&(b(L,w),I(L,w),L.push(n.outputColorSpace)),L.push(w.customProgramCacheKey),L.join()}function b(w,L){w.push(L.precision),w.push(L.outputColorSpace),w.push(L.envMapMode),w.push(L.envMapCubeUVHeight),w.push(L.mapUv),w.push(L.alphaMapUv),w.push(L.lightMapUv),w.push(L.aoMapUv),w.push(L.bumpMapUv),w.push(L.normalMapUv),w.push(L.displacementMapUv),w.push(L.emissiveMapUv),w.push(L.metalnessMapUv),w.push(L.roughnessMapUv),w.push(L.anisotropyMapUv),w.push(L.clearcoatMapUv),w.push(L.clearcoatNormalMapUv),w.push(L.clearcoatRoughnessMapUv),w.push(L.iridescenceMapUv),w.push(L.iridescenceThicknessMapUv),w.push(L.sheenColorMapUv),w.push(L.sheenRoughnessMapUv),w.push(L.specularMapUv),w.push(L.specularColorMapUv),w.push(L.specularIntensityMapUv),w.push(L.transmissionMapUv),w.push(L.thicknessMapUv),w.push(L.combine),w.push(L.fogExp2),w.push(L.sizeAttenuation),w.push(L.morphTargetsCount),w.push(L.morphAttributeCount),w.push(L.numDirLights),w.push(L.numPointLights),w.push(L.numSpotLights),w.push(L.numSpotLightMaps),w.push(L.numHemiLights),w.push(L.numRectAreaLights),w.push(L.numDirLightShadows),w.push(L.numPointLightShadows),w.push(L.numSpotLightShadows),w.push(L.numSpotLightShadowsWithMaps),w.push(L.numLightProbes),w.push(L.shadowMapType),w.push(L.toneMapping),w.push(L.numClippingPlanes),w.push(L.numClipIntersection),w.push(L.depthPacking)}function I(w,L){l.disableAll(),L.supportsVertexTextures&&l.enable(0),L.instancing&&l.enable(1),L.instancingColor&&l.enable(2),L.instancingMorph&&l.enable(3),L.matcap&&l.enable(4),L.envMap&&l.enable(5),L.normalMapObjectSpace&&l.enable(6),L.normalMapTangentSpace&&l.enable(7),L.clearcoat&&l.enable(8),L.iridescence&&l.enable(9),L.alphaTest&&l.enable(10),L.vertexColors&&l.enable(11),L.vertexAlphas&&l.enable(12),L.vertexUv1s&&l.enable(13),L.vertexUv2s&&l.enable(14),L.vertexUv3s&&l.enable(15),L.vertexTangents&&l.enable(16),L.anisotropy&&l.enable(17),L.alphaHash&&l.enable(18),L.batching&&l.enable(19),L.dispersion&&l.enable(20),L.batchingColor&&l.enable(21),w.push(l.mask),l.disableAll(),L.fog&&l.enable(0),L.useFog&&l.enable(1),L.flatShading&&l.enable(2),L.logarithmicDepthBuffer&&l.enable(3),L.reverseDepthBuffer&&l.enable(4),L.skinning&&l.enable(5),L.morphTargets&&l.enable(6),L.morphNormals&&l.enable(7),L.morphColors&&l.enable(8),L.premultipliedAlpha&&l.enable(9),L.shadowMapEnabled&&l.enable(10),L.doubleSided&&l.enable(11),L.flipSided&&l.enable(12),L.useDepthPacking&&l.enable(13),L.dithering&&l.enable(14),L.transmission&&l.enable(15),L.sheen&&l.enable(16),L.opaque&&l.enable(17),L.pointsUvs&&l.enable(18),L.decodeVideoTexture&&l.enable(19),L.alphaToCoverage&&l.enable(20),w.push(l.mask)}function z(w){const L=S[w.type];let Z;if(L){const $=dn[L];Z=mc.clone($.uniforms)}else Z=w.uniforms;return Z}function F(w,L){let Z;for(let $=0,Q=p.length;$<Q;$++){const st=p[$];if(st.cacheKey===L){Z=st,++Z.usedTimes;break}}return Z===void 0&&(Z=new cv(n,L,w,o),p.push(Z)),Z}function N(w){if(--w.usedTimes===0){const L=p.indexOf(w);p[L]=p[p.length-1],p.pop(),w.destroy()}}function X(w){u.remove(w)}function ot(){u.dispose()}return{getParameters:y,getProgramCacheKey:P,getUniforms:z,acquireProgram:F,releaseProgram:N,releaseShaderCache:X,programs:p,dispose:ot}}function pv(){let n=new WeakMap;function t(c){return n.has(c)}function e(c){let l=n.get(c);return l===void 0&&(l={},n.set(c,l)),l}function i(c){n.delete(c)}function r(c,l,u){n.get(c)[l]=u}function o(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:o}}function mv(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Th(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Ah(){const n=[];let t=0;const e=[],i=[],r=[];function o(){t=0,e.length=0,i.length=0,r.length=0}function c(m,g,v,M,S,_){let y=n[t];return y===void 0?(y={id:m.id,object:m,geometry:g,material:v,groupOrder:M,renderOrder:m.renderOrder,z:S,group:_},n[t]=y):(y.id=m.id,y.object=m,y.geometry=g,y.material=v,y.groupOrder=M,y.renderOrder=m.renderOrder,y.z=S,y.group=_),t++,y}function l(m,g,v,M,S,_){const y=c(m,g,v,M,S,_);v.transmission>0?i.push(y):v.transparent===!0?r.push(y):e.push(y)}function u(m,g,v,M,S,_){const y=c(m,g,v,M,S,_);v.transmission>0?i.unshift(y):v.transparent===!0?r.unshift(y):e.unshift(y)}function f(m,g){e.length>1&&e.sort(m||mv),i.length>1&&i.sort(g||Th),r.length>1&&r.sort(g||Th)}function p(){for(let m=t,g=n.length;m<g;m++){const v=n[m];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:e,transmissive:i,transparent:r,init:o,push:l,unshift:u,finish:p,sort:f}}function gv(){let n=new WeakMap;function t(i,r){const o=n.get(i);let c;return o===void 0?(c=new Ah,n.set(i,[c])):r>=o.length?(c=new Ah,o.push(c)):c=o[r],c}function e(){n=new WeakMap}return{get:t,dispose:e}}function vv(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new kt};break;case"SpotLight":e={position:new U,direction:new U,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new U,halfWidth:new U,halfHeight:new U};break}return n[t.id]=e,e}}}function _v(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let xv=0;function yv(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Sv(n){const t=new vv,e=_v(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)i.probe.push(new U);const r=new U,o=new Te,c=new Te;function l(f){let p=0,m=0,g=0;for(let ot=0;ot<9;ot++)i.probe[ot].set(0,0,0);let v=0,M=0,S=0,_=0,y=0,P=0,b=0,I=0,z=0,F=0,N=0;f.sort(yv);for(let ot=0,w=f.length;ot<w;ot++){const L=f[ot],Z=L.color,$=L.intensity,Q=L.distance,st=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)p+=Z.r*$,m+=Z.g*$,g+=Z.b*$;else if(L.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(L.sh.coefficients[K],$);N++}else if(L.isDirectionalLight){const K=t.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const lt=L.shadow,j=e.get(L);j.shadowIntensity=lt.intensity,j.shadowBias=lt.bias,j.shadowNormalBias=lt.normalBias,j.shadowRadius=lt.radius,j.shadowMapSize=lt.mapSize,i.directionalShadow[v]=j,i.directionalShadowMap[v]=st,i.directionalShadowMatrix[v]=L.shadow.matrix,P++}i.directional[v]=K,v++}else if(L.isSpotLight){const K=t.get(L);K.position.setFromMatrixPosition(L.matrixWorld),K.color.copy(Z).multiplyScalar($),K.distance=Q,K.coneCos=Math.cos(L.angle),K.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),K.decay=L.decay,i.spot[S]=K;const lt=L.shadow;if(L.map&&(i.spotLightMap[z]=L.map,z++,lt.updateMatrices(L),L.castShadow&&F++),i.spotLightMatrix[S]=lt.matrix,L.castShadow){const j=e.get(L);j.shadowIntensity=lt.intensity,j.shadowBias=lt.bias,j.shadowNormalBias=lt.normalBias,j.shadowRadius=lt.radius,j.shadowMapSize=lt.mapSize,i.spotShadow[S]=j,i.spotShadowMap[S]=st,I++}S++}else if(L.isRectAreaLight){const K=t.get(L);K.color.copy(Z).multiplyScalar($),K.halfWidth.set(L.width*.5,0,0),K.halfHeight.set(0,L.height*.5,0),i.rectArea[_]=K,_++}else if(L.isPointLight){const K=t.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity),K.distance=L.distance,K.decay=L.decay,L.castShadow){const lt=L.shadow,j=e.get(L);j.shadowIntensity=lt.intensity,j.shadowBias=lt.bias,j.shadowNormalBias=lt.normalBias,j.shadowRadius=lt.radius,j.shadowMapSize=lt.mapSize,j.shadowCameraNear=lt.camera.near,j.shadowCameraFar=lt.camera.far,i.pointShadow[M]=j,i.pointShadowMap[M]=st,i.pointShadowMatrix[M]=L.shadow.matrix,b++}i.point[M]=K,M++}else if(L.isHemisphereLight){const K=t.get(L);K.skyColor.copy(L.color).multiplyScalar($),K.groundColor.copy(L.groundColor).multiplyScalar($),i.hemi[y]=K,y++}}_>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=dt.LTC_FLOAT_1,i.rectAreaLTC2=dt.LTC_FLOAT_2):(i.rectAreaLTC1=dt.LTC_HALF_1,i.rectAreaLTC2=dt.LTC_HALF_2)),i.ambient[0]=p,i.ambient[1]=m,i.ambient[2]=g;const X=i.hash;(X.directionalLength!==v||X.pointLength!==M||X.spotLength!==S||X.rectAreaLength!==_||X.hemiLength!==y||X.numDirectionalShadows!==P||X.numPointShadows!==b||X.numSpotShadows!==I||X.numSpotMaps!==z||X.numLightProbes!==N)&&(i.directional.length=v,i.spot.length=S,i.rectArea.length=_,i.point.length=M,i.hemi.length=y,i.directionalShadow.length=P,i.directionalShadowMap.length=P,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=I,i.spotShadowMap.length=I,i.directionalShadowMatrix.length=P,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=I+z-F,i.spotLightMap.length=z,i.numSpotLightShadowsWithMaps=F,i.numLightProbes=N,X.directionalLength=v,X.pointLength=M,X.spotLength=S,X.rectAreaLength=_,X.hemiLength=y,X.numDirectionalShadows=P,X.numPointShadows=b,X.numSpotShadows=I,X.numSpotMaps=z,X.numLightProbes=N,i.version=xv++)}function u(f,p){let m=0,g=0,v=0,M=0,S=0;const _=p.matrixWorldInverse;for(let y=0,P=f.length;y<P;y++){const b=f[y];if(b.isDirectionalLight){const I=i.directional[m];I.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(_),m++}else if(b.isSpotLight){const I=i.spot[v];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(_),I.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(_),v++}else if(b.isRectAreaLight){const I=i.rectArea[M];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(_),c.identity(),o.copy(b.matrixWorld),o.premultiply(_),c.extractRotation(o),I.halfWidth.set(b.width*.5,0,0),I.halfHeight.set(0,b.height*.5,0),I.halfWidth.applyMatrix4(c),I.halfHeight.applyMatrix4(c),M++}else if(b.isPointLight){const I=i.point[g];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(_),g++}else if(b.isHemisphereLight){const I=i.hemi[S];I.direction.setFromMatrixPosition(b.matrixWorld),I.direction.transformDirection(_),S++}}}return{setup:l,setupView:u,state:i}}function Ph(n){const t=new Sv(n),e=[],i=[];function r(p){f.camera=p,e.length=0,i.length=0}function o(p){e.push(p)}function c(p){i.push(p)}function l(){t.setup(e)}function u(p){t.setupView(e,p)}const f={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:c}}function Mv(n){let t=new WeakMap;function e(r,o=0){const c=t.get(r);let l;return c===void 0?(l=new Ph(n),t.set(r,[l])):o>=c.length?(l=new Ph(n),c.push(l)):l=c[o],l}function i(){t=new WeakMap}return{get:e,dispose:i}}class Ev extends Zi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class wv extends Zi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const bv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Tv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Av(n,t,e){let i=new gc;const r=new Rt,o=new Rt,c=new oe,l=new Ev({depthPacking:rd}),u=new wv,f={},p=e.maxTextureSize,m={[Mi]:nn,[nn]:Mi,[xn]:xn},g=new Ye({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Rt},radius:{value:4}},vertexShader:bv,fragmentShader:Tv}),v=g.clone();v.defines.HORIZONTAL_PASS=1;const M=new Be;M.setAttribute("position",new Nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Re(M,g),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cu;let y=this.type;this.render=function(F,N,X){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||F.length===0)return;const ot=n.getRenderTarget(),w=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),Z=n.state;Z.setBlending(xi),Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);const $=y!==ii&&this.type===ii,Q=y===ii&&this.type!==ii;for(let st=0,K=F.length;st<K;st++){const lt=F[st],j=lt.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",lt,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;r.copy(j.mapSize);const St=j.getFrameExtents();if(r.multiply(St),o.copy(j.mapSize),(r.x>p||r.y>p)&&(r.x>p&&(o.x=Math.floor(p/St.x),r.x=o.x*St.x,j.mapSize.x=o.x),r.y>p&&(o.y=Math.floor(p/St.y),r.y=o.y*St.y,j.mapSize.y=o.y)),j.map===null||$===!0||Q===!0){const Lt=this.type!==ii?{minFilter:wn,magFilter:wn}:{};j.map!==null&&j.map.dispose(),j.map=new Vi(r.x,r.y,Lt),j.map.texture.name=lt.name+".shadowMap",j.camera.updateProjectionMatrix()}n.setRenderTarget(j.map),n.clear();const Mt=j.getViewportCount();for(let Lt=0;Lt<Mt;Lt++){const fe=j.getViewport(Lt);c.set(o.x*fe.x,o.y*fe.y,o.x*fe.z,o.y*fe.w),Z.viewport(c),j.updateMatrices(lt,Lt),i=j.getFrustum(),I(N,X,j.camera,lt,this.type)}j.isPointLightShadow!==!0&&this.type===ii&&P(j,X),j.needsUpdate=!1}y=this.type,_.needsUpdate=!1,n.setRenderTarget(ot,w,L)};function P(F,N){const X=t.update(S);g.defines.VSM_SAMPLES!==F.blurSamples&&(g.defines.VSM_SAMPLES=F.blurSamples,v.defines.VSM_SAMPLES=F.blurSamples,g.needsUpdate=!0,v.needsUpdate=!0),F.mapPass===null&&(F.mapPass=new Vi(r.x,r.y)),g.uniforms.shadow_pass.value=F.map.texture,g.uniforms.resolution.value=F.mapSize,g.uniforms.radius.value=F.radius,n.setRenderTarget(F.mapPass),n.clear(),n.renderBufferDirect(N,null,X,g,S,null),v.uniforms.shadow_pass.value=F.mapPass.texture,v.uniforms.resolution.value=F.mapSize,v.uniforms.radius.value=F.radius,n.setRenderTarget(F.map),n.clear(),n.renderBufferDirect(N,null,X,v,S,null)}function b(F,N,X,ot){let w=null;const L=X.isPointLight===!0?F.customDistanceMaterial:F.customDepthMaterial;if(L!==void 0)w=L;else if(w=X.isPointLight===!0?u:l,n.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0){const Z=w.uuid,$=N.uuid;let Q=f[Z];Q===void 0&&(Q={},f[Z]=Q);let st=Q[$];st===void 0&&(st=w.clone(),Q[$]=st,N.addEventListener("dispose",z)),w=st}if(w.visible=N.visible,w.wireframe=N.wireframe,ot===ii?w.side=N.shadowSide!==null?N.shadowSide:N.side:w.side=N.shadowSide!==null?N.shadowSide:m[N.side],w.alphaMap=N.alphaMap,w.alphaTest=N.alphaTest,w.map=N.map,w.clipShadows=N.clipShadows,w.clippingPlanes=N.clippingPlanes,w.clipIntersection=N.clipIntersection,w.displacementMap=N.displacementMap,w.displacementScale=N.displacementScale,w.displacementBias=N.displacementBias,w.wireframeLinewidth=N.wireframeLinewidth,w.linewidth=N.linewidth,X.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const Z=n.properties.get(w);Z.light=X}return w}function I(F,N,X,ot,w){if(F.visible===!1)return;if(F.layers.test(N.layers)&&(F.isMesh||F.isLine||F.isPoints)&&(F.castShadow||F.receiveShadow&&w===ii)&&(!F.frustumCulled||i.intersectsObject(F))){F.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,F.matrixWorld);const $=t.update(F),Q=F.material;if(Array.isArray(Q)){const st=$.groups;for(let K=0,lt=st.length;K<lt;K++){const j=st[K],St=Q[j.materialIndex];if(St&&St.visible){const Mt=b(F,St,ot,w);F.onBeforeShadow(n,F,N,X,$,Mt,j),n.renderBufferDirect(X,null,$,Mt,F,j),F.onAfterShadow(n,F,N,X,$,Mt,j)}}}else if(Q.visible){const st=b(F,Q,ot,w);F.onBeforeShadow(n,F,N,X,$,st,null),n.renderBufferDirect(X,null,$,st,F,null),F.onAfterShadow(n,F,N,X,$,st,null)}}const Z=F.children;for(let $=0,Q=Z.length;$<Q;$++)I(Z[$],N,X,ot,w)}function z(F){F.target.removeEventListener("dispose",z);for(const X in f){const ot=f[X],w=F.target.uuid;w in ot&&(ot[w].dispose(),delete ot[w])}}}const Pv={[il]:sl,[rl]:ll,[ol]:cl,[Ls]:al,[sl]:il,[ll]:rl,[cl]:ol,[al]:Ls};function Cv(n){function t(){let k=!1;const xt=new oe;let J=null;const rt=new oe(0,0,0,0);return{setMask:function(_t){J!==_t&&!k&&(n.colorMask(_t,_t,_t,_t),J=_t)},setLocked:function(_t){k=_t},setClear:function(_t,yt,le,Oe,Je){Je===!0&&(_t*=Oe,yt*=Oe,le*=Oe),xt.set(_t,yt,le,Oe),rt.equals(xt)===!1&&(n.clearColor(_t,yt,le,Oe),rt.copy(xt))},reset:function(){k=!1,J=null,rt.set(-1,0,0,0)}}}function e(){let k=!1,xt=!1,J=null,rt=null,_t=null;return{setReversed:function(yt){xt=yt},setTest:function(yt){yt?Pt(n.DEPTH_TEST):Et(n.DEPTH_TEST)},setMask:function(yt){J!==yt&&!k&&(n.depthMask(yt),J=yt)},setFunc:function(yt){if(xt&&(yt=Pv[yt]),rt!==yt){switch(yt){case il:n.depthFunc(n.NEVER);break;case sl:n.depthFunc(n.ALWAYS);break;case rl:n.depthFunc(n.LESS);break;case Ls:n.depthFunc(n.LEQUAL);break;case ol:n.depthFunc(n.EQUAL);break;case al:n.depthFunc(n.GEQUAL);break;case ll:n.depthFunc(n.GREATER);break;case cl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}rt=yt}},setLocked:function(yt){k=yt},setClear:function(yt){_t!==yt&&(n.clearDepth(yt),_t=yt)},reset:function(){k=!1,J=null,rt=null,_t=null}}}function i(){let k=!1,xt=null,J=null,rt=null,_t=null,yt=null,le=null,Oe=null,Je=null;return{setTest:function(de){k||(de?Pt(n.STENCIL_TEST):Et(n.STENCIL_TEST))},setMask:function(de){xt!==de&&!k&&(n.stencilMask(de),xt=de)},setFunc:function(de,je,bn){(J!==de||rt!==je||_t!==bn)&&(n.stencilFunc(de,je,bn),J=de,rt=je,_t=bn)},setOp:function(de,je,bn){(yt!==de||le!==je||Oe!==bn)&&(n.stencilOp(de,je,bn),yt=de,le=je,Oe=bn)},setLocked:function(de){k=de},setClear:function(de){Je!==de&&(n.clearStencil(de),Je=de)},reset:function(){k=!1,xt=null,J=null,rt=null,_t=null,yt=null,le=null,Oe=null,Je=null}}}const r=new t,o=new e,c=new i,l=new WeakMap,u=new WeakMap;let f={},p={},m=new WeakMap,g=[],v=null,M=!1,S=null,_=null,y=null,P=null,b=null,I=null,z=null,F=new kt(0,0,0),N=0,X=!1,ot=null,w=null,L=null,Z=null,$=null;const Q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let st=!1,K=0;const lt=n.getParameter(n.VERSION);lt.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(lt)[1]),st=K>=1):lt.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(lt)[1]),st=K>=2);let j=null,St={};const Mt=n.getParameter(n.SCISSOR_BOX),Lt=n.getParameter(n.VIEWPORT),fe=new oe().fromArray(Mt),ne=new oe().fromArray(Lt);function et(k,xt,J,rt){const _t=new Uint8Array(4),yt=n.createTexture();n.bindTexture(k,yt),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let le=0;le<J;le++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(xt,0,n.RGBA,1,1,rt,0,n.RGBA,n.UNSIGNED_BYTE,_t):n.texImage2D(xt+le,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,_t);return yt}const ht={};ht[n.TEXTURE_2D]=et(n.TEXTURE_2D,n.TEXTURE_2D,1),ht[n.TEXTURE_CUBE_MAP]=et(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ht[n.TEXTURE_2D_ARRAY]=et(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ht[n.TEXTURE_3D]=et(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),c.setClear(0),Pt(n.DEPTH_TEST),o.setFunc(Ls),re(!1),he(Oc),Pt(n.CULL_FACE),B(xi);function Pt(k){f[k]!==!0&&(n.enable(k),f[k]=!0)}function Et(k){f[k]!==!1&&(n.disable(k),f[k]=!1)}function Zt(k,xt){return p[k]!==xt?(n.bindFramebuffer(k,xt),p[k]=xt,k===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=xt),k===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=xt),!0):!1}function Ht(k,xt){let J=g,rt=!1;if(k){J=m.get(xt),J===void 0&&(J=[],m.set(xt,J));const _t=k.textures;if(J.length!==_t.length||J[0]!==n.COLOR_ATTACHMENT0){for(let yt=0,le=_t.length;yt<le;yt++)J[yt]=n.COLOR_ATTACHMENT0+yt;J.length=_t.length,rt=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,rt=!0);rt&&n.drawBuffers(J)}function Kt(k){return v!==k?(n.useProgram(k),v=k,!0):!1}const ge={[Oi]:n.FUNC_ADD,[Lf]:n.FUNC_SUBTRACT,[Rf]:n.FUNC_REVERSE_SUBTRACT};ge[Df]=n.MIN,ge[Nf]=n.MAX;const ae={[Uf]:n.ZERO,[Of]:n.ONE,[Ff]:n.SRC_COLOR,[el]:n.SRC_ALPHA,[Xf]:n.SRC_ALPHA_SATURATE,[Hf]:n.DST_COLOR,[kf]:n.DST_ALPHA,[Bf]:n.ONE_MINUS_SRC_COLOR,[nl]:n.ONE_MINUS_SRC_ALPHA,[Gf]:n.ONE_MINUS_DST_COLOR,[zf]:n.ONE_MINUS_DST_ALPHA,[Vf]:n.CONSTANT_COLOR,[Wf]:n.ONE_MINUS_CONSTANT_COLOR,[Yf]:n.CONSTANT_ALPHA,[qf]:n.ONE_MINUS_CONSTANT_ALPHA};function B(k,xt,J,rt,_t,yt,le,Oe,Je,de){if(k===xi){M===!0&&(Et(n.BLEND),M=!1);return}if(M===!1&&(Pt(n.BLEND),M=!0),k!==If){if(k!==S||de!==X){if((_!==Oi||b!==Oi)&&(n.blendEquation(n.FUNC_ADD),_=Oi,b=Oi),de)switch(k){case As:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Fc:n.blendFunc(n.ONE,n.ONE);break;case Bc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case kc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case As:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Fc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Bc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case kc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}y=null,P=null,I=null,z=null,F.set(0,0,0),N=0,S=k,X=de}return}_t=_t||xt,yt=yt||J,le=le||rt,(xt!==_||_t!==b)&&(n.blendEquationSeparate(ge[xt],ge[_t]),_=xt,b=_t),(J!==y||rt!==P||yt!==I||le!==z)&&(n.blendFuncSeparate(ae[J],ae[rt],ae[yt],ae[le]),y=J,P=rt,I=yt,z=le),(Oe.equals(F)===!1||Je!==N)&&(n.blendColor(Oe.r,Oe.g,Oe.b,Je),F.copy(Oe),N=Je),S=k,X=!1}function sn(k,xt){k.side===xn?Et(n.CULL_FACE):Pt(n.CULL_FACE);let J=k.side===nn;xt&&(J=!J),re(J),k.blending===As&&k.transparent===!1?B(xi):B(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);const rt=k.stencilWrite;c.setTest(rt),rt&&(c.setMask(k.stencilWriteMask),c.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),c.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ee(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Pt(n.SAMPLE_ALPHA_TO_COVERAGE):Et(n.SAMPLE_ALPHA_TO_COVERAGE)}function re(k){ot!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),ot=k)}function he(k){k!==Af?(Pt(n.CULL_FACE),k!==w&&(k===Oc?n.cullFace(n.BACK):k===Pf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Et(n.CULL_FACE),w=k}function Xt(k){k!==L&&(st&&n.lineWidth(k),L=k)}function Ee(k,xt,J){k?(Pt(n.POLYGON_OFFSET_FILL),(Z!==xt||$!==J)&&(n.polygonOffset(xt,J),Z=xt,$=J)):Et(n.POLYGON_OFFSET_FILL)}function Yt(k){k?Pt(n.SCISSOR_TEST):Et(n.SCISSOR_TEST)}function R(k){k===void 0&&(k=n.TEXTURE0+Q-1),j!==k&&(n.activeTexture(k),j=k)}function T(k,xt,J){J===void 0&&(j===null?J=n.TEXTURE0+Q-1:J=j);let rt=St[J];rt===void 0&&(rt={type:void 0,texture:void 0},St[J]=rt),(rt.type!==k||rt.texture!==xt)&&(j!==J&&(n.activeTexture(J),j=J),n.bindTexture(k,xt||ht[k]),rt.type=k,rt.texture=xt)}function W(){const k=St[j];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function it(){try{n.compressedTexImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ct(){try{n.compressedTexImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function nt(){try{n.texSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Dt(){try{n.texSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function vt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function wt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ue(){try{n.texStorage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ut(){try{n.texStorage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function bt(){try{n.texImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Vt(){try{n.texImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Wt(k){fe.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),fe.copy(k))}function Tt(k){ne.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),ne.copy(k))}function te(k,xt){let J=u.get(xt);J===void 0&&(J=new WeakMap,u.set(xt,J));let rt=J.get(k);rt===void 0&&(rt=n.getUniformBlockIndex(xt,k.name),J.set(k,rt))}function $t(k,xt){const rt=u.get(xt).get(k);l.get(xt)!==rt&&(n.uniformBlockBinding(xt,rt,k.__bindingPointIndex),l.set(xt,rt))}function _e(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},j=null,St={},p={},m=new WeakMap,g=[],v=null,M=!1,S=null,_=null,y=null,P=null,b=null,I=null,z=null,F=new kt(0,0,0),N=0,X=!1,ot=null,w=null,L=null,Z=null,$=null,fe.set(0,0,n.canvas.width,n.canvas.height),ne.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),c.reset()}return{buffers:{color:r,depth:o,stencil:c},enable:Pt,disable:Et,bindFramebuffer:Zt,drawBuffers:Ht,useProgram:Kt,setBlending:B,setMaterial:sn,setFlipSided:re,setCullFace:he,setLineWidth:Xt,setPolygonOffset:Ee,setScissorTest:Yt,activeTexture:R,bindTexture:T,unbindTexture:W,compressedTexImage2D:it,compressedTexImage3D:ct,texImage2D:bt,texImage3D:Vt,updateUBOMapping:te,uniformBlockBinding:$t,texStorage2D:ue,texStorage3D:ut,texSubImage2D:nt,texSubImage3D:Dt,compressedTexSubImage2D:vt,compressedTexSubImage3D:wt,scissor:Wt,viewport:Tt,reset:_e}}function Ch(n,t,e,i){const r=Iv(i);switch(e){case Nu:return n*t;case Ou:return n*t;case Fu:return n*t*2;case Bu:return n*t/r.components*r.byteLength;case cc:return n*t/r.components*r.byteLength;case ku:return n*t*2/r.components*r.byteLength;case hc:return n*t*2/r.components*r.byteLength;case Uu:return n*t*3/r.components*r.byteLength;case Rn:return n*t*4/r.components*r.byteLength;case uc:return n*t*4/r.components*r.byteLength;case vo:case _o:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case xo:case yo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ml:case vl:return Math.max(n,16)*Math.max(t,8)/4;case pl:case gl:return Math.max(n,8)*Math.max(t,8)/2;case _l:case xl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case yl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Sl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ml:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case El:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case wl:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case bl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Tl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Al:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Pl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Cl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Il:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ll:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Rl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Dl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Nl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case So:case Ul:case Ol:return Math.ceil(n/4)*Math.ceil(t/4)*16;case zu:case Fl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Bl:case kl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Iv(n){switch(n){case ci:case Lu:return{byteLength:1,components:1};case pr:case Ru:case Mr:return{byteLength:2,components:1};case ac:case lc:return{byteLength:2,components:4};case Xi:case oc:case ri:return{byteLength:4,components:1};case Du:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Lv(n,t,e,i,r,o,c){const l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new Rt,p=new WeakMap;let m;const g=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(R,T){return v?new OffscreenCanvas(R,T):gr("canvas")}function S(R,T,W){let it=1;const ct=Yt(R);if((ct.width>W||ct.height>W)&&(it=W/Math.max(ct.width,ct.height)),it<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const nt=Math.floor(it*ct.width),Dt=Math.floor(it*ct.height);m===void 0&&(m=M(nt,Dt));const vt=T?M(nt,Dt):m;return vt.width=nt,vt.height=Dt,vt.getContext("2d").drawImage(R,0,0,nt,Dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ct.width+"x"+ct.height+") to ("+nt+"x"+Dt+")."),vt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ct.width+"x"+ct.height+")."),R;return R}function _(R){return R.generateMipmaps&&R.minFilter!==wn&&R.minFilter!==In}function y(R){n.generateMipmap(R)}function P(R,T,W,it,ct=!1){if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let nt=T;if(T===n.RED&&(W===n.FLOAT&&(nt=n.R32F),W===n.HALF_FLOAT&&(nt=n.R16F),W===n.UNSIGNED_BYTE&&(nt=n.R8)),T===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(nt=n.R8UI),W===n.UNSIGNED_SHORT&&(nt=n.R16UI),W===n.UNSIGNED_INT&&(nt=n.R32UI),W===n.BYTE&&(nt=n.R8I),W===n.SHORT&&(nt=n.R16I),W===n.INT&&(nt=n.R32I)),T===n.RG&&(W===n.FLOAT&&(nt=n.RG32F),W===n.HALF_FLOAT&&(nt=n.RG16F),W===n.UNSIGNED_BYTE&&(nt=n.RG8)),T===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(nt=n.RG8UI),W===n.UNSIGNED_SHORT&&(nt=n.RG16UI),W===n.UNSIGNED_INT&&(nt=n.RG32UI),W===n.BYTE&&(nt=n.RG8I),W===n.SHORT&&(nt=n.RG16I),W===n.INT&&(nt=n.RG32I)),T===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(nt=n.RGB8UI),W===n.UNSIGNED_SHORT&&(nt=n.RGB16UI),W===n.UNSIGNED_INT&&(nt=n.RGB32UI),W===n.BYTE&&(nt=n.RGB8I),W===n.SHORT&&(nt=n.RGB16I),W===n.INT&&(nt=n.RGB32I)),T===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(nt=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(nt=n.RGBA16UI),W===n.UNSIGNED_INT&&(nt=n.RGBA32UI),W===n.BYTE&&(nt=n.RGBA8I),W===n.SHORT&&(nt=n.RGBA16I),W===n.INT&&(nt=n.RGBA32I)),T===n.RGB&&W===n.UNSIGNED_INT_5_9_9_9_REV&&(nt=n.RGB9_E5),T===n.RGBA){const Dt=ct?Po:ve.getTransfer(it);W===n.FLOAT&&(nt=n.RGBA32F),W===n.HALF_FLOAT&&(nt=n.RGBA16F),W===n.UNSIGNED_BYTE&&(nt=Dt===Pe?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(nt=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(nt=n.RGB5_A1)}return(nt===n.R16F||nt===n.R32F||nt===n.RG16F||nt===n.RG32F||nt===n.RGBA16F||nt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),nt}function b(R,T){let W;return R?T===null||T===Xi||T===Ns?W=n.DEPTH24_STENCIL8:T===ri?W=n.DEPTH32F_STENCIL8:T===pr&&(W=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Xi||T===Ns?W=n.DEPTH_COMPONENT24:T===ri?W=n.DEPTH_COMPONENT32F:T===pr&&(W=n.DEPTH_COMPONENT16),W}function I(R,T){return _(R)===!0||R.isFramebufferTexture&&R.minFilter!==wn&&R.minFilter!==In?Math.log2(Math.max(T.width,T.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?T.mipmaps.length:1}function z(R){const T=R.target;T.removeEventListener("dispose",z),N(T),T.isVideoTexture&&p.delete(T)}function F(R){const T=R.target;T.removeEventListener("dispose",F),ot(T)}function N(R){const T=i.get(R);if(T.__webglInit===void 0)return;const W=R.source,it=g.get(W);if(it){const ct=it[T.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&X(R),Object.keys(it).length===0&&g.delete(W)}i.remove(R)}function X(R){const T=i.get(R);n.deleteTexture(T.__webglTexture);const W=R.source,it=g.get(W);delete it[T.__cacheKey],c.memory.textures--}function ot(R){const T=i.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(T.__webglFramebuffer[it]))for(let ct=0;ct<T.__webglFramebuffer[it].length;ct++)n.deleteFramebuffer(T.__webglFramebuffer[it][ct]);else n.deleteFramebuffer(T.__webglFramebuffer[it]);T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer[it])}else{if(Array.isArray(T.__webglFramebuffer))for(let it=0;it<T.__webglFramebuffer.length;it++)n.deleteFramebuffer(T.__webglFramebuffer[it]);else n.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&n.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let it=0;it<T.__webglColorRenderbuffer.length;it++)T.__webglColorRenderbuffer[it]&&n.deleteRenderbuffer(T.__webglColorRenderbuffer[it]);T.__webglDepthRenderbuffer&&n.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const W=R.textures;for(let it=0,ct=W.length;it<ct;it++){const nt=i.get(W[it]);nt.__webglTexture&&(n.deleteTexture(nt.__webglTexture),c.memory.textures--),i.remove(W[it])}i.remove(R)}let w=0;function L(){w=0}function Z(){const R=w;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),w+=1,R}function $(R){const T=[];return T.push(R.wrapS),T.push(R.wrapT),T.push(R.wrapR||0),T.push(R.magFilter),T.push(R.minFilter),T.push(R.anisotropy),T.push(R.internalFormat),T.push(R.format),T.push(R.type),T.push(R.generateMipmaps),T.push(R.premultiplyAlpha),T.push(R.flipY),T.push(R.unpackAlignment),T.push(R.colorSpace),T.join()}function Q(R,T){const W=i.get(R);if(R.isVideoTexture&&Xt(R),R.isRenderTargetTexture===!1&&R.version>0&&W.__version!==R.version){const it=R.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ne(W,R,T);return}}e.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+T)}function st(R,T){const W=i.get(R);if(R.version>0&&W.__version!==R.version){ne(W,R,T);return}e.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+T)}function K(R,T){const W=i.get(R);if(R.version>0&&W.__version!==R.version){ne(W,R,T);return}e.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+T)}function lt(R,T){const W=i.get(R);if(R.version>0&&W.__version!==R.version){et(W,R,T);return}e.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+T)}const j={[fl]:n.REPEAT,[zi]:n.CLAMP_TO_EDGE,[dl]:n.MIRRORED_REPEAT},St={[wn]:n.NEAREST,[id]:n.NEAREST_MIPMAP_NEAREST,[Nr]:n.NEAREST_MIPMAP_LINEAR,[In]:n.LINEAR,[sa]:n.LINEAR_MIPMAP_NEAREST,[Hi]:n.LINEAR_MIPMAP_LINEAR},Mt={[ad]:n.NEVER,[dd]:n.ALWAYS,[ld]:n.LESS,[Gu]:n.LEQUAL,[cd]:n.EQUAL,[fd]:n.GEQUAL,[hd]:n.GREATER,[ud]:n.NOTEQUAL};function Lt(R,T){if(T.type===ri&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===In||T.magFilter===sa||T.magFilter===Nr||T.magFilter===Hi||T.minFilter===In||T.minFilter===sa||T.minFilter===Nr||T.minFilter===Hi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,j[T.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,j[T.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,j[T.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,St[T.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,St[T.minFilter]),T.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,Mt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===wn||T.minFilter!==Nr&&T.minFilter!==Hi||T.type===ri&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||i.get(T).__currentAnisotropy){const W=t.get("EXT_texture_filter_anisotropic");n.texParameterf(R,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy}}}function fe(R,T){let W=!1;R.__webglInit===void 0&&(R.__webglInit=!0,T.addEventListener("dispose",z));const it=T.source;let ct=g.get(it);ct===void 0&&(ct={},g.set(it,ct));const nt=$(T);if(nt!==R.__cacheKey){ct[nt]===void 0&&(ct[nt]={texture:n.createTexture(),usedTimes:0},c.memory.textures++,W=!0),ct[nt].usedTimes++;const Dt=ct[R.__cacheKey];Dt!==void 0&&(ct[R.__cacheKey].usedTimes--,Dt.usedTimes===0&&X(T)),R.__cacheKey=nt,R.__webglTexture=ct[nt].texture}return W}function ne(R,T,W){let it=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(it=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&(it=n.TEXTURE_3D);const ct=fe(R,T),nt=T.source;e.bindTexture(it,R.__webglTexture,n.TEXTURE0+W);const Dt=i.get(nt);if(nt.version!==Dt.__version||ct===!0){e.activeTexture(n.TEXTURE0+W);const vt=ve.getPrimaries(ve.workingColorSpace),wt=T.colorSpace===Hn?null:ve.getPrimaries(T.colorSpace),ue=T.colorSpace===Hn||vt===wt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);let ut=S(T.image,!1,r.maxTextureSize);ut=Ee(T,ut);const bt=o.convert(T.format,T.colorSpace),Vt=o.convert(T.type);let Wt=P(T.internalFormat,bt,Vt,T.colorSpace,T.isVideoTexture);Lt(it,T);let Tt;const te=T.mipmaps,$t=T.isVideoTexture!==!0,_e=Dt.__version===void 0||ct===!0,k=nt.dataReady,xt=I(T,ut);if(T.isDepthTexture)Wt=b(T.format===Us,T.type),_e&&($t?e.texStorage2D(n.TEXTURE_2D,1,Wt,ut.width,ut.height):e.texImage2D(n.TEXTURE_2D,0,Wt,ut.width,ut.height,0,bt,Vt,null));else if(T.isDataTexture)if(te.length>0){$t&&_e&&e.texStorage2D(n.TEXTURE_2D,xt,Wt,te[0].width,te[0].height);for(let J=0,rt=te.length;J<rt;J++)Tt=te[J],$t?k&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,Tt.width,Tt.height,bt,Vt,Tt.data):e.texImage2D(n.TEXTURE_2D,J,Wt,Tt.width,Tt.height,0,bt,Vt,Tt.data);T.generateMipmaps=!1}else $t?(_e&&e.texStorage2D(n.TEXTURE_2D,xt,Wt,ut.width,ut.height),k&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ut.width,ut.height,bt,Vt,ut.data)):e.texImage2D(n.TEXTURE_2D,0,Wt,ut.width,ut.height,0,bt,Vt,ut.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){$t&&_e&&e.texStorage3D(n.TEXTURE_2D_ARRAY,xt,Wt,te[0].width,te[0].height,ut.depth);for(let J=0,rt=te.length;J<rt;J++)if(Tt=te[J],T.format!==Rn)if(bt!==null)if($t){if(k)if(T.layerUpdates.size>0){const _t=Ch(Tt.width,Tt.height,T.format,T.type);for(const yt of T.layerUpdates){const le=Tt.data.subarray(yt*_t/Tt.data.BYTES_PER_ELEMENT,(yt+1)*_t/Tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,yt,Tt.width,Tt.height,1,bt,le,0,0)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Tt.width,Tt.height,ut.depth,bt,Tt.data,0,0)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,Wt,Tt.width,Tt.height,ut.depth,0,Tt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $t?k&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Tt.width,Tt.height,ut.depth,bt,Vt,Tt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,J,Wt,Tt.width,Tt.height,ut.depth,0,bt,Vt,Tt.data)}else{$t&&_e&&e.texStorage2D(n.TEXTURE_2D,xt,Wt,te[0].width,te[0].height);for(let J=0,rt=te.length;J<rt;J++)Tt=te[J],T.format!==Rn?bt!==null?$t?k&&e.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,Tt.width,Tt.height,bt,Tt.data):e.compressedTexImage2D(n.TEXTURE_2D,J,Wt,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$t?k&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,Tt.width,Tt.height,bt,Vt,Tt.data):e.texImage2D(n.TEXTURE_2D,J,Wt,Tt.width,Tt.height,0,bt,Vt,Tt.data)}else if(T.isDataArrayTexture)if($t){if(_e&&e.texStorage3D(n.TEXTURE_2D_ARRAY,xt,Wt,ut.width,ut.height,ut.depth),k)if(T.layerUpdates.size>0){const J=Ch(ut.width,ut.height,T.format,T.type);for(const rt of T.layerUpdates){const _t=ut.data.subarray(rt*J/ut.data.BYTES_PER_ELEMENT,(rt+1)*J/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,rt,ut.width,ut.height,1,bt,Vt,_t)}T.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,bt,Vt,ut.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Wt,ut.width,ut.height,ut.depth,0,bt,Vt,ut.data);else if(T.isData3DTexture)$t?(_e&&e.texStorage3D(n.TEXTURE_3D,xt,Wt,ut.width,ut.height,ut.depth),k&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,bt,Vt,ut.data)):e.texImage3D(n.TEXTURE_3D,0,Wt,ut.width,ut.height,ut.depth,0,bt,Vt,ut.data);else if(T.isFramebufferTexture){if(_e)if($t)e.texStorage2D(n.TEXTURE_2D,xt,Wt,ut.width,ut.height);else{let J=ut.width,rt=ut.height;for(let _t=0;_t<xt;_t++)e.texImage2D(n.TEXTURE_2D,_t,Wt,J,rt,0,bt,Vt,null),J>>=1,rt>>=1}}else if(te.length>0){if($t&&_e){const J=Yt(te[0]);e.texStorage2D(n.TEXTURE_2D,xt,Wt,J.width,J.height)}for(let J=0,rt=te.length;J<rt;J++)Tt=te[J],$t?k&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,bt,Vt,Tt):e.texImage2D(n.TEXTURE_2D,J,Wt,bt,Vt,Tt);T.generateMipmaps=!1}else if($t){if(_e){const J=Yt(ut);e.texStorage2D(n.TEXTURE_2D,xt,Wt,J.width,J.height)}k&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,bt,Vt,ut)}else e.texImage2D(n.TEXTURE_2D,0,Wt,bt,Vt,ut);_(T)&&y(it),Dt.__version=nt.version,T.onUpdate&&T.onUpdate(T)}R.__version=T.version}function et(R,T,W){if(T.image.length!==6)return;const it=fe(R,T),ct=T.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+W);const nt=i.get(ct);if(ct.version!==nt.__version||it===!0){e.activeTexture(n.TEXTURE0+W);const Dt=ve.getPrimaries(ve.workingColorSpace),vt=T.colorSpace===Hn?null:ve.getPrimaries(T.colorSpace),wt=T.colorSpace===Hn||Dt===vt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const ue=T.isCompressedTexture||T.image[0].isCompressedTexture,ut=T.image[0]&&T.image[0].isDataTexture,bt=[];for(let rt=0;rt<6;rt++)!ue&&!ut?bt[rt]=S(T.image[rt],!0,r.maxCubemapSize):bt[rt]=ut?T.image[rt].image:T.image[rt],bt[rt]=Ee(T,bt[rt]);const Vt=bt[0],Wt=o.convert(T.format,T.colorSpace),Tt=o.convert(T.type),te=P(T.internalFormat,Wt,Tt,T.colorSpace),$t=T.isVideoTexture!==!0,_e=nt.__version===void 0||it===!0,k=ct.dataReady;let xt=I(T,Vt);Lt(n.TEXTURE_CUBE_MAP,T);let J;if(ue){$t&&_e&&e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,te,Vt.width,Vt.height);for(let rt=0;rt<6;rt++){J=bt[rt].mipmaps;for(let _t=0;_t<J.length;_t++){const yt=J[_t];T.format!==Rn?Wt!==null?$t?k&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,_t,0,0,yt.width,yt.height,Wt,yt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,_t,te,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$t?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,_t,0,0,yt.width,yt.height,Wt,Tt,yt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,_t,te,yt.width,yt.height,0,Wt,Tt,yt.data)}}}else{if(J=T.mipmaps,$t&&_e){J.length>0&&xt++;const rt=Yt(bt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,te,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(ut){$t?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,bt[rt].width,bt[rt].height,Wt,Tt,bt[rt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,te,bt[rt].width,bt[rt].height,0,Wt,Tt,bt[rt].data);for(let _t=0;_t<J.length;_t++){const le=J[_t].image[rt].image;$t?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,_t+1,0,0,le.width,le.height,Wt,Tt,le.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,_t+1,te,le.width,le.height,0,Wt,Tt,le.data)}}else{$t?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,Wt,Tt,bt[rt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,te,Wt,Tt,bt[rt]);for(let _t=0;_t<J.length;_t++){const yt=J[_t];$t?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,_t+1,0,0,Wt,Tt,yt.image[rt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,_t+1,te,Wt,Tt,yt.image[rt])}}}_(T)&&y(n.TEXTURE_CUBE_MAP),nt.__version=ct.version,T.onUpdate&&T.onUpdate(T)}R.__version=T.version}function ht(R,T,W,it,ct,nt){const Dt=o.convert(W.format,W.colorSpace),vt=o.convert(W.type),wt=P(W.internalFormat,Dt,vt,W.colorSpace);if(!i.get(T).__hasExternalTextures){const ut=Math.max(1,T.width>>nt),bt=Math.max(1,T.height>>nt);ct===n.TEXTURE_3D||ct===n.TEXTURE_2D_ARRAY?e.texImage3D(ct,nt,wt,ut,bt,T.depth,0,Dt,vt,null):e.texImage2D(ct,nt,wt,ut,bt,0,Dt,vt,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),he(T)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,it,ct,i.get(W).__webglTexture,0,re(T)):(ct===n.TEXTURE_2D||ct>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,it,ct,i.get(W).__webglTexture,nt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Pt(R,T,W){if(n.bindRenderbuffer(n.RENDERBUFFER,R),T.depthBuffer){const it=T.depthTexture,ct=it&&it.isDepthTexture?it.type:null,nt=b(T.stencilBuffer,ct),Dt=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,vt=re(T);he(T)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,vt,nt,T.width,T.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,vt,nt,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,nt,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Dt,n.RENDERBUFFER,R)}else{const it=T.textures;for(let ct=0;ct<it.length;ct++){const nt=it[ct],Dt=o.convert(nt.format,nt.colorSpace),vt=o.convert(nt.type),wt=P(nt.internalFormat,Dt,vt,nt.colorSpace),ue=re(T);W&&he(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue,wt,T.width,T.height):he(T)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue,wt,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,wt,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Et(R,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),Q(T.depthTexture,0);const it=i.get(T.depthTexture).__webglTexture,ct=re(T);if(T.depthTexture.format===Ps)he(T)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0,ct):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0);else if(T.depthTexture.format===Us)he(T)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0,ct):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function Zt(R){const T=i.get(R),W=R.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==R.depthTexture){const it=R.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),it){const ct=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,it.removeEventListener("dispose",ct)};it.addEventListener("dispose",ct),T.__depthDisposeCallback=ct}T.__boundDepthTexture=it}if(R.depthTexture&&!T.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");Et(T.__webglFramebuffer,R)}else if(W){T.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[it]),T.__webglDepthbuffer[it]===void 0)T.__webglDepthbuffer[it]=n.createRenderbuffer(),Pt(T.__webglDepthbuffer[it],R,!1);else{const ct=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,nt=T.__webglDepthbuffer[it];n.bindRenderbuffer(n.RENDERBUFFER,nt),n.framebufferRenderbuffer(n.FRAMEBUFFER,ct,n.RENDERBUFFER,nt)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=n.createRenderbuffer(),Pt(T.__webglDepthbuffer,R,!1);else{const it=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=T.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ct),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,ct)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ht(R,T,W){const it=i.get(R);T!==void 0&&ht(it.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&Zt(R)}function Kt(R){const T=R.texture,W=i.get(R),it=i.get(T);R.addEventListener("dispose",F);const ct=R.textures,nt=R.isWebGLCubeRenderTarget===!0,Dt=ct.length>1;if(Dt||(it.__webglTexture===void 0&&(it.__webglTexture=n.createTexture()),it.__version=T.version,c.memory.textures++),nt){W.__webglFramebuffer=[];for(let vt=0;vt<6;vt++)if(T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer[vt]=[];for(let wt=0;wt<T.mipmaps.length;wt++)W.__webglFramebuffer[vt][wt]=n.createFramebuffer()}else W.__webglFramebuffer[vt]=n.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer=[];for(let vt=0;vt<T.mipmaps.length;vt++)W.__webglFramebuffer[vt]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(Dt)for(let vt=0,wt=ct.length;vt<wt;vt++){const ue=i.get(ct[vt]);ue.__webglTexture===void 0&&(ue.__webglTexture=n.createTexture(),c.memory.textures++)}if(R.samples>0&&he(R)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let vt=0;vt<ct.length;vt++){const wt=ct[vt];W.__webglColorRenderbuffer[vt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[vt]);const ue=o.convert(wt.format,wt.colorSpace),ut=o.convert(wt.type),bt=P(wt.internalFormat,ue,ut,wt.colorSpace,R.isXRRenderTarget===!0),Vt=re(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Vt,bt,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+vt,n.RENDERBUFFER,W.__webglColorRenderbuffer[vt])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),Pt(W.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(nt){e.bindTexture(n.TEXTURE_CUBE_MAP,it.__webglTexture),Lt(n.TEXTURE_CUBE_MAP,T);for(let vt=0;vt<6;vt++)if(T.mipmaps&&T.mipmaps.length>0)for(let wt=0;wt<T.mipmaps.length;wt++)ht(W.__webglFramebuffer[vt][wt],R,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,wt);else ht(W.__webglFramebuffer[vt],R,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0);_(T)&&y(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Dt){for(let vt=0,wt=ct.length;vt<wt;vt++){const ue=ct[vt],ut=i.get(ue);e.bindTexture(n.TEXTURE_2D,ut.__webglTexture),Lt(n.TEXTURE_2D,ue),ht(W.__webglFramebuffer,R,ue,n.COLOR_ATTACHMENT0+vt,n.TEXTURE_2D,0),_(ue)&&y(n.TEXTURE_2D)}e.unbindTexture()}else{let vt=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(vt=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(vt,it.__webglTexture),Lt(vt,T),T.mipmaps&&T.mipmaps.length>0)for(let wt=0;wt<T.mipmaps.length;wt++)ht(W.__webglFramebuffer[wt],R,T,n.COLOR_ATTACHMENT0,vt,wt);else ht(W.__webglFramebuffer,R,T,n.COLOR_ATTACHMENT0,vt,0);_(T)&&y(vt),e.unbindTexture()}R.depthBuffer&&Zt(R)}function ge(R){const T=R.textures;for(let W=0,it=T.length;W<it;W++){const ct=T[W];if(_(ct)){const nt=R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Dt=i.get(ct).__webglTexture;e.bindTexture(nt,Dt),y(nt),e.unbindTexture()}}}const ae=[],B=[];function sn(R){if(R.samples>0){if(he(R)===!1){const T=R.textures,W=R.width,it=R.height;let ct=n.COLOR_BUFFER_BIT;const nt=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Dt=i.get(R),vt=T.length>1;if(vt)for(let wt=0;wt<T.length;wt++)e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+wt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+wt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let wt=0;wt<T.length;wt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ct|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ct|=n.STENCIL_BUFFER_BIT)),vt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Dt.__webglColorRenderbuffer[wt]);const ue=i.get(T[wt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ue,0)}n.blitFramebuffer(0,0,W,it,0,0,W,it,ct,n.NEAREST),u===!0&&(ae.length=0,B.length=0,ae.push(n.COLOR_ATTACHMENT0+wt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(ae.push(nt),B.push(nt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,B)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ae))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),vt)for(let wt=0;wt<T.length;wt++){e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+wt,n.RENDERBUFFER,Dt.__webglColorRenderbuffer[wt]);const ue=i.get(T[wt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+wt,n.TEXTURE_2D,ue,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&u){const T=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[T])}}}function re(R){return Math.min(r.maxSamples,R.samples)}function he(R){const T=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Xt(R){const T=c.render.frame;p.get(R)!==T&&(p.set(R,T),R.update())}function Ee(R,T){const W=R.colorSpace,it=R.format,ct=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||W!==Ei&&W!==Hn&&(ve.getTransfer(W)===Pe?(it!==Rn||ct!==ci)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),T}function Yt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(f.width=R.naturalWidth||R.width,f.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(f.width=R.displayWidth,f.height=R.displayHeight):(f.width=R.width,f.height=R.height),f}this.allocateTextureUnit=Z,this.resetTextureUnits=L,this.setTexture2D=Q,this.setTexture2DArray=st,this.setTexture3D=K,this.setTextureCube=lt,this.rebindTextures=Ht,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=sn,this.setupDepthRenderbuffer=Zt,this.setupFrameBufferTexture=ht,this.useMultisampledRTT=he}function Rv(n,t){function e(i,r=Hn){let o;const c=ve.getTransfer(r);if(i===ci)return n.UNSIGNED_BYTE;if(i===ac)return n.UNSIGNED_SHORT_4_4_4_4;if(i===lc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Du)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Lu)return n.BYTE;if(i===Ru)return n.SHORT;if(i===pr)return n.UNSIGNED_SHORT;if(i===oc)return n.INT;if(i===Xi)return n.UNSIGNED_INT;if(i===ri)return n.FLOAT;if(i===Mr)return n.HALF_FLOAT;if(i===Nu)return n.ALPHA;if(i===Uu)return n.RGB;if(i===Rn)return n.RGBA;if(i===Ou)return n.LUMINANCE;if(i===Fu)return n.LUMINANCE_ALPHA;if(i===Ps)return n.DEPTH_COMPONENT;if(i===Us)return n.DEPTH_STENCIL;if(i===Bu)return n.RED;if(i===cc)return n.RED_INTEGER;if(i===ku)return n.RG;if(i===hc)return n.RG_INTEGER;if(i===uc)return n.RGBA_INTEGER;if(i===vo||i===_o||i===xo||i===yo)if(c===Pe)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===vo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===_o)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===xo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===yo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===vo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===_o)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===xo)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===yo)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===pl||i===ml||i===gl||i===vl)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===pl)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ml)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===gl)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===vl)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===_l||i===xl||i===yl)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(i===_l||i===xl)return c===Pe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===yl)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Sl||i===Ml||i===El||i===wl||i===bl||i===Tl||i===Al||i===Pl||i===Cl||i===Il||i===Ll||i===Rl||i===Dl||i===Nl)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(i===Sl)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ml)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===El)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===wl)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===bl)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Tl)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Al)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Pl)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Cl)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Il)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ll)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Rl)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Dl)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Nl)return c===Pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===So||i===Ul||i===Ol)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(i===So)return c===Pe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ul)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ol)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===zu||i===Fl||i===Bl||i===kl)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(i===So)return o.COMPRESSED_RED_RGTC1_EXT;if(i===Fl)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Bl)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===kl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ns?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class Dv extends Mn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Dn extends He{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Nv={type:"move"};class Ra{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,o=null,c=null;const l=this._targetRay,u=this._grip,f=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(f&&t.hand){c=!0;for(const S of t.hand.values()){const _=e.getJointPose(S,i),y=this._getHandJoint(f,S);_!==null&&(y.matrix.fromArray(_.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=_.radius),y.visible=_!==null}const p=f.joints["index-finger-tip"],m=f.joints["thumb-tip"],g=p.position.distanceTo(m.position),v=.02,M=.005;f.inputState.pinching&&g>v+M?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!f.inputState.pinching&&g<=v-M&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else u!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,i),o!==null&&(u.matrix.fromArray(o.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,o.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(o.linearVelocity)):u.hasLinearVelocity=!1,o.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(o.angularVelocity)):u.hasAngularVelocity=!1));l!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&o!==null&&(r=o),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(Nv)))}return l!==null&&(l.visible=r!==null),u!==null&&(u.visible=o!==null),f!==null&&(f.visible=c!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Dn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Uv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ov=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Fv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new hn,o=t.properties.get(r);o.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Ye({vertexShader:Uv,fragmentShader:Ov,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Re(new Vo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Bv extends Yi{constructor(t,e){super();const i=this;let r=null,o=1,c=null,l="local-floor",u=1,f=null,p=null,m=null,g=null,v=null,M=null;const S=new Fv,_=e.getContextAttributes();let y=null,P=null;const b=[],I=[],z=new Rt;let F=null;const N=new Mn;N.layers.enable(1),N.viewport=new oe;const X=new Mn;X.layers.enable(2),X.viewport=new oe;const ot=[N,X],w=new Dv;w.layers.enable(1),w.layers.enable(2);let L=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(et){let ht=b[et];return ht===void 0&&(ht=new Ra,b[et]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(et){let ht=b[et];return ht===void 0&&(ht=new Ra,b[et]=ht),ht.getGripSpace()},this.getHand=function(et){let ht=b[et];return ht===void 0&&(ht=new Ra,b[et]=ht),ht.getHandSpace()};function $(et){const ht=I.indexOf(et.inputSource);if(ht===-1)return;const Pt=b[ht];Pt!==void 0&&(Pt.update(et.inputSource,et.frame,f||c),Pt.dispatchEvent({type:et.type,data:et.inputSource}))}function Q(){r.removeEventListener("select",$),r.removeEventListener("selectstart",$),r.removeEventListener("selectend",$),r.removeEventListener("squeeze",$),r.removeEventListener("squeezestart",$),r.removeEventListener("squeezeend",$),r.removeEventListener("end",Q),r.removeEventListener("inputsourceschange",st);for(let et=0;et<b.length;et++){const ht=I[et];ht!==null&&(I[et]=null,b[et].disconnect(ht))}L=null,Z=null,S.reset(),t.setRenderTarget(y),v=null,g=null,m=null,r=null,P=null,ne.stop(),i.isPresenting=!1,t.setPixelRatio(F),t.setSize(z.width,z.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(et){o=et,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(et){l=et,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||c},this.setReferenceSpace=function(et){f=et},this.getBaseLayer=function(){return g!==null?g:v},this.getBinding=function(){return m},this.getFrame=function(){return M},this.getSession=function(){return r},this.setSession=async function(et){if(r=et,r!==null){if(y=t.getRenderTarget(),r.addEventListener("select",$),r.addEventListener("selectstart",$),r.addEventListener("selectend",$),r.addEventListener("squeeze",$),r.addEventListener("squeezestart",$),r.addEventListener("squeezeend",$),r.addEventListener("end",Q),r.addEventListener("inputsourceschange",st),_.xrCompatible!==!0&&await e.makeXRCompatible(),F=t.getPixelRatio(),t.getSize(z),r.renderState.layers===void 0){const ht={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:o};v=new XRWebGLLayer(r,e,ht),r.updateRenderState({baseLayer:v}),t.setPixelRatio(1),t.setSize(v.framebufferWidth,v.framebufferHeight,!1),P=new Vi(v.framebufferWidth,v.framebufferHeight,{format:Rn,type:ci,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let ht=null,Pt=null,Et=null;_.depth&&(Et=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=_.stencil?Us:Ps,Pt=_.stencil?Ns:Xi);const Zt={colorFormat:e.RGBA8,depthFormat:Et,scaleFactor:o};m=new XRWebGLBinding(r,e),g=m.createProjectionLayer(Zt),r.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),P=new Vi(g.textureWidth,g.textureHeight,{format:Rn,type:ci,depthTexture:new e0(g.textureWidth,g.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1})}P.isXRRenderTarget=!0,this.setFoveation(u),f=null,c=await r.requestReferenceSpace(l),ne.setContext(r),ne.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function st(et){for(let ht=0;ht<et.removed.length;ht++){const Pt=et.removed[ht],Et=I.indexOf(Pt);Et>=0&&(I[Et]=null,b[Et].disconnect(Pt))}for(let ht=0;ht<et.added.length;ht++){const Pt=et.added[ht];let Et=I.indexOf(Pt);if(Et===-1){for(let Ht=0;Ht<b.length;Ht++)if(Ht>=I.length){I.push(Pt),Et=Ht;break}else if(I[Ht]===null){I[Ht]=Pt,Et=Ht;break}if(Et===-1)break}const Zt=b[Et];Zt&&Zt.connect(Pt)}}const K=new U,lt=new U;function j(et,ht,Pt){K.setFromMatrixPosition(ht.matrixWorld),lt.setFromMatrixPosition(Pt.matrixWorld);const Et=K.distanceTo(lt),Zt=ht.projectionMatrix.elements,Ht=Pt.projectionMatrix.elements,Kt=Zt[14]/(Zt[10]-1),ge=Zt[14]/(Zt[10]+1),ae=(Zt[9]+1)/Zt[5],B=(Zt[9]-1)/Zt[5],sn=(Zt[8]-1)/Zt[0],re=(Ht[8]+1)/Ht[0],he=Kt*sn,Xt=Kt*re,Ee=Et/(-sn+re),Yt=Ee*-sn;if(ht.matrixWorld.decompose(et.position,et.quaternion,et.scale),et.translateX(Yt),et.translateZ(Ee),et.matrixWorld.compose(et.position,et.quaternion,et.scale),et.matrixWorldInverse.copy(et.matrixWorld).invert(),Zt[10]===-1)et.projectionMatrix.copy(ht.projectionMatrix),et.projectionMatrixInverse.copy(ht.projectionMatrixInverse);else{const R=Kt+Ee,T=ge+Ee,W=he-Yt,it=Xt+(Et-Yt),ct=ae*ge/T*R,nt=B*ge/T*R;et.projectionMatrix.makePerspective(W,it,ct,nt,R,T),et.projectionMatrixInverse.copy(et.projectionMatrix).invert()}}function St(et,ht){ht===null?et.matrixWorld.copy(et.matrix):et.matrixWorld.multiplyMatrices(ht.matrixWorld,et.matrix),et.matrixWorldInverse.copy(et.matrixWorld).invert()}this.updateCamera=function(et){if(r===null)return;let ht=et.near,Pt=et.far;S.texture!==null&&(S.depthNear>0&&(ht=S.depthNear),S.depthFar>0&&(Pt=S.depthFar)),w.near=X.near=N.near=ht,w.far=X.far=N.far=Pt,(L!==w.near||Z!==w.far)&&(r.updateRenderState({depthNear:w.near,depthFar:w.far}),L=w.near,Z=w.far);const Et=et.parent,Zt=w.cameras;St(w,Et);for(let Ht=0;Ht<Zt.length;Ht++)St(Zt[Ht],Et);Zt.length===2?j(w,N,X):w.projectionMatrix.copy(N.projectionMatrix),Mt(et,w,Et)};function Mt(et,ht,Pt){Pt===null?et.matrix.copy(ht.matrixWorld):(et.matrix.copy(Pt.matrixWorld),et.matrix.invert(),et.matrix.multiply(ht.matrixWorld)),et.matrix.decompose(et.position,et.quaternion,et.scale),et.updateMatrixWorld(!0),et.projectionMatrix.copy(ht.projectionMatrix),et.projectionMatrixInverse.copy(ht.projectionMatrixInverse),et.isPerspectiveCamera&&(et.fov=mr*2*Math.atan(1/et.projectionMatrix.elements[5]),et.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(g===null&&v===null))return u},this.setFoveation=function(et){u=et,g!==null&&(g.fixedFoveation=et),v!==null&&v.fixedFoveation!==void 0&&(v.fixedFoveation=et)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(w)};let Lt=null;function fe(et,ht){if(p=ht.getViewerPose(f||c),M=ht,p!==null){const Pt=p.views;v!==null&&(t.setRenderTargetFramebuffer(P,v.framebuffer),t.setRenderTarget(P));let Et=!1;Pt.length!==w.cameras.length&&(w.cameras.length=0,Et=!0);for(let Ht=0;Ht<Pt.length;Ht++){const Kt=Pt[Ht];let ge=null;if(v!==null)ge=v.getViewport(Kt);else{const B=m.getViewSubImage(g,Kt);ge=B.viewport,Ht===0&&(t.setRenderTargetTextures(P,B.colorTexture,g.ignoreDepthValues?void 0:B.depthStencilTexture),t.setRenderTarget(P))}let ae=ot[Ht];ae===void 0&&(ae=new Mn,ae.layers.enable(Ht),ae.viewport=new oe,ot[Ht]=ae),ae.matrix.fromArray(Kt.transform.matrix),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.projectionMatrix.fromArray(Kt.projectionMatrix),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert(),ae.viewport.set(ge.x,ge.y,ge.width,ge.height),Ht===0&&(w.matrix.copy(ae.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),Et===!0&&w.cameras.push(ae)}const Zt=r.enabledFeatures;if(Zt&&Zt.includes("depth-sensing")){const Ht=m.getDepthInformation(Pt[0]);Ht&&Ht.isValid&&Ht.texture&&S.init(t,Ht,r.renderState)}}for(let Pt=0;Pt<b.length;Pt++){const Et=I[Pt],Zt=b[Pt];Et!==null&&Zt!==void 0&&Zt.update(Et,ht,f||c)}Lt&&Lt(et,ht),ht.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ht}),M=null}const ne=new Qu;ne.setAnimationLoop(fe),this.setAnimationLoop=function(et){Lt=et},this.dispose=function(){}}}const Li=new Zn,kv=new Te;function zv(n,t){function e(_,y){_.matrixAutoUpdate===!0&&_.updateMatrix(),y.value.copy(_.matrix)}function i(_,y){y.color.getRGB(_.fogColor.value,Ku(n)),y.isFog?(_.fogNear.value=y.near,_.fogFar.value=y.far):y.isFogExp2&&(_.fogDensity.value=y.density)}function r(_,y,P,b,I){y.isMeshBasicMaterial||y.isMeshLambertMaterial?o(_,y):y.isMeshToonMaterial?(o(_,y),m(_,y)):y.isMeshPhongMaterial?(o(_,y),p(_,y)):y.isMeshStandardMaterial?(o(_,y),g(_,y),y.isMeshPhysicalMaterial&&v(_,y,I)):y.isMeshMatcapMaterial?(o(_,y),M(_,y)):y.isMeshDepthMaterial?o(_,y):y.isMeshDistanceMaterial?(o(_,y),S(_,y)):y.isMeshNormalMaterial?o(_,y):y.isLineBasicMaterial?(c(_,y),y.isLineDashedMaterial&&l(_,y)):y.isPointsMaterial?u(_,y,P,b):y.isSpriteMaterial?f(_,y):y.isShadowMaterial?(_.color.value.copy(y.color),_.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function o(_,y){_.opacity.value=y.opacity,y.color&&_.diffuse.value.copy(y.color),y.emissive&&_.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(_.map.value=y.map,e(y.map,_.mapTransform)),y.alphaMap&&(_.alphaMap.value=y.alphaMap,e(y.alphaMap,_.alphaMapTransform)),y.bumpMap&&(_.bumpMap.value=y.bumpMap,e(y.bumpMap,_.bumpMapTransform),_.bumpScale.value=y.bumpScale,y.side===nn&&(_.bumpScale.value*=-1)),y.normalMap&&(_.normalMap.value=y.normalMap,e(y.normalMap,_.normalMapTransform),_.normalScale.value.copy(y.normalScale),y.side===nn&&_.normalScale.value.negate()),y.displacementMap&&(_.displacementMap.value=y.displacementMap,e(y.displacementMap,_.displacementMapTransform),_.displacementScale.value=y.displacementScale,_.displacementBias.value=y.displacementBias),y.emissiveMap&&(_.emissiveMap.value=y.emissiveMap,e(y.emissiveMap,_.emissiveMapTransform)),y.specularMap&&(_.specularMap.value=y.specularMap,e(y.specularMap,_.specularMapTransform)),y.alphaTest>0&&(_.alphaTest.value=y.alphaTest);const P=t.get(y),b=P.envMap,I=P.envMapRotation;b&&(_.envMap.value=b,Li.copy(I),Li.x*=-1,Li.y*=-1,Li.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),_.envMapRotation.value.setFromMatrix4(kv.makeRotationFromEuler(Li)),_.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=y.reflectivity,_.ior.value=y.ior,_.refractionRatio.value=y.refractionRatio),y.lightMap&&(_.lightMap.value=y.lightMap,_.lightMapIntensity.value=y.lightMapIntensity,e(y.lightMap,_.lightMapTransform)),y.aoMap&&(_.aoMap.value=y.aoMap,_.aoMapIntensity.value=y.aoMapIntensity,e(y.aoMap,_.aoMapTransform))}function c(_,y){_.diffuse.value.copy(y.color),_.opacity.value=y.opacity,y.map&&(_.map.value=y.map,e(y.map,_.mapTransform))}function l(_,y){_.dashSize.value=y.dashSize,_.totalSize.value=y.dashSize+y.gapSize,_.scale.value=y.scale}function u(_,y,P,b){_.diffuse.value.copy(y.color),_.opacity.value=y.opacity,_.size.value=y.size*P,_.scale.value=b*.5,y.map&&(_.map.value=y.map,e(y.map,_.uvTransform)),y.alphaMap&&(_.alphaMap.value=y.alphaMap,e(y.alphaMap,_.alphaMapTransform)),y.alphaTest>0&&(_.alphaTest.value=y.alphaTest)}function f(_,y){_.diffuse.value.copy(y.color),_.opacity.value=y.opacity,_.rotation.value=y.rotation,y.map&&(_.map.value=y.map,e(y.map,_.mapTransform)),y.alphaMap&&(_.alphaMap.value=y.alphaMap,e(y.alphaMap,_.alphaMapTransform)),y.alphaTest>0&&(_.alphaTest.value=y.alphaTest)}function p(_,y){_.specular.value.copy(y.specular),_.shininess.value=Math.max(y.shininess,1e-4)}function m(_,y){y.gradientMap&&(_.gradientMap.value=y.gradientMap)}function g(_,y){_.metalness.value=y.metalness,y.metalnessMap&&(_.metalnessMap.value=y.metalnessMap,e(y.metalnessMap,_.metalnessMapTransform)),_.roughness.value=y.roughness,y.roughnessMap&&(_.roughnessMap.value=y.roughnessMap,e(y.roughnessMap,_.roughnessMapTransform)),y.envMap&&(_.envMapIntensity.value=y.envMapIntensity)}function v(_,y,P){_.ior.value=y.ior,y.sheen>0&&(_.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),_.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(_.sheenColorMap.value=y.sheenColorMap,e(y.sheenColorMap,_.sheenColorMapTransform)),y.sheenRoughnessMap&&(_.sheenRoughnessMap.value=y.sheenRoughnessMap,e(y.sheenRoughnessMap,_.sheenRoughnessMapTransform))),y.clearcoat>0&&(_.clearcoat.value=y.clearcoat,_.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(_.clearcoatMap.value=y.clearcoatMap,e(y.clearcoatMap,_.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,e(y.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(_.clearcoatNormalMap.value=y.clearcoatNormalMap,e(y.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===nn&&_.clearcoatNormalScale.value.negate())),y.dispersion>0&&(_.dispersion.value=y.dispersion),y.iridescence>0&&(_.iridescence.value=y.iridescence,_.iridescenceIOR.value=y.iridescenceIOR,_.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(_.iridescenceMap.value=y.iridescenceMap,e(y.iridescenceMap,_.iridescenceMapTransform)),y.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=y.iridescenceThicknessMap,e(y.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),y.transmission>0&&(_.transmission.value=y.transmission,_.transmissionSamplerMap.value=P.texture,_.transmissionSamplerSize.value.set(P.width,P.height),y.transmissionMap&&(_.transmissionMap.value=y.transmissionMap,e(y.transmissionMap,_.transmissionMapTransform)),_.thickness.value=y.thickness,y.thicknessMap&&(_.thicknessMap.value=y.thicknessMap,e(y.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=y.attenuationDistance,_.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(_.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(_.anisotropyMap.value=y.anisotropyMap,e(y.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=y.specularIntensity,_.specularColor.value.copy(y.specularColor),y.specularColorMap&&(_.specularColorMap.value=y.specularColorMap,e(y.specularColorMap,_.specularColorMapTransform)),y.specularIntensityMap&&(_.specularIntensityMap.value=y.specularIntensityMap,e(y.specularIntensityMap,_.specularIntensityMapTransform))}function M(_,y){y.matcap&&(_.matcap.value=y.matcap)}function S(_,y){const P=t.get(y).light;_.referencePosition.value.setFromMatrixPosition(P.matrixWorld),_.nearDistance.value=P.shadow.camera.near,_.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Hv(n,t,e,i){let r={},o={},c=[];const l=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function u(P,b){const I=b.program;i.uniformBlockBinding(P,I)}function f(P,b){let I=r[P.id];I===void 0&&(M(P),I=p(P),r[P.id]=I,P.addEventListener("dispose",_));const z=b.program;i.updateUBOMapping(P,z);const F=t.render.frame;o[P.id]!==F&&(g(P),o[P.id]=F)}function p(P){const b=m();P.__bindingPointIndex=b;const I=n.createBuffer(),z=P.__size,F=P.usage;return n.bindBuffer(n.UNIFORM_BUFFER,I),n.bufferData(n.UNIFORM_BUFFER,z,F),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,I),I}function m(){for(let P=0;P<l;P++)if(c.indexOf(P)===-1)return c.push(P),P;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(P){const b=r[P.id],I=P.uniforms,z=P.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let F=0,N=I.length;F<N;F++){const X=Array.isArray(I[F])?I[F]:[I[F]];for(let ot=0,w=X.length;ot<w;ot++){const L=X[ot];if(v(L,F,ot,z)===!0){const Z=L.__offset,$=Array.isArray(L.value)?L.value:[L.value];let Q=0;for(let st=0;st<$.length;st++){const K=$[st],lt=S(K);typeof K=="number"||typeof K=="boolean"?(L.__data[0]=K,n.bufferSubData(n.UNIFORM_BUFFER,Z+Q,L.__data)):K.isMatrix3?(L.__data[0]=K.elements[0],L.__data[1]=K.elements[1],L.__data[2]=K.elements[2],L.__data[3]=0,L.__data[4]=K.elements[3],L.__data[5]=K.elements[4],L.__data[6]=K.elements[5],L.__data[7]=0,L.__data[8]=K.elements[6],L.__data[9]=K.elements[7],L.__data[10]=K.elements[8],L.__data[11]=0):(K.toArray(L.__data,Q),Q+=lt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,Z,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function v(P,b,I,z){const F=P.value,N=b+"_"+I;if(z[N]===void 0)return typeof F=="number"||typeof F=="boolean"?z[N]=F:z[N]=F.clone(),!0;{const X=z[N];if(typeof F=="number"||typeof F=="boolean"){if(X!==F)return z[N]=F,!0}else if(X.equals(F)===!1)return X.copy(F),!0}return!1}function M(P){const b=P.uniforms;let I=0;const z=16;for(let N=0,X=b.length;N<X;N++){const ot=Array.isArray(b[N])?b[N]:[b[N]];for(let w=0,L=ot.length;w<L;w++){const Z=ot[w],$=Array.isArray(Z.value)?Z.value:[Z.value];for(let Q=0,st=$.length;Q<st;Q++){const K=$[Q],lt=S(K),j=I%z,St=j%lt.boundary,Mt=j+St;I+=St,Mt!==0&&z-Mt<lt.storage&&(I+=z-Mt),Z.__data=new Float32Array(lt.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=I,I+=lt.storage}}}const F=I%z;return F>0&&(I+=z-F),P.__size=I,P.__cache={},this}function S(P){const b={boundary:0,storage:0};return typeof P=="number"||typeof P=="boolean"?(b.boundary=4,b.storage=4):P.isVector2?(b.boundary=8,b.storage=8):P.isVector3||P.isColor?(b.boundary=16,b.storage=12):P.isVector4?(b.boundary=16,b.storage=16):P.isMatrix3?(b.boundary=48,b.storage=48):P.isMatrix4?(b.boundary=64,b.storage=64):P.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",P),b}function _(P){const b=P.target;b.removeEventListener("dispose",_);const I=c.indexOf(b.__bindingPointIndex);c.splice(I,1),n.deleteBuffer(r[b.id]),delete r[b.id],delete o[b.id]}function y(){for(const P in r)n.deleteBuffer(r[P]);c=[],r={},o={}}return{bind:u,update:f,dispose:y}}class Gv{constructor(t={}){const{canvas:e=Id(),context:i=null,depth:r=!0,stencil:o=!1,alpha:c=!1,antialias:l=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:f=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:m=!1}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=c;const v=new Uint32Array(4),M=new Int32Array(4);let S=null,_=null;const y=[],P=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=zn,this.toneMapping=yi,this.toneMappingExposure=1;const b=this;let I=!1,z=0,F=0,N=null,X=-1,ot=null;const w=new oe,L=new oe;let Z=null;const $=new kt(0);let Q=0,st=e.width,K=e.height,lt=1,j=null,St=null;const Mt=new oe(0,0,st,K),Lt=new oe(0,0,st,K);let fe=!1;const ne=new gc;let et=!1,ht=!1;const Pt=new Te,Et=new Te,Zt=new U,Ht=new oe,Kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ge=!1;function ae(){return N===null?lt:1}let B=i;function sn(C,H){return e.getContext(C,H)}try{const C={alpha:!0,depth:r,stencil:o,antialias:l,premultipliedAlpha:u,preserveDrawingBuffer:f,powerPreference:p,failIfMajorPerformanceCaveat:m};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${sc}`),e.addEventListener("webglcontextlost",rt,!1),e.addEventListener("webglcontextrestored",_t,!1),e.addEventListener("webglcontextcreationerror",yt,!1),B===null){const H="webgl2";if(B=sn(H,C),B===null)throw sn(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let re,he,Xt,Ee,Yt,R,T,W,it,ct,nt,Dt,vt,wt,ue,ut,bt,Vt,Wt,Tt,te,$t,_e,k;function xt(){re=new q1(B),re.init(),$t=new Rv(B,re),he=new H1(B,re,t,$t),Xt=new Cv(B),he.reverseDepthBuffer&&Xt.buffers.depth.setReversed(!0),Ee=new K1(B),Yt=new pv,R=new Lv(B,re,Xt,Yt,he,$t,Ee),T=new X1(b),W=new Y1(b),it=new ip(B),_e=new k1(B,it),ct=new Z1(B,it,Ee,_e),nt=new j1(B,ct,it,Ee),Wt=new J1(B,he,R),ut=new G1(Yt),Dt=new dv(b,T,W,re,he,_e,ut),vt=new zv(b,Yt),wt=new gv,ue=new Mv(re),Vt=new B1(b,T,W,Xt,nt,g,u),bt=new Av(b,nt,he),k=new Hv(B,Ee,he,Xt),Tt=new z1(B,re,Ee),te=new $1(B,re,Ee),Ee.programs=Dt.programs,b.capabilities=he,b.extensions=re,b.properties=Yt,b.renderLists=wt,b.shadowMap=bt,b.state=Xt,b.info=Ee}xt();const J=new Bv(b,B);this.xr=J,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const C=re.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=re.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return lt},this.setPixelRatio=function(C){C!==void 0&&(lt=C,this.setSize(st,K,!1))},this.getSize=function(C){return C.set(st,K)},this.setSize=function(C,H,Y=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}st=C,K=H,e.width=Math.floor(C*lt),e.height=Math.floor(H*lt),Y===!0&&(e.style.width=C+"px",e.style.height=H+"px"),this.setViewport(0,0,C,H)},this.getDrawingBufferSize=function(C){return C.set(st*lt,K*lt).floor()},this.setDrawingBufferSize=function(C,H,Y){st=C,K=H,lt=Y,e.width=Math.floor(C*Y),e.height=Math.floor(H*Y),this.setViewport(0,0,C,H)},this.getCurrentViewport=function(C){return C.copy(w)},this.getViewport=function(C){return C.copy(Mt)},this.setViewport=function(C,H,Y,q){C.isVector4?Mt.set(C.x,C.y,C.z,C.w):Mt.set(C,H,Y,q),Xt.viewport(w.copy(Mt).multiplyScalar(lt).round())},this.getScissor=function(C){return C.copy(Lt)},this.setScissor=function(C,H,Y,q){C.isVector4?Lt.set(C.x,C.y,C.z,C.w):Lt.set(C,H,Y,q),Xt.scissor(L.copy(Lt).multiplyScalar(lt).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(C){Xt.setScissorTest(fe=C)},this.setOpaqueSort=function(C){j=C},this.setTransparentSort=function(C){St=C},this.getClearColor=function(C){return C.copy(Vt.getClearColor())},this.setClearColor=function(){Vt.setClearColor.apply(Vt,arguments)},this.getClearAlpha=function(){return Vt.getClearAlpha()},this.setClearAlpha=function(){Vt.setClearAlpha.apply(Vt,arguments)},this.clear=function(C=!0,H=!0,Y=!0){let q=0;if(C){let G=!1;if(N!==null){const ft=N.texture.format;G=ft===uc||ft===hc||ft===cc}if(G){const ft=N.texture.type,mt=ft===ci||ft===Xi||ft===pr||ft===Ns||ft===ac||ft===lc,At=Vt.getClearColor(),It=Vt.getClearAlpha(),zt=At.r,Gt=At.g,Nt=At.b;mt?(v[0]=zt,v[1]=Gt,v[2]=Nt,v[3]=It,B.clearBufferuiv(B.COLOR,0,v)):(M[0]=zt,M[1]=Gt,M[2]=Nt,M[3]=It,B.clearBufferiv(B.COLOR,0,M))}else q|=B.COLOR_BUFFER_BIT}H&&(q|=B.DEPTH_BUFFER_BIT,B.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),Y&&(q|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",rt,!1),e.removeEventListener("webglcontextrestored",_t,!1),e.removeEventListener("webglcontextcreationerror",yt,!1),wt.dispose(),ue.dispose(),Yt.dispose(),T.dispose(),W.dispose(),nt.dispose(),_e.dispose(),k.dispose(),Dt.dispose(),J.dispose(),J.removeEventListener("sessionstart",Tr),J.removeEventListener("sessionend",Ar),Kn.stop()};function rt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function _t(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const C=Ee.autoReset,H=bt.enabled,Y=bt.autoUpdate,q=bt.needsUpdate,G=bt.type;xt(),Ee.autoReset=C,bt.enabled=H,bt.autoUpdate=Y,bt.needsUpdate=q,bt.type=G}function yt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function le(C){const H=C.target;H.removeEventListener("dispose",le),Oe(H)}function Oe(C){Je(C),Yt.remove(C)}function Je(C){const H=Yt.get(C).programs;H!==void 0&&(H.forEach(function(Y){Dt.releaseProgram(Y)}),C.isShaderMaterial&&Dt.releaseShaderCache(C))}this.renderBufferDirect=function(C,H,Y,q,G,ft){H===null&&(H=Kt);const mt=G.isMesh&&G.matrixWorld.determinant()<0,At=ea(C,H,Y,q,G);Xt.setMaterial(q,mt);let It=Y.index,zt=1;if(q.wireframe===!0){if(It=ct.getWireframeAttribute(Y),It===void 0)return;zt=2}const Gt=Y.drawRange,Nt=Y.attributes.position;let me=Gt.start*zt,we=(Gt.start+Gt.count)*zt;ft!==null&&(me=Math.max(me,ft.start*zt),we=Math.min(we,(ft.start+ft.count)*zt)),It!==null?(me=Math.max(me,0),we=Math.min(we,It.count)):Nt!=null&&(me=Math.max(me,0),we=Math.min(we,Nt.count));const Ie=we-me;if(Ie<0||Ie===1/0)return;_e.setup(G,q,At,Y,It);let rn,qt=Tt;if(It!==null&&(rn=it.get(It),qt=te,qt.setIndex(rn)),G.isMesh)q.wireframe===!0?(Xt.setLineWidth(q.wireframeLinewidth*ae()),qt.setMode(B.LINES)):qt.setMode(B.TRIANGLES);else if(G.isLine){let Ut=q.linewidth;Ut===void 0&&(Ut=1),Xt.setLineWidth(Ut*ae()),G.isLineSegments?qt.setMode(B.LINES):G.isLineLoop?qt.setMode(B.LINE_LOOP):qt.setMode(B.LINE_STRIP)}else G.isPoints?qt.setMode(B.POINTS):G.isSprite&&qt.setMode(B.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)qt.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(re.get("WEBGL_multi_draw"))qt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Ut=G._multiDrawStarts,ke=G._multiDrawCounts,pe=G._multiDrawCount,Ft=It?it.get(It).bytesPerElement:1,Jn=Yt.get(q).currentProgram.getUniforms();for(let on=0;on<pe;on++)Jn.setValue(B,"_gl_DrawID",on),qt.render(Ut[on]/Ft,ke[on])}else if(G.isInstancedMesh)qt.renderInstances(me,Ie,G.count);else if(Y.isInstancedBufferGeometry){const Ut=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,ke=Math.min(Y.instanceCount,Ut);qt.renderInstances(me,Ie,ke)}else qt.render(me,Ie)};function de(C,H,Y){C.transparent===!0&&C.side===xn&&C.forceSinglePass===!1?(C.side=nn,C.needsUpdate=!0,Ki(C,H,Y),C.side=Mi,C.needsUpdate=!0,Ki(C,H,Y),C.side=xn):Ki(C,H,Y)}this.compile=function(C,H,Y=null){Y===null&&(Y=C),_=ue.get(Y),_.init(H),P.push(_),Y.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(_.pushLight(G),G.castShadow&&_.pushShadow(G))}),C!==Y&&C.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(_.pushLight(G),G.castShadow&&_.pushShadow(G))}),_.setupLights();const q=new Set;return C.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const ft=G.material;if(ft)if(Array.isArray(ft))for(let mt=0;mt<ft.length;mt++){const At=ft[mt];de(At,Y,G),q.add(At)}else de(ft,Y,G),q.add(ft)}),P.pop(),_=null,q},this.compileAsync=function(C,H,Y=null){const q=this.compile(C,H,Y);return new Promise(G=>{function ft(){if(q.forEach(function(mt){Yt.get(mt).currentProgram.isReady()&&q.delete(mt)}),q.size===0){G(C);return}setTimeout(ft,10)}re.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let je=null;function bn(C){je&&je(C)}function Tr(){Kn.stop()}function Ar(){Kn.start()}const Kn=new Qu;Kn.setAnimationLoop(bn),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(C){je=C,J.setAnimationLoop(C),C===null?Kn.stop():Kn.start()},J.addEventListener("sessionstart",Tr),J.addEventListener("sessionend",Ar),this.render=function(C,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(H),H=J.getCamera()),C.isScene===!0&&C.onBeforeRender(b,C,H,N),_=ue.get(C,P.length),_.init(H),P.push(_),Et.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),ne.setFromProjectionMatrix(Et),ht=this.localClippingEnabled,et=ut.init(this.clippingPlanes,ht),S=wt.get(C,y.length),S.init(),y.push(S),J.enabled===!0&&J.isPresenting===!0){const ft=b.xr.getDepthSensingMesh();ft!==null&&Hs(ft,H,-1/0,b.sortObjects)}Hs(C,H,0,b.sortObjects),S.finish(),b.sortObjects===!0&&S.sort(j,St),ge=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,ge&&Vt.addToRenderList(S,C),this.info.render.frame++,et===!0&&ut.beginShadows();const Y=_.state.shadowsArray;bt.render(Y,C,H),et===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=S.opaque,G=S.transmissive;if(_.setupLights(),H.isArrayCamera){const ft=H.cameras;if(G.length>0)for(let mt=0,At=ft.length;mt<At;mt++){const It=ft[mt];Cr(q,G,C,It)}ge&&Vt.render(C);for(let mt=0,At=ft.length;mt<At;mt++){const It=ft[mt];Pr(S,C,It,It.viewport)}}else G.length>0&&Cr(q,G,C,H),ge&&Vt.render(C),Pr(S,C,H);N!==null&&(R.updateMultisampleRenderTarget(N),R.updateRenderTargetMipmap(N)),C.isScene===!0&&C.onAfterRender(b,C,H),_e.resetDefaultState(),X=-1,ot=null,P.pop(),P.length>0?(_=P[P.length-1],et===!0&&ut.setGlobalState(b.clippingPlanes,_.state.camera)):_=null,y.pop(),y.length>0?S=y[y.length-1]:S=null};function Hs(C,H,Y,q){if(C.visible===!1)return;if(C.layers.test(H.layers)){if(C.isGroup)Y=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(H);else if(C.isLight)_.pushLight(C),C.castShadow&&_.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||ne.intersectsSprite(C)){q&&Ht.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Et);const mt=nt.update(C),At=C.material;At.visible&&S.push(C,mt,At,Y,Ht.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||ne.intersectsObject(C))){const mt=nt.update(C),At=C.material;if(q&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ht.copy(C.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),Ht.copy(mt.boundingSphere.center)),Ht.applyMatrix4(C.matrixWorld).applyMatrix4(Et)),Array.isArray(At)){const It=mt.groups;for(let zt=0,Gt=It.length;zt<Gt;zt++){const Nt=It[zt],me=At[Nt.materialIndex];me&&me.visible&&S.push(C,mt,me,Y,Ht.z,Nt)}}else At.visible&&S.push(C,mt,At,Y,Ht.z,null)}}const ft=C.children;for(let mt=0,At=ft.length;mt<At;mt++)Hs(ft[mt],H,Y,q)}function Pr(C,H,Y,q){const G=C.opaque,ft=C.transmissive,mt=C.transparent;_.setupLightsView(Y),et===!0&&ut.setGlobalState(b.clippingPlanes,Y),q&&Xt.viewport(w.copy(q)),G.length>0&&$i(G,H,Y),ft.length>0&&$i(ft,H,Y),mt.length>0&&$i(mt,H,Y),Xt.buffers.depth.setTest(!0),Xt.buffers.depth.setMask(!0),Xt.buffers.color.setMask(!0),Xt.setPolygonOffset(!1)}function Cr(C,H,Y,q){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[q.id]===void 0&&(_.state.transmissionRenderTarget[q.id]=new Vi(1,1,{generateMipmaps:!0,type:re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float")?Mr:ci,minFilter:Hi,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ve.workingColorSpace}));const ft=_.state.transmissionRenderTarget[q.id],mt=q.viewport||w;ft.setSize(mt.z,mt.w);const At=b.getRenderTarget();b.setRenderTarget(ft),b.getClearColor($),Q=b.getClearAlpha(),Q<1&&b.setClearColor(16777215,.5),b.clear(),ge&&Vt.render(Y);const It=b.toneMapping;b.toneMapping=yi;const zt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),_.setupLightsView(q),et===!0&&ut.setGlobalState(b.clippingPlanes,q),$i(C,Y,q),R.updateMultisampleRenderTarget(ft),R.updateRenderTargetMipmap(ft),re.has("WEBGL_multisampled_render_to_texture")===!1){let Gt=!1;for(let Nt=0,me=H.length;Nt<me;Nt++){const we=H[Nt],Ie=we.object,rn=we.geometry,qt=we.material,Ut=we.group;if(qt.side===xn&&Ie.layers.test(q.layers)){const ke=qt.side;qt.side=nn,qt.needsUpdate=!0,Ir(Ie,Y,q,rn,qt,Ut),qt.side=ke,qt.needsUpdate=!0,Gt=!0}}Gt===!0&&(R.updateMultisampleRenderTarget(ft),R.updateRenderTargetMipmap(ft))}b.setRenderTarget(At),b.setClearColor($,Q),zt!==void 0&&(q.viewport=zt),b.toneMapping=It}function $i(C,H,Y){const q=H.isScene===!0?H.overrideMaterial:null;for(let G=0,ft=C.length;G<ft;G++){const mt=C[G],At=mt.object,It=mt.geometry,zt=q===null?mt.material:q,Gt=mt.group;At.layers.test(Y.layers)&&Ir(At,H,Y,It,zt,Gt)}}function Ir(C,H,Y,q,G,ft){C.onBeforeRender(b,H,Y,q,G,ft),C.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),G.onBeforeRender(b,H,Y,q,C,ft),G.transparent===!0&&G.side===xn&&G.forceSinglePass===!1?(G.side=nn,G.needsUpdate=!0,b.renderBufferDirect(Y,H,q,G,C,ft),G.side=Mi,G.needsUpdate=!0,b.renderBufferDirect(Y,H,q,G,C,ft),G.side=xn):b.renderBufferDirect(Y,H,q,G,C,ft),C.onAfterRender(b,H,Y,q,G,ft)}function Ki(C,H,Y){H.isScene!==!0&&(H=Kt);const q=Yt.get(C),G=_.state.lights,ft=_.state.shadowsArray,mt=G.state.version,At=Dt.getParameters(C,G.state,ft,H,Y),It=Dt.getProgramCacheKey(At);let zt=q.programs;q.environment=C.isMeshStandardMaterial?H.environment:null,q.fog=H.fog,q.envMap=(C.isMeshStandardMaterial?W:T).get(C.envMap||q.environment),q.envMapRotation=q.environment!==null&&C.envMap===null?H.environmentRotation:C.envMapRotation,zt===void 0&&(C.addEventListener("dispose",le),zt=new Map,q.programs=zt);let Gt=zt.get(It);if(Gt!==void 0){if(q.currentProgram===Gt&&q.lightsStateVersion===mt)return Rr(C,At),Gt}else At.uniforms=Dt.getUniforms(C),C.onBeforeCompile(At,b),Gt=Dt.acquireProgram(At,It),zt.set(It,Gt),q.uniforms=At.uniforms;const Nt=q.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Nt.clippingPlanes=ut.uniform),Rr(C,At),q.needsLights=wi(C),q.lightsStateVersion=mt,q.needsLights&&(Nt.ambientLightColor.value=G.state.ambient,Nt.lightProbe.value=G.state.probe,Nt.directionalLights.value=G.state.directional,Nt.directionalLightShadows.value=G.state.directionalShadow,Nt.spotLights.value=G.state.spot,Nt.spotLightShadows.value=G.state.spotShadow,Nt.rectAreaLights.value=G.state.rectArea,Nt.ltc_1.value=G.state.rectAreaLTC1,Nt.ltc_2.value=G.state.rectAreaLTC2,Nt.pointLights.value=G.state.point,Nt.pointLightShadows.value=G.state.pointShadow,Nt.hemisphereLights.value=G.state.hemi,Nt.directionalShadowMap.value=G.state.directionalShadowMap,Nt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Nt.spotShadowMap.value=G.state.spotShadowMap,Nt.spotLightMatrix.value=G.state.spotLightMatrix,Nt.spotLightMap.value=G.state.spotLightMap,Nt.pointShadowMap.value=G.state.pointShadowMap,Nt.pointShadowMatrix.value=G.state.pointShadowMatrix),q.currentProgram=Gt,q.uniformsList=null,Gt}function Lr(C){if(C.uniformsList===null){const H=C.currentProgram.getUniforms();C.uniformsList=Eo.seqWithValue(H.seq,C.uniforms)}return C.uniformsList}function Rr(C,H){const Y=Yt.get(C);Y.outputColorSpace=H.outputColorSpace,Y.batching=H.batching,Y.batchingColor=H.batchingColor,Y.instancing=H.instancing,Y.instancingColor=H.instancingColor,Y.instancingMorph=H.instancingMorph,Y.skinning=H.skinning,Y.morphTargets=H.morphTargets,Y.morphNormals=H.morphNormals,Y.morphColors=H.morphColors,Y.morphTargetsCount=H.morphTargetsCount,Y.numClippingPlanes=H.numClippingPlanes,Y.numIntersection=H.numClipIntersection,Y.vertexAlphas=H.vertexAlphas,Y.vertexTangents=H.vertexTangents,Y.toneMapping=H.toneMapping}function ea(C,H,Y,q,G){H.isScene!==!0&&(H=Kt),R.resetTextureUnits();const ft=H.fog,mt=q.isMeshStandardMaterial?H.environment:null,At=N===null?b.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Ei,It=(q.isMeshStandardMaterial?W:T).get(q.envMap||mt),zt=q.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Gt=!!Y.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Nt=!!Y.morphAttributes.position,me=!!Y.morphAttributes.normal,we=!!Y.morphAttributes.color;let Ie=yi;q.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Ie=b.toneMapping);const rn=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,qt=rn!==void 0?rn.length:0,Ut=Yt.get(q),ke=_.state.lights;if(et===!0&&(ht===!0||C!==ot)){const a=C===ot&&q.id===X;ut.setState(q,C,a)}let pe=!1;q.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==ke.state.version||Ut.outputColorSpace!==At||G.isBatchedMesh&&Ut.batching===!1||!G.isBatchedMesh&&Ut.batching===!0||G.isBatchedMesh&&Ut.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Ut.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Ut.instancing===!1||!G.isInstancedMesh&&Ut.instancing===!0||G.isSkinnedMesh&&Ut.skinning===!1||!G.isSkinnedMesh&&Ut.skinning===!0||G.isInstancedMesh&&Ut.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ut.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ut.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ut.instancingMorph===!1&&G.morphTexture!==null||Ut.envMap!==It||q.fog===!0&&Ut.fog!==ft||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==ut.numPlanes||Ut.numIntersection!==ut.numIntersection)||Ut.vertexAlphas!==zt||Ut.vertexTangents!==Gt||Ut.morphTargets!==Nt||Ut.morphNormals!==me||Ut.morphColors!==we||Ut.toneMapping!==Ie||Ut.morphTargetsCount!==qt)&&(pe=!0):(pe=!0,Ut.__version=q.version);let Ft=Ut.currentProgram;pe===!0&&(Ft=Ki(q,H,G));let Jn=!1,on=!1,Gs=!1;const De=Ft.getUniforms(),On=Ut.uniforms;if(Xt.useProgram(Ft.program)&&(Jn=!0,on=!0,Gs=!0),q.id!==X&&(X=q.id,on=!0),Jn||ot!==C){he.reverseDepthBuffer?(Pt.copy(C.projectionMatrix),Rd(Pt),Dd(Pt),De.setValue(B,"projectionMatrix",Pt)):De.setValue(B,"projectionMatrix",C.projectionMatrix),De.setValue(B,"viewMatrix",C.matrixWorldInverse);const a=De.map.cameraPosition;a!==void 0&&a.setValue(B,Zt.setFromMatrixPosition(C.matrixWorld)),he.logarithmicDepthBuffer&&De.setValue(B,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&De.setValue(B,"isOrthographic",C.isOrthographicCamera===!0),ot!==C&&(ot=C,on=!0,Gs=!0)}if(G.isSkinnedMesh){De.setOptional(B,G,"bindMatrix"),De.setOptional(B,G,"bindMatrixInverse");const a=G.skeleton;a&&(a.boneTexture===null&&a.computeBoneTexture(),De.setValue(B,"boneTexture",a.boneTexture,R))}G.isBatchedMesh&&(De.setOptional(B,G,"batchingTexture"),De.setValue(B,"batchingTexture",G._matricesTexture,R),De.setOptional(B,G,"batchingIdTexture"),De.setValue(B,"batchingIdTexture",G._indirectTexture,R),De.setOptional(B,G,"batchingColorTexture"),G._colorsTexture!==null&&De.setValue(B,"batchingColorTexture",G._colorsTexture,R));const s=Y.morphAttributes;if((s.position!==void 0||s.normal!==void 0||s.color!==void 0)&&Wt.update(G,Y,Ft),(on||Ut.receiveShadow!==G.receiveShadow)&&(Ut.receiveShadow=G.receiveShadow,De.setValue(B,"receiveShadow",G.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(On.envMap.value=It,On.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&H.environment!==null&&(On.envMapIntensity.value=H.environmentIntensity),on&&(De.setValue(B,"toneMappingExposure",b.toneMappingExposure),Ut.needsLights&&na(On,Gs),ft&&q.fog===!0&&vt.refreshFogUniforms(On,ft),vt.refreshMaterialUniforms(On,q,lt,K,_.state.transmissionRenderTarget[C.id]),Eo.upload(B,Lr(Ut),On,R)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Eo.upload(B,Lr(Ut),On,R),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&De.setValue(B,"center",G.center),De.setValue(B,"modelViewMatrix",G.modelViewMatrix),De.setValue(B,"normalMatrix",G.normalMatrix),De.setValue(B,"modelMatrix",G.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const a=q.uniformsGroups;for(let h=0,d=a.length;h<d;h++){const x=a[h];k.update(x,Ft),k.bind(x,Ft)}}return Ft}function na(C,H){C.ambientLightColor.needsUpdate=H,C.lightProbe.needsUpdate=H,C.directionalLights.needsUpdate=H,C.directionalLightShadows.needsUpdate=H,C.pointLights.needsUpdate=H,C.pointLightShadows.needsUpdate=H,C.spotLights.needsUpdate=H,C.spotLightShadows.needsUpdate=H,C.rectAreaLights.needsUpdate=H,C.hemisphereLights.needsUpdate=H}function wi(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(C,H,Y){Yt.get(C.texture).__webglTexture=H,Yt.get(C.depthTexture).__webglTexture=Y;const q=Yt.get(C);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=Y===void 0,q.__autoAllocateDepthBuffer||re.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,H){const Y=Yt.get(C);Y.__webglFramebuffer=H,Y.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(C,H=0,Y=0){N=C,z=H,F=Y;let q=!0,G=null,ft=!1,mt=!1;if(C){const It=Yt.get(C);if(It.__useDefaultFramebuffer!==void 0)Xt.bindFramebuffer(B.FRAMEBUFFER,null),q=!1;else if(It.__webglFramebuffer===void 0)R.setupRenderTarget(C);else if(It.__hasExternalTextures)R.rebindTextures(C,Yt.get(C.texture).__webglTexture,Yt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Nt=C.depthTexture;if(It.__boundDepthTexture!==Nt){if(Nt!==null&&Yt.has(Nt)&&(C.width!==Nt.image.width||C.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(C)}}const zt=C.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(mt=!0);const Gt=Yt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Gt[H])?G=Gt[H][Y]:G=Gt[H],ft=!0):C.samples>0&&R.useMultisampledRTT(C)===!1?G=Yt.get(C).__webglMultisampledFramebuffer:Array.isArray(Gt)?G=Gt[Y]:G=Gt,w.copy(C.viewport),L.copy(C.scissor),Z=C.scissorTest}else w.copy(Mt).multiplyScalar(lt).floor(),L.copy(Lt).multiplyScalar(lt).floor(),Z=fe;if(Xt.bindFramebuffer(B.FRAMEBUFFER,G)&&q&&Xt.drawBuffers(C,G),Xt.viewport(w),Xt.scissor(L),Xt.setScissorTest(Z),ft){const It=Yt.get(C.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+H,It.__webglTexture,Y)}else if(mt){const It=Yt.get(C.texture),zt=H||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,It.__webglTexture,Y||0,zt)}X=-1},this.readRenderTargetPixels=function(C,H,Y,q,G,ft,mt){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=Yt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&mt!==void 0&&(At=At[mt]),At){Xt.bindFramebuffer(B.FRAMEBUFFER,At);try{const It=C.texture,zt=It.format,Gt=It.type;if(!he.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!he.textureTypeReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=C.width-q&&Y>=0&&Y<=C.height-G&&B.readPixels(H,Y,q,G,$t.convert(zt),$t.convert(Gt),ft)}finally{const It=N!==null?Yt.get(N).__webglFramebuffer:null;Xt.bindFramebuffer(B.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(C,H,Y,q,G,ft,mt){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let At=Yt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&mt!==void 0&&(At=At[mt]),At){const It=C.texture,zt=It.format,Gt=It.type;if(!he.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!he.textureTypeReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=C.width-q&&Y>=0&&Y<=C.height-G){Xt.bindFramebuffer(B.FRAMEBUFFER,At);const Nt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Nt),B.bufferData(B.PIXEL_PACK_BUFFER,ft.byteLength,B.STREAM_READ),B.readPixels(H,Y,q,G,$t.convert(zt),$t.convert(Gt),0);const me=N!==null?Yt.get(N).__webglFramebuffer:null;Xt.bindFramebuffer(B.FRAMEBUFFER,me);const we=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Ld(B,we,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Nt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,ft),B.deleteBuffer(Nt),B.deleteSync(we),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,H=null,Y=0){C.isTexture!==!0&&(Mo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,C=arguments[1]);const q=Math.pow(2,-Y),G=Math.floor(C.image.width*q),ft=Math.floor(C.image.height*q),mt=H!==null?H.x:0,At=H!==null?H.y:0;R.setTexture2D(C,0),B.copyTexSubImage2D(B.TEXTURE_2D,Y,0,0,mt,At,G,ft),Xt.unbindTexture()},this.copyTextureToTexture=function(C,H,Y=null,q=null,G=0){C.isTexture!==!0&&(Mo("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,C=arguments[1],H=arguments[2],G=arguments[3]||0,Y=null);let ft,mt,At,It,zt,Gt;Y!==null?(ft=Y.max.x-Y.min.x,mt=Y.max.y-Y.min.y,At=Y.min.x,It=Y.min.y):(ft=C.image.width,mt=C.image.height,At=0,It=0),q!==null?(zt=q.x,Gt=q.y):(zt=0,Gt=0);const Nt=$t.convert(H.format),me=$t.convert(H.type);R.setTexture2D(H,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,H.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,H.unpackAlignment);const we=B.getParameter(B.UNPACK_ROW_LENGTH),Ie=B.getParameter(B.UNPACK_IMAGE_HEIGHT),rn=B.getParameter(B.UNPACK_SKIP_PIXELS),qt=B.getParameter(B.UNPACK_SKIP_ROWS),Ut=B.getParameter(B.UNPACK_SKIP_IMAGES),ke=C.isCompressedTexture?C.mipmaps[G]:C.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,ke.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ke.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,At),B.pixelStorei(B.UNPACK_SKIP_ROWS,It),C.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,G,zt,Gt,ft,mt,Nt,me,ke.data):C.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,G,zt,Gt,ke.width,ke.height,Nt,ke.data):B.texSubImage2D(B.TEXTURE_2D,G,zt,Gt,ft,mt,Nt,me,ke),B.pixelStorei(B.UNPACK_ROW_LENGTH,we),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Ie),B.pixelStorei(B.UNPACK_SKIP_PIXELS,rn),B.pixelStorei(B.UNPACK_SKIP_ROWS,qt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Ut),G===0&&H.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),Xt.unbindTexture()},this.copyTextureToTexture3D=function(C,H,Y=null,q=null,G=0){C.isTexture!==!0&&(Mo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,q=arguments[1]||null,C=arguments[2],H=arguments[3],G=arguments[4]||0);let ft,mt,At,It,zt,Gt,Nt,me,we;const Ie=C.isCompressedTexture?C.mipmaps[G]:C.image;Y!==null?(ft=Y.max.x-Y.min.x,mt=Y.max.y-Y.min.y,At=Y.max.z-Y.min.z,It=Y.min.x,zt=Y.min.y,Gt=Y.min.z):(ft=Ie.width,mt=Ie.height,At=Ie.depth,It=0,zt=0,Gt=0),q!==null?(Nt=q.x,me=q.y,we=q.z):(Nt=0,me=0,we=0);const rn=$t.convert(H.format),qt=$t.convert(H.type);let Ut;if(H.isData3DTexture)R.setTexture3D(H,0),Ut=B.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)R.setTexture2DArray(H,0),Ut=B.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,H.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,H.unpackAlignment);const ke=B.getParameter(B.UNPACK_ROW_LENGTH),pe=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Ft=B.getParameter(B.UNPACK_SKIP_PIXELS),Jn=B.getParameter(B.UNPACK_SKIP_ROWS),on=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,Ie.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Ie.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,It),B.pixelStorei(B.UNPACK_SKIP_ROWS,zt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Gt),C.isDataTexture||C.isData3DTexture?B.texSubImage3D(Ut,G,Nt,me,we,ft,mt,At,rn,qt,Ie.data):H.isCompressedArrayTexture?B.compressedTexSubImage3D(Ut,G,Nt,me,we,ft,mt,At,rn,Ie.data):B.texSubImage3D(Ut,G,Nt,me,we,ft,mt,At,rn,qt,Ie),B.pixelStorei(B.UNPACK_ROW_LENGTH,ke),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,pe),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Ft),B.pixelStorei(B.UNPACK_SKIP_ROWS,Jn),B.pixelStorei(B.UNPACK_SKIP_IMAGES,on),G===0&&H.generateMipmaps&&B.generateMipmap(Ut),Xt.unbindTexture()},this.initRenderTarget=function(C){Yt.get(C).__webglFramebuffer===void 0&&R.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?R.setTextureCube(C,0):C.isData3DTexture?R.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?R.setTexture2DArray(C,0):R.setTexture2D(C,0),Xt.unbindTexture()},this.resetState=function(){z=0,F=0,N=null,Xt.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===fc?"display-p3":"srgb",e.unpackColorSpace=ve.workingColorSpace===Go?"display-p3":"srgb"}}class Xv extends He{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zn,this.environmentIntensity=1,this.environmentRotation=new Zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class o0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=zl,this.updateRanges=[],this.version=0,this.uuid=li()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let r=0,o=this.stride;r<o;r++)this.array[t+r]=e.array[i+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=li()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=li()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const an=new U;class Xn{constructor(t,e,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)an.fromBufferAttribute(this,e),an.applyMatrix4(t),this.setXYZ(e,an.x,an.y,an.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)an.fromBufferAttribute(this,e),an.applyNormalMatrix(t),this.setXYZ(e,an.x,an.y,an.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)an.fromBufferAttribute(this,e),an.transformDirection(t),this.setXYZ(e,an.x,an.y,an.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Ln(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=xe(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Ln(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Ln(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Ln(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Ln(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array),r=xe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,e,i,r,o){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),i=xe(i,this.array),r=xe(r,this.array),o=xe(o,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=o,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[r+o])}return new Nn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Xn(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[r+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class a0 extends Zi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new kt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ps;const Ks=new U,ms=new U,gs=new U,vs=new Rt,Js=new Rt,l0=new Te,eo=new U,js=new U,no=new U,Ih=new Rt,Da=new Rt,Lh=new Rt;class Vv extends He{constructor(t=new a0){if(super(),this.isSprite=!0,this.type="Sprite",ps===void 0){ps=new Be;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new o0(e,5);ps.setIndex([0,1,2,0,2,3]),ps.setAttribute("position",new Xn(i,3,0,!1)),ps.setAttribute("uv",new Xn(i,2,3,!1))}this.geometry=ps,this.material=t,this.center=new Rt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ms.setFromMatrixScale(this.matrixWorld),l0.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),gs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ms.multiplyScalar(-gs.z);const i=this.material.rotation;let r,o;i!==0&&(o=Math.cos(i),r=Math.sin(i));const c=this.center;io(eo.set(-.5,-.5,0),gs,c,ms,r,o),io(js.set(.5,-.5,0),gs,c,ms,r,o),io(no.set(.5,.5,0),gs,c,ms,r,o),Ih.set(0,0),Da.set(1,0),Lh.set(1,1);let l=t.ray.intersectTriangle(eo,js,no,!1,Ks);if(l===null&&(io(js.set(-.5,.5,0),gs,c,ms,r,o),Da.set(0,1),l=t.ray.intersectTriangle(eo,no,js,!1,Ks),l===null))return;const u=t.ray.origin.distanceTo(Ks);u<t.near||u>t.far||e.push({distance:u,point:Ks.clone(),uv:En.getInterpolation(Ks,eo,js,no,Ih,Da,Lh,new Rt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function io(n,t,e,i,r,o){vs.subVectors(n,e).addScalar(.5).multiply(i),r!==void 0?(Js.x=o*vs.x-r*vs.y,Js.y=r*vs.x+o*vs.y):Js.copy(vs),n.copy(t),n.x+=Js.x,n.y+=Js.y,n.applyMatrix4(l0)}class c0 extends Zi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ro=new U,Do=new U,Rh=new Te,Qs=new Xo,so=new qi,Na=new U,Dh=new U;class Wv extends He{constructor(t=new Be,e=new c0){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let r=1,o=e.count;r<o;r++)Ro.fromBufferAttribute(e,r-1),Do.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=Ro.distanceTo(Do);t.setAttribute("lineDistance",new se(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,o=t.params.Line.threshold,c=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),so.copy(i.boundingSphere),so.applyMatrix4(r),so.radius+=o,t.ray.intersectsSphere(so)===!1)return;Rh.copy(r).invert(),Qs.copy(t.ray).applyMatrix4(Rh);const l=o/((this.scale.x+this.scale.y+this.scale.z)/3),u=l*l,f=this.isLineSegments?2:1,p=i.index,g=i.attributes.position;if(p!==null){const v=Math.max(0,c.start),M=Math.min(p.count,c.start+c.count);for(let S=v,_=M-1;S<_;S+=f){const y=p.getX(S),P=p.getX(S+1),b=ro(this,t,Qs,u,y,P);b&&e.push(b)}if(this.isLineLoop){const S=p.getX(M-1),_=p.getX(v),y=ro(this,t,Qs,u,S,_);y&&e.push(y)}}else{const v=Math.max(0,c.start),M=Math.min(g.count,c.start+c.count);for(let S=v,_=M-1;S<_;S+=f){const y=ro(this,t,Qs,u,S,S+1);y&&e.push(y)}if(this.isLineLoop){const S=ro(this,t,Qs,u,M-1,v);S&&e.push(S)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,c=r.length;o<c;o++){const l=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}}function ro(n,t,e,i,r,o){const c=n.geometry.attributes.position;if(Ro.fromBufferAttribute(c,r),Do.fromBufferAttribute(c,o),e.distanceSqToSegment(Ro,Do,Na,Dh)>i)return;Na.applyMatrix4(n.matrixWorld);const u=t.ray.origin.distanceTo(Na);if(!(u<t.near||u>t.far))return{distance:u,point:Dh.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const Nh=new U,Uh=new U;class Yv extends Wv{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let r=0,o=e.count;r<o;r+=2)Nh.fromBufferAttribute(e,r),Uh.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Nh.distanceTo(Uh);t.setAttribute("lineDistance",new se(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _c extends Be{constructor(t=[new Rt(0,-.5),new Rt(.5,0),new Rt(0,.5)],e=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:r},e=Math.floor(e),r=We(r,0,Math.PI*2);const o=[],c=[],l=[],u=[],f=[],p=1/e,m=new U,g=new Rt,v=new U,M=new U,S=new U;let _=0,y=0;for(let P=0;P<=t.length-1;P++)switch(P){case 0:_=t[P+1].x-t[P].x,y=t[P+1].y-t[P].y,v.x=y*1,v.y=-_,v.z=y*0,S.copy(v),v.normalize(),u.push(v.x,v.y,v.z);break;case t.length-1:u.push(S.x,S.y,S.z);break;default:_=t[P+1].x-t[P].x,y=t[P+1].y-t[P].y,v.x=y*1,v.y=-_,v.z=y*0,M.copy(v),v.x+=S.x,v.y+=S.y,v.z+=S.z,v.normalize(),u.push(v.x,v.y,v.z),S.copy(M)}for(let P=0;P<=e;P++){const b=i+P*p*r,I=Math.sin(b),z=Math.cos(b);for(let F=0;F<=t.length-1;F++){m.x=t[F].x*I,m.y=t[F].y,m.z=t[F].x*z,c.push(m.x,m.y,m.z),g.x=P/e,g.y=F/(t.length-1),l.push(g.x,g.y);const N=u[3*F+0]*I,X=u[3*F+1],ot=u[3*F+0]*z;f.push(N,X,ot)}}for(let P=0;P<e;P++)for(let b=0;b<t.length-1;b++){const I=b+P*t.length,z=I,F=I+t.length,N=I+t.length+1,X=I+1;o.push(z,F,X),o.push(N,X,F)}this.setIndex(o),this.setAttribute("position",new se(c,3)),this.setAttribute("uv",new se(l,2)),this.setAttribute("normal",new se(f,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _c(t.points,t.segments,t.phiStart,t.phiLength)}}class xc extends Be{constructor(t=1,e=1,i=1,r=32,o=1,c=!1,l=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:r,heightSegments:o,openEnded:c,thetaStart:l,thetaLength:u};const f=this;r=Math.floor(r),o=Math.floor(o);const p=[],m=[],g=[],v=[];let M=0;const S=[],_=i/2;let y=0;P(),c===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(p),this.setAttribute("position",new se(m,3)),this.setAttribute("normal",new se(g,3)),this.setAttribute("uv",new se(v,2));function P(){const I=new U,z=new U;let F=0;const N=(e-t)/i;for(let X=0;X<=o;X++){const ot=[],w=X/o,L=w*(e-t)+t;for(let Z=0;Z<=r;Z++){const $=Z/r,Q=$*u+l,st=Math.sin(Q),K=Math.cos(Q);z.x=L*st,z.y=-w*i+_,z.z=L*K,m.push(z.x,z.y,z.z),I.set(st,N,K).normalize(),g.push(I.x,I.y,I.z),v.push($,1-w),ot.push(M++)}S.push(ot)}for(let X=0;X<r;X++)for(let ot=0;ot<o;ot++){const w=S[ot][X],L=S[ot+1][X],Z=S[ot+1][X+1],$=S[ot][X+1];t>0&&(p.push(w,L,$),F+=3),e>0&&(p.push(L,Z,$),F+=3)}f.addGroup(y,F,0),y+=F}function b(I){const z=M,F=new Rt,N=new U;let X=0;const ot=I===!0?t:e,w=I===!0?1:-1;for(let Z=1;Z<=r;Z++)m.push(0,_*w,0),g.push(0,w,0),v.push(.5,.5),M++;const L=M;for(let Z=0;Z<=r;Z++){const Q=Z/r*u+l,st=Math.cos(Q),K=Math.sin(Q);N.x=ot*K,N.y=_*w,N.z=ot*st,m.push(N.x,N.y,N.z),g.push(0,w,0),F.x=st*.5+.5,F.y=K*.5*w+.5,v.push(F.x,F.y),M++}for(let Z=0;Z<r;Z++){const $=z+Z,Q=L+Z;I===!0?p.push(Q,Q+1,$):p.push(Q+1,Q,$),X+=3}f.addGroup(y,X,I===!0?1:2),y+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xc(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const qv={triangulate:function(n,t,e=2){const i=t&&t.length,r=i?t[0]*e:n.length;let o=h0(n,0,r,e,!0);const c=[];if(!o||o.next===o.prev)return c;let l,u,f,p,m,g,v;if(i&&(o=jv(n,t,o,e)),n.length>80*e){l=f=n[0],u=p=n[1];for(let M=e;M<r;M+=e)m=n[M],g=n[M+1],m<l&&(l=m),g<u&&(u=g),m>f&&(f=m),g>p&&(p=g);v=Math.max(f-l,p-u),v=v!==0?32767/v:0}return vr(o,c,e,l,u,v,0),c}};function h0(n,t,e,i,r){let o,c;if(r===c_(n,t,e,i)>0)for(o=t;o<e;o+=i)c=Oh(o,n[o],n[o+1],c);else for(o=e-i;o>=t;o-=i)c=Oh(o,n[o],n[o+1],c);return c&&Yo(c,c.next)&&(xr(c),c=c.next),c}function Wi(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Yo(e,e.next)||Ue(e.prev,e,e.next)===0)){if(xr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function vr(n,t,e,i,r,o,c){if(!n)return;!c&&o&&i_(n,i,r,o);let l=n,u,f;for(;n.prev!==n.next;){if(u=n.prev,f=n.next,o?$v(n,i,r,o):Zv(n)){t.push(u.i/e|0),t.push(n.i/e|0),t.push(f.i/e|0),xr(n),n=f.next,l=f.next;continue}if(n=f,n===l){c?c===1?(n=Kv(Wi(n),t,e),vr(n,t,e,i,r,o,2)):c===2&&Jv(n,t,e,i,r,o):vr(Wi(n),t,e,i,r,o,1);break}}}function Zv(n){const t=n.prev,e=n,i=n.next;if(Ue(t,e,i)>=0)return!1;const r=t.x,o=e.x,c=i.x,l=t.y,u=e.y,f=i.y,p=r<o?r<c?r:c:o<c?o:c,m=l<u?l<f?l:f:u<f?u:f,g=r>o?r>c?r:c:o>c?o:c,v=l>u?l>f?l:f:u>f?u:f;let M=i.next;for(;M!==t;){if(M.x>=p&&M.x<=g&&M.y>=m&&M.y<=v&&Ms(r,l,o,u,c,f,M.x,M.y)&&Ue(M.prev,M,M.next)>=0)return!1;M=M.next}return!0}function $v(n,t,e,i){const r=n.prev,o=n,c=n.next;if(Ue(r,o,c)>=0)return!1;const l=r.x,u=o.x,f=c.x,p=r.y,m=o.y,g=c.y,v=l<u?l<f?l:f:u<f?u:f,M=p<m?p<g?p:g:m<g?m:g,S=l>u?l>f?l:f:u>f?u:f,_=p>m?p>g?p:g:m>g?m:g,y=Gl(v,M,t,e,i),P=Gl(S,_,t,e,i);let b=n.prevZ,I=n.nextZ;for(;b&&b.z>=y&&I&&I.z<=P;){if(b.x>=v&&b.x<=S&&b.y>=M&&b.y<=_&&b!==r&&b!==c&&Ms(l,p,u,m,f,g,b.x,b.y)&&Ue(b.prev,b,b.next)>=0||(b=b.prevZ,I.x>=v&&I.x<=S&&I.y>=M&&I.y<=_&&I!==r&&I!==c&&Ms(l,p,u,m,f,g,I.x,I.y)&&Ue(I.prev,I,I.next)>=0))return!1;I=I.nextZ}for(;b&&b.z>=y;){if(b.x>=v&&b.x<=S&&b.y>=M&&b.y<=_&&b!==r&&b!==c&&Ms(l,p,u,m,f,g,b.x,b.y)&&Ue(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;I&&I.z<=P;){if(I.x>=v&&I.x<=S&&I.y>=M&&I.y<=_&&I!==r&&I!==c&&Ms(l,p,u,m,f,g,I.x,I.y)&&Ue(I.prev,I,I.next)>=0)return!1;I=I.nextZ}return!0}function Kv(n,t,e){let i=n;do{const r=i.prev,o=i.next.next;!Yo(r,o)&&u0(r,i,i.next,o)&&_r(r,o)&&_r(o,r)&&(t.push(r.i/e|0),t.push(i.i/e|0),t.push(o.i/e|0),xr(i),xr(i.next),i=n=o),i=i.next}while(i!==n);return Wi(i)}function Jv(n,t,e,i,r,o){let c=n;do{let l=c.next.next;for(;l!==c.prev;){if(c.i!==l.i&&o_(c,l)){let u=f0(c,l);c=Wi(c,c.next),u=Wi(u,u.next),vr(c,t,e,i,r,o,0),vr(u,t,e,i,r,o,0);return}l=l.next}c=c.next}while(c!==n)}function jv(n,t,e,i){const r=[];let o,c,l,u,f;for(o=0,c=t.length;o<c;o++)l=t[o]*i,u=o<c-1?t[o+1]*i:n.length,f=h0(n,l,u,i,!1),f===f.next&&(f.steiner=!0),r.push(r_(f));for(r.sort(Qv),o=0;o<r.length;o++)e=t_(r[o],e);return e}function Qv(n,t){return n.x-t.x}function t_(n,t){const e=e_(n,t);if(!e)return t;const i=f0(e,n);return Wi(i,i.next),Wi(e,e.next)}function e_(n,t){let e=t,i=-1/0,r;const o=n.x,c=n.y;do{if(c<=e.y&&c>=e.next.y&&e.next.y!==e.y){const g=e.x+(c-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(g<=o&&g>i&&(i=g,r=e.x<e.next.x?e:e.next,g===o))return r}e=e.next}while(e!==t);if(!r)return null;const l=r,u=r.x,f=r.y;let p=1/0,m;e=r;do o>=e.x&&e.x>=u&&o!==e.x&&Ms(c<f?o:i,c,u,f,c<f?i:o,c,e.x,e.y)&&(m=Math.abs(c-e.y)/(o-e.x),_r(e,n)&&(m<p||m===p&&(e.x>r.x||e.x===r.x&&n_(r,e)))&&(r=e,p=m)),e=e.next;while(e!==l);return r}function n_(n,t){return Ue(n.prev,n,t.prev)<0&&Ue(t.next,n,n.next)<0}function i_(n,t,e,i){let r=n;do r.z===0&&(r.z=Gl(r.x,r.y,t,e,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,s_(r)}function s_(n){let t,e,i,r,o,c,l,u,f=1;do{for(e=n,n=null,o=null,c=0;e;){for(c++,i=e,l=0,t=0;t<f&&(l++,i=i.nextZ,!!i);t++);for(u=f;l>0||u>0&&i;)l!==0&&(u===0||!i||e.z<=i.z)?(r=e,e=e.nextZ,l--):(r=i,i=i.nextZ,u--),o?o.nextZ=r:n=r,r.prevZ=o,o=r;e=i}o.nextZ=null,f*=2}while(c>1);return n}function Gl(n,t,e,i,r){return n=(n-e)*r|0,t=(t-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function r_(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Ms(n,t,e,i,r,o,c,l){return(r-c)*(t-l)>=(n-c)*(o-l)&&(n-c)*(i-l)>=(e-c)*(t-l)&&(e-c)*(o-l)>=(r-c)*(i-l)}function o_(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!a_(n,t)&&(_r(n,t)&&_r(t,n)&&l_(n,t)&&(Ue(n.prev,n,t.prev)||Ue(n,t.prev,t))||Yo(n,t)&&Ue(n.prev,n,n.next)>0&&Ue(t.prev,t,t.next)>0)}function Ue(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Yo(n,t){return n.x===t.x&&n.y===t.y}function u0(n,t,e,i){const r=ao(Ue(n,t,e)),o=ao(Ue(n,t,i)),c=ao(Ue(e,i,n)),l=ao(Ue(e,i,t));return!!(r!==o&&c!==l||r===0&&oo(n,e,t)||o===0&&oo(n,i,t)||c===0&&oo(e,n,i)||l===0&&oo(e,t,i))}function oo(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function ao(n){return n>0?1:n<0?-1:0}function a_(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&u0(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function _r(n,t){return Ue(n.prev,n,n.next)<0?Ue(n,t,n.next)>=0&&Ue(n,n.prev,t)>=0:Ue(n,t,n.prev)<0||Ue(n,n.next,t)<0}function l_(n,t){let e=n,i=!1;const r=(n.x+t.x)/2,o=(n.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&r<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function f0(n,t){const e=new Xl(n.i,n.x,n.y),i=new Xl(t.i,t.x,t.y),r=n.next,o=t.prev;return n.next=t,t.prev=n,e.next=r,r.prev=e,i.next=e,e.prev=i,o.next=i,i.prev=o,i}function Oh(n,t,e,i){const r=new Xl(n,t,e);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function xr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Xl(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function c_(n,t,e,i){let r=0;for(let o=t,c=e-i;o<e;o+=i)r+=(n[c]-n[o])*(n[o+1]+n[c+1]),c=o;return r}class yc{static area(t){const e=t.length;let i=0;for(let r=e-1,o=0;o<e;r=o++)i+=t[r].x*t[o].y-t[o].x*t[r].y;return i*.5}static isClockWise(t){return yc.area(t)<0}static triangulateShape(t,e){const i=[],r=[],o=[];Fh(t),Bh(i,t);let c=t.length;e.forEach(Fh);for(let u=0;u<e.length;u++)r.push(c),c+=e[u].length,Bh(i,e[u]);const l=qv.triangulate(i,r);for(let u=0;u<l.length;u+=3)o.push(l.slice(u,u+3));return o}}function Fh(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Bh(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class qo extends Be{constructor(t=1,e=32,i=16,r=0,o=Math.PI*2,c=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:r,phiLength:o,thetaStart:c,thetaLength:l},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const u=Math.min(c+l,Math.PI);let f=0;const p=[],m=new U,g=new U,v=[],M=[],S=[],_=[];for(let y=0;y<=i;y++){const P=[],b=y/i;let I=0;y===0&&c===0?I=.5/e:y===i&&u===Math.PI&&(I=-.5/e);for(let z=0;z<=e;z++){const F=z/e;m.x=-t*Math.cos(r+F*o)*Math.sin(c+b*l),m.y=t*Math.cos(c+b*l),m.z=t*Math.sin(r+F*o)*Math.sin(c+b*l),M.push(m.x,m.y,m.z),g.copy(m).normalize(),S.push(g.x,g.y,g.z),_.push(F+I,1-b),P.push(f++)}p.push(P)}for(let y=0;y<i;y++)for(let P=0;P<e;P++){const b=p[y][P+1],I=p[y][P],z=p[y+1][P],F=p[y+1][P+1];(y!==0||c>0)&&v.push(b,I,F),(y!==i-1||u<Math.PI)&&v.push(I,z,F)}this.setIndex(v),this.setAttribute("position",new se(M,3)),this.setAttribute("normal",new se(S,3)),this.setAttribute("uv",new se(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qo(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class h_ extends Be{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],i=new Set,r=new U,o=new U;if(t.index!==null){const c=t.attributes.position,l=t.index;let u=t.groups;u.length===0&&(u=[{start:0,count:l.count,materialIndex:0}]);for(let f=0,p=u.length;f<p;++f){const m=u[f],g=m.start,v=m.count;for(let M=g,S=g+v;M<S;M+=3)for(let _=0;_<3;_++){const y=l.getX(M+_),P=l.getX(M+(_+1)%3);r.fromBufferAttribute(c,y),o.fromBufferAttribute(c,P),kh(r,o,i)===!0&&(e.push(r.x,r.y,r.z),e.push(o.x,o.y,o.z))}}}else{const c=t.attributes.position;for(let l=0,u=c.count/3;l<u;l++)for(let f=0;f<3;f++){const p=3*l+f,m=3*l+(f+1)%3;r.fromBufferAttribute(c,p),o.fromBufferAttribute(c,m),kh(r,o,i)===!0&&(e.push(r.x,r.y,r.z),e.push(o.x,o.y,o.z))}}this.setAttribute("position",new se(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function kh(n,t,e){const i=`${n.x},${n.y},${n.z}-${t.x},${t.y},${t.z}`,r=`${t.x},${t.y},${t.z}-${n.x},${n.y},${n.z}`;return e.has(i)===!0||e.has(r)===!0?!1:(e.add(i),e.add(r),!0)}class zh extends Zi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hu,this.normalScale=new Rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.combine=rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Hh={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(this.files[n]=t)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class u_{constructor(t,e,i){const r=this;let o=!1,c=0,l=0,u;const f=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(p){l++,o===!1&&r.onStart!==void 0&&r.onStart(p,c,l),o=!0},this.itemEnd=function(p){c++,r.onProgress!==void 0&&r.onProgress(p,c,l),c===l&&(o=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(p){r.onError!==void 0&&r.onError(p)},this.resolveURL=function(p){return u?u(p):p},this.setURLModifier=function(p){return u=p,this},this.addHandler=function(p,m){return f.push(p,m),this},this.removeHandler=function(p){const m=f.indexOf(p);return m!==-1&&f.splice(m,2),this},this.getHandler=function(p){for(let m=0,g=f.length;m<g;m+=2){const v=f[m],M=f[m+1];if(v.global&&(v.lastIndex=0),v.test(p))return M}return null}}}const f_=new u_;class Sc{constructor(t){this.manager=t!==void 0?t:f_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const i=this;return new Promise(function(r,o){i.load(t,r,e,o)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Sc.DEFAULT_MATERIAL_NAME="__DEFAULT";class d_ extends Sc{constructor(t){super(t)}load(t,e,i,r){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const o=this,c=Hh.get(t);if(c!==void 0)return o.manager.itemStart(t),setTimeout(function(){e&&e(c),o.manager.itemEnd(t)},0),c;const l=gr("img");function u(){p(),Hh.add(t,this),e&&e(this),o.manager.itemEnd(t)}function f(m){p(),r&&r(m),o.manager.itemError(t),o.manager.itemEnd(t)}function p(){l.removeEventListener("load",u,!1),l.removeEventListener("error",f,!1)}return l.addEventListener("load",u,!1),l.addEventListener("error",f,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(l.crossOrigin=this.crossOrigin),o.manager.itemStart(t),l.src=t,l}}class d0 extends Sc{constructor(t){super(t)}load(t,e,i,r){const o=new hn,c=new d_(this.manager);return c.setCrossOrigin(this.crossOrigin),c.setPath(this.path),c.load(t,function(l){o.image=l,o.needsUpdate=!0,e!==void 0&&e(o)},i,r),o}}class p0 extends He{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class p_ extends p0{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(He.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ua=new Te,Gh=new U,Xh=new U;class m_{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Rt(512,512),this.map=null,this.mapPass=null,this.matrix=new Te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gc,this._frameExtents=new Rt(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Gh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Gh),Xh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Xh),e.updateMatrixWorld(),Ua.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ua),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ua)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class g_ extends m_{constructor(){super(new t0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class v_ extends p0{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(He.DEFAULT_UP),this.updateMatrix(),this.target=new He,this.shadow=new g_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class __ extends Be{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Vl extends o0{constructor(t,e,i=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const Vh=new Te;class x_{constructor(t,e,i=0,r=1/0){this.ray=new Xo(t,e),this.near=i,this.far=r,this.camera=null,this.layers=new pc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Vh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Vh),this}intersectObject(t,e=!0,i=[]){return Wl(t,this,i,e),i.sort(Wh),i}intersectObjects(t,e=!0,i=[]){for(let r=0,o=t.length;r<o;r++)Wl(t[r],this,i,e);return i.sort(Wh),i}}function Wh(n,t){return n.distance-t.distance}function Wl(n,t,e,i){let r=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(r=!1),r===!0&&i===!0){const o=n.children;for(let c=0,l=o.length;c<l;c++)Wl(o[c],t,e,!0)}}class Yh{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(We(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const qh=new U,lo=new U;class y_{constructor(t=new U,e=new U){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){qh.subVectors(t,this.start),lo.subVectors(this.end,this.start);const i=lo.dot(lo);let o=lo.dot(qh)/i;return e&&(o=We(o,0,1)),o}closestPointToPoint(t,e,i){const r=this.closestPointToPointParameter(t,e);return this.delta(i).multiplyScalar(r).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class Zh extends Yv{constructor(t=10,e=10,i=4473924,r=8947848){i=new kt(i),r=new kt(r);const o=e/2,c=t/e,l=t/2,u=[],f=[];for(let g=0,v=0,M=-l;g<=e;g++,M+=c){u.push(-l,0,M,l,0,M),u.push(M,0,-l,M,0,l);const S=g===o?i:r;S.toArray(f,v),v+=3,S.toArray(f,v),v+=3,S.toArray(f,v),v+=3,S.toArray(f,v),v+=3}const p=new Be;p.setAttribute("position",new se(u,3)),p.setAttribute("color",new se(f,3));const m=new c0({vertexColors:!0,toneMapped:!1});super(p,m),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class S_ extends Yi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sc);const $h={type:"change"},Mc={type:"start"},m0={type:"end"},co=new Xo,Kh=new si,M_=Math.cos(70*Yn.DEG2RAD),ze=new U,fn=2*Math.PI,Me={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Oa=1e-6;class E_ extends S_{constructor(t,e=null){super(t,e),this.state=Me.NONE,this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:_i.ROTATE,MIDDLE:_i.DOLLY,RIGHT:_i.PAN},this.touches={ONE:ys.ROTATE,TWO:ys.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new qn,this._lastTargetPosition=new U,this._quat=new qn().setFromUnitVectors(t.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Yh,this._sphericalDelta=new Yh,this._scale=1,this._panOffset=new U,this._rotateStart=new Rt,this._rotateEnd=new Rt,this._rotateDelta=new Rt,this._panStart=new Rt,this._panEnd=new Rt,this._panDelta=new Rt,this._dollyStart=new Rt,this._dollyEnd=new Rt,this._dollyDelta=new Rt,this._dollyDirection=new U,this._mouse=new Rt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=b_.bind(this),this._onPointerDown=w_.bind(this),this._onPointerUp=T_.bind(this),this._onContextMenu=D_.bind(this),this._onMouseWheel=C_.bind(this),this._onKeyDown=I_.bind(this),this._onTouchStart=L_.bind(this),this._onTouchMove=R_.bind(this),this._onMouseDown=A_.bind(this),this._onMouseMove=P_.bind(this),this._interceptControlDown=N_.bind(this),this._interceptControlUp=U_.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent($h),this.update(),this.state=Me.NONE}update(t=null){const e=this.object.position;ze.copy(e).sub(this.target),ze.applyQuaternion(this._quat),this._spherical.setFromVector3(ze),this.autoRotate&&this.state===Me.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=fn:i>Math.PI&&(i-=fn),r<-Math.PI?r+=fn:r>Math.PI&&(r-=fn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let o=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const c=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),o=c!=this._spherical.radius}if(ze.setFromSpherical(this._spherical),ze.applyQuaternion(this._quatInverse),e.copy(this.target).add(ze),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let c=null;if(this.object.isPerspectiveCamera){const l=ze.length();c=this._clampDistance(l*this._scale);const u=l-c;this.object.position.addScaledVector(this._dollyDirection,u),this.object.updateMatrixWorld(),o=!!u}else if(this.object.isOrthographicCamera){const l=new U(this._mouse.x,this._mouse.y,0);l.unproject(this.object);const u=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),o=u!==this.object.zoom;const f=new U(this._mouse.x,this._mouse.y,0);f.unproject(this.object),this.object.position.sub(f).add(l),this.object.updateMatrixWorld(),c=ze.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;c!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(c).add(this.object.position):(co.origin.copy(this.object.position),co.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(co.direction))<M_?this.object.lookAt(this.target):(Kh.setFromNormalAndCoplanarPoint(this.object.up,this.target),co.intersectPlane(Kh,this.target))))}else if(this.object.isOrthographicCamera){const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),c!==this.object.zoom&&(this.object.updateProjectionMatrix(),o=!0)}return this._scale=1,this._performCursorZoom=!1,o||this._lastPosition.distanceToSquared(this.object.position)>Oa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Oa||this._lastTargetPosition.distanceToSquared(this.target)>Oa?(this.dispatchEvent($h),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?fn/60*this.autoRotateSpeed*t:fn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ze.setFromMatrixColumn(e,0),ze.multiplyScalar(-t),this._panOffset.add(ze)}_panUp(t,e){this.screenSpacePanning===!0?ze.setFromMatrixColumn(e,1):(ze.setFromMatrixColumn(e,0),ze.crossVectors(this.object.up,ze)),ze.multiplyScalar(t),this._panOffset.add(ze)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;ze.copy(r).sub(this.target);let o=ze.length();o*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*o/i.clientHeight,this.object.matrix),this._panUp(2*e*o/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=t-i.left,o=e-i.top,c=i.width,l=i.height;this._mouse.x=r/c*2-1,this._mouse.y=-(o/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(fn*this._rotateDelta.x/e.clientHeight),this._rotateUp(fn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(fn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-fn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(fn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-fn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(i,r)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,o=Math.sqrt(i*i+r*r);this._dollyStart.set(0,o)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),o=.5*(t.pageY+i.y);this._rotateEnd.set(r,o)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(fn*this._rotateDelta.x/e.clientHeight),this._rotateUp(fn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,o=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,o),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const c=(t.pageX+e.x)*.5,l=(t.pageY+e.y)*.5;this._updateZoomParameters(c,l)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Rt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function w_(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function b_(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function T_(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(m0),this.state=Me.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function A_(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case _i.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Me.DOLLY;break;case _i.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Me.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Me.ROTATE}break;case _i.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Me.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Me.PAN}break;default:this.state=Me.NONE}this.state!==Me.NONE&&this.dispatchEvent(Mc)}function P_(n){switch(this.state){case Me.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Me.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Me.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function C_(n){this.enabled===!1||this.enableZoom===!1||this.state!==Me.NONE||(n.preventDefault(),this.dispatchEvent(Mc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(m0))}function I_(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function L_(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ys.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Me.TOUCH_ROTATE;break;case ys.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Me.TOUCH_PAN;break;default:this.state=Me.NONE}break;case 2:switch(this.touches.TWO){case ys.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Me.TOUCH_DOLLY_PAN;break;case ys.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Me.TOUCH_DOLLY_ROTATE;break;default:this.state=Me.NONE}break;default:this.state=Me.NONE}this.state!==Me.NONE&&this.dispatchEvent(Mc)}function R_(n){switch(this._trackPointer(n),this.state){case Me.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Me.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Me.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Me.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Me.NONE}}function D_(n){this.enabled!==!1&&n.preventDefault()}function N_(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function U_(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Jh=new $n,ho=new U;class g0 extends __{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new se(t,3)),this.setAttribute("uv",new se(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),i.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new Vl(e,6,1);return this.setAttribute("instanceStart",new Xn(i,3,0)),this.setAttribute("instanceEnd",new Xn(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new Vl(e,6,1);return this.setAttribute("instanceColorStart",new Xn(i,3,0)),this.setAttribute("instanceColorEnd",new Xn(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new h_(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $n);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Jh.setFromBufferAttribute(e),this.boundingBox.union(Jh))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qi),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let o=0,c=t.count;o<c;o++)ho.fromBufferAttribute(t,o),r=Math.max(r,i.distanceToSquared(ho)),ho.fromBufferAttribute(e,o),r=Math.max(r,i.distanceToSquared(ho));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}dt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Rt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};dn.line={uniforms:mc.merge([dt.common,dt.fog,dt.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class v0 extends Ye{constructor(t){super({type:"LineMaterial",uniforms:mc.clone(dn.line.uniforms),vertexShader:dn.line.vertexShader,fragmentShader:dn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Fa=new oe,jh=new U,Qh=new U,qe=new oe,Ze=new oe,Bn=new oe,Ba=new U,ka=new Te,$e=new y_,tu=new U,uo=new $n,fo=new qi,kn=new oe;let Gn,Gi;function eu(n,t,e){return kn.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),kn.multiplyScalar(1/kn.w),kn.x=Gi/e.width,kn.y=Gi/e.height,kn.applyMatrix4(n.projectionMatrixInverse),kn.multiplyScalar(1/kn.w),Math.abs(Math.max(kn.x,kn.y))}function O_(n,t){const e=n.matrixWorld,i=n.geometry,r=i.attributes.instanceStart,o=i.attributes.instanceEnd,c=Math.min(i.instanceCount,r.count);for(let l=0,u=c;l<u;l++){$e.start.fromBufferAttribute(r,l),$e.end.fromBufferAttribute(o,l),$e.applyMatrix4(e);const f=new U,p=new U;Gn.distanceSqToSegment($e.start,$e.end,p,f),p.distanceTo(f)<Gi*.5&&t.push({point:p,pointOnLine:f,distance:Gn.origin.distanceTo(p),object:n,face:null,faceIndex:l,uv:null,uv1:null})}}function F_(n,t,e){const i=t.projectionMatrix,o=n.material.resolution,c=n.matrixWorld,l=n.geometry,u=l.attributes.instanceStart,f=l.attributes.instanceEnd,p=Math.min(l.instanceCount,u.count),m=-t.near;Gn.at(1,Bn),Bn.w=1,Bn.applyMatrix4(t.matrixWorldInverse),Bn.applyMatrix4(i),Bn.multiplyScalar(1/Bn.w),Bn.x*=o.x/2,Bn.y*=o.y/2,Bn.z=0,Ba.copy(Bn),ka.multiplyMatrices(t.matrixWorldInverse,c);for(let g=0,v=p;g<v;g++){if(qe.fromBufferAttribute(u,g),Ze.fromBufferAttribute(f,g),qe.w=1,Ze.w=1,qe.applyMatrix4(ka),Ze.applyMatrix4(ka),qe.z>m&&Ze.z>m)continue;if(qe.z>m){const b=qe.z-Ze.z,I=(qe.z-m)/b;qe.lerp(Ze,I)}else if(Ze.z>m){const b=Ze.z-qe.z,I=(Ze.z-m)/b;Ze.lerp(qe,I)}qe.applyMatrix4(i),Ze.applyMatrix4(i),qe.multiplyScalar(1/qe.w),Ze.multiplyScalar(1/Ze.w),qe.x*=o.x/2,qe.y*=o.y/2,Ze.x*=o.x/2,Ze.y*=o.y/2,$e.start.copy(qe),$e.start.z=0,$e.end.copy(Ze),$e.end.z=0;const S=$e.closestPointToPointParameter(Ba,!0);$e.at(S,tu);const _=Yn.lerp(qe.z,Ze.z,S),y=_>=-1&&_<=1,P=Ba.distanceTo(tu)<Gi*.5;if(y&&P){$e.start.fromBufferAttribute(u,g),$e.end.fromBufferAttribute(f,g),$e.start.applyMatrix4(c),$e.end.applyMatrix4(c);const b=new U,I=new U;Gn.distanceSqToSegment($e.start,$e.end,I,b),e.push({point:I,pointOnLine:b,distance:Gn.origin.distanceTo(I),object:n,face:null,faceIndex:g,uv:null,uv1:null})}}}class B_ extends Re{constructor(t=new g0,e=new v0({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,i=t.attributes.instanceEnd,r=new Float32Array(2*e.count);for(let c=0,l=0,u=e.count;c<u;c++,l+=2)jh.fromBufferAttribute(e,c),Qh.fromBufferAttribute(i,c),r[l]=l===0?0:r[l-1],r[l+1]=r[l]+jh.distanceTo(Qh);const o=new Vl(r,2,1);return t.setAttribute("instanceDistanceStart",new Xn(o,1,0)),t.setAttribute("instanceDistanceEnd",new Xn(o,1,1)),this}raycast(t,e){const i=this.material.worldUnits,r=t.camera;r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const o=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Gn=t.ray;const c=this.matrixWorld,l=this.geometry,u=this.material;Gi=u.linewidth+o,l.boundingSphere===null&&l.computeBoundingSphere(),fo.copy(l.boundingSphere).applyMatrix4(c);let f;if(i)f=Gi*.5;else{const m=Math.max(r.near,fo.distanceToPoint(Gn.origin));f=eu(r,m,u.resolution)}if(fo.radius+=f,Gn.intersectsSphere(fo)===!1)return;l.boundingBox===null&&l.computeBoundingBox(),uo.copy(l.boundingBox).applyMatrix4(c);let p;if(i)p=Gi*.5;else{const m=Math.max(r.near,uo.distanceToPoint(Gn.origin));p=eu(r,m,u.resolution)}uo.expandByScalar(p),Gn.intersectsBox(uo)!==!1&&(i?O_(this,e):F_(this,r,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(Fa),this.material.uniforms.resolution.value.set(Fa.z,Fa.w))}}function k_(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var _0={exports:{}};(function(n){(function(){var t={};t.version="6.4.2.2",t.use_lines=!0,t.use_xyz=!1;var e=!1;n.exports?(n.exports=t,e=!0):typeof document<"u"?window.ClipperLib=t:self.ClipperLib=t;var i;if(e){var r="chrome";i="Netscape"}else{var r=navigator.userAgent.toString().toLowerCase();i=navigator.appName}var o={};r.indexOf("chrome")!=-1&&r.indexOf("chromium")==-1?o.chrome=1:o.chrome=0,r.indexOf("chromium")!=-1?o.chromium=1:o.chromium=0,r.indexOf("safari")!=-1&&r.indexOf("chrome")==-1&&r.indexOf("chromium")==-1?o.safari=1:o.safari=0,r.indexOf("firefox")!=-1?o.firefox=1:o.firefox=0,r.indexOf("firefox/17")!=-1?o.firefox17=1:o.firefox17=0,r.indexOf("firefox/15")!=-1?o.firefox15=1:o.firefox15=0,r.indexOf("firefox/3")!=-1?o.firefox3=1:o.firefox3=0,r.indexOf("opera")!=-1?o.opera=1:o.opera=0,r.indexOf("msie 10")!=-1?o.msie10=1:o.msie10=0,r.indexOf("msie 9")!=-1?o.msie9=1:o.msie9=0,r.indexOf("msie 8")!=-1?o.msie8=1:o.msie8=0,r.indexOf("msie 7")!=-1?o.msie7=1:o.msie7=0,r.indexOf("msie ")!=-1?o.msie=1:o.msie=0,t.biginteger_used=null;var c;function l(s,a,h){t.biginteger_used=1,s!=null&&(typeof s=="number"&&typeof a>"u"?this.fromInt(s):typeof s=="number"?this.fromNumber(s,a,h):a==null&&typeof s!="string"?this.fromString(s,256):this.fromString(s,a))}function u(){return new l(null,void 0,void 0)}function f(s,a,h,d,x,E){for(;--E>=0;){var A=a*this[s++]+h[d]+x;x=Math.floor(A/67108864),h[d++]=A&67108863}return x}function p(s,a,h,d,x,E){for(var A=a&32767,D=a>>15;--E>=0;){var O=this[s]&32767,V=this[s++]>>15,at=D*O+V*A;O=A*O+((at&32767)<<15)+h[d]+(x&1073741823),x=(O>>>30)+(at>>>15)+D*V+(x>>>30),h[d++]=O&1073741823}return x}function m(s,a,h,d,x,E){for(var A=a&16383,D=a>>14;--E>=0;){var O=this[s]&16383,V=this[s++]>>14,at=D*O+V*A;O=A*O+((at&16383)<<14)+h[d]+x,x=(O>>28)+(at>>14)+D*V,h[d++]=O&268435455}return x}i=="Microsoft Internet Explorer"?(l.prototype.am=p,c=30):i!="Netscape"?(l.prototype.am=f,c=26):(l.prototype.am=m,c=28),l.prototype.DB=c,l.prototype.DM=(1<<c)-1,l.prototype.DV=1<<c;var g=52;l.prototype.FV=Math.pow(2,g),l.prototype.F1=g-c,l.prototype.F2=2*c-g;var v="0123456789abcdefghijklmnopqrstuvwxyz",M=new Array,S,_;for(S=48,_=0;_<=9;++_)M[S++]=_;for(S=97,_=10;_<36;++_)M[S++]=_;for(S=65,_=10;_<36;++_)M[S++]=_;function y(s){return v.charAt(s)}function P(s,a){var h=M[s.charCodeAt(a)];return h??-1}function b(s){for(var a=this.t-1;a>=0;--a)s[a]=this[a];s.t=this.t,s.s=this.s}function I(s){this.t=1,this.s=s<0?-1:0,s>0?this[0]=s:s<-1?this[0]=s+this.DV:this.t=0}function z(s){var a=u();return a.fromInt(s),a}function F(s,a){var h;if(a==16)h=4;else if(a==8)h=3;else if(a==256)h=8;else if(a==2)h=1;else if(a==32)h=5;else if(a==4)h=2;else{this.fromRadix(s,a);return}this.t=0,this.s=0;for(var d=s.length,x=!1,E=0;--d>=0;){var A=h==8?s[d]&255:P(s,d);if(A<0){s.charAt(d)=="-"&&(x=!0);continue}x=!1,E==0?this[this.t++]=A:E+h>this.DB?(this[this.t-1]|=(A&(1<<this.DB-E)-1)<<E,this[this.t++]=A>>this.DB-E):this[this.t-1]|=A<<E,E+=h,E>=this.DB&&(E-=this.DB)}h==8&&s[0]&128&&(this.s=-1,E>0&&(this[this.t-1]|=(1<<this.DB-E)-1<<E)),this.clamp(),x&&l.ZERO.subTo(this,this)}function N(){for(var s=this.s&this.DM;this.t>0&&this[this.t-1]==s;)--this.t}function X(s){if(this.s<0)return"-"+this.negate().toString(s);var a;if(s==16)a=4;else if(s==8)a=3;else if(s==2)a=1;else if(s==32)a=5;else if(s==4)a=2;else return this.toRadix(s);var h=(1<<a)-1,d,x=!1,E="",A=this.t,D=this.DB-A*this.DB%a;if(A-- >0)for(D<this.DB&&(d=this[A]>>D)>0&&(x=!0,E=y(d));A>=0;)D<a?(d=(this[A]&(1<<D)-1)<<a-D,d|=this[--A]>>(D+=this.DB-a)):(d=this[A]>>(D-=a)&h,D<=0&&(D+=this.DB,--A)),d>0&&(x=!0),x&&(E+=y(d));return x?E:"0"}function ot(){var s=u();return l.ZERO.subTo(this,s),s}function w(){return this.s<0?this.negate():this}function L(s){var a=this.s-s.s;if(a!=0)return a;var h=this.t;if(a=h-s.t,a!=0)return this.s<0?-a:a;for(;--h>=0;)if((a=this[h]-s[h])!=0)return a;return 0}function Z(s){var a=1,h;return(h=s>>>16)!=0&&(s=h,a+=16),(h=s>>8)!=0&&(s=h,a+=8),(h=s>>4)!=0&&(s=h,a+=4),(h=s>>2)!=0&&(s=h,a+=2),(h=s>>1)!=0&&(s=h,a+=1),a}function $(){return this.t<=0?0:this.DB*(this.t-1)+Z(this[this.t-1]^this.s&this.DM)}function Q(s,a){var h;for(h=this.t-1;h>=0;--h)a[h+s]=this[h];for(h=s-1;h>=0;--h)a[h]=0;a.t=this.t+s,a.s=this.s}function st(s,a){for(var h=s;h<this.t;++h)a[h-s]=this[h];a.t=Math.max(this.t-s,0),a.s=this.s}function K(s,a){var h=s%this.DB,d=this.DB-h,x=(1<<d)-1,E=Math.floor(s/this.DB),A=this.s<<h&this.DM,D;for(D=this.t-1;D>=0;--D)a[D+E+1]=this[D]>>d|A,A=(this[D]&x)<<h;for(D=E-1;D>=0;--D)a[D]=0;a[E]=A,a.t=this.t+E+1,a.s=this.s,a.clamp()}function lt(s,a){a.s=this.s;var h=Math.floor(s/this.DB);if(h>=this.t){a.t=0;return}var d=s%this.DB,x=this.DB-d,E=(1<<d)-1;a[0]=this[h]>>d;for(var A=h+1;A<this.t;++A)a[A-h-1]|=(this[A]&E)<<x,a[A-h]=this[A]>>d;d>0&&(a[this.t-h-1]|=(this.s&E)<<x),a.t=this.t-h,a.clamp()}function j(s,a){for(var h=0,d=0,x=Math.min(s.t,this.t);h<x;)d+=this[h]-s[h],a[h++]=d&this.DM,d>>=this.DB;if(s.t<this.t){for(d-=s.s;h<this.t;)d+=this[h],a[h++]=d&this.DM,d>>=this.DB;d+=this.s}else{for(d+=this.s;h<s.t;)d-=s[h],a[h++]=d&this.DM,d>>=this.DB;d-=s.s}a.s=d<0?-1:0,d<-1?a[h++]=this.DV+d:d>0&&(a[h++]=d),a.t=h,a.clamp()}function St(s,a){var h=this.abs(),d=s.abs(),x=h.t;for(a.t=x+d.t;--x>=0;)a[x]=0;for(x=0;x<d.t;++x)a[x+h.t]=h.am(0,d[x],a,x,0,h.t);a.s=0,a.clamp(),this.s!=s.s&&l.ZERO.subTo(a,a)}function Mt(s){for(var a=this.abs(),h=s.t=2*a.t;--h>=0;)s[h]=0;for(h=0;h<a.t-1;++h){var d=a.am(h,a[h],s,2*h,0,1);(s[h+a.t]+=a.am(h+1,2*a[h],s,2*h+1,d,a.t-h-1))>=a.DV&&(s[h+a.t]-=a.DV,s[h+a.t+1]=1)}s.t>0&&(s[s.t-1]+=a.am(h,a[h],s,2*h,0,1)),s.s=0,s.clamp()}function Lt(s,a,h){var d=s.abs();if(!(d.t<=0)){var x=this.abs();if(x.t<d.t){a!=null&&a.fromInt(0),h!=null&&this.copyTo(h);return}h==null&&(h=u());var E=u(),A=this.s,D=s.s,O=this.DB-Z(d[d.t-1]);O>0?(d.lShiftTo(O,E),x.lShiftTo(O,h)):(d.copyTo(E),x.copyTo(h));var V=E.t,at=E[V-1];if(at!=0){var tt=at*(1<<this.F1)+(V>1?E[V-2]>>this.F2:0),pt=this.FV/tt,Bt=(1<<this.F1)/tt,ee=1<<this.F2,ie=h.t,be=ie-V,un=a??u();for(E.dlShiftTo(be,un),h.compareTo(un)>=0&&(h[h.t++]=1,h.subTo(un,h)),l.ONE.dlShiftTo(V,un),un.subTo(E,E);E.t<V;)E[E.t++]=0;for(;--be>=0;){var Fn=h[--ie]==at?this.DM:Math.floor(h[ie]*pt+(h[ie-1]+ee)*Bt);if((h[ie]+=E.am(0,Fn,h,be,0,V))<Fn)for(E.dlShiftTo(be,un),h.subTo(un,h);h[ie]<--Fn;)h.subTo(un,h)}a!=null&&(h.drShiftTo(V,a),A!=D&&l.ZERO.subTo(a,a)),h.t=V,h.clamp(),O>0&&h.rShiftTo(O,h),A<0&&l.ZERO.subTo(h,h)}}}function fe(s){var a=u();return this.abs().divRemTo(s,null,a),this.s<0&&a.compareTo(l.ZERO)>0&&s.subTo(a,a),a}function ne(s){this.m=s}function et(s){return s.s<0||s.compareTo(this.m)>=0?s.mod(this.m):s}function ht(s){return s}function Pt(s){s.divRemTo(this.m,null,s)}function Et(s,a,h){s.multiplyTo(a,h),this.reduce(h)}function Zt(s,a){s.squareTo(a),this.reduce(a)}ne.prototype.convert=et,ne.prototype.revert=ht,ne.prototype.reduce=Pt,ne.prototype.mulTo=Et,ne.prototype.sqrTo=Zt;function Ht(){if(this.t<1)return 0;var s=this[0];if(!(s&1))return 0;var a=s&3;return a=a*(2-(s&15)*a)&15,a=a*(2-(s&255)*a)&255,a=a*(2-((s&65535)*a&65535))&65535,a=a*(2-s*a%this.DV)%this.DV,a>0?this.DV-a:-a}function Kt(s){this.m=s,this.mp=s.invDigit(),this.mpl=this.mp&32767,this.mph=this.mp>>15,this.um=(1<<s.DB-15)-1,this.mt2=2*s.t}function ge(s){var a=u();return s.abs().dlShiftTo(this.m.t,a),a.divRemTo(this.m,null,a),s.s<0&&a.compareTo(l.ZERO)>0&&this.m.subTo(a,a),a}function ae(s){var a=u();return s.copyTo(a),this.reduce(a),a}function B(s){for(;s.t<=this.mt2;)s[s.t++]=0;for(var a=0;a<this.m.t;++a){var h=s[a]&32767,d=h*this.mpl+((h*this.mph+(s[a]>>15)*this.mpl&this.um)<<15)&s.DM;for(h=a+this.m.t,s[h]+=this.m.am(0,d,s,a,0,this.m.t);s[h]>=s.DV;)s[h]-=s.DV,s[++h]++}s.clamp(),s.drShiftTo(this.m.t,s),s.compareTo(this.m)>=0&&s.subTo(this.m,s)}function sn(s,a){s.squareTo(a),this.reduce(a)}function re(s,a,h){s.multiplyTo(a,h),this.reduce(h)}Kt.prototype.convert=ge,Kt.prototype.revert=ae,Kt.prototype.reduce=B,Kt.prototype.mulTo=re,Kt.prototype.sqrTo=sn;function he(){return(this.t>0?this[0]&1:this.s)==0}function Xt(s,a){if(s>4294967295||s<1)return l.ONE;var h=u(),d=u(),x=a.convert(this),E=Z(s)-1;for(x.copyTo(h);--E>=0;)if(a.sqrTo(h,d),(s&1<<E)>0)a.mulTo(d,x,h);else{var A=h;h=d,d=A}return a.revert(h)}function Ee(s,a){var h;return s<256||a.isEven()?h=new ne(a):h=new Kt(a),this.exp(s,h)}l.prototype.copyTo=b,l.prototype.fromInt=I,l.prototype.fromString=F,l.prototype.clamp=N,l.prototype.dlShiftTo=Q,l.prototype.drShiftTo=st,l.prototype.lShiftTo=K,l.prototype.rShiftTo=lt,l.prototype.subTo=j,l.prototype.multiplyTo=St,l.prototype.squareTo=Mt,l.prototype.divRemTo=Lt,l.prototype.invDigit=Ht,l.prototype.isEven=he,l.prototype.exp=Xt,l.prototype.toString=X,l.prototype.negate=ot,l.prototype.abs=w,l.prototype.compareTo=L,l.prototype.bitLength=$,l.prototype.mod=fe,l.prototype.modPowInt=Ee,l.ZERO=z(0),l.ONE=z(1);function Yt(){var s=u();return this.copyTo(s),s}function R(){if(this.s<0){if(this.t==1)return this[0]-this.DV;if(this.t==0)return-1}else{if(this.t==1)return this[0];if(this.t==0)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]}function T(){return this.t==0?this.s:this[0]<<24>>24}function W(){return this.t==0?this.s:this[0]<<16>>16}function it(s){return Math.floor(Math.LN2*this.DB/Math.log(s))}function ct(){return this.s<0?-1:this.t<=0||this.t==1&&this[0]<=0?0:1}function nt(s){if(s==null&&(s=10),this.signum()==0||s<2||s>36)return"0";var a=this.chunkSize(s),h=Math.pow(s,a),d=z(h),x=u(),E=u(),A="";for(this.divRemTo(d,x,E);x.signum()>0;)A=(h+E.intValue()).toString(s).substr(1)+A,x.divRemTo(d,x,E);return E.intValue().toString(s)+A}function Dt(s,a){this.fromInt(0),a==null&&(a=10);for(var h=this.chunkSize(a),d=Math.pow(a,h),x=!1,E=0,A=0,D=0;D<s.length;++D){var O=P(s,D);if(O<0){s.charAt(D)=="-"&&this.signum()==0&&(x=!0);continue}A=a*A+O,++E>=h&&(this.dMultiply(d),this.dAddOffset(A,0),E=0,A=0)}E>0&&(this.dMultiply(Math.pow(a,E)),this.dAddOffset(A,0)),x&&l.ZERO.subTo(this,this)}function vt(s,a,h){if(typeof a=="number")if(s<2)this.fromInt(1);else for(this.fromNumber(s,h),this.testBit(s-1)||this.bitwiseTo(l.ONE.shiftLeft(s-1),te,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(a);)this.dAddOffset(2,0),this.bitLength()>s&&this.subTo(l.ONE.shiftLeft(s-1),this);else{var d=new Array,x=s&7;d.length=(s>>3)+1,a.nextBytes(d),x>0?d[0]&=(1<<x)-1:d[0]=0,this.fromString(d,256)}}function wt(){var s=this.t,a=new Array;a[0]=this.s;var h=this.DB-s*this.DB%8,d,x=0;if(s-- >0)for(h<this.DB&&(d=this[s]>>h)!=(this.s&this.DM)>>h&&(a[x++]=d|this.s<<this.DB-h);s>=0;)h<8?(d=(this[s]&(1<<h)-1)<<8-h,d|=this[--s]>>(h+=this.DB-8)):(d=this[s]>>(h-=8)&255,h<=0&&(h+=this.DB,--s)),d&128&&(d|=-256),x==0&&(this.s&128)!=(d&128)&&++x,(x>0||d!=this.s)&&(a[x++]=d);return a}function ue(s){return this.compareTo(s)==0}function ut(s){return this.compareTo(s)<0?this:s}function bt(s){return this.compareTo(s)>0?this:s}function Vt(s,a,h){var d,x,E=Math.min(s.t,this.t);for(d=0;d<E;++d)h[d]=a(this[d],s[d]);if(s.t<this.t){for(x=s.s&this.DM,d=E;d<this.t;++d)h[d]=a(this[d],x);h.t=this.t}else{for(x=this.s&this.DM,d=E;d<s.t;++d)h[d]=a(x,s[d]);h.t=s.t}h.s=a(this.s,s.s),h.clamp()}function Wt(s,a){return s&a}function Tt(s){var a=u();return this.bitwiseTo(s,Wt,a),a}function te(s,a){return s|a}function $t(s){var a=u();return this.bitwiseTo(s,te,a),a}function _e(s,a){return s^a}function k(s){var a=u();return this.bitwiseTo(s,_e,a),a}function xt(s,a){return s&~a}function J(s){var a=u();return this.bitwiseTo(s,xt,a),a}function rt(){for(var s=u(),a=0;a<this.t;++a)s[a]=this.DM&~this[a];return s.t=this.t,s.s=~this.s,s}function _t(s){var a=u();return s<0?this.rShiftTo(-s,a):this.lShiftTo(s,a),a}function yt(s){var a=u();return s<0?this.lShiftTo(-s,a):this.rShiftTo(s,a),a}function le(s){if(s==0)return-1;var a=0;return s&65535||(s>>=16,a+=16),s&255||(s>>=8,a+=8),s&15||(s>>=4,a+=4),s&3||(s>>=2,a+=2),s&1||++a,a}function Oe(){for(var s=0;s<this.t;++s)if(this[s]!=0)return s*this.DB+le(this[s]);return this.s<0?this.t*this.DB:-1}function Je(s){for(var a=0;s!=0;)s&=s-1,++a;return a}function de(){for(var s=0,a=this.s&this.DM,h=0;h<this.t;++h)s+=Je(this[h]^a);return s}function je(s){var a=Math.floor(s/this.DB);return a>=this.t?this.s!=0:(this[a]&1<<s%this.DB)!=0}function bn(s,a){var h=l.ONE.shiftLeft(s);return this.bitwiseTo(h,a,h),h}function Tr(s){return this.changeBit(s,te)}function Ar(s){return this.changeBit(s,xt)}function Kn(s){return this.changeBit(s,_e)}function Hs(s,a){for(var h=0,d=0,x=Math.min(s.t,this.t);h<x;)d+=this[h]+s[h],a[h++]=d&this.DM,d>>=this.DB;if(s.t<this.t){for(d+=s.s;h<this.t;)d+=this[h],a[h++]=d&this.DM,d>>=this.DB;d+=this.s}else{for(d+=this.s;h<s.t;)d+=s[h],a[h++]=d&this.DM,d>>=this.DB;d+=s.s}a.s=d<0?-1:0,d>0?a[h++]=d:d<-1&&(a[h++]=this.DV+d),a.t=h,a.clamp()}function Pr(s){var a=u();return this.addTo(s,a),a}function Cr(s){var a=u();return this.subTo(s,a),a}function $i(s){var a=u();return this.multiplyTo(s,a),a}function Ir(){var s=u();return this.squareTo(s),s}function Ki(s){var a=u();return this.divRemTo(s,a,null),a}function Lr(s){var a=u();return this.divRemTo(s,null,a),a}function Rr(s){var a=u(),h=u();return this.divRemTo(s,a,h),new Array(a,h)}function ea(s){this[this.t]=this.am(0,s-1,this,0,0,this.t),++this.t,this.clamp()}function na(s,a){if(s!=0){for(;this.t<=a;)this[this.t++]=0;for(this[a]+=s;this[a]>=this.DV;)this[a]-=this.DV,++a>=this.t&&(this[this.t++]=0),++this[a]}}function wi(){}function C(s){return s}function H(s,a,h){s.multiplyTo(a,h)}function Y(s,a){s.squareTo(a)}wi.prototype.convert=C,wi.prototype.revert=C,wi.prototype.mulTo=H,wi.prototype.sqrTo=Y;function q(s){return this.exp(s,new wi)}function G(s,a,h){var d=Math.min(this.t+s.t,a);for(h.s=0,h.t=d;d>0;)h[--d]=0;var x;for(x=h.t-this.t;d<x;++d)h[d+this.t]=this.am(0,s[d],h,d,0,this.t);for(x=Math.min(s.t,a);d<x;++d)this.am(0,s[d],h,d,0,a-d);h.clamp()}function ft(s,a,h){--a;var d=h.t=this.t+s.t-a;for(h.s=0;--d>=0;)h[d]=0;for(d=Math.max(a-this.t,0);d<s.t;++d)h[this.t+d-a]=this.am(a-d,s[d],h,0,0,this.t+d-a);h.clamp(),h.drShiftTo(1,h)}function mt(s){this.r2=u(),this.q3=u(),l.ONE.dlShiftTo(2*s.t,this.r2),this.mu=this.r2.divide(s),this.m=s}function At(s){if(s.s<0||s.t>2*this.m.t)return s.mod(this.m);if(s.compareTo(this.m)<0)return s;var a=u();return s.copyTo(a),this.reduce(a),a}function It(s){return s}function zt(s){for(s.drShiftTo(this.m.t-1,this.r2),s.t>this.m.t+1&&(s.t=this.m.t+1,s.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);s.compareTo(this.r2)<0;)s.dAddOffset(1,this.m.t+1);for(s.subTo(this.r2,s);s.compareTo(this.m)>=0;)s.subTo(this.m,s)}function Gt(s,a){s.squareTo(a),this.reduce(a)}function Nt(s,a,h){s.multiplyTo(a,h),this.reduce(h)}mt.prototype.convert=At,mt.prototype.revert=It,mt.prototype.reduce=zt,mt.prototype.mulTo=Nt,mt.prototype.sqrTo=Gt;function me(s,a){var h=s.bitLength(),d,x=z(1),E;if(h<=0)return x;h<18?d=1:h<48?d=3:h<144?d=4:h<768?d=5:d=6,h<8?E=new ne(a):a.isEven()?E=new mt(a):E=new Kt(a);var A=new Array,D=3,O=d-1,V=(1<<d)-1;if(A[1]=E.convert(this),d>1){var at=u();for(E.sqrTo(A[1],at);D<=V;)A[D]=u(),E.mulTo(at,A[D-2],A[D]),D+=2}var tt=s.t-1,pt,Bt=!0,ee=u(),ie;for(h=Z(s[tt])-1;tt>=0;){for(h>=O?pt=s[tt]>>h-O&V:(pt=(s[tt]&(1<<h+1)-1)<<O-h,tt>0&&(pt|=s[tt-1]>>this.DB+h-O)),D=d;!(pt&1);)pt>>=1,--D;if((h-=D)<0&&(h+=this.DB,--tt),Bt)A[pt].copyTo(x),Bt=!1;else{for(;D>1;)E.sqrTo(x,ee),E.sqrTo(ee,x),D-=2;D>0?E.sqrTo(x,ee):(ie=x,x=ee,ee=ie),E.mulTo(ee,A[pt],x)}for(;tt>=0&&!(s[tt]&1<<h);)E.sqrTo(x,ee),ie=x,x=ee,ee=ie,--h<0&&(h=this.DB-1,--tt)}return E.revert(x)}function we(s){var a=this.s<0?this.negate():this.clone(),h=s.s<0?s.negate():s.clone();if(a.compareTo(h)<0){var d=a;a=h,h=d}var x=a.getLowestSetBit(),E=h.getLowestSetBit();if(E<0)return a;for(x<E&&(E=x),E>0&&(a.rShiftTo(E,a),h.rShiftTo(E,h));a.signum()>0;)(x=a.getLowestSetBit())>0&&a.rShiftTo(x,a),(x=h.getLowestSetBit())>0&&h.rShiftTo(x,h),a.compareTo(h)>=0?(a.subTo(h,a),a.rShiftTo(1,a)):(h.subTo(a,h),h.rShiftTo(1,h));return E>0&&h.lShiftTo(E,h),h}function Ie(s){if(s<=0)return 0;var a=this.DV%s,h=this.s<0?s-1:0;if(this.t>0)if(a==0)h=this[0]%s;else for(var d=this.t-1;d>=0;--d)h=(a*h+this[d])%s;return h}function rn(s){var a=s.isEven();if(this.isEven()&&a||s.signum()==0)return l.ZERO;for(var h=s.clone(),d=this.clone(),x=z(1),E=z(0),A=z(0),D=z(1);h.signum()!=0;){for(;h.isEven();)h.rShiftTo(1,h),a?((!x.isEven()||!E.isEven())&&(x.addTo(this,x),E.subTo(s,E)),x.rShiftTo(1,x)):E.isEven()||E.subTo(s,E),E.rShiftTo(1,E);for(;d.isEven();)d.rShiftTo(1,d),a?((!A.isEven()||!D.isEven())&&(A.addTo(this,A),D.subTo(s,D)),A.rShiftTo(1,A)):D.isEven()||D.subTo(s,D),D.rShiftTo(1,D);h.compareTo(d)>=0?(h.subTo(d,h),a&&x.subTo(A,x),E.subTo(D,E)):(d.subTo(h,d),a&&A.subTo(x,A),D.subTo(E,D))}if(d.compareTo(l.ONE)!=0)return l.ZERO;if(D.compareTo(s)>=0)return D.subtract(s);if(D.signum()<0)D.addTo(s,D);else return D;return D.signum()<0?D.add(s):D}var qt=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],Ut=(1<<26)/qt[qt.length-1];function ke(s){var a,h=this.abs();if(h.t==1&&h[0]<=qt[qt.length-1]){for(a=0;a<qt.length;++a)if(h[0]==qt[a])return!0;return!1}if(h.isEven())return!1;for(a=1;a<qt.length;){for(var d=qt[a],x=a+1;x<qt.length&&d<Ut;)d*=qt[x++];for(d=h.modInt(d);a<x;)if(d%qt[a++]==0)return!1}return h.millerRabin(s)}function pe(s){var a=this.subtract(l.ONE),h=a.getLowestSetBit();if(h<=0)return!1;var d=a.shiftRight(h);s=s+1>>1,s>qt.length&&(s=qt.length);for(var x=u(),E=0;E<s;++E){x.fromInt(qt[Math.floor(Math.random()*qt.length)]);var A=x.modPow(d,this);if(A.compareTo(l.ONE)!=0&&A.compareTo(a)!=0){for(var D=1;D++<h&&A.compareTo(a)!=0;)if(A=A.modPowInt(2,this),A.compareTo(l.ONE)==0)return!1;if(A.compareTo(a)!=0)return!1}}return!0}l.prototype.chunkSize=it,l.prototype.toRadix=nt,l.prototype.fromRadix=Dt,l.prototype.fromNumber=vt,l.prototype.bitwiseTo=Vt,l.prototype.changeBit=bn,l.prototype.addTo=Hs,l.prototype.dMultiply=ea,l.prototype.dAddOffset=na,l.prototype.multiplyLowerTo=G,l.prototype.multiplyUpperTo=ft,l.prototype.modInt=Ie,l.prototype.millerRabin=pe,l.prototype.clone=Yt,l.prototype.intValue=R,l.prototype.byteValue=T,l.prototype.shortValue=W,l.prototype.signum=ct,l.prototype.toByteArray=wt,l.prototype.equals=ue,l.prototype.min=ut,l.prototype.max=bt,l.prototype.and=Tt,l.prototype.or=$t,l.prototype.xor=k,l.prototype.andNot=J,l.prototype.not=rt,l.prototype.shiftLeft=_t,l.prototype.shiftRight=yt,l.prototype.getLowestSetBit=Oe,l.prototype.bitCount=de,l.prototype.testBit=je,l.prototype.setBit=Tr,l.prototype.clearBit=Ar,l.prototype.flipBit=Kn,l.prototype.add=Pr,l.prototype.subtract=Cr,l.prototype.multiply=$i,l.prototype.divide=Ki,l.prototype.remainder=Lr,l.prototype.divideAndRemainder=Rr,l.prototype.modPow=me,l.prototype.modInverse=rn,l.prototype.pow=q,l.prototype.gcd=we,l.prototype.isProbablePrime=ke,l.prototype.square=Ir;var Ft=l;Ft.prototype.IsNegative=function(){return this.compareTo(Ft.ZERO)==-1},Ft.op_Equality=function(s,a){return s.compareTo(a)==0},Ft.op_Inequality=function(s,a){return s.compareTo(a)!=0},Ft.op_GreaterThan=function(s,a){return s.compareTo(a)>0},Ft.op_LessThan=function(s,a){return s.compareTo(a)<0},Ft.op_Addition=function(s,a){return new Ft(s,void 0,void 0).add(new Ft(a,void 0,void 0))},Ft.op_Subtraction=function(s,a){return new Ft(s,void 0,void 0).subtract(new Ft(a,void 0,void 0))},Ft.Int128Mul=function(s,a){return new Ft(s,void 0,void 0).multiply(new Ft(a,void 0,void 0))},Ft.op_Division=function(s,a){return s.divide(a)},Ft.prototype.ToDouble=function(){return parseFloat(this.toString())};var Jn=function(s,a){var h;if(typeof Object.getOwnPropertyNames>"u"){for(h in a.prototype)(typeof s.prototype[h]>"u"||s.prototype[h]===Object.prototype[h])&&(s.prototype[h]=a.prototype[h]);for(h in a)typeof s[h]>"u"&&(s[h]=a[h]);s.$baseCtor=a}else{for(var d=Object.getOwnPropertyNames(a.prototype),x=0;x<d.length;x++)typeof Object.getOwnPropertyDescriptor(s.prototype,d[x])>"u"&&Object.defineProperty(s.prototype,d[x],Object.getOwnPropertyDescriptor(a.prototype,d[x]));for(h in a)typeof s[h]>"u"&&(s[h]=a[h]);s.$baseCtor=a}};t.Path=function(){return[]},t.Path.prototype.push=Array.prototype.push,t.Paths=function(){return[]},t.Paths.prototype.push=Array.prototype.push,t.DoublePoint=function(){var s=arguments;this.X=0,this.Y=0,s.length===1?(this.X=s[0].X,this.Y=s[0].Y):s.length===2&&(this.X=s[0],this.Y=s[1])},t.DoublePoint0=function(){this.X=0,this.Y=0},t.DoublePoint0.prototype=t.DoublePoint.prototype,t.DoublePoint1=function(s){this.X=s.X,this.Y=s.Y},t.DoublePoint1.prototype=t.DoublePoint.prototype,t.DoublePoint2=function(s,a){this.X=s,this.Y=a},t.DoublePoint2.prototype=t.DoublePoint.prototype,t.PolyNode=function(){this.m_Parent=null,this.m_polygon=new t.Path,this.m_Index=0,this.m_jointype=0,this.m_endtype=0,this.m_Childs=[],this.IsOpen=!1},t.PolyNode.prototype.IsHoleNode=function(){for(var s=!0,a=this.m_Parent;a!==null;)s=!s,a=a.m_Parent;return s},t.PolyNode.prototype.ChildCount=function(){return this.m_Childs.length},t.PolyNode.prototype.Contour=function(){return this.m_polygon},t.PolyNode.prototype.AddChild=function(s){var a=this.m_Childs.length;this.m_Childs.push(s),s.m_Parent=this,s.m_Index=a},t.PolyNode.prototype.GetNext=function(){return this.m_Childs.length>0?this.m_Childs[0]:this.GetNextSiblingUp()},t.PolyNode.prototype.GetNextSiblingUp=function(){return this.m_Parent===null?null:this.m_Index===this.m_Parent.m_Childs.length-1?this.m_Parent.GetNextSiblingUp():this.m_Parent.m_Childs[this.m_Index+1]},t.PolyNode.prototype.Childs=function(){return this.m_Childs},t.PolyNode.prototype.Parent=function(){return this.m_Parent},t.PolyNode.prototype.IsHole=function(){return this.IsHoleNode()},t.PolyTree=function(){this.m_AllPolys=[],t.PolyNode.call(this)},t.PolyTree.prototype.Clear=function(){for(var s=0,a=this.m_AllPolys.length;s<a;s++)this.m_AllPolys[s]=null;this.m_AllPolys.length=0,this.m_Childs.length=0},t.PolyTree.prototype.GetFirst=function(){return this.m_Childs.length>0?this.m_Childs[0]:null},t.PolyTree.prototype.Total=function(){var s=this.m_AllPolys.length;return s>0&&this.m_Childs[0]!==this.m_AllPolys[0]&&s--,s},Jn(t.PolyTree,t.PolyNode),t.Math_Abs_Int64=t.Math_Abs_Int32=t.Math_Abs_Double=function(s){return Math.abs(s)},t.Math_Max_Int32_Int32=function(s,a){return Math.max(s,a)},o.msie||o.opera||o.safari?t.Cast_Int32=function(s){return s|0}:t.Cast_Int32=function(s){return~~s},typeof Number.toInteger>"u"&&(Number.toInteger=null),o.chrome?t.Cast_Int64=function(s){return s<-2147483648||s>2147483647?s<0?Math.ceil(s):Math.floor(s):~~s}:o.firefox&&typeof Number.toInteger=="function"?t.Cast_Int64=function(s){return Number.toInteger(s)}:o.msie7||o.msie8?t.Cast_Int64=function(s){return parseInt(s,10)}:o.msie?t.Cast_Int64=function(s){return s<-2147483648||s>2147483647?s<0?Math.ceil(s):Math.floor(s):s|0}:t.Cast_Int64=function(s){return s<0?Math.ceil(s):Math.floor(s)},t.Clear=function(s){s.length=0},t.PI=3.141592653589793,t.PI2=2*3.141592653589793,t.IntPoint=function(){var s=arguments,a=s.length;if(this.X=0,this.Y=0,t.use_xyz)if(this.Z=0,a===3)this.X=s[0],this.Y=s[1],this.Z=s[2];else if(a===2)this.X=s[0],this.Y=s[1],this.Z=0;else if(a===1)if(s[0]instanceof t.DoublePoint){var h=s[0];this.X=t.Clipper.Round(h.X),this.Y=t.Clipper.Round(h.Y),this.Z=0}else{var d=s[0];typeof d.Z>"u"&&(d.Z=0),this.X=d.X,this.Y=d.Y,this.Z=d.Z}else this.X=0,this.Y=0,this.Z=0;else if(a===2)this.X=s[0],this.Y=s[1];else if(a===1)if(s[0]instanceof t.DoublePoint){var h=s[0];this.X=t.Clipper.Round(h.X),this.Y=t.Clipper.Round(h.Y)}else{var d=s[0];this.X=d.X,this.Y=d.Y}else this.X=0,this.Y=0},t.IntPoint.op_Equality=function(s,a){return s.X===a.X&&s.Y===a.Y},t.IntPoint.op_Inequality=function(s,a){return s.X!==a.X||s.Y!==a.Y},t.IntPoint0=function(){this.X=0,this.Y=0,t.use_xyz&&(this.Z=0)},t.IntPoint0.prototype=t.IntPoint.prototype,t.IntPoint1=function(s){this.X=s.X,this.Y=s.Y,t.use_xyz&&(typeof s.Z>"u"?this.Z=0:this.Z=s.Z)},t.IntPoint1.prototype=t.IntPoint.prototype,t.IntPoint1dp=function(s){this.X=t.Clipper.Round(s.X),this.Y=t.Clipper.Round(s.Y),t.use_xyz&&(this.Z=0)},t.IntPoint1dp.prototype=t.IntPoint.prototype,t.IntPoint2=function(s,a,h){this.X=s,this.Y=a,t.use_xyz&&(typeof h>"u"?this.Z=0:this.Z=h)},t.IntPoint2.prototype=t.IntPoint.prototype,t.IntRect=function(){var s=arguments,a=s.length;if(a===4)this.left=s[0],this.top=s[1],this.right=s[2],this.bottom=s[3];else if(a===1){var h=s[0];this.left=h.left,this.top=h.top,this.right=h.right,this.bottom=h.bottom}else this.left=0,this.top=0,this.right=0,this.bottom=0},t.IntRect0=function(){this.left=0,this.top=0,this.right=0,this.bottom=0},t.IntRect0.prototype=t.IntRect.prototype,t.IntRect1=function(s){this.left=s.left,this.top=s.top,this.right=s.right,this.bottom=s.bottom},t.IntRect1.prototype=t.IntRect.prototype,t.IntRect4=function(s,a,h,d){this.left=s,this.top=a,this.right=h,this.bottom=d},t.IntRect4.prototype=t.IntRect.prototype,t.ClipType={ctIntersection:0,ctUnion:1,ctDifference:2,ctXor:3},t.PolyType={ptSubject:0,ptClip:1},t.PolyFillType={pftEvenOdd:0,pftNonZero:1,pftPositive:2,pftNegative:3},t.JoinType={jtSquare:0,jtRound:1,jtMiter:2},t.EndType={etOpenSquare:0,etOpenRound:1,etOpenButt:2,etClosedLine:3,etClosedPolygon:4},t.EdgeSide={esLeft:0,esRight:1},t.Direction={dRightToLeft:0,dLeftToRight:1},t.TEdge=function(){this.Bot=new t.IntPoint0,this.Curr=new t.IntPoint0,this.Top=new t.IntPoint0,this.Delta=new t.IntPoint0,this.Dx=0,this.PolyTyp=t.PolyType.ptSubject,this.Side=t.EdgeSide.esLeft,this.WindDelta=0,this.WindCnt=0,this.WindCnt2=0,this.OutIdx=0,this.Next=null,this.Prev=null,this.NextInLML=null,this.NextInAEL=null,this.PrevInAEL=null,this.NextInSEL=null,this.PrevInSEL=null},t.IntersectNode=function(){this.Edge1=null,this.Edge2=null,this.Pt=new t.IntPoint0},t.MyIntersectNodeSort=function(){},t.MyIntersectNodeSort.Compare=function(s,a){var h=a.Pt.Y-s.Pt.Y;return h>0?1:h<0?-1:0},t.LocalMinima=function(){this.Y=0,this.LeftBound=null,this.RightBound=null,this.Next=null},t.Scanbeam=function(){this.Y=0,this.Next=null},t.Maxima=function(){this.X=0,this.Next=null,this.Prev=null},t.OutRec=function(){this.Idx=0,this.IsHole=!1,this.IsOpen=!1,this.FirstLeft=null,this.Pts=null,this.BottomPt=null,this.PolyNode=null},t.OutPt=function(){this.Idx=0,this.Pt=new t.IntPoint0,this.Next=null,this.Prev=null},t.Join=function(){this.OutPt1=null,this.OutPt2=null,this.OffPt=new t.IntPoint0},t.ClipperBase=function(){this.m_MinimaList=null,this.m_CurrentLM=null,this.m_edges=new Array,this.m_UseFullRange=!1,this.m_HasOpenPaths=!1,this.PreserveCollinear=!1,this.m_Scanbeam=null,this.m_PolyOuts=null,this.m_ActiveEdges=null},t.ClipperBase.horizontal=-9007199254740992,t.ClipperBase.Skip=-2,t.ClipperBase.Unassigned=-1,t.ClipperBase.tolerance=1e-20,t.ClipperBase.loRange=47453132,t.ClipperBase.hiRange=0xfffffffffffff,t.ClipperBase.near_zero=function(s){return s>-t.ClipperBase.tolerance&&s<t.ClipperBase.tolerance},t.ClipperBase.IsHorizontal=function(s){return s.Delta.Y===0},t.ClipperBase.prototype.PointIsVertex=function(s,a){var h=a;do{if(t.IntPoint.op_Equality(h.Pt,s))return!0;h=h.Next}while(h!==a);return!1},t.ClipperBase.prototype.PointOnLineSegment=function(s,a,h,d){return d?s.X===a.X&&s.Y===a.Y||s.X===h.X&&s.Y===h.Y||s.X>a.X==s.X<h.X&&s.Y>a.Y==s.Y<h.Y&&Ft.op_Equality(Ft.Int128Mul(s.X-a.X,h.Y-a.Y),Ft.Int128Mul(h.X-a.X,s.Y-a.Y)):s.X===a.X&&s.Y===a.Y||s.X===h.X&&s.Y===h.Y||s.X>a.X==s.X<h.X&&s.Y>a.Y==s.Y<h.Y&&(s.X-a.X)*(h.Y-a.Y)===(h.X-a.X)*(s.Y-a.Y)},t.ClipperBase.prototype.PointOnPolygon=function(s,a,h){for(var d=a;;){if(this.PointOnLineSegment(s,d.Pt,d.Next.Pt,h))return!0;if(d=d.Next,d===a)break}return!1},t.ClipperBase.prototype.SlopesEqual=t.ClipperBase.SlopesEqual=function(){var s=arguments,a=s.length,h,d,x,E,A,D,O;return a===3?(h=s[0],d=s[1],O=s[2],O?Ft.op_Equality(Ft.Int128Mul(h.Delta.Y,d.Delta.X),Ft.Int128Mul(h.Delta.X,d.Delta.Y)):t.Cast_Int64(h.Delta.Y*d.Delta.X)===t.Cast_Int64(h.Delta.X*d.Delta.Y)):a===4?(x=s[0],E=s[1],A=s[2],O=s[3],O?Ft.op_Equality(Ft.Int128Mul(x.Y-E.Y,E.X-A.X),Ft.Int128Mul(x.X-E.X,E.Y-A.Y)):t.Cast_Int64((x.Y-E.Y)*(E.X-A.X))-t.Cast_Int64((x.X-E.X)*(E.Y-A.Y))===0):(x=s[0],E=s[1],A=s[2],D=s[3],O=s[4],O?Ft.op_Equality(Ft.Int128Mul(x.Y-E.Y,A.X-D.X),Ft.Int128Mul(x.X-E.X,A.Y-D.Y)):t.Cast_Int64((x.Y-E.Y)*(A.X-D.X))-t.Cast_Int64((x.X-E.X)*(A.Y-D.Y))===0)},t.ClipperBase.SlopesEqual3=function(s,a,h){return h?Ft.op_Equality(Ft.Int128Mul(s.Delta.Y,a.Delta.X),Ft.Int128Mul(s.Delta.X,a.Delta.Y)):t.Cast_Int64(s.Delta.Y*a.Delta.X)===t.Cast_Int64(s.Delta.X*a.Delta.Y)},t.ClipperBase.SlopesEqual4=function(s,a,h,d){return d?Ft.op_Equality(Ft.Int128Mul(s.Y-a.Y,a.X-h.X),Ft.Int128Mul(s.X-a.X,a.Y-h.Y)):t.Cast_Int64((s.Y-a.Y)*(a.X-h.X))-t.Cast_Int64((s.X-a.X)*(a.Y-h.Y))===0},t.ClipperBase.SlopesEqual5=function(s,a,h,d,x){return x?Ft.op_Equality(Ft.Int128Mul(s.Y-a.Y,h.X-d.X),Ft.Int128Mul(s.X-a.X,h.Y-d.Y)):t.Cast_Int64((s.Y-a.Y)*(h.X-d.X))-t.Cast_Int64((s.X-a.X)*(h.Y-d.Y))===0},t.ClipperBase.prototype.Clear=function(){this.DisposeLocalMinimaList();for(var s=0,a=this.m_edges.length;s<a;++s){for(var h=0,d=this.m_edges[s].length;h<d;++h)this.m_edges[s][h]=null;t.Clear(this.m_edges[s])}t.Clear(this.m_edges),this.m_UseFullRange=!1,this.m_HasOpenPaths=!1},t.ClipperBase.prototype.DisposeLocalMinimaList=function(){for(;this.m_MinimaList!==null;){var s=this.m_MinimaList.Next;this.m_MinimaList=null,this.m_MinimaList=s}this.m_CurrentLM=null},t.ClipperBase.prototype.RangeTest=function(s,a){a.Value?(s.X>t.ClipperBase.hiRange||s.Y>t.ClipperBase.hiRange||-s.X>t.ClipperBase.hiRange||-s.Y>t.ClipperBase.hiRange)&&t.Error("Coordinate outside allowed range in RangeTest()."):(s.X>t.ClipperBase.loRange||s.Y>t.ClipperBase.loRange||-s.X>t.ClipperBase.loRange||-s.Y>t.ClipperBase.loRange)&&(a.Value=!0,this.RangeTest(s,a))},t.ClipperBase.prototype.InitEdge=function(s,a,h,d){s.Next=a,s.Prev=h,s.Curr.X=d.X,s.Curr.Y=d.Y,t.use_xyz&&(s.Curr.Z=d.Z),s.OutIdx=-1},t.ClipperBase.prototype.InitEdge2=function(s,a){s.Curr.Y>=s.Next.Curr.Y?(s.Bot.X=s.Curr.X,s.Bot.Y=s.Curr.Y,t.use_xyz&&(s.Bot.Z=s.Curr.Z),s.Top.X=s.Next.Curr.X,s.Top.Y=s.Next.Curr.Y,t.use_xyz&&(s.Top.Z=s.Next.Curr.Z)):(s.Top.X=s.Curr.X,s.Top.Y=s.Curr.Y,t.use_xyz&&(s.Top.Z=s.Curr.Z),s.Bot.X=s.Next.Curr.X,s.Bot.Y=s.Next.Curr.Y,t.use_xyz&&(s.Bot.Z=s.Next.Curr.Z)),this.SetDx(s),s.PolyTyp=a},t.ClipperBase.prototype.FindNextLocMin=function(s){for(var a;;){for(;t.IntPoint.op_Inequality(s.Bot,s.Prev.Bot)||t.IntPoint.op_Equality(s.Curr,s.Top);)s=s.Next;if(s.Dx!==t.ClipperBase.horizontal&&s.Prev.Dx!==t.ClipperBase.horizontal)break;for(;s.Prev.Dx===t.ClipperBase.horizontal;)s=s.Prev;for(a=s;s.Dx===t.ClipperBase.horizontal;)s=s.Next;if(s.Top.Y!==s.Prev.Bot.Y){a.Prev.Bot.X<s.Bot.X&&(s=a);break}}return s},t.ClipperBase.prototype.ProcessBound=function(s,a){var h,d=s,x;if(d.OutIdx===t.ClipperBase.Skip){if(s=d,a){for(;s.Top.Y===s.Next.Bot.Y;)s=s.Next;for(;s!==d&&s.Dx===t.ClipperBase.horizontal;)s=s.Prev}else{for(;s.Top.Y===s.Prev.Bot.Y;)s=s.Prev;for(;s!==d&&s.Dx===t.ClipperBase.horizontal;)s=s.Next}if(s===d)a?d=s.Next:d=s.Prev;else{a?s=d.Next:s=d.Prev;var E=new t.LocalMinima;E.Next=null,E.Y=s.Bot.Y,E.LeftBound=null,E.RightBound=s,s.WindDelta=0,d=this.ProcessBound(s,a),this.InsertLocalMinima(E)}return d}if(s.Dx===t.ClipperBase.horizontal&&(a?h=s.Prev:h=s.Next,h.Dx===t.ClipperBase.horizontal?h.Bot.X!==s.Bot.X&&h.Top.X!==s.Bot.X&&this.ReverseHorizontal(s):h.Bot.X!==s.Bot.X&&this.ReverseHorizontal(s)),h=s,a){for(;d.Top.Y===d.Next.Bot.Y&&d.Next.OutIdx!==t.ClipperBase.Skip;)d=d.Next;if(d.Dx===t.ClipperBase.horizontal&&d.Next.OutIdx!==t.ClipperBase.Skip){for(x=d;x.Prev.Dx===t.ClipperBase.horizontal;)x=x.Prev;x.Prev.Top.X>d.Next.Top.X&&(d=x.Prev)}for(;s!==d;)s.NextInLML=s.Next,s.Dx===t.ClipperBase.horizontal&&s!==h&&s.Bot.X!==s.Prev.Top.X&&this.ReverseHorizontal(s),s=s.Next;s.Dx===t.ClipperBase.horizontal&&s!==h&&s.Bot.X!==s.Prev.Top.X&&this.ReverseHorizontal(s),d=d.Next}else{for(;d.Top.Y===d.Prev.Bot.Y&&d.Prev.OutIdx!==t.ClipperBase.Skip;)d=d.Prev;if(d.Dx===t.ClipperBase.horizontal&&d.Prev.OutIdx!==t.ClipperBase.Skip){for(x=d;x.Next.Dx===t.ClipperBase.horizontal;)x=x.Next;(x.Next.Top.X===d.Prev.Top.X||x.Next.Top.X>d.Prev.Top.X)&&(d=x.Next)}for(;s!==d;)s.NextInLML=s.Prev,s.Dx===t.ClipperBase.horizontal&&s!==h&&s.Bot.X!==s.Next.Top.X&&this.ReverseHorizontal(s),s=s.Prev;s.Dx===t.ClipperBase.horizontal&&s!==h&&s.Bot.X!==s.Next.Top.X&&this.ReverseHorizontal(s),d=d.Prev}return d},t.ClipperBase.prototype.AddPath=function(s,a,h){t.use_lines?!h&&a===t.PolyType.ptClip&&t.Error("AddPath: Open paths must be subject."):h||t.Error("AddPath: Open paths have been disabled.");var d=s.length-1;if(h)for(;d>0&&t.IntPoint.op_Equality(s[d],s[0]);)--d;for(;d>0&&t.IntPoint.op_Equality(s[d],s[d-1]);)--d;if(h&&d<2||!h&&d<1)return!1;for(var x=new Array,E=0;E<=d;E++)x.push(new t.TEdge);var A=!0;x[1].Curr.X=s[1].X,x[1].Curr.Y=s[1].Y,t.use_xyz&&(x[1].Curr.Z=s[1].Z);var D={Value:this.m_UseFullRange};this.RangeTest(s[0],D),this.m_UseFullRange=D.Value,D.Value=this.m_UseFullRange,this.RangeTest(s[d],D),this.m_UseFullRange=D.Value,this.InitEdge(x[0],x[1],x[d],s[0]),this.InitEdge(x[d],x[0],x[d-1],s[d]);for(var E=d-1;E>=1;--E)D.Value=this.m_UseFullRange,this.RangeTest(s[E],D),this.m_UseFullRange=D.Value,this.InitEdge(x[E],x[E+1],x[E-1],s[E]);for(var O=x[0],V=O,at=O;;){if(V.Curr===V.Next.Curr&&(h||V.Next!==O)){if(V===V.Next)break;V===O&&(O=V.Next),V=this.RemoveEdge(V),at=V;continue}if(V.Prev===V.Next)break;if(h&&t.ClipperBase.SlopesEqual4(V.Prev.Curr,V.Curr,V.Next.Curr,this.m_UseFullRange)&&(!this.PreserveCollinear||!this.Pt2IsBetweenPt1AndPt3(V.Prev.Curr,V.Curr,V.Next.Curr))){V===O&&(O=V.Next),V=this.RemoveEdge(V),V=V.Prev,at=V;continue}if(V=V.Next,V===at||!h&&V.Next===O)break}if(!h&&V===V.Next||h&&V.Prev===V.Next)return!1;h||(this.m_HasOpenPaths=!0,O.Prev.OutIdx=t.ClipperBase.Skip),V=O;do this.InitEdge2(V,a),V=V.Next,A&&V.Curr.Y!==O.Curr.Y&&(A=!1);while(V!==O);if(A){if(h)return!1;V.Prev.OutIdx=t.ClipperBase.Skip;var tt=new t.LocalMinima;for(tt.Next=null,tt.Y=V.Bot.Y,tt.LeftBound=null,tt.RightBound=V,tt.RightBound.Side=t.EdgeSide.esRight,tt.RightBound.WindDelta=0;V.Bot.X!==V.Prev.Top.X&&this.ReverseHorizontal(V),V.Next.OutIdx!==t.ClipperBase.Skip;)V.NextInLML=V.Next,V=V.Next;return this.InsertLocalMinima(tt),this.m_edges.push(x),!0}this.m_edges.push(x);var pt,Bt=null;for(t.IntPoint.op_Equality(V.Prev.Bot,V.Prev.Top)&&(V=V.Next);V=this.FindNextLocMin(V),V!==Bt;){Bt===null&&(Bt=V);var tt=new t.LocalMinima;tt.Next=null,tt.Y=V.Bot.Y,V.Dx<V.Prev.Dx?(tt.LeftBound=V.Prev,tt.RightBound=V,pt=!1):(tt.LeftBound=V,tt.RightBound=V.Prev,pt=!0),tt.LeftBound.Side=t.EdgeSide.esLeft,tt.RightBound.Side=t.EdgeSide.esRight,h?tt.LeftBound.Next===tt.RightBound?tt.LeftBound.WindDelta=-1:tt.LeftBound.WindDelta=1:tt.LeftBound.WindDelta=0,tt.RightBound.WindDelta=-tt.LeftBound.WindDelta,V=this.ProcessBound(tt.LeftBound,pt),V.OutIdx===t.ClipperBase.Skip&&(V=this.ProcessBound(V,pt));var ee=this.ProcessBound(tt.RightBound,!pt);ee.OutIdx===t.ClipperBase.Skip&&(ee=this.ProcessBound(ee,!pt)),tt.LeftBound.OutIdx===t.ClipperBase.Skip?tt.LeftBound=null:tt.RightBound.OutIdx===t.ClipperBase.Skip&&(tt.RightBound=null),this.InsertLocalMinima(tt),pt||(V=ee)}return!0},t.ClipperBase.prototype.AddPaths=function(s,a,h){for(var d=!1,x=0,E=s.length;x<E;++x)this.AddPath(s[x],a,h)&&(d=!0);return d},t.ClipperBase.prototype.Pt2IsBetweenPt1AndPt3=function(s,a,h){return t.IntPoint.op_Equality(s,h)||t.IntPoint.op_Equality(s,a)||t.IntPoint.op_Equality(h,a)?!1:s.X!==h.X?a.X>s.X==a.X<h.X:a.Y>s.Y==a.Y<h.Y},t.ClipperBase.prototype.RemoveEdge=function(s){s.Prev.Next=s.Next,s.Next.Prev=s.Prev;var a=s.Next;return s.Prev=null,a},t.ClipperBase.prototype.SetDx=function(s){s.Delta.X=s.Top.X-s.Bot.X,s.Delta.Y=s.Top.Y-s.Bot.Y,s.Delta.Y===0?s.Dx=t.ClipperBase.horizontal:s.Dx=s.Delta.X/s.Delta.Y},t.ClipperBase.prototype.InsertLocalMinima=function(s){if(this.m_MinimaList===null)this.m_MinimaList=s;else if(s.Y>=this.m_MinimaList.Y)s.Next=this.m_MinimaList,this.m_MinimaList=s;else{for(var a=this.m_MinimaList;a.Next!==null&&s.Y<a.Next.Y;)a=a.Next;s.Next=a.Next,a.Next=s}},t.ClipperBase.prototype.PopLocalMinima=function(s,a){return a.v=this.m_CurrentLM,this.m_CurrentLM!==null&&this.m_CurrentLM.Y===s?(this.m_CurrentLM=this.m_CurrentLM.Next,!0):!1},t.ClipperBase.prototype.ReverseHorizontal=function(s){var a=s.Top.X;s.Top.X=s.Bot.X,s.Bot.X=a,t.use_xyz&&(a=s.Top.Z,s.Top.Z=s.Bot.Z,s.Bot.Z=a)},t.ClipperBase.prototype.Reset=function(){if(this.m_CurrentLM=this.m_MinimaList,this.m_CurrentLM!==null){this.m_Scanbeam=null;for(var s=this.m_MinimaList;s!==null;){this.InsertScanbeam(s.Y);var a=s.LeftBound;a!==null&&(a.Curr.X=a.Bot.X,a.Curr.Y=a.Bot.Y,t.use_xyz&&(a.Curr.Z=a.Bot.Z),a.OutIdx=t.ClipperBase.Unassigned),a=s.RightBound,a!==null&&(a.Curr.X=a.Bot.X,a.Curr.Y=a.Bot.Y,t.use_xyz&&(a.Curr.Z=a.Bot.Z),a.OutIdx=t.ClipperBase.Unassigned),s=s.Next}this.m_ActiveEdges=null}},t.ClipperBase.prototype.InsertScanbeam=function(s){if(this.m_Scanbeam===null)this.m_Scanbeam=new t.Scanbeam,this.m_Scanbeam.Next=null,this.m_Scanbeam.Y=s;else if(s>this.m_Scanbeam.Y){var a=new t.Scanbeam;a.Y=s,a.Next=this.m_Scanbeam,this.m_Scanbeam=a}else{for(var h=this.m_Scanbeam;h.Next!==null&&s<=h.Next.Y;)h=h.Next;if(s===h.Y)return;var d=new t.Scanbeam;d.Y=s,d.Next=h.Next,h.Next=d}},t.ClipperBase.prototype.PopScanbeam=function(s){return this.m_Scanbeam===null?(s.v=0,!1):(s.v=this.m_Scanbeam.Y,this.m_Scanbeam=this.m_Scanbeam.Next,!0)},t.ClipperBase.prototype.LocalMinimaPending=function(){return this.m_CurrentLM!==null},t.ClipperBase.prototype.CreateOutRec=function(){var s=new t.OutRec;return s.Idx=t.ClipperBase.Unassigned,s.IsHole=!1,s.IsOpen=!1,s.FirstLeft=null,s.Pts=null,s.BottomPt=null,s.PolyNode=null,this.m_PolyOuts.push(s),s.Idx=this.m_PolyOuts.length-1,s},t.ClipperBase.prototype.DisposeOutRec=function(s){var a=this.m_PolyOuts[s];a.Pts=null,a=null,this.m_PolyOuts[s]=null},t.ClipperBase.prototype.UpdateEdgeIntoAEL=function(s){s.NextInLML===null&&t.Error("UpdateEdgeIntoAEL: invalid call");var a=s.PrevInAEL,h=s.NextInAEL;return s.NextInLML.OutIdx=s.OutIdx,a!==null?a.NextInAEL=s.NextInLML:this.m_ActiveEdges=s.NextInLML,h!==null&&(h.PrevInAEL=s.NextInLML),s.NextInLML.Side=s.Side,s.NextInLML.WindDelta=s.WindDelta,s.NextInLML.WindCnt=s.WindCnt,s.NextInLML.WindCnt2=s.WindCnt2,s=s.NextInLML,s.Curr.X=s.Bot.X,s.Curr.Y=s.Bot.Y,s.PrevInAEL=a,s.NextInAEL=h,t.ClipperBase.IsHorizontal(s)||this.InsertScanbeam(s.Top.Y),s},t.ClipperBase.prototype.SwapPositionsInAEL=function(s,a){if(!(s.NextInAEL===s.PrevInAEL||a.NextInAEL===a.PrevInAEL)){if(s.NextInAEL===a){var h=a.NextInAEL;h!==null&&(h.PrevInAEL=s);var d=s.PrevInAEL;d!==null&&(d.NextInAEL=a),a.PrevInAEL=d,a.NextInAEL=s,s.PrevInAEL=a,s.NextInAEL=h}else if(a.NextInAEL===s){var x=s.NextInAEL;x!==null&&(x.PrevInAEL=a);var E=a.PrevInAEL;E!==null&&(E.NextInAEL=s),s.PrevInAEL=E,s.NextInAEL=a,a.PrevInAEL=s,a.NextInAEL=x}else{var A=s.NextInAEL,D=s.PrevInAEL;s.NextInAEL=a.NextInAEL,s.NextInAEL!==null&&(s.NextInAEL.PrevInAEL=s),s.PrevInAEL=a.PrevInAEL,s.PrevInAEL!==null&&(s.PrevInAEL.NextInAEL=s),a.NextInAEL=A,a.NextInAEL!==null&&(a.NextInAEL.PrevInAEL=a),a.PrevInAEL=D,a.PrevInAEL!==null&&(a.PrevInAEL.NextInAEL=a)}s.PrevInAEL===null?this.m_ActiveEdges=s:a.PrevInAEL===null&&(this.m_ActiveEdges=a)}},t.ClipperBase.prototype.DeleteFromAEL=function(s){var a=s.PrevInAEL,h=s.NextInAEL;a===null&&h===null&&s!==this.m_ActiveEdges||(a!==null?a.NextInAEL=h:this.m_ActiveEdges=h,h!==null&&(h.PrevInAEL=a),s.NextInAEL=null,s.PrevInAEL=null)},t.Clipper=function(s){typeof s>"u"&&(s=0),this.m_PolyOuts=null,this.m_ClipType=t.ClipType.ctIntersection,this.m_Scanbeam=null,this.m_Maxima=null,this.m_ActiveEdges=null,this.m_SortedEdges=null,this.m_IntersectList=null,this.m_IntersectNodeComparer=null,this.m_ExecuteLocked=!1,this.m_ClipFillType=t.PolyFillType.pftEvenOdd,this.m_SubjFillType=t.PolyFillType.pftEvenOdd,this.m_Joins=null,this.m_GhostJoins=null,this.m_UsingPolyTree=!1,this.ReverseSolution=!1,this.StrictlySimple=!1,t.ClipperBase.call(this),this.m_Scanbeam=null,this.m_Maxima=null,this.m_ActiveEdges=null,this.m_SortedEdges=null,this.m_IntersectList=new Array,this.m_IntersectNodeComparer=t.MyIntersectNodeSort.Compare,this.m_ExecuteLocked=!1,this.m_UsingPolyTree=!1,this.m_PolyOuts=new Array,this.m_Joins=new Array,this.m_GhostJoins=new Array,this.ReverseSolution=(1&s)!==0,this.StrictlySimple=(2&s)!==0,this.PreserveCollinear=(4&s)!==0,t.use_xyz&&(this.ZFillFunction=null)},t.Clipper.ioReverseSolution=1,t.Clipper.ioStrictlySimple=2,t.Clipper.ioPreserveCollinear=4,t.Clipper.prototype.Clear=function(){this.m_edges.length!==0&&(this.DisposeAllPolyPts(),t.ClipperBase.prototype.Clear.call(this))},t.Clipper.prototype.InsertMaxima=function(s){var a=new t.Maxima;if(a.X=s,this.m_Maxima===null)this.m_Maxima=a,this.m_Maxima.Next=null,this.m_Maxima.Prev=null;else if(s<this.m_Maxima.X)a.Next=this.m_Maxima,a.Prev=null,this.m_Maxima=a;else{for(var h=this.m_Maxima;h.Next!==null&&s>=h.Next.X;)h=h.Next;if(s===h.X)return;a.Next=h.Next,a.Prev=h,h.Next!==null&&(h.Next.Prev=a),h.Next=a}},t.Clipper.prototype.Execute=function(){var s=arguments,a=s.length,h=s[1]instanceof t.PolyTree;if(a===4&&!h){var d=s[0],x=s[1],E=s[2],A=s[3];if(this.m_ExecuteLocked)return!1;this.m_HasOpenPaths&&t.Error("Error: PolyTree struct is needed for open path clipping."),this.m_ExecuteLocked=!0,t.Clear(x),this.m_SubjFillType=E,this.m_ClipFillType=A,this.m_ClipType=d,this.m_UsingPolyTree=!1;try{var D=this.ExecuteInternal();D&&this.BuildResult(x)}finally{this.DisposeAllPolyPts(),this.m_ExecuteLocked=!1}return D}else if(a===4&&h){var d=s[0],O=s[1],E=s[2],A=s[3];if(this.m_ExecuteLocked)return!1;this.m_ExecuteLocked=!0,this.m_SubjFillType=E,this.m_ClipFillType=A,this.m_ClipType=d,this.m_UsingPolyTree=!0;try{var D=this.ExecuteInternal();D&&this.BuildResult2(O)}finally{this.DisposeAllPolyPts(),this.m_ExecuteLocked=!1}return D}else if(a===2&&!h){var d=s[0],x=s[1];return this.Execute(d,x,t.PolyFillType.pftEvenOdd,t.PolyFillType.pftEvenOdd)}else if(a===2&&h){var d=s[0],O=s[1];return this.Execute(d,O,t.PolyFillType.pftEvenOdd,t.PolyFillType.pftEvenOdd)}},t.Clipper.prototype.FixHoleLinkage=function(s){if(!(s.FirstLeft===null||s.IsHole!==s.FirstLeft.IsHole&&s.FirstLeft.Pts!==null)){for(var a=s.FirstLeft;a!==null&&(a.IsHole===s.IsHole||a.Pts===null);)a=a.FirstLeft;s.FirstLeft=a}},t.Clipper.prototype.ExecuteInternal=function(){try{this.Reset(),this.m_SortedEdges=null,this.m_Maxima=null;var s={},a={};if(!this.PopScanbeam(s))return!1;for(this.InsertLocalMinimaIntoAEL(s.v);this.PopScanbeam(a)||this.LocalMinimaPending();){if(this.ProcessHorizontals(),this.m_GhostJoins.length=0,!this.ProcessIntersections(a.v))return!1;this.ProcessEdgesAtTopOfScanbeam(a.v),s.v=a.v,this.InsertLocalMinimaIntoAEL(s.v)}var h,d,x;for(d=0,x=this.m_PolyOuts.length;d<x;d++)h=this.m_PolyOuts[d],!(h.Pts===null||h.IsOpen)&&(h.IsHole^this.ReverseSolution)==this.Area$1(h)>0&&this.ReversePolyPtLinks(h.Pts);for(this.JoinCommonEdges(),d=0,x=this.m_PolyOuts.length;d<x;d++)h=this.m_PolyOuts[d],h.Pts!==null&&(h.IsOpen?this.FixupOutPolyline(h):this.FixupOutPolygon(h));return this.StrictlySimple&&this.DoSimplePolygons(),!0}finally{this.m_Joins.length=0,this.m_GhostJoins.length=0}},t.Clipper.prototype.DisposeAllPolyPts=function(){for(var s=0,a=this.m_PolyOuts.length;s<a;++s)this.DisposeOutRec(s);t.Clear(this.m_PolyOuts)},t.Clipper.prototype.AddJoin=function(s,a,h){var d=new t.Join;d.OutPt1=s,d.OutPt2=a,d.OffPt.X=h.X,d.OffPt.Y=h.Y,t.use_xyz&&(d.OffPt.Z=h.Z),this.m_Joins.push(d)},t.Clipper.prototype.AddGhostJoin=function(s,a){var h=new t.Join;h.OutPt1=s,h.OffPt.X=a.X,h.OffPt.Y=a.Y,t.use_xyz&&(h.OffPt.Z=a.Z),this.m_GhostJoins.push(h)},t.Clipper.prototype.SetZ=function(s,a,h){if(this.ZFillFunction!==null){if(s.Z!==0||this.ZFillFunction===null)return;t.IntPoint.op_Equality(s,a.Bot)?s.Z=a.Bot.Z:t.IntPoint.op_Equality(s,a.Top)?s.Z=a.Top.Z:t.IntPoint.op_Equality(s,h.Bot)?s.Z=h.Bot.Z:t.IntPoint.op_Equality(s,h.Top)?s.Z=h.Top.Z:this.ZFillFunction(a.Bot,a.Top,h.Bot,h.Top,s)}},t.Clipper.prototype.InsertLocalMinimaIntoAEL=function(s){for(var a={},h,d;this.PopLocalMinima(s,a);){h=a.v.LeftBound,d=a.v.RightBound;var x=null;if(h===null?(this.InsertEdgeIntoAEL(d,null),this.SetWindingCount(d),this.IsContributing(d)&&(x=this.AddOutPt(d,d.Bot))):d===null?(this.InsertEdgeIntoAEL(h,null),this.SetWindingCount(h),this.IsContributing(h)&&(x=this.AddOutPt(h,h.Bot)),this.InsertScanbeam(h.Top.Y)):(this.InsertEdgeIntoAEL(h,null),this.InsertEdgeIntoAEL(d,h),this.SetWindingCount(h),d.WindCnt=h.WindCnt,d.WindCnt2=h.WindCnt2,this.IsContributing(h)&&(x=this.AddLocalMinPoly(h,d,h.Bot)),this.InsertScanbeam(h.Top.Y)),d!==null&&(t.ClipperBase.IsHorizontal(d)?(d.NextInLML!==null&&this.InsertScanbeam(d.NextInLML.Top.Y),this.AddEdgeToSEL(d)):this.InsertScanbeam(d.Top.Y)),!(h===null||d===null)){if(x!==null&&t.ClipperBase.IsHorizontal(d)&&this.m_GhostJoins.length>0&&d.WindDelta!==0)for(var E=0,A=this.m_GhostJoins.length;E<A;E++){var D=this.m_GhostJoins[E];this.HorzSegmentsOverlap(D.OutPt1.Pt.X,D.OffPt.X,d.Bot.X,d.Top.X)&&this.AddJoin(D.OutPt1,x,D.OffPt)}if(h.OutIdx>=0&&h.PrevInAEL!==null&&h.PrevInAEL.Curr.X===h.Bot.X&&h.PrevInAEL.OutIdx>=0&&t.ClipperBase.SlopesEqual5(h.PrevInAEL.Curr,h.PrevInAEL.Top,h.Curr,h.Top,this.m_UseFullRange)&&h.WindDelta!==0&&h.PrevInAEL.WindDelta!==0){var O=this.AddOutPt(h.PrevInAEL,h.Bot);this.AddJoin(x,O,h.Top)}if(h.NextInAEL!==d){if(d.OutIdx>=0&&d.PrevInAEL.OutIdx>=0&&t.ClipperBase.SlopesEqual5(d.PrevInAEL.Curr,d.PrevInAEL.Top,d.Curr,d.Top,this.m_UseFullRange)&&d.WindDelta!==0&&d.PrevInAEL.WindDelta!==0){var O=this.AddOutPt(d.PrevInAEL,d.Bot);this.AddJoin(x,O,d.Top)}var V=h.NextInAEL;if(V!==null)for(;V!==d;)this.IntersectEdges(d,V,h.Curr),V=V.NextInAEL}}}},t.Clipper.prototype.InsertEdgeIntoAEL=function(s,a){if(this.m_ActiveEdges===null)s.PrevInAEL=null,s.NextInAEL=null,this.m_ActiveEdges=s;else if(a===null&&this.E2InsertsBeforeE1(this.m_ActiveEdges,s))s.PrevInAEL=null,s.NextInAEL=this.m_ActiveEdges,this.m_ActiveEdges.PrevInAEL=s,this.m_ActiveEdges=s;else{for(a===null&&(a=this.m_ActiveEdges);a.NextInAEL!==null&&!this.E2InsertsBeforeE1(a.NextInAEL,s);)a=a.NextInAEL;s.NextInAEL=a.NextInAEL,a.NextInAEL!==null&&(a.NextInAEL.PrevInAEL=s),s.PrevInAEL=a,a.NextInAEL=s}},t.Clipper.prototype.E2InsertsBeforeE1=function(s,a){return a.Curr.X===s.Curr.X?a.Top.Y>s.Top.Y?a.Top.X<t.Clipper.TopX(s,a.Top.Y):s.Top.X>t.Clipper.TopX(a,s.Top.Y):a.Curr.X<s.Curr.X},t.Clipper.prototype.IsEvenOddFillType=function(s){return s.PolyTyp===t.PolyType.ptSubject?this.m_SubjFillType===t.PolyFillType.pftEvenOdd:this.m_ClipFillType===t.PolyFillType.pftEvenOdd},t.Clipper.prototype.IsEvenOddAltFillType=function(s){return s.PolyTyp===t.PolyType.ptSubject?this.m_ClipFillType===t.PolyFillType.pftEvenOdd:this.m_SubjFillType===t.PolyFillType.pftEvenOdd},t.Clipper.prototype.IsContributing=function(s){var a,h;switch(s.PolyTyp===t.PolyType.ptSubject?(a=this.m_SubjFillType,h=this.m_ClipFillType):(a=this.m_ClipFillType,h=this.m_SubjFillType),a){case t.PolyFillType.pftEvenOdd:if(s.WindDelta===0&&s.WindCnt!==1)return!1;break;case t.PolyFillType.pftNonZero:if(Math.abs(s.WindCnt)!==1)return!1;break;case t.PolyFillType.pftPositive:if(s.WindCnt!==1)return!1;break;default:if(s.WindCnt!==-1)return!1;break}switch(this.m_ClipType){case t.ClipType.ctIntersection:switch(h){case t.PolyFillType.pftEvenOdd:case t.PolyFillType.pftNonZero:return s.WindCnt2!==0;case t.PolyFillType.pftPositive:return s.WindCnt2>0;default:return s.WindCnt2<0}case t.ClipType.ctUnion:switch(h){case t.PolyFillType.pftEvenOdd:case t.PolyFillType.pftNonZero:return s.WindCnt2===0;case t.PolyFillType.pftPositive:return s.WindCnt2<=0;default:return s.WindCnt2>=0}case t.ClipType.ctDifference:if(s.PolyTyp===t.PolyType.ptSubject)switch(h){case t.PolyFillType.pftEvenOdd:case t.PolyFillType.pftNonZero:return s.WindCnt2===0;case t.PolyFillType.pftPositive:return s.WindCnt2<=0;default:return s.WindCnt2>=0}else switch(h){case t.PolyFillType.pftEvenOdd:case t.PolyFillType.pftNonZero:return s.WindCnt2!==0;case t.PolyFillType.pftPositive:return s.WindCnt2>0;default:return s.WindCnt2<0}case t.ClipType.ctXor:if(s.WindDelta===0)switch(h){case t.PolyFillType.pftEvenOdd:case t.PolyFillType.pftNonZero:return s.WindCnt2===0;case t.PolyFillType.pftPositive:return s.WindCnt2<=0;default:return s.WindCnt2>=0}else return!0}return!0},t.Clipper.prototype.SetWindingCount=function(s){for(var a=s.PrevInAEL;a!==null&&(a.PolyTyp!==s.PolyTyp||a.WindDelta===0);)a=a.PrevInAEL;if(a===null){var h=s.PolyTyp===t.PolyType.ptSubject?this.m_SubjFillType:this.m_ClipFillType;s.WindDelta===0?s.WindCnt=h===t.PolyFillType.pftNegative?-1:1:s.WindCnt=s.WindDelta,s.WindCnt2=0,a=this.m_ActiveEdges}else if(s.WindDelta===0&&this.m_ClipType!==t.ClipType.ctUnion)s.WindCnt=1,s.WindCnt2=a.WindCnt2,a=a.NextInAEL;else if(this.IsEvenOddFillType(s)){if(s.WindDelta===0){for(var d=!0,x=a.PrevInAEL;x!==null;)x.PolyTyp===a.PolyTyp&&x.WindDelta!==0&&(d=!d),x=x.PrevInAEL;s.WindCnt=d?0:1}else s.WindCnt=s.WindDelta;s.WindCnt2=a.WindCnt2,a=a.NextInAEL}else a.WindCnt*a.WindDelta<0?Math.abs(a.WindCnt)>1?a.WindDelta*s.WindDelta<0?s.WindCnt=a.WindCnt:s.WindCnt=a.WindCnt+s.WindDelta:s.WindCnt=s.WindDelta===0?1:s.WindDelta:s.WindDelta===0?s.WindCnt=a.WindCnt<0?a.WindCnt-1:a.WindCnt+1:a.WindDelta*s.WindDelta<0?s.WindCnt=a.WindCnt:s.WindCnt=a.WindCnt+s.WindDelta,s.WindCnt2=a.WindCnt2,a=a.NextInAEL;if(this.IsEvenOddAltFillType(s))for(;a!==s;)a.WindDelta!==0&&(s.WindCnt2=s.WindCnt2===0?1:0),a=a.NextInAEL;else for(;a!==s;)s.WindCnt2+=a.WindDelta,a=a.NextInAEL},t.Clipper.prototype.AddEdgeToSEL=function(s){this.m_SortedEdges===null?(this.m_SortedEdges=s,s.PrevInSEL=null,s.NextInSEL=null):(s.NextInSEL=this.m_SortedEdges,s.PrevInSEL=null,this.m_SortedEdges.PrevInSEL=s,this.m_SortedEdges=s)},t.Clipper.prototype.PopEdgeFromSEL=function(s){if(s.v=this.m_SortedEdges,s.v===null)return!1;var a=s.v;return this.m_SortedEdges=s.v.NextInSEL,this.m_SortedEdges!==null&&(this.m_SortedEdges.PrevInSEL=null),a.NextInSEL=null,a.PrevInSEL=null,!0},t.Clipper.prototype.CopyAELToSEL=function(){var s=this.m_ActiveEdges;for(this.m_SortedEdges=s;s!==null;)s.PrevInSEL=s.PrevInAEL,s.NextInSEL=s.NextInAEL,s=s.NextInAEL},t.Clipper.prototype.SwapPositionsInSEL=function(s,a){if(!(s.NextInSEL===null&&s.PrevInSEL===null)&&!(a.NextInSEL===null&&a.PrevInSEL===null)){if(s.NextInSEL===a){var h=a.NextInSEL;h!==null&&(h.PrevInSEL=s);var d=s.PrevInSEL;d!==null&&(d.NextInSEL=a),a.PrevInSEL=d,a.NextInSEL=s,s.PrevInSEL=a,s.NextInSEL=h}else if(a.NextInSEL===s){var h=s.NextInSEL;h!==null&&(h.PrevInSEL=a);var d=a.PrevInSEL;d!==null&&(d.NextInSEL=s),s.PrevInSEL=d,s.NextInSEL=a,a.PrevInSEL=s,a.NextInSEL=h}else{var h=s.NextInSEL,d=s.PrevInSEL;s.NextInSEL=a.NextInSEL,s.NextInSEL!==null&&(s.NextInSEL.PrevInSEL=s),s.PrevInSEL=a.PrevInSEL,s.PrevInSEL!==null&&(s.PrevInSEL.NextInSEL=s),a.NextInSEL=h,a.NextInSEL!==null&&(a.NextInSEL.PrevInSEL=a),a.PrevInSEL=d,a.PrevInSEL!==null&&(a.PrevInSEL.NextInSEL=a)}s.PrevInSEL===null?this.m_SortedEdges=s:a.PrevInSEL===null&&(this.m_SortedEdges=a)}},t.Clipper.prototype.AddLocalMaxPoly=function(s,a,h){this.AddOutPt(s,h),a.WindDelta===0&&this.AddOutPt(a,h),s.OutIdx===a.OutIdx?(s.OutIdx=-1,a.OutIdx=-1):s.OutIdx<a.OutIdx?this.AppendPolygon(s,a):this.AppendPolygon(a,s)},t.Clipper.prototype.AddLocalMinPoly=function(s,a,h){var d,x,E;if(t.ClipperBase.IsHorizontal(a)||s.Dx>a.Dx?(d=this.AddOutPt(s,h),a.OutIdx=s.OutIdx,s.Side=t.EdgeSide.esLeft,a.Side=t.EdgeSide.esRight,x=s,x.PrevInAEL===a?E=a.PrevInAEL:E=x.PrevInAEL):(d=this.AddOutPt(a,h),s.OutIdx=a.OutIdx,s.Side=t.EdgeSide.esRight,a.Side=t.EdgeSide.esLeft,x=a,x.PrevInAEL===s?E=s.PrevInAEL:E=x.PrevInAEL),E!==null&&E.OutIdx>=0&&E.Top.Y<h.Y&&x.Top.Y<h.Y){var A=t.Clipper.TopX(E,h.Y),D=t.Clipper.TopX(x,h.Y);if(A===D&&x.WindDelta!==0&&E.WindDelta!==0&&t.ClipperBase.SlopesEqual5(new t.IntPoint2(A,h.Y),E.Top,new t.IntPoint2(D,h.Y),x.Top,this.m_UseFullRange)){var O=this.AddOutPt(E,h);this.AddJoin(d,O,x.Top)}}return d},t.Clipper.prototype.AddOutPt=function(s,a){if(s.OutIdx<0){var h=this.CreateOutRec();h.IsOpen=s.WindDelta===0;var d=new t.OutPt;return h.Pts=d,d.Idx=h.Idx,d.Pt.X=a.X,d.Pt.Y=a.Y,t.use_xyz&&(d.Pt.Z=a.Z),d.Next=d,d.Prev=d,h.IsOpen||this.SetHoleState(s,h),s.OutIdx=h.Idx,d}else{var h=this.m_PolyOuts[s.OutIdx],x=h.Pts,E=s.Side===t.EdgeSide.esLeft;if(E&&t.IntPoint.op_Equality(a,x.Pt))return x;if(!E&&t.IntPoint.op_Equality(a,x.Prev.Pt))return x.Prev;var d=new t.OutPt;return d.Idx=h.Idx,d.Pt.X=a.X,d.Pt.Y=a.Y,t.use_xyz&&(d.Pt.Z=a.Z),d.Next=x,d.Prev=x.Prev,d.Prev.Next=d,x.Prev=d,E&&(h.Pts=d),d}},t.Clipper.prototype.GetLastOutPt=function(s){var a=this.m_PolyOuts[s.OutIdx];return s.Side===t.EdgeSide.esLeft?a.Pts:a.Pts.Prev},t.Clipper.prototype.SwapPoints=function(s,a){var h=new t.IntPoint1(s.Value);s.Value.X=a.Value.X,s.Value.Y=a.Value.Y,t.use_xyz&&(s.Value.Z=a.Value.Z),a.Value.X=h.X,a.Value.Y=h.Y,t.use_xyz&&(a.Value.Z=h.Z)},t.Clipper.prototype.HorzSegmentsOverlap=function(s,a,h,d){var x;return s>a&&(x=s,s=a,a=x),h>d&&(x=h,h=d,d=x),s<d&&h<a},t.Clipper.prototype.SetHoleState=function(s,a){for(var h=s.PrevInAEL,d=null;h!==null;)h.OutIdx>=0&&h.WindDelta!==0&&(d===null?d=h:d.OutIdx===h.OutIdx&&(d=null)),h=h.PrevInAEL;d===null?(a.FirstLeft=null,a.IsHole=!1):(a.FirstLeft=this.m_PolyOuts[d.OutIdx],a.IsHole=!a.FirstLeft.IsHole)},t.Clipper.prototype.GetDx=function(s,a){return s.Y===a.Y?t.ClipperBase.horizontal:(a.X-s.X)/(a.Y-s.Y)},t.Clipper.prototype.FirstIsBottomPt=function(s,a){for(var h=s.Prev;t.IntPoint.op_Equality(h.Pt,s.Pt)&&h!==s;)h=h.Prev;var d=Math.abs(this.GetDx(s.Pt,h.Pt));for(h=s.Next;t.IntPoint.op_Equality(h.Pt,s.Pt)&&h!==s;)h=h.Next;var x=Math.abs(this.GetDx(s.Pt,h.Pt));for(h=a.Prev;t.IntPoint.op_Equality(h.Pt,a.Pt)&&h!==a;)h=h.Prev;var E=Math.abs(this.GetDx(a.Pt,h.Pt));for(h=a.Next;t.IntPoint.op_Equality(h.Pt,a.Pt)&&h!==a;)h=h.Next;var A=Math.abs(this.GetDx(a.Pt,h.Pt));return Math.max(d,x)===Math.max(E,A)&&Math.min(d,x)===Math.min(E,A)?this.Area(s)>0:d>=E&&d>=A||x>=E&&x>=A},t.Clipper.prototype.GetBottomPt=function(s){for(var a=null,h=s.Next;h!==s;)h.Pt.Y>s.Pt.Y?(s=h,a=null):h.Pt.Y===s.Pt.Y&&h.Pt.X<=s.Pt.X&&(h.Pt.X<s.Pt.X?(a=null,s=h):h.Next!==s&&h.Prev!==s&&(a=h)),h=h.Next;if(a!==null)for(;a!==h;)for(this.FirstIsBottomPt(h,a)||(s=a),a=a.Next;t.IntPoint.op_Inequality(a.Pt,s.Pt);)a=a.Next;return s},t.Clipper.prototype.GetLowermostRec=function(s,a){s.BottomPt===null&&(s.BottomPt=this.GetBottomPt(s.Pts)),a.BottomPt===null&&(a.BottomPt=this.GetBottomPt(a.Pts));var h=s.BottomPt,d=a.BottomPt;return h.Pt.Y>d.Pt.Y?s:h.Pt.Y<d.Pt.Y?a:h.Pt.X<d.Pt.X?s:h.Pt.X>d.Pt.X||h.Next===h?a:d.Next===d||this.FirstIsBottomPt(h,d)?s:a},t.Clipper.prototype.OutRec1RightOfOutRec2=function(s,a){do if(s=s.FirstLeft,s===a)return!0;while(s!==null);return!1},t.Clipper.prototype.GetOutRec=function(s){for(var a=this.m_PolyOuts[s];a!==this.m_PolyOuts[a.Idx];)a=this.m_PolyOuts[a.Idx];return a},t.Clipper.prototype.AppendPolygon=function(s,a){var h=this.m_PolyOuts[s.OutIdx],d=this.m_PolyOuts[a.OutIdx],x;this.OutRec1RightOfOutRec2(h,d)?x=d:this.OutRec1RightOfOutRec2(d,h)?x=h:x=this.GetLowermostRec(h,d);var E=h.Pts,A=E.Prev,D=d.Pts,O=D.Prev;s.Side===t.EdgeSide.esLeft?a.Side===t.EdgeSide.esLeft?(this.ReversePolyPtLinks(D),D.Next=E,E.Prev=D,A.Next=O,O.Prev=A,h.Pts=O):(O.Next=E,E.Prev=O,D.Prev=A,A.Next=D,h.Pts=D):a.Side===t.EdgeSide.esRight?(this.ReversePolyPtLinks(D),A.Next=O,O.Prev=A,D.Next=E,E.Prev=D):(A.Next=D,D.Prev=A,E.Prev=O,O.Next=E),h.BottomPt=null,x===d&&(d.FirstLeft!==h&&(h.FirstLeft=d.FirstLeft),h.IsHole=d.IsHole),d.Pts=null,d.BottomPt=null,d.FirstLeft=h;var V=s.OutIdx,at=a.OutIdx;s.OutIdx=-1,a.OutIdx=-1;for(var tt=this.m_ActiveEdges;tt!==null;){if(tt.OutIdx===at){tt.OutIdx=V,tt.Side=s.Side;break}tt=tt.NextInAEL}d.Idx=h.Idx},t.Clipper.prototype.ReversePolyPtLinks=function(s){if(s!==null){var a,h;a=s;do h=a.Next,a.Next=a.Prev,a.Prev=h,a=h;while(a!==s)}},t.Clipper.SwapSides=function(s,a){var h=s.Side;s.Side=a.Side,a.Side=h},t.Clipper.SwapPolyIndexes=function(s,a){var h=s.OutIdx;s.OutIdx=a.OutIdx,a.OutIdx=h},t.Clipper.prototype.IntersectEdges=function(s,a,h){var d=s.OutIdx>=0,x=a.OutIdx>=0;if(t.use_xyz&&this.SetZ(h,s,a),t.use_lines&&(s.WindDelta===0||a.WindDelta===0)){if(s.WindDelta===0&&a.WindDelta===0)return;s.PolyTyp===a.PolyTyp&&s.WindDelta!==a.WindDelta&&this.m_ClipType===t.ClipType.ctUnion?s.WindDelta===0?x&&(this.AddOutPt(s,h),d&&(s.OutIdx=-1)):d&&(this.AddOutPt(a,h),x&&(a.OutIdx=-1)):s.PolyTyp!==a.PolyTyp&&(s.WindDelta===0&&Math.abs(a.WindCnt)===1&&(this.m_ClipType!==t.ClipType.ctUnion||a.WindCnt2===0)?(this.AddOutPt(s,h),d&&(s.OutIdx=-1)):a.WindDelta===0&&Math.abs(s.WindCnt)===1&&(this.m_ClipType!==t.ClipType.ctUnion||s.WindCnt2===0)&&(this.AddOutPt(a,h),x&&(a.OutIdx=-1)));return}if(s.PolyTyp===a.PolyTyp)if(this.IsEvenOddFillType(s)){var E=s.WindCnt;s.WindCnt=a.WindCnt,a.WindCnt=E}else s.WindCnt+a.WindDelta===0?s.WindCnt=-s.WindCnt:s.WindCnt+=a.WindDelta,a.WindCnt-s.WindDelta===0?a.WindCnt=-a.WindCnt:a.WindCnt-=s.WindDelta;else this.IsEvenOddFillType(a)?s.WindCnt2=s.WindCnt2===0?1:0:s.WindCnt2+=a.WindDelta,this.IsEvenOddFillType(s)?a.WindCnt2=a.WindCnt2===0?1:0:a.WindCnt2-=s.WindDelta;var A,D,O,V;s.PolyTyp===t.PolyType.ptSubject?(A=this.m_SubjFillType,O=this.m_ClipFillType):(A=this.m_ClipFillType,O=this.m_SubjFillType),a.PolyTyp===t.PolyType.ptSubject?(D=this.m_SubjFillType,V=this.m_ClipFillType):(D=this.m_ClipFillType,V=this.m_SubjFillType);var at,tt;switch(A){case t.PolyFillType.pftPositive:at=s.WindCnt;break;case t.PolyFillType.pftNegative:at=-s.WindCnt;break;default:at=Math.abs(s.WindCnt);break}switch(D){case t.PolyFillType.pftPositive:tt=a.WindCnt;break;case t.PolyFillType.pftNegative:tt=-a.WindCnt;break;default:tt=Math.abs(a.WindCnt);break}if(d&&x)at!==0&&at!==1||tt!==0&&tt!==1||s.PolyTyp!==a.PolyTyp&&this.m_ClipType!==t.ClipType.ctXor?this.AddLocalMaxPoly(s,a,h):(this.AddOutPt(s,h),this.AddOutPt(a,h),t.Clipper.SwapSides(s,a),t.Clipper.SwapPolyIndexes(s,a));else if(d)(tt===0||tt===1)&&(this.AddOutPt(s,h),t.Clipper.SwapSides(s,a),t.Clipper.SwapPolyIndexes(s,a));else if(x)(at===0||at===1)&&(this.AddOutPt(a,h),t.Clipper.SwapSides(s,a),t.Clipper.SwapPolyIndexes(s,a));else if((at===0||at===1)&&(tt===0||tt===1)){var pt,Bt;switch(O){case t.PolyFillType.pftPositive:pt=s.WindCnt2;break;case t.PolyFillType.pftNegative:pt=-s.WindCnt2;break;default:pt=Math.abs(s.WindCnt2);break}switch(V){case t.PolyFillType.pftPositive:Bt=a.WindCnt2;break;case t.PolyFillType.pftNegative:Bt=-a.WindCnt2;break;default:Bt=Math.abs(a.WindCnt2);break}if(s.PolyTyp!==a.PolyTyp)this.AddLocalMinPoly(s,a,h);else if(at===1&&tt===1)switch(this.m_ClipType){case t.ClipType.ctIntersection:pt>0&&Bt>0&&this.AddLocalMinPoly(s,a,h);break;case t.ClipType.ctUnion:pt<=0&&Bt<=0&&this.AddLocalMinPoly(s,a,h);break;case t.ClipType.ctDifference:(s.PolyTyp===t.PolyType.ptClip&&pt>0&&Bt>0||s.PolyTyp===t.PolyType.ptSubject&&pt<=0&&Bt<=0)&&this.AddLocalMinPoly(s,a,h);break;case t.ClipType.ctXor:this.AddLocalMinPoly(s,a,h);break}else t.Clipper.SwapSides(s,a)}},t.Clipper.prototype.DeleteFromSEL=function(s){var a=s.PrevInSEL,h=s.NextInSEL;a===null&&h===null&&s!==this.m_SortedEdges||(a!==null?a.NextInSEL=h:this.m_SortedEdges=h,h!==null&&(h.PrevInSEL=a),s.NextInSEL=null,s.PrevInSEL=null)},t.Clipper.prototype.ProcessHorizontals=function(){for(var s={};this.PopEdgeFromSEL(s);)this.ProcessHorizontal(s.v)},t.Clipper.prototype.GetHorzDirection=function(s,a){s.Bot.X<s.Top.X?(a.Left=s.Bot.X,a.Right=s.Top.X,a.Dir=t.Direction.dLeftToRight):(a.Left=s.Top.X,a.Right=s.Bot.X,a.Dir=t.Direction.dRightToLeft)},t.Clipper.prototype.ProcessHorizontal=function(s){var a={Dir:null,Left:null,Right:null};this.GetHorzDirection(s,a);for(var h=a.Dir,d=a.Left,x=a.Right,E=s.WindDelta===0,A=s,D=null;A.NextInLML!==null&&t.ClipperBase.IsHorizontal(A.NextInLML);)A=A.NextInLML;A.NextInLML===null&&(D=this.GetMaximaPair(A));var O=this.m_Maxima;if(O!==null)if(h===t.Direction.dLeftToRight){for(;O!==null&&O.X<=s.Bot.X;)O=O.Next;O!==null&&O.X>=A.Top.X&&(O=null)}else{for(;O.Next!==null&&O.Next.X<s.Bot.X;)O=O.Next;O.X<=A.Top.X&&(O=null)}for(var V=null;;){for(var at=s===A,tt=this.GetNextInAEL(s,h);tt!==null;){if(O!==null)if(h===t.Direction.dLeftToRight)for(;O!==null&&O.X<tt.Curr.X;)s.OutIdx>=0&&!E&&this.AddOutPt(s,new t.IntPoint2(O.X,s.Bot.Y)),O=O.Next;else for(;O!==null&&O.X>tt.Curr.X;)s.OutIdx>=0&&!E&&this.AddOutPt(s,new t.IntPoint2(O.X,s.Bot.Y)),O=O.Prev;if(h===t.Direction.dLeftToRight&&tt.Curr.X>x||h===t.Direction.dRightToLeft&&tt.Curr.X<d||tt.Curr.X===s.Top.X&&s.NextInLML!==null&&tt.Dx<s.NextInLML.Dx)break;if(s.OutIdx>=0&&!E){t.use_xyz&&(h===t.Direction.dLeftToRight?this.SetZ(tt.Curr,s,tt):this.SetZ(tt.Curr,tt,s)),V=this.AddOutPt(s,tt.Curr);for(var pt=this.m_SortedEdges;pt!==null;){if(pt.OutIdx>=0&&this.HorzSegmentsOverlap(s.Bot.X,s.Top.X,pt.Bot.X,pt.Top.X)){var Bt=this.GetLastOutPt(pt);this.AddJoin(Bt,V,pt.Top)}pt=pt.NextInSEL}this.AddGhostJoin(V,s.Bot)}if(tt===D&&at){s.OutIdx>=0&&this.AddLocalMaxPoly(s,D,s.Top),this.DeleteFromAEL(s),this.DeleteFromAEL(D);return}if(h===t.Direction.dLeftToRight){var ee=new t.IntPoint2(tt.Curr.X,s.Curr.Y);this.IntersectEdges(s,tt,ee)}else{var ee=new t.IntPoint2(tt.Curr.X,s.Curr.Y);this.IntersectEdges(tt,s,ee)}var ie=this.GetNextInAEL(tt,h);this.SwapPositionsInAEL(s,tt),tt=ie}if(s.NextInLML===null||!t.ClipperBase.IsHorizontal(s.NextInLML))break;s=this.UpdateEdgeIntoAEL(s),s.OutIdx>=0&&this.AddOutPt(s,s.Bot),a={Dir:h,Left:d,Right:x},this.GetHorzDirection(s,a),h=a.Dir,d=a.Left,x=a.Right}if(s.OutIdx>=0&&V===null){V=this.GetLastOutPt(s);for(var pt=this.m_SortedEdges;pt!==null;){if(pt.OutIdx>=0&&this.HorzSegmentsOverlap(s.Bot.X,s.Top.X,pt.Bot.X,pt.Top.X)){var Bt=this.GetLastOutPt(pt);this.AddJoin(Bt,V,pt.Top)}pt=pt.NextInSEL}this.AddGhostJoin(V,s.Top)}if(s.NextInLML!==null)if(s.OutIdx>=0){if(V=this.AddOutPt(s,s.Top),s=this.UpdateEdgeIntoAEL(s),s.WindDelta===0)return;var be=s.PrevInAEL,ie=s.NextInAEL;if(be!==null&&be.Curr.X===s.Bot.X&&be.Curr.Y===s.Bot.Y&&be.WindDelta===0&&be.OutIdx>=0&&be.Curr.Y>be.Top.Y&&t.ClipperBase.SlopesEqual3(s,be,this.m_UseFullRange)){var Bt=this.AddOutPt(be,s.Bot);this.AddJoin(V,Bt,s.Top)}else if(ie!==null&&ie.Curr.X===s.Bot.X&&ie.Curr.Y===s.Bot.Y&&ie.WindDelta!==0&&ie.OutIdx>=0&&ie.Curr.Y>ie.Top.Y&&t.ClipperBase.SlopesEqual3(s,ie,this.m_UseFullRange)){var Bt=this.AddOutPt(ie,s.Bot);this.AddJoin(V,Bt,s.Top)}}else s=this.UpdateEdgeIntoAEL(s);else s.OutIdx>=0&&this.AddOutPt(s,s.Top),this.DeleteFromAEL(s)},t.Clipper.prototype.GetNextInAEL=function(s,a){return a===t.Direction.dLeftToRight?s.NextInAEL:s.PrevInAEL},t.Clipper.prototype.IsMinima=function(s){return s!==null&&s.Prev.NextInLML!==s&&s.Next.NextInLML!==s},t.Clipper.prototype.IsMaxima=function(s,a){return s!==null&&s.Top.Y===a&&s.NextInLML===null},t.Clipper.prototype.IsIntermediate=function(s,a){return s.Top.Y===a&&s.NextInLML!==null},t.Clipper.prototype.GetMaximaPair=function(s){return t.IntPoint.op_Equality(s.Next.Top,s.Top)&&s.Next.NextInLML===null?s.Next:t.IntPoint.op_Equality(s.Prev.Top,s.Top)&&s.Prev.NextInLML===null?s.Prev:null},t.Clipper.prototype.GetMaximaPairEx=function(s){var a=this.GetMaximaPair(s);return a===null||a.OutIdx===t.ClipperBase.Skip||a.NextInAEL===a.PrevInAEL&&!t.ClipperBase.IsHorizontal(a)?null:a},t.Clipper.prototype.ProcessIntersections=function(s){if(this.m_ActiveEdges===null)return!0;try{if(this.BuildIntersectList(s),this.m_IntersectList.length===0)return!0;if(this.m_IntersectList.length===1||this.FixupIntersectionOrder())this.ProcessIntersectList();else return!1}catch{this.m_SortedEdges=null,this.m_IntersectList.length=0,t.Error("ProcessIntersections error")}return this.m_SortedEdges=null,!0},t.Clipper.prototype.BuildIntersectList=function(s){if(this.m_ActiveEdges!==null){var a=this.m_ActiveEdges;for(this.m_SortedEdges=a;a!==null;)a.PrevInSEL=a.PrevInAEL,a.NextInSEL=a.NextInAEL,a.Curr.X=t.Clipper.TopX(a,s),a=a.NextInAEL;for(var h=!0;h&&this.m_SortedEdges!==null;){for(h=!1,a=this.m_SortedEdges;a.NextInSEL!==null;){var d=a.NextInSEL,x=new t.IntPoint0;if(a.Curr.X>d.Curr.X){this.IntersectPoint(a,d,x),x.Y<s&&(x=new t.IntPoint2(t.Clipper.TopX(a,s),s));var E=new t.IntersectNode;E.Edge1=a,E.Edge2=d,E.Pt.X=x.X,E.Pt.Y=x.Y,t.use_xyz&&(E.Pt.Z=x.Z),this.m_IntersectList.push(E),this.SwapPositionsInSEL(a,d),h=!0}else a=d}if(a.PrevInSEL!==null)a.PrevInSEL.NextInSEL=null;else break}this.m_SortedEdges=null}},t.Clipper.prototype.EdgesAdjacent=function(s){return s.Edge1.NextInSEL===s.Edge2||s.Edge1.PrevInSEL===s.Edge2},t.Clipper.IntersectNodeSort=function(s,a){return a.Pt.Y-s.Pt.Y},t.Clipper.prototype.FixupIntersectionOrder=function(){this.m_IntersectList.sort(this.m_IntersectNodeComparer),this.CopyAELToSEL();for(var s=this.m_IntersectList.length,a=0;a<s;a++){if(!this.EdgesAdjacent(this.m_IntersectList[a])){for(var h=a+1;h<s&&!this.EdgesAdjacent(this.m_IntersectList[h]);)h++;if(h===s)return!1;var d=this.m_IntersectList[a];this.m_IntersectList[a]=this.m_IntersectList[h],this.m_IntersectList[h]=d}this.SwapPositionsInSEL(this.m_IntersectList[a].Edge1,this.m_IntersectList[a].Edge2)}return!0},t.Clipper.prototype.ProcessIntersectList=function(){for(var s=0,a=this.m_IntersectList.length;s<a;s++){var h=this.m_IntersectList[s];this.IntersectEdges(h.Edge1,h.Edge2,h.Pt),this.SwapPositionsInAEL(h.Edge1,h.Edge2)}this.m_IntersectList.length=0};var on=function(s){return s<0?Math.ceil(s-.5):Math.round(s)},Gs=function(s){return s<0?Math.ceil(s-.5):Math.floor(s+.5)},De=function(s){return s<0?-Math.round(Math.abs(s)):Math.round(s)},On=function(s){return s<0?(s-=.5,s<-2147483648?Math.ceil(s):s|0):(s+=.5,s>2147483647?Math.floor(s):s|0)};o.msie?t.Clipper.Round=on:o.chromium?t.Clipper.Round=De:o.safari?t.Clipper.Round=On:t.Clipper.Round=Gs,t.Clipper.TopX=function(s,a){return a===s.Top.Y?s.Top.X:s.Bot.X+t.Clipper.Round(s.Dx*(a-s.Bot.Y))},t.Clipper.prototype.IntersectPoint=function(s,a,h){h.X=0,h.Y=0;var d,x;if(s.Dx===a.Dx){h.Y=s.Curr.Y,h.X=t.Clipper.TopX(s,h.Y);return}if(s.Delta.X===0)h.X=s.Bot.X,t.ClipperBase.IsHorizontal(a)?h.Y=a.Bot.Y:(x=a.Bot.Y-a.Bot.X/a.Dx,h.Y=t.Clipper.Round(h.X/a.Dx+x));else if(a.Delta.X===0)h.X=a.Bot.X,t.ClipperBase.IsHorizontal(s)?h.Y=s.Bot.Y:(d=s.Bot.Y-s.Bot.X/s.Dx,h.Y=t.Clipper.Round(h.X/s.Dx+d));else{d=s.Bot.X-s.Bot.Y*s.Dx,x=a.Bot.X-a.Bot.Y*a.Dx;var E=(x-d)/(s.Dx-a.Dx);h.Y=t.Clipper.Round(E),Math.abs(s.Dx)<Math.abs(a.Dx)?h.X=t.Clipper.Round(s.Dx*E+d):h.X=t.Clipper.Round(a.Dx*E+x)}if(h.Y<s.Top.Y||h.Y<a.Top.Y){if(s.Top.Y>a.Top.Y)return h.Y=s.Top.Y,h.X=t.Clipper.TopX(a,s.Top.Y),h.X<s.Top.X;h.Y=a.Top.Y,Math.abs(s.Dx)<Math.abs(a.Dx)?h.X=t.Clipper.TopX(s,h.Y):h.X=t.Clipper.TopX(a,h.Y)}h.Y>s.Curr.Y&&(h.Y=s.Curr.Y,Math.abs(s.Dx)>Math.abs(a.Dx)?h.X=t.Clipper.TopX(a,h.Y):h.X=t.Clipper.TopX(s,h.Y))},t.Clipper.prototype.ProcessEdgesAtTopOfScanbeam=function(s){for(var a=this.m_ActiveEdges;a!==null;){var h=this.IsMaxima(a,s);if(h){var d=this.GetMaximaPairEx(a);h=d===null||!t.ClipperBase.IsHorizontal(d)}if(h){this.StrictlySimple&&this.InsertMaxima(a.Top.X);var x=a.PrevInAEL;this.DoMaxima(a),x===null?a=this.m_ActiveEdges:a=x.NextInAEL}else{if(this.IsIntermediate(a,s)&&t.ClipperBase.IsHorizontal(a.NextInLML)?(a=this.UpdateEdgeIntoAEL(a),a.OutIdx>=0&&this.AddOutPt(a,a.Bot),this.AddEdgeToSEL(a)):(a.Curr.X=t.Clipper.TopX(a,s),a.Curr.Y=s),t.use_xyz&&(a.Top.Y===s?a.Curr.Z=a.Top.Z:a.Bot.Y===s?a.Curr.Z=a.Bot.Z:a.Curr.Z=0),this.StrictlySimple){var x=a.PrevInAEL;if(a.OutIdx>=0&&a.WindDelta!==0&&x!==null&&x.OutIdx>=0&&x.Curr.X===a.Curr.X&&x.WindDelta!==0){var E=new t.IntPoint1(a.Curr);t.use_xyz&&this.SetZ(E,x,a);var A=this.AddOutPt(x,E),D=this.AddOutPt(a,E);this.AddJoin(A,D,E)}}a=a.NextInAEL}}for(this.ProcessHorizontals(),this.m_Maxima=null,a=this.m_ActiveEdges;a!==null;){if(this.IsIntermediate(a,s)){var A=null;a.OutIdx>=0&&(A=this.AddOutPt(a,a.Top)),a=this.UpdateEdgeIntoAEL(a);var x=a.PrevInAEL,O=a.NextInAEL;if(x!==null&&x.Curr.X===a.Bot.X&&x.Curr.Y===a.Bot.Y&&A!==null&&x.OutIdx>=0&&x.Curr.Y===x.Top.Y&&t.ClipperBase.SlopesEqual5(a.Curr,a.Top,x.Curr,x.Top,this.m_UseFullRange)&&a.WindDelta!==0&&x.WindDelta!==0){var D=this.AddOutPt(ePrev2,a.Bot);this.AddJoin(A,D,a.Top)}else if(O!==null&&O.Curr.X===a.Bot.X&&O.Curr.Y===a.Bot.Y&&A!==null&&O.OutIdx>=0&&O.Curr.Y===O.Top.Y&&t.ClipperBase.SlopesEqual5(a.Curr,a.Top,O.Curr,O.Top,this.m_UseFullRange)&&a.WindDelta!==0&&O.WindDelta!==0){var D=this.AddOutPt(O,a.Bot);this.AddJoin(A,D,a.Top)}}a=a.NextInAEL}},t.Clipper.prototype.DoMaxima=function(s){var a=this.GetMaximaPairEx(s);if(a===null){s.OutIdx>=0&&this.AddOutPt(s,s.Top),this.DeleteFromAEL(s);return}for(var h=s.NextInAEL;h!==null&&h!==a;)this.IntersectEdges(s,h,s.Top),this.SwapPositionsInAEL(s,h),h=s.NextInAEL;s.OutIdx===-1&&a.OutIdx===-1?(this.DeleteFromAEL(s),this.DeleteFromAEL(a)):s.OutIdx>=0&&a.OutIdx>=0?(s.OutIdx>=0&&this.AddLocalMaxPoly(s,a,s.Top),this.DeleteFromAEL(s),this.DeleteFromAEL(a)):t.use_lines&&s.WindDelta===0?(s.OutIdx>=0&&(this.AddOutPt(s,s.Top),s.OutIdx=t.ClipperBase.Unassigned),this.DeleteFromAEL(s),a.OutIdx>=0&&(this.AddOutPt(a,s.Top),a.OutIdx=t.ClipperBase.Unassigned),this.DeleteFromAEL(a)):t.Error("DoMaxima error")},t.Clipper.ReversePaths=function(s){for(var a=0,h=s.length;a<h;a++)s[a].reverse()},t.Clipper.Orientation=function(s){return t.Clipper.Area(s)>=0},t.Clipper.prototype.PointCount=function(s){if(s===null)return 0;var a=0,h=s;do a++,h=h.Next;while(h!==s);return a},t.Clipper.prototype.BuildResult=function(s){t.Clear(s);for(var a=0,h=this.m_PolyOuts.length;a<h;a++){var d=this.m_PolyOuts[a];if(d.Pts!==null){var x=d.Pts.Prev,E=this.PointCount(x);if(!(E<2)){for(var A=new Array(E),D=0;D<E;D++)A[D]=x.Pt,x=x.Prev;s.push(A)}}}},t.Clipper.prototype.BuildResult2=function(s){s.Clear();for(var a=0,h=this.m_PolyOuts.length;a<h;a++){var d=this.m_PolyOuts[a],x=this.PointCount(d.Pts);if(!(d.IsOpen&&x<2||!d.IsOpen&&x<3)){this.FixHoleLinkage(d);var E=new t.PolyNode;s.m_AllPolys.push(E),d.PolyNode=E,E.m_polygon.length=x;for(var A=d.Pts.Prev,D=0;D<x;D++)E.m_polygon[D]=A.Pt,A=A.Prev}}for(var a=0,h=this.m_PolyOuts.length;a<h;a++){var d=this.m_PolyOuts[a];d.PolyNode!==null&&(d.IsOpen?(d.PolyNode.IsOpen=!0,s.AddChild(d.PolyNode)):d.FirstLeft!==null&&d.FirstLeft.PolyNode!==null?d.FirstLeft.PolyNode.AddChild(d.PolyNode):s.AddChild(d.PolyNode))}},t.Clipper.prototype.FixupOutPolyline=function(s){for(var a=s.Pts,h=a.Prev;a!==h;)if(a=a.Next,t.IntPoint.op_Equality(a.Pt,a.Prev.Pt)){a===h&&(h=a.Prev);var d=a.Prev;d.Next=a.Next,a.Next.Prev=d,a=d}a===a.Prev&&(s.Pts=null)},t.Clipper.prototype.FixupOutPolygon=function(s){var a=null;s.BottomPt=null;for(var h=s.Pts,d=this.PreserveCollinear||this.StrictlySimple;;){if(h.Prev===h||h.Prev===h.Next){s.Pts=null;return}if(t.IntPoint.op_Equality(h.Pt,h.Next.Pt)||t.IntPoint.op_Equality(h.Pt,h.Prev.Pt)||t.ClipperBase.SlopesEqual4(h.Prev.Pt,h.Pt,h.Next.Pt,this.m_UseFullRange)&&(!d||!this.Pt2IsBetweenPt1AndPt3(h.Prev.Pt,h.Pt,h.Next.Pt)))a=null,h.Prev.Next=h.Next,h.Next.Prev=h.Prev,h=h.Prev;else{if(h===a)break;a===null&&(a=h),h=h.Next}}s.Pts=h},t.Clipper.prototype.DupOutPt=function(s,a){var h=new t.OutPt;return h.Pt.X=s.Pt.X,h.Pt.Y=s.Pt.Y,t.use_xyz&&(h.Pt.Z=s.Pt.Z),h.Idx=s.Idx,a?(h.Next=s.Next,h.Prev=s,s.Next.Prev=h,s.Next=h):(h.Prev=s.Prev,h.Next=s,s.Prev.Next=h,s.Prev=h),h},t.Clipper.prototype.GetOverlap=function(s,a,h,d,x){return s<a?h<d?(x.Left=Math.max(s,h),x.Right=Math.min(a,d)):(x.Left=Math.max(s,d),x.Right=Math.min(a,h)):h<d?(x.Left=Math.max(a,h),x.Right=Math.min(s,d)):(x.Left=Math.max(a,d),x.Right=Math.min(s,h)),x.Left<x.Right},t.Clipper.prototype.JoinHorz=function(s,a,h,d,x,E){var A=s.Pt.X>a.Pt.X?t.Direction.dRightToLeft:t.Direction.dLeftToRight,D=h.Pt.X>d.Pt.X?t.Direction.dRightToLeft:t.Direction.dLeftToRight;if(A===D)return!1;if(A===t.Direction.dLeftToRight){for(;s.Next.Pt.X<=x.X&&s.Next.Pt.X>=s.Pt.X&&s.Next.Pt.Y===x.Y;)s=s.Next;E&&s.Pt.X!==x.X&&(s=s.Next),a=this.DupOutPt(s,!E),t.IntPoint.op_Inequality(a.Pt,x)&&(s=a,s.Pt.X=x.X,s.Pt.Y=x.Y,t.use_xyz&&(s.Pt.Z=x.Z),a=this.DupOutPt(s,!E))}else{for(;s.Next.Pt.X>=x.X&&s.Next.Pt.X<=s.Pt.X&&s.Next.Pt.Y===x.Y;)s=s.Next;!E&&s.Pt.X!==x.X&&(s=s.Next),a=this.DupOutPt(s,E),t.IntPoint.op_Inequality(a.Pt,x)&&(s=a,s.Pt.X=x.X,s.Pt.Y=x.Y,t.use_xyz&&(s.Pt.Z=x.Z),a=this.DupOutPt(s,E))}if(D===t.Direction.dLeftToRight){for(;h.Next.Pt.X<=x.X&&h.Next.Pt.X>=h.Pt.X&&h.Next.Pt.Y===x.Y;)h=h.Next;E&&h.Pt.X!==x.X&&(h=h.Next),d=this.DupOutPt(h,!E),t.IntPoint.op_Inequality(d.Pt,x)&&(h=d,h.Pt.X=x.X,h.Pt.Y=x.Y,t.use_xyz&&(h.Pt.Z=x.Z),d=this.DupOutPt(h,!E))}else{for(;h.Next.Pt.X>=x.X&&h.Next.Pt.X<=h.Pt.X&&h.Next.Pt.Y===x.Y;)h=h.Next;!E&&h.Pt.X!==x.X&&(h=h.Next),d=this.DupOutPt(h,E),t.IntPoint.op_Inequality(d.Pt,x)&&(h=d,h.Pt.X=x.X,h.Pt.Y=x.Y,t.use_xyz&&(h.Pt.Z=x.Z),d=this.DupOutPt(h,E))}return A===t.Direction.dLeftToRight===E?(s.Prev=h,h.Next=s,a.Next=d,d.Prev=a):(s.Next=h,h.Prev=s,a.Prev=d,d.Next=a),!0},t.Clipper.prototype.JoinPoints=function(s,a,h){var d=s.OutPt1,x=new t.OutPt,E=s.OutPt2,A=new t.OutPt,D=s.OutPt1.Pt.Y===s.OffPt.Y;if(D&&t.IntPoint.op_Equality(s.OffPt,s.OutPt1.Pt)&&t.IntPoint.op_Equality(s.OffPt,s.OutPt2.Pt)){if(a!==h)return!1;for(x=s.OutPt1.Next;x!==d&&t.IntPoint.op_Equality(x.Pt,s.OffPt);)x=x.Next;var O=x.Pt.Y>s.OffPt.Y;for(A=s.OutPt2.Next;A!==E&&t.IntPoint.op_Equality(A.Pt,s.OffPt);)A=A.Next;var V=A.Pt.Y>s.OffPt.Y;return O===V?!1:O?(x=this.DupOutPt(d,!1),A=this.DupOutPt(E,!0),d.Prev=E,E.Next=d,x.Next=A,A.Prev=x,s.OutPt1=d,s.OutPt2=x,!0):(x=this.DupOutPt(d,!0),A=this.DupOutPt(E,!1),d.Next=E,E.Prev=d,x.Prev=A,A.Next=x,s.OutPt1=d,s.OutPt2=x,!0)}else if(D){for(x=d;d.Prev.Pt.Y===d.Pt.Y&&d.Prev!==x&&d.Prev!==E;)d=d.Prev;for(;x.Next.Pt.Y===x.Pt.Y&&x.Next!==d&&x.Next!==E;)x=x.Next;if(x.Next===d||x.Next===E)return!1;for(A=E;E.Prev.Pt.Y===E.Pt.Y&&E.Prev!==A&&E.Prev!==x;)E=E.Prev;for(;A.Next.Pt.Y===A.Pt.Y&&A.Next!==E&&A.Next!==d;)A=A.Next;if(A.Next===E||A.Next===d)return!1;var at={Left:null,Right:null};if(!this.GetOverlap(d.Pt.X,x.Pt.X,E.Pt.X,A.Pt.X,at))return!1;var tt=at.Left,pt=at.Right,Bt=new t.IntPoint0,ee;return d.Pt.X>=tt&&d.Pt.X<=pt?(Bt.X=d.Pt.X,Bt.Y=d.Pt.Y,t.use_xyz&&(Bt.Z=d.Pt.Z),ee=d.Pt.X>x.Pt.X):E.Pt.X>=tt&&E.Pt.X<=pt?(Bt.X=E.Pt.X,Bt.Y=E.Pt.Y,t.use_xyz&&(Bt.Z=E.Pt.Z),ee=E.Pt.X>A.Pt.X):x.Pt.X>=tt&&x.Pt.X<=pt?(Bt.X=x.Pt.X,Bt.Y=x.Pt.Y,t.use_xyz&&(Bt.Z=x.Pt.Z),ee=x.Pt.X>d.Pt.X):(Bt.X=A.Pt.X,Bt.Y=A.Pt.Y,t.use_xyz&&(Bt.Z=A.Pt.Z),ee=A.Pt.X>E.Pt.X),s.OutPt1=d,s.OutPt2=E,this.JoinHorz(d,x,E,A,Bt,ee)}else{for(x=d.Next;t.IntPoint.op_Equality(x.Pt,d.Pt)&&x!==d;)x=x.Next;var ie=x.Pt.Y>d.Pt.Y||!t.ClipperBase.SlopesEqual4(d.Pt,x.Pt,s.OffPt,this.m_UseFullRange);if(ie){for(x=d.Prev;t.IntPoint.op_Equality(x.Pt,d.Pt)&&x!==d;)x=x.Prev;if(x.Pt.Y>d.Pt.Y||!t.ClipperBase.SlopesEqual4(d.Pt,x.Pt,s.OffPt,this.m_UseFullRange))return!1}for(A=E.Next;t.IntPoint.op_Equality(A.Pt,E.Pt)&&A!==E;)A=A.Next;var be=A.Pt.Y>E.Pt.Y||!t.ClipperBase.SlopesEqual4(E.Pt,A.Pt,s.OffPt,this.m_UseFullRange);if(be){for(A=E.Prev;t.IntPoint.op_Equality(A.Pt,E.Pt)&&A!==E;)A=A.Prev;if(A.Pt.Y>E.Pt.Y||!t.ClipperBase.SlopesEqual4(E.Pt,A.Pt,s.OffPt,this.m_UseFullRange))return!1}return x===d||A===E||x===A||a===h&&ie===be?!1:ie?(x=this.DupOutPt(d,!1),A=this.DupOutPt(E,!0),d.Prev=E,E.Next=d,x.Next=A,A.Prev=x,s.OutPt1=d,s.OutPt2=x,!0):(x=this.DupOutPt(d,!0),A=this.DupOutPt(E,!1),d.Next=E,E.Prev=d,x.Prev=A,A.Next=x,s.OutPt1=d,s.OutPt2=x,!0)}},t.Clipper.GetBounds=function(s){for(var a=0,h=s.length;a<h&&s[a].length===0;)a++;if(a===h)return new t.IntRect(0,0,0,0);var d=new t.IntRect;for(d.left=s[a][0].X,d.right=d.left,d.top=s[a][0].Y,d.bottom=d.top;a<h;a++)for(var x=0,E=s[a].length;x<E;x++)s[a][x].X<d.left?d.left=s[a][x].X:s[a][x].X>d.right&&(d.right=s[a][x].X),s[a][x].Y<d.top?d.top=s[a][x].Y:s[a][x].Y>d.bottom&&(d.bottom=s[a][x].Y);return d},t.Clipper.prototype.GetBounds2=function(s){var a=s,h=new t.IntRect;for(h.left=s.Pt.X,h.right=s.Pt.X,h.top=s.Pt.Y,h.bottom=s.Pt.Y,s=s.Next;s!==a;)s.Pt.X<h.left&&(h.left=s.Pt.X),s.Pt.X>h.right&&(h.right=s.Pt.X),s.Pt.Y<h.top&&(h.top=s.Pt.Y),s.Pt.Y>h.bottom&&(h.bottom=s.Pt.Y),s=s.Next;return h},t.Clipper.PointInPolygon=function(s,a){var h=0,d=a.length;if(d<3)return 0;for(var x=a[0],E=1;E<=d;++E){var A=E===d?a[0]:a[E];if(A.Y===s.Y&&(A.X===s.X||x.Y===s.Y&&A.X>s.X==x.X<s.X))return-1;if(x.Y<s.Y!=A.Y<s.Y){if(x.X>=s.X)if(A.X>s.X)h=1-h;else{var D=(x.X-s.X)*(A.Y-s.Y)-(A.X-s.X)*(x.Y-s.Y);if(D===0)return-1;D>0==A.Y>x.Y&&(h=1-h)}else if(A.X>s.X){var D=(x.X-s.X)*(A.Y-s.Y)-(A.X-s.X)*(x.Y-s.Y);if(D===0)return-1;D>0==A.Y>x.Y&&(h=1-h)}}x=A}return h},t.Clipper.prototype.PointInPolygon=function(s,a){var h=0,d=a,x=s.X,E=s.Y,A=a.Pt.X,D=a.Pt.Y;do{a=a.Next;var O=a.Pt.X,V=a.Pt.Y;if(V===E&&(O===x||D===E&&O>x==A<x))return-1;if(D<E!=V<E){if(A>=x)if(O>x)h=1-h;else{var at=(A-x)*(V-E)-(O-x)*(D-E);if(at===0)return-1;at>0==V>D&&(h=1-h)}else if(O>x){var at=(A-x)*(V-E)-(O-x)*(D-E);if(at===0)return-1;at>0==V>D&&(h=1-h)}}A=O,D=V}while(d!==a);return h},t.Clipper.prototype.Poly2ContainsPoly1=function(s,a){var h=s;do{var d=this.PointInPolygon(h.Pt,a);if(d>=0)return d>0;h=h.Next}while(h!==s);return!0},t.Clipper.prototype.FixupFirstLefts1=function(s,a){for(var h,d,x=0,E=this.m_PolyOuts.length;x<E;x++)h=this.m_PolyOuts[x],d=t.Clipper.ParseFirstLeft(h.FirstLeft),h.Pts!==null&&d===s&&this.Poly2ContainsPoly1(h.Pts,a.Pts)&&(h.FirstLeft=a)},t.Clipper.prototype.FixupFirstLefts2=function(s,a){for(var h=a.FirstLeft,d,x,E=0,A=this.m_PolyOuts.length;E<A;E++)d=this.m_PolyOuts[E],!(d.Pts===null||d===a||d===s)&&(x=t.Clipper.ParseFirstLeft(d.FirstLeft),!(x!==h&&x!==s&&x!==a)&&(this.Poly2ContainsPoly1(d.Pts,s.Pts)?d.FirstLeft=s:this.Poly2ContainsPoly1(d.Pts,a.Pts)?d.FirstLeft=a:(d.FirstLeft===s||d.FirstLeft===a)&&(d.FirstLeft=h)))},t.Clipper.prototype.FixupFirstLefts3=function(s,a){for(var h,d,x=0,E=this.m_PolyOuts.length;x<E;x++)h=this.m_PolyOuts[x],d=t.Clipper.ParseFirstLeft(h.FirstLeft),h.Pts!==null&&d===s&&(h.FirstLeft=a)},t.Clipper.ParseFirstLeft=function(s){for(;s!==null&&s.Pts===null;)s=s.FirstLeft;return s},t.Clipper.prototype.JoinCommonEdges=function(){for(var s=0,a=this.m_Joins.length;s<a;s++){var h=this.m_Joins[s],d=this.GetOutRec(h.OutPt1.Idx),x=this.GetOutRec(h.OutPt2.Idx);if(!(d.Pts===null||x.Pts===null)&&!(d.IsOpen||x.IsOpen)){var E;d===x?E=d:this.OutRec1RightOfOutRec2(d,x)?E=x:this.OutRec1RightOfOutRec2(x,d)?E=d:E=this.GetLowermostRec(d,x),this.JoinPoints(h,d,x)&&(d===x?(d.Pts=h.OutPt1,d.BottomPt=null,x=this.CreateOutRec(),x.Pts=h.OutPt2,this.UpdateOutPtIdxs(x),this.Poly2ContainsPoly1(x.Pts,d.Pts)?(x.IsHole=!d.IsHole,x.FirstLeft=d,this.m_UsingPolyTree&&this.FixupFirstLefts2(x,d),(x.IsHole^this.ReverseSolution)==this.Area$1(x)>0&&this.ReversePolyPtLinks(x.Pts)):this.Poly2ContainsPoly1(d.Pts,x.Pts)?(x.IsHole=d.IsHole,d.IsHole=!x.IsHole,x.FirstLeft=d.FirstLeft,d.FirstLeft=x,this.m_UsingPolyTree&&this.FixupFirstLefts2(d,x),(d.IsHole^this.ReverseSolution)==this.Area$1(d)>0&&this.ReversePolyPtLinks(d.Pts)):(x.IsHole=d.IsHole,x.FirstLeft=d.FirstLeft,this.m_UsingPolyTree&&this.FixupFirstLefts1(d,x))):(x.Pts=null,x.BottomPt=null,x.Idx=d.Idx,d.IsHole=E.IsHole,E===x&&(d.FirstLeft=x.FirstLeft),x.FirstLeft=d,this.m_UsingPolyTree&&this.FixupFirstLefts3(x,d)))}}},t.Clipper.prototype.UpdateOutPtIdxs=function(s){var a=s.Pts;do a.Idx=s.Idx,a=a.Prev;while(a!==s.Pts)},t.Clipper.prototype.DoSimplePolygons=function(){for(var s=0;s<this.m_PolyOuts.length;){var a=this.m_PolyOuts[s++],h=a.Pts;if(!(h===null||a.IsOpen))do{for(var d=h.Next;d!==a.Pts;){if(t.IntPoint.op_Equality(h.Pt,d.Pt)&&d.Next!==h&&d.Prev!==h){var x=h.Prev,E=d.Prev;h.Prev=E,E.Next=h,d.Prev=x,x.Next=d,a.Pts=h;var A=this.CreateOutRec();A.Pts=d,this.UpdateOutPtIdxs(A),this.Poly2ContainsPoly1(A.Pts,a.Pts)?(A.IsHole=!a.IsHole,A.FirstLeft=a,this.m_UsingPolyTree&&this.FixupFirstLefts2(A,a)):this.Poly2ContainsPoly1(a.Pts,A.Pts)?(A.IsHole=a.IsHole,a.IsHole=!A.IsHole,A.FirstLeft=a.FirstLeft,a.FirstLeft=A,this.m_UsingPolyTree&&this.FixupFirstLefts2(a,A)):(A.IsHole=a.IsHole,A.FirstLeft=a.FirstLeft,this.m_UsingPolyTree&&this.FixupFirstLefts1(a,A)),d=h}d=d.Next}h=h.Next}while(h!==a.Pts)}},t.Clipper.Area=function(s){if(!Array.isArray(s))return 0;var a=s.length;if(a<3)return 0;for(var h=0,d=0,x=a-1;d<a;++d)h+=(s[x].X+s[d].X)*(s[x].Y-s[d].Y),x=d;return-h*.5},t.Clipper.prototype.Area=function(s){var a=s;if(s===null)return 0;var h=0;do h=h+(s.Prev.Pt.X+s.Pt.X)*(s.Prev.Pt.Y-s.Pt.Y),s=s.Next;while(s!==a);return h*.5},t.Clipper.prototype.Area$1=function(s){return this.Area(s.Pts)},t.Clipper.SimplifyPolygon=function(s,a){var h=new Array,d=new t.Clipper(0);return d.StrictlySimple=!0,d.AddPath(s,t.PolyType.ptSubject,!0),d.Execute(t.ClipType.ctUnion,h,a,a),h},t.Clipper.SimplifyPolygons=function(s,a){typeof a>"u"&&(a=t.PolyFillType.pftEvenOdd);var h=new Array,d=new t.Clipper(0);return d.StrictlySimple=!0,d.AddPaths(s,t.PolyType.ptSubject,!0),d.Execute(t.ClipType.ctUnion,h,a,a),h},t.Clipper.DistanceSqrd=function(s,a){var h=s.X-a.X,d=s.Y-a.Y;return h*h+d*d},t.Clipper.DistanceFromLineSqrd=function(s,a,h){var d=a.Y-h.Y,x=h.X-a.X,E=d*a.X+x*a.Y;return E=d*s.X+x*s.Y-E,E*E/(d*d+x*x)},t.Clipper.SlopesNearCollinear=function(s,a,h,d){return Math.abs(s.X-a.X)>Math.abs(s.Y-a.Y)?s.X>a.X==s.X<h.X?t.Clipper.DistanceFromLineSqrd(s,a,h)<d:a.X>s.X==a.X<h.X?t.Clipper.DistanceFromLineSqrd(a,s,h)<d:t.Clipper.DistanceFromLineSqrd(h,s,a)<d:s.Y>a.Y==s.Y<h.Y?t.Clipper.DistanceFromLineSqrd(s,a,h)<d:a.Y>s.Y==a.Y<h.Y?t.Clipper.DistanceFromLineSqrd(a,s,h)<d:t.Clipper.DistanceFromLineSqrd(h,s,a)<d},t.Clipper.PointsAreClose=function(s,a,h){var d=s.X-a.X,x=s.Y-a.Y;return d*d+x*x<=h},t.Clipper.ExcludeOp=function(s){var a=s.Prev;return a.Next=s.Next,s.Next.Prev=a,a.Idx=0,a},t.Clipper.CleanPolygon=function(s,a){typeof a>"u"&&(a=1.415);var h=s.length;if(h===0)return new Array;for(var d=new Array(h),x=0;x<h;++x)d[x]=new t.OutPt;for(var x=0;x<h;++x)d[x].Pt=s[x],d[x].Next=d[(x+1)%h],d[x].Next.Prev=d[x],d[x].Idx=0;for(var E=a*a,A=d[0];A.Idx===0&&A.Next!==A.Prev;)t.Clipper.PointsAreClose(A.Pt,A.Prev.Pt,E)?(A=t.Clipper.ExcludeOp(A),h--):t.Clipper.PointsAreClose(A.Prev.Pt,A.Next.Pt,E)?(t.Clipper.ExcludeOp(A.Next),A=t.Clipper.ExcludeOp(A),h-=2):t.Clipper.SlopesNearCollinear(A.Prev.Pt,A.Pt,A.Next.Pt,E)?(A=t.Clipper.ExcludeOp(A),h--):(A.Idx=1,A=A.Next);h<3&&(h=0);for(var D=new Array(h),x=0;x<h;++x)D[x]=new t.IntPoint1(A.Pt),A=A.Next;return d=null,D},t.Clipper.CleanPolygons=function(s,a){for(var h=new Array(s.length),d=0,x=s.length;d<x;d++)h[d]=t.Clipper.CleanPolygon(s[d],a);return h},t.Clipper.Minkowski=function(s,a,h,d){var x=d?1:0,E=s.length,A=a.length,D=new Array;if(h)for(var O=0;O<A;O++){for(var V=new Array(E),at=0,tt=s.length,pt=s[at];at<tt;at++,pt=s[at])V[at]=new t.IntPoint2(a[O].X+pt.X,a[O].Y+pt.Y);D.push(V)}else for(var O=0;O<A;O++){for(var V=new Array(E),at=0,tt=s.length,pt=s[at];at<tt;at++,pt=s[at])V[at]=new t.IntPoint2(a[O].X-pt.X,a[O].Y-pt.Y);D.push(V)}for(var Bt=new Array,O=0;O<A-1+x;O++)for(var at=0;at<E;at++){var ee=new Array;ee.push(D[O%A][at%E]),ee.push(D[(O+1)%A][at%E]),ee.push(D[(O+1)%A][(at+1)%E]),ee.push(D[O%A][(at+1)%E]),t.Clipper.Orientation(ee)||ee.reverse(),Bt.push(ee)}return Bt},t.Clipper.MinkowskiSum=function(s,a,h){if(a[0]instanceof Array){for(var x=a,A=new t.Paths,E=new t.Clipper,D=0;D<x.length;++D){var O=t.Clipper.Minkowski(s,x[D],!0,h);if(E.AddPaths(O,t.PolyType.ptSubject,!0),h){var d=t.Clipper.TranslatePath(x[D],s[0]);E.AddPath(d,t.PolyType.ptClip,!0)}}return E.Execute(t.ClipType.ctUnion,A,t.PolyFillType.pftNonZero,t.PolyFillType.pftNonZero),A}else{var d=a,x=t.Clipper.Minkowski(s,d,!0,h),E=new t.Clipper;return E.AddPaths(x,t.PolyType.ptSubject,!0),E.Execute(t.ClipType.ctUnion,x,t.PolyFillType.pftNonZero,t.PolyFillType.pftNonZero),x}},t.Clipper.TranslatePath=function(s,a){for(var h=new t.Path,d=0;d<s.length;d++)h.push(new t.IntPoint2(s[d].X+a.X,s[d].Y+a.Y));return h},t.Clipper.MinkowskiDiff=function(s,a){var h=t.Clipper.Minkowski(s,a,!1,!0),d=new t.Clipper;return d.AddPaths(h,t.PolyType.ptSubject,!0),d.Execute(t.ClipType.ctUnion,h,t.PolyFillType.pftNonZero,t.PolyFillType.pftNonZero),h},t.Clipper.PolyTreeToPaths=function(s){var a=new Array;return t.Clipper.AddPolyNodeToPaths(s,t.Clipper.NodeType.ntAny,a),a},t.Clipper.AddPolyNodeToPaths=function(s,a,h){var d=!0;switch(a){case t.Clipper.NodeType.ntOpen:return;case t.Clipper.NodeType.ntClosed:d=!s.IsOpen;break}s.m_polygon.length>0&&d&&h.push(s.m_polygon);for(var x=0,E=s.Childs(),A=E.length,D=E[x];x<A;x++,D=E[x])t.Clipper.AddPolyNodeToPaths(D,a,h)},t.Clipper.OpenPathsFromPolyTree=function(s){for(var a=new t.Paths,h=0,d=s.ChildCount();h<d;h++)s.Childs()[h].IsOpen&&a.push(s.Childs()[h].m_polygon);return a},t.Clipper.ClosedPathsFromPolyTree=function(s){var a=new t.Paths;return t.Clipper.AddPolyNodeToPaths(s,t.Clipper.NodeType.ntClosed,a),a},Jn(t.Clipper,t.ClipperBase),t.Clipper.NodeType={ntAny:0,ntOpen:1,ntClosed:2},t.ClipperOffset=function(s,a){typeof s>"u"&&(s=2),typeof a>"u"&&(a=t.ClipperOffset.def_arc_tolerance),this.m_destPolys=new t.Paths,this.m_srcPoly=new t.Path,this.m_destPoly=new t.Path,this.m_normals=new Array,this.m_delta=0,this.m_sinA=0,this.m_sin=0,this.m_cos=0,this.m_miterLim=0,this.m_StepsPerRad=0,this.m_lowest=new t.IntPoint0,this.m_polyNodes=new t.PolyNode,this.MiterLimit=s,this.ArcTolerance=a,this.m_lowest.X=-1},t.ClipperOffset.two_pi=6.28318530717959,t.ClipperOffset.def_arc_tolerance=.25,t.ClipperOffset.prototype.Clear=function(){t.Clear(this.m_polyNodes.Childs()),this.m_lowest.X=-1},t.ClipperOffset.Round=t.Clipper.Round,t.ClipperOffset.prototype.AddPath=function(s,a,h){var d=s.length-1;if(!(d<0)){var x=new t.PolyNode;if(x.m_jointype=a,x.m_endtype=h,h===t.EndType.etClosedLine||h===t.EndType.etClosedPolygon)for(;d>0&&t.IntPoint.op_Equality(s[0],s[d]);)d--;x.m_polygon.push(s[0]);for(var E=0,A=0,D=1;D<=d;D++)t.IntPoint.op_Inequality(x.m_polygon[E],s[D])&&(E++,x.m_polygon.push(s[D]),(s[D].Y>x.m_polygon[A].Y||s[D].Y===x.m_polygon[A].Y&&s[D].X<x.m_polygon[A].X)&&(A=E));if(!(h===t.EndType.etClosedPolygon&&E<2)&&(this.m_polyNodes.AddChild(x),h===t.EndType.etClosedPolygon))if(this.m_lowest.X<0)this.m_lowest=new t.IntPoint2(this.m_polyNodes.ChildCount()-1,A);else{var O=this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon[this.m_lowest.Y];(x.m_polygon[A].Y>O.Y||x.m_polygon[A].Y===O.Y&&x.m_polygon[A].X<O.X)&&(this.m_lowest=new t.IntPoint2(this.m_polyNodes.ChildCount()-1,A))}}},t.ClipperOffset.prototype.AddPaths=function(s,a,h){for(var d=0,x=s.length;d<x;d++)this.AddPath(s[d],a,h)},t.ClipperOffset.prototype.FixOrientations=function(){if(this.m_lowest.X>=0&&!t.Clipper.Orientation(this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon))for(var s=0;s<this.m_polyNodes.ChildCount();s++){var a=this.m_polyNodes.Childs()[s];(a.m_endtype===t.EndType.etClosedPolygon||a.m_endtype===t.EndType.etClosedLine&&t.Clipper.Orientation(a.m_polygon))&&a.m_polygon.reverse()}else for(var s=0;s<this.m_polyNodes.ChildCount();s++){var a=this.m_polyNodes.Childs()[s];a.m_endtype===t.EndType.etClosedLine&&!t.Clipper.Orientation(a.m_polygon)&&a.m_polygon.reverse()}},t.ClipperOffset.GetUnitNormal=function(s,a){var h=a.X-s.X,d=a.Y-s.Y;if(h===0&&d===0)return new t.DoublePoint2(0,0);var x=1/Math.sqrt(h*h+d*d);return h*=x,d*=x,new t.DoublePoint2(d,-h)},t.ClipperOffset.prototype.DoOffset=function(s){if(this.m_destPolys=new Array,this.m_delta=s,t.ClipperBase.near_zero(s)){for(var a=0;a<this.m_polyNodes.ChildCount();a++){var h=this.m_polyNodes.Childs()[a];h.m_endtype===t.EndType.etClosedPolygon&&this.m_destPolys.push(h.m_polygon)}return}this.MiterLimit>2?this.m_miterLim=2/(this.MiterLimit*this.MiterLimit):this.m_miterLim=.5;var d;this.ArcTolerance<=0?d=t.ClipperOffset.def_arc_tolerance:this.ArcTolerance>Math.abs(s)*t.ClipperOffset.def_arc_tolerance?d=Math.abs(s)*t.ClipperOffset.def_arc_tolerance:d=this.ArcTolerance;var x=3.14159265358979/Math.acos(1-d/Math.abs(s));this.m_sin=Math.sin(t.ClipperOffset.two_pi/x),this.m_cos=Math.cos(t.ClipperOffset.two_pi/x),this.m_StepsPerRad=x/t.ClipperOffset.two_pi,s<0&&(this.m_sin=-this.m_sin);for(var a=0;a<this.m_polyNodes.ChildCount();a++){var h=this.m_polyNodes.Childs()[a];this.m_srcPoly=h.m_polygon;var E=this.m_srcPoly.length;if(!(E===0||s<=0&&(E<3||h.m_endtype!==t.EndType.etClosedPolygon))){if(this.m_destPoly=new Array,E===1){if(h.m_jointype===t.JoinType.jtRound)for(var A=1,D=0,O=1;O<=x;O++){this.m_destPoly.push(new t.IntPoint2(t.ClipperOffset.Round(this.m_srcPoly[0].X+A*s),t.ClipperOffset.Round(this.m_srcPoly[0].Y+D*s)));var V=A;A=A*this.m_cos-this.m_sin*D,D=V*this.m_sin+D*this.m_cos}else for(var A=-1,D=-1,O=0;O<4;++O)this.m_destPoly.push(new t.IntPoint2(t.ClipperOffset.Round(this.m_srcPoly[0].X+A*s),t.ClipperOffset.Round(this.m_srcPoly[0].Y+D*s))),A<0?A=1:D<0?D=1:A=-1;this.m_destPolys.push(this.m_destPoly);continue}this.m_normals.length=0;for(var O=0;O<E-1;O++)this.m_normals.push(t.ClipperOffset.GetUnitNormal(this.m_srcPoly[O],this.m_srcPoly[O+1]));if(h.m_endtype===t.EndType.etClosedLine||h.m_endtype===t.EndType.etClosedPolygon?this.m_normals.push(t.ClipperOffset.GetUnitNormal(this.m_srcPoly[E-1],this.m_srcPoly[0])):this.m_normals.push(new t.DoublePoint1(this.m_normals[E-2])),h.m_endtype===t.EndType.etClosedPolygon){for(var at=E-1,O=0;O<E;O++)at=this.OffsetPoint(O,at,h.m_jointype);this.m_destPolys.push(this.m_destPoly)}else if(h.m_endtype===t.EndType.etClosedLine){for(var at=E-1,O=0;O<E;O++)at=this.OffsetPoint(O,at,h.m_jointype);this.m_destPolys.push(this.m_destPoly),this.m_destPoly=new Array;for(var tt=this.m_normals[E-1],O=E-1;O>0;O--)this.m_normals[O]=new t.DoublePoint2(-this.m_normals[O-1].X,-this.m_normals[O-1].Y);this.m_normals[0]=new t.DoublePoint2(-tt.X,-tt.Y),at=0;for(var O=E-1;O>=0;O--)at=this.OffsetPoint(O,at,h.m_jointype);this.m_destPolys.push(this.m_destPoly)}else{for(var at=0,O=1;O<E-1;++O)at=this.OffsetPoint(O,at,h.m_jointype);var pt;if(h.m_endtype===t.EndType.etOpenButt){var O=E-1;pt=new t.IntPoint2(t.ClipperOffset.Round(this.m_srcPoly[O].X+this.m_normals[O].X*s),t.ClipperOffset.Round(this.m_srcPoly[O].Y+this.m_normals[O].Y*s)),this.m_destPoly.push(pt),pt=new t.IntPoint2(t.ClipperOffset.Round(this.m_srcPoly[O].X-this.m_normals[O].X*s),t.ClipperOffset.Round(this.m_srcPoly[O].Y-this.m_normals[O].Y*s)),this.m_destPoly.push(pt)}else{var O=E-1;at=E-2,this.m_sinA=0,this.m_normals[O]=new t.DoublePoint2(-this.m_normals[O].X,-this.m_normals[O].Y),h.m_endtype===t.EndType.etOpenSquare?this.DoSquare(O,at):this.DoRound(O,at)}for(var O=E-1;O>0;O--)this.m_normals[O]=new t.DoublePoint2(-this.m_normals[O-1].X,-this.m_normals[O-1].Y);this.m_normals[0]=new t.DoublePoint2(-this.m_normals[1].X,-this.m_normals[1].Y),at=E-1;for(var O=at-1;O>0;--O)at=this.OffsetPoint(O,at,h.m_jointype);h.m_endtype===t.EndType.etOpenButt?(pt=new t.IntPoint2(t.ClipperOffset.Round(this.m_srcPoly[0].X-this.m_normals[0].X*s),t.ClipperOffset.Round(this.m_srcPoly[0].Y-this.m_normals[0].Y*s)),this.m_destPoly.push(pt),pt=new t.IntPoint2(t.ClipperOffset.Round(this.m_srcPoly[0].X+this.m_normals[0].X*s),t.ClipperOffset.Round(this.m_srcPoly[0].Y+this.m_normals[0].Y*s)),this.m_destPoly.push(pt)):(at=1,this.m_sinA=0,h.m_endtype===t.EndType.etOpenSquare?this.DoSquare(0,1):this.DoRound(0,1)),this.m_destPolys.push(this.m_destPoly)}}}},t.ClipperOffset.prototype.Execute=function(){var s=arguments,a=s[0]instanceof t.PolyTree;if(a){var h=s[0],d=s[1];h.Clear(),this.FixOrientations(),this.DoOffset(d);var x=new t.Clipper(0);if(x.AddPaths(this.m_destPolys,t.PolyType.ptSubject,!0),d>0)x.Execute(t.ClipType.ctUnion,h,t.PolyFillType.pftPositive,t.PolyFillType.pftPositive);else{var E=t.Clipper.GetBounds(this.m_destPolys),A=new t.Path;if(A.push(new t.IntPoint2(E.left-10,E.bottom+10)),A.push(new t.IntPoint2(E.right+10,E.bottom+10)),A.push(new t.IntPoint2(E.right+10,E.top-10)),A.push(new t.IntPoint2(E.left-10,E.top-10)),x.AddPath(A,t.PolyType.ptSubject,!0),x.ReverseSolution=!0,x.Execute(t.ClipType.ctUnion,h,t.PolyFillType.pftNegative,t.PolyFillType.pftNegative),h.ChildCount()===1&&h.Childs()[0].ChildCount()>0){var D=h.Childs()[0];h.Childs()[0]=D.Childs()[0],h.Childs()[0].m_Parent=h;for(var O=1;O<D.ChildCount();O++)h.AddChild(D.Childs()[O])}else h.Clear()}}else{var h=s[0],d=s[1];t.Clear(h),this.FixOrientations(),this.DoOffset(d);var x=new t.Clipper(0);if(x.AddPaths(this.m_destPolys,t.PolyType.ptSubject,!0),d>0)x.Execute(t.ClipType.ctUnion,h,t.PolyFillType.pftPositive,t.PolyFillType.pftPositive);else{var E=t.Clipper.GetBounds(this.m_destPolys),A=new t.Path;A.push(new t.IntPoint2(E.left-10,E.bottom+10)),A.push(new t.IntPoint2(E.right+10,E.bottom+10)),A.push(new t.IntPoint2(E.right+10,E.top-10)),A.push(new t.IntPoint2(E.left-10,E.top-10)),x.AddPath(A,t.PolyType.ptSubject,!0),x.ReverseSolution=!0,x.Execute(t.ClipType.ctUnion,h,t.PolyFillType.pftNegative,t.PolyFillType.pftNegative),h.length>0&&h.splice(0,1)}}},t.ClipperOffset.prototype.OffsetPoint=function(s,a,h){if(this.m_sinA=this.m_normals[a].X*this.m_normals[s].Y-this.m_normals[s].X*this.m_normals[a].Y,Math.abs(this.m_sinA*this.m_delta)<1){var d=this.m_normals[a].X*this.m_normals[s].X+this.m_normals[s].Y*this.m_normals[a].Y;if(d>0)return this.m_destPoly.push(new t.IntPoint2(t.ClipperOffset.Round(this.m_srcPoly[s].X+this.m_normals[a].X*this.m_delta),t.ClipperOffset.Round(this.m_srcPoly[s].Y+this.m_normals[a].Y*this.m_delta))),a}else this.m_sinA>1?this.m_sinA=1:this.m_sinA<-1&&(this.m_sinA=-1);if(this.m_sinA*this.m_delta<0)this.m_destPoly.push(new t.IntPoint2(t.ClipperOffset.Round(this.m_srcPoly[s].X+this.m_normals[a].X*this.m_delta),t.ClipperOffset.Round(this.m_srcPoly[s].Y+this.m_normals[a].Y*this.m_delta))),this.m_destPoly.push(new t.IntPoint1(this.m_srcPoly[s])),this.m_destPoly.push(new t.IntPoint2(t.ClipperOffset.Round(this.m_srcPoly[s].X+this.m_normals[s].X*this.m_delta),t.ClipperOffset.Round(this.m_srcPoly[s].Y+this.m_normals[s].Y*this.m_delta)));else switch(h){case t.JoinType.jtMiter:{var x=1+(this.m_normals[s].X*this.m_normals[a].X+this.m_normals[s].Y*this.m_normals[a].Y);x>=this.m_miterLim?this.DoMiter(s,a,x):this.DoSquare(s,a);break}case t.JoinType.jtSquare:this.DoSquare(s,a);break;case t.JoinType.jtRound:this.DoRound(s,a);break}return a=s,a},t.ClipperOffset.prototype.DoSquare=function(s,a){var h=Math.tan(Math.atan2(this.m_sinA,this.m_normals[a].X*this.m_normals[s].X+this.m_normals[a].Y*this.m_normals[s].Y)/4);this.m_destPoly.push(new t.IntPoint2(t.ClipperOffset.Round(this.m_srcPoly[s].X+this.m_delta*(this.m_normals[a].X-this.m_normals[a].Y*h)),t.ClipperOffset.Round(this.m_srcPoly[s].Y+this.m_delta*(this.m_normals[a].Y+this.m_normals[a].X*h)))),this.m_destPoly.push(new t.IntPoint2(t.ClipperOffset.Round(this.m_srcPoly[s].X+this.m_delta*(this.m_normals[s].X+this.m_normals[s].Y*h)),t.ClipperOffset.Round(this.m_srcPoly[s].Y+this.m_delta*(this.m_normals[s].Y-this.m_normals[s].X*h))))},t.ClipperOffset.prototype.DoMiter=function(s,a,h){var d=this.m_delta/h;this.m_destPoly.push(new t.IntPoint2(t.ClipperOffset.Round(this.m_srcPoly[s].X+(this.m_normals[a].X+this.m_normals[s].X)*d),t.ClipperOffset.Round(this.m_srcPoly[s].Y+(this.m_normals[a].Y+this.m_normals[s].Y)*d)))},t.ClipperOffset.prototype.DoRound=function(s,a){for(var h=Math.atan2(this.m_sinA,this.m_normals[a].X*this.m_normals[s].X+this.m_normals[a].Y*this.m_normals[s].Y),d=Math.max(t.Cast_Int32(t.ClipperOffset.Round(this.m_StepsPerRad*Math.abs(h))),1),x=this.m_normals[a].X,E=this.m_normals[a].Y,A,D=0;D<d;++D)this.m_destPoly.push(new t.IntPoint2(t.ClipperOffset.Round(this.m_srcPoly[s].X+x*this.m_delta),t.ClipperOffset.Round(this.m_srcPoly[s].Y+E*this.m_delta))),A=x,x=x*this.m_cos-this.m_sin*E,E=A*this.m_sin+E*this.m_cos;this.m_destPoly.push(new t.IntPoint2(t.ClipperOffset.Round(this.m_srcPoly[s].X+this.m_normals[s].X*this.m_delta),t.ClipperOffset.Round(this.m_srcPoly[s].Y+this.m_normals[s].Y*this.m_delta)))},t.Error=function(s){try{throw new Error(s)}catch(a){alert(a.message)}},t.JS={},t.JS.AreaOfPolygon=function(s,a){return a||(a=1),t.Clipper.Area(s)/(a*a)},t.JS.AreaOfPolygons=function(s,a){a||(a=1);for(var h=0,d=0;d<s.length;d++)h+=t.Clipper.Area(s[d]);return h/(a*a)},t.JS.BoundsOfPath=function(s,a){return t.JS.BoundsOfPaths([s],a)},t.JS.BoundsOfPaths=function(s,a){a||(a=1);var h=t.Clipper.GetBounds(s);return h.left/=a,h.bottom/=a,h.right/=a,h.top/=a,h},t.JS.Clean=function(d,a){if(!(d instanceof Array))return[];var h=d[0]instanceof Array,d=t.JS.Clone(d);if(typeof a!="number"||a===null)return t.Error("Delta is not a number in Clean()."),d;if(d.length===0||d.length===1&&d[0].length===0||a<0)return d;h||(d=[d]);for(var x=d.length,E,A,D,O,V,at,tt,pt=[],Bt=0;Bt<x;Bt++)if(A=d[Bt],E=A.length,E!==0){if(E<3){D=A,pt.push(D);continue}for(D=A,O=a*a,V=A[0],at=1,tt=1;tt<E;tt++)(A[tt].X-V.X)*(A[tt].X-V.X)+(A[tt].Y-V.Y)*(A[tt].Y-V.Y)<=O||(D[at]=A[tt],V=A[tt],at++);V=A[at-1],(A[0].X-V.X)*(A[0].X-V.X)+(A[0].Y-V.Y)*(A[0].Y-V.Y)<=O&&at--,at<E&&D.splice(at,E-at),D.length&&pt.push(D)}return!h&&pt.length?pt=pt[0]:!h&&pt.length===0?pt=[]:h&&pt.length===0&&(pt=[[]]),pt},t.JS.Clone=function(s){if(!(s instanceof Array))return[];if(s.length===0)return[];if(s.length===1&&s[0].length===0)return[[]];var a=s[0]instanceof Array;a||(s=[s]);var h=s.length,d,x,E,A,D=new Array(h);for(x=0;x<h;x++){for(d=s[x].length,A=new Array(d),E=0;E<d;E++)A[E]={X:s[x][E].X,Y:s[x][E].Y};D[x]=A}return a||(D=D[0]),D},t.JS.Lighten=function(s,a){if(!(s instanceof Array))return[];if(typeof a!="number"||a===null)return t.Error("Tolerance is not a number in Lighten()."),t.JS.Clone(s);if(s.length===0||s.length===1&&s[0].length===0||a<0)return t.JS.Clone(s);var h=s[0]instanceof Array;h||(s=[s]);var d,x,E,A,D,O,V,at,tt,pt,Bt,ee,ie,be,un,Fn,Ji,q0=s.length,Z0=a*a,ji=[];for(d=0;d<q0;d++)if(E=s[d],O=E.length,O!==0){for(A=0;A<1e6;A++){for(D=[],O=E.length,E[O-1].X!==E[0].X||E[O-1].Y!==E[0].Y?(ee=1,E.push({X:E[0].X,Y:E[0].Y}),O=E.length):ee=0,Bt=[],x=0;x<O-2;x++)V=E[x],tt=E[x+1],at=E[x+2],Fn=V.X,Ji=V.Y,ie=at.X-Fn,be=at.Y-Ji,(ie!==0||be!==0)&&(un=((tt.X-Fn)*ie+(tt.Y-Ji)*be)/(ie*ie+be*be),un>1?(Fn=at.X,Ji=at.Y):un>0&&(Fn+=ie*un,Ji+=be*un)),ie=tt.X-Fn,be=tt.Y-Ji,pt=ie*ie+be*be,pt<=Z0&&(Bt[x+1]=1,x++);for(D.push({X:E[0].X,Y:E[0].Y}),x=1;x<O-1;x++)Bt[x]||D.push({X:E[x].X,Y:E[x].Y});if(D.push({X:E[O-1].X,Y:E[O-1].Y}),ee&&E.pop(),Bt.length)E=D;else break}O=D.length,D[O-1].X===D[0].X&&D[O-1].Y===D[0].Y&&D.pop(),D.length>2&&ji.push(D)}return h||(ji=ji[0]),typeof ji>"u"&&(ji=[]),ji},t.JS.PerimeterOfPath=function(s,a,h){if(typeof s>"u")return 0;var d=Math.sqrt,x=0,E,A,D=0,O=0,V=0,at=0,tt=s.length;if(tt<2)return 0;for(a&&(s[tt]=s[0],tt++);--tt;)E=s[tt],D=E.X,O=E.Y,A=s[tt-1],V=A.X,at=A.Y,x+=d((D-V)*(D-V)+(O-at)*(O-at));return a&&s.pop(),x/h},t.JS.PerimeterOfPaths=function(s,a,h){h||(h=1);for(var d=0,x=0;x<s.length;x++)d+=t.JS.PerimeterOfPath(s[x],a,h);return d},t.JS.ScaleDownPath=function(s,a){var h,d;for(a||(a=1),h=s.length;h--;)d=s[h],d.X=d.X/a,d.Y=d.Y/a},t.JS.ScaleDownPaths=function(s,a){var h,d,x;for(a||(a=1),h=s.length;h--;)for(d=s[h].length;d--;)x=s[h][d],x.X=x.X/a,x.Y=x.Y/a},t.JS.ScaleUpPath=function(s,a){var h,d,x=Math.round;for(a||(a=1),h=s.length;h--;)d=s[h],d.X=x(d.X*a),d.Y=x(d.Y*a)},t.JS.ScaleUpPaths=function(s,a){var h,d,x,E=Math.round;for(a||(a=1),h=s.length;h--;)for(d=s[h].length;d--;)x=s[h][d],x.X=E(x.X*a),x.Y=E(x.Y*a)},t.ExPolygons=function(){return[]},t.ExPolygon=function(){this.outer=null,this.holes=null},t.JS.AddOuterPolyNodeToExPolygons=function(s,a){var h=new t.ExPolygon;h.outer=s.Contour();var d=s.Childs(),x=d.length;h.holes=new Array(x);var E,A,D,O,V,at;for(D=0;D<x;D++)for(E=d[D],h.holes[D]=E.Contour(),O=0,V=E.Childs(),at=V.length;O<at;O++)A=V[O],t.JS.AddOuterPolyNodeToExPolygons(A,a);a.push(h)},t.JS.ExPolygonsToPaths=function(s){var a,h,d,x,E=new t.Paths;for(a=0,d=s.length;a<d;a++)for(E.push(s[a].outer),h=0,x=s[a].holes.length;h<x;h++)E.push(s[a].holes[h]);return E},t.JS.PolyTreeToExPolygons=function(s){var a=new t.ExPolygons,h,d,x,E;for(d=0,x=s.Childs(),E=x.length;d<E;d++)h=x[d],t.JS.AddOuterPolyNodeToExPolygons(h,a);return a}})()})(_0);var z_=_0.exports;const vi=k_(z_),Ce=fr,Yl=1e5,H_=.01;function x0(n){const t=(Su[n]??"#000000").replace("#","");return{r:parseInt(t.slice(0,2),16)/255,g:parseInt(t.slice(2,4),16)/255,b:parseInt(t.slice(4,6),16)/255,a:1}}function G_(n,t){var r;const e=[],i=((r=n.legs.get(t))==null?void 0:r.wayIds)??[...n.ways.values()].filter(o=>o.leg===t).map(o=>o.id);for(const o of i){const c=n.ways.get(o);if(!c||c.leg!==t)continue;const l=Le(n,c.n1),u=Le(n,c.n2),f=l.x<u.x?1:-1,p=x0(c.color);let m=l.x,g=u.x;n.nodes.get(c.n1).intersection!=null&&(m=l.x+f*(l.y<=u.y?2.1*Ce:1.05*Ce),e.push({x1:l.x,y1:l.y,x2:m,y2:l.y,color:p})),n.nodes.get(c.n2).intersection!=null&&(g=u.x-f*(l.y<=u.y?1.05*Ce:2.1*Ce),e.push({x1:g,y1:u.y,x2:u.x,y2:u.y,color:p})),e.push({x1:m,y1:l.y,x2:g,y2:u.y,color:p})}return e}function X_(n,t){const{hand:e,gridIndex:i}=Se(t),r=[];for(const o of n.intersections.values())(e==="right"?o.right:o.left)===i&&r.push({x:Un(e==="right"?o.left:o.right),y:o.z});return r}const Es=n=>n<0?Math.trunc(n-.5):Math.trunc(n+.5);function V_(n,t){const e=t.X-n.X,i=t.Y-n.Y;if(e===0&&i===0)return{X:0,Y:0};const r=1/Math.sqrt(e*e+i*i);return{X:i*r,Y:-e*r}}function nu(n,t,e,i,r){const o=Math.abs(e-t)/(2*Math.PI),c=Math.trunc(o*Math.PI/Math.acos(1-r/Math.abs(i))),l=c>1?Math.min(c,Math.trunc(o*222)):2;let u=Math.cos(t),f=Math.sin(t);const p=Math.cos((e-t)/l),m=Math.sin((e-t)/l),g=[];for(let v=0;v<=l;v++){g.push({X:n.X+Es(u*i),Y:n.Y+Es(f*i)});const M=u;u=u*p-m*f,f=M*m+f*p}return g}function W_(n,t,e){const i=[];for(const r of n){const o=[];for(const m of r)(!o.length||o[o.length-1].X!==m.X||o[o.length-1].Y!==m.Y)&&o.push(m);const c=o.length;if(c===0)continue;if(c===1){i.push(nu(o[0],0,2*Math.PI,t,e));continue}const l=[];for(let m=0;m<c-1;m++)l.push(V_(o[m],o[m+1]));l.push({...l[c-2]});const u=[],f=(m,g)=>{const v=o[m],M=l[g],S=l[m];if(u.push({X:Es(v.X+M.X*t),Y:Es(v.Y+M.Y*t)}),t*(M.X*S.Y-S.X*M.Y)>=0){if(M.X*S.X+S.Y*M.Y<.985){const _=Math.atan2(M.Y,M.X);let y=Math.atan2(S.Y,S.X);t>0&&y<_?y+=2*Math.PI:t<0&&y>_&&(y-=2*Math.PI),u.push(...nu(v,_,y,t,e))}}else u.push({X:v.X,Y:v.Y});u.push({X:Es(v.X+S.X*t),Y:Es(v.Y+S.Y*t)})};let p=0;for(let m=1;m<c-1;m++)f(m,p),p=m;l[c-1]={X:-l[c-1].X,Y:-l[c-1].Y},f(c-1,c-2);for(let m=c-1;m>0;m--)l[m]={X:-l[m-1].X,Y:-l[m-1].Y};l[0]={X:-l[1].X,Y:-l[1].Y},p=c-1;for(let m=p-1;m>0;m--)f(m,p),p=m;f(0,1),i.push(u)}return y0(vi.ClipType.ctUnion,i,[])}function y0(n,t,e){const i=new vi.Clipper;i.AddPaths(t,vi.PolyType.ptSubject,!0),e.length&&i.AddPaths(e,vi.PolyType.ptClip,!0);const r=[];return i.Execute(n,r,vi.PolyFillType.pftPositive,vi.PolyFillType.pftPositive),r}const Sn=n=>Math.trunc(Math.fround(Math.fround(n)*Yl));function ql(n,t,e){let i=!1;for(let r=0,o=e.length-1;r<e.length;o=r++){const c=e[r].y,l=e[o].y;c<=t==t<l&&n<e[r].x+(t-c)*(e[o].x-e[r].x)/(l-c)&&(i=!i)}return i}function Y_(n,t){const e=G_(n,t),i=e.map(g=>[{X:Sn(g.x1),Y:Sn(g.y1)},{X:Sn(g.x2),Y:Sn(g.y2)}]),r=Math.fround(Ce)*Yl,o=W_(i,r,H_*Yl),c=X_(n,t).map(({x:g,y:v})=>[{X:Sn(g-Ce*1.001),Y:Sn(v+Ce*1.2)},{X:Sn(g-Ce*1.001),Y:Sn(v-Ce*1.2)},{X:Sn(g+Ce*1.001),Y:Sn(v-Ce*1.2)},{X:Sn(g+Ce*1.001),Y:Sn(v+Ce*1.2)}]),l=y0(vi.ClipType.ctDifference,o,c),u={r:0,g:0,b:0,a:1},f=l.map(g=>g.map(v=>({x:v.X*1e-5,y:v.Y*1e-5,nx:0,ny:0,color:u}))),p=l.map(g=>vi.Clipper.Orientation(g));f.forEach((g,v)=>{const M=g.length;for(let S=0;S<M;S++){const _=g[S],y=g[(S+1)%M],P=g[(S-1+M)%M],b=_.x-y.x,I=_.y-y.y,z=P.x-_.x,F=P.y-_.y,N=Math.sqrt(b*b+I*I),X=Math.sqrt(z*z+F*F),ot=b/N,w=I/N,L=z/X,Z=F/X;if(p[v]&&Math.abs(L-w)<=1e-5&&Math.abs(Z+ot)<=1e-5){L>0||ot>0?(_.nx=0,_.ny=1):(L<0||ot<0)&&(_.nx=0,_.ny=-1);continue}const $=N/(X+N),Q=-((1-$)*Z+w*$),st=ot*$+L*(1-$),K=Math.sqrt(Q*Q+st*st);_.nx=Q/K,_.ny=st/K}});const m=e.flatMap(g=>[{x:g.x1,y:g.y1,color:g.color},{x:g.x2,y:g.y2,color:g.color}]);return f.forEach((g,v)=>{if(!p[v])return;const M=m.find(S=>ql(S.x,S.y,g));for(const S of g)S.color=M?M.color:u}),f.forEach((g,v)=>{if(p[v]||!g.length)return;const M=f.find((S,_)=>p[_]&&ql(g[0].x,g[0].y,S));for(const S of g)S.color=M?M[0].color:u}),{polys:f,outer:p}}function q_(n,t,e){const{hand:i,gridIndex:r}=Se(t),o=Un(r),{polys:c,outer:l}=Y_(n,t),u={position:[],normal:[],color:[]},f={position:[],normal:[]},p=(S,_,y)=>i==="left"?[o+y*Ce,S,_]:[S,o+y*Ce,_],m=(S,_)=>i==="left"?[0,S,_]:[S,0,_],g=(S,_,y)=>{const P=Math.sqrt(_*_+1+y*y);return i==="left"?[S/P,_/P,y/P]:[_/P,S/P,y/P]},v=(S,_,y,P,b)=>{u.position.push(...p(S.x,S.y,_)),u.normal.push(...y),u.color.push(b.r,b.g,b.b,b.a),f.position.push(...p(S.x,S.y,_)),f.normal.push(...P)},M=i==="left"?[-1,0,0]:[0,-1,0];c.forEach((S,_)=>{if(!l[_])return;const y=c.filter((b,I)=>!l[I]&&b.length&&ql(b[0].x,b[0].y,S)),P=[...S,...y.flat()];for(const b of e(S,y))for(const I of[-1,1]){const z=I<0?b:[b[0],b[2],b[1]];for(const F of z)v(P[F],I,M,g(-1,P[F].nx,P[F].ny),P[F].color)}});for(const S of c)for(let _=0;_<S.length;_++){const y=S[_],P=S[(_+1)%S.length],b=()=>v(P,-1,m(P.nx,P.ny),g(-1,P.nx,P.ny),y.color),I=()=>v(y,1,m(y.nx,y.ny),g(1,y.nx,y.ny),y.color),z=()=>v(y,-1,m(y.nx,y.ny),g(-1,y.nx,y.ny),y.color),F=()=>v(P,1,m(P.nx,P.ny),g(1,P.nx,P.ny),y.color);b(),I(),z(),b(),F(),I()}return{main:u,outline:f}}function Z_(n,t,e,i){const r={nw:[Ce,Ce],ne:[Ce,-Ce],se:[-Ce,-Ce],sw:[-Ce,Ce]},o=S=>[r[S][0],r[S][1],Ce],c=S=>[r[S][0],r[S][1],-Ce],l={nw:[1,1],ne:[1,-1],se:[-1,-1],sw:[-1,1]},u=(S,_)=>{const y=[l[S][0],l[S][1],_],P=Math.hypot(y[0],y[1],y[2]);return y.map(b=>b/P*1.2)},f=S=>[o(S),u(S,1)],p=S=>[c(S),u(S,-1)],m=[[f("nw"),f("sw"),f("se"),f("ne")],[f("se"),f("sw"),p("sw"),p("se")],[f("ne"),f("se"),p("se"),p("ne")],[p("nw"),p("ne"),p("se"),p("sw")],[f("nw"),p("nw"),p("ne"),f("ne")],[f("nw"),f("sw"),p("sw"),p("nw")]],g={position:[],normal:[],color:[]},v={position:[],normal:[]},M=S=>[S[0]+n,S[1]+t,S[2]+e];for(const S of m){const[_,y,P]=[S[0][0],S[1][0],S[2][0]],b=[y[0]-_[0],y[1]-_[1],y[2]-_[2]],I=[P[0]-_[0],P[1]-_[1],P[2]-_[2]],z=[b[1]*I[2]-b[2]*I[1],b[2]*I[0]-b[0]*I[2],b[0]*I[1]-b[1]*I[0]],F=Math.hypot(z[0],z[1],z[2])||1;for(const N of[0,1,2,0,2,3])g.position.push(...M(S[N][0])),g.normal.push(z[0]/F,z[1]/F,z[2]/F),g.color.push(i.r,i.g,i.b,i.a),v.position.push(...M(S[N][0])),v.normal.push(...S[N][1])}return{main:g,outline:v}}function iu(n){const t=Yn.degToRad(n);return new U(Math.cos(t)*.5,-Math.cos(t)*.5,-Math.sin(t)).normalize()}function $_(n){return new Ye({uniforms:{diffuseColor:{value:n.diffuse},ambientColor:{value:n.ambient},lightDir:{value:n.dir}},vertexShader:`
      attribute vec4 rgba;
      varying vec3 vNormal;
      varying vec4 vColor;
      void main() {
        vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
        vColor = rgba;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:`
      uniform vec4 diffuseColor;
      uniform vec4 ambientColor;
      uniform vec3 lightDir;
      varying vec3 vNormal;
      varying vec4 vColor;
      void main() {
        vec3 n = normalize(vNormal);
        vec4 diffuse = max(-dot(n, lightDir), 0.0) * diffuseColor;
        gl_FragColor = (diffuse + ambientColor) * vColor;
        gl_FragColor.a = 1.0;
      }`,side:xn})}function K_(n=1){return new Ye({uniforms:{color:{value:new oe(0,0,0,1)},push:{value:.2*n}},vertexShader:`
      const float widthNear = 0.032;
      const float widthFar = widthNear * 2.0;
      const float widthFarCap = widthNear * 20.0;
      uniform float push;
      void main() {
        mat4 transform = projectionMatrix * modelViewMatrix;
        gl_Position = transform * vec4(position, 1.0);
        float multi = clamp(mix(widthNear, widthFar, gl_Position.z / 20.0), widthNear, widthFarCap);
        gl_Position += transform * vec4(normal * multi, 0.0);
        gl_Position.z += push;
      }`,fragmentShader:`
      uniform vec4 color;
      void main() { gl_FragColor = color; }`,side:xn})}const J_=16.6667,j_=[{name:"arm_lower.L",length:.19541},{name:"arm_lower.R",length:.19541},{name:"arm_upper.L",length:.166737},{name:"arm_upper.R",length:.166737},{name:"head",length:.164963},{name:"leg_lower.L",length:.314488},{name:"leg_lower.R",length:.314488},{name:"leg_upper.L",length:.258628},{name:"leg_upper.R",length:.258628},{name:"pelvis",length:.0918293},{name:"ribs",length:.184296},{name:"shoulder.L",length:.0789907},{name:"shoulder.R",length:.0789907},{name:"spine",length:.0878338}],Q_=[{time:0,bones:[[.117746,.009346,.705023,.062267,-.878695,.473287,-.004127],[-.120355,.02144,.716922,.042368,-.430702,.858816,-.27411],[.057802,-.02487,.856804,-.178708,-.864281,.456253,-.113642],[-.039574,-.025587,.854995,.171908,-.387277,.874106,.237495],[.007995,-.029762,.917918,.004869,-.055984,.007945,-.998388],[.124449,-.093769,.336927,.002405,-.17743,-.984104,.007268],[-.100169,-.048336,.327966,.005774,-.199714,.96806,.151461],[.016466,-.005799,.554848,-.072854,-.561188,.778697,-.270908],[.016466,-.005799,.554848,.210998,-.75969,.601246,.129825],[.016466,-.005799,.554848,-.999396,.030765,-.011278,.011602],[.012375,-.017374,.734091,-.999296,.033491,-.012278,.0116],[.007995,-.029762,.917918,-.258882,-.669289,.662491,-.214797],[.007995,-.029762,.917918,.199703,-.68424,.655825,.248652],[.014462,-.01147,.64648,-.999296,.033491,-.012278,.0116]]},{time:1.29167,bones:[[.117532,.011499,.704778,.066864,-.876751,.476216,-.007463],[-.120547,.033762,.719761,.026553,-.415851,.87029,-.262598],[.057458,-.019834,.857128,-.171154,-.86415,.458369,-.117682],[-.039916,-.020559,.85522,.166543,-.373323,.875692,.257016],[.007581,-.023665,.918259,.005382,-.055409,.004803,-.998438],[.124669,-.093488,.336924,.002107,-.173451,-.98481,.007779],[-.100444,-.048091,.328062,.006019,-.195882,.968921,.15095],[.016466,-.005799,.554848,-.072213,-.565014,.77593,-.271066],[.016466,-.005799,.554848,.211646,-.756504,.605097,.129482],[.016466,-.005799,.554848,-.999601,.022926,-.011735,.011604],[.012172,-.014433,.734252,-.999541,.024912,-.012752,.011603],[.007581,-.023665,.918259,-.253484,-.671282,.660558,-.220884],[.007581,-.023665,.918259,.20516,-.682564,.65813,.242652],[.014361,-.010033,.646556,-.999541,.024912,-.012752,.011603]]},{time:1.83333,bones:[[.116761,.014956,.704342,.073656,-.873037,.481859,-.013938],[-.121501,.025434,.714236,.04677,-.435653,.852289,-.285697],[.056426,-.011323,.857542,-.158151,-.863383,.462577,-.124826],[-.040942,-.012064,.855322,.181985,-.391264,.877492,.209289],[.006338,-.013364,.918588,.006294,-.053617,-.004522,-.998531],[.125022,-.093033,.336916,.001623,-.167016,-.985915,.0086],[-.100929,-.047652,.328231,.006444,-.189121,.970402,.15004],[.016466,-.005799,.554848,-.071175,-.571161,.771426,-.271315],[.016466,-.005799,.554848,.212784,-.750844,.611838,.128878],[.016466,-.005799,.554848,-.999798,.009663,-.013255,.011606],[.011563,-.009461,.734407,-.999776,.010424,-.014299,.011606],[.006338,-.013364,.918588,-.244826,-.674353,.657008,-.231624],[.006338,-.013364,.918588,.213833,-.679792,.662075,.231981],[.014053,-.007601,.646628,-.999776,.010424,-.014299,.011606]]},{time:2.41667,bones:[[.115326,.020436,.70354,.08398,-.866251,.491866,-.024997],[-.132928,.030299,.717581,.12392,-.462078,.863994,-.156978],[.054506,.002378,.857734,-.13756,-.860975,.470224,-.136707],[-.042846,.00159,.854921,.217234,-.408065,.863324,.202397],[.004024,.003195,.918483,.007724,-.050192,-.020637,-.998497],[.125575,-.092305,.336902,845e-6,-.156769,-.987585,.009897],[-.101716,-.046923,.328506,.007118,-.178091,.972712,.148542],[.016466,-.005799,.554848,-.069522,-.580844,.764179,-.271694],[.016466,-.005799,.554848,.214621,-.741518,.622681,.127898],[.016466,-.005799,.554848,-.999733,-.011882,-.016042,.011605],[.010438,-.001441,.734357,-.999702,-.012784,-.017259,.011605],[.004024,.003195,.918483,-.231174,-.678854,.650916,-.249048],[.004024,.003195,.918483,.227302,-.675161,.668205,.214461],[.013495,-.003651,.646604,-.999702,-.012784,-.017259,.011605]]},{time:2.75,bones:[[.114772,.02975,.702884,.112109,-.842241,.526645,-.026573],[-.132084,.029627,.714321,.16125,-.481616,.856307,-.093714],[.052232,.020419,.857166,-.122488,-.842379,.503038,-.149489],[-.045156,.019655,.856255,.226215,-.442926,.854072,.152328],[.002944,.021571,.918882,.007727,-.059849,-.018736,-.998002],[.119363,-.061713,.333029,.007559,-.143528,-.989463,-.017492],[-.108018,-.042028,.330294,-.003276,-.191318,.971667,.138743],[.008406,.010748,.555125,-.086218,-.592502,.76047,-.251384],[.008406,.010748,.555125,.228947,-.749113,.611137,.113684],[.008406,.010748,.555125,-.99981,-.014045,-.006885,.011606],[.005767,.015978,.734693,-.999788,-.015265,-.007482,.011606],[.002944,.021571,.918882,-.223016,-.681737,.652604,-.244146],[.002944,.021571,.918882,.235517,-.672335,.666625,.219336],[.007112,.013312,.64691,-.999788,-.015265,-.007482,.011606]]},{time:3.125,bones:[[.113277,.042742,.701693,.156037,-.791594,.590228,-.025753],[-.126086,.031401,.712396,.181848,-.52215,.829256,-.081396],[.049064,.046457,.855525,-.103937,-.801134,.565228,-.167027],[-.048261,.045698,.859162,.228978,-.500462,.830451,.086363],[.002727,.045733,.919493,.006621,-.083264,.001687,-.996504],[.09631,.011336,.321828,.04075,-.126708,-.989047,-.063797],[-.118058,-.02967,.333827,-.019671,-.229299,.966319,.115161],[-.008609,.045681,.55571,-.118689,-.61423,.758209,-.183724],[-.008609,.045681,.55571,.252635,-.771063,.578291,.084945],[-.008609,.045681,.55571,-.999822,104e-6,.014873,.011606],[-.003101,.045706,.735289,-.999808,111e-6,.015812,.011606],[.002727,.045733,.919493,-.217851,-.683676,.661435,-.218249],[.002727,.045733,.919493,.240863,-.670322,.657688,.245153],[-.005878,.045694,.647499,-.999808,111e-6,.015812,.011606]]},{time:3.20833,bones:[[.113185,.044292,.70156,.160992,-.785116,.597517,-.025457],[-.124712,.031122,.712164,.185026,-.526974,.825841,-.077779],[.048722,.049411,.855246,-.102436,-.795781,.572361,-.16924],[-.048579,.048642,.859466,.228783,-.508115,.826765,.077058],[.002771,.048406,.919488,.006477,-.086248,.005148,-.996239],[.092135,.021448,.320187,.047279,-.125269,-.988675,-.067786],[-.119056,-.027945,.334245,-.021119,-.23403,.96553,.111966],[-.010684,.04994,.555781,-.122083,-.617323,.75788,-.172122],[-.010684,.04994,.555781,.255088,-.773697,.57418,.081488],[-.010684,.04994,.555781,-.999778,.002197,.017472,.011606],[-.004165,.049197,.735324,-.999753,.002363,.018796,.011606],[.002771,.048406,.919488,-.217367,-.683821,.662594,-.214731],[.002771,.048406,.919488,.241346,-.67009,.656438,.248636],[-.007471,.049574,.647554,-.999753,.002363,.018796,.011606]]},{time:3.33333,bones:[[.113389,.045498,.701579,.163903,-.781715,.601212,-.024506],[-.123861,.03091,.712031,.18689,-.529668,.823908,-.075498],[.048529,.051055,.855083,-.102871,-.792914,.575852,-.170585],[-.048757,.050278,.85963,.228598,-.512499,.824594,.071641],[.002795,.049885,.919477,.006398,-.087891,.008358,-.996074],[.089552,.027356,.319218,.051373,-.124543,-.988424,-.069766],[-.1196,-.026951,.334479,-.021889,-.236721,.965067,.110135],[-.011854,.052342,.555821,-.123906,-.619165,.757663,-.165011],[-.011854,.052342,.555821,.256434,-.775183,.571844,.079546],[-.011854,.052342,.555822,-.999747,.003406,.018955,.011606],[-.004764,.051153,.735341,-.999716,.003679,.020471,.011605],[.002795,.049885,.919477,-.217128,-.683887,.663252,-.21272],[.002795,.049885,.919477,.241582,-.669968,.65572,.250625],[-.008366,.051757,.647583,-.999716,.003679,.020471,.011605]]},{time:4.125,bones:[[.116111,.049472,.702665,.155811,-.786867,.59677,-.020741],[-.123861,.03091,.712031,.18689,-.529668,.823908,-.075498],[.048529,.051055,.855083,-.116796,-.794963,.570172,-.171164],[-.048757,.050278,.85963,.228598,-.512499,.824594,.071641],[.002795,.049885,.919477,.006336,-.087403,.020959,-.995932],[.089552,.027356,.319218,.051373,-.124543,-.988424,-.069766],[-.1196,-.026951,.334479,-.021889,-.236721,.965067,.110135],[-.011854,.052342,.555821,-.123906,-.619165,.757663,-.165011],[-.011854,.052342,.555821,.256434,-.775183,.571844,.079546],[-.011854,.052342,.555822,-.999747,.003406,.018955,.011606],[-.004764,.051153,.735341,-.999716,.003679,.020471,.011605],[.002795,.049885,.919477,-.217128,-.683887,.663252,-.21272],[.002795,.049885,.919477,.241582,-.669968,.65572,.250625],[-.008366,.051757,.647583,-.999716,.003679,.020471,.011605]]},{time:4.45833,bones:[[.117121,.049965,.703112,.161542,-.785771,.59679,-.017607],[-.123861,.03091,.712031,.18689,-.529668,.823908,-.075498],[.048529,.051055,.855083,-.119857,-.794581,.569526,-.172959],[-.048757,.050278,.85963,.228598,-.512499,.824594,.071641],[.002795,.049885,.919477,.006256,-.087088,.026248,-.995835],[.089552,.027356,.319218,.051373,-.124543,-.988424,-.069766],[-.1196,-.026951,.334479,-.021889,-.236721,.965067,.110135],[-.011854,.052342,.555821,-.123906,-.619165,.757663,-.165011],[-.011854,.052342,.555821,.256434,-.775183,.571844,.079546],[-.011854,.052342,.555822,-.999747,.003406,.018955,.011606],[-.004764,.051153,.735341,-.999716,.003679,.020471,.011605],[.002795,.049885,.919477,-.217128,-.683887,.663252,-.21272],[.002795,.049885,.919477,.241582,-.669968,.65572,.250625],[-.008366,.051757,.647583,-.999716,.003679,.020471,.011605]]},{time:4.95833,bones:[[.118665,.05083,.703815,.181788,-.782058,.596075,-.005788],[-.123861,.03091,.712031,.18689,-.529668,.823908,-.075498],[.048529,.051055,.855083,-.124741,-.794253,.568134,-.175574],[-.048757,.050278,.85963,.228598,-.512499,.824594,.071641],[.002795,.049885,.919477,.006054,-.086464,.033795,-.995663],[.089552,.027356,.319218,.051373,-.124543,-.988424,-.069766],[-.1196,-.026951,.334479,-.021889,-.236721,.965067,.110135],[-.011854,.052342,.555821,-.123906,-.619165,.757663,-.165011],[-.011854,.052342,.555821,.256434,-.775183,.571844,.079546],[-.011854,.052342,.555822,-.999747,.003406,.018955,.011606],[-.004764,.051153,.735341,-.999716,.003679,.020471,.011605],[.002795,.049885,.919477,-.217128,-.683887,.663252,-.21272],[.002795,.049885,.919477,.241582,-.669968,.65572,.250625],[-.008366,.051757,.647583,-.999716,.003679,.020471,.011605]]},{time:5,bones:[[.118781,.050898,.703869,.183889,-.781653,.595972,-.004549],[-.123861,.03091,.712031,.18689,-.529668,.823908,-.075498],[.048529,.051055,.855083,-.125115,-.794238,.568012,-.175769],[-.048757,.050278,.85963,.228598,-.512499,.824594,.071641],[.002795,.049885,.919477,.006032,-.086402,.034391,-.995648],[.089552,.027356,.319218,.051373,-.124543,-.988424,-.069766],[-.1196,-.026951,.334479,-.021889,-.236721,.965067,.110135],[-.011854,.052342,.555821,-.123906,-.619165,.757663,-.165011],[-.011854,.052342,.555821,.256434,-.775183,.571844,.079546],[-.011854,.052342,.555822,-.999747,.003406,.018955,.011606],[-.004764,.051153,.735341,-.999716,.003679,.020471,.011605],[.002795,.049885,.919477,-.217128,-.683887,.663252,-.21272],[.002795,.049885,.919477,.241582,-.669968,.65572,.250625],[-.008366,.051757,.647583,-.999716,.003679,.020471,.011605]]},{time:5.625,bones:[[.120633,.049324,.70547,.208335,-.794765,.569527,.024184],[-.134514,.069666,.717596,.140951,-.524968,.835477,-.080748],[.047516,.04062,.855067,-.147588,-.809081,.542209,-.172092],[-.047643,.060862,.859643,.219416,-.48797,.829364,.160928],[.002743,.049894,.91948,-.113825,.080755,-.04691,.989102],[.087649,.024997,.318672,.050026,-.175683,-.980185,-.076623],[-.122077,-.002447,.328362,-.032837,-.181515,.971968,.145783],[-.011854,.052342,.555822,-.128357,-.569787,.796127,-.158268],[-.011854,.052342,.555822,.225945,-.736493,.630332,.095956],[-.011854,.052342,.555822,-.995106,.001341,.019359,-.096894],[-.004763,.051153,.735341,-.995081,.001427,.020603,-.096892],[.002743,.049894,.91948,-.189349,-.609075,.732632,-.23754],[.002743,.049894,.91948,.216377,-.59373,.725426,.272805],[-.00834,.051753,.647582,-.995081,.001427,.020603,-.096892]]},{time:5.83333,bones:[[.121202,.049314,.70603,.21424,-.796017,.565309,.029735],[-.135665,.077569,.719088,.13046,-.520211,.840713,-.074582],[.047158,.038976,.855067,-.152691,-.810871,.537967,-.172526],[-.047238,.062522,.859641,.215482,-.481106,.830674,.179122],[.002757,.049891,.919479,-.130861,.079268,-.049643,.986979],[.087365,.024628,.318596,.049744,-.183559,-.97867,-.077693],[-.122165,.002022,.327374,-.033595,-.17259,.972783,.150921],[-.011854,.052342,.555822,-.129043,-.561858,.801834,-.157245],[-.011854,.052342,.555822,.220307,-.729386,.640036,.099066],[-.011854,.052342,.555822,-.993269,.001001,.019341,-.1142],[-.004763,.051153,.735341,-.993243,.00107,.020663,-.114197],[.002757,.049891,.919479,-.184646,-.596412,.742976,-.241217],[.002757,.049891,.919479,.212132,-.58083,.735799,.276109],[-.008347,.051754,.647582,-.993243,.00107,.020663,-.114197]]},{time:6.16667,bones:[[.122748,.050091,.706865,.221385,-.794071,.565087,.033415],[-.137336,.083272,.720886,.123028,-.514179,.845987,-.069211],[.047158,.038976,.855067,-.157483,-.809943,.537039,-.175445],[-.047238,.062522,.859641,.213299,-.472909,.832134,.195995],[.002757,.049891,.919479,-.130451,.078071,-.052154,.986999],[.087365,.024628,.318596,.049744,-.183559,-.97867,-.077693],[-.122165,.002022,.327374,-.033595,-.17259,.972783,.150921],[-.011854,.052342,.555822,-.129043,-.561858,.801834,-.157245],[-.011854,.052342,.555822,.220307,-.729386,.640036,.099066],[-.011854,.052342,.555822,-.993269,.001001,.019341,-.1142],[-.004763,.051153,.735341,-.993243,.00107,.020663,-.114197],[.002757,.049891,.919479,-.184646,-.596412,.742976,-.241217],[.002757,.049891,.919479,.212132,-.58083,.735799,.276109],[-.008347,.051754,.647582,-.993243,.00107,.020663,-.114197]]},{time:6.66667,bones:[[.12605,.05211,.708763,.227706,-.792465,.564587,.037302],[-.141775,.090838,.725246,.116678,-.510602,.84912,-.06831],[.047158,.038976,.855067,-.168617,-.808082,.534537,-.181225],[-.047238,.062522,.859641,.216941,-.463166,.829754,.223431],[.002757,.049891,.919479,-.129653,.076247,-.053631,.987168],[.087365,.024628,.318596,.049744,-.183559,-.97867,-.077693],[-.122165,.002022,.327374,-.033595,-.17259,.972783,.150921],[-.011854,.052342,.555822,-.129043,-.561858,.801834,-.157245],[-.011854,.052342,.555822,.220307,-.729386,.640036,.099066],[-.011854,.052342,.555822,-.993269,.001001,.019341,-.1142],[-.004763,.051153,.735341,-.993243,.00107,.020663,-.114197],[.002757,.049891,.919479,-.184646,-.596412,.742976,-.241217],[.002757,.049891,.919479,.212132,-.58083,.735799,.276109],[-.008347,.051754,.647582,-.993243,.00107,.020663,-.114197]]},{time:7.58333,bones:[[.1338,.058783,.713992,.235642,-.792978,.5597,.048934],[-.148254,.097212,.731604,.116078,-.513597,.846801,-.075317],[.047158,.038976,.855067,-.199616,-.804452,.525264,-.192635],[-.047238,.062522,.859641,.228097,-.455994,.822204,.253026],[.002757,.049891,.919479,-.079366,.028411,.005307,.996427],[.087365,.024628,.318596,.049744,-.183559,-.97867,-.077693],[-.122165,.002022,.327374,-.033595,-.17259,.972783,.150921],[-.011854,.052342,.555822,-.129043,-.561858,.801834,-.157245],[-.011854,.052342,.555822,.220307,-.729386,.640036,.099066],[-.011854,.052342,.555822,-.993269,.001001,.019341,-.1142],[-.004763,.051153,.735341,-.993243,.00107,.020663,-.114197],[.002757,.049891,.919479,-.184646,-.596412,.742976,-.241217],[.002757,.049891,.919479,.212132,-.58083,.735799,.276109],[-.008347,.051754,.647582,-.993243,.00107,.020663,-.114197]]},{time:7.75,bones:[[.135138,.060116,.715017,.236341,-.793483,.558488,.051177],[-.148424,.097331,.731771,.11616,-.513769,.846661,-.075592],[.047158,.038976,.855067,-.205466,-.803804,.523327,-.194452],[-.047238,.062522,.859641,.22845,-.455876,.821965,.253694],[.002757,.049891,.919479,-.079479,.028345,.00531,.996419],[.087365,.024628,.318596,.049744,-.183559,-.97867,-.077693],[-.122165,.002022,.327374,-.033595,-.17259,.972783,.150921],[-.011854,.052342,.555822,-.129043,-.561858,.801834,-.157245],[-.011854,.052342,.555822,.220307,-.729386,.640036,.099066],[-.011854,.052342,.555822,-.993269,.001001,.019341,-.1142],[-.004763,.051153,.735341,-.993243,.00107,.020663,-.114197],[.002757,.049891,.919479,-.184646,-.596412,.742976,-.241217],[.002757,.049891,.919479,.212132,-.58083,.735799,.276109],[-.008347,.051754,.647582,-.993243,.00107,.020663,-.114197]]},{time:9.08333,bones:[[.140775,.066263,.719817,.237153,-.796922,.552191,.061313],[-.135802,.077573,.719174,.131133,-.520363,.840594,-.073676],[.047158,.038976,.855067,-.231738,-.800781,.514128,-.201791],[-.047238,.062522,.859641,.215838,-.481209,.830458,.179416],[.002757,.049891,.919479,-.087594,.027944,.005097,.995751],[.087365,.024628,.318596,.049744,-.183559,-.97867,-.077693],[-.122165,.002022,.327374,-.033595,-.17259,.972783,.150921],[-.011854,.052342,.555822,-.129043,-.561858,.801834,-.157245],[-.011854,.052342,.555822,.220307,-.729386,.640036,.099066],[-.011854,.052342,.555822,-.993269,.001001,.019341,-.1142],[-.004763,.051153,.735341,-.993243,.00107,.020663,-.114197],[.002757,.049891,.919479,-.184646,-.596412,.742976,-.241217],[.002757,.049891,.919479,.212132,-.58083,.735799,.276109],[-.008347,.051754,.647582,-.993243,.00107,.020663,-.114197]]},{time:9.16667,bones:[[.140793,.066284,.719834,.237148,-.796937,.552167,.061349],[-.135665,.077569,.719088,.13046,-.520211,.840713,-.074582],[.047158,.038976,.855067,-.231828,-.800771,.514095,-.201813],[-.047238,.062522,.859641,.215482,-.481106,.830674,.179122],[.002757,.049891,.919479,-.0884,.027928,.005072,.995681],[.087365,.024628,.318596,.049744,-.183559,-.97867,-.077693],[-.122165,.002022,.327374,-.033595,-.17259,.972783,.150921],[-.011854,.052342,.555822,-.129043,-.561858,.801834,-.157245],[-.011854,.052342,.555822,.220307,-.729386,.640036,.099066],[-.011854,.052342,.555822,-.993269,.001001,.019341,-.1142],[-.004763,.051153,.735341,-.993243,.00107,.020663,-.114197],[.002757,.049891,.919479,-.184646,-.596412,.742976,-.241217],[.002757,.049891,.919479,.212132,-.58083,.735799,.276109],[-.008347,.051754,.647582,-.993243,.00107,.020663,-.114197]]},{time:10,bones:[[.127171,.03101,.719289,.196445,-.850975,.483315,.060477],[-.129997,.069293,.726359,.075068,-.389215,.918072,.004538],[.042368,-.016882,.854626,-.260365,-.835684,.45549,-.16239],[-.052024,.006569,.859729,.153338,-.358288,.878389,.276677],[-.002195,-.008064,.919247,-.096042,.028106,-.011706,.994912],[.088819,-.076056,.334057,.064083,-.209422,-.975455,.022883],[-.120072,-.017716,.320338,-.036097,-.171929,.967133,.183826],[-.015827,.006153,.555821,-.085449,-.527404,.806583,-.252918],[-.015827,.006153,.555821,.171626,-.733932,.645442,.123661],[-.015827,.006153,.555822,-.993132,.016282,.019651,-.114184],[-.009231,-726e-6,.735231,-.993077,.017605,.021247,-.114178],[-.002195,-.008064,.919247,-.195343,-.592717,.746814,-.229773],[-.002195,-.008064,.919247,.20147,-.584358,.73162,.287519],[-.012585,.002772,.647531,-.993077,.017605,.021247,-.114178]]},{time:10.0417,bones:[[.126702,.029447,.718461,.198351,-.849212,.485979,.057633],[-.129979,.069377,.726399,.0747,-.389053,.918172,.004147],[.042366,-.016905,.854624,-.255382,-.835899,.457807,-.162682],[-.052026,.006545,.859729,.153208,-.358107,.878396,.276961],[-.002198,-.008093,.919246,-.096363,.028108,-.011756,.99488],[.088818,-.076057,.334057,.064084,-.209443,-.975451,.022876],[-.120071,-.017717,.320338,-.036099,-.171948,.967129,.183826],[-.015827,.006153,.555822,-.085453,-.527383,.806596,-.252918],[-.015827,.006153,.555822,.171623,-.733948,.645425,.123662],[-.015827,.006153,.555822,-.993131,.016321,.019652,-.114184],[-.009232,-74e-5,.735231,-.993076,.017645,.021247,-.114178],[-.002198,-.008093,.919246,-.19537,-.592708,.746823,-.229746],[-.002198,-.008093,.919246,.201443,-.584367,.73161,.287546],[-.012585,.002765,.647531,-.993076,.017645,.021247,-.114178]]},{time:10.9583,bones:[[.115927,.001724,.706206,.216069,-.822724,.525718,.007744],[-.129792,.070752,.727129,.068402,-.386635,.919685,-.003833],[.042324,-.017339,.854599,-.166583,-.835566,.49681,-.165102],[-.052068,.006106,.859723,.151354,-.355195,.878323,.281917],[-.002248,-.00862,.919227,-.100048,.02814,-.012606,.994505],[.088801,-.076076,.334056,.064113,-.20981,-.975371,.022817],[-.120047,-.017738,.32033,-.03613,-.172275,.967064,.183857],[-.015827,.006153,.555821,-.085519,-.527014,.806839,-.252892],[-.015827,.006153,.555821,.171569,-.734236,.645109,.123672],[-.015827,.006153,.555822,-.993119,.017023,.019684,-.114182],[-.009255,-997e-6,.735222,-.993063,.018382,.021255,-.114176],[-.002248,-.00862,.919227,-.195858,-.592536,.746986,-.229247],[-.002248,-.00862,.919227,.200955,-.584525,.731424,.288041],[-.012594,.002636,.647527,-.993063,.018382,.021255,-.114176]]},{time:11.0833,bones:[[.115683,.001206,.706024,.216134,-.822342,.526302,.006884],[-.129809,.070813,.727188,.067913,-.386596,.919732,-.00496],[.04232,-.017383,.854596,-.165003,-.835492,.497474,-.165063],[-.052072,.006062,.859723,.151316,-.355059,.878277,.282252],[-.002253,-.008673,.919225,-.100047,.02814,-.012681,.994504],[.0888,-.076079,.334057,.064115,-.209847,-.975363,.022812],[-.120044,-.01774,.320329,-.036133,-.172308,.967057,.183862],[-.015827,.006153,.555822,-.085527,-.526976,.806863,-.25289],[-.015827,.006153,.555822,.171563,-.734266,.645077,.123673],[-.015827,.006153,.555822,-.993118,.017094,.019688,-.114182],[-.009257,-.001023,.735221,-.993062,.018456,.021256,-.114176],[-.002253,-.008673,.919225,-.195907,-.592518,.747002,-.229196],[-.002253,-.008673,.919225,.200906,-.584541,.731405,.288091],[-.012595,.002623,.647526,-.993062,.018456,.021256,-.114176]]},{time:11.5833,bones:[[.122659,.006904,.710545,.235796,-.817661,.524916,.017158],[-.13,.070579,.727243,.067089,-.387491,.919373,-.01016],[.042307,-.017517,.854588,-.192357,-.830917,.491452,-.176213],[-.052085,.005927,.859721,.151847,-.355412,.878037,.28227],[-.002269,-.008836,.919219,-.100045,.028139,-.012908,.994501],[.088795,-.076085,.334056,.064124,-.209961,-.975339,.02279],[-.120037,-.017747,.320326,-.036142,-.17241,.967037,.183868],[-.015827,.006153,.555822,-.085547,-.526861,.806938,-.252883],[-.015827,.006153,.555822,.171546,-.734355,.644979,.123677],[-.015827,.006153,.555822,-.993114,.017312,.019698,-.114182],[-.009264,-.001103,.735218,-.993057,.018684,.021258,-.114175],[-.002269,-.008836,.919219,-.196058,-.592465,.747052,-.229042],[-.002269,-.008836,.919219,.200755,-.58459,.731347,.288243],[-.012598,.002583,.647525,-.993057,.018684,.021258,-.114175]]},{time:12.3333,bones:[[.13612,.017804,.721373,.273748,-.806553,.522747,.035649],[-.130515,.068712,.726687,.068823,-.391835,.917224,-.020711],[.042299,-.017609,.854583,-.246399,-.818716,.47871,-.199569],[-.052094,.005834,.85972,.154396,-.358592,.87769,.277911],[-.00228,-.008948,.919214,-.097906,.028102,-.013102,.994713],[.088791,-.076089,.334056,.06413,-.210039,-.975322,.022776],[-.120032,-.017752,.320325,-.036148,-.17248,.967023,.183877],[-.015827,.006153,.555822,-.085561,-.526783,.80699,-.252878],[-.015827,.006153,.555822,.171534,-.734417,.644912,.123679],[-.015827,.006153,.555822,-.993111,.017462,.019705,-.114182],[-.009269,-.001158,.735216,-.993055,.018839,.021259,-.114175],[-.00228,-.008948,.919214,-.196161,-.592428,.747086,-.228937],[-.00228,-.008948,.919214,.200651,-.584623,.731308,.288348],[-.012599,.002555,.647524,-.993055,.018839,.021259,-.114175]]},{time:12.5,bones:[[.136968,.018166,.722074,.276062,-.805361,.523361,.035722],[-.130635,.06808,.726464,.069552,-.393163,.916534,-.023449],[.042298,-.017617,.854582,-.249102,-.817643,.478349,-.201471],[-.052094,.005826,.85972,.155144,-.359644,.877641,.276284],[-.002281,-.008957,.919214,-.096995,.028088,-.013128,.994802],[.088791,-.076089,.334057,.06413,-.210046,-.97532,.022778],[-.120032,-.017752,.320325,-.03615,-.172486,.967022,.183877],[-.015827,.006153,.555822,-.085563,-.526776,.806994,-.252877],[-.015827,.006153,.555822,.171533,-.734422,.644906,.123679],[-.015827,.006153,.555822,-.993111,.017474,.019705,-.114182],[-.009269,-.001162,.735216,-.993054,.018853,.021259,-.114175],[-.002281,-.008957,.919214,-.19617,-.592425,.747089,-.228928],[-.002281,-.008957,.919214,.200642,-.584626,.731304,.288356],[-.0126,.002553,.647524,-.993054,.018853,.021259,-.114175]]},{time:12.8333,bones:[[.138522,.017921,.723134,.280497,-.80185,.52656,.033045],[-.129989,.054403,.720531,.089149,-.412137,.90585,-.040404],[.042297,-.017625,.854582,-.251791,-.815255,.4791,-.20597],[-.052095,.005818,.859719,.163639,-.379522,.879404,.236293],[-.002282,-.008967,.919214,-.094881,.02806,-.013164,.995006],[.088791,-.07609,.334057,.064131,-.210052,-.975319,.022775],[-.123151,-.028953,.323146,-.036448,-.173261,.969192,.171229],[-.015827,.006153,.555822,-.085563,-.526769,.806998,-.252877],[-.015827,.006153,.555822,.192478,-.73415,.640976,.11457],[-.015827,.006153,.555822,-.993111,.017487,.019706,-.114181],[-.00927,-.001167,.735215,-.993054,.018865,.02126,-.114175],[-.002282,-.008967,.919214,-.196178,-.592422,.747092,-.228919],[-.002282,-.008967,.919214,.200634,-.584629,.731301,.288365],[-.0126,.002551,.647523,-.993054,.018865,.02126,-.114175]]},{time:13.3333,bones:[[.140314,.01544,.723813,.285926,-.794531,.535195,.023107],[-.111551,.006089,.703944,.146009,-.434014,.888935,.010375],[.042297,-.017626,.854582,-.24945,-.811463,.483393,-.21362],[-.052095,.005816,.859719,.162374,-.433445,.882754,.080654],[-.002282,-.008969,.919214,-.091298,.028026,-.013186,.995342],[.08879,-.076089,.334056,.064131,-.210055,-.975318,.022777],[-.127139,-.048281,.328807,-.033056,-.175298,.973456,.143389],[-.015827,.006153,.555821,-.085563,-.526768,.807,-.252875],[-.015827,.006153,.555821,.227422,-.732922,.633802,.096949],[-.015827,.006153,.555822,-.993111,.01749,.019706,-.114181],[-.00927,-.001168,.735215,-.993054,.018868,.02126,-.114175],[-.002282,-.008969,.919214,-.19618,-.592421,.747093,-.228917],[-.002282,-.008969,.919214,.200632,-.584629,.7313,.288367],[-.0126,.00255,.647523,-.993054,.018868,.02126,-.114175]]},{time:14.4583,bones:[[.141476,.01029,.723444,.289763,-.784091,.548828,.005139],[-.104806,-.002112,.70175,.154338,-.428838,.889032,.043592],[.0423,-.017316,.854606,-.23857,-.807023,.491968,-.223084],[-.052093,.006131,.85972,.154613,-.438994,.883739,.048832],[-.002279,-.008591,.919229,-.083576,.028011,-.012553,.996029],[.088802,-.076076,.334057,.064112,-.209806,-.975372,.02282],[-.127161,-.048261,.328813,-.033048,-.175042,.973507,.14336],[-.015827,.006153,.555822,-.085519,-.527017,.806836,-.252892],[-.015827,.006153,.555822,.227455,-.7327,.63405,.096929],[-.015827,.006153,.555822,-.99312,.01699,.019641,-.114183],[-.009269,-983e-6,.735223,-.993065,.018346,.021208,-.114176],[-.002279,-.008591,.919229,-.195865,-.592534,.746968,-.229302],[-.002279,-.008591,.919229,.200948,-.584529,.731444,.287986],[-.012601,.002643,.647527,-.993065,.018346,.021208,-.114176]]},{time:15.8333,bones:[[.131065,.009711,.715965,.264355,-.803789,.532665,.017553],[-.111207,.006076,.703849,.146809,-.434252,.888682,.010844],[.042368,-.016882,.854626,-.214037,-.821643,.490622,-.195911],[-.052024,.006569,.859729,.162576,-.434111,.882603,.078289],[-.002195,-.008064,.919247,-.079232,.028417,-.011239,.996388],[.088819,-.076056,.334057,.064083,-.209422,-.975455,.022883],[-.127187,-.048236,.32882,-.033035,-.174726,.97357,.143323],[-.015827,.006153,.555821,-.085449,-.527404,.806583,-.252918],[-.015827,.006153,.555821,.227495,-.732426,.634356,.096906],[-.015827,.006153,.555822,-.993132,.016282,.019651,-.114184],[-.009231,-726e-6,.735231,-.993077,.017605,.021247,-.114178],[-.002195,-.008064,.919247,-.195343,-.592717,.746814,-.229773],[-.002195,-.008064,.919247,.20147,-.584358,.73162,.287519],[-.012585,.002772,.647531,-.993077,.017605,.021247,-.114178]]},{time:15.9583,bones:[[.129485,.010205,.714654,.25039,-.811701,.527352,.018608],[-.120585,.018487,.708456,.132022,-.440664,.886957,-.041131],[.043309,-.01724,.854732,-.211006,-.825584,.488329,-.188206],[-.051386,.005022,.859556,.173561,-.423593,.87959,.129488],[-.001576,-.009084,.919218,-.075539,.030103,-.01136,.996624],[.090793,-.077129,.334355,.060596,-.207827,-.97604,.021966],[-.125867,-.048352,.328802,-.031201,-.176206,.973288,.143833],[-.014212,.005556,.555773,-.084982,-.529047,.80509,-.254396],[-.014212,.005556,.555773,.226905,-.734064,.632413,.09858],[-.014212,.005556,.555773,-.99384,.017146,.018386,-.107933],[-.008091,-.001536,.735191,-.99379,.018456,.019791,-.107928],[-.001576,-.009084,.919218,-.198494,-.596829,.742955,-.22894],[-.001576,-.009084,.919218,.201573,-.589555,.728062,.285865],[-.011196,.002061,.647486,-.99379,.018456,.019791,-.107928]]},{time:16.6667,bones:[[.117746,.009346,.705023,.062267,-.878695,.473287,-.004127],[-.120355,.02144,.716922,.042368,-.430702,.858816,-.27411],[.057802,-.02487,.856804,-.178708,-.864281,.456253,-.113642],[-.039574,-.025587,.854995,.171908,-.387277,.874106,.237495],[.007995,-.029762,.917918,.004869,-.055984,.007945,-.998388],[.124449,-.093769,.336927,.002405,-.17743,-.984104,.007268],[-.100169,-.048336,.327966,.005774,-.199714,.96806,.151461],[.016466,-.005799,.554848,-.072854,-.561188,.778697,-.270908],[.016466,-.005799,.554848,.210998,-.75969,.601246,.129825],[.016466,-.005799,.554848,-.999396,.030765,-.011278,.011602],[.012375,-.017374,.734091,-.999296,.033491,-.012278,.0116],[.007995,-.029762,.917918,-.258882,-.669289,.662491,-.214797],[.007995,-.029762,.917918,.199703,-.68424,.655825,.248652],[.014462,-.01147,.64648,-.999296,.033491,-.012278,.0116]]}],cr={length:J_,bones:j_,frames:Q_},su=.07,ru=.168,po=[11,17],ou=[17,21],tx=new kt(11053224).multiplyScalar(.5);function S0(n,t){const e=[];for(let i=0;i<=n;i++){const r=[];for(let o=0;o<=t;o++){const c=Math.sin(Math.PI*i/n);r.push([c*Math.cos(2*Math.PI*o/t),c*Math.sin(2*Math.PI*o/t),-Math.cos(Math.PI*i/n)])}e.push(r)}return e}function wo(n,t,e,i){for(const r of[0,1,2,0,2,3])n.position.push(...t[r]),n.normal.push(...e[r]),n.bone.push(i)}const Ni=(n,t,e)=>[n[0]*t+e[0],n[1]*t+e[1],n[2]*t+e[2]];function ex(n,t,e,i,r,o){const c=S0(e,i);for(let l=0;l<c.length-1;l++)for(let u=0;u<c[l].length-1;u++){const f=[c[l][u],c[l+1][u],c[l+1][u+1],c[l][u+1]];wo(n,f.map(p=>Ni(p,r,o)),f,t)}}function au(n,t,e,i,r,o,c,l){const u=S0(e,i),f=[l[0],l[1],l[2]+r],p=Math.ceil(u.length/2);for(let v=0;v<p-1;v++)for(let M=0;M<u[v].length-1;M++){const S=[u[v][M],u[v+1][M],u[v+1][M+1],u[v][M+1]];wo(n,S.map(_=>Ni(_,o,l)),S,t)}const m=u[p-1],g=u[p];for(let v=0;v<m.length-1;v++)wo(n,[Ni(m[v],o,l),Ni(g[v],c,f),Ni(g[v+1],c,f),Ni(m[v+1],o,l)],[m[v],g[v],g[v+1],m[v+1]],t);for(let v=p;v<u.length-1;v++)for(let M=0;M<u[v].length-1;M++){const S=[u[v][M],u[v+1][M],u[v+1][M+1],u[v][M+1]];wo(n,S.map(_=>Ni(_,c,f)),S,t)}}let za=null;function nx(){if(za)return za;const n={position:[],normal:[],bone:[]};cr.bones.forEach((e,i)=>{const r=su/2;e.name==="head"?ex(n,i,ou[0],ou[1],ru/2,[0,0,ru/2]):/^(arm|leg)_upper\./.test(e.name)?au(n,i,po[0],po[1],e.length-su/2/2,r,r,[0,0,0]):au(n,i,po[0],po[1],e.length,r,r,[0,0,0])});const t=new Be;return t.setAttribute("position",new se(n.position,3)),t.setAttribute("normal",new se(n.normal,3)),t.setAttribute("boneIndex",new se(n.bone,1)),za=t}const Ha=new qn,lu=new qn,cu=new U,ix=new U,sx=new U(1,1,1),hu=(n,t)=>n.set(-t[4],-t[5],-t[6],t[3]);function uu(n,t){const e=cr.frames,i=n%cr.length;let r=e.findIndex(f=>i<=f.time);r<0&&(r=e.length-1),r<1&&(r=1);const o=e[r-1],c=e[r],l=c.time-o.time,u=l>0?(i-o.time)/l:0;for(let f=0;f<cr.bones.length;f++){const p=o.bones[f],m=c.bones[f];cu.set(p[0],p[1],p[2]).lerp(ix.set(m[0],m[1],m[2]),u),hu(Ha,p),hu(lu,m),Ha.slerp(lu,u),t[f].compose(cu,Ha,sx)}}const M0=cr.bones.length,E0=`
  attribute float boneIndex;
  uniform mat4 boneTransformList[${M0}];
  mat4 boneOf() { return boneTransformList[int(boneIndex + 0.5)]; }`;function rx(n){const t=Yn.degToRad(n);return new U(Math.cos(t),-Math.cos(t),-Math.sin(t)).normalize()}function ox(n,t,e,i){return new Ye({uniforms:{boneTransformList:{value:n},color:{value:new oe(t.r,t.g,t.b,1)},diffuseColor:{value:e.diffuse},ambientColor:{value:e.ambient},lightDir:{value:rx(e.lightAngle)},depthScale:{value:i}},vertexShader:E0+`
      uniform float depthScale;
      varying vec3 vNormal;
      void main() {
        mat4 bone = boneOf();
        vNormal = (modelMatrix * bone * vec4(normal, 0.0)).xyz;
        vec4 p = bone * vec4(position, 1.0);
        float viewZ = (modelViewMatrix * p).z;
        gl_Position = projectionMatrix * modelViewMatrix * p;
        gl_Position.z += 0.22 * depthScale / viewZ;   // RunnerShader: pulled towards the camera
      }`,fragmentShader:`
      uniform vec4 color;
      uniform vec4 diffuseColor;
      uniform vec4 ambientColor;
      uniform vec3 lightDir;
      varying vec3 vNormal;
      void main() {
        vec3 n = normalize(vNormal);
        vec4 dark = ambientColor * color;
        vec4 light = dark + mix(color, diffuseColor, 0.5) * 0.4;
        float factor = -dot(n, lightDir) / 2.0 + 0.5;
        gl_FragColor = mix(dark, light, smoothstep(0.4, 0.6, factor));
        gl_FragColor.a = color.a;
      }`,side:nn})}function ax(n){return new Ye({uniforms:{boneTransformList:{value:n},outlineFactor:{value:.03}},vertexShader:E0+`
      uniform float outlineFactor;
      void main() {
        vec4 p = boneOf() * (vec4(position, 1.0) + vec4(normal, 0.0) * outlineFactor);
        gl_Position = projectionMatrix * modelViewMatrix * p;
      }`,fragmentShader:"void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }",side:nn})}function lx(n,t,e=1,i=tx){const r=Array.from({length:M0},()=>new Te);uu(0,r);const o=nx(),c=new Re(o,ox(r,i,t,e)),l=new Re(o,ax(r));for(const f of[c,l])f.frustumCulled=!1,f.raycast=()=>{};c.onBeforeRender=l.onBeforeRender=()=>uu(performance.now()/1e3,r);const u=new Dn;return u.add(l,c),u.position.copy(n).add(new U(0,0,.15)),u.rotation.z=Yn.degToRad(90),u}const cx="/assets/finish-flag-DgbyiXwU.png",w0=new d0().load(cx);w0.colorSpace=Hn;function hx(){const n=[0,1,2,0,2,3],t=new Be;t.setAttribute("position",new se(n.flatMap(()=>[0,0,0]),3)),t.setAttribute("corner",new se(n,1));const e=new Re(t,new Ye({uniforms:{start:{value:new U(0,0,0)},end:{value:new U(0,0,1.4)}},vertexShader:`
      attribute float corner;
      uniform vec3 start;
      uniform vec3 end;
      void main() {
        // Camera direction in the prop's space.
        vec3 cameraDirection = (inverse(modelViewMatrix) * vec4(0.0, 0.0, -1.0, 0.0)).xyz;
        vec3 perpendicular = normalize(cross(end - start, cameraDirection));
        vec3 displacement = perpendicular * (0.09 * 0.35);
        int i = int(corner + 0.5);
        vec3 p = i == 0 ? start + displacement : i == 1 ? start - displacement : i == 2 ? end - displacement : end + displacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,fragmentShader:"void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }",side:xn}));return e.frustumCulled=!1,e}function ux(n,t,e){const i=[],r=[],o=[],p=(M,S)=>{const _=M/10,y=S/6;i.push(_*.65,0,-.2+y*.4),r.push(_,y),o.push(_,y)};for(let M=0;M<10;M++)for(let S=0;S<6;S++)for(const[_,y]of[[0,0],[0,1],[1,1],[0,0],[1,1],[1,0]])p(M+_,S+y);const m=new Be;m.setAttribute("position",new se(i,3)),m.setAttribute("uv",new se(r,2)),m.setAttribute("variance",new se(o,2));const g=new Ye({uniforms:{map:{value:w0},time:{value:0},windSpeed:{value:e},diffuseColor:{value:n},ambientColor:{value:t}},vertexShader:`
      attribute vec2 variance;
      uniform float time;
      uniform float windSpeed;
      varying vec2 vUv;
      vec3 flagWave(float t, vec2 variance) {
        t = t * windSpeed / 10.0;
        float sinOff = (variance.x + variance.y) * 5.0;
        return vec3(0.0,
          sin(t * 6.0 + sinOff) * variance.x * 0.03,
          sin(t * 3.0 + sinOff) * variance.x * 0.01 - variance.x * variance.y * 0.1);
      }
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position + flagWave(time, variance), 1.0);
      }`,fragmentShader:`
      uniform sampler2D map;
      uniform vec4 diffuseColor;
      uniform vec4 ambientColor;
      varying vec2 vUv;
      void main() {
        gl_FragColor = (0.8 * diffuseColor + ambientColor) * texture2D(map, vUv);
      }`,side:xn,transparent:!0}),v=new Re(m,g);return v.onBeforeRender=()=>{g.uniforms.time.value=performance.now()/1e3},v.position.set(.01,.01,1.18),v.rotation.z=Yn.degToRad(135),v.frustumCulled=!1,v}function fx(n,t,e,i){const r=new Dn;return r.add(hx(),ux(t,e,i)),r.position.copy(n).add(new U(fr,fr,0)),r.traverse(o=>{o.raycast=()=>{}}),r}const dx=`# Blender v2.83.5 OBJ File: 'mushi_board.blend'
# www.blender.org
mtllib mushi_board.mtl
v 0.043773 0.000000 -0.026394
v 0.043773 0.000000 0.968394
v 0.021878 -0.037924 -0.026394
v 0.021878 -0.037924 0.968394
v -0.021913 -0.037924 -0.026394
v -0.021913 -0.037924 0.968394
v -0.043809 0.000000 -0.026394
v -0.043809 0.000000 0.968394
v -0.021913 0.037924 -0.026394
v -0.021913 0.037924 0.968394
v 0.021878 0.037924 -0.026394
v 0.021878 0.037924 0.968394
vt 1.000000 0.500000
vt 1.000000 1.000000
vt 0.833333 1.000000
vt 0.833333 0.500000
vt 0.666667 1.000000
vt 0.666667 0.500000
vt 0.500000 1.000000
vt 0.500000 0.500000
vt 0.333333 1.000000
vt 0.333333 0.500000
vt 0.457846 0.370000
vt 0.250000 0.490000
vt 0.042154 0.370000
vt 0.042154 0.130000
vt 0.250000 0.010000
vt 0.457846 0.130000
vt 0.166667 1.000000
vt 0.166667 0.500000
vt -0.000000 1.000000
vt -0.000000 0.500000
vt 0.750000 0.490000
vt 0.957846 0.370000
vt 0.957846 0.130000
vt 0.750000 0.010000
vt 0.542154 0.130000
vt 0.542154 0.370000
vn 0.7924 0.0000 -0.6100
vn 0.7924 0.0000 0.6100
vn 0.3962 -0.6862 0.6100
vn 0.3962 -0.6862 -0.6100
vn -0.3962 -0.6862 0.6100
vn -0.3962 -0.6862 -0.6100
vn -0.7924 0.0000 0.6100
vn -0.7924 0.0000 -0.6100
vn -0.3962 0.6862 0.6100
vn -0.3962 0.6862 -0.6100
vn 0.3962 0.6862 0.6100
vn 0.3962 0.6862 -0.6100
usemtl wood
s 1
f 1/1/1 2/2/2 4/3/3 3/4/4
f 3/4/4 4/3/3 6/5/5 5/6/6
f 5/6/6 6/5/5 8/7/7 7/8/8
f 7/8/8 8/7/7 10/9/9 9/10/10
f 4/11/3 2/12/2 12/13/11 10/14/9 8/15/7 6/16/5
f 9/10/10 10/9/9 12/17/11 11/18/12
f 11/18/12 12/17/11 2/19/2 1/20/1
f 1/21/1 3/22/4 5/23/6 7/24/8 9/25/10 11/26/12
v -0.053296 -0.079805 0.648560
v -0.053296 -0.086490 0.674387
v -0.053296 -0.068494 0.637766
v -0.053296 -0.033283 0.622732
v -0.053296 0.000771 0.618492
v -0.053296 0.056544 0.631984
v -0.053296 0.033669 0.623503
v -0.053296 0.101909 0.717571
v -0.053296 0.079551 0.716283
v -0.053296 0.077107 0.645091
v -0.053296 0.085164 0.676151
v -0.053296 0.120798 0.723871
v -0.053296 0.085596 0.689106
v -0.053296 0.129415 0.761879
v -0.053296 0.128122 0.735953
v -0.053296 -0.116943 0.806243
v -0.053296 -0.131592 0.757925
v -0.053296 -0.129279 0.731195
v -0.053296 -0.117329 0.719884
v -0.053296 -0.081479 0.716283
v -0.053296 -0.090422 0.839041
v -0.053296 -0.083197 0.846442
v -0.053296 -0.099211 0.830429
v -0.053296 -0.063020 0.858007
v -0.053296 -0.085334 0.696877
v -0.053296 -0.033129 0.869571
v -0.053296 0.000000 0.874737
v -0.053296 0.034054 0.868569
v -0.053296 0.068109 0.853535
v -0.053296 0.095269 0.834020
v -0.053296 0.109210 0.816856
v -0.053296 0.120689 0.793074
v -0.053296 0.121232 0.791135
v -0.053296 -0.085519 0.693270
v -0.052215 0.287159 0.911860
v -0.052215 0.287159 0.571110
v 0.004522 0.287159 0.911860
v 0.004522 0.287159 0.571110
v -0.052215 -0.287159 0.911860
v -0.052215 -0.287159 0.571110
v 0.004522 -0.287159 0.911860
v 0.004522 -0.287159 0.571110
v 0.005603 -0.267068 0.918350
v -0.053295 -0.267068 0.918350
v 0.005603 -0.298098 0.891081
v -0.053295 -0.298098 0.891081
v 0.005603 -0.275532 0.564620
v -0.053295 -0.298098 0.592646
v -0.053295 -0.275532 0.564620
v 0.005603 -0.298098 0.592646
v -0.053295 0.298098 0.597725
v -0.053295 0.267324 0.564620
v 0.005603 0.267324 0.564620
v 0.005603 0.298098 0.597725
v -0.053295 0.298098 0.874855
v 0.005603 0.258317 0.918350
v 0.005603 0.298098 0.874855
v -0.053295 0.258317 0.918350
v -0.053296 0.000121 0.646562
v -0.053296 -0.026067 0.649814
v -0.053296 -0.052971 0.661106
v -0.053296 0.026229 0.650663
v -0.053296 0.043522 0.657060
v -0.053296 -0.055336 0.662478
v -0.053296 0.053652 0.661348
v -0.053296 -0.058218 0.676673
v -0.053296 0.056523 0.679650
v -0.053296 -0.057134 0.692734
v -0.053296 0.056415 0.732970
v -0.053296 0.056783 0.685845
v -0.053296 -0.095615 0.737003
v -0.053296 -0.058689 0.732742
v -0.053296 0.084021 0.738093
v -0.053296 -0.103710 0.743054
v -0.053296 -0.103328 0.754343
v -0.053296 0.100657 0.758084
v -0.053296 0.100442 0.743748
v -0.053296 -0.091551 0.792817
v -0.053296 0.093604 0.782335
v -0.053296 -0.077799 0.811042
v -0.053296 0.084745 0.800874
v -0.053296 0.075340 0.812547
v -0.053296 -0.070383 0.818178
v -0.053296 -0.065897 0.823165
v -0.053296 -0.050940 0.831515
v -0.053296 -0.025963 0.841268
v -0.053296 -0.000610 0.845457
v -0.053296 0.025391 0.840547
v -0.053296 0.053616 0.828035
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.000000 0.000000
vt 0.405740 0.000000
vt 0.375000 0.000000
vt 0.375000 0.250000
vt 0.375000 0.266681
vt 0.405740 0.250000
vt 0.375000 0.500000
vt 0.375000 0.750000
vt 0.394273 0.750000
vt 0.375000 0.763012
vt 0.125000 0.500000
vt 0.125000 0.750000
vt 0.141681 0.750000
vt 0.625000 0.500000
vt 0.625000 0.750000
vt 0.634463 0.750000
vt 0.361988 0.750000
vt 0.375000 0.486988
vt 0.394273 0.500000
vt 0.605193 0.750000
vt 0.375000 0.983319
vt 0.410183 0.889280
vt 0.405824 0.875000
vt 0.605193 0.500000
vt 0.625000 0.490537
vt 0.634463 0.500000
vt 0.862096 0.750000
vt 0.625000 0.759463
vt 0.601603 0.000000
vt 0.601603 0.250000
vt 0.625000 0.250000
vt 0.625000 0.262904
vt 0.875000 0.750000
vt 0.875000 0.500000
vt 0.601603 1.000000
vt 0.625000 1.000000
vt 0.625000 0.987096
vt 0.141681 0.500000
vt 0.375000 1.000000
vt 0.405740 1.000000
vt 0.583384 0.889118
vt 0.586926 0.875323
vt 0.361988 0.500000
vt 0.437139 0.833398
vt 0.409474 0.861108
vt 0.454232 0.825963
vt 0.488381 0.819820
vt 0.431052 0.837084
vt 0.425821 0.840113
vt 0.434601 0.914948
vt 0.464910 0.925835
vt 0.485587 0.929267
vt 0.463539 0.925608
vt 0.417648 0.848574
vt 0.446731 0.920795
vt 0.420808 0.903560
vt 0.862096 0.500000
vt 0.625000 0.000000
vt 0.503910 0.928725
vt 0.568127 0.907333
vt 0.577390 0.898711
vt 0.565675 0.841536
vt 0.507272 0.820790
vt 0.515266 0.825801
vt 0.531527 0.839218
vt 0.517811 0.840834
vt 0.547422 0.838733
vt 0.534076 0.839140
vt 0.512449 0.925654
vt 0.516901 0.917733
vt 0.537019 0.910892
vt 0.517811 0.908358
vt 0.546175 0.910711
vt 0.573304 0.846279
vt 0.583929 0.861043
vn -1.0000 0.0000 0.0000
vn -0.6767 0.7283 0.1083
vn -0.5820 0.5569 0.5925
vn 0.5820 0.5569 0.5925
vn 0.6838 0.0856 0.7246
vn 0.6767 0.7283 0.1083
vn 0.5787 -0.5258 0.6233
vn -0.5787 -0.5258 0.6233
vn -0.6576 -0.7304 0.1845
vn -0.6744 -0.1196 0.7286
vn -0.6838 0.0856 0.7246
vn 0.5608 -0.6025 -0.5679
vn -0.5608 -0.6025 -0.5679
vn -0.6559 -0.1971 -0.7287
vn 0.6744 -0.1196 0.7286
vn 0.6576 -0.7304 0.1845
vn -0.6586 -0.7313 -0.1773
vn 0.6586 -0.7313 -0.1773
vn 0.6559 -0.1971 -0.7287
vn -0.6742 0.1222 -0.7283
vn -0.6665 0.7308 -0.1475
vn 0.6665 0.7308 -0.1475
vn 0.5799 0.5566 -0.5948
vn 0.6742 0.1222 -0.7283
vn -0.5799 0.5566 -0.5948
usemtl mushitop
s off
f 81/27/13 80/28/13 84/29/13
f 73/30/13 78/31/13 72/32/13
f 72/32/13 78/31/13 71/33/13
f 71/33/13 78/31/13 74/34/13
f 74/34/13 79/35/13 75/36/13
f 75/36/13 79/35/13 77/37/13
f 79/35/13 80/28/13 82/38/13
f 82/38/13 80/28/13 81/27/13
f 81/27/13 88/39/13 85/40/13
f 85/40/13 88/39/13 89/41/13
f 88/39/13 81/27/13 91/42/13
f 91/42/13 81/27/13 93/43/13
f 93/43/13 92/44/13 94/45/13
f 81/27/13 90/46/13 93/43/13
f 94/45/13 95/47/13 101/48/13
f 101/48/13 97/49/13 100/50/13
f 97/49/13 98/51/13 100/50/13
f 100/50/13 98/51/13 99/52/13
f 97/49/13 95/47/13 96/53/13
f 95/47/13 94/45/13 92/44/13
f 92/44/13 93/43/13 90/46/13
f 97/49/13 101/48/13 95/47/13
f 90/46/13 84/29/13 87/54/13
f 87/54/13 83/55/13 86/56/13
f 87/54/13 84/29/13 83/55/13
f 81/27/13 84/29/13 90/46/13
f 74/34/13 78/31/13 79/35/13
f 79/35/13 78/31/13 80/28/13
f 78/31/13 73/30/13 76/57/13
usemtl board
s 1
f 67/58/14 47/59/15 49/60/16
f 49/60/16 68/61/17 69/62/18
f 53/63/19 51/64/20 58/65/21
f 51/64/20 56/66/22 58/65/21
f 49/67/16 47/68/15 70/69/23
f 54/70/24 52/71/25 61/72/26
f 56/73/22 51/64/20 53/63/19
f 55/74/27 53/63/19 57/75/28
f 57/75/28 58/65/21 60/76/29
f 70/77/23 40/78/13 39/79/13
f 62/80/30 54/70/24 59/81/31
f 59/82/31 61/72/26 64/83/32
f 60/76/29 52/71/25 54/70/24
f 61/84/26 52/71/25 60/76/29
f 63/85/33 66/86/34 50/87/35
f 65/88/36 50/87/35 66/86/34
f 64/83/32 48/89/37 50/90/35
f 63/91/33 48/92/37 64/93/32
f 67/58/14 69/62/18 66/86/34
f 68/94/17 70/69/23 56/73/22
f 57/75/28 69/62/18 55/74/27
f 70/77/23 47/95/15 67/96/14
f 19/97/13 64/93/32 17/98/13
f 67/58/14 49/60/16 69/62/18
f 53/63/19 58/65/21 57/75/28
f 49/67/16 70/69/23 68/94/17
f 54/70/24 61/72/26 59/82/31
f 56/73/22 53/63/19 55/99/27
f 57/75/28 60/76/29 62/80/30
f 70/77/23 39/79/13 56/66/22
f 56/66/22 35/100/13 58/65/21
f 39/79/13 38/101/13 56/66/22
f 58/65/21 28/102/13 29/103/13
f 35/100/13 56/66/22 33/104/13
f 33/104/13 56/66/22 34/105/13
f 58/65/21 35/100/13 28/102/13
f 67/96/14 42/106/13 70/77/23
f 45/107/13 67/96/14 26/108/13
f 44/109/13 67/96/14 45/107/13
f 34/105/13 56/66/22 36/110/13
f 43/111/13 67/96/14 44/109/13
f 42/106/13 67/96/14 43/111/13
f 36/110/13 56/66/22 38/101/13
f 41/112/13 70/77/23 42/106/13
f 40/78/13 70/77/23 41/112/13
f 59/82/31 64/83/32 65/113/36
f 60/76/29 54/70/24 62/80/30
f 63/85/33 50/87/35 48/114/37
f 64/83/32 50/90/35 65/113/36
f 67/58/14 66/86/34 63/85/33
f 68/94/17 56/73/22 55/99/27
f 55/74/27 69/62/18 68/61/17
f 69/62/18 62/80/30 66/86/34
f 66/86/34 62/80/30 65/88/36
f 65/88/36 62/80/30 59/81/31
f 62/80/30 69/62/18 57/75/28
f 63/91/33 27/115/13 67/96/14
f 67/96/14 27/115/13 26/108/13
f 61/84/26 17/98/13 64/93/32
f 64/93/32 22/116/13 63/91/33
f 19/97/13 18/117/13 64/93/32
f 58/65/21 29/103/13 60/76/29
f 60/76/29 13/118/13 61/84/26
f 30/119/13 31/120/13 60/76/29
f 30/119/13 60/76/29 29/103/13
f 37/121/13 31/120/13 32/122/13
f 31/120/13 14/123/13 60/76/29
f 46/124/13 31/120/13 37/121/13
f 14/123/13 13/118/13 60/76/29
f 63/91/33 24/125/13 27/115/13
f 20/126/13 25/127/13 21/128/13
f 63/91/33 23/129/13 24/125/13
f 24/125/13 25/127/13 20/126/13
f 46/124/13 14/123/13 31/120/13
f 24/125/13 23/129/13 25/127/13
f 15/130/13 61/84/26 13/118/13
f 63/91/33 22/116/13 23/129/13
f 22/116/13 64/93/32 18/117/13
f 16/131/13 61/84/26 15/130/13
f 17/98/13 61/84/26 16/131/13
usemtl outline
f 38/101/13 99/52/13 98/51/13
f 72/32/13 15/130/13 73/30/13
f 24/125/13 89/41/13 27/115/13
f 27/115/13 89/41/13 26/108/13
f 26/108/13 91/42/13 45/107/13
f 45/107/13 91/42/13 44/109/13
f 44/109/13 93/43/13 43/111/13
f 43/111/13 94/45/13 42/106/13
f 93/43/13 94/45/13 43/111/13
f 42/106/13 101/48/13 41/112/13
f 41/112/13 100/50/13 40/78/13
f 40/78/13 99/52/13 39/79/13
f 39/79/13 99/52/13 38/101/13
f 38/101/13 98/51/13 36/110/13
f 36/110/13 97/49/13 34/105/13
f 33/104/13 96/53/13 35/100/13
f 35/100/13 92/44/13 28/102/13
f 36/110/13 98/51/13 97/49/13
f 34/105/13 97/49/13 33/104/13
f 41/112/13 101/48/13 100/50/13
f 100/50/13 99/52/13 40/78/13
f 91/42/13 93/43/13 44/109/13
f 88/39/13 26/108/13 89/41/13
f 35/100/13 95/47/13 92/44/13
f 96/53/13 95/47/13 35/100/13
f 28/102/13 90/46/13 29/103/13
f 29/103/13 86/56/13 30/119/13
f 90/46/13 87/54/13 29/103/13
f 86/56/13 29/103/13 87/54/13
f 88/39/13 91/42/13 26/108/13
f 28/102/13 92/44/13 90/46/13
f 33/104/13 97/49/13 96/53/13
f 101/48/13 42/106/13 94/45/13
f 86/56/13 83/55/13 30/119/13
f 30/119/13 83/55/13 31/120/13
f 32/122/13 80/28/13 37/121/13
f 37/121/13 80/28/13 46/124/13
f 31/120/13 83/55/13 32/122/13
f 80/28/13 32/122/13 84/29/13
f 84/29/13 32/122/13 83/55/13
f 46/124/13 78/31/13 14/123/13
f 14/123/13 76/57/13 13/118/13
f 13/118/13 73/30/13 15/130/13
f 76/57/13 73/30/13 13/118/13
f 15/130/13 72/32/13 16/131/13
f 16/131/13 71/33/13 17/98/13
f 17/98/13 71/33/13 19/97/13
f 19/97/13 74/34/13 18/117/13
f 71/33/13 74/34/13 19/97/13
f 18/117/13 75/36/13 22/116/13
f 22/116/13 77/37/13 23/129/13
f 23/129/13 82/38/13 25/127/13
f 25/127/13 82/38/13 21/128/13
f 23/129/13 77/37/13 79/35/13
f 21/128/13 85/40/13 20/126/13
f 20/126/13 85/40/13 24/125/13
f 24/125/13 85/40/13 89/41/13
f 85/40/13 21/128/13 81/27/13
f 81/27/13 21/128/13 82/38/13
f 82/38/13 23/129/13 79/35/13
f 22/116/13 75/36/13 77/37/13
f 16/131/13 72/32/13 71/33/13
f 46/124/13 80/28/13 78/31/13
f 78/31/13 76/57/13 14/123/13
f 18/117/13 74/34/13 75/36/13
`,px=`# Blender v2.83.5 OBJ File: 'mushi_board.blend'
# www.blender.org
mtllib mushi_board_outline.mtl
v -0.079921 0.311031 0.934772
v -0.079921 0.311031 0.548198
v 0.032228 0.311031 0.934772
v 0.032228 0.311031 0.548198
v -0.079921 -0.311031 0.934772
v -0.079921 -0.311031 0.548198
v 0.032228 -0.311031 0.934772
v 0.032228 -0.311031 0.548198
v 0.034364 -0.289269 0.942135
v -0.082057 -0.289269 0.942135
v 0.034364 -0.322880 0.911199
v -0.082057 -0.322880 0.911199
v 0.034364 -0.298437 0.540835
v -0.082057 -0.322880 0.572630
v -0.082057 -0.298437 0.540835
v 0.034364 -0.322880 0.572630
v -0.082057 0.322880 0.578392
v -0.082057 0.289547 0.540835
v 0.034364 0.289547 0.540835
v 0.034364 0.322880 0.578392
v -0.082057 0.322880 0.892791
v 0.034364 0.279791 0.942135
v 0.034364 0.322880 0.892791
v -0.082057 0.279791 0.942135
vt 0.375000 0.000000
vt 0.375000 0.250000
vt 0.405740 0.250000
vt 0.405740 0.000000
vt 0.375000 0.266681
vt 0.375000 0.500000
vt 0.375000 0.750000
vt 0.394273 0.750000
vt 0.394273 0.500000
vt 0.375000 0.763012
vt 0.125000 0.500000
vt 0.125000 0.750000
vt 0.141681 0.750000
vt 0.141681 0.500000
vt 0.625000 0.500000
vt 0.625000 0.750000
vt 0.634463 0.750000
vt 0.634463 0.500000
vt 0.361988 0.750000
vt 0.361988 0.500000
vt 0.375000 0.486988
vt 0.605193 0.750000
vt 0.605193 0.500000
vt 0.375000 0.983319
vt 0.405740 1.000000
vt 0.601603 1.000000
vt 0.625000 0.987096
vt 0.625000 0.759463
vt 0.625000 0.490537
vt 0.862096 0.750000
vt 0.862096 0.500000
vt 0.601603 0.250000
vt 0.625000 0.250000
vt 0.625000 0.000000
vt 0.601603 0.000000
vt 0.625000 0.262904
vt 0.875000 0.750000
vt 0.875000 0.500000
vt 0.625000 1.000000
vt 0.375000 1.000000
vn -0.5605 0.5750 0.5959
vn 0.5605 0.5750 0.5959
vn 0.6782 0.7272 0.1057
vn -0.6782 0.7272 0.1057
vn 0.6834 0.0936 0.7240
vn 0.5369 -0.5553 0.6350
vn -0.5369 -0.5553 0.6350
vn -0.6598 -0.7295 0.1800
vn 0.6598 -0.7295 0.1800
vn -0.6735 -0.1288 0.7278
vn -0.6834 0.0936 0.7240
vn 0.4935 -0.6474 -0.5808
vn -0.4935 -0.6474 -0.5808
vn -0.6550 -0.2102 -0.7258
vn 0.6550 -0.2102 -0.7258
vn 0.6735 -0.1288 0.7278
vn -0.6605 -0.7309 -0.1717
vn 0.6605 -0.7309 -0.1717
vn -0.6683 0.7299 -0.1435
vn -0.6736 0.1324 -0.7271
vn 0.6736 0.1324 -0.7271
vn 0.6683 0.7299 -0.1435
vn 0.5448 0.5838 -0.6019
vn -0.5448 0.5838 -0.6019
usemtl wood
s 1
f 1/1/1 3/2/2 23/3/3 21/4/4
f 3/2/2 22/5/5 23/3/3
f 7/6/6 5/7/7 12/8/8 11/9/9
f 5/7/7 10/10/10 12/8/8
f 3/11/2 1/12/1 24/13/11 22/14/5
f 8/15/12 6/16/13 15/17/14 13/18/15
f 10/19/10 5/7/7 7/6/6 9/20/16
f 9/21/16 7/6/6 11/9/9
f 12/8/8 14/22/17 16/23/18 11/9/9
f 10/10/10 24/24/11 21/25/4 17/26/19 18/27/20 15/28/14 14/22/17 12/8/8
f 16/23/18 8/15/12 13/29/15
f 15/17/14 18/30/20 19/31/21 13/18/15
f 14/22/17 6/16/13 8/15/12 16/23/18
f 15/28/14 6/16/13 14/22/17
f 20/32/22 4/33/23 2/34/24 17/35/19
f 19/36/21 4/33/23 20/32/22
f 18/30/20 2/37/24 4/38/23 19/31/21
f 17/26/19 2/39/24 18/27/20
f 23/3/3 20/32/22 17/35/19 21/4/4
f 24/13/11 10/19/10 9/20/16 22/14/5
f 22/5/5 9/21/16 11/9/9 16/23/18 13/29/15 19/36/21 20/32/22 23/3/3
f 24/24/11 1/40/1 21/25/4
v 0.081286 0.000000 -0.044925
v 0.081286 0.000000 0.986925
v 0.040634 -0.070412 -0.044925
v 0.040634 -0.070412 0.986925
v -0.040670 -0.070412 -0.044925
v -0.040670 -0.070412 0.986925
v -0.081322 0.000000 -0.044925
v -0.081322 0.000000 0.986925
v -0.040670 0.070412 -0.044925
v -0.040670 0.070412 0.986925
v 0.040634 0.070412 -0.044925
v 0.040634 0.070412 0.986925
vt 1.000000 0.500000
vt 1.000000 1.000000
vt 0.833333 1.000000
vt 0.833333 0.500000
vt 0.666667 1.000000
vt 0.666667 0.500000
vt 0.500000 1.000000
vt 0.500000 0.500000
vt 0.333333 1.000000
vt 0.333333 0.500000
vt 0.457846 0.370000
vt 0.250000 0.490000
vt 0.042154 0.370000
vt 0.042154 0.130000
vt 0.250000 0.010000
vt 0.457846 0.130000
vt 0.166667 1.000000
vt 0.166667 0.500000
vt -0.000000 1.000000
vt -0.000000 0.500000
vt 0.750000 0.490000
vt 0.957846 0.370000
vt 0.957846 0.130000
vt 0.750000 0.010000
vt 0.542154 0.130000
vt 0.542154 0.370000
vn 0.7924 0.0000 -0.6100
vn 0.7924 0.0000 0.6100
vn 0.3962 -0.6862 0.6100
vn 0.3962 -0.6862 -0.6100
vn -0.3962 -0.6862 0.6100
vn -0.3962 -0.6862 -0.6100
vn -0.7924 0.0000 0.6100
vn -0.7924 0.0000 -0.6100
vn -0.3962 0.6862 0.6100
vn -0.3962 0.6862 -0.6100
vn 0.3962 0.6862 0.6100
vn 0.3962 0.6862 -0.6100
usemtl wood
s 1
f 25/41/25 26/42/26 28/43/27 27/44/28
f 27/44/28 28/43/27 30/45/29 29/46/30
f 29/46/30 30/45/29 32/47/31 31/48/32
f 31/48/32 32/47/31 34/49/33 33/50/34
f 28/51/27 26/52/26 36/53/35 34/54/33 32/55/31 30/56/29
f 33/50/34 34/49/33 36/57/35 35/58/36
f 35/58/36 36/57/35 26/59/26 25/60/25
f 25/61/25 27/62/28 29/63/30 31/64/32 33/65/34 35/66/36
`,mx={wood:"#B19150",board:"#dbc4a7",mushitop:"#cf883b",outline:"#503921"};function fu(n,t={}){const e=[],i=[],r=[],o=[],c=[];let l=new kt(1,1,1);for(const f of n.split(/\r?\n/)){const[p,...m]=f.trim().split(/\s+/);if(p==="v")e.push(m.map(Number));else if(p==="vn")i.push(m.map(Number));else if(p==="usemtl")l=new kt(t[m[0]]??"#ffffff");else if(p==="f"){const g=m.map(v=>v.split("/").map(M=>M?Number(M)-1:-1));for(let v=1;v+1<g.length;v++)for(const M of[g[0],g[v],g[v+1]])r.push(...e[M[0]]),o.push(...M[2]>=0?i[M[2]]:[0,0,1]),c.push(l.r,l.g,l.b,1)}}const u=new Be;return u.setAttribute("position",new se(r,3)),u.setAttribute("normal",new se(o,3)),u.setAttribute("rgba",new se(c,4)),u}let Ga=null;function gx(n,t,e){const i=Yn.degToRad(n.lightAngle);return new Ye({uniforms:{uniformColor:{value:new oe(1,1,1,1)},diffuseColor:{value:n.diffuse},ambientColor:{value:n.ambient},lightDir:{value:new U(Math.cos(i),-Math.cos(i),-Math.sin(i)).normalize()},outlineOffset:{value:t*e}},vertexShader:`
      attribute vec4 rgba;
      uniform float outlineOffset;
      varying vec3 vNormal;
      varying vec4 vColor;
      void main() {
        vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
        vColor = rgba;
        float viewZ = (modelViewMatrix * vec4(position, 1.0)).z;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position.z += outlineOffset / viewZ;
      }`,fragmentShader:`
      uniform vec4 uniformColor;
      uniform vec4 diffuseColor;
      uniform vec4 ambientColor;
      uniform vec3 lightDir;
      varying vec3 vNormal;
      varying vec4 vColor;
      void main() {
        float lightMod = 1.0 - max(lightDir.z, 0.0);
        vec3 n = normalize(vNormal);
        vec4 dark = ambientColor * uniformColor * vColor;
        vec4 light = dark + mix(uniformColor * vColor, diffuseColor, 0.5) * 0.4 * lightMod;
        float factor = -dot(n, lightDir) / 2.0 + 0.5;
        gl_FragColor = mix(dark, light, smoothstep(0.4, 0.6, factor));
        gl_FragColor.a = uniformColor.a;
      }`})}function vx(n){return new Ye({uniforms:{outlineFactor:{value:n}},vertexShader:`
      uniform float outlineFactor;
      void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position + normal * outlineFactor, 1.0); }`,fragmentShader:"void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }"})}function _x(n,t,e,i=1){Ga??(Ga={board:fu(dx,mx),outline:fu(px)});const r=new Dn;r.add(new Re(Ga.outline,vx(-.007))),r.add(new Re(Ga.board,gx(e,.3,i))),r.position.set(.2,0,0);const o=new Dn;return o.add(r),o.position.copy(n),o.rotation.z=Yn.degToRad(t==="right"?0:90),o.traverse(c=>{c.raycast=()=>{}}),o}const ws=.07,b0=.168,xs=b0*2-ws,bo=ws*10,Zl=8,xx={x:new U(-1,0,0),y:new U(0,-1,0),z:new U(0,0,1)};function $l(n){return n<=1?1:n>=300?7:1+(n-1)/299*6}function yx(n,t){return{x:n.clone().add(new U(-.9660000000000001*t,0,0)),y:n.clone().add(new U(0,-.9660000000000001*t,0)),z:n.clone().add(new U(0,0,xs+bo*t))}}const Sx=n=>.3*n*1.5;function Mx(n){const e=[[0,xs],[ws,xs],[ws,bo+xs],[2*ws,bo+xs],[0,3*ws+bo+xs]].map(([o,c])=>new Rt(o,c)),i=new _c(e,Zl),r=new qn().setFromUnitVectors(new U(0,1,0),n);return i.applyQuaternion(r),i}function Ex(n,t,e){const i=new Ye({uniforms:{color:{value:new kt("#A67D3D")},diffuseColor:{value:e.diffuse},ambientColor:{value:e.ambient},lightDir:{value:e.dir}},vertexShader:`
      varying vec3 vNormal;
      void main() { vNormal = (modelMatrix * vec4(normal, 0.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
      uniform vec3 color; uniform vec4 diffuseColor; uniform vec4 ambientColor; uniform vec3 lightDir;
      varying vec3 vNormal;
      void main() {
        vec4 lit = max(-dot(normalize(vNormal), lightDir), 0.0) * diffuseColor + ambientColor;
        gl_FragColor = vec4(lit.rgb * color, 0.85);
      }`,transparent:!0,depthTest:!1,depthWrite:!1}),r=new Dn;for(const c of Object.values(xx))r.add(new Re(Mx(c),i));r.add(new Re(new qo(b0*2,Zl,Zl),i)),r.position.copy(n),r.traverse(c=>{c.renderOrder=30,c.raycast=()=>{},c.frustumCulled=!1}),r.scale.setScalar($l(t.position.distanceTo(n)));const o=r.children[0];return o.onBeforeRender=()=>r.scale.setScalar($l(t.position.distanceTo(n))),r}const wx="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFSElEQVR4nOWb229UVRTGf3t3WluqxaoUIigmVStRomAwURQ1ER68vKCRB4l/nIkmmvRJxERNvIKJRLw9KEqJmGJSiikllJbetln2O3V3mNPpDDNnzjl8ycnMnGmm+1tn7bXW3vtbcIvDtfPHQwj2+x7oAipAN9Cjz3YZlnTNAwvAoj4vO+cCRTNACMGL7CZgEBgCtur1buAOoE/GQKRngSvAP8AkMAFcBKaAa2YU59wyeTZACMFI94vsMLALeBDYAWwB7gIGgF6Rjz0gNoKRvgSMA38AvwJjMsqMc848JD8GCCEYmc0ivVfXCLBTxHub+D/m+nPyhvPAGeC0LjPGtHPOjNY5A4QQuvREjeyzwNPAbj1xc/FWYlYe8QtwEjgho1xxzpkHZWeAsBLYbtMTfh54CXgKuDea1+2CPfULwCngU+Arecj1ZgOmayLA3Qk8DrwGHJLrm5tniVlNBTPCh8BPwOVmAqVr0OUtwL0IvA7s1xxvaypdb0iKETYdRoHPLVA2OiUqDUT4+4GXgSPAHkX8TsIptR7Sg7CUezyE8FcjmaKyQfI23w8Dbym9WTGTF/QrBg0o+I42YgS3Abc38m8AbwOPRPk7b1hSzfCOpsT5jUwHXyfgbQNe0ZPPM3k0NvPOo5qq28RhXfh1Up1F+xeANwtAPkGXxnpEwXpQXFLhU+5bnn9C0X5PzuZ8PfRozIeVro3LxoNgWJn3DwCvKtV1Oto3g36N/U8rnEIIZ9Piga9xz+r6A8BBpZeiYos4HFCGoK4BwsrC5mGVt8MdLHJaAScOZoQRcavrAZvlOvvasKDpBPrEZb+4pRsgrBQ8ZrFngO2UB9vFaVgcUz2gX2v53Rms6rJEtzg9Cdxe0wDh/6Jnr9bzZcMOpcah6uLI6zVx/5GSzP1q9ImbcazUMsAmVVBW95cVO1Uqr6lrvErFQW1gFjnv14Nxe6i6PPa6hjRPst7ZyRK90Q71ahzwWkBs7fDuThYwbveI6+rCzisoDGkalB3JQU0lNkCPTmxS6+USYUBce2IDdEfHVWVHn4zQXR0D+gq25m8W3eJaSTKBj7yg7vZRCZDEvDVZwOl924+i84TkJMnbObzO5Nty/JwzJFxXd4e8bthRU0uPnXOKhOsaAyzoXN6+KDsSDcJCbIB5CRKmKT+mpUIxzv8hmQKTUmaUHVOS3izGBliS/ORSyTNBcpo8UR0DlmWVcclSyoo5cbwYZzyvfDglQZJZqKyYFMepWE3i9XpNJ6smNykrjNtv4kq1ARaBcxIelTEdzoqbyWoWbjCAW9HWTEiGZvOkbBgXN5PQrAn0Pno/oz8yKVpLNHg5wYI4nRZH0gywKBc5KSlaWXBBnMZqyWZ88kauMS3V1amSxIJZcTmRVun6+IPkp79LfzdW8MIoRFrCM2nS2kqNe9NSYO7SBqJdRc37Rv5rLYBqwlffkJLCcuYxuc4NgaMAmNHYj9VTi/mU+9eBHyU3+yFePRUA8xrzqDjMNSyUdM6FEMJlyU8HtZP6aAGUYkuq9j7Q2E0/vG4c82lfRMXRceBd/fBNSdMzIm9j/UhFT91tPtegVPaoTpF7cuj2tpZ5L1KJ3rxUNudi6Tjg2Zx/H/i4EfJFl8ujtX0il/9Cbr+YZcPEQakusj5Wm1OR84kaJn7WOr99DRM1WmZMTfqcjLBPaqwsWmb+Br4DPgO+zLRlZgNNU48B97W5aepb4JuONU11sG3OAt33uWmba2Hj5LLSWNw4Oaknflbp7ZxqkquW71vZUutoX+tsvwLmrdE622DzdHxE3dHmaTqFep0cWeFfrZ3HI6zFqYoAAAAASUVORK5CYII=",bx="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAA9klEQVR4nO3bywqDMBhE4fnP+79zumnBFksX5iI5/ZaCIcOIkGgqE7XW2tn1qqpZc6iVQVcErzsEnRmcu4W9eu+SwK3DhEeFJjL0HrBnMyNaJjJEhsgQGSJDZIgMkSEyRIbIEBkiUysW4TN82zWp3YL+Cs7OYc8ysXPYs2y6lxa7t/vyyqhruAztHukaJjJEhsgQGWZ+jF6tqsrXcCb/crBKPTM6G9695Tpke2t4x9D1kem/xXNV78VI76eOyBAZIkNkiAyRITJEhsgQGSJDZIgMvQfsuboZsT4nMowYtEczo3ZfyCBXJjxyq6kygeagVj7c4SjeA6+jWHN7Qdy4AAAAAElFTkSuQmCC",Tx="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAACTklEQVR4nO3b2bLCIBAEUJv//+e55a3SciGRZZYOwzzpE9NHTQggbsQlIvJ4DQA30iq3CwDW3jMVJaIcgLFC0iHKDyhGSCpEaQRig6RBlE4YJkgKRBkEYYEMR5RJCAbIUERRAoiGDEMU5eCRkCGIYhQ4CtIdUYyDRkC6IopTQG9IN0RxDuY5nguiBF2rvMY1R5Tg6YfH+GVlQK8+yuqAHv2UDIDWfZUsgJb9lUyAVn2WbIAW/ZaMgNp9l6yAmv2XzIBaOUp2QI08Q4irAc7m6kZcFXAmXxfi6oCjOZsRswCO5G1CzAbYm/snYlbAnvyniNkBWx0OETdgu0cVcQPW68jlC3EDnlfN5w1xA7bVp9MTcQP21avXP+IGHKuHGzbgAoc8V6iNqFCF+Z9KV6i73/83cUOO1cPt+XPekH316vV2TdyQbfXp9HVj2ZDnVfOp3p03ZL2OXA6nOBuy3eN0nrgh2xx+TrazQ6Ihf9MTS1ZINOZufuzLBomOvF3Pzlkg0ZmzewFidUgM5BtaxVkVEoO5hpfCVoPERJ6p9cRVIDGZY3pRFheH1OhfZWUbF4XU6lttewAXg9TsV3WPBReB1O5TfaMK5JAW/Zns9oEU0qovsy1TkEFa9mO67wwSSOs+zDfvEQzpMb7LCQgEQXqN63aMBM6QnuOVFYPB+QNzP9AE44ARl46QU2EwChp17Q07WgflwJGzgNDziVAKHj2NCj/kiUmAaEAKxBkIBkAaxBEQFkAqxB4YJkA6xBYgNkBKxDMoRkBaxFsFjBXw3tsf6YM4tCZksoAAAAAASUVORK5CYII=",_s=n=>new U(n.x,n.y,n.z),T0=new kt(0,0,0),A0=new kt("#F2E945"),Ec=new kt("#2F94BF"),Ax=new kt("#A8A8A8"),P0=new kt("#A8A8A8").multiplyScalar(.5),Px=new d0,Xa=n=>{const t=Px.load(n);return t.colorSpace=Hn,t},Va={ball:Xa(wx),plus:Xa(bx),diamond:Xa(Tx)};function Cx(n,t){return t?Ec:n==="nav"?P0:n==="build"?Ax:T0}function du(n,t){return t?Ec:n==="nav"?P0:n==="build"?A0:T0}function mo(n){const t=new Be;return t.setAttribute("position",new se(n.position,3)),t.setAttribute("normal",new se(n.normal,3)),n.color&&t.setAttribute("rgba",new se(n.color,4)),t}function Ix(n,t){const e=i=>new Rt(i.x,i.y);return yc.triangulateShape(n.map(e),t.map(i=>i.map(e)))}const tr=n=>(n.raycast=()=>{},n.userData.owned=!0,n);function Lx(){const n=new Dn,t=new Re(new xc(.06,.08,.2),new zh({color:"#f3e3c3"}));t.rotation.x=Math.PI/2,t.position.z=.1;const e=new Re(new qo(.17,16,8,0,Math.PI*2,0,Math.PI/2),new zh({color:"#d9772b"}));return e.rotation.x=Math.PI/2,e.position.z=.2,n.add(t,e),n}function Wa(n,t,e,i,r){const o=new Vv(new a0({map:n,color:t,depthTest:!1,depthWrite:!1,transparent:!0}));return o.position.copy(e),o.scale.setScalar(.2*(i?1.5:1)),o.renderOrder=20,o.userData={marker:r,owned:!0},o.raycast=()=>{},o}function Rx(n,t=new Set,e=null,i={}){const r=new Dn,o=i.mode??"move",c=i.light??{diffuse:new oe(.5,.5,.5,1),ambient:new oe(.6,.6,.6,1),dir:new U(0,0,-1)},l=$_(c),u=K_(i.cameraNear),f=new Set([...n.ways.values()].map(S=>S.leg));for(const S of f){const _=q_(n,S,Ix);r.add(tr(new Re(mo(_.outline),u)));const y=tr(new Re(mo(_.main),l));y.userData.leg=S,r.add(y)}for(const S of n.intersections.values()){const _=ki(S.right,S.left,S.z),y=Z_(_.x,_.y,_.z,x0(S.color));r.add(tr(new Re(mo(y.outline),u))),r.add(tr(new Re(mo(y.main),l)))}const p=[],m=[];for(const S of n.ways.values()){const _=Ae(n,S.n1),y=Ae(n,S.n2);p.push(_.x,_.y,_.z,y.x,y.y,y.z);const P=Cx(o,t.has(`way:${S.id}`));m.push(P.r,P.g,P.b,P.r,P.g,P.b)}if(p.length){const S=new g0;S.setPositions(p),S.setColors(m);const _=new v0({linewidth:2,vertexColors:!0,depthTest:!1,depthWrite:!1,transparent:!0});i.resolution&&_.resolution.copy(i.resolution);const y=tr(new B_(S,_));y.renderOrder=10,r.add(y)}const g=o==="build"?Va.plus:o==="snap"?Va.diamond:Va.ball;for(const S of n.intersections.values()){const _=`intersection:${S.id}`;r.add(Wa(g,du(o,t.has(_)),_s(ki(S.right,S.left,S.z)),e===_,_))}for(const S of n.nodes.values()){if(S.intersection!=null)continue;const _=`node:${S.id}`;r.add(Wa(g,du(o,t.has(_)),_s(Ae(n,S.id)),e===_,_))}if(o==="move"||o==="snap")for(const S of n.ways.values()){const _=`middle:${S.id}`,y=_s(Ae(n,S.n1)).lerp(_s(Ae(n,S.n2)),.5);r.add(Wa(g,t.has(_)?Ec:A0,y,e===_,_))}for(const S of n.treasures.values()){const _=Lx(),y=ki(S.right,S.left,S.z);_.position.set(y.x,y.y,y.z),_.userData={kind:"treasure",id:S.id},r.add(_)}const v=S=>n.nodes.has(S)?_s(Ae(n,S)):null;if(n.start){const S=v(n.start);S&&r.add(lx(S,{diffuse:c.diffuse,ambient:c.ambient,lightAngle:i.lightAngle??65},i.cameraNear??1))}for(const S of n.finish){let _=null;if("nodeId"in S)_=v(S.nodeId);else{const y=n.intersections.get(S.intersectionId);y&&(_=_s(ki(y.right,y.left,y.z)))}_&&r.add(fx(_,c.diffuse,c.ambient,i.windSpeed??10))}if(n.mushiBoard){const S=v(n.mushiBoard);S&&r.add(_x(S,Se(n.nodes.get(n.mushiBoard).leg).hand,{diffuse:c.diffuse,ambient:c.ambient,lightAngle:i.lightAngle??65},i.cameraNear??1))}i.navBallAt&&i.camera&&r.add(Ex(i.navBallAt,i.camera,c));const M=new $n().setFromObject(r);return M.isEmpty()&&M.set(new U(-1,-1,-1),new U(1,1,1)),{group:r,bounds:M}}const pu=12;class Dx{constructor(t){gt(this,"renderer");gt(this,"scene",new Xv);gt(this,"camera");gt(this,"controls");gt(this,"level",null);gt(this,"bounds",new $n(new U(-5,-5,-1),new U(5,5,1)));gt(this,"geometry",null);gt(this,"guide",null);gt(this,"raycaster",new x_);gt(this,"ambient",new p_("#ffffff","#8899aa",1.6));gt(this,"sun",new v_("#ffffff",1.4));gt(this,"roadLight",{diffuse:new oe(.5,.5,.5,1),ambient:new oe(.6,.6,.6,1),dir:iu(65)});gt(this,"insetRight",0);gt(this,"current","perspective");this.host=t,this.renderer=new Gv({antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.appendChild(this.renderer.domElement),this.scene.background=new kt("#bfe3f5"),this.scene.add(this.ambient,this.sun),this.sun.position.set(-3,-5,8);const e=new Zh(200,400,"#9ec9dc","#b3d7e6");e.rotation.x=Math.PI/2,e.position.z=-8,this.scene.add(e),this.camera=new Mn(50,1,.05,2e3),this.camera.up.set(0,0,1),this.controls=new E_(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.screenSpacePanning=!0,this.controls.mouseButtons={LEFT:null,MIDDLE:_i.PAN,RIGHT:_i.ROTATE},new ResizeObserver(()=>this.resize()).observe(t),this.resize(),this.renderer.setAnimationLoop(()=>{this.controls.update(),this.renderer.render(this.scene,this.camera)})}get canvas(){return this.renderer.domElement}setInsetRight(t){this.insetRight=t,this.resize()}resize(){const t=this.host.clientWidth||1,e=this.host.clientHeight||1;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e;const i=Math.min(this.insetRight,t*.5);i>0?this.camera.setViewOffset(t,e,i/2,0,t,e):this.camera.clearViewOffset(),this.camera.updateProjectionMatrix()}applySky(t){var o,c,l,u;const e=(f,p)=>{if(!f)return new kt(p);const m=Ao(f);return new kt(m.r/255,m.g/255,m.b/255)};this.ambient.color=e((o=t==null?void 0:t.way)==null?void 0:o.ambientColor,"#ffffff").lerp(new kt("#ffffff"),.35),this.sun.color=e((c=t==null?void 0:t.way)==null?void 0:c.diffuseColor,"#ffffff").lerp(new kt("#ffffff"),.35);const i=(f,p)=>{if(!f)return new oe(p,p,p,1);const m=Ao(f);return new oe(m.r/255,m.g/255,m.b/255,m.a)};this.roadLight={diffuse:i((l=t==null?void 0:t.way)==null?void 0:l.diffuseColor,.5),ambient:i((u=t==null?void 0:t.way)==null?void 0:u.ambientColor,.6),dir:iu((t==null?void 0:t.lightAngle)??65)};const r=Yn.degToRad((t==null?void 0:t.lightAngle)??65);this.sun.position.set(Math.cos(r)*6,-4,Math.sin(r)*6+4)}show(t,e=new Set,i=!1,r=null,o={}){this.level&&(this.scene.remove(this.level),this.level.traverse(u=>{u.geometry&&u.userData.owned&&u.geometry.dispose()}));const c=this.renderer.getSize(new Rt),l=Rx(t,e,r,{light:this.roadLight,resolution:c,cameraNear:this.camera.near,camera:this.camera,...o});this.level=l.group,i||(this.bounds=l.bounds),this.geometry=t,this.scene.add(this.level)}showGuide(t,e){this.hideGuide();const i=new Zh(16,32,"#2f94bf","#8ec3d8"),r=i.material;r.transparent=!0,r.opacity=.55,r.depthWrite=!1,t==="left"&&(i.rotation.z=Math.PI/2);const o=c=>Math.round(c*2)/2;i.position.set(t==="right"?o(e.x):e.x,t==="right"?e.y:o(e.y),o(e.z)),this.guide=i,this.scene.add(i)}hideGuide(){this.guide&&(this.scene.remove(this.guide),this.guide.dispose(),this.guide=null)}frame(){this.setView(null)}setView(t){t&&(this.current=t);const e=this.bounds.getBoundingSphere(new qi),i=e.center,r=Yn.degToRad(this.camera.fov),o=Math.max(1,(this.host.clientWidth||1)-Math.min(this.insetRight,(this.host.clientWidth||1)*.5)),c=2*Math.atan(Math.tan(r/2)*(o/(this.host.clientHeight||1))),l=Math.max(e.radius,2)/Math.sin(Math.min(r,c)/2)*.9,u={perspective:new U(-.8,-1,.7),top:new U(0,-1e-4,1),sideX:new U(0,-1,0),sideY:new U(-1,0,0)},f=t?u[t].clone():this.camera.position.clone().sub(this.controls.target);f.lengthSq()<1e-12&&f.copy(u.perspective),this.camera.position.copy(i).add(f.normalize().multiplyScalar(l)),this.controls.target.copy(i),this.controls.update()}ndc(t,e){const i=this.canvas.getBoundingClientRect();return new Rt(t/i.width*2-1,-(e/i.height)*2+1)}toScreen(t){const e=this.canvas.getBoundingClientRect(),i=new U(t.x,t.y,t.z).project(this.camera);return{x:(i.x+1)/2*e.width,y:(1-i.y)/2*e.height,behind:i.z>1}}ray(t,e){return this.raycaster.setFromCamera(this.ndc(t,e),this.camera),this.raycaster.ray.clone()}hitPlane(t,e,i){return this.ray(t,e).intersectPlane(i,new U)}pick(t,e,i,r=!1,o){const c=o??this.geometry;if(!c)return null;let l=null,u=pu;const f=(g,v)=>{if(i!=null&&i(g))return;const M=this.toScreen(v);if(M.behind)return;const S=Math.hypot(M.x-t,M.y-e);S<u&&(u=S,l=g)};for(const g of c.nodes.values())g.intersection==null&&f({kind:"node",id:g.id},Ae(c,g.id));for(const g of c.intersections.values())f({kind:"intersection",id:g.id},ki(g.right,g.left,g.z));if(r)for(const g of c.ways.values()){const v=Ae(c,g.n1),M=Ae(c,g.n2);f({kind:"middle",id:g.id},{x:(v.x+M.x)/2,y:(v.y+M.y)/2,z:(v.z+M.z)/2})}if(l)return l;let p=null,m=pu;for(const g of c.ways.values()){const v={kind:"way",id:g.id};if(i!=null&&i(v))continue;const M=this.toScreen(Ae(c,g.n1)),S=this.toScreen(Ae(c,g.n2));if(M.behind||S.behind)continue;const _=S.x-M.x,y=S.y-M.y,P=_*_+y*y||1,b=Math.max(0,Math.min(1,((t-M.x)*_+(e-M.y)*y)/P)),I=Math.hypot(M.x+_*b-t,M.y+y*b-e);I<m&&(m=I,p=v)}return p}itemsInRect(t,e,i,r){const o=this.geometry;if(!o)return[];const[c,l]=[Math.min(t,i),Math.max(t,i)],[u,f]=[Math.min(e,r),Math.max(e,r)],p=g=>{const v=this.toScreen(g);return!v.behind&&v.x>=c&&v.x<=l&&v.y>=u&&v.y<=f},m=[];for(const g of o.nodes.values())g.intersection==null&&p(Ae(o,g.id))&&m.push({kind:"node",id:g.id});for(const g of o.intersections.values())p(ki(g.right,g.left,g.z))&&m.push({kind:"intersection",id:g.id});for(const g of o.ways.values()){const v=Ae(o,g.n1),M=Ae(o,g.n2);p(v)&&p(M)&&m.push({kind:"way",id:g.id})}return m}cameraHeading(){const t=new U;return this.camera.getWorldDirection(t),t.z=0,t.lengthSq()<1e-9?new U(0,1,0):t.normalize()}}const Ya=n=>JSON.stringify({metadata:n.metadata,geometry:Ui(n.geometry)}),mu=n=>{const{metadata:t,geometry:e}=JSON.parse(n);return{metadata:t,geometry:Ts(e)}};class Nx{constructor(t=200){gt(this,"undoStack",[]);gt(this,"redoStack",[]);this.limit=t}record(t){this.undoStack.push(Ya(t)),this.undoStack.length>this.limit&&this.undoStack.shift(),this.redoStack=[]}undo(t){const e=this.undoStack.pop();return e===void 0?null:(this.redoStack.push(Ya(t)),mu(e))}redo(t){const e=this.redoStack.pop();return e===void 0?null:(this.undoStack.push(Ya(t)),mu(e))}clear(){this.undoStack=[],this.redoStack=[]}get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}}const qa=n=>`${n.kind}:${n.id}`,C0=fr,Ux=3,Ox=.35,gu=.3,Fx=2*C0,ln=(n,t=2)=>(Math.abs(n)<5e-5?0:n).toFixed(t),Bx=["nav","move","snap"];class No{constructor(t,e,i){gt(this,"level");gt(this,"history",new Nx);gt(this,"selection",new Map);gt(this,"mode","move");gt(this,"heldMode",null);gt(this,"keys",new Set);gt(this,"gridStep",0);gt(this,"hover",null);gt(this,"drag",null);gt(this,"mouse",[0,0]);gt(this,"box");gt(this,"hud");this.view=t,this.onChange=e,this.onMessage=i;const r=t.canvas;this.box=document.createElement("div"),this.box.className="select-box",r.parentElement.appendChild(this.box),this.hud=document.createElement("div"),this.hud.className="drag-hud",r.parentElement.appendChild(this.hud),r.addEventListener("pointerdown",o=>this.onDown(o)),window.addEventListener("pointermove",o=>this.onMove(o)),window.addEventListener("pointerup",o=>this.onUp(o)),r.addEventListener("contextmenu",o=>o.preventDefault()),window.addEventListener("keydown",o=>this.onKey(o)),window.addEventListener("keyup",o=>this.onKeyUp(o)),window.addEventListener("blur",()=>{this.keys.clear(),this.setHeld(null)})}get g(){return this.level.geometry}get activeMode(){return this.heldMode??this.mode}context(){const t=this.drag,e=this.hover?this.hover.split(":")[0]:null;return{mode:this.activeMode,hover:e,action:t?t.grab?"grab":t.continuous?"continuous":t.moved?t.action??null:null:null,selected:this.selected().length,overNavBall:this.activeMode==="nav"&&!t&&this.navBallAxisAt(...this.mouse)!==null}}setMode(t){this.mode=t,this.render()}load(t){this.level=t,this.selection.clear(),this.history.clear(),this.render(!1)}selected(){return[...this.selection.values()].filter(t=>this.exists(t))}exists(t){return t.kind==="node"?this.g.nodes.has(t.id):t.kind==="way"?this.g.ways.has(t.id):this.g.intersections.has(t.id)}render(t=!0){var i;for(const[r,o]of this.selection)this.exists(o)||this.selection.delete(r);const e=this.level.metadata.skySettings;this.view.applySky(e),this.view.show(this.g,new Set(this.selection.keys()),t,this.hover,{lightAngle:e==null?void 0:e.lightAngle,windSpeed:(i=e==null?void 0:e.cloud)==null?void 0:i.speed,mode:this.activeMode,navBallAt:this.navBallCenter()??void 0}),this.onChange()}snapshot(t=JSON.stringify(Ui(this.g))){return{metadata:structuredClone(this.level.metadata),geometry:Ts(JSON.parse(t))}}apply(t){const e=this.snapshot();try{if(t(this.g)===!1){this.onMessage("—");return}this.history.record(e)}catch(i){this.level=e,this.onMessage(i instanceof pn?i.message:String(i))}this.render()}applyMeta(t){this.history.record(this.snapshot()),t(this.level.metadata),this.render()}undo(){const t=this.history.undo(this.level);t&&(this.level=t,this.render())}redo(){const t=this.history.redo(this.level);t&&(this.level=t,this.render())}onGrid(t){return this.gridStep>0?Math.round(t/this.gridStep)*this.gridStep:t}select(t,e){e||this.selection.clear();for(const i of t)this.selection.set(qa(i),i);this.render()}toggle(t){const e=t.kind==="middle"?{kind:"way",id:t.id}:t,i=qa(e);this.selection.has(i)?this.selection.delete(i):this.selection.set(i,e),this.render()}static axes(t){return{along:t==="right"?new U(1,0,0):new U(0,1,0),across:t==="right"?new U(0,1,0):new U(1,0,0),up:new U(0,0,1)}}screenAxis(t,e){const i=this.view.toScreen(t),r=this.view.toScreen(t.clone().addScaledVector(e,.05));return new Rt((r.x-i.x)*20,(r.y-i.y)*20)}screenScale(t){const e=new U().setFromMatrixColumn(this.view.camera.matrixWorld,0).normalize();return this.screenAxis(t,e).length()||1}planeMap(t,e,i,r,o){const c=new U().crossVectors(e,i).normalize();if(Math.abs(this.view.ray(r,o).direction.dot(c))>Ox){const M=new si().setFromNormalAndCoplanarPoint(c,t),S=this.view.hitPlane(r,o,M)??t.clone();return(_,y)=>{const P=this.view.hitPlane(_,y,M);return P?(P.sub(S),{x:P.dot(e),y:P.dot(i)}):{x:0,y:0}}}const l=this.screenScale(t),u=this.screenAxis(t,e),f=this.screenAxis(t,i),p=u.length()>=gu*l,m=f.length()>=gu*l,g=u.x*f.y-u.y*f.x,v=p&&m&&Math.abs(g)/(u.length()*f.length())>.3;return(M,S)=>{const _=new Rt(M-r,S-o);return v?{x:(_.x*f.y-_.y*f.x)/g,y:(u.x*_.y-u.y*_.x)/g}:p&&(!m||u.length()>=f.length())?{x:_.dot(u)/u.lengthSq(),y:0}:m?{x:0,y:_.dot(f)/f.lengthSq()}:{x:0,y:0}}}legMap(t,e,i,r){const{along:o,up:c}=No.axes(e);return this.planeMap(t,o,c,i,r)}heightMap(t,e,i){const r=this.view.cameraHeading(),o=new U(-r.y,r.x,0),c=this.planeMap(t,o,new U(0,0,1),e,i);return(l,u)=>({x:0,y:c(l,u).y})}groundMap(t,e,i){return this.planeMap(t,new U(1,0,0),new U(0,1,0),e,i)}rayDistance(t,e,i){const r=this.view.toScreen(t);return Math.hypot(r.x-e,r.y-i)/this.screenScale(t)}v3(t){return new U(t.x,t.y,t.z)}crossingWorld(t,e){const i=t.intersections.get(e);return{x:Un(i.left),y:Un(i.right),z:i.z}}showHud(t){const[e,i]=this.mouse;Object.assign(this.hud.style,{display:"block",left:`${e+18}px`,top:`${i+16}px`}),this.hud.textContent=t}local(t){const e=this.view.canvas.getBoundingClientRect();return[t.clientX-e.left,t.clientY-e.top]}pick(t,e,i){const r=this.activeMode;return this.view.pick(t,e,i,r==="move"||r==="snap")}onDown(t){var r,o;if(t.button!==0)return;const[e,i]=this.local(t);if((r=this.drag)!=null&&r.grab||(o=this.drag)!=null&&o.continuous)return this.finishDrag(this.drag.continuous===!0);this.drag={base:JSON.stringify(Ui(this.g)),startX:e,startY:i,moved:!1,hit:this.pick(e,i)},this.activeMode==="nav"&&(this.drag.navAxis=this.navBallAxisAt(e,i)??void 0)}navBallCenter(t=this.g,e=this.selected()){if(this.activeMode!=="nav"||!e.length)return null;const i=new U;for(const r of e)if(r.kind==="node")i.add(this.v3(Ae(t,r.id)));else if(r.kind==="intersection")i.add(this.v3(this.crossingWorld(t,r.id)));else{const o=t.ways.get(r.id);i.add(this.v3(Ae(t,o.n1)).add(this.v3(Ae(t,o.n2))).multiplyScalar(.5))}return i.divideScalar(e.length)}navBallAxisAt(t,e){const i=this.navBallCenter();if(!i)return null;const r=$l(this.view.camera.position.distanceTo(i)),o=yx(i,r);let c=null,l=1/0;for(const u of Object.keys(o)){const f=this.rayDistance(o[u],t,e);f<Sx(r)&&f<l&&(l=f,c=u)}return c}legHand(t,e){var r,o;if(e.kind==="intersection")return null;const i=e.kind==="node"?(r=t.nodes.get(e.id))==null?void 0:r.leg:(o=t.ways.get(e.id))==null?void 0:o.leg;return i?Se(i).hand:null}dragNav(t,e){const i=this.selected(),r=this.navBallCenter(t,i),[o,c]=this.mouse;if(e.navAxis==="z"){e.map??(e.map=this.heightMap(r,e.startX,e.startY));const S=e.map(o,c);return this.applyMove2d(t,i,{x:0,y:S.y}),this.showHud(`Δz ${ln(S.y)}`)}const l=e.navAxis==="x"?"right":"left";e.map??(e.map=this.groundMap(r,e.startX,e.startY));const u=e.map(o,c);if(!i.some(S=>this.legHand(t,S)!==l)){const S=l==="right"?u.x:u.y;return this.applyMove2d(t,i,{x:S,y:0}),this.showHud(`${l==="right"?"X":"Y"} ${ln(S)}`)}const p=i.find(S=>this.legHand(t,S)!==l),m=l==="right"?"left":"right";let g;if(p.kind==="intersection"){const S=t.intersections.get(p.id);g=Number(m==="right"?S.right:S.left)}else{const S=p.kind==="node"?t.nodes.get(p.id).leg:t.ways.get(p.id).leg;g=Number(Se(S).gridIndex)}const v=m==="right"?u.y:u.x,M=Math.round((g*bs+v)/bs)-g;hf(t,i,l,M),this.showHud(`${l==="right"?"X":"Y"} ${M>=0?"+":""}${ln(M*bs)}`)}applyMove2d(t,e,i){const r=c=>{const l=t.nodes.get(c),u=Le(t,c);l.intersection!=null?Vs(t,l.intersection,this.onGrid(u.y+i.y)):bi(t,c,{x:this.onGrid(u.x+i.x),y:this.onGrid(u.y+i.y)})},o=new Set;for(const c of e)if(c.kind==="intersection")o.has(`i${c.id}`)||Vs(t,c.id,this.onGrid(t.intersections.get(c.id).z+i.y)),o.add(`i${c.id}`);else{const l=c.kind==="node"?[c.id]:[t.ways.get(c.id).n1,t.ways.get(c.id).n2];for(const u of l){const f=t.nodes.get(u),p=f.intersection!=null?`i${f.intersection}`:`n${u}`;o.has(p)||r(u),o.add(p)}}}onMove(t){this.mouse=this.local(t);const e=this.drag;if(!e){if(t.target!==this.view.canvas)return;const c=this.pick(...this.mouse),l=c?`${c.kind}:${c.id}`:null;l!==this.hover&&(this.hover=l,this.view.canvas.style.cursor=l?"pointer":"",this.render());return}const[i,r]=this.mouse;if(!e.moved&&Math.hypot(i-e.startX,r-e.startY)<=Ux&&!e.grab&&!e.continuous)return;if(e.moved=!0,e.action??(e.action=this.actionFor(e)),e.action==="box")return this.showBox(e.startX,e.startY,i,r);if(e.action==="none")return;const o=Ts(JSON.parse(e.base));try{e.grab?this.dragGrab(o,e,t.shiftKey):e.action==="move"?this.dragMove(o,e,t.shiftKey):e.action==="middle"?this.dragMiddle(o,e,t.shiftKey):e.action==="build"?this.dragBuild(o,e):e.action==="node"?this.dragNode(o,e,t.shiftKey):e.action==="nav"&&this.dragNav(o,e),this.level.geometry=o,this.render()}catch(c){if(!(c instanceof pn))throw c}}actionFor(t){if(t.grab)return"move";const e=this.activeMode,i=t.hit;return e==="nav"?t.navAxis?"nav":"box":e==="build"?i&&(i.kind==="node"||i.kind==="intersection")?"build":"none":e==="node"?i&&i.kind==="node"?"node":"none":i?i.kind==="middle"?"middle":i.kind==="way"?"none":"move":"box"}onUp(t){const e=this.drag;if(!(!e||e.grab||e.continuous)){if(this.mouse=this.local(t),!e.moved){this.drag=null,Bx.includes(this.activeMode)&&(e.hit?this.toggle(e.hit):(this.selection.clear(),this.render()));return}if(e.action==="box"){this.drag=null,this.box.style.display="none",this.select(this.view.itemsInRect(e.startX,e.startY,...this.mouse),!0);return}if(e.action==="node"&&e.created&&this.keys.has("b")){this.history.record(this.snapshot(e.base)),this.drag=this.continueFrom(e.created);return}this.finishDrag(!1)}}finishDrag(t){const e=this.drag;e&&(this.drag=null,this.hud.style.display="none",this.view.hideGuide(),JSON.stringify(Ui(this.g))!==e.base&&this.history.record(this.snapshot(e.base)),t&&e.created&&this.g.nodes.has(e.created)&&(this.drag=this.continueFrom(e.created)),this.render())}continueFrom(t){return{base:JSON.stringify(Ui(this.g)),startX:this.mouse[0],startY:this.mouse[1],moved:!0,hit:{kind:"node",id:t},action:"node",continuous:!0}}showBox(t,e,i,r){Object.assign(this.box.style,{display:"block",left:`${Math.min(t,i)}px`,top:`${Math.min(e,r)}px`,width:`${Math.abs(i-t)}px`,height:`${Math.abs(r-e)}px`})}trySnap(t,e){var m;if(Ke(t,e).length!==1||((m=t.nodes.get(e))==null?void 0:m.intersection)!=null)return!1;const[i,r]=this.mouse,o=t.nodes.get(e).leg,c=Le(t,e),l=g=>Ke(t,e).some(v=>v.n1===g||v.n2===g),u=this.view.pick(i,r,g=>{var v;return g.kind!=="node"||g.id===e||((v=t.nodes.get(g.id))==null?void 0:v.leg)!==o},!1,t);if(u&&!l(u.id)){const g=Le(t,u.id);if(Math.hypot(g.x-c.x,g.y-c.y)<=Fx&&sf(t,e,u.id))return!0}const f=Se(o).hand,p=this.view.pick(i,r,g=>g.kind!=="way"||Se(t.ways.get(g.id).leg).hand===f,!1,t);return!!p&&of(t,e,p.id)}moveOne(t,e,i,r){const[o,c]=this.mouse;if(i.kind==="intersection"){e.map??(e.map=this.heightMap(this.v3(this.crossingWorld(t,i.id)),e.startX,e.startY));let v=t.intersections.get(i.id).z+e.map(o,c).y;this.activeMode==="snap"&&(v=Gx(t,i.id,v)),v=this.onGrid(v),Vs(t,i.id,v),this.showHud(`z ${ln(v)}`);return}const l=Se(t.nodes.get(i.id).leg).hand,u=this.v3(Ae(t,i.id));e.map||(e.map=this.legMap(u,l,e.startX,e.startY),this.view.showGuide(l,u));const f=Le(t,i.id),p=e.map(o,c);let m={x:f.x+p.x,y:f.y+p.y};this.activeMode==="snap"&&(m=Hx(t,i.id,m)),m={x:this.onGrid(m.x),y:this.onGrid(m.y)},bi(t,i.id,m),this.showHud(`${ln(m.x)}, ${ln(m.y)}   Δ ${ln(m.x-f.x)}, ${ln(m.y-f.y)}`),r||this.trySnap(t,i.id)}dragMove(t,e,i){const r=e.hit;this.moveOne(t,e,r,i)}dragMiddle(t,e,i){const{node:r}=bu(t,e.hit.id);this.moveOne(t,e,{kind:"node",id:r},i)}dragBuild(t,e){const i=e.hit,[r,o]=this.mouse,c=this.v3(i.kind==="intersection"?this.crossingWorld(t,i.id):Ae(t,i.id));if(this.rayDistance(c,r,o)<ef)return;e.map??(e.map=this.groundMap(c,e.startX,e.startY));const{x:l,y:u}=e.map(r,o),f=Math.abs(u)<Math.abs(l)?"right":"left",p=this.onGrid(f==="right"?l:u)||(f==="right"?l:u);let m;if(i.kind==="intersection"?m=[...t.nodes.values()].find(v=>v.intersection===i.id&&Se(v.leg).hand===f).id:m=i.id,Se(t.nodes.get(m).leg).hand!==f)e.created=nf(t,m,p).node;else{const v=Le(t,m);e.created=Qa(t,m,{x:v.x+p,y:v.y}).node}this.showHud(`${f==="right"?"X":"Y"} ${p>=0?"+":""}${ln(p)}`)}dragNode(t,e,i){const r=e.hit.id,[o,c]=this.mouse,l=this.v3(Ae(t,r));if(!e.continuous&&this.rayDistance(l,o,c)<C0)return;const u=Le(t,r),{node:f}=Qa(t,r,{x:u.x,y:u.y});e.created=f;const p=Se(t.nodes.get(r).leg).hand;e.map||(e.map=this.legMap(l,p,e.startX,e.startY),this.view.showGuide(p,l));const m=e.map(o,c),g={x:this.onGrid(u.x+m.x),y:this.onGrid(u.y+m.y)};bi(t,f,g);const v=g.x-u.x,M=g.y-u.y;this.showHud(`Δ ${ln(v)}, ${ln(M)}   L ${ln(Math.hypot(v,M))}   ${ln(Math.atan2(M,Math.abs(v))*180/Math.PI,1)}°`),i||this.trySnap(t,f)}startGrab(){const t=this.selected();!t.length||this.drag||(this.drag={base:JSON.stringify(Ui(this.g)),startX:this.mouse[0],startY:this.mouse[1],moved:!0,hit:null,action:"move",grab:t})}dragGrab(t,e,i){const r=e.grab,[o,c]=this.mouse;if(r.length===1&&(r[0].kind==="node"||r[0].kind==="intersection"))return this.moveOne(t,e,r[0],i);const l=r.some(m=>m.kind==="intersection"),u=r[0],f=u.kind==="way"?t.ways.get(u.id).n1:u.id;if(!e.map)if(l){const m=u.kind==="intersection"?this.crossingWorld(t,u.id):Ae(t,f);e.map=this.heightMap(this.v3(m),e.startX,e.startY)}else{const m=Se(t.nodes.get(f).leg).hand,g=this.v3(Ae(t,f));e.map=this.legMap(g,m,e.startX,e.startY),this.view.showGuide(m,g)}const p=e.map(o,c);this.applyMove2d(t,r,p),this.showHud(`Δ ${ln(p.x)}, ${ln(p.y)}`)}setHeld(t){t!==this.heldMode&&(this.heldMode=t,this.render())}heldFromKeys(){return this.keys.has("q")?"move":this.keys.has("w")?"snap":this.keys.has("e")||this.keys.has("b")?"node":this.keys.has("r")?"build":null}onKeyUp(t){var i;const e=t.key.toLowerCase();e==="g"&&((i=this.drag)!=null&&i.grab)&&this.finishDrag(!1),this.keys.delete(e),this.setHeld(this.heldFromKeys())}onKey(t){const e=t.target;if(e&&(e.tagName==="INPUT"||e.tagName==="SELECT"||e.tagName==="TEXTAREA"))return;const i=t.key.toLowerCase(),r=t.ctrlKey||t.metaKey;if(r&&i==="z")return t.preventDefault(),t.shiftKey?this.redo():this.undo();if(r&&i==="y")return t.preventDefault(),this.redo();if(r&&i==="a")return t.preventDefault(),this.selectAll();if(r)return;if(["q","w","e","b","r"].includes(i))return t.repeat?void 0:(this.keys.add(i),this.setHeld(this.heldFromKeys()));if(i==="escape")return this.drag&&(this.drag.grab||this.drag.continuous)?(this.level.geometry=Ts(JSON.parse(this.drag.base)),this.drag=null,this.hud.style.display="none",this.view.hideGuide(),this.render()):(this.selection.clear(),this.render());if(this.drag)return;const o=this.selected();switch(i){case"g":t.repeat||this.startGrab();return;case"delete":case"backspace":return this.deleteSelection();case"d":return this.duplicate();case"s":return this.apply(c=>gf(c,o));case"f":return this.apply(c=>vf(c,o,t.shiftKey));case"m":return this.apply(c=>_f(c,o));case"c":return this.apply(c=>{mf(c,o)});case"arrowleft":case"arrowright":case"arrowup":case"arrowdown":return t.preventDefault(),this.nudge(i,t.shiftKey)}/^[0-9]$/.test(t.key)&&o.length&&this.apply(c=>tl(c,o,Number(t.key)))}nudge(t,e){const i=this.selected();if(!i.length)return;const r=(this.gridStep||.1)*(e?5:1),o=t==="arrowup"||t==="arrowdown",c=t==="arrowup"||t==="arrowright"?1:-1;this.apply(l=>{var u;for(const f of i){if(f.kind==="intersection"){o&&Vs(l,f.id,this.roundStep(l.intersections.get(f.id).z+c*r));continue}const p=f.kind==="node"?[f.id]:[l.ways.get(f.id).n1,l.ways.get(f.id).n2];for(const m of new Set(p)){if(((u=l.nodes.get(m))==null?void 0:u.intersection)!=null)continue;const g=Le(l,m);if(o){bi(l,m,{x:g.x,y:this.roundStep(g.y+c*r)});continue}const v=Se(l.nodes.get(m).leg).hand,M=this.screenAxis(this.v3(Ae(l,m)),No.axes(v).along).x;bi(l,m,{x:this.roundStep(g.x+c*r*(M<0?-1:1)),y:g.y})}}})}roundStep(t){return Math.round(t*1e9)/1e9}wayEnds(t){const e=this.g.ways.get(t);if(!e)return null;const i=o=>{var c;return((c=this.g.nodes.get(o))==null?void 0:c.intersection)==null},r=o=>i(o)&&Ke(this.g,o).length===1;return r(e.n2)?{from:e.n1,to:e.n2}:r(e.n1)?{from:e.n2,to:e.n1}:i(e.n2)?{from:e.n1,to:e.n2}:i(e.n1)?{from:e.n2,to:e.n1}:null}setWayVector(t,e){const i=this.wayEnds(t);i&&this.apply(r=>{const o=Le(r,i.from);bi(r,i.to,{x:this.roundStep(o.x+e.x),y:this.roundStep(o.y+e.y)})})}deleteSelection(){const t=this.selected();t.length&&this.apply(e=>{if(!ff(e,t))throw new pn("Cannot delete every road");this.selection.clear()})}duplicate(){const t=this.selected();this.apply(e=>{const i=df(e,t);this.selection=new Map(i.map(r=>[qa(r),r]))})}selectAll(){const t=[...this.g.nodes.values()].filter(e=>e.intersection==null).map(e=>({kind:"node",id:e.id}));for(const e of this.g.intersections.keys())t.push({kind:"intersection",id:e});this.select(t,!1)}setNodeLoc(t,e){this.apply(i=>bi(i,t,e))}setCrossingHeight(t,e){this.apply(i=>Vs(i,t,e))}setSelectionColor(t){const e=this.selected();this.apply(i=>tl(i,e,t))}hasOneWayEnd(t){return Ke(this.g,t).length===1}world(t){return Ae(this.g,t)}}const er=Math.PI/4,Za=(n,t)=>Math.round(n/t)*t;function I0(n,t,e){const i=[];for(const r of n){const o=t.x-r.x,c=t.y-r.y,l=Math.atan2(c,o),u=Math.hypot(o,c);for(const f of[Za(l,er),Za(l+er,er),Za(l-er,er)]){const p=e?{x:t.x,y:r.y+Math.tan(f)*o}:{x:r.x+Math.cos(f)*u,y:r.y+Math.sin(f)*u};i.push({loc:p,other:r,dist:Math.hypot(p.x-t.x,p.y-t.y)})}}return i.sort((r,o)=>r.dist-o.dist)}function kx(n,t,e){if(!n.length)return t;if(n.length>=2&&Math.hypot(n[0].loc.x-n[1].loc.x,n[0].loc.y-n[1].loc.y)<.3){const i=zx(n[0].other,n[0].loc,n[1].other,n[1].loc);if(i)return i}return n[0].loc}function zx(n,t,e,i){const r=t.y-n.y,o=n.x-t.x,c=r*n.x+o*n.y,l=i.y-e.y,u=e.x-i.x,f=l*e.x+u*e.y,p=r*u-l*o;return p>-.001&&p<.001?null:{x:(u*c-o*f)/p,y:(r*f-l*c)/p}}function Hx(n,t,e){const i=Ke(n,t).map(r=>Le(n,r.n1===t?r.n2:r.n1));return kx(I0(i,e,!1),e)}function Gx(n,t,e){let i=null;for(const r of n.nodes.values()){if(r.intersection!==t)continue;const o=Le(n,r.id),c=Ke(n,r.id).map(u=>Le(n,u.n1===r.id?u.n2:u.n1)),l=I0(c,{x:o.x,y:e},!0)[0];l&&(!i||l.dist<i.dist)&&(i=l)}return i?i.loc.y:e}const Xx={modes:{move:{name:"移动",key:"Q",summary:"拖动节点或交叉路口",points:["拖道路中间的黄点：在那里加一个节点","路端拖到节点上会合并，拖到另一方向的路上会建交叉路口","按住 Shift 拖：不自动连接"]},snap:{name:"吸附",key:"W",summary:"像移动一样，但按 45° 对齐",points:["适合做标准的斜坡和直角","黄点同样可以拖出新节点"]},nav:{name:"选择",key:"",summary:"只选择，不改形状",points:["单击选中，再点取消；拖动框选","选中后出现金色箭头：拖箭头移动","和路垂直的箭头：把整条路搬到相邻平面"]},build:{name:"建造",key:"R",summary:"拖出水平道路，只能沿 X 或 Y",points:["从节点或交叉路口开始拖","方向和原路不同时自动建交叉路口","离开节点约 0.45 才开始生成"]},node:{name:"延伸",key:"E",summary:"从节点拖出一条新道路",points:["可以带坡度","按住 B 拖：连续延伸，单击确定，Esc 结束"]}},shortcuts:"快捷键",tour:"新手引导",next:"下一步",done:"开始使用",skip:"跳过",tourSteps:[{target:"#rail",title:"五种模式",body:"左边是和游戏一样的五个模式。鼠标停在图标上可以看到用法；按住 Q / W / E / R 可以临时切换。"},{target:"#viewport",title:"在 3D 里编辑",body:"右键拖动旋转视角，中键拖动平移，滚轮缩放。按住 V 再滚动滚轮，循环切换几种固定视角。左键用来选择和编辑。"},{target:"#hintbar",title:"底部提示栏",body:"这里会根据当前模式和鼠标下的东西，告诉你现在能做什么。不用记快捷键，看这里就行。"},{target:"#inspector",title:"属性面板",body:"选中东西后，可以在这里输入位置、长度、坡度，改颜色、设起点终点。地图数量和天空设置在顶栏的“地图”和“天空”里。"},{target:"[data-action=shortcuts]",title:"全部快捷键",body:"随时按 ? 或点这里，看完整的操作说明和键盘图。"}],hint:n=>{if(n.action==="grab")return[[["移动鼠标"],"跟着走"],[["松开 G"],"放下"],[["Esc"],"放回原处"],[["Shift"],"不自动连接"]];if(n.action==="continuous")return[[["移动鼠标"],"拉出下一段"],[["单击"],"确定这一段"],[["Esc"],"结束"]];if(n.action==="box")return[[["松开"],"选中框里的东西"]];if(n.action==="build")return[[["沿 X 或 Y 拖"],"拉出水平道路"],[["换方向"],"自动建交叉路口"],[["松开"],"完成"]];if(n.action==="nav")return[[["拖动"],"移动选中的东西"],[["松开"],"完成"]];if(n.action==="move"||n.action==="middle"||n.action==="node")return[[["松开"],"完成"],[["Shift"],"按住：不自动合并 / 相交"],[["Ctrl","Z"],"撤销"]];const t=n.selected?[[["按住 G"],"抓起"],[["0–9"],"颜色"],[["Delete"],"删除"]]:[];switch(n.mode){case"move":case"snap":{const e=n.mode==="snap"?"按 45° 移动":"移动";return n.hover==="node"||n.hover==="intersection"?[[["拖动"],e],[["单击"],"选中 / 取消"],...t]:n.hover==="middle"?[[["拖动"],"在这里加节点"],[["单击"],"选中这条路"],...t]:n.hover==="way"?[[["单击"],"选中这条路"],...t]:[[["拖动"],"框选"],[["单击"],"取消选择"],[["拖黄点"],"加节点"],...t]}case"nav":return n.overNavBall?[[["拖箭头"],"移动选中的东西"],[["和路垂直的箭头"],"搬到相邻平面"]]:n.hover?[[["单击"],"选中 / 取消"],...t]:[[["拖动"],"框选"],[["单击"],"取消选择"],...n.selected?[[["拖金色箭头"],"移动"]]:[],...t];case"build":return n.hover==="node"||n.hover==="intersection"?[[["拖动"],"拉出水平道路（X 或 Y）"]]:[[["指向"],"把鼠标放到节点或交叉路口上"]];case"node":return n.hover==="node"?[[["拖动"],"拉出新道路"],[["按住 B 拖"],"连续延伸"]]:[[["指向"],"把鼠标放到节点上"]]}return[]},always:[[["右键拖动"],"旋转"],[["中键"],"平移"],[["按住 V","滚轮"],"切换视角"],[["?"],"全部快捷键"]],sheetTitle:"操作说明",sheetSub:"键盘上高亮的键都有用，鼠标停在下面某一行上，对应的键会亮起来。"},Vx={modes:{move:{name:"Move",key:"Q",summary:"Drag nodes and crossings",points:["Drag a road's yellow middle dot to add a node","A road end dropped on a node merges; on a road of the other direction it makes a crossing","Hold Shift to drag without connecting"]},snap:{name:"Snap",key:"W",summary:"Like Move, in 45° steps",points:["For clean slopes and right angles","Yellow dots still add nodes"]},nav:{name:"Select",key:"",summary:"Select only, no shape changes",points:["Click to select, click again to deselect; drag to box-select","With a selection, drag the gold arrows to move it","An arrow across the roads moves them to the next plane"]},build:{name:"Build",key:"R",summary:"Flat roads along X or Y",points:["Start on a node or crossing","Turning makes a crossing","Starts about 0.45 away from the node"]},node:{name:"New road",key:"E",summary:"Drag a new road out of a node",points:["It can slope","Hold B and drag to keep going; click to place, Esc to stop"]}},shortcuts:"Shortcuts",tour:"Tour",next:"Next",done:"Start editing",skip:"Skip",tourSteps:[{target:"#rail",title:"Five modes",body:"The game's five editor modes. Hover an icon to see how it works; hold Q / W / E / R to switch while held."},{target:"#viewport",title:"Edit in 3D",body:"Right drag orbits, middle drag pans, the wheel zooms. Hold V and scroll to cycle the fixed views. The left button selects and edits."},{target:"#hintbar",title:"Hint bar",body:"It tells you what you can do right now, for the mode you are in and what is under the mouse."},{target:"#inspector",title:"Inspector",body:"With something selected, type positions, lengths and slopes, set colours, the start and finish. Map counts and the sky are in the top bar's Map and Sky."},{target:"[data-action=shortcuts]",title:"All shortcuts",body:"Press ? or click here any time for the full guide and keyboard map."}],hint:n=>{if(n.action==="grab")return[[["Move mouse"],"it follows"],[["Release G"],"drop"],[["Esc"],"put back"],[["Shift"],"no connecting"]];if(n.action==="continuous")return[[["Move mouse"],"next segment"],[["Click"],"place it"],[["Esc"],"stop"]];if(n.action==="box")return[[["Release"],"select what is inside"]];if(n.action==="build")return[[["Drag along X or Y"],"flat road"],[["Turn"],"makes a crossing"],[["Release"],"done"]];if(n.action==="nav")return[[["Drag"],"move the selection"],[["Release"],"done"]];if(n.action==="move"||n.action==="middle"||n.action==="node")return[[["Release"],"done"],[["Shift"],"hold: no merge / crossing"],[["Ctrl","Z"],"undo"]];const t=n.selected?[[["Hold G"],"grab"],[["0–9"],"colour"],[["Delete"],"delete"]]:[];switch(n.mode){case"move":case"snap":{const e=n.mode==="snap"?"move in 45° steps":"move";return n.hover==="node"||n.hover==="intersection"?[[["Drag"],e],[["Click"],"select / deselect"],...t]:n.hover==="middle"?[[["Drag"],"add a node here"],[["Click"],"select this road"],...t]:n.hover==="way"?[[["Click"],"select this road"],...t]:[[["Drag"],"box select"],[["Click"],"deselect"],[["Drag a yellow dot"],"add a node"],...t]}case"nav":return n.overNavBall?[[["Drag an arrow"],"move the selection"],[["Arrow across roads"],"to the next plane"]]:n.hover?[[["Click"],"select / deselect"],...t]:[[["Drag"],"box select"],[["Click"],"deselect"],...n.selected?[[["Drag gold arrows"],"move"]]:[],...t];case"build":return n.hover==="node"||n.hover==="intersection"?[[["Drag"],"flat road along X or Y"]]:[[["Point"],"at a node or crossing"]];case"node":return n.hover==="node"?[[["Drag"],"new road"],[["Hold B + drag"],"keep going"]]:[[["Point"],"at a node"]]}return[]},always:[[["Right drag"],"orbit"],[["Middle"],"pan"],[["Hold V","Wheel"],"views"],[["?"],"all shortcuts"]],sheetTitle:"How to use",sheetSub:"Highlighted keys do something. Hover a line below to light up its keys."},wr={zh:Xx,en:Vx},Wx=[{title:"视角",items:[{keys:["右键拖动"],text:"旋转视角"},{keys:["中键拖动"],text:"平移"},{keys:["滚轮"],text:"放大 / 缩小"},{keys:["按住 V","滚轮"],text:"循环切换视角：3D → 俯视 → 侧视 X → 侧视 Y"},{keys:["按住 V","1–4"],text:"直接切到第 1–4 个视角"},{keys:["Home"],text:"显示全部：把整张地图放进画面（保持当前方向）"},{keys:["视角菜单"],text:"顶栏的“视角”里也能点选这些视角"}]},{title:"五种模式",note:"点工具栏按钮切换；按住 Q / W / E / R 是临时切换，松开就回到原来的模式。",items:[{keys:["移动","Q"],text:"拖节点或交叉路口来移动它。拖道路中间的黄点：在那里加一个节点并拖走"},{keys:["吸附","W"],text:"和移动一样，但道路会按 45° 对齐"},{keys:["选择"],text:"只用来选东西。选中后会出现金色箭头，拖箭头移动选中的东西"},{keys:["建造","R"],text:"从节点或交叉路口拖出一条水平道路，只能沿 X 或 Y 方向。方向和原来的路不同时，会自动建交叉路口（拖离节点约 0.45 后才开始）"},{keys:["延伸","E"],text:"从节点拖出一条新道路，可以带坡度"},{keys:["按住 B 拖"],text:"连续延伸：松开后继续跟着鼠标，单击确定一段，Esc 结束"}]},{title:"选择",note:"在移动、吸附、选择模式下可以选择。",items:[{keys:["单击"],text:"选中；再点一次取消。可以一个个点选多个"},{keys:["单击空白处"],text:"取消全部选择"},{keys:["空白处拖动"],text:"框选"},{keys:["Ctrl","A"],text:"全选"},{keys:["Esc"],text:"取消选择"}]},{title:"金色箭头（选择模式）",items:[{keys:["拖竖直箭头"],text:"把选中的东西上下移动"},{keys:["拖水平箭头"],text:"沿路的方向移动；如果箭头和道路垂直，就把整条路搬到旁边的平面（每格 0.5），交叉路口一起移动"}]},{title:"自动连接",items:[{keys:["拖路的末端"],text:"放到同一平面的另一个节点上：两个节点合并"},{keys:["拖路的末端"],text:"放到另一个方向的道路上：自动建交叉路口"},{keys:["Shift","拖动"],text:"不自动合并、不自动相交"}]},{title:"对选中的东西",items:[{keys:["按住 G"],text:"抓起：按住期间跟着鼠标走，松开 G 就放下（Esc 可以放回原处）"},{keys:["0–9"],text:"设颜色（也可以点右侧的色块）"},{keys:["C"],text:"换下一个颜色"},{keys:["S"],text:"设为起点"},{keys:["F"],text:"设为终点"},{keys:["Shift","F"],text:"再加一个终点"},{keys:["M"],text:"放蘑菇牌子"},{keys:["D"],text:"复制（复制品抬高 0.5）"},{keys:["Delete"],text:"删除（Backspace 也行）"}]},{title:"精确调整（编辑器额外功能）",items:[{keys:["↑","↓"],text:"选中的节点升高 / 降低一步"},{keys:["←","→"],text:"沿路的方向移动一步"},{keys:["Shift","方向键"],text:"一次走 5 步"},{keys:["网格"],text:"顶栏的网格：移动和新节点对齐到 0.5 / 0.25 / 0.1；一步的大小也跟着它（关闭时一步 0.1）"},{keys:["右侧面板"],text:"选中节点或道路后，可以直接输入位置、长度、坡度"}]},{title:"撤销、文件和地图",items:[{keys:["Ctrl","Z"],text:"撤销"},{keys:["Ctrl","Y"],text:"重做（Ctrl + Shift + Z 也行）"},{keys:["Ctrl","O"],text:"打开地图（也可以把 .json 文件拖进窗口）"},{keys:["Ctrl","S"],text:"保存；Ctrl + Shift + S 另存为"},{keys:["文件菜单"],text:"顶栏左边的“文件”：新建、打开、保存、另存为"},{keys:["地图菜单"],text:"道路、节点等数量和地图检查；有问题时按钮上会显示数字"},{keys:["天空"],text:"点一下打开天空设置，它会一直开着，再点一下才收起"}]}],Yx=[{title:"Camera",items:[{keys:["Right drag"],text:"Orbit"},{keys:["Middle drag"],text:"Pan"},{keys:["Wheel"],text:"Zoom"},{keys:["Hold V","Wheel"],text:"Cycle views: 3D → Top → Side X → Side Y"},{keys:["Hold V","1–4"],text:"Jump to view 1–4"},{keys:["Home"],text:"Frame all: fit the whole map (keeps the direction)"},{keys:["View menu"],text:"The same views are in the View menu at the top"}]},{title:"Five modes",note:"Click a toolbar button to switch. Holding Q / W / E / R switches only while held.",items:[{keys:["Move","Q"],text:"Drag a node or crossing to move it. Drag a road's yellow middle dot to add a node there"},{keys:["Snap","W"],text:"Like Move, but roads keep to 45° steps"},{keys:["Select"],text:"Only selects. With a selection, gold arrows appear; drag them to move it"},{keys:["Build","R"],text:"Drag a flat road out of a node or crossing, along X or Y only. Turning makes a crossing (starts about 0.45 away from the node)"},{keys:["New road","E"],text:"Drag a new road out of a node; it can slope"},{keys:["Hold B + drag"],text:"Keep building: after releasing, the next road follows the mouse; click to place, Esc to stop"}]},{title:"Selecting",note:"Works in Move, Snap and Select.",items:[{keys:["Click"],text:"Select; click again to deselect. Click more items to add them"},{keys:["Click empty space"],text:"Deselect all"},{keys:["Drag on empty space"],text:"Box select"},{keys:["Ctrl","A"],text:"Select all"},{keys:["Esc"],text:"Deselect"}]},{title:"Gold arrows (Select mode)",items:[{keys:["Drag the up arrow"],text:"Move the selection up or down"},{keys:["Drag a flat arrow"],text:"Move along the roads; across the roads, it moves whole roads to the next plane (0.5 apart), crossings included"}]},{title:"Auto-connect",items:[{keys:["Drag a road end"],text:"Onto another node of the same plane: the nodes merge"},{keys:["Drag a road end"],text:"Onto a road of the other direction: a crossing is made"},{keys:["Shift","drag"],text:"No merging, no crossing"}]},{title:"With a selection",items:[{keys:["Hold G"],text:"Grab: it follows the mouse while G is held, letting go drops it (Esc puts it back)"},{keys:["0–9"],text:"Set the colour (or click a swatch on the right)"},{keys:["C"],text:"Next colour"},{keys:["S"],text:"Set the start"},{keys:["F"],text:"Set the finish"},{keys:["Shift","F"],text:"Add another finish"},{keys:["M"],text:"Place the mushi board"},{keys:["D"],text:"Duplicate (the copy is 0.5 higher)"},{keys:["Delete"],text:"Delete (or Backspace)"}]},{title:"Precise edits (editor extras)",items:[{keys:["↑","↓"],text:"Raise / lower the selected node one step"},{keys:["←","→"],text:"Move one step along the road"},{keys:["Shift","arrow"],text:"Five steps at once"},{keys:["Grid"],text:"Toolbar grid: moves and new nodes snap to 0.5 / 0.25 / 0.1; it is also the step size (0.1 when off)"},{keys:["Right panel"],text:"With a node or road selected, type its position, length or slope"}]},{title:"Undo, files and the map",items:[{keys:["Ctrl","Z"],text:"Undo"},{keys:["Ctrl","Y"],text:"Redo (or Ctrl + Shift + Z)"},{keys:["Ctrl","O"],text:"Open a map (or drop a .json file onto the window)"},{keys:["Ctrl","S"],text:"Save; Ctrl + Shift + S saves as"},{keys:["File menu"],text:"Top left: New, Open, Save, Save as"},{keys:["Map menu"],text:"Counts and map checks; a number on the button means problems"},{keys:["Sky"],text:"Opens the sky settings; they stay open until you click Sky again"}]}],qx={zh:Wx,en:Yx};function Zx(n){const t=n.toLowerCase();if(t==="1–4")return["1","2","3","4"];if(t==="home")return["home"];if(t==="0–9")return["1","2","3","4","5","6","7","8","9","0"];if(t==="方向键"||t==="arrow")return["up","down","left","right"];const e={"↑":"up","↓":"down","←":"left","→":"right"};if(e[n])return[e[n]];if(t==="delete")return["delete","backspace"];if(t==="ctrl"||t==="shift"||t==="esc")return[t];if(/^[a-z?]$/.test(t))return[t];const i=/(?:按住|hold)\s*([a-z])$/.exec(t);return i?[i[1]]:[]}const $x={q:"mode",w:"mode",e:"mode",r:"mode",b:"mode",v:"move",o:"undo",g:"edit",s:"edit",f:"edit",m:"edit",d:"edit",c:"edit",delete:"edit",backspace:"edit",1:"edit",2:"edit",3:"edit",4:"edit",5:"edit",6:"edit",7:"edit",8:"edit",9:"edit",0:"edit",z:"undo",y:"undo",a:"undo",up:"move",down:"move",left:"move",right:"move",esc:"move","?":"move",shift:"mod",ctrl:"mod"},Kx=[[["esc","Esc",1.25],["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["0","0"],["backspace","⌫",1.75]],[["tab","Tab",1.5],["q","Q"],["w","W"],["e","E"],["r","R"],["t","T"],["y","Y"],["u","U"],["i","I"],["o","O"],["p","P"],["delete","Del",1.5]],[["caps","Caps",1.75],["a","A"],["s","S"],["d","D"],["f","F"],["g","G"],["h","H"],["j","J"],["k","K"],["l","L"],["enter","Enter",2.25]],[["shift","Shift",2.25],["z","Z"],["x","X"],["c","C"],["v","V"],["b","B"],["n","N"],["m","M"],[",",","],[".","."],["?","?"],["shift","Shift",1.75]],[["ctrl","Ctrl",1.5],["alt","Alt",1.25],["space","",6.25],["alt","Alt",1.25],["ctrl","Ctrl",1.5]]];function Jx(){const n=document.createElement("div");n.className="kb";const t=document.createElement("div");t.className="kb-main";for(const i of Kx){const r=document.createElement("div");r.className="kb-row";for(const[o,c,l]of i){const u=document.createElement("div");u.className="kb-key",u.dataset.key=o,u.style.flexGrow=String(l??1),u.textContent=c;const f=$x[o];f&&u.classList.add("used",`g-${f}`),r.append(u)}t.append(r)}const e=document.createElement("div");e.className="kb-arrows";for(const[i,r]of[["up","↑"],["left","←"],["down","↓"],["right","→"]]){const o=document.createElement("div");o.className=`kb-key used g-move k-${i}`,o.dataset.key=i,o.textContent=r,e.append(o)}return n.append(t,e),n}let Cn=null;function jx(){return!!Cn}function To(){Cn==null||Cn.remove(),Cn=null}function L0(n){To();const t=wr[n];Cn=document.createElement("div"),Cn.className="sheet-backdrop",Cn.addEventListener("click",u=>{u.target===Cn&&To()});const e=document.createElement("div");e.className="sheet";const i=document.createElement("header");i.innerHTML='<div><h2></h2><p></p></div><button class="icon-btn close" aria-label="close">✕</button>',i.querySelector("h2").textContent=t.sheetTitle,i.querySelector("p").textContent=t.sheetSub,i.querySelector("button").addEventListener("click",To);const r=Jx(),o=document.createElement("div");o.className="kb-legend";const c=n==="zh"?[["mode","模式"],["edit","编辑选中的东西"],["undo","撤销 / 全选（配合 Ctrl）"],["move","微调 / 取消"],["mod","修饰键"]]:[["mode","Modes"],["edit","Edit the selection"],["undo","Undo / select all (with Ctrl)"],["move","Nudge / cancel"],["mod","Modifiers"]];for(const[u,f]of c){const p=document.createElement("span");p.innerHTML=`<i class="dot g-${u}"></i>`,p.append(f),o.append(p)}const l=document.createElement("div");l.className="sheet-cards";for(const u of qx[n]){const f=document.createElement("section");f.className="card";const p=document.createElement("h3");if(p.textContent=u.title,f.append(p),u.note){const m=document.createElement("p");m.className="card-note",m.textContent=u.note,f.append(m)}for(const m of u.items){const g=document.createElement("div");g.className="card-row";const v=document.createElement("span");v.className="keys";for(const _ of m.keys){const y=document.createElement("kbd");(_.length>6||/[一-鿿]{3,}/.test(_))&&(y.className="wide"),y.textContent=_,v.append(y)}const M=document.createElement("span");M.className="text",M.textContent=m.text,g.append(v,M);const S=m.keys.flatMap(Zx);g.addEventListener("mouseenter",()=>{for(const _ of S)r.querySelectorAll(`[data-key="${CSS.escape(_)}"]`).forEach(y=>y.classList.add("lit"));r.classList.toggle("focus",S.length>0)}),g.addEventListener("mouseleave",()=>{r.querySelectorAll(".lit").forEach(_=>_.classList.remove("lit")),r.classList.remove("focus")}),f.append(g)}l.append(f)}e.append(i,r,o,l),Cn.append(e),document.body.append(Cn)}const R0="skyturns-editor-tour-v1";function Qx(){try{return localStorage.getItem(R0)==="1"}catch{return!1}}function ty(){try{localStorage.setItem(R0,"1")}catch{}}function D0(n){const t=wr[n],e=t.tourSteps.filter(f=>document.querySelector(f.target));if(!e.length)return;const i=document.createElement("div");i.className="tour";const r=document.createElement("div");r.className="tour-spot";const o=document.createElement("div");o.className="tour-card",i.append(r,o),document.body.append(i);let c=0;const l=()=>{i.remove(),ty(),window.removeEventListener("resize",u)},u=()=>{const f=e[c],p=document.querySelector(f.target).getBoundingClientRect(),m=6;Object.assign(r.style,{left:`${p.left-m}px`,top:`${p.top-m}px`,width:`${p.width+2*m}px`,height:`${p.height+2*m}px`}),o.innerHTML="";const g=document.createElement("div");g.className="tour-count",g.textContent=`${c+1} / ${e.length}`;const v=document.createElement("h3");v.textContent=f.title;const M=document.createElement("p");M.textContent=f.body;const S=document.createElement("div");S.className="tour-actions";const _=document.createElement("button");_.className="ghost",_.textContent=t.skip,_.onclick=l;const y=document.createElement("button");y.className="primary",y.textContent=c===e.length-1?t.done:t.next,y.onclick=()=>{c===e.length-1?l():(c++,u())},S.append(_,y),o.append(g,v,M,S);const P=300,b=o.offsetHeight||170,I=14;let z=p.right+I,F=p.top;z+P>innerWidth-12&&(z=p.left-P-I),z<12&&(z=Math.min(Math.max(12,p.left),innerWidth-P-12),F=p.bottom+I),F+b>innerHeight-12&&(F=Math.max(12,p.top-b-I)),p.height>innerHeight*.6&&(F=p.top+40),Object.assign(o.style,{left:`${z}px`,top:`${F}px`,width:`${P}px`})};window.addEventListener("resize",u),u()}function ey(n){const t=n.length;let e=0,i=0;for(;i<t;){let r=n.charCodeAt(i++);if(r&4294967168)if(!(r&4294965248))e+=2;else{if(r>=55296&&r<=56319&&i<t){const o=n.charCodeAt(i);(o&64512)===56320&&(++i,r=((r&1023)<<10)+(o&1023)+65536)}r&4294901760?e+=4:e+=3}else{e++;continue}}return e}function ny(n,t,e){const i=n.length;let r=e,o=0;for(;o<i;){let c=n.charCodeAt(o++);if(c&4294967168)if(!(c&4294965248))t[r++]=c>>6&31|192;else{if(c>=55296&&c<=56319&&o<i){const l=n.charCodeAt(o);(l&64512)===56320&&(++o,c=((c&1023)<<10)+(l&1023)+65536)}c&4294901760?(t[r++]=c>>18&7|240,t[r++]=c>>12&63|128,t[r++]=c>>6&63|128):(t[r++]=c>>12&15|224,t[r++]=c>>6&63|128)}else{t[r++]=c;continue}t[r++]=c&63|128}}const iy=new TextEncoder,sy=50;function ry(n,t,e){iy.encodeInto(n,t.subarray(e))}function oy(n,t,e){n.length>sy?ry(n,t,e):ny(n,t,e)}const ay=4096;function N0(n,t,e){let i=t;const r=i+e,o=[];let c="";for(;i<r;){const l=n[i++];if(!(l&128))o.push(l);else if((l&224)===192){const u=n[i++]&63;o.push((l&31)<<6|u)}else if((l&240)===224){const u=n[i++]&63,f=n[i++]&63;o.push((l&31)<<12|u<<6|f)}else if((l&248)===240){const u=n[i++]&63,f=n[i++]&63,p=n[i++]&63;let m=(l&7)<<18|u<<12|f<<6|p;m>65535&&(m-=65536,o.push(m>>>10&1023|55296),m=56320|m&1023),o.push(m)}else o.push(l);o.length>=ay&&(c+=String.fromCharCode(...o),o.length=0)}return o.length>0&&(c+=String.fromCharCode(...o)),c}const ly=new TextDecoder,cy=200;function hy(n,t,e){const i=n.subarray(t,t+e);return ly.decode(i)}function uy(n,t,e){return e>cy?hy(n,t,e):N0(n,t,e)}class go{constructor(t,e){gt(this,"type");gt(this,"data");this.type=t,this.data=e}}class _n extends Error{constructor(t){super(t);const e=Object.create(_n.prototype);Object.setPrototypeOf(this,e),Object.defineProperty(this,"name",{configurable:!0,enumerable:!1,value:_n.name})}}const nr=4294967295;function fy(n,t,e){const i=e/4294967296,r=e;n.setUint32(t,i),n.setUint32(t+4,r)}function U0(n,t,e){const i=Math.floor(e/4294967296),r=e;n.setUint32(t,i),n.setUint32(t+4,r)}function O0(n,t){const e=n.getInt32(t),i=n.getUint32(t+4);return e*4294967296+i}function dy(n,t){const e=n.getUint32(t),i=n.getUint32(t+4);return e*4294967296+i}const py=-1,my=4294967296-1,gy=17179869184-1;function vy({sec:n,nsec:t}){if(n>=0&&t>=0&&n<=gy)if(t===0&&n<=my){const e=new Uint8Array(4);return new DataView(e.buffer).setUint32(0,n),e}else{const e=n/4294967296,i=n&4294967295,r=new Uint8Array(8),o=new DataView(r.buffer);return o.setUint32(0,t<<2|e&3),o.setUint32(4,i),r}else{const e=new Uint8Array(12),i=new DataView(e.buffer);return i.setUint32(0,t),U0(i,4,n),e}}function _y(n){const t=n.getTime(),e=Math.floor(t/1e3),i=(t-e*1e3)*1e6,r=Math.floor(i/1e9);return{sec:e+r,nsec:i-r*1e9}}function xy(n){if(n instanceof Date){const t=_y(n);return vy(t)}else return null}function yy(n){const t=new DataView(n.buffer,n.byteOffset,n.byteLength);switch(n.byteLength){case 4:return{sec:t.getUint32(0),nsec:0};case 8:{const e=t.getUint32(0),i=t.getUint32(4),r=(e&3)*4294967296+i,o=e>>>2;return{sec:r,nsec:o}}case 12:{const e=O0(t,4),i=t.getUint32(0);return{sec:e,nsec:i}}default:throw new _n(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${n.length}`)}}function Sy(n){const t=yy(n);return new Date(t.sec*1e3+t.nsec/1e6)}const My={type:py,encode:xy,decode:Sy},ko=class ko{constructor(){gt(this,"__brand");gt(this,"builtInEncoders",[]);gt(this,"builtInDecoders",[]);gt(this,"encoders",[]);gt(this,"decoders",[]);this.register(My)}register({type:t,encode:e,decode:i}){if(t>=0)this.encoders[t]=e,this.decoders[t]=i;else{const r=-1-t;this.builtInEncoders[r]=e,this.builtInDecoders[r]=i}}tryToEncode(t,e){for(let i=0;i<this.builtInEncoders.length;i++){const r=this.builtInEncoders[i];if(r!=null){const o=r(t,e);if(o!=null){const c=-1-i;return new go(c,o)}}}for(let i=0;i<this.encoders.length;i++){const r=this.encoders[i];if(r!=null){const o=r(t,e);if(o!=null){const c=i;return new go(c,o)}}}return t instanceof go?t:null}decode(t,e,i){const r=e<0?this.builtInDecoders[-1-e]:this.decoders[e];return r?r(t,e,i):new go(e,t)}};gt(ko,"defaultCodec",new ko);let Uo=ko;function Ey(n){return n instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&n instanceof SharedArrayBuffer}function Kl(n){return n instanceof Uint8Array?n:ArrayBuffer.isView(n)?new Uint8Array(n.buffer,n.byteOffset,n.byteLength):Ey(n)?new Uint8Array(n):Uint8Array.from(n)}const wy=100,by=2048;class wc{constructor(t){gt(this,"extensionCodec");gt(this,"context");gt(this,"useBigInt64");gt(this,"maxDepth");gt(this,"initialBufferSize");gt(this,"sortKeys");gt(this,"forceFloat32");gt(this,"ignoreUndefined");gt(this,"forceIntegerToFloat");gt(this,"pos");gt(this,"view");gt(this,"bytes");gt(this,"entered",!1);this.extensionCodec=(t==null?void 0:t.extensionCodec)??Uo.defaultCodec,this.context=t==null?void 0:t.context,this.useBigInt64=(t==null?void 0:t.useBigInt64)??!1,this.maxDepth=(t==null?void 0:t.maxDepth)??wy,this.initialBufferSize=(t==null?void 0:t.initialBufferSize)??by,this.sortKeys=(t==null?void 0:t.sortKeys)??!1,this.forceFloat32=(t==null?void 0:t.forceFloat32)??!1,this.ignoreUndefined=(t==null?void 0:t.ignoreUndefined)??!1,this.forceIntegerToFloat=(t==null?void 0:t.forceIntegerToFloat)??!1,this.pos=0,this.view=new DataView(new ArrayBuffer(this.initialBufferSize)),this.bytes=new Uint8Array(this.view.buffer)}clone(){return new wc({extensionCodec:this.extensionCodec,context:this.context,useBigInt64:this.useBigInt64,maxDepth:this.maxDepth,initialBufferSize:this.initialBufferSize,sortKeys:this.sortKeys,forceFloat32:this.forceFloat32,ignoreUndefined:this.ignoreUndefined,forceIntegerToFloat:this.forceIntegerToFloat})}reinitializeState(){this.pos=0}encodeSharedRef(t){if(this.entered)return this.clone().encodeSharedRef(t);try{return this.entered=!0,this.reinitializeState(),this.doEncode(t,1),this.bytes.subarray(0,this.pos)}finally{this.entered=!1}}encode(t){if(this.entered)return this.clone().encode(t);try{return this.entered=!0,this.reinitializeState(),this.doEncode(t,1),this.bytes.slice(0,this.pos)}finally{this.entered=!1}}doEncode(t,e){if(e>this.maxDepth)throw new Error(`Too deep objects in depth ${e}`);t==null?this.encodeNil():typeof t=="boolean"?this.encodeBoolean(t):typeof t=="number"?this.forceIntegerToFloat?this.encodeNumberAsFloat(t):this.encodeNumber(t):typeof t=="string"?this.encodeString(t):this.useBigInt64&&typeof t=="bigint"?this.encodeBigInt64(t):this.encodeObject(t,e)}ensureBufferSizeToWrite(t){const e=this.pos+t;this.view.byteLength<e&&this.resizeBuffer(e*2)}resizeBuffer(t){const e=new ArrayBuffer(t),i=new Uint8Array(e),r=new DataView(e);i.set(this.bytes),this.view=r,this.bytes=i}encodeNil(){this.writeU8(192)}encodeBoolean(t){t===!1?this.writeU8(194):this.writeU8(195)}encodeNumber(t){!this.forceIntegerToFloat&&Number.isSafeInteger(t)?t>=0?t<128?this.writeU8(t):t<256?(this.writeU8(204),this.writeU8(t)):t<65536?(this.writeU8(205),this.writeU16(t)):t<4294967296?(this.writeU8(206),this.writeU32(t)):this.useBigInt64?this.encodeNumberAsFloat(t):(this.writeU8(207),this.writeU64(t)):t>=-32?this.writeU8(224|t+32):t>=-128?(this.writeU8(208),this.writeI8(t)):t>=-32768?(this.writeU8(209),this.writeI16(t)):t>=-2147483648?(this.writeU8(210),this.writeI32(t)):this.useBigInt64?this.encodeNumberAsFloat(t):(this.writeU8(211),this.writeI64(t)):this.encodeNumberAsFloat(t)}encodeNumberAsFloat(t){this.forceFloat32?(this.writeU8(202),this.writeF32(t)):(this.writeU8(203),this.writeF64(t))}encodeBigInt64(t){t>=BigInt(0)?(this.writeU8(207),this.writeBigUint64(t)):(this.writeU8(211),this.writeBigInt64(t))}writeStringHeader(t){if(t<32)this.writeU8(160+t);else if(t<256)this.writeU8(217),this.writeU8(t);else if(t<65536)this.writeU8(218),this.writeU16(t);else if(t<4294967296)this.writeU8(219),this.writeU32(t);else throw new Error(`Too long string: ${t} bytes in UTF-8`)}encodeString(t){const i=ey(t);this.ensureBufferSizeToWrite(5+i),this.writeStringHeader(i),oy(t,this.bytes,this.pos),this.pos+=i}encodeObject(t,e){const i=this.extensionCodec.tryToEncode(t,this.context);if(i!=null)this.encodeExtension(i);else if(Array.isArray(t))this.encodeArray(t,e);else if(ArrayBuffer.isView(t))this.encodeBinary(t);else if(typeof t=="object")this.encodeMap(t,e);else throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(t)}`)}encodeBinary(t){const e=t.byteLength;if(e<256)this.writeU8(196),this.writeU8(e);else if(e<65536)this.writeU8(197),this.writeU16(e);else if(e<4294967296)this.writeU8(198),this.writeU32(e);else throw new Error(`Too large binary: ${e}`);const i=Kl(t);this.writeU8a(i)}encodeArray(t,e){const i=t.length;if(i<16)this.writeU8(144+i);else if(i<65536)this.writeU8(220),this.writeU16(i);else if(i<4294967296)this.writeU8(221),this.writeU32(i);else throw new Error(`Too large array: ${i}`);for(const r of t)this.doEncode(r,e+1)}countWithoutUndefined(t,e){let i=0;for(const r of e)t[r]!==void 0&&i++;return i}encodeMap(t,e){const i=Object.keys(t);this.sortKeys&&i.sort();const r=this.ignoreUndefined?this.countWithoutUndefined(t,i):i.length;if(r<16)this.writeU8(128+r);else if(r<65536)this.writeU8(222),this.writeU16(r);else if(r<4294967296)this.writeU8(223),this.writeU32(r);else throw new Error(`Too large map object: ${r}`);for(const o of i){const c=t[o];this.ignoreUndefined&&c===void 0||(this.encodeString(o),this.doEncode(c,e+1))}}encodeExtension(t){if(typeof t.data=="function"){const i=t.data(this.pos+6),r=i.length;if(r>=4294967296)throw new Error(`Too large extension object: ${r}`);this.writeU8(201),this.writeU32(r),this.writeI8(t.type),this.writeU8a(i);return}const e=t.data.length;if(e===1)this.writeU8(212);else if(e===2)this.writeU8(213);else if(e===4)this.writeU8(214);else if(e===8)this.writeU8(215);else if(e===16)this.writeU8(216);else if(e<256)this.writeU8(199),this.writeU8(e);else if(e<65536)this.writeU8(200),this.writeU16(e);else if(e<4294967296)this.writeU8(201),this.writeU32(e);else throw new Error(`Too large extension object: ${e}`);this.writeI8(t.type),this.writeU8a(t.data)}writeU8(t){this.ensureBufferSizeToWrite(1),this.view.setUint8(this.pos,t),this.pos++}writeU8a(t){const e=t.length;this.ensureBufferSizeToWrite(e),this.bytes.set(t,this.pos),this.pos+=e}writeI8(t){this.ensureBufferSizeToWrite(1),this.view.setInt8(this.pos,t),this.pos++}writeU16(t){this.ensureBufferSizeToWrite(2),this.view.setUint16(this.pos,t),this.pos+=2}writeI16(t){this.ensureBufferSizeToWrite(2),this.view.setInt16(this.pos,t),this.pos+=2}writeU32(t){this.ensureBufferSizeToWrite(4),this.view.setUint32(this.pos,t),this.pos+=4}writeI32(t){this.ensureBufferSizeToWrite(4),this.view.setInt32(this.pos,t),this.pos+=4}writeF32(t){this.ensureBufferSizeToWrite(4),this.view.setFloat32(this.pos,t),this.pos+=4}writeF64(t){this.ensureBufferSizeToWrite(8),this.view.setFloat64(this.pos,t),this.pos+=8}writeU64(t){this.ensureBufferSizeToWrite(8),fy(this.view,this.pos,t),this.pos+=8}writeI64(t){this.ensureBufferSizeToWrite(8),U0(this.view,this.pos,t),this.pos+=8}writeBigUint64(t){this.ensureBufferSizeToWrite(8),this.view.setBigUint64(this.pos,t),this.pos+=8}writeBigInt64(t){this.ensureBufferSizeToWrite(8),this.view.setBigInt64(this.pos,t),this.pos+=8}}function Ty(n,t){return new wc(t).encodeSharedRef(n)}function $a(n){return`${n<0?"-":""}0x${Math.abs(n).toString(16).padStart(2,"0")}`}const Ay=16,Py=16;class Cy{constructor(t=Ay,e=Py){gt(this,"hit",0);gt(this,"miss",0);gt(this,"caches");gt(this,"maxKeyLength");gt(this,"maxLengthPerKey");this.maxKeyLength=t,this.maxLengthPerKey=e,this.caches=[];for(let i=0;i<this.maxKeyLength;i++)this.caches.push([])}canBeCached(t){return t>0&&t<=this.maxKeyLength}find(t,e,i){const r=this.caches[i-1];t:for(const o of r){const c=o.bytes;for(let l=0;l<i;l++)if(c[l]!==t[e+l])continue t;return o.str}return null}store(t,e){const i=this.caches[t.length-1],r={bytes:t,str:e};i.length>=this.maxLengthPerKey?i[Math.random()*i.length|0]=r:i.push(r)}decode(t,e,i){const r=this.find(t,e,i);if(r!=null)return this.hit++,r;this.miss++;const o=N0(t,e,i),c=Uint8Array.prototype.slice.call(t,e,e+i);return this.store(c,o),o}}const Jl="array",hr="map_key",F0="map_value",Iy=n=>{if(typeof n=="string"||typeof n=="number")return n;throw new _n("The type of key must be string or number but "+typeof n)};class Ly{constructor(){gt(this,"stack",[]);gt(this,"stackHeadPosition",-1)}get length(){return this.stackHeadPosition+1}top(){return this.stack[this.stackHeadPosition]}pushArrayState(t){const e=this.getUninitializedStateFromPool();e.type=Jl,e.position=0,e.size=t,e.array=new Array(t)}pushMapState(t){const e=this.getUninitializedStateFromPool();e.type=hr,e.readCount=0,e.size=t,e.map={}}getUninitializedStateFromPool(){if(this.stackHeadPosition++,this.stackHeadPosition===this.stack.length){const t={type:void 0,size:0,array:void 0,position:0,readCount:0,map:void 0,key:null};this.stack.push(t)}return this.stack[this.stackHeadPosition]}release(t){if(this.stack[this.stackHeadPosition]!==t)throw new Error("Invalid stack state. Released state is not on top of the stack.");if(t.type===Jl){const i=t;i.size=0,i.array=void 0,i.position=0,i.type=void 0}if(t.type===hr||t.type===F0){const i=t;i.size=0,i.map=void 0,i.readCount=0,i.type=void 0}this.stackHeadPosition--}reset(){this.stack.length=0,this.stackHeadPosition=-1}}const ir=-1,bc=new DataView(new ArrayBuffer(0)),Ry=new Uint8Array(bc.buffer);try{bc.getInt8(0)}catch(n){if(!(n instanceof RangeError))throw new Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access")}const vu=new RangeError("Insufficient data"),Dy=new Cy;class Tc{constructor(t){gt(this,"extensionCodec");gt(this,"context");gt(this,"useBigInt64");gt(this,"rawStrings");gt(this,"maxStrLength");gt(this,"maxBinLength");gt(this,"maxArrayLength");gt(this,"maxMapLength");gt(this,"maxExtLength");gt(this,"keyDecoder");gt(this,"mapKeyConverter");gt(this,"totalPos",0);gt(this,"pos",0);gt(this,"view",bc);gt(this,"bytes",Ry);gt(this,"headByte",ir);gt(this,"stack",new Ly);gt(this,"entered",!1);this.extensionCodec=(t==null?void 0:t.extensionCodec)??Uo.defaultCodec,this.context=t==null?void 0:t.context,this.useBigInt64=(t==null?void 0:t.useBigInt64)??!1,this.rawStrings=(t==null?void 0:t.rawStrings)??!1,this.maxStrLength=(t==null?void 0:t.maxStrLength)??nr,this.maxBinLength=(t==null?void 0:t.maxBinLength)??nr,this.maxArrayLength=(t==null?void 0:t.maxArrayLength)??nr,this.maxMapLength=(t==null?void 0:t.maxMapLength)??nr,this.maxExtLength=(t==null?void 0:t.maxExtLength)??nr,this.keyDecoder=(t==null?void 0:t.keyDecoder)!==void 0?t.keyDecoder:Dy,this.mapKeyConverter=(t==null?void 0:t.mapKeyConverter)??Iy}clone(){return new Tc({extensionCodec:this.extensionCodec,context:this.context,useBigInt64:this.useBigInt64,rawStrings:this.rawStrings,maxStrLength:this.maxStrLength,maxBinLength:this.maxBinLength,maxArrayLength:this.maxArrayLength,maxMapLength:this.maxMapLength,maxExtLength:this.maxExtLength,keyDecoder:this.keyDecoder})}reinitializeState(){this.totalPos=0,this.headByte=ir,this.stack.reset()}setBuffer(t){const e=Kl(t);this.bytes=e,this.view=new DataView(e.buffer,e.byteOffset,e.byteLength),this.pos=0}appendBuffer(t){if(this.headByte===ir&&!this.hasRemaining(1))this.setBuffer(t);else{const e=this.bytes.subarray(this.pos),i=Kl(t),r=new Uint8Array(e.length+i.length);r.set(e),r.set(i,e.length),this.setBuffer(r)}}hasRemaining(t){return this.view.byteLength-this.pos>=t}createExtraByteError(t){const{view:e,pos:i}=this;return new RangeError(`Extra ${e.byteLength-i} of ${e.byteLength} byte(s) found at buffer[${t}]`)}decode(t){if(this.entered)return this.clone().decode(t);try{this.entered=!0,this.reinitializeState(),this.setBuffer(t);const e=this.doDecodeSync();if(this.hasRemaining(1))throw this.createExtraByteError(this.pos);return e}finally{this.entered=!1}}*decodeMulti(t){if(this.entered){yield*this.clone().decodeMulti(t);return}try{for(this.entered=!0,this.reinitializeState(),this.setBuffer(t);this.hasRemaining(1);)yield this.doDecodeSync()}finally{this.entered=!1}}async decodeAsync(t){if(this.entered)return this.clone().decodeAsync(t);try{this.entered=!0;let e=!1,i;for await(const l of t){if(e)throw this.entered=!1,this.createExtraByteError(this.totalPos);this.appendBuffer(l);try{i=this.doDecodeSync(),e=!0}catch(u){if(!(u instanceof RangeError))throw u}this.totalPos+=this.pos}if(e){if(this.hasRemaining(1))throw this.createExtraByteError(this.totalPos);return i}const{headByte:r,pos:o,totalPos:c}=this;throw new RangeError(`Insufficient data in parsing ${$a(r)} at ${c} (${o} in the current buffer)`)}finally{this.entered=!1}}decodeArrayStream(t){return this.decodeMultiAsync(t,!0)}decodeStream(t){return this.decodeMultiAsync(t,!1)}async*decodeMultiAsync(t,e){if(this.entered){yield*this.clone().decodeMultiAsync(t,e);return}try{this.entered=!0;let i=e,r=-1;for await(const o of t){if(e&&r===0)throw this.createExtraByteError(this.totalPos);this.appendBuffer(o),i&&(r=this.readArraySize(),i=!1,this.complete());try{for(;yield this.doDecodeSync(),--r!==0;);}catch(c){if(!(c instanceof RangeError))throw c}this.totalPos+=this.pos}}finally{this.entered=!1}}doDecodeSync(){t:for(;;){const t=this.readHeadByte();let e;if(t>=224)e=t-256;else if(t<192)if(t<128)e=t;else if(t<144){const r=t-128;if(r!==0){this.pushMapState(r),this.complete();continue t}else e={}}else if(t<160){const r=t-144;if(r!==0){this.pushArrayState(r),this.complete();continue t}else e=[]}else{const r=t-160;e=this.decodeString(r,0)}else if(t===192)e=null;else if(t===194)e=!1;else if(t===195)e=!0;else if(t===202)e=this.readF32();else if(t===203)e=this.readF64();else if(t===204)e=this.readU8();else if(t===205)e=this.readU16();else if(t===206)e=this.readU32();else if(t===207)this.useBigInt64?e=this.readU64AsBigInt():e=this.readU64();else if(t===208)e=this.readI8();else if(t===209)e=this.readI16();else if(t===210)e=this.readI32();else if(t===211)this.useBigInt64?e=this.readI64AsBigInt():e=this.readI64();else if(t===217){const r=this.lookU8();e=this.decodeString(r,1)}else if(t===218){const r=this.lookU16();e=this.decodeString(r,2)}else if(t===219){const r=this.lookU32();e=this.decodeString(r,4)}else if(t===220){const r=this.readU16();if(r!==0){this.pushArrayState(r),this.complete();continue t}else e=[]}else if(t===221){const r=this.readU32();if(r!==0){this.pushArrayState(r),this.complete();continue t}else e=[]}else if(t===222){const r=this.readU16();if(r!==0){this.pushMapState(r),this.complete();continue t}else e={}}else if(t===223){const r=this.readU32();if(r!==0){this.pushMapState(r),this.complete();continue t}else e={}}else if(t===196){const r=this.lookU8();e=this.decodeBinary(r,1)}else if(t===197){const r=this.lookU16();e=this.decodeBinary(r,2)}else if(t===198){const r=this.lookU32();e=this.decodeBinary(r,4)}else if(t===212)e=this.decodeExtension(1,0);else if(t===213)e=this.decodeExtension(2,0);else if(t===214)e=this.decodeExtension(4,0);else if(t===215)e=this.decodeExtension(8,0);else if(t===216)e=this.decodeExtension(16,0);else if(t===199){const r=this.lookU8();e=this.decodeExtension(r,1)}else if(t===200){const r=this.lookU16();e=this.decodeExtension(r,2)}else if(t===201){const r=this.lookU32();e=this.decodeExtension(r,4)}else throw new _n(`Unrecognized type byte: ${$a(t)}`);this.complete();const i=this.stack;for(;i.length>0;){const r=i.top();if(r.type===Jl)if(r.array[r.position]=e,r.position++,r.position===r.size)e=r.array,i.release(r);else continue t;else if(r.type===hr){if(e==="__proto__")throw new _n("The key __proto__ is not allowed");r.key=this.mapKeyConverter(e),r.type=F0;continue t}else if(r.map[r.key]=e,r.readCount++,r.readCount===r.size)e=r.map,i.release(r);else{r.key=null,r.type=hr;continue t}}return e}}readHeadByte(){return this.headByte===ir&&(this.headByte=this.readU8()),this.headByte}complete(){this.headByte=ir}readArraySize(){const t=this.readHeadByte();switch(t){case 220:return this.readU16();case 221:return this.readU32();default:{if(t<160)return t-144;throw new _n(`Unrecognized array type byte: ${$a(t)}`)}}}pushMapState(t){if(t>this.maxMapLength)throw new _n(`Max length exceeded: map length (${t}) > maxMapLengthLength (${this.maxMapLength})`);this.stack.pushMapState(t)}pushArrayState(t){if(t>this.maxArrayLength)throw new _n(`Max length exceeded: array length (${t}) > maxArrayLength (${this.maxArrayLength})`);this.stack.pushArrayState(t)}decodeString(t,e){return!this.rawStrings||this.stateIsMapKey()?this.decodeUtf8String(t,e):this.decodeBinary(t,e)}decodeUtf8String(t,e){var o;if(t>this.maxStrLength)throw new _n(`Max length exceeded: UTF-8 byte length (${t}) > maxStrLength (${this.maxStrLength})`);if(this.bytes.byteLength<this.pos+e+t)throw vu;const i=this.pos+e;let r;return this.stateIsMapKey()&&((o=this.keyDecoder)!=null&&o.canBeCached(t))?r=this.keyDecoder.decode(this.bytes,i,t):r=uy(this.bytes,i,t),this.pos+=e+t,r}stateIsMapKey(){return this.stack.length>0?this.stack.top().type===hr:!1}decodeBinary(t,e){if(t>this.maxBinLength)throw new _n(`Max length exceeded: bin length (${t}) > maxBinLength (${this.maxBinLength})`);if(!this.hasRemaining(t+e))throw vu;const i=this.pos+e,r=this.bytes.subarray(i,i+t);return this.pos+=e+t,r}decodeExtension(t,e){if(t>this.maxExtLength)throw new _n(`Max length exceeded: ext length (${t}) > maxExtLength (${this.maxExtLength})`);const i=this.view.getInt8(this.pos+e),r=this.decodeBinary(t,e+1);return this.extensionCodec.decode(r,i,this.context)}lookU8(){return this.view.getUint8(this.pos)}lookU16(){return this.view.getUint16(this.pos)}lookU32(){return this.view.getUint32(this.pos)}readU8(){const t=this.view.getUint8(this.pos);return this.pos++,t}readI8(){const t=this.view.getInt8(this.pos);return this.pos++,t}readU16(){const t=this.view.getUint16(this.pos);return this.pos+=2,t}readI16(){const t=this.view.getInt16(this.pos);return this.pos+=2,t}readU32(){const t=this.view.getUint32(this.pos);return this.pos+=4,t}readI32(){const t=this.view.getInt32(this.pos);return this.pos+=4,t}readU64(){const t=dy(this.view,this.pos);return this.pos+=8,t}readI64(){const t=O0(this.view,this.pos);return this.pos+=8,t}readU64AsBigInt(){const t=this.view.getBigUint64(this.pos);return this.pos+=8,t}readI64AsBigInt(){const t=this.view.getBigInt64(this.pos);return this.pos+=8,t}readF32(){const t=this.view.getFloat32(this.pos);return this.pos+=4,t}readF64(){const t=this.view.getFloat64(this.pos);return this.pos+=8,t}}function Ny(n,t){return new Tc(t).decode(n)}const Uy="https://api.skyturns.dpdns.org",_u="skyturns-editor-server",Zo="skyturns-editor-session";class Oo extends Error{constructor(t,e){super(e),this.code=t}}const B0=n=>{try{return localStorage.getItem(n)}catch{return null}},$o=(n,t)=>{try{t===null?localStorage.removeItem(n):localStorage.setItem(n,t)}catch{}};function Ac(){const n=new URLSearchParams(location.search).get("server");return n&&$o(_u,n),(n||B0(_u)||Uy).replace(/\/+$/,"")}function ks(){const n=B0(Zo);if(!n)return null;try{return JSON.parse(n)}catch{return null}}async function zs(n,t={}){let e;try{e=await fetch(`${Ac()}/api/v1`,{method:"POST",headers:{"Content-Type":"application/octet-stream"},body:Ty({api:n,...t})})}catch{throw new Oo("network","network")}const i=Ny(new Uint8Array(await e.arrayBuffer()));if(i.status!=="ok"){const r=i.error??{code:"error",message:`HTTP ${e.status}`};throw(r.code==="invalid_session"||r.code==="auth_required")&&$o(Zo,null),new Oo(r.code,r.message)}return i.body}const Ko=(n={})=>{const t=ks();if(!t)throw new Oo("auth_required","Login required");return{authToken:t.token,...n}};async function Oy(n,t){const e=await zs("auth_login",{username:n,password:t,clientLabel:"PC map editor"}),i={token:e.authToken,user:e.user};return $o(Zo,JSON.stringify(i)),i}async function Fy(){const n=ks();$o(Zo,null),n&&await zs("auth_logout",{authToken:n.token}).catch(()=>{})}const By=(n,t)=>zs("draft_put",Ko({name:n,level:t})),ky=()=>zs("draft_list",Ko()).then(n=>n.drafts),zy=n=>zs("draft_get",Ko({id:n})),Hy=n=>zs("draft_delete",Ko({id:n})),br={zh:{loginTitle:"登录游戏账号",loginBody:"用手机游戏里的同一个账号登录，草稿会同步到这个账号的手机上。",user:"用户名",pass:"密码",loginBtn:"登录",cancel:"取消",server:"服务器",nameTitle:"给地图起个名字",nameBody:"手机上的草稿用这个名字显示；同名的草稿再次同步会覆盖。",ok:"确定",draftsTitle:"云端草稿",draftsBody:"这些草稿会出现在手机的“创作”里。打开一个可以继续在电脑上编辑。",empty:"还没有云端草稿。编辑好地图后，在“文件 → 同步到手机”。",open:"打开",del:"删除",delAsk:n=>`删除云端草稿“${n}”？手机上已经下载的那份不受影响。`,rev:n=>`第 ${n} 版`,loading:"正在读取…",errors:{network:"连不上服务器，请检查网络。",invalid_credentials:"用户名或密码不对。",auth_required:"需要先登录。",invalid_session:"登录已过期，请重新登录。",too_large:"地图太大，无法同步。",too_many_drafts:"云端草稿太多了，请先删掉一些。",not_found:"这份草稿已经不在了。"}},en:{loginTitle:"Log in with your game account",loginBody:"Use the same account as in the phone game; drafts go to that account's phone.",user:"Username",pass:"Password",loginBtn:"Log in",cancel:"Cancel",server:"Server",nameTitle:"Name this map",nameBody:"The phone lists the draft by this name; syncing the same name again overwrites it.",ok:"OK",draftsTitle:"Cloud drafts",draftsBody:"These drafts appear in the phone's Create page. Open one to keep editing it here.",empty:"No cloud drafts yet. When a map is ready, use File → Sync to phone.",open:"Open",del:"Delete",delAsk:n=>`Delete the cloud draft "${n}"? A copy already on the phone stays.`,rev:n=>`version ${n}`,loading:"Loading…",errors:{network:"Cannot reach the server. Check the connection.",invalid_credentials:"Wrong username or password.",auth_required:"Log in first.",invalid_session:"The login expired. Please log in again.",too_large:"The map is too large to sync.",too_many_drafts:"Too many cloud drafts; delete some first.",not_found:"That draft is gone."}}},Gy=n=>br[n];function ur(n,t){return t instanceof Oo?br[n].errors[t.code]??t.message:String(t)}const ye=(n,t={},...e)=>{const i=Object.assign(document.createElement(n),t);return i.append(...e),i};function Pc(n,t,e,i=!1){return new Promise(r=>{var p;const o=ye("div",{className:"dialog-backdrop"}),c=ye("div",{className:`dialog${i?" wide":""}`},ye("h3",{},n),...t),l=ye("div",{className:"dialog-actions"}),u=m=>{o.remove(),window.removeEventListener("keydown",f,!0),r(m)};for(const m of e){const g=ye("button",{className:m.cls,textContent:m.label});g.addEventListener("click",async()=>{g.disabled=!0;try{const v=await m.value();v!==void 0&&u(v)}finally{g.disabled=!1}}),l.append(g)}e.length&&c.append(l),o.append(c),o.addEventListener("pointerdown",m=>{m.target===o&&u(null)});const f=m=>{var g;m.key==="Escape"&&(m.stopImmediatePropagation(),u(null)),m.key==="Enter"&&m.target.tagName==="INPUT"&&(m.preventDefault(),(g=l.lastElementChild)==null||g.click()),m.stopPropagation()};window.addEventListener("keydown",f,!0),document.body.append(o),(p=c.querySelector("input"))==null||p.focus()})}function Fo(n){const t=br[n],e=ye("input",{type:"text",autocomplete:"username"}),i=ye("input",{type:"password",autocomplete:"current-password"}),r=ye("p",{className:"dialog-error"}),o=ye("p",{className:"dialog-server",textContent:`${t.server}: ${Ac()}`});return Pc(t.loginTitle,[ye("p",{},t.loginBody),ye("label",{className:"field"},ye("span",{},t.user),e),ye("label",{className:"field"},ye("span",{},t.pass),i),r,o],[{label:t.cancel,cls:"ghost",value:()=>!1},{label:t.loginBtn,cls:"primary",value:async()=>{r.textContent="";try{return await Oy(e.value.trim(),i.value),!0}catch(c){r.textContent=ur(n,c);return}}}]).then(c=>c===!0)}function Xy(n,t){const e=br[n],i=ye("input",{type:"text",value:t,maxLength:32});return Pc(e.nameTitle,[ye("p",{},e.nameBody),ye("label",{className:"field"},i)],[{label:e.cancel,cls:"ghost",value:()=>null},{label:e.ok,cls:"primary",value:()=>i.value.trim()?i.value.trim():void 0}]).then(r=>r||null)}async function Vy(n){const t=br[n],e=ye("div",{className:"draft-list"},ye("p",{className:"muted"},t.loading));let i=null,r=null;const o=async()=>{let l;try{l=await ky()}catch(u){e.replaceChildren(ye("p",{className:"dialog-error"},ur(n,u)));return}if(!l.length){e.replaceChildren(ye("p",{className:"muted"},t.empty));return}e.replaceChildren(...l.map(u=>{const f=ye("button",{className:"primary small",textContent:t.open}),p=ye("button",{className:"ghost small",textContent:t.del});return f.addEventListener("click",async()=>{f.disabled=!0;try{const m=await zy(u.id);i={name:m.name,level:m.level},r==null||r()}catch(m){alert(ur(n,m)),f.disabled=!1}}),p.addEventListener("click",async()=>{if(confirm(t.delAsk(u.name)))try{await Hy(u.id),await o()}catch(m){alert(ur(n,m))}}),ye("div",{className:"draft-row"},ye("div",{className:"draft-info"},ye("strong",{},u.name),ye("span",{},`${t.rev(u.revision)} · ${new Date(u.updatedAt*1e3).toLocaleString()}`)),ye("div",{className:"draft-actions"},p,f))}))},c=Pc(t.draftsTitle,[ye("p",{},t.draftsBody),e],[{label:t.cancel,cls:"ghost",value:()=>null}],!0);return r=()=>{var l;return(l=document.querySelector(".dialog-backdrop"))==null?void 0:l.dispatchEvent(new PointerEvent("pointerdown"))},o(),await c,i}const ce=n=>document.querySelector(n),hi=new Dx(ce("#viewport")),Qt=new No(hi,()=>Jo(),n=>Wn(n));let ai=null,Vn="map.json";function k0(){document.documentElement.lang=mn()==="zh"?"zh-CN":"en",document.title=Ct("title"),ce("#app-title").textContent=Ct("title"),document.querySelectorAll("[data-action]").forEach(n=>{if(n.querySelector("[data-text]"))return;const t=Ct(n.dataset.action);n.classList.contains("icon-btn")?(n.title=t,n.setAttribute("aria-label",t)):n.textContent=t}),document.querySelectorAll("[data-view]").forEach(n=>{n.querySelector("[data-text]")||(n.textContent=Ct(n.dataset.view))}),document.querySelectorAll("[data-mode]").forEach(n=>{n.setAttribute("aria-label",wr[mn()].modes[n.dataset.mode].name)}),document.querySelectorAll("[data-text]").forEach(n=>{n.textContent=Ct(n.dataset.text)}),ce("#drop-hint").textContent=Ct("dropHint"),Jo(),Si()}function z0(n){ce("#inspector").classList.toggle("collapsed",n),hi.setInsetRight(n?0:312);try{localStorage.setItem("skyturns-editor-inspector",n?"0":"1")}catch{}}let H0=!1;try{H0=localStorage.getItem("skyturns-editor-inspector")==="0"}catch{}z0(H0);const sr=ce("#mode-card");document.querySelectorAll("#rail [data-mode]").forEach(n=>{n.addEventListener("mouseenter",()=>{const t=wr[mn()].modes[n.dataset.mode];sr.innerHTML="";const e=Ot("div",{className:"mc-head"},Ot("i",{className:`glyph g-${n.dataset.mode}`}),Ot("h4",{},t.name));t.key&&e.append(Ot("kbd",{},t.key)),sr.append(e,Ot("p",{},t.summary),Ot("ul",{},...t.points.map(i=>Ot("li",{},i)))),sr.style.top=`${n.offsetTop-4}px`,sr.classList.add("show")}),n.addEventListener("mouseleave",()=>sr.classList.remove("show"))});function Ka(n,t,e=""){for(const[i,r]of t){const o=Ot("span",{className:`h ${e}`});for(const c of i)o.append(Ot("kbd",{className:c.length>6||/[一-鿿]{2,}/.test(c)?"wide":""},c));o.append(r),n.append(o)}}function Wy(){const n=wr[mn()],t=Qt.context(),e=ce("#hints");e.innerHTML="",Ka(e,n.hint(t)),e.append(Ot("span",{className:"sep"})),e.append(Ot("span",{className:"tail-label"},mn()==="zh"?"视角":"Camera")),Ka(e,n.always.slice(0,-1),"tail"),e.append(Ot("span",{className:"tail-gap"})),Ka(e,n.always.slice(-1),"tail");const i=ce("#mode-chip"),r=n.modes[t.mode];i.innerHTML="",i.append(Ot("i",{className:`glyph g-${t.mode}`}),r.name),t.mode!==Qt.mode&&i.append(Ot("span",{className:"held"},mn()==="zh"?"（按住中）":"(held)"));const o=Ic();ce("#file-name").textContent=o?`${Vn} ●`:Vn,ce("#file-name").classList.toggle("dirty",o),document.title=`${o?"● ":""}${Vn} — ${Ct("title")}`}const Ot=(n,t={},...e)=>{const i=Object.assign(document.createElement(n),t);return i.append(...e),i};function Ri(n,t,e,i="0.05"){const r=Ot("input",{type:"number",step:i,value:String(+t.toFixed(4))});return r.addEventListener("change",()=>{const o=Number(r.value);Number.isFinite(o)&&e(o)}),Ot("div",{className:"row"},Ot("span",{},n),r)}function Yy(){const n=ce("#selection");n.innerHTML="";const t=Qt.selected();if(t.length===0){n.append(Ot("p",{className:"muted"},Ct("nothingSelected")));return}const e=Qt.g;if(n.append(Ot("div",{className:"row"},Ot("strong",{},Ct("selectedCount",{n:t.length})))),t.length===1){const l=t[0];if(l.kind==="node"){const u=Le(e,l.id);n.append(Ot("div",{className:"row muted"},`${Ct("node")} #${l.id} · ${e.nodes.get(l.id).leg}`)),n.append(Ri(Ct("along"),u.x,f=>Qt.setNodeLoc(l.id,{x:f,y:Le(Qt.g,l.id).y}))),n.append(Ri(Ct("height"),u.y,f=>Qt.setNodeLoc(l.id,{x:Le(Qt.g,l.id).x,y:f})))}else if(l.kind==="intersection"){const u=e.intersections.get(l.id);n.append(Ot("div",{className:"row muted"},`${Ct("crossing")} #${l.id} · right#${u.right} × left#${u.left}`)),n.append(Ri(Ct("height"),u.z,f=>Qt.setCrossingHeight(l.id,f)))}else{const u=e.ways.get(l.id);n.append(Ot("div",{className:"row muted"},`${Ct("road")} #${l.id} · ${u.leg}`));const f=Qt.wayEnds(l.id);if(f){const p=Le(e,f.from),m=Le(e,f.to),g=m.x-p.x,v=m.y-p.y,M=Math.hypot(g,v),S=g<0?-1:1,_=Math.atan2(v,Math.abs(g))*180/Math.PI,y=(P,b)=>{const I=b*Math.PI/180;Qt.setWayVector(l.id,{x:S*P*Math.cos(I),y:P*Math.sin(I)})};n.append(Ri(Ct("dAlong"),g,P=>Qt.setWayVector(l.id,{x:P,y:v}))),n.append(Ri(Ct("dHeight"),v,P=>Qt.setWayVector(l.id,{x:g,y:P}))),n.append(Ri(Ct("length"),M,P=>y(Math.max(P,0),_))),n.append(Ri(Ct("slope"),_,P=>y(M,Math.max(-90,Math.min(90,P))),"1"))}}}const i=t.length===1?t[0].kind==="way"?e.ways.get(t[0].id).color:t[0].kind==="intersection"?e.intersections.get(t[0].id).color:void 0:void 0,r=Ot("div",{className:"swatches"});for(const l of[1,2,3,4,5,6,7,8,9,0]){const u=Ot("button",{title:String(l),textContent:String(l)});u.style.background=Su[l],l===i&&u.classList.add("current"),u.addEventListener("click",()=>Qt.setSelectionColor(l)),r.append(u)}n.append(Ot("div",{className:"row"},Ot("span",{},Ct("color")),r));const o=(l,u)=>{const f=/^(.*?)\s*[（(]([^()（）]+)[)）]$/.exec(Ct(l)),p=Ot("button",{},Ot("span",{},f?f[1]:Ct(l)),...f?[Ot("kbd",{},f[2])]:[]);return p.addEventListener("click",u),p},c=(l,u=!1)=>window.dispatchEvent(new KeyboardEvent("keydown",{key:l,shiftKey:u}));n.append(Ot("div",{className:"actions"},o("setStart",()=>c("s")),o("setFinish",()=>c("f")),o("addFinish",()=>c("f",!0)),o("setBoard",()=>c("m")),o("duplicate",()=>Qt.duplicate()),o("delete",()=>Qt.deleteSelection())))}function G0(){const n=ce("#sky");if(!ce("#sky-panel").classList.contains("open")){n.innerHTML="";return}const t=Qt.level.metadata.skySettings??structuredClone(Dr[2]);n.innerHTML="";const e=p=>Qt.applyMeta(m=>{m.skySettings=structuredClone(m.skySettings??t),p(m.skySettings),delete m.skySettings.preset}),i=Ot("select");i.append(Ot("option",{value:"",textContent:Ct("custom")})),Dr.forEach((p,m)=>i.append(Ot("option",{value:String(m),textContent:p.preset})));const r=Dr.findIndex(p=>JSON.stringify(p)===JSON.stringify(t));i.value=r>=0?String(r):"",i.addEventListener("change",()=>{i.value!==""&&Qt.applyMeta(p=>{p.skySettings=structuredClone(Dr[Number(i.value)])})}),n.append(Ot("div",{className:"row"},Ot("span",{},Ct("preset")),i));const o=Ot("div",{className:"preview"});o.style.background=wf(t.skyGradient),n.append(o);const c=(p,m,g)=>{const v=Ao(m()),M=Ot("input",{type:"color",value:Mf(v)});return M.addEventListener("change",()=>e(S=>g(S,Sf(Ef(M.value,v.a))))),Ot("div",{className:"row"},Ot("span",{},p),M)},l=(p,m,g,v)=>{const M=Ot("input",{type:"number",step:String(g),value:String(m)});return M.addEventListener("change",()=>{const S=Number(M.value);Number.isFinite(S)&&e(_=>v(_,S))}),Ot("div",{className:"row"},Ot("span",{},p),M)},u=t.skyGradient;n.append(Ot("h4",{},Ct("gradient")),c(`1 · ${Ct("gradTop")}`,()=>u.color1,(p,m)=>{p.skyGradient.color1=m}),c("2",()=>u.color2,(p,m)=>{p.skyGradient.color2=m}),l(Ct("pos2"),u.pos2,.05,(p,m)=>{p.skyGradient.pos2=Math.min(1,Math.max(0,m))}),c("3",()=>u.color3,(p,m)=>{p.skyGradient.color3=m}),l(Ct("pos3"),u.pos3,.05,(p,m)=>{p.skyGradient.pos3=Math.min(1,Math.max(0,m))}),c(`4 · ${Ct("gradBottom")}`,()=>u.color4,(p,m)=>{p.skyGradient.color4=m}),l(Ct("lightAngle"),t.lightAngle,5,(p,m)=>{p.lightAngle=m}),c(Ct("runnerColor"),()=>t.runnerColor??"rgba(0,0,0,1)",(p,m)=>{p.runnerColor=m}),c(Ct("wayAmbient"),()=>t.way.ambientColor,(p,m)=>{p.way.ambientColor=m}),c(Ct("wayDiffuse"),()=>t.way.diffuseColor,(p,m)=>{p.way.diffuseColor=m}));const f=t.cloud;n.append(Ot("h4",{},Ct("clouds")),l(Ct("cloudSpeed"),f.speed,1,(p,m)=>{p.cloud.speed=m}),l(Ct("cloudDelay"),f.spawnDelay,5,(p,m)=>{p.cloud.spawnDelay=m}),l(Ct("cloudOpacity"),f.opacity,.05,(p,m)=>{p.cloud.opacity=Math.min(1,Math.max(0,m))}),l(Ct("cloudScaleMin"),f.scale[0],10,(p,m)=>{p.cloud.scale=[m,p.cloud.scale[1]]}),l(Ct("cloudScaleMax"),f.scale[1],10,(p,m)=>{p.cloud.scale=[p.cloud.scale[0],m]}),c(Ct("cloudAmbient"),()=>f.ambientColor,(p,m)=>{p.cloud.ambientColor=m}),c(Ct("cloudDiffuse"),()=>f.diffuseColor,(p,m)=>{p.cloud.diffuseColor=m}),c(Ct("cloudSpecular"),()=>f.specularColor,(p,m)=>{p.cloud.specularColor=m}),Ot("p",{className:"muted"},Ct("skyNote")))}function Jo(){if(!Qt.level)return;G0();const n=Qt.g,t=[...n.treasures.values()].filter(l=>l.type==="shroom"||l.type==="shrooms").length,e=ce("#map-name");document.activeElement!==e&&(e.value=Qt.level.metadata.name||""),e.placeholder=Ct("unnamed");const i=[["legs",n.legs.size],["ways",n.ways.size],["nodes",n.nodes.size],["crossings",n.intersections.size],["shrooms",t],["finishes",n.finish.length]];ce("#stats").innerHTML="";for(const[l,u]of i)ce("#stats").append(Ot("div",{className:"tile"},Ot("b",{},String(u)),Ot("span",{},Ct(l))));const r=tf(n),o=ce("#checks");o.innerHTML="",r.length===0&&o.append(Ot("li",{},Ct("allGood")));for(const l of r)o.append(Ot("li",{className:"warn"},Ct(l.key,{n:l.n??0})));const c=ce("#map-badge");c.className=r.length?"badge warn":"badge",c.textContent=r.length?String(r.length):"",document.querySelectorAll("[data-mode]").forEach(l=>l.classList.toggle("active",l.dataset.mode===Qt.activeMode)),ce("[data-action=undo]").disabled=!Qt.history.canUndo,ce("[data-action=redo]").disabled=!Qt.history.canRedo,Yy(),Wy()}function Wn(n){ce("#status").textContent=n}let Cc="";const X0=()=>JSON.stringify(zo(Qt.level)),Ic=()=>!!Qt.level&&X0()!==Cc;function jo(){return Ic()?new Promise(n=>{const t=Ot("div",{className:"dialog-backdrop"}),e=l=>{t.remove(),window.removeEventListener("keydown",c,!0),n(l)},i=(l,u,f)=>{const p=Ot("button",{className:l,textContent:u});return p.addEventListener("click",f),p},r=i("primary",Ct("saveBtn"),async()=>e(await Bo(!1))),o=Ot("div",{className:"dialog"},Ot("h3",{},Ct("unsavedTitle")),Ot("p",{},Ct("unsavedBody",{name:Vn})),Ot("div",{className:"dialog-actions"},i("ghost",Ct("cancelBtn"),()=>e(!1)),i("ghost danger",Ct("discardBtn"),()=>e(!0)),r));t.append(o),t.addEventListener("pointerdown",l=>{l.target===t&&e(!1)});const c=l=>{l.key==="Escape"&&(l.stopImmediatePropagation(),e(!1))};window.addEventListener("keydown",c,!0),document.body.append(t),r.focus()}):Promise.resolve(!0)}window.addEventListener("beforeunload",n=>{Ic()&&(n.preventDefault(),n.returnValue="")});function Qo(n,t){Vn=t,Qt.load(n),Cc=X0(),hi.setView("perspective"),Jo()}function ta(n,t){try{Qo(jl(JSON.parse(n)),t),Wn(`${Ct("opened")}: ${t}`)}catch(e){Wn(`${Ct("openFailed")}: ${e.message}`)}}async function V0(){if(!await jo())return;const n=window;if(n.showOpenFilePicker){try{const[t]=await n.showOpenFilePicker({types:[{description:"Skyturns map",accept:{"application/json":[".json"]}}]});ai=t;const e=await t.getFile();ta(await e.text(),e.name)}catch{}return}ce("#file-input").click()}async function Bo(n){const t=JSON.stringify(zo(Qt.level)),e=window;try{if(e.showSaveFilePicker){(n||!ai)&&(ai=await e.showSaveFilePicker({suggestedName:Vn,types:[{description:"Skyturns map",accept:{"application/json":[".json"]}}]}));const i=await ai.createWritable();await i.write(t),await i.close(),Vn=ai.name}else{const i=document.createElement("a");i.href=URL.createObjectURL(new Blob([t],{type:"application/json"})),i.download=Vn,i.click(),URL.revokeObjectURL(i.href)}return Cc=t,Wn(`${Ct("saved")}: ${Vn}`),Jo(),!0}catch{return!1}}document.addEventListener("click",n=>{const t=n.target.closest("[data-action],[data-view],[data-mode]");if(t){if(t.closest(".menu-pop")&&Is(),t.dataset.view)return hi.setView(t.dataset.view);if(t.dataset.mode)return Qt.setMode(t.dataset.mode);switch(t.dataset.action){case"new":jo().then(e=>{e&&(ai=null,Qo(Pu(),"map.json"))});break;case"open":V0();break;case"save":Bo(!1);break;case"saveAs":Bo(!0);break;case"undo":Qt.undo();break;case"redo":Qt.redo();break;case"frame":hi.frame();break;case"sky":qy();break;case"syncDraft":Lc();break;case"cloudDrafts":$y();break;case"logout":Fy().then(Si);break;case"language":Tf(mn()==="zh"?"en":"zh"),k0();break;case"shortcuts":L0(mn());break;case"tour":D0(mn());break;case"collapse":z0(!ce("#inspector").classList.contains("collapsed"));break}}});window.addEventListener("keydown",n=>{var i;const t=(i=n.target)==null?void 0:i.tagName;if(t==="INPUT"||t==="SELECT"||t==="TEXTAREA")return;if(jx()){(n.key==="Escape"||n.key==="?")&&To(),n.stopImmediatePropagation();return}if(n.key==="?"){L0(mn()),n.stopImmediatePropagation();return}n.key==="Escape"&&Is();const e=n.key.toLowerCase();if(e==="v"&&!n.ctrlKey&&!n.metaKey){yr=!0,n.stopImmediatePropagation();return}if(yr&&/^[1-4]$/.test(n.key)){Y0(or[Number(n.key)-1]),n.stopImmediatePropagation();return}if(n.key==="Home"){hi.frame(),n.preventDefault(),n.stopImmediatePropagation();return}if((n.ctrlKey||n.metaKey)&&e==="s"){n.preventDefault(),n.stopImmediatePropagation(),Bo(n.shiftKey);return}if((n.ctrlKey||n.metaKey)&&n.shiftKey&&e==="u"){n.preventDefault(),n.stopImmediatePropagation(),Lc();return}(n.ctrlKey||n.metaKey)&&e==="o"&&(n.preventDefault(),n.stopImmediatePropagation(),V0())},!0);ce("#grid-step").addEventListener("change",n=>{Qt.gridStep=Number(n.target.value)});function Is(){document.querySelectorAll(".menu.open").forEach(n=>n.classList.remove("open")),W0(!1)}document.querySelectorAll("[data-menu]").forEach(n=>{n.addEventListener("click",t=>{if(t.stopPropagation(),n.dataset.menu==="account"&&!ks()){Is(),Fo(mn()).then(Si);return}const e=n.closest(".menu"),i=e.classList.contains("open");Is(),i||e.classList.add("open")}),n.addEventListener("mouseenter",()=>{document.querySelector(".menu.open")&&(Is(),n.closest(".menu").classList.add("open"))})});document.addEventListener("pointerdown",n=>{n.target.closest(".menu, #sky-panel, [data-action=sky]")||Is()},!0);function W0(n){const t=ce("#sky-panel");t.classList.contains("open")!==n&&(t.classList.toggle("open",n),ce("[data-action=sky].menu-btn").classList.toggle("active",n),G0())}function qy(){const n=!ce("#sky-panel").classList.contains("open");document.querySelectorAll(".menu.open").forEach(t=>t.classList.remove("open")),W0(n)}function Si(){const n=ks();ce("#account-name").textContent=n?n.user.name:Ct("loginLabel"),ce("#account-menu").classList.toggle("signed-in",!!n),ce("#account-server").textContent=Ac().replace(/^https?:\/\//,"")}let xu=0;function Zy(n,t=3200){const e=ce("#view-toast");e.textContent=n,e.classList.add("show","long"),clearTimeout(xu),xu=window.setTimeout(()=>e.classList.remove("show","long"),t)}async function Lc(){const n=mn();if(!ks()&&!await Fo(n))return;Si();let t=(Qt.level.metadata.name||"").trim();if(!t){const e=await Xy(n,"");if(!e)return;Qt.applyMeta(i=>{i.name=e}),t=e}Wn(n==="zh"?"正在同步…":"Syncing…");try{const e=await By(t,zo(Qt.level)),i=Ct("synced",{name:e.name,rev:e.revision});Wn(i),Zy(i)}catch(e){if(Wn(ur(n,e)),(e.code==="invalid_session"||e.code==="auth_required")&&(Si(),await Fo(n)))return Lc()}Si()}async function $y(){const n=mn();if(!ks()&&!await Fo(n))return;Si();const t=await Vy(n);if(!(!t||!await jo())){ai=null;try{Qo(jl(t.level),`${t.name}.json`),Wn(`${Ct("opened")}: ${t.name} (${Gy(n).draftsTitle})`)}catch(e){Wn(`${Ct("openFailed")}: ${e.message}`)}}}ce("#map-name").addEventListener("change",n=>{const t=n.target.value.trim();Qt.applyMeta(e=>{t?e.name=t:delete e.name})});const or=["perspective","top","sideX","sideY"];let yr=!1,yu=0;function Y0(n){hi.setView(n);const t=ce("#view-toast");t.textContent=`${Ct("view")} · ${Ct(n)}`,t.classList.add("show"),clearTimeout(yu),yu=window.setTimeout(()=>t.classList.remove("show"),900)}window.addEventListener("keyup",n=>{n.key.toLowerCase()==="v"&&(yr=!1)});window.addEventListener("blur",()=>{yr=!1});ce("#viewport").addEventListener("wheel",n=>{if(!yr)return;n.preventDefault(),n.stopPropagation();const t=or.indexOf(hi.current);Y0(or[(t+(n.deltaY>0?1:or.length-1))%or.length])},{capture:!0,passive:!1});ce("#file-input").addEventListener("change",async n=>{var e;const t=(e=n.target.files)==null?void 0:e[0];t&&(ai=null,ta(await t.text(),t.name))});const Fs=ce("#viewport");Fs.addEventListener("dragover",n=>{n.preventDefault(),Fs.classList.add("dragging")});Fs.addEventListener("dragleave",()=>Fs.classList.remove("dragging"));Fs.addEventListener("drop",async n=>{var e,i;n.preventDefault(),Fs.classList.remove("dragging");const t=(i=(e=n.dataTransfer)==null?void 0:e.files)==null?void 0:i[0];t&&await jo()&&(ai=null,ta(await t.text(),t.name))});Qo(Pu(),Vn);k0();Si();!Qx()&&!navigator.webdriver&&setTimeout(()=>D0(mn()),400);window.skyturnsEditor={editor:Qt,viewport:hi,exportDraft:()=>JSON.stringify(zo(Qt.level)),reparse:n=>{const t=jl(JSON.parse(n));return{nodes:t.geometry.nodes.size,ways:t.geometry.ways.size,crossings:t.geometry.intersections.size}}};const Ja=new URLSearchParams(location.search).get("load");Ja&&fetch(Ja).then(n=>n.text()).then(n=>ta(n,Ja.split("/").pop()||"map.json")).catch(n=>Wn(`${Ct("openFailed")}: ${n}`));

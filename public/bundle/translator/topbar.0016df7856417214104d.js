(()=>{"use strict";var e,r,n,t={5180:(e,r,n)=>{var t=n(7294),o=n(3935),a={1:"/admin/profile",2:"/editor/profile",3:"/translator/profile"},i=function(){return(0,t.useEffect)((function(){return $("#vertical-menu-btn").on("click",(function(e){e.preventDefault(),$("body").toggleClass("sidebar-enable"),992<=$(window).width()?$("body").toggleClass("vertical-collpsed"):$("body").removeClass("vertical-collpsed")})),$("body,html").click((function(e){var r=$("#vertical-menu-btn");r.is(e.target)||0!==r.has(e.target).length||e.target.closest("div.vertical-menu")||$("body").removeClass("sidebar-enable")})),function(){}}),[]),t.createElement(t.Fragment,null,t.createElement("div",{className:"navbar-header"},t.createElement("div",{className:"d-flex",style:{height:45}},t.createElement("div",{className:"navbar-brand-box"},t.createElement("a",{href:"/",className:"logo logo-light"},t.createElement("span",{className:"logo-lg"},"HOME CAMPUS"))),t.createElement("button",{type:"button",className:"btn btn-sm px-3 font-size-18 header-item waves-effect",id:"vertical-menu-btn"},t.createElement("i",{className:"ri-menu-2-line align-middle"}))),t.createElement("div",{className:"d-flex",style:{height:45}},t.createElement("div",{className:"dropdown d-inline-block user-dropdown"},t.createElement("button",{type:"button",className:"btn header-item waves-effect",id:"page-header-user-dropdown","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false",style:{padding:".1rem .75rem"}},t.createElement("img",{className:"rounded-circle header-profile-user",src:window.user.avatar,alt:window.user.nama}),t.createElement("span",{className:"d-none d-xl-inline-block ms-1"},window.user.nama),t.createElement("i",{className:"mdi mdi-chevron-down d-none d-xl-inline-block"})),t.createElement("div",{className:"dropdown-menu dropdown-menu-end"},t.createElement("a",{className:"dropdown-item",href:a[user.role]},t.createElement("i",{className:"ri-user-line align-middle me-1"})," Profile"),t.createElement("a",{className:"dropdown-item text-danger",href:"/login/logout"},t.createElement("i",{className:"ri-shut-down-line align-middle me-1 text-danger"})," Logout"))))))};o.render(t.createElement(i,null),document.getElementById("page-topbar"))}},o={};function a(e){var r=o[e];if(void 0!==r){if(void 0!==r.error)throw r.error;return r.exports}var n=o[e]={exports:{}};try{var i={id:e,module:n,factory:t[e],require:a};a.i.forEach((function(e){e(i)})),n=i.module,i.factory.call(n.exports,n,n.exports,i.require)}catch(e){throw n.error=e,e}return n.exports}a.m=t,a.c=o,a.i=[],e=[],a.O=(r,n,t,o)=>{if(!n){var i=1/0;for(s=0;s<e.length;s++){for(var[n,t,o]=e[s],c=!0,d=0;d<n.length;d++)(!1&o||i>=o)&&Object.keys(a.O).every((e=>a.O[e](n[d])))?n.splice(d--,1):(c=!1,o<i&&(i=o));if(c){e.splice(s--,1);var l=t();void 0!==l&&(r=l)}}return r}o=o||0;for(var s=e.length;s>0&&e[s-1][2]>o;s--)e[s]=e[s-1];e[s]=[n,t,o]},a.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return a.d(r,{a:r}),r},a.d=(e,r)=>{for(var n in r)a.o(r,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},a.hu=e=>e+"."+a.h()+".hot-update.js",a.hmrF=()=>"topbar."+a.h()+".hot-update.json",a.h=()=>"0016df7856417214104d",a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),r={},n="homecampus:",a.l=(e,t,o,i)=>{if(r[e])r[e].push(t);else{var c,d;if(void 0!==o)for(var l=document.getElementsByTagName("script"),s=0;s<l.length;s++){var u=l[s];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==n+o){c=u;break}}c||(d=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,a.nc&&c.setAttribute("nonce",a.nc),c.setAttribute("data-webpack",n+o),c.src=e),r[e]=[t];var f=(n,t)=>{c.onerror=c.onload=null,clearTimeout(p);var o=r[e];if(delete r[e],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((e=>e(t))),n)return n(t)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=f.bind(null,c.onerror),c.onload=f.bind(null,c.onload),d&&document.head.appendChild(c)}},a.j=407,(()=>{var e,r,n,t,o={},i=a.c,c=[],d=[],l="idle";function s(e){l=e;for(var r=[],n=0;n<d.length;n++)r[n]=d[n].call(null,e);return Promise.all(r)}function u(e){if(0===r.length)return e();var n=r;return r=[],Promise.all(n).then((function(){return u(e)}))}function f(e){if("idle"!==l)throw new Error("check() is only allowed in idle status");return s("check").then(a.hmrM).then((function(t){return t?s("prepare").then((function(){var o=[];return r=[],n=[],Promise.all(Object.keys(a.hmrC).reduce((function(e,r){return a.hmrC[r](t.c,t.r,t.m,e,n,o),e}),[])).then((function(){return u((function(){return e?h(e):s("ready").then((function(){return o}))}))}))})):s(m()?"ready":"idle").then((function(){return null}))}))}function p(e){return"ready"!==l?Promise.resolve().then((function(){throw new Error("apply() is only allowed in ready status")})):h(e)}function h(e){e=e||{},m();var r=n.map((function(r){return r(e)}));n=void 0;var o=r.map((function(e){return e.error})).filter(Boolean);if(o.length>0)return s("abort").then((function(){throw o[0]}));var a=s("dispose");r.forEach((function(e){e.dispose&&e.dispose()}));var i,c=s("apply"),d=function(e){i||(i=e)},l=[];return r.forEach((function(e){if(e.apply){var r=e.apply(d);if(r)for(var n=0;n<r.length;n++)l.push(r[n])}})),Promise.all([a,c]).then((function(){return i?s("fail").then((function(){throw i})):t?h(e).then((function(e){return l.forEach((function(r){e.indexOf(r)<0&&e.push(r)})),e})):s("idle").then((function(){return l}))}))}function m(){if(t)return n||(n=[]),Object.keys(a.hmrI).forEach((function(e){t.forEach((function(r){a.hmrI[e](r,n)}))})),t=void 0,!0}a.hmrD=o,a.i.push((function(h){var m,v,g,b,y=h.module,E=function(n,t){var o=i[t];if(!o)return n;var a=function(r){if(o.hot.active){if(i[r]){var a=i[r].parents;-1===a.indexOf(t)&&a.push(t)}else c=[t],e=r;-1===o.children.indexOf(r)&&o.children.push(r)}else console.warn("[HMR] unexpected require("+r+") from disposed module "+t),c=[];return n(r)},d=function(e){return{configurable:!0,enumerable:!0,get:function(){return n[e]},set:function(r){n[e]=r}}};for(var f in n)Object.prototype.hasOwnProperty.call(n,f)&&"e"!==f&&Object.defineProperty(a,f,d(f));return a.e=function(e){return function(e){switch(l){case"ready":return s("prepare"),r.push(e),u((function(){return s("ready")})),e;case"prepare":return r.push(e),e;default:return e}}(n.e(e))},a}(h.require,h.id);y.hot=(m=h.id,v=y,b={_acceptedDependencies:{},_acceptedErrorHandlers:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:g=e!==m,_requireSelf:function(){c=v.parents.slice(),e=g?void 0:m,a(m)},active:!0,accept:function(e,r,n){if(void 0===e)b._selfAccepted=!0;else if("function"==typeof e)b._selfAccepted=e;else if("object"==typeof e&&null!==e)for(var t=0;t<e.length;t++)b._acceptedDependencies[e[t]]=r||function(){},b._acceptedErrorHandlers[e[t]]=n;else b._acceptedDependencies[e]=r||function(){},b._acceptedErrorHandlers[e]=n},decline:function(e){if(void 0===e)b._selfDeclined=!0;else if("object"==typeof e&&null!==e)for(var r=0;r<e.length;r++)b._declinedDependencies[e[r]]=!0;else b._declinedDependencies[e]=!0},dispose:function(e){b._disposeHandlers.push(e)},addDisposeHandler:function(e){b._disposeHandlers.push(e)},removeDisposeHandler:function(e){var r=b._disposeHandlers.indexOf(e);r>=0&&b._disposeHandlers.splice(r,1)},invalidate:function(){switch(this._selfInvalidated=!0,l){case"idle":n=[],Object.keys(a.hmrI).forEach((function(e){a.hmrI[e](m,n)})),s("ready");break;case"ready":Object.keys(a.hmrI).forEach((function(e){a.hmrI[e](m,n)}));break;case"prepare":case"check":case"dispose":case"apply":(t=t||[]).push(m)}},check:f,apply:p,status:function(e){if(!e)return l;d.push(e)},addStatusHandler:function(e){d.push(e)},removeStatusHandler:function(e){var r=d.indexOf(e);r>=0&&d.splice(r,1)},data:o[m]},e=void 0,b),y.parents=c,y.children=[],c=[],h.require=E})),a.hmrC={},a.hmrI={}})(),(()=>{var e;a.g.importScripts&&(e=a.g.location+"");var r=a.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var n=r.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=e})(),(()=>{var e,r,n,t,o=a.hmrS_jsonp=a.hmrS_jsonp||{407:0},i={};function c(e){return new Promise(((r,n)=>{i[e]=r;var t=a.p+a.hu(e),o=new Error;a.l(t,(r=>{if(i[e]){i[e]=void 0;var t=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;o.message="Loading hot update chunk "+e+" failed.\n("+t+": "+a+")",o.name="ChunkLoadError",o.type=t,o.request=a,n(o)}}))}))}function d(i){function c(e){for(var r=[e],n={},t=r.map((function(e){return{chain:[e],id:e}}));t.length>0;){var o=t.pop(),i=o.id,c=o.chain,l=a.c[i];if(l&&(!l.hot._selfAccepted||l.hot._selfInvalidated)){if(l.hot._selfDeclined)return{type:"self-declined",chain:c,moduleId:i};if(l.hot._main)return{type:"unaccepted",chain:c,moduleId:i};for(var s=0;s<l.parents.length;s++){var u=l.parents[s],f=a.c[u];if(f){if(f.hot._declinedDependencies[i])return{type:"declined",chain:c.concat([u]),moduleId:i,parentId:u};-1===r.indexOf(u)&&(f.hot._acceptedDependencies[i]?(n[u]||(n[u]=[]),d(n[u],[i])):(delete n[u],r.push(u),t.push({chain:c.concat([u]),id:u})))}}}}return{type:"accepted",moduleId:e,outdatedModules:r,outdatedDependencies:n}}function d(e,r){for(var n=0;n<r.length;n++){var t=r[n];-1===e.indexOf(t)&&e.push(t)}}a.f&&delete a.f.jsonpHmr,e=void 0;var l={},s=[],u={},f=function(e){console.warn("[HMR] unexpected require("+e.id+") to disposed module")};for(var p in r)if(a.o(r,p)){var h,m=r[p],v=!1,g=!1,b=!1,y="";switch((h=m?c(p):{type:"disposed",moduleId:p}).chain&&(y="\nUpdate propagation: "+h.chain.join(" -> ")),h.type){case"self-declined":i.onDeclined&&i.onDeclined(h),i.ignoreDeclined||(v=new Error("Aborted because of self decline: "+h.moduleId+y));break;case"declined":i.onDeclined&&i.onDeclined(h),i.ignoreDeclined||(v=new Error("Aborted because of declined dependency: "+h.moduleId+" in "+h.parentId+y));break;case"unaccepted":i.onUnaccepted&&i.onUnaccepted(h),i.ignoreUnaccepted||(v=new Error("Aborted because "+p+" is not accepted"+y));break;case"accepted":i.onAccepted&&i.onAccepted(h),g=!0;break;case"disposed":i.onDisposed&&i.onDisposed(h),b=!0;break;default:throw new Error("Unexception type "+h.type)}if(v)return{error:v};if(g)for(p in u[p]=m,d(s,h.outdatedModules),h.outdatedDependencies)a.o(h.outdatedDependencies,p)&&(l[p]||(l[p]=[]),d(l[p],h.outdatedDependencies[p]));b&&(d(s,[h.moduleId]),u[p]=f)}r=void 0;for(var E,w=[],_=0;_<s.length;_++){var I=s[_],k=a.c[I];k&&(k.hot._selfAccepted||k.hot._main)&&u[I]!==f&&!k.hot._selfInvalidated&&w.push({module:I,require:k.hot._requireSelf,errorHandler:k.hot._selfAccepted})}return{dispose:function(){var e;n.forEach((function(e){delete o[e]})),n=void 0;for(var r,t=s.slice();t.length>0;){var i=t.pop(),c=a.c[i];if(c){var d={},u=c.hot._disposeHandlers;for(_=0;_<u.length;_++)u[_].call(null,d);for(a.hmrD[i]=d,c.hot.active=!1,delete a.c[i],delete l[i],_=0;_<c.children.length;_++){var f=a.c[c.children[_]];f&&(e=f.parents.indexOf(i))>=0&&f.parents.splice(e,1)}}}for(var p in l)if(a.o(l,p)&&(c=a.c[p]))for(E=l[p],_=0;_<E.length;_++)r=E[_],(e=c.children.indexOf(r))>=0&&c.children.splice(e,1)},apply:function(e){for(var r in u)a.o(u,r)&&(a.m[r]=u[r]);for(var n=0;n<t.length;n++)t[n](a);for(var o in l)if(a.o(l,o)){var c=a.c[o];if(c){E=l[o];for(var d=[],f=[],p=[],h=0;h<E.length;h++){var m=E[h],v=c.hot._acceptedDependencies[m],g=c.hot._acceptedErrorHandlers[m];if(v){if(-1!==d.indexOf(v))continue;d.push(v),f.push(g),p.push(m)}}for(var b=0;b<d.length;b++)try{d[b].call(null,E)}catch(r){if("function"==typeof f[b])try{f[b](r,{moduleId:o,dependencyId:p[b]})}catch(n){i.onErrored&&i.onErrored({type:"accept-error-handler-errored",moduleId:o,dependencyId:p[b],error:n,originalError:r}),i.ignoreErrored||(e(n),e(r))}else i.onErrored&&i.onErrored({type:"accept-errored",moduleId:o,dependencyId:p[b],error:r}),i.ignoreErrored||e(r)}}}for(var y=0;y<w.length;y++){var _=w[y],I=_.module;try{_.require(I)}catch(r){if("function"==typeof _.errorHandler)try{_.errorHandler(r,{moduleId:I,module:a.c[I]})}catch(n){i.onErrored&&i.onErrored({type:"self-accept-error-handler-errored",moduleId:I,error:n,originalError:r}),i.ignoreErrored||(e(n),e(r))}else i.onErrored&&i.onErrored({type:"self-accept-errored",moduleId:I,error:r}),i.ignoreErrored||e(r)}}return s}}}self.webpackHotUpdatehomecampus=(e,n,o)=>{for(var c in n)a.o(n,c)&&(r[c]=n[c]);o&&t.push(o),i[e]&&(i[e](),i[e]=void 0)},a.hmrI.jsonp=function(e,o){r||(r={},t=[],n=[],o.push(d)),a.o(r,e)||(r[e]=a.m[e])},a.hmrC.jsonp=function(i,l,s,u,f,p){f.push(d),e={},n=l,r=s.reduce((function(e,r){return e[r]=!1,e}),{}),t=[],i.forEach((function(r){a.o(o,r)&&void 0!==o[r]&&(u.push(c(r)),e[r]=!0)})),a.f&&(a.f.jsonpHmr=function(r,n){e&&!a.o(e,r)&&a.o(o,r)&&void 0!==o[r]&&(n.push(c(r)),e[r]=!0)})},a.hmrM=()=>{if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");return fetch(a.p+a.hmrF()).then((e=>{if(404!==e.status){if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);return e.json()}}))},a.O.j=e=>0===o[e];var l=(e,r)=>{var n,t,[i,c,d]=r,l=0;if(i.some((e=>0!==o[e]))){for(n in c)a.o(c,n)&&(a.m[n]=c[n]);if(d)var s=d(a)}for(e&&e(r);l<i.length;l++)t=i[l],a.o(o,t)&&o[t]&&o[t][0](),o[i[l]]=0;return a.O(s)},s=self.webpackChunkhomecampus=self.webpackChunkhomecampus||[];s.forEach(l.bind(null,0)),s.push=l.bind(null,s.push.bind(s))})();var i=a.O(void 0,[736],(()=>a(5180)));i=a.O(i)})();
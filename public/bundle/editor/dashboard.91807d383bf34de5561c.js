(()=>{"use strict";var e,r,n,t={4879:(e,r,n)=>{var t=n(7294),o=n(3935),c=n(682),i=n(4051),a=n(1555),d=n(5412),l=function(){return t.createElement(t.Fragment,null,t.createElement("div",{className:"page-content"},t.createElement(c.Z,{fluid:!0},t.createElement(i.Z,null,t.createElement(a.Z,{xs:12},t.createElement("div",{className:"page-title-box d-sm-flex align-items-center justify-content-between"},t.createElement("h4",{className:"mb-sm-0"},document.title),t.createElement("div",{className:"page-title-right"},t.createElement(d.Z,{className:"m-0"},t.createElement(d.Z.Item,{active:!0},"Translator"),t.createElement(d.Z.Item,{active:!0},document.title)))))))),t.createElement("footer",{className:"footer"},t.createElement(c.Z,{fluid:!0},t.createElement(i.Z,null,t.createElement(a.Z,{md:6,sm:12},t.createElement("script",null,"document.write(new Date().getFullYear());"),"© Nazox."),t.createElement(a.Z,{md:6,sm:12},t.createElement("div",{className:"text-sm-end d-none d-sm-block"},"Crafted with ",t.createElement("i",{className:"mdi mdi-heart text-danger"})," by Sqone.developer"))))))};o.render(t.createElement(l,null),document.getElementById("root"))}},o={};function c(e){var r=o[e];if(void 0!==r){if(void 0!==r.error)throw r.error;return r.exports}var n=o[e]={exports:{}};try{var i={id:e,module:n,factory:t[e],require:c};c.i.forEach((function(e){e(i)})),n=i.module,i.factory.call(n.exports,n,n.exports,i.require)}catch(e){throw n.error=e,e}return n.exports}c.m=t,c.c=o,c.i=[],e=[],c.O=(r,n,t,o)=>{if(!n){var i=1/0;for(u=0;u<e.length;u++){for(var[n,t,o]=e[u],a=!0,d=0;d<n.length;d++)(!1&o||i>=o)&&Object.keys(c.O).every((e=>c.O[e](n[d])))?n.splice(d--,1):(a=!1,o<i&&(i=o));if(a){e.splice(u--,1);var l=t();void 0!==l&&(r=l)}}return r}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,t,o]},c.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return c.d(r,{a:r}),r},c.d=(e,r)=>{for(var n in r)c.o(r,n)&&!c.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},c.hu=e=>e+"."+c.h()+".hot-update.js",c.hmrF=()=>"dashboard."+c.h()+".hot-update.json",c.h=()=>"91807d383bf34de5561c",c.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),c.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),r={},n="homecampus:",c.l=(e,t,o,i)=>{if(r[e])r[e].push(t);else{var a,d;if(void 0!==o)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var s=l[u];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==n+o){a=s;break}}a||(d=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,c.nc&&a.setAttribute("nonce",c.nc),a.setAttribute("data-webpack",n+o),a.src=e),r[e]=[t];var f=(n,t)=>{a.onerror=a.onload=null,clearTimeout(p);var o=r[e];if(delete r[e],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((e=>e(t))),n)return n(t)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=f.bind(null,a.onerror),a.onload=f.bind(null,a.onload),d&&document.head.appendChild(a)}},c.j=966,(()=>{var e,r,n,t,o={},i=c.c,a=[],d=[],l="idle";function u(e){l=e;for(var r=[],n=0;n<d.length;n++)r[n]=d[n].call(null,e);return Promise.all(r)}function s(e){if(0===r.length)return e();var n=r;return r=[],Promise.all(n).then((function(){return s(e)}))}function f(e){if("idle"!==l)throw new Error("check() is only allowed in idle status");return u("check").then(c.hmrM).then((function(t){return t?u("prepare").then((function(){var o=[];return r=[],n=[],Promise.all(Object.keys(c.hmrC).reduce((function(e,r){return c.hmrC[r](t.c,t.r,t.m,e,n,o),e}),[])).then((function(){return s((function(){return e?h(e):u("ready").then((function(){return o}))}))}))})):u(m()?"ready":"idle").then((function(){return null}))}))}function p(e){return"ready"!==l?Promise.resolve().then((function(){throw new Error("apply() is only allowed in ready status")})):h(e)}function h(e){e=e||{},m();var r=n.map((function(r){return r(e)}));n=void 0;var o=r.map((function(e){return e.error})).filter(Boolean);if(o.length>0)return u("abort").then((function(){throw o[0]}));var c=u("dispose");r.forEach((function(e){e.dispose&&e.dispose()}));var i,a=u("apply"),d=function(e){i||(i=e)},l=[];return r.forEach((function(e){if(e.apply){var r=e.apply(d);if(r)for(var n=0;n<r.length;n++)l.push(r[n])}})),Promise.all([c,a]).then((function(){return i?u("fail").then((function(){throw i})):t?h(e).then((function(e){return l.forEach((function(r){e.indexOf(r)<0&&e.push(r)})),e})):u("idle").then((function(){return l}))}))}function m(){if(t)return n||(n=[]),Object.keys(c.hmrI).forEach((function(e){t.forEach((function(r){c.hmrI[e](r,n)}))})),t=void 0,!0}c.hmrD=o,c.i.push((function(h){var m,v,y,g,E=h.module,b=function(n,t){var o=i[t];if(!o)return n;var c=function(r){if(o.hot.active){if(i[r]){var c=i[r].parents;-1===c.indexOf(t)&&c.push(t)}else a=[t],e=r;-1===o.children.indexOf(r)&&o.children.push(r)}else console.warn("[HMR] unexpected require("+r+") from disposed module "+t),a=[];return n(r)},d=function(e){return{configurable:!0,enumerable:!0,get:function(){return n[e]},set:function(r){n[e]=r}}};for(var f in n)Object.prototype.hasOwnProperty.call(n,f)&&"e"!==f&&Object.defineProperty(c,f,d(f));return c.e=function(e){return function(e){switch(l){case"ready":return u("prepare"),r.push(e),s((function(){return u("ready")})),e;case"prepare":return r.push(e),e;default:return e}}(n.e(e))},c}(h.require,h.id);E.hot=(m=h.id,v=E,g={_acceptedDependencies:{},_acceptedErrorHandlers:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:y=e!==m,_requireSelf:function(){a=v.parents.slice(),e=y?void 0:m,c(m)},active:!0,accept:function(e,r,n){if(void 0===e)g._selfAccepted=!0;else if("function"==typeof e)g._selfAccepted=e;else if("object"==typeof e&&null!==e)for(var t=0;t<e.length;t++)g._acceptedDependencies[e[t]]=r||function(){},g._acceptedErrorHandlers[e[t]]=n;else g._acceptedDependencies[e]=r||function(){},g._acceptedErrorHandlers[e]=n},decline:function(e){if(void 0===e)g._selfDeclined=!0;else if("object"==typeof e&&null!==e)for(var r=0;r<e.length;r++)g._declinedDependencies[e[r]]=!0;else g._declinedDependencies[e]=!0},dispose:function(e){g._disposeHandlers.push(e)},addDisposeHandler:function(e){g._disposeHandlers.push(e)},removeDisposeHandler:function(e){var r=g._disposeHandlers.indexOf(e);r>=0&&g._disposeHandlers.splice(r,1)},invalidate:function(){switch(this._selfInvalidated=!0,l){case"idle":n=[],Object.keys(c.hmrI).forEach((function(e){c.hmrI[e](m,n)})),u("ready");break;case"ready":Object.keys(c.hmrI).forEach((function(e){c.hmrI[e](m,n)}));break;case"prepare":case"check":case"dispose":case"apply":(t=t||[]).push(m)}},check:f,apply:p,status:function(e){if(!e)return l;d.push(e)},addStatusHandler:function(e){d.push(e)},removeStatusHandler:function(e){var r=d.indexOf(e);r>=0&&d.splice(r,1)},data:o[m]},e=void 0,g),E.parents=a,E.children=[],a=[],h.require=b})),c.hmrC={},c.hmrI={}})(),(()=>{var e;c.g.importScripts&&(e=c.g.location+"");var r=c.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var n=r.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),c.p=e})(),(()=>{var e,r,n,t,o=c.hmrS_jsonp=c.hmrS_jsonp||{966:0},i={};function a(e){return new Promise(((r,n)=>{i[e]=r;var t=c.p+c.hu(e),o=new Error;c.l(t,(r=>{if(i[e]){i[e]=void 0;var t=r&&("load"===r.type?"missing":r.type),c=r&&r.target&&r.target.src;o.message="Loading hot update chunk "+e+" failed.\n("+t+": "+c+")",o.name="ChunkLoadError",o.type=t,o.request=c,n(o)}}))}))}function d(i){function a(e){for(var r=[e],n={},t=r.map((function(e){return{chain:[e],id:e}}));t.length>0;){var o=t.pop(),i=o.id,a=o.chain,l=c.c[i];if(l&&(!l.hot._selfAccepted||l.hot._selfInvalidated)){if(l.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:i};if(l.hot._main)return{type:"unaccepted",chain:a,moduleId:i};for(var u=0;u<l.parents.length;u++){var s=l.parents[u],f=c.c[s];if(f){if(f.hot._declinedDependencies[i])return{type:"declined",chain:a.concat([s]),moduleId:i,parentId:s};-1===r.indexOf(s)&&(f.hot._acceptedDependencies[i]?(n[s]||(n[s]=[]),d(n[s],[i])):(delete n[s],r.push(s),t.push({chain:a.concat([s]),id:s})))}}}}return{type:"accepted",moduleId:e,outdatedModules:r,outdatedDependencies:n}}function d(e,r){for(var n=0;n<r.length;n++){var t=r[n];-1===e.indexOf(t)&&e.push(t)}}c.f&&delete c.f.jsonpHmr,e=void 0;var l={},u=[],s={},f=function(e){console.warn("[HMR] unexpected require("+e.id+") to disposed module")};for(var p in r)if(c.o(r,p)){var h,m=r[p],v=!1,y=!1,g=!1,E="";switch((h=m?a(p):{type:"disposed",moduleId:p}).chain&&(E="\nUpdate propagation: "+h.chain.join(" -> ")),h.type){case"self-declined":i.onDeclined&&i.onDeclined(h),i.ignoreDeclined||(v=new Error("Aborted because of self decline: "+h.moduleId+E));break;case"declined":i.onDeclined&&i.onDeclined(h),i.ignoreDeclined||(v=new Error("Aborted because of declined dependency: "+h.moduleId+" in "+h.parentId+E));break;case"unaccepted":i.onUnaccepted&&i.onUnaccepted(h),i.ignoreUnaccepted||(v=new Error("Aborted because "+p+" is not accepted"+E));break;case"accepted":i.onAccepted&&i.onAccepted(h),y=!0;break;case"disposed":i.onDisposed&&i.onDisposed(h),g=!0;break;default:throw new Error("Unexception type "+h.type)}if(v)return{error:v};if(y)for(p in s[p]=m,d(u,h.outdatedModules),h.outdatedDependencies)c.o(h.outdatedDependencies,p)&&(l[p]||(l[p]=[]),d(l[p],h.outdatedDependencies[p]));g&&(d(u,[h.moduleId]),s[p]=f)}r=void 0;for(var b,w=[],_=0;_<u.length;_++){var I=u[_],D=c.c[I];D&&(D.hot._selfAccepted||D.hot._main)&&s[I]!==f&&!D.hot._selfInvalidated&&w.push({module:I,require:D.hot._requireSelf,errorHandler:D.hot._selfAccepted})}return{dispose:function(){var e;n.forEach((function(e){delete o[e]})),n=void 0;for(var r,t=u.slice();t.length>0;){var i=t.pop(),a=c.c[i];if(a){var d={},s=a.hot._disposeHandlers;for(_=0;_<s.length;_++)s[_].call(null,d);for(c.hmrD[i]=d,a.hot.active=!1,delete c.c[i],delete l[i],_=0;_<a.children.length;_++){var f=c.c[a.children[_]];f&&(e=f.parents.indexOf(i))>=0&&f.parents.splice(e,1)}}}for(var p in l)if(c.o(l,p)&&(a=c.c[p]))for(b=l[p],_=0;_<b.length;_++)r=b[_],(e=a.children.indexOf(r))>=0&&a.children.splice(e,1)},apply:function(e){for(var r in s)c.o(s,r)&&(c.m[r]=s[r]);for(var n=0;n<t.length;n++)t[n](c);for(var o in l)if(c.o(l,o)){var a=c.c[o];if(a){b=l[o];for(var d=[],f=[],p=[],h=0;h<b.length;h++){var m=b[h],v=a.hot._acceptedDependencies[m],y=a.hot._acceptedErrorHandlers[m];if(v){if(-1!==d.indexOf(v))continue;d.push(v),f.push(y),p.push(m)}}for(var g=0;g<d.length;g++)try{d[g].call(null,b)}catch(r){if("function"==typeof f[g])try{f[g](r,{moduleId:o,dependencyId:p[g]})}catch(n){i.onErrored&&i.onErrored({type:"accept-error-handler-errored",moduleId:o,dependencyId:p[g],error:n,originalError:r}),i.ignoreErrored||(e(n),e(r))}else i.onErrored&&i.onErrored({type:"accept-errored",moduleId:o,dependencyId:p[g],error:r}),i.ignoreErrored||e(r)}}}for(var E=0;E<w.length;E++){var _=w[E],I=_.module;try{_.require(I)}catch(r){if("function"==typeof _.errorHandler)try{_.errorHandler(r,{moduleId:I,module:c.c[I]})}catch(n){i.onErrored&&i.onErrored({type:"self-accept-error-handler-errored",moduleId:I,error:n,originalError:r}),i.ignoreErrored||(e(n),e(r))}else i.onErrored&&i.onErrored({type:"self-accept-errored",moduleId:I,error:r}),i.ignoreErrored||e(r)}}return u}}}self.webpackHotUpdatehomecampus=(e,n,o)=>{for(var a in n)c.o(n,a)&&(r[a]=n[a]);o&&t.push(o),i[e]&&(i[e](),i[e]=void 0)},c.hmrI.jsonp=function(e,o){r||(r={},t=[],n=[],o.push(d)),c.o(r,e)||(r[e]=c.m[e])},c.hmrC.jsonp=function(i,l,u,s,f,p){f.push(d),e={},n=l,r=u.reduce((function(e,r){return e[r]=!1,e}),{}),t=[],i.forEach((function(r){c.o(o,r)&&void 0!==o[r]&&(s.push(a(r)),e[r]=!0)})),c.f&&(c.f.jsonpHmr=function(r,n){e&&!c.o(e,r)&&c.o(o,r)&&void 0!==o[r]&&(n.push(a(r)),e[r]=!0)})},c.hmrM=()=>{if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");return fetch(c.p+c.hmrF()).then((e=>{if(404!==e.status){if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);return e.json()}}))},c.O.j=e=>0===o[e];var l=(e,r)=>{var n,t,[i,a,d]=r,l=0;if(i.some((e=>0!==o[e]))){for(n in a)c.o(a,n)&&(c.m[n]=a[n]);if(d)var u=d(c)}for(e&&e(r);l<i.length;l++)t=i[l],c.o(o,t)&&o[t]&&o[t][0](),o[i[l]]=0;return c.O(u)},u=self.webpackChunkhomecampus=self.webpackChunkhomecampus||[];u.forEach(l.bind(null,0)),u.push=l.bind(null,u.push.bind(u))})();var i=c.O(void 0,[736],(()=>c(4879)));i=c.O(i)})();
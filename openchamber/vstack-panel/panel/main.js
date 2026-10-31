(()=>{var f="openchamber.sdk",S=1;var Je=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Wt(e){let n=e.documentElement;if(n.hasAttribute("data-oc-scrollbar-activity"))return;n.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",(i)=>{let r=i.target===e?n:i.target;if(!(r instanceof Element))return;if(!r.hasAttribute("data-oc-scrolling"))r.setAttribute("data-oc-scrolling","");let p=o.get(r);if(p!==void 0)clearTimeout(p);o.set(r,setTimeout(()=>{o.delete(r),r.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Xn=`(${Wt.toString()})(document);`;var Ye=128,Qe=65536;var Ae=128;var ve=65536;var Qt=/^[a-z][a-z0-9-]{0,39}$/;var Kt=(e)=>Object(e)===e&&!Array.isArray(e),Ze=(e,n)=>Object.keys(e).every((o)=>n.includes(o)),Jt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Yt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Zt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let n=new Set;for(let o of e){if(!Kt(o)||!Qt.test(o.id)||!Jt(o.label))return!1;if(o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1)return!1;if(n.has(o.id))return!1;if(n.add(o.id),o.kind==="button"){if(!Ze(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!Ze(o,["kind","id","label","value","options","disabled"]))return!1;if(!Yt(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let i=new Set;for(let r of o.options){if(!Kt(r)||!Ze(r,["value","label"])||!Yt(r.value)||!Jt(r.label)||i.has(r.value))return!1;i.add(r.value)}if(!i.has(o.value))return!1}return!0};var Oe=20000000,ye=256;var qe=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,qt=(e,n)=>{if(e.path!==n.path||e.readOnly!==n.readOnly)return!1;if(e.encoding==="text"||n.encoding==="text")return e.encoding==="text"&&n.encoding==="text"&&e.content===n.content;if(e.bytes.byteLength!==n.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==n.bytes[o])return!1;return!0};var en=/^[A-Za-z0-9_-]{1,80}$/;var tn=["left","right","top","bottom"];var nn=(e,n=0,o={remaining:16000})=>{if(--o.remaining<0||n>=32)return!1;if(e===null)return!0;let i=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let r of i)if(!nn(r,n+1,o))return!1;return!0},et=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((n)=>/^(0|[1-9]\d*)$/.test(n)&&Number(n)<e.length)&&e.every(et);if(Object(e)===e){let n=Object.getPrototypeOf(e);return(n===null||n===Object.prototype)&&Object.values(e).every(et)}return String(e)===e||Number.isFinite(e)},tt=(e)=>{try{if(String(e.id)!==e.id||!en.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!tn.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!nn(e.data)||!et(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var rn=["file","directory","other","missing"],st=(e)=>Boolean(e&&"sessionId"in e),rt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var on=/^[0-9a-f]{7,64}$/i,ot=(e)=>on.test(e),xe=500,ke=32000,an=16000,cn=128,dn=200,ln=2000,pn=16000,un=80,En=200,_n=16000;var fn=2000;var it=20000,Re=1024,Ue=2000000;var Ce=64000,we=8000,at=4000;var ct=960000;var Sn=999,Tn=1e4,ue=500,hn=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],mn=["stopped","starting","ready","failed"],Vn=new Set(hn),gn=(e)=>Vn.has(e),bn=(e)=>e&&gn(e)?e:"HOST_REJECTED",ee=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ee);if(Object(e)===e)return Object.values(e).every(ee);return!1},An=(e)=>ee(e)&&JSON.stringify(e).length<=_n,sn=(e)=>e?.trim().slice(0,En)??"",te=(e)=>{let n=e.id.trim().slice(0,cn),o=e.title.trim().slice(0,dn),i=e.url.trim().slice(0,ln),r=e.text?.trim().slice(0,pn),p=e.author?.trim().slice(0,un),_=e.kind==="pull"?"pull":"issue",m={providerId:e.providerId.trim(),id:n,title:o||n,url:i,kind:_};if(r)m.text=r;if(p)m.author=p;if(_==="pull"){let O=sn(e.branches?.head),W=sn(e.branches?.base);if(O&&W)m.branches={head:O,base:W}}if(An(e.data))m.data=e.data;return m},dt=(e)=>{let n=te(e);if(e.projectId)n.projectId=e.projectId;if(e.navigation)n.navigation=e.navigation;if(e.worktree)n.worktree=e.worktree;return n},lt=(e)=>{let n={text:e.text.trim().slice(0,an)};if(e.send)n.send=!0;return n},pt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Sn,Math.max(0,Math.round(e)))},ut=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Tn,Math.max(0,Math.ceil(e)))};var ne=(e)=>e.length>0&&e.length<=Re&&!e.includes("\x00")&&!e.includes("\\");var Ie=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>fn)return!1;return!e.split("/").some((o)=>o==="."||o==="..")},jn=new Set(mn),Et=(e)=>Boolean(e&&"status"in e&&jn.has(String(e.status))&&!("body"in e)),Le=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),_t=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),ft=(e)=>Boolean(e&&"written"in e&&e.written===!0),St=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),zn=new Set(rn),Tt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&zn.has(String(e.kind))&&Number.isFinite(e.size)),ht=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Wn=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Kn=(e)=>Object(e)===e?e:null,nt=(e)=>String(e)===e&&e.length>0,Jn=(e)=>{if(!nt(e.id))return null;if(e.ok===!0){let n={channel:f,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)n.payload=e.payload;return n}if(e.ok===!1&&nt(e.error))return{channel:f,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:bn(nt(e.code)?e.code:void 0)};return null},mt=(e)=>{let n=Kn(e);if(!n||n.channel!==f||n.v!==S)return null;if(n.type==="result")return Jn(n);if(!Wn.has(String(n.type))||Object(n.payload)!==n.payload)return null;return n};var vn=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Yn=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class d extends Error{code;constructor(e,n){super(n);this.name="HostRequestError",this.code=e}}var On=()=>Promise.reject(new d("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Me=()=>Promise.reject(new d("BAD_PATH",`File path must be 1 to ${Re} characters without NUL or backslash.`)),Ne=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new d("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},E=(e)=>(e.value+=1,`oc-${e.value}`),gt=(e={})=>{let n=e.target??("window"in globalThis?window:null);if(!n)throw new d("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??((t)=>t===n.parent),i=e.requestTimeoutMs??it,r=new Set,p=new Set,_=new Set,m=new Set,O=new Set,W=new Set,oe=new Set,fe=new Set,Se=new Set,Y=new Set,Ve=[],ie=null,ae=null,Te=new Set,he=new Set,ce=null,de=null,je=!1,Q=new Map,Z=new Map,q=new Map,H=!1,u={value:0},l=null,X=null,le=!1,pe=!1,Nt=null,Pt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},P=(t)=>{n.parent.postMessage(t,"*")},Gt=()=>{if(H||n.parent===n||Y.size===0||l?.features?.lateGenerateResults!==!0)return;P({channel:f,v:S,type:"generate-late-listen"})},A=(t,s)=>{for(let a of t)try{a(s)}catch(c){console.error(c)}},$t=(t)=>{if(!(t instanceof MessageEvent))return;if(!o(t.source))return;let s=mt(t.data);if(!s)return;if(s.type==="workspace"){let c=Z.get(s.payload.subscriptionId);if(c)A([c],s.payload.snapshot);return}if(s.type==="shells"){let c=q.get(s.payload.subscriptionId);if(c)A([c],s.payload.snapshot);return}if(s.type==="ready"){if(l=s.payload,X=Pt(s.payload.session),A(r,s.payload),A(p,s.payload.directory),A(_,s.payload.session),X)A(m,X);A(O,s.payload.connection),A(W,s.payload.settings),A(oe,s.payload.item),Gt();return}if(s.type==="generate-late"){if(Y.size===0)Ve.push(s.payload);else A(Y,s.payload);return}if(s.type==="directory"){if(l)l={...l,directory:s.payload.directory};A(p,s.payload.directory);return}if(s.type==="session"){if(l)l={...l,session:s.payload.session};if(!s.payload.session)X=null;else if(X?.sessionId!==s.payload.session.id)X=Pt(s.payload.session);A(_,s.payload.session);return}if(s.type==="session-lifecycle"){X=s.payload,A(m,s.payload);return}if(s.type==="connection"){if(l)l={...l,connection:s.payload.connection};A(O,s.payload.connection);return}if(s.type==="settings"){if(l)l={...l,settings:s.payload.settings};A(W,s.payload.settings);return}if(s.type==="item"){if(l)l={...l,item:s.payload.item};A(oe,s.payload.item);return}if(s.type==="status-control-event"){A(fe,s.payload);return}if(s.type==="popover-closed"){A(Se,s.payload);return}if(s.type==="action"){let c=(T)=>{if(!H)P({channel:f,v:S,type:"action-result",id:s.id,payload:T})},h=ae;if(!h){c({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>h(s.payload)).then(()=>c({ok:!0}),(T)=>{let k=(T instanceof Error?T.message:String(T)).trim();c({ok:!1,error:(k||"Action failed.").slice(0,ue)})});return}if(s.type==="file-open"){let c=s.payload;if(de&&qt(de,c))return;de=c,A(Te,s.payload);return}if(s.type==="file-saved"){A(he,s.payload.version);return}if(s.type==="file-snapshot"){let c=(k)=>{if(!H)P({channel:f,v:S,type:"file-snapshot-result",id:s.id,payload:k})},h=(k)=>c({error:(k.trim()||"Could not read the edited file.").slice(0,ue)}),T=ce;if(!T){h("This extension does not edit files.");return}Promise.resolve().then(()=>T(s.payload.purpose)).then((k)=>{if(qe(k)>Oe){h(`The file is over ${Oe} ${"bytes"in k?"bytes":"characters"}.`);return}if(k.version.length>ye){h(`The snapshot version is over ${ye} characters.`);return}c({snapshot:"bytes"in k?{bytes:k.bytes,version:k.version}:{content:k.content,version:k.version}})},(k)=>h(k instanceof Error?k.message:String(k)));return}if(s.type==="resolve"){let c=(T)=>{P({channel:f,v:S,type:"resolve-result",id:s.id,payload:T})},h=ie;if(!h){c({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>h(s.payload)).then((T)=>c({item:T?te(T):null}),(T)=>{let k=(T instanceof Error?T.message:String(T)).trim();c({error:(k||"Command failed.").slice(0,ue)})});return}let a=Q.get(s.id);if(!a)return;if(clearTimeout(a.timer),Q.delete(s.id),s.ok){a.resolve(s.payload);return}a.reject(new d(s.code,s.error))};n.addEventListener("message",$t),P({channel:f,v:S,type:"hello"});let R=(t,s=i)=>{if(H||n.parent===n)return Promise.reject(new d("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((a,c)=>{let h=setTimeout(()=>{Q.delete(t.id),c(new d("HOST_TIMEOUT","Host did not answer in time."))},s);Q.set(t.id,{resolve:a,reject:c,timer:h}),P(t)})},y=(t)=>R(t).then(()=>{return}),x={channel:f,v:S},ze=(t)=>{if(!H&&n.parent!==n)P(t)},Dt=()=>ze({...x,type:"file-save"}),Ht=(t)=>{if(!vn(t)||!Yn(t))return;t.preventDefault(),Dt()},Ft=(t)=>{if(!vn(t)||t.key!=="Escape"||l?.surface!=="popover"||!l.popover)return;t.preventDefault(),jt(l.popover.id,"escape").catch(()=>{return})},me=()=>{let t=l?.surface==="popover"?l.popover:void 0;if(!t)return;let s=le||pe;if(Nt===s)return;Nt=s,zt(t.id,s).catch(()=>{return})},ge=()=>{if(l?.surface!=="popover"||le)return;le=!0,me()},Xt=(t)=>{if(l?.surface!=="popover"||t.relatedTarget!==null||!le)return;le=!1,me()},Bt=()=>{if(l?.surface!=="popover"||pe)return;pe=!0,me()},Vt=()=>{if(l?.surface!=="popover"||!pe)return;pe=!1,me()},D=(t,s=1024)=>{if(!t.trim()||t.length>s)throw new d("HOST_REJECTED",`Identity must contain 1 to ${s} characters.`)},We=async(t)=>{if(t.kind!=="projects")D(t.projectId);let s=await R({...x,type:"workspace-read",id:E(u),payload:t});if(!s||!("kind"in s)||!("state"in s)||s.kind!==t.kind)throw new d("HOST_REJECTED","Host did not return workspace data.");return s},Ke=async(t,s)=>{if(t.kind!=="projects")D(t.projectId);let a=E(u);Z.set(a,s);try{await y({...x,type:"workspace-subscribe",id:E(u),payload:{subscriptionId:a,query:t}})}catch(c){if(Z.delete(a),!H)P({...x,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:a}});throw c}return()=>{if(!Z.delete(a)||H)return;P({...x,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:a}})}},Fn=async(t,s)=>{if(t.kind==="session")D(t.sessionId);if(t.kind==="project")D(t.projectId);let a=E(u);q.set(a,s);try{await y({...x,type:"shells-subscribe",id:E(u),payload:{subscriptionId:a,scope:t}})}catch(c){if(q.delete(a),!H)P({...x,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:a}});throw c}return()=>{if(!q.delete(a)||H)return;P({...x,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:a}})}},be=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Ye))throw new d("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ee(t.value))throw new d("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Qe)throw new d("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&l?.features?.deviceStorage!==!0)throw new d("UNSUPPORTED","This host does not support device storage.");let s=await R({...x,type:"storage",id:E(u),payload:t});if(!s||!("storage"in s)||s.op!==t.op)throw new d("HOST_REJECTED","Host did not return storage data.");return s},jt=(t,s)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):y({...x,type:"popover-close",id:E(u),payload:s?{id:t,reason:s}:{id:t}}),zt=(t,s)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):y({...x,type:"popover-anchor",id:E(u),payload:{id:t,active:s}});return n.addEventListener("keydown",Ft,!0),n.addEventListener("pointerover",ge),n.addEventListener("pointermove",ge),n.addEventListener("pointerout",Xt),n.addEventListener("focus",Bt),n.addEventListener("blur",Vt),{onAction:(t)=>(ae=t,()=>{if(ae===t)ae=null}),listProjects:async()=>{let t=await We({kind:"projects"});if(t.kind!=="projects")throw new d("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let s=await We({kind:"worktrees",projectId:t});if(s.kind!=="worktrees")throw new d("HOST_REJECTED","Expected worktrees.");return s},listSessions:async(t)=>{let s=await We({kind:"sessions",projectId:t});if(s.kind!=="sessions")throw new d("HOST_REJECTED","Expected sessions.");return s},onProjects:(t)=>Ke({kind:"projects"},(s)=>{if(s.kind==="projects")t(s)}),onWorktrees:(t,s)=>Ke({kind:"worktrees",projectId:t},(a)=>{if(a.kind==="worktrees")s(a)}),onSessions:(t,s)=>Ke({kind:"sessions",projectId:t},(a)=>{if(a.kind==="sessions")s(a)}),onRunningShells:(t,s)=>Fn(t,s),readShellOutput:async(t,s)=>{D(t,Ae);let a=s?.cursor;if(a!==void 0&&(!Number.isInteger(a)||a<0))throw new d("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let c=s?.tailBytes;if(c!==void 0&&(!Number.isInteger(c)||c<1||c>ve))throw new d("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${ve}.`);let T=await R({...x,type:"shell-output",id:E(u),payload:{shellId:t,cursor:a,tailBytes:c}});if(!T||typeof T.output!=="string"||!Number.isFinite(T.cursor))throw new d("HOST_REJECTED","Host did not return shell output.");return T},stopShell:async(t)=>{if(D(t,Ae),(await R({...x,type:"shell-stop",id:E(u),payload:{shellId:t}}))?.stopped!==!0)throw new d("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{D(t),await y({...x,type:"open-session",id:E(u),payload:{sessionId:t}})},storage:{get:async(t,s)=>{let a=Ne(s),c={op:"get",key:t};if(a)c.scope=a;let h=await be(c);return h.op==="get"&&h.found?h.value:void 0},set:async(t,s,a)=>{let c=Ne(a),h={op:"set",key:t,value:s};if(c)h.scope=c;await be(h)},delete:async(t,s)=>{let a=Ne(s),c={op:"delete",key:t};if(a)c.scope=a;await be(c)},keys:async(t)=>{let s=Ne(t),a={op:"keys"};if(s)a.scope=s;let c=await be(a);if(c.op!=="keys")throw new d("HOST_REJECTED","Expected storage keys.");return c.keys}},onReady:(t)=>{if(r.add(t),l)t(l);return()=>{r.delete(t)}},onDirectory:(t)=>{if(p.add(t),l)t(l.directory);return()=>{p.delete(t)}},onSession:(t)=>{if(_.add(t),l)t(l.session);return()=>{_.delete(t)}},onSessionLifecycle:(t)=>{if(m.add(t),X)t(X);return()=>{m.delete(t)}},onConnection:(t)=>{if(O.add(t),l)t(l.connection);return()=>{O.delete(t)}},onSettings:(t)=>{if(W.add(t),l)t(l.settings);return()=>{W.delete(t)}},onItem:(t)=>{if(oe.add(t),l)t(l.item);return()=>{oe.delete(t)}},onStatusControl:(t)=>(fe.add(t),()=>{fe.delete(t)}),onPopoverClosed:(t)=>(Se.add(t),()=>{Se.delete(t)}),setStatusControls:(t)=>{if(l?.features?.statusControls!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support status controls."));if(!Zt(t))return Promise.reject(new d("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return y({...x,type:"status-controls",id:E(u),payload:{controls:t}})},openPopover:(t)=>{if(l?.features?.popovers!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support popovers."));if(!tt(t))return Promise.reject(new d("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return y({...x,type:"popover-open",id:E(u),payload:t})},closePopover:jt,setPopoverAnchorActive:zt,onResolve:(t)=>(ie=t,()=>{if(ie===t)ie=null}),toast:(t)=>{let s=t.message.trim();if(!s||s.length>xe)return Promise.reject(new d("HOST_REJECTED",`Toast message must contain 1 to ${xe} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>ke))return Promise.reject(new d("HOST_REJECTED",`Toast copy text must contain 1 to ${ke} characters.`));return y({channel:f,v:S,type:"toast",id:E(u),payload:{...t,message:s}})},openUrl:(t)=>y({channel:f,v:S,type:"open-url",id:E(u),payload:{url:t}}),openCommit:(t)=>ot(t)?y({channel:f,v:S,type:"open-commit",id:E(u),payload:{sha:t}}):Promise.reject(new d("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>y({channel:f,v:S,type:"open-surface",id:E(u),payload:{surfaceId:t}}),writeClipboard:(t)=>y({channel:f,v:S,type:"clipboard-write",id:E(u),payload:{text:t}}),compose:(t)=>y({channel:f,v:S,type:"compose",id:E(u),payload:t}),attach:(t)=>y({channel:f,v:S,type:"attach",id:E(u),payload:te(t)}),startSession:async(t)=>{if(t.projectId!==void 0)D(t.projectId);let s=t.worktree;if(s&&s!==!0)if(s.kind==="existing")D(s.directory);else{if(s.name!==void 0)D(s.name,200);if(s.baseBranch!==void 0)D(s.baseBranch,200)}let a=await R({channel:f,v:S,type:"start-session",id:E(u),payload:dt(t)},e.requestTimeoutMs??180000);if(!st(a))throw new d("HOST_REJECTED","Host did not return a session.");return a},prompt:(t)=>R({channel:f,v:S,type:"prompt",id:E(u),payload:lt(t)}).then((s)=>{if(!rt(s))throw new d("HOST_REJECTED","Host did not return a prompt result.");return s}),sessionLink:(t)=>y({channel:f,v:S,type:"session-link",id:E(u),payload:te(t)}),close:()=>y({channel:f,v:S,type:"close",id:E(u)}),oauthStart:()=>y({channel:f,v:S,type:"oauth-start",id:E(u)}),oauthDisconnect:()=>y({channel:f,v:S,type:"oauth-disconnect",id:E(u)}),request:(t)=>(Ie(t.path)?R({channel:f,v:S,type:"request",id:E(u),payload:t}):On()).then((s)=>{if(!Le(s))throw new d("HOST_REJECTED","Host request result was empty.");return s}),serviceRequest:(t)=>(Ie(t.path)?R({channel:f,v:S,type:"service-request",id:E(u),payload:t}):On()).then((s)=>{if(!Le(s))throw new d("HOST_REJECTED","Host service request result was empty.");return s}),serviceStatus:()=>R({channel:f,v:S,type:"service-status",id:E(u)}).then((t)=>{if(!Et(t))throw new d("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(ne(t)?R({channel:f,v:S,type:"file-read",id:E(u),payload:{path:t}}):Me()).then((s)=>{if(!_t(s))throw new d("HOST_REJECTED","Host did not return file content.");return s}),writeFile:(t,s)=>{if(!ne(t))return Me();if(s.length>Ue)return Promise.reject(new d("FILE_TOO_LARGE",`Content is over ${Ue} characters.`));return R({channel:f,v:S,type:"file-write",id:E(u),payload:{path:t,content:s}}).then((a)=>{if(!ft(a))throw new d("HOST_REJECTED","Host did not confirm the write.");return a})},listDir:(t)=>(ne(t)?R({channel:f,v:S,type:"file-list",id:E(u),payload:{path:t}}):Me()).then((s)=>{if(!St(s))throw new d("HOST_REJECTED","Host did not return directory entries.");return s}),stat:(t)=>(ne(t)?R({channel:f,v:S,type:"file-stat",id:E(u),payload:{path:t}}):Me()).then((s)=>{if(!Tt(s))throw new d("HOST_REJECTED","Host did not return file status.");return s}),generate:(t)=>{let s=t.prompt.trim(),a=t.system?.trim();if(s.length===0||s.length>Ce)return Promise.reject(new d("HOST_REJECTED",`Prompt must be 1 to ${Ce} characters.`));if(a!==void 0&&(a.length===0||a.length>we))return Promise.reject(new d("HOST_REJECTED",`System prompt must be 1 to ${we} characters.`));let c=t.maxOutputTokens===void 0?void 0:Math.min(at,Math.max(1,Math.floor(t.maxOutputTokens)));if(c!==void 0&&!Number.isFinite(c))return Promise.reject(new d("HOST_REJECTED","maxOutputTokens must be a number."));let h={prompt:s};if(a!==void 0)h.system=a;if(c!==void 0)h.maxOutputTokens=c;return R({channel:f,v:S,type:"generate",id:E(u),payload:h},e.requestTimeoutMs??ct).then((T)=>{if(!ht(T))throw new d("HOST_REJECTED","Host did not return generated text.");return T})},onLateGenerateResult:(t)=>{Y.add(t);for(let s of Ve.splice(0))A([t],s);return Gt(),()=>{Y.delete(t)}},setBadge:(t)=>y({channel:f,v:S,type:"badge",id:E(u),payload:{count:pt(t)}}),setHeight:(t)=>y({channel:f,v:S,type:"resize",id:E(u),payload:{height:ut(t)}}),onFileOpen:(t)=>{if(Te.add(t),!je)je=!0,n.addEventListener("keydown",Ht,!0);if(de)t(de);return()=>{Te.delete(t)}},onFileSnapshot:(t)=>(ce=t,()=>{if(ce===t)ce=null}),onFileSaved:(t)=>(he.add(t),()=>{he.delete(t)}),reportFileChange:(t)=>ze({...x,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Dt,reportFileUnsupported:()=>ze({...x,type:"file-unsupported"}),dispose:()=>{for(let t of Z.keys())P({...x,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:t}});Z.clear();for(let t of q.keys())P({...x,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:t}});if(q.clear(),H=!0,ie=null,ae=null,ce=null,Te.clear(),he.clear(),je)n.removeEventListener("keydown",Ht,!0);n.removeEventListener("message",$t),n.removeEventListener("keydown",Ft,!0),n.removeEventListener("pointerover",ge),n.removeEventListener("pointermove",ge),n.removeEventListener("pointerout",Xt),n.removeEventListener("focus",Bt),n.removeEventListener("blur",Vt);for(let t of Q.values())clearTimeout(t.timer),t.reject(new d("HOST_UNAVAILABLE","Host client was disposed."));Q.clear(),r.clear(),p.clear(),_.clear(),m.clear(),O.clear(),W.clear(),oe.clear(),fe.clear(),Se.clear(),Y.clear(),Ve.length=0}}};var yn=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Qs=new Set(yn);var xn=["none","agent","user"];var qs=new Set(xn);var Qn=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Zn=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],kn=(e,n)=>{n.style.colorScheme=e.mode;for(let[o,i]of Qn)n.style.setProperty(o,e.tokens[i]);for(let[o,i,r]of Zn){let p=e.tokens[r]??"";n.style.setProperty(o,p),n.style.setProperty(i,p)}n.style.setProperty("font-family",e.tokens.font),n.style.setProperty("font-size","0.875rem"),n.style.setProperty("line-height","1.45"),n.style.setProperty("color",e.tokens.foreground)},bt=(e,n)=>{if(kn(e.theme,n),n.dataset)n.dataset.ocSurface=e.surface,n.dataset.ocTheme=e.theme.mode};var qn={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},b=(e,n)=>`var(--${e}, var(--oc-${qn[e]}, ${n}))`,V=b("surface-background","transparent"),Ge=b("surface-elevated","transparent"),se=b("surface-elevated-foreground","inherit"),G=b("surface-foreground","inherit"),g=b("surface-muted-foreground","gray"),es=b("surface-muted","transparent"),K=b("interactive-border","currentColor"),U=b("interactive-hover","transparent"),J=b("interactive-active","transparent"),At=b("interactive-selection","transparent"),vt=b("interactive-selection-foreground","inherit"),B=b("primary","currentColor"),Ot=b("primary-text","inherit"),yt=b("error-text","inherit"),ts=b("font-sans","inherit"),xt=b("font-mono","monospace"),In=b("radius","9px"),kt=`calc(${In} - 2px)`,Rn=`calc(${In} - 4px)`,v=(e,n,o="transparent")=>`color-mix(in srgb, ${e} ${n}%, ${o})`,Un=`background-image: linear-gradient(${U}, ${U});`,Rt=(e)=>`box-shadow: inset 0 0 0 1px ${e}, var(--oc-sdk-field-lift);`,Ut="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Cn="box-shadow: var(--oc-sdk-lit);",wn=`inset 0 1px 0 0 ${v(G,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,ns=`
:root {
  --oc-sdk-edge: ${v(G,10)};
  --oc-sdk-field-bg: ${Ge};
  --oc-sdk-raised-bg: ${V};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.1);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${v(G,6)};
  --oc-sdk-field-bg: ${v(V,50,Ge)};
  --oc-sdk-raised-bg: ${Ge};
  --oc-sdk-field-lift: ${wn};
  --oc-sdk-raised-lift: ${wn};
  --oc-sdk-lit: inset 0 1px 0 0 ${v(G,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.36);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,Pe=(e)=>{let n=b(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${n}; --oc-sdk-tone-text: ${b(`${e}-text`,"inherit")}; }`},ss=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,Ln=`${ns}
.oc-sdk { color: ${G}; font-family: ${ts}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Un} }
.oc-sdk-mono { font-family: ${xt}; }
.oc-sdk-muted { color: ${g}; }
${Pe("success")}${Pe("warning")}${Pe("error")}${Pe("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${B}; --oc-sdk-tone-text: ${Ot}; }

.oc-sdk-btn { border-radius: ${kt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Rn}; }
.oc-sdk-btn[data-variant="default"] { color: ${Ot}; background: ${v(B,10,V)}; border-color: ${v(B,12)}; ${Cn} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${v(B,16,V)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${v(B,22,V)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${es}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${se}; ${Ut} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${J}, ${J}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${U}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${J}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${b("status-error","red")}; color: ${yt}; background: ${v("var(--oc-sdk-tone)",7,V)}; border-color: ${v("var(--oc-sdk-tone)",12)}; ${Cn} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${v("var(--oc-sdk-tone)",9,V)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${v("var(--oc-sdk-tone)",11,V)}; box-shadow: none; }

.oc-sdk-field-note { color: ${g}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${yt}; }
.oc-sdk-input { border-radius: ${kt}; background: var(--oc-sdk-field-bg); color: ${se}; ${Rt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${g}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Rt(v(G,26))} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Rt(b("status-error","red"))} }
.oc-sdk-input[data-mono="true"] { font-family: ${xt}; }

.oc-sdk-search-icon { color: ${g}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${B}; }
.oc-sdk-search-clear { border-radius: ${Rn}; color: ${g}; }
.oc-sdk-search-clear:hover { background: ${U}; color: ${G}; }

.oc-sdk-trigger { border-radius: ${kt}; background: var(--oc-sdk-raised-bg); color: ${se}; ${Ut} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${U}, ${U}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${g}; }
.oc-sdk-trigger-chevron { color: ${g}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow. Its outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${se}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ge}; background-clip: padding-box; color: ${se}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${U}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${At}; color: ${vt}; }
.oc-sdk-option-check { color: ${G}; }
.oc-sdk-option[data-destructive="true"] { color: ${yt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${v(b("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${g}; }
.oc-sdk-popup-empty { color: ${g}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${K}; border-radius: 4px; color: ${G}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${v(G,60,K)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${K}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${V}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${B}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Un} }
.oc-sdk-check-desc { color: ${g}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${v(G,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${g}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${G}; }
.oc-sdk-tab[aria-selected="true"] { color: ${vt}; background: ${At}; border-color: ${K}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${se}; background: var(--oc-sdk-raised-bg); ${Ut} }
.oc-sdk-tab-count { color: ${g}; }

.oc-sdk-badge { border-radius: 9999px; background: ${U}; color: ${g}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${v("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${U}; }
.oc-sdk-row[aria-selected="true"] { background: ${At}; color: ${vt}; }
.oc-sdk-row-lead { font-family: ${xt}; color: ${g}; }
.oc-sdk-row-sub { color: ${g}; }
.oc-sdk-row-meta { color: ${g}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${g}; }

.oc-sdk-empty-body { color: ${g}; }

.oc-sdk-spinner { color: ${g}; }
.oc-sdk-spinner-ring { border-color: ${K}; border-top-color: ${B}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${v("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${g}; }

.oc-sdk-separator { color: ${g}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${v(K,40)}; }

.oc-sdk-progress-label { color: ${g}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${K}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${B}); }

.oc-sdk-text a { color: ${Ot}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${v(K,60)}; }
`,C=`
${Je}
${ss}
${Ln}`;var Mn=1,cs=3000;var L=gt(),Xe=null,Mt=null,Ee=null,_e="overview",I=null,ds=null;L.onReady((e)=>{if(bt(e,document.documentElement),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,Xe=e.directory,Be(),Ee)clearInterval(Ee);Ee=window.setInterval(()=>{if(document.visibilityState==="visible")Be()},cs),L.onDirectory((n)=>{if(n!==Xe)Xe=n,Be()}),window.addEventListener("beforeunload",()=>{if(Ee)clearInterval(Ee)})});async function Be(){if(!Xe){It("No project open");return}try{let e=await ls();if(!e){It("No vstack workflow found in this project");return}if(e.schemaVersion!==Mn){Lt(Error(`Unsupported schema version: ${e.schemaVersion}. Expected ${Mn}`));return}let n=await ps();if(!n){It("No active workflow state");return}Ts(n),Mt=new Date,Hn()}catch(e){if(console.error("Failed to load dashboard:",e),e instanceof Error&&e.message.includes("NOT_GRANTED"))Lt(Error("Files permission denied. Please approve the 'files' capability in OpenChamber Settings."));else Lt(e)}}async function ls(){let e=await L.readFile(".vstack/manifest.json");return JSON.parse(e.content)}async function ps(){let e=await L.readFile(".vstack/state/index.json");return JSON.parse(e.content)}async function us(e){let n=await L.readFile(`.vstack/deliveries/${e}/delivery.json`);return JSON.parse(n.content)}async function Gn(e){try{let n=await L.listDir(`.vstack/deliveries/${e}/evidence`),o=[];for(let i of n.entries)if(i.kind==="file"&&i.name.endsWith(".json")){let r=await L.readFile(`.vstack/deliveries/${e}/evidence/${i.name}`);o.push(JSON.parse(r.content))}return o.sort((i,r)=>new Date(r.completedAt).getTime()-new Date(i.completedAt).getTime())}catch{return[]}}async function Es(e){try{let n=await L.listDir(`.vstack/deliveries/${e}/reviews`),o=[];for(let i of n.entries)if(i.kind==="file"&&i.name.endsWith(".json")){let r=await L.readFile(`.vstack/deliveries/${e}/reviews/${i.name}`);o.push(JSON.parse(r.content))}return o.sort((i,r)=>new Date(r.startedAt).getTime()-new Date(i.startedAt).getTime())}catch{return[]}}async function _s(e){try{let n=await L.listDir(`.vstack/deliveries/${e}/findings`),o=[];for(let i of n.entries)if(i.kind==="file"&&i.name.endsWith(".json")){let r=await L.readFile(`.vstack/deliveries/${e}/findings/${i.name}`);o.push(JSON.parse(r.content))}return o.sort((i,r)=>new Date(r.createdAt).getTime()-new Date(i.createdAt).getTime())}catch{return[]}}async function fs(e){try{let n=await L.listDir(`.vstack/deliveries/${e}/releases`),o=[];for(let i of n.entries)if(i.kind==="file"&&i.name.endsWith(".json")){let r=await L.readFile(`.vstack/deliveries/${e}/releases/${i.name}`);o.push(JSON.parse(r.content))}return o.sort((i,r)=>new Date(r.createdAt).getTime()-new Date(i.createdAt).getTime())}catch{return[]}}async function Ss(e){try{let n=await L.listDir(`.vstack/deliveries/${e}/deployments`),o=[];for(let i of n.entries)if(i.kind==="file"&&i.name.endsWith(".json")){let r=await L.readFile(`.vstack/deliveries/${e}/deployments/${i.name}`);o.push(JSON.parse(r.content))}return o.sort((i,r)=>new Date(r.startedAt).getTime()-new Date(i.startedAt).getTime())}catch{return[]}}function Ts(e){hs(e),Nn(e),$n(),Pn(),vs(),Os(),ys(),xs(),Hn(),document.getElementById("tabs")?.addEventListener("click",(n)=>{let o=n.target;if(!o.classList.contains("tab"))return;if(document.querySelectorAll(".tab").forEach((i)=>{i.classList.remove("active"),i.setAttribute("aria-selected","false")}),document.querySelectorAll(".tab-panel").forEach((i)=>i.classList.remove("active")),o.classList.add("active"),o.setAttribute("aria-selected","true"),document.getElementById(`panel-${o.dataset.tab}`)?.classList.add("active"),_e=o.dataset.tab,_e==="deliveries")Nn(e);else if(_e==="tasks"&&I)Pn()}),document.getElementById("refreshBtn")?.addEventListener("click",Be),ds=e}function hs(e){let n=e.activeDeliveries?.[0];document.getElementById("goal").textContent=n?.title||"-",document.getElementById("status").textContent=n?.status||"-",document.getElementById("currentStep").textContent=n?.currentPhase||"-",document.getElementById("activeTask").textContent="-";let o=document.getElementById("statusBadge");o.className=`status-badge status-${n?.status||"idle"}`,o.textContent=n?.status||"Idle";let i=n?ms(n.status):"Create a delivery (vstack_delivery_create)";document.getElementById("nextAction").textContent=i;let r=e.activeDeliveries?.filter((m)=>m.status==="completed").length||0,p=e.activeDeliveries?.length||0,_=p>0?r/p*100:0;document.getElementById("progressFill").style.width=`${_}%`,document.getElementById("progressText").textContent=`${r}/${p} deliveries`,document.getElementById("lastUpdated").textContent=e.updatedAt?`Last updated: ${new Date(e.updatedAt).toLocaleString()}`:"Last updated: never"}function ms(e){switch(e){case"proposed":return"Start workflow (vstack_workflow_start)";case"active":return"Continue work on current phase";case"blocked":return"Resolve blocker";case"completed":return"Delivery completed";default:return"Check vstack_status tool"}}function Nn(e){let n=document.getElementById("deliveriesList");if((e.activeDeliveries||[]).length===0){n.innerHTML='<div class="empty-state">No active deliveries. Create one with vstack_delivery_create.</div>';return}n.innerHTML=e.activeDeliveries.map((i)=>`
    <div class="delivery-item ${i.id===I?"selected":""}" data-id="${i.id}">
      <div class="delivery-header">
        <span class="delivery-title">${w(i.title)}</span>
        <span class="delivery-status status-${i.status}">${i.status}</span>
      </div>
      <div class="delivery-meta">
        <span>${i.type} • ${i.profile}</span>
        <span>${i.currentPhase}</span>
        <span>${i.revision} rev</span>
      </div>
    </div>
  `).join(""),document.querySelectorAll(".delivery-item").forEach((i)=>{i.addEventListener("click",()=>{let r=i.getAttribute("data-id");I=r,_e="delivery-detail",$n(r),ks("delivery-detail")})})}function $n(e,n,o,i){let r=document.getElementById("deliveryDetail");r.innerHTML=`
    <div class="delivery-detail-header">
      <h2>${e.title}</h2>
      <div class="delivery-meta">
        <span class="type-badge type-${e.type}">${e.type}</span>
        <span class="profile-badge">${e.profile}</span>
        <span class="risk-badge risk-${e.risk}">${e.risk}</span>
      </div>
      <p>${e.description}</p>
    </div>
    
    <div class="detail-tabs">
      <nav class="sub-tabs" role="tablist">
        <button class="sub-tab active" role="tab" data-tab="phases" aria-selected="true">Phases (${n.length})</button>
        <button class="sub-tab" role="tab" data-tab="tasks" aria-selected="false">Tasks (${o.length})</button>
        <button class="sub-tab" role="tab" data-tab="agents" aria-selected="false">Agents (${i.length})</button>
        <button class="sub-tab" role="tab" data-tab="quality" aria-selected="false">Quality</button>
        <button class="sub-tab" role="tab" data-tab="reviews" aria-selected="false">Reviews</button>
      </nav>
      
      <div class="sub-tab-panel active" id="subpanel-phases" role="tabpanel">
        ${gs(n)}
      </div>
      <div class="sub-tab-panel" id="subpanel-tasks" role="tabpanel">
        ${bs(o)}
      </div>
      <div class="sub-tab-panel" id="subpanel-agents" role="tabpanel">
        ${As(i)}
      </div>
      <div class="sub-tab-panel" id="subpanel-quality" role="tabpanel">
        <div class="empty-state">Quality checks coming soon</div>
      </div>
      <div class="sub-tab-panel" id="subpanel-reviews" role="tabpanel">
        <div class="empty-state">Reviews coming soon</div>
      </div>
    </div>
  `,r.querySelectorAll(".sub-tab").forEach((p)=>{p.addEventListener("click",()=>{r.querySelectorAll(".sub-tab").forEach((_)=>{_.classList.remove("active"),_.setAttribute("aria-selected","false")}),r.querySelectorAll(".sub-tab-panel").forEach((_)=>_.classList.remove("active")),p.classList.add("active"),p.setAttribute("aria-selected","true"),document.getElementById(`subpanel-${p.dataset.tab}`).classList.add("active")})})}function gs(e){if(e.length===0)return'<div class="empty-state">No phases</div>';return`
    <table class="phases-table">
      <thead>
        <tr><th>Phase</th><th>Status</th><th>Sequence</th><th>Required Gates</th><th>Passed</th><th>Started</th><th>Completed</th></tr>
      </thead>
      <tbody>
        ${e.map((n)=>`
          <tr class="phase-row status-${n.status}">
            <td>${n.phase}</td>
            <td><span class="status-badge ${z(n.status)}">${n.status}</span></td>
            <td>${n.runSequence}</td>
            <td>${n.requiredGates.join(", ")||"None"}</td>
            <td>${n.gateResults?.filter((o)=>o.status==="passed").length||0}/${n.requiredGates.length}</td>
            <td>${n.startedAt?F(n.startedAt):"-"}</td>
            <td>${n.completedAt?F(n.completedAt):"-"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}function bs(e){if(e.length===0)return'<div class="empty-state">No tasks</div>';return`
    <table class="tasks-table">
      <thead>
        <tr><th>Title</th><th>Type</th><th>Status</th><th>Priority</th><th>Agent</th><th>Dependencies</th></tr>
      </thead>
      <tbody>
        ${e.map((n)=>`
          <tr class="task-row status-${n.status}">
            <td>${n.title}</td>
            <td><span class="type-badge type-${n.type}">${n.type}</span></td>
            <td><span class="status-badge ${z(n.status)}">${n.status}</span></td>
            <td><span class="priority-badge priority-${n.priority}">${n.priority}</span></td>
            <td>${n.assignedAgentId||"-"}</td>
            <td>${n.dependencies?.join(", ")||"None"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}function As(e){if(e.length===0)return'<div class="empty-state">No agent runs</div>';return`
    <table class="agents-table">
      <thead>
        <tr><th>Agent</th><th>Task</th><th>Status</th><th>Session</th><th>Started</th><th>Completed</th></tr>
      </thead>
      <tbody>
        ${e.map((n)=>`
          <tr>
            <td>${n.agentId}</td>
            <td>${n.taskId||"-"}</td>
            <td><span class="status-badge ${z(n.status)}">${n.status}</span></td>
            <td>${n.sessionId?.slice(0,8)||"-"}</td>
            <td>${F(n.startedAt)}</td>
            <td>${n.completedAt?F(n.completedAt):"-"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}async function vs(){let e=document.getElementById("qualityContent");if(!I){e.innerHTML='<div class="empty-state">Select a delivery to view quality checks</div>';return}try{let[n,o]=await Promise.all([us(I),Gn(I)]);if(o.length===0){e.innerHTML='<div class="empty-state">No quality evidence recorded yet</div>';return}let i=o.reduce((r,p)=>{let _=p.checkId||p.type;if(!r[_])r[_]=[];return r[_].push(p),r},{});e.innerHTML=`
      <div class="quality-summary">
        <div class="quality-stats">
          <div class="stat">
            <span class="stat-value">${o.length}</span>
            <span class="stat-label">Total Checks</span>
          </div>
          <div class="stat">
            <span class="stat-value">${o.filter((r)=>r.status==="passed").length}</span>
            <span class="stat-label">Passed</span>
          </div>
          <div class="stat">
            <span class="stat-value">${o.filter((r)=>r.status==="failed").length}</span>
            <span class="stat-label">Failed</span>
          </div>
          <div class="stat">
            <span class="stat-value">${o.filter((r)=>r.status==="error"||r.status==="timeout").length}</span>
            <span class="stat-label">Errors</span>
          </div>
        </div>
      </div>
      
      <div class="quality-checks">
        ${Object.entries(i).map(([r,p])=>`
          <div class="check-group">
            <h4>${w(r)} <span class="badge">${p.length}</span></h4>
            <table class="evidence-table">
              <thead>
                <tr><th>Type</th><th>Status</th><th>Exit Code</th><th>Duration</th><th>Started</th><th>Summary</th></tr>
              </thead>
              <tbody>
                ${p.map((_)=>`
                  <tr class="status-${_.status}">
                    <td><span class="type-badge type-${_.type}">${_.type}</span></td>
                    <td><span class="status-badge ${z(_.status)}">${_.status}</span></td>
                    <td>${_.exitCode!==null?_.exitCode:"-"}</td>
                    <td>${Dn(_.startedAt,_.completedAt)}</td>
                    <td>${F(_.startedAt)}</td>
                    <td>${w(_.summary||"-")}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `).join("")}
      </div>
    `}catch(n){console.error("Failed to render quality:",n),e.innerHTML='<div class="error-state">Failed to load quality data</div>'}}async function Os(){let e=document.getElementById("reviewsContent");if(!I){e.innerHTML='<div class="empty-state">Select a delivery to view reviews</div>';return}try{let[n,o]=await Promise.all([Es(I),_s(I)]);if(n.length===0&&o.length===0){e.innerHTML='<div class="empty-state">No reviews conducted yet</div>';return}let i=`
      <div class="reviews-summary">
        <div class="quality-stats">
          <div class="stat">
            <span class="stat-value">${n.length}</span>
            <span class="stat-label">Review Runs</span>
          </div>
          <div class="stat">
            <span class="stat-value">${o.length}</span>
            <span class="stat-label">Total Findings</span>
          </div>
          <div class="stat">
            <span class="stat-value">${o.filter((r)=>r.severity==="critical"||r.severity==="high").length}</span>
            <span class="stat-label">Critical/High</span>
          </div>
          <div class="stat">
            <span class="stat-value">${o.filter((r)=>r.status==="fixed"||r.status==="resolved").length}</span>
            <span class="stat-label">Resolved</span>
          </div>
        </div>
      </div>
    `;if(n.length>0)i+=`
        <div class="review-runs">
          <h4>Review Runs</h4>
          <table class="review-table">
            <thead>
              <tr><th>Profile</th><th>Status</th><th>Reviewers</th><th>Findings</th><th>Started</th><th>Completed</th></tr>
            </thead>
            <tbody>
              ${n.map((r)=>`
                <tr>
                  <td><span class="type-badge type-${r.profile}">${r.profile}</span></td>
                  <td><span class="status-badge ${z(r.status)}">${r.status}</span></td>
                  <td>${r.reviewers?.length||0}</td>
                  <td>${r.findings?.length||0}</td>
                  <td>${F(r.startedAt)}</td>
                  <td>${r.completedAt?F(r.completedAt):"-"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;if(o.length>0){let r=o.reduce((_,m)=>{if(!_[m.severity])_[m.severity]=[];return _[m.severity].push(m),_},{});i+=`
        <div class="findings">
          <h4>Findings by Severity</h4>
          ${["critical","high","medium","low","informational"].map((_)=>{let m=r[_]||[];if(m.length===0)return"";return`
              <div class="severity-group severity-${_}">
                <h5>${_.toUpperCase()} (${m.length})</h5>
                <table class="findings-table">
                  <thead>
                    <tr><th>Lens</th><th>Title</th><th>File</th><th>Status</th><th>Reviewer</th></tr>
                  </thead>
                  <tbody>
                    ${m.map((O)=>`
                      <tr>
                        <td><span class="type-badge type-${O.lens}">${O.lens}</span></td>
                        <td>${w(O.title)}</td>
                        <td>${O.filePath?`${w(O.filePath)}${O.lineRange?`:${O.lineRange.start}-${O.lineRange.end}`:""}`:"-"}</td>
                        <td><span class="status-badge ${z(O.status)}">${O.status}</span></td>
                        <td>${w(O.reviewerAgentId||"-")}</td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            `}).join("")}
        </div>
      `}e.innerHTML=i}catch(n){console.error("Failed to render reviews:",n),e.innerHTML='<div class="error-state">Failed to load review data</div>'}}async function ys(){let e=document.getElementById("releasesContent");if(!I){e.innerHTML='<div class="empty-state">Select a delivery to view releases</div>';return}try{let[n,o]=await Promise.all([fs(I),Ss(I)]);if(n.length===0&&o.length===0){e.innerHTML='<div class="empty-state">No releases or deployments yet</div>';return}let i="";if(n.length>0)i+=`
        <div class="releases-list">
          <h4>Release Candidates</h4>
          ${n.map((r)=>`
            <div class="release-card status-${r.status}">
              <div class="release-header">
                <h5>${w(r.title)} <span class="badge version">${w(r.version)}</span></h5>
                <span class="status-badge ${z(r.status)}">${r.status}</span>
              </div>
              <div class="release-meta">
                <span>Artifacts: ${r.artifacts?.length||0}</span>
                <span>Created: ${F(r.createdAt)}</span>
              </div>
              ${r.changelog?`<div class="changelog">${w(r.changelog)}</div>`:""}
            </div>
          `).join("")}
        </div>
      `;if(o.length>0)i+=`
        <div class="deployments-list">
          <h4>Deployments</h4>
          <table class="deployments-table">
            <thead>
              <tr><th>Environment</th><th>Status</th><th>Health Checks</th><th>Started</th><th>Completed</th></tr>
            </thead>
            <tbody>
              ${o.map((r)=>`
                <tr class="status-${r.status}">
                  <td>${w(r.environment)}</td>
                  <td><span class="status-badge ${z(r.status)}">${r.status}</span></td>
                  <td>${r.healthChecks?.filter((p)=>p.status==="passed").length||0}/${r.healthChecks?.length||0}</td>
                  <td>${F(r.startedAt)}</td>
                  <td>${r.completedAt?F(r.completedAt):"-"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;e.innerHTML=i}catch(n){console.error("Failed to render releases:",n),e.innerHTML='<div class="error-state">Failed to load release data</div>'}}async function xs(){let e=document.getElementById("evidenceContent");if(!I){e.innerHTML='<div class="empty-state">Select a delivery to view evidence</div>';return}try{let n=await Gn(I);if(n.length===0){e.innerHTML='<div class="empty-state">No evidence recorded yet</div>';return}let o=n.reduce((i,r)=>{if(!i[r.source])i[r.source]=[];return i[r.source].push(r),i},{});e.innerHTML=`
      <div class="evidence-summary">
        <div class="quality-stats">
          <div class="stat">
            <span class="stat-value">${n.length}</span>
            <span class="stat-label">Total Records</span>
          </div>
          <div class="stat">
            <span class="stat-value">${n.filter((i)=>i.status==="passed").length}</span>
            <span class="stat-label">Passed</span>
          </div>
          <div class="stat">
            <span class="stat-value">${n.filter((i)=>i.status==="failed").length}</span>
            <span class="stat-label">Failed</span>
          </div>
        </div>
      </div>
      
      <div class="evidence-list">
        ${Object.entries(o).map(([i,r])=>`
          <div class="evidence-source-group">
            <h4>${w(i)} <span class="badge">${r.length}</span></h4>
            <table class="evidence-table">
              <thead>
                <tr><th>Type</th><th>Check</th><th>Status</th><th>Command</th><th>Commit</th><th>Duration</th><th>Summary</th></tr>
              </thead>
              <tbody>
                ${r.map((p)=>`
                  <tr class="status-${p.status}">
                    <td><span class="type-badge type-${p.type}">${p.type}</span></td>
                    <td>${w(p.checkId)}</td>
                    <td><span class="status-badge ${z(p.status)}">${p.status}</span></td>
                    <td><code>${w(p.command?.join(" ")||"-")}</code></td>
                    <td><code>${w(p.commitRef?.slice(0,8)||"-")}</code></td>
                    <td>${Dn(p.startedAt,p.completedAt)}</td>
                    <td>${w(p.summary||"-")}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `).join("")}
      </div>
    `}catch(n){console.error("Failed to render evidence:",n),e.innerHTML='<div class="error-state">Failed to load evidence data</div>'}}function Pn(){let e=document.getElementById("tasksList");if(!I){e.innerHTML='<div class="empty-state">Select a delivery to view tasks</div>';return}e.innerHTML='<div class="empty-state">Use Delivery Detail > Tasks tab for task view</div>'}function ks(e){_e=e,document.querySelectorAll(".tab").forEach((i)=>{i.classList.remove("active"),i.setAttribute("aria-selected","false")}),document.querySelectorAll(".tab-panel").forEach((i)=>i.classList.remove("active"));let n=document.querySelector(`.tab[data-tab="${e}"]`);if(n)n.classList.add("active"),n.setAttribute("aria-selected","true");let o=document.getElementById(`panel-${e}`);if(o)o.classList.add("active")}function z(e){return{proposed:"status-proposed",active:"status-active",blocked:"status-blocked",completed:"status-completed",cancelled:"status-cancelled",failed:"status-failed",dispatched:"status-dispatched",running:"status-running",pending:"status-pending",ready:"status-ready",in_progress:"status-in_progress",review:"status-review",not_started:"status-not_started",verifying:"status-verifying",skipped:"status-skipped",needs_rework:"status-needs_rework",approved:"status-approved",rejected:"status-rejected",expired:"status-expired"}[e]||"status-unknown"}function F(e){try{let n=new Date(e);return n.toLocaleDateString()+" "+n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return e}}function Dn(e,n){try{let o=new Date(e).getTime(),r=new Date(n).getTime()-o;if(r<1000)return`${r}ms`;if(r<60000)return`${(r/1000).toFixed(1)}s`;return`${(r/60000).toFixed(1)}m`}catch{return"-"}}function It(e){let n=document.getElementById("overviewContent");n.innerHTML=`<div class="empty-state">${e}</div>`}function Lt(e){let n=document.getElementById("overviewContent");n.innerHTML=`<div class="error-state">Error: ${e.message}</div>`}function Hn(){let e=document.getElementById("lastRefresh");e.textContent=Mt?`Last refreshed: ${Mt.toLocaleTimeString()}`:"Last refreshed: never"}function w(e){let n=document.createElement("div");return n.textContent=e,n.innerHTML}async function Rs(){}Rs();})();

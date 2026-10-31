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
`;function Kt(e){let n=e.documentElement;if(n.hasAttribute("data-oc-scrollbar-activity"))return;n.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",(i)=>{let r=i.target===e?n:i.target;if(!(r instanceof Element))return;if(!r.hasAttribute("data-oc-scrolling"))r.setAttribute("data-oc-scrolling","");let _=o.get(r);if(_!==void 0)clearTimeout(_);o.set(r,setTimeout(()=>{o.delete(r),r.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Hn=`(${Kt.toString()})(document);`;var Ye=128,Qe=65536;var Ae=128;var Oe=65536;var Zt=/^[a-z][a-z0-9-]{0,39}$/;var Jt=(e)=>Object(e)===e&&!Array.isArray(e),Ze=(e,n)=>Object.keys(e).every((o)=>n.includes(o)),Yt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Qt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,qt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let n=new Set;for(let o of e){if(!Jt(o)||!Zt.test(o.id)||!Yt(o.label))return!1;if(o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1)return!1;if(n.has(o.id))return!1;if(n.add(o.id),o.kind==="button"){if(!Ze(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!Ze(o,["kind","id","label","value","options","disabled"]))return!1;if(!Qt(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let i=new Set;for(let r of o.options){if(!Jt(r)||!Ze(r,["value","label"])||!Qt(r.value)||!Yt(r.label)||i.has(r.value))return!1;i.add(r.value)}if(!i.has(o.value))return!1}return!0};var be=20000000,ve=256;var qe=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,en=(e,n)=>{if(e.path!==n.path||e.readOnly!==n.readOnly)return!1;if(e.encoding==="text"||n.encoding==="text")return e.encoding==="text"&&n.encoding==="text"&&e.content===n.content;if(e.bytes.byteLength!==n.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==n.bytes[o])return!1;return!0};var tn=/^[A-Za-z0-9_-]{1,80}$/;var nn=["left","right","top","bottom"];var sn=(e,n=0,o={remaining:16000})=>{if(--o.remaining<0||n>=32)return!1;if(e===null)return!0;let i=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let r of i)if(!sn(r,n+1,o))return!1;return!0},et=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((n)=>/^(0|[1-9]\d*)$/.test(n)&&Number(n)<e.length)&&e.every(et);if(Object(e)===e){let n=Object.getPrototypeOf(e);return(n===null||n===Object.prototype)&&Object.values(e).every(et)}return String(e)===e||Number.isFinite(e)},tt=(e)=>{try{if(String(e.id)!==e.id||!tn.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!nn.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!sn(e.data)||!et(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var on=["file","directory","other","missing"],st=(e)=>Boolean(e&&"sessionId"in e),rt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var an=/^[0-9a-f]{7,64}$/i,ot=(e)=>an.test(e),xe=500,ye=32000,cn=16000,dn=128,ln=200,pn=2000,un=16000,En=80,_n=200,fn=16000;var Sn=2000;var it=20000,Re=1024,ke=2000000;var Ue=64000,Ce=8000,at=4000;var ct=960000;var Tn=999,hn=1e4,ue=500,mn=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],gn=["stopped","starting","ready","failed"],Xn=new Set(mn),An=(e)=>Xn.has(e),On=(e)=>e&&An(e)?e:"HOST_REJECTED",ee=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ee);if(Object(e)===e)return Object.values(e).every(ee);return!1},bn=(e)=>ee(e)&&JSON.stringify(e).length<=fn,rn=(e)=>e?.trim().slice(0,_n)??"",te=(e)=>{let n=e.id.trim().slice(0,dn),o=e.title.trim().slice(0,ln),i=e.url.trim().slice(0,pn),r=e.text?.trim().slice(0,un),_=e.author?.trim().slice(0,En),a=e.kind==="pull"?"pull":"issue",A={providerId:e.providerId.trim(),id:n,title:o||n,url:i,kind:a};if(r)A.text=r;if(_)A.author=_;if(a==="pull"){let x=rn(e.branches?.head),z=rn(e.branches?.base);if(x&&z)A.branches={head:x,base:z}}if(bn(e.data))A.data=e.data;return A},dt=(e)=>{let n=te(e);if(e.projectId)n.projectId=e.projectId;if(e.navigation)n.navigation=e.navigation;if(e.worktree)n.worktree=e.worktree;return n},lt=(e)=>{let n={text:e.text.trim().slice(0,cn)};if(e.send)n.send=!0;return n},pt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Tn,Math.max(0,Math.round(e)))},ut=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(hn,Math.max(0,Math.ceil(e)))};var ne=(e)=>e.length>0&&e.length<=Re&&!e.includes("\x00")&&!e.includes("\\");var we=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Sn)return!1;return!e.split("/").some((o)=>o==="."||o==="..")},Bn=new Set(gn),Et=(e)=>Boolean(e&&"status"in e&&Bn.has(String(e.status))&&!("body"in e)),Ie=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),_t=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),ft=(e)=>Boolean(e&&"written"in e&&e.written===!0),St=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Vn=new Set(on),Tt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Vn.has(String(e.kind))&&Number.isFinite(e.size)),ht=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),jn=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),zn=(e)=>Object(e)===e?e:null,nt=(e)=>String(e)===e&&e.length>0,Wn=(e)=>{if(!nt(e.id))return null;if(e.ok===!0){let n={channel:f,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)n.payload=e.payload;return n}if(e.ok===!1&&nt(e.error))return{channel:f,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:On(nt(e.code)?e.code:void 0)};return null},mt=(e)=>{let n=zn(e);if(!n||n.channel!==f||n.v!==S)return null;if(n.type==="result")return Wn(n);if(!jn.has(String(n.type))||Object(n.payload)!==n.payload)return null;return n};var vn=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Kn=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class l extends Error{code;constructor(e,n){super(n);this.name="HostRequestError",this.code=e}}var xn=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Le=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Re} characters without NUL or backslash.`)),Me=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},E=(e)=>(e.value+=1,`oc-${e.value}`),gt=(e={})=>{let n=e.target??("window"in globalThis?window:null);if(!n)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??((t)=>t===n.parent),i=e.requestTimeoutMs??it,r=new Set,_=new Set,a=new Set,A=new Set,x=new Set,z=new Set,oe=new Set,_e=new Set,fe=new Set,Y=new Set,Ve=[],ie=null,ae=null,Se=new Set,Te=new Set,ce=null,de=null,je=!1,Q=new Map,Z=new Map,q=new Map,F=!1,u={value:0},p=null,X=null,le=!1,pe=!1,Pt=null,Gt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},G=(t)=>{n.parent.postMessage(t,"*")},Dt=()=>{if(F||n.parent===n||Y.size===0||p?.features?.lateGenerateResults!==!0)return;G({channel:f,v:S,type:"generate-late-listen"})},O=(t,s)=>{for(let c of t)try{c(s)}catch(d){console.error(d)}},$t=(t)=>{if(!(t instanceof MessageEvent))return;if(!o(t.source))return;let s=mt(t.data);if(!s)return;if(s.type==="workspace"){let d=Z.get(s.payload.subscriptionId);if(d)O([d],s.payload.snapshot);return}if(s.type==="shells"){let d=q.get(s.payload.subscriptionId);if(d)O([d],s.payload.snapshot);return}if(s.type==="ready"){if(p=s.payload,X=Gt(s.payload.session),O(r,s.payload),O(_,s.payload.directory),O(a,s.payload.session),X)O(A,X);O(x,s.payload.connection),O(z,s.payload.settings),O(oe,s.payload.item),Dt();return}if(s.type==="generate-late"){if(Y.size===0)Ve.push(s.payload);else O(Y,s.payload);return}if(s.type==="directory"){if(p)p={...p,directory:s.payload.directory};O(_,s.payload.directory);return}if(s.type==="session"){if(p)p={...p,session:s.payload.session};if(!s.payload.session)X=null;else if(X?.sessionId!==s.payload.session.id)X=Gt(s.payload.session);O(a,s.payload.session);return}if(s.type==="session-lifecycle"){X=s.payload,O(A,s.payload);return}if(s.type==="connection"){if(p)p={...p,connection:s.payload.connection};O(x,s.payload.connection);return}if(s.type==="settings"){if(p)p={...p,settings:s.payload.settings};O(z,s.payload.settings);return}if(s.type==="item"){if(p)p={...p,item:s.payload.item};O(oe,s.payload.item);return}if(s.type==="status-control-event"){O(_e,s.payload);return}if(s.type==="popover-closed"){O(fe,s.payload);return}if(s.type==="action"){let d=(T)=>{if(!F)G({channel:f,v:S,type:"action-result",id:s.id,payload:T})},h=ae;if(!h){d({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>h(s.payload)).then(()=>d({ok:!0}),(T)=>{let k=(T instanceof Error?T.message:String(T)).trim();d({ok:!1,error:(k||"Action failed.").slice(0,ue)})});return}if(s.type==="file-open"){let d=s.payload;if(de&&en(de,d))return;de=d,O(Se,s.payload);return}if(s.type==="file-saved"){O(Te,s.payload.version);return}if(s.type==="file-snapshot"){let d=(k)=>{if(!F)G({channel:f,v:S,type:"file-snapshot-result",id:s.id,payload:k})},h=(k)=>d({error:(k.trim()||"Could not read the edited file.").slice(0,ue)}),T=ce;if(!T){h("This extension does not edit files.");return}Promise.resolve().then(()=>T(s.payload.purpose)).then((k)=>{if(qe(k)>be){h(`The file is over ${be} ${"bytes"in k?"bytes":"characters"}.`);return}if(k.version.length>ve){h(`The snapshot version is over ${ve} characters.`);return}d({snapshot:"bytes"in k?{bytes:k.bytes,version:k.version}:{content:k.content,version:k.version}})},(k)=>h(k instanceof Error?k.message:String(k)));return}if(s.type==="resolve"){let d=(T)=>{G({channel:f,v:S,type:"resolve-result",id:s.id,payload:T})},h=ie;if(!h){d({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>h(s.payload)).then((T)=>d({item:T?te(T):null}),(T)=>{let k=(T instanceof Error?T.message:String(T)).trim();d({error:(k||"Command failed.").slice(0,ue)})});return}let c=Q.get(s.id);if(!c)return;if(clearTimeout(c.timer),Q.delete(s.id),s.ok){c.resolve(s.payload);return}c.reject(new l(s.code,s.error))};n.addEventListener("message",$t),G({channel:f,v:S,type:"hello"});let C=(t,s=i)=>{if(F||n.parent===n)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((c,d)=>{let h=setTimeout(()=>{Q.delete(t.id),d(new l("HOST_TIMEOUT","Host did not answer in time."))},s);Q.set(t.id,{resolve:c,reject:d,timer:h}),G(t)})},y=(t)=>C(t).then(()=>{return}),R={channel:f,v:S},ze=(t)=>{if(!F&&n.parent!==n)G(t)},Ht=()=>ze({...R,type:"file-save"}),Ft=(t)=>{if(!vn(t)||!Kn(t))return;t.preventDefault(),Ht()},Xt=(t)=>{if(!vn(t)||t.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;t.preventDefault(),zt(p.popover.id,"escape").catch(()=>{return})},he=()=>{let t=p?.surface==="popover"?p.popover:void 0;if(!t)return;let s=le||pe;if(Pt===s)return;Pt=s,Wt(t.id,s).catch(()=>{return})},me=()=>{if(p?.surface!=="popover"||le)return;le=!0,he()},Bt=(t)=>{if(p?.surface!=="popover"||t.relatedTarget!==null||!le)return;le=!1,he()},Vt=()=>{if(p?.surface!=="popover"||pe)return;pe=!0,he()},jt=()=>{if(p?.surface!=="popover"||!pe)return;pe=!1,he()},H=(t,s=1024)=>{if(!t.trim()||t.length>s)throw new l("HOST_REJECTED",`Identity must contain 1 to ${s} characters.`)},We=async(t)=>{if(t.kind!=="projects")H(t.projectId);let s=await C({...R,type:"workspace-read",id:E(u),payload:t});if(!s||!("kind"in s)||!("state"in s)||s.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return s},Ke=async(t,s)=>{if(t.kind!=="projects")H(t.projectId);let c=E(u);Z.set(c,s);try{await y({...R,type:"workspace-subscribe",id:E(u),payload:{subscriptionId:c,query:t}})}catch(d){if(Z.delete(c),!F)G({...R,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:c}});throw d}return()=>{if(!Z.delete(c)||F)return;G({...R,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:c}})}},$n=async(t,s)=>{if(t.kind==="session")H(t.sessionId);if(t.kind==="project")H(t.projectId);let c=E(u);q.set(c,s);try{await y({...R,type:"shells-subscribe",id:E(u),payload:{subscriptionId:c,scope:t}})}catch(d){if(q.delete(c),!F)G({...R,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:c}});throw d}return()=>{if(!q.delete(c)||F)return;G({...R,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:c}})}},ge=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Ye))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ee(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Qe)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&p?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let s=await C({...R,type:"storage",id:E(u),payload:t});if(!s||!("storage"in s)||s.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return s},zt=(t,s)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):y({...R,type:"popover-close",id:E(u),payload:s?{id:t,reason:s}:{id:t}}),Wt=(t,s)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):y({...R,type:"popover-anchor",id:E(u),payload:{id:t,active:s}});return n.addEventListener("keydown",Xt,!0),n.addEventListener("pointerover",me),n.addEventListener("pointermove",me),n.addEventListener("pointerout",Bt),n.addEventListener("focus",Vt),n.addEventListener("blur",jt),{onAction:(t)=>(ae=t,()=>{if(ae===t)ae=null}),listProjects:async()=>{let t=await We({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let s=await We({kind:"worktrees",projectId:t});if(s.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return s},listSessions:async(t)=>{let s=await We({kind:"sessions",projectId:t});if(s.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return s},onProjects:(t)=>Ke({kind:"projects"},(s)=>{if(s.kind==="projects")t(s)}),onWorktrees:(t,s)=>Ke({kind:"worktrees",projectId:t},(c)=>{if(c.kind==="worktrees")s(c)}),onSessions:(t,s)=>Ke({kind:"sessions",projectId:t},(c)=>{if(c.kind==="sessions")s(c)}),onRunningShells:(t,s)=>$n(t,s),readShellOutput:async(t,s)=>{H(t,Ae);let c=s?.cursor;if(c!==void 0&&(!Number.isInteger(c)||c<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let d=s?.tailBytes;if(d!==void 0&&(!Number.isInteger(d)||d<1||d>Oe))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Oe}.`);let T=await C({...R,type:"shell-output",id:E(u),payload:{shellId:t,cursor:c,tailBytes:d}});if(!T||typeof T.output!=="string"||!Number.isFinite(T.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return T},stopShell:async(t)=>{if(H(t,Ae),(await C({...R,type:"shell-stop",id:E(u),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{H(t),await y({...R,type:"open-session",id:E(u),payload:{sessionId:t}})},storage:{get:async(t,s)=>{let c=Me(s),d={op:"get",key:t};if(c)d.scope=c;let h=await ge(d);return h.op==="get"&&h.found?h.value:void 0},set:async(t,s,c)=>{let d=Me(c),h={op:"set",key:t,value:s};if(d)h.scope=d;await ge(h)},delete:async(t,s)=>{let c=Me(s),d={op:"delete",key:t};if(c)d.scope=c;await ge(d)},keys:async(t)=>{let s=Me(t),c={op:"keys"};if(s)c.scope=s;let d=await ge(c);if(d.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return d.keys}},onReady:(t)=>{if(r.add(t),p)t(p);return()=>{r.delete(t)}},onDirectory:(t)=>{if(_.add(t),p)t(p.directory);return()=>{_.delete(t)}},onSession:(t)=>{if(a.add(t),p)t(p.session);return()=>{a.delete(t)}},onSessionLifecycle:(t)=>{if(A.add(t),X)t(X);return()=>{A.delete(t)}},onConnection:(t)=>{if(x.add(t),p)t(p.connection);return()=>{x.delete(t)}},onSettings:(t)=>{if(z.add(t),p)t(p.settings);return()=>{z.delete(t)}},onItem:(t)=>{if(oe.add(t),p)t(p.item);return()=>{oe.delete(t)}},onStatusControl:(t)=>(_e.add(t),()=>{_e.delete(t)}),onPopoverClosed:(t)=>(fe.add(t),()=>{fe.delete(t)}),setStatusControls:(t)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!qt(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return y({...R,type:"status-controls",id:E(u),payload:{controls:t}})},openPopover:(t)=>{if(p?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!tt(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return y({...R,type:"popover-open",id:E(u),payload:t})},closePopover:zt,setPopoverAnchorActive:Wt,onResolve:(t)=>(ie=t,()=>{if(ie===t)ie=null}),toast:(t)=>{let s=t.message.trim();if(!s||s.length>xe)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${xe} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>ye))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${ye} characters.`));return y({channel:f,v:S,type:"toast",id:E(u),payload:{...t,message:s}})},openUrl:(t)=>y({channel:f,v:S,type:"open-url",id:E(u),payload:{url:t}}),openCommit:(t)=>ot(t)?y({channel:f,v:S,type:"open-commit",id:E(u),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>y({channel:f,v:S,type:"open-surface",id:E(u),payload:{surfaceId:t}}),writeClipboard:(t)=>y({channel:f,v:S,type:"clipboard-write",id:E(u),payload:{text:t}}),compose:(t)=>y({channel:f,v:S,type:"compose",id:E(u),payload:t}),attach:(t)=>y({channel:f,v:S,type:"attach",id:E(u),payload:te(t)}),startSession:async(t)=>{if(t.projectId!==void 0)H(t.projectId);let s=t.worktree;if(s&&s!==!0)if(s.kind==="existing")H(s.directory);else{if(s.name!==void 0)H(s.name,200);if(s.baseBranch!==void 0)H(s.baseBranch,200)}let c=await C({channel:f,v:S,type:"start-session",id:E(u),payload:dt(t)},e.requestTimeoutMs??180000);if(!st(c))throw new l("HOST_REJECTED","Host did not return a session.");return c},prompt:(t)=>C({channel:f,v:S,type:"prompt",id:E(u),payload:lt(t)}).then((s)=>{if(!rt(s))throw new l("HOST_REJECTED","Host did not return a prompt result.");return s}),sessionLink:(t)=>y({channel:f,v:S,type:"session-link",id:E(u),payload:te(t)}),close:()=>y({channel:f,v:S,type:"close",id:E(u)}),oauthStart:()=>y({channel:f,v:S,type:"oauth-start",id:E(u)}),oauthDisconnect:()=>y({channel:f,v:S,type:"oauth-disconnect",id:E(u)}),request:(t)=>(we(t.path)?C({channel:f,v:S,type:"request",id:E(u),payload:t}):xn()).then((s)=>{if(!Ie(s))throw new l("HOST_REJECTED","Host request result was empty.");return s}),serviceRequest:(t)=>(we(t.path)?C({channel:f,v:S,type:"service-request",id:E(u),payload:t}):xn()).then((s)=>{if(!Ie(s))throw new l("HOST_REJECTED","Host service request result was empty.");return s}),serviceStatus:()=>C({channel:f,v:S,type:"service-status",id:E(u)}).then((t)=>{if(!Et(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(ne(t)?C({channel:f,v:S,type:"file-read",id:E(u),payload:{path:t}}):Le()).then((s)=>{if(!_t(s))throw new l("HOST_REJECTED","Host did not return file content.");return s}),writeFile:(t,s)=>{if(!ne(t))return Le();if(s.length>ke)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${ke} characters.`));return C({channel:f,v:S,type:"file-write",id:E(u),payload:{path:t,content:s}}).then((c)=>{if(!ft(c))throw new l("HOST_REJECTED","Host did not confirm the write.");return c})},listDir:(t)=>(ne(t)?C({channel:f,v:S,type:"file-list",id:E(u),payload:{path:t}}):Le()).then((s)=>{if(!St(s))throw new l("HOST_REJECTED","Host did not return directory entries.");return s}),stat:(t)=>(ne(t)?C({channel:f,v:S,type:"file-stat",id:E(u),payload:{path:t}}):Le()).then((s)=>{if(!Tt(s))throw new l("HOST_REJECTED","Host did not return file status.");return s}),generate:(t)=>{let s=t.prompt.trim(),c=t.system?.trim();if(s.length===0||s.length>Ue)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Ue} characters.`));if(c!==void 0&&(c.length===0||c.length>Ce))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${Ce} characters.`));let d=t.maxOutputTokens===void 0?void 0:Math.min(at,Math.max(1,Math.floor(t.maxOutputTokens)));if(d!==void 0&&!Number.isFinite(d))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let h={prompt:s};if(c!==void 0)h.system=c;if(d!==void 0)h.maxOutputTokens=d;return C({channel:f,v:S,type:"generate",id:E(u),payload:h},e.requestTimeoutMs??ct).then((T)=>{if(!ht(T))throw new l("HOST_REJECTED","Host did not return generated text.");return T})},onLateGenerateResult:(t)=>{Y.add(t);for(let s of Ve.splice(0))O([t],s);return Dt(),()=>{Y.delete(t)}},setBadge:(t)=>y({channel:f,v:S,type:"badge",id:E(u),payload:{count:pt(t)}}),setHeight:(t)=>y({channel:f,v:S,type:"resize",id:E(u),payload:{height:ut(t)}}),onFileOpen:(t)=>{if(Se.add(t),!je)je=!0,n.addEventListener("keydown",Ft,!0);if(de)t(de);return()=>{Se.delete(t)}},onFileSnapshot:(t)=>(ce=t,()=>{if(ce===t)ce=null}),onFileSaved:(t)=>(Te.add(t),()=>{Te.delete(t)}),reportFileChange:(t)=>ze({...R,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Ht,reportFileUnsupported:()=>ze({...R,type:"file-unsupported"}),dispose:()=>{for(let t of Z.keys())G({...R,type:"workspace-unsubscribe",id:E(u),payload:{subscriptionId:t}});Z.clear();for(let t of q.keys())G({...R,type:"shells-unsubscribe",id:E(u),payload:{subscriptionId:t}});if(q.clear(),F=!0,ie=null,ae=null,ce=null,Se.clear(),Te.clear(),je)n.removeEventListener("keydown",Ft,!0);n.removeEventListener("message",$t),n.removeEventListener("keydown",Xt,!0),n.removeEventListener("pointerover",me),n.removeEventListener("pointermove",me),n.removeEventListener("pointerout",Bt),n.removeEventListener("focus",Vt),n.removeEventListener("blur",jt);for(let t of Q.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));Q.clear(),r.clear(),_.clear(),a.clear(),A.clear(),x.clear(),z.clear(),oe.clear(),_e.clear(),fe.clear(),Y.clear(),Ve.length=0}}};var yn=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Bs=new Set(yn);var Rn=["none","agent","user"];var js=new Set(Rn);var Jn=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Yn=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],kn=(e,n)=>{n.style.colorScheme=e.mode;for(let[o,i]of Jn)n.style.setProperty(o,e.tokens[i]);for(let[o,i,r]of Yn){let _=e.tokens[r]??"";n.style.setProperty(o,_),n.style.setProperty(i,_)}n.style.setProperty("font-family",e.tokens.font),n.style.setProperty("font-size","0.875rem"),n.style.setProperty("line-height","1.45"),n.style.setProperty("color",e.tokens.foreground)},At=(e,n)=>{if(kn(e.theme,n),n.dataset)n.dataset.ocSurface=e.surface,n.dataset.ocTheme=e.theme.mode};var Qn={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},g=(e,n)=>`var(--${e}, var(--oc-${Qn[e]}, ${n}))`,V=g("surface-background","transparent"),Pe=g("surface-elevated","transparent"),se=g("surface-elevated-foreground","inherit"),D=g("surface-foreground","inherit"),m=g("surface-muted-foreground","gray"),Zn=g("surface-muted","transparent"),W=g("interactive-border","currentColor"),w=g("interactive-hover","transparent"),J=g("interactive-active","transparent"),Ot=g("interactive-selection","transparent"),bt=g("interactive-selection-foreground","inherit"),B=g("primary","currentColor"),vt=g("primary-text","inherit"),xt=g("error-text","inherit"),qn=g("font-sans","inherit"),yt=g("font-mono","monospace"),Ln=g("radius","9px"),Rt=`calc(${Ln} - 2px)`,Un=`calc(${Ln} - 4px)`,b=(e,n,o="transparent")=>`color-mix(in srgb, ${e} ${n}%, ${o})`,Cn=`background-image: linear-gradient(${w}, ${w});`,kt=(e)=>`box-shadow: inset 0 0 0 1px ${e}, var(--oc-sdk-field-lift);`,Ut="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",wn="box-shadow: var(--oc-sdk-lit);",In=`inset 0 1px 0 0 ${b(D,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`,es=`
:root {
  --oc-sdk-edge: ${b(D,10)};
  --oc-sdk-field-bg: ${Pe};
  --oc-sdk-raised-bg: ${V};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.1);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${b(D,6)};
  --oc-sdk-field-bg: ${b(V,50,Pe)};
  --oc-sdk-raised-bg: ${Pe};
  --oc-sdk-field-lift: ${In};
  --oc-sdk-raised-lift: ${In};
  --oc-sdk-lit: inset 0 1px 0 0 ${b(D,1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.36);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`,Ne=(e)=>{let n=g(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${n}; --oc-sdk-tone-text: ${g(`${e}-text`,"inherit")}; }`},ts=`
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
`,Mn=`${es}
.oc-sdk { color: ${D}; font-family: ${qn}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Cn} }
.oc-sdk-mono { font-family: ${yt}; }
.oc-sdk-muted { color: ${m}; }
${Ne("success")}${Ne("warning")}${Ne("error")}${Ne("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${B}; --oc-sdk-tone-text: ${vt}; }

.oc-sdk-btn { border-radius: ${Rt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Un}; }
.oc-sdk-btn[data-variant="default"] { color: ${vt}; background: ${b(B,10,V)}; border-color: ${b(B,12)}; ${wn} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${b(B,16,V)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${b(B,22,V)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Zn}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${se}; ${Ut} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${J}, ${J}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${w}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${J}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${g("status-error","red")}; color: ${xt}; background: ${b("var(--oc-sdk-tone)",7,V)}; border-color: ${b("var(--oc-sdk-tone)",12)}; ${wn} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${b("var(--oc-sdk-tone)",9,V)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${b("var(--oc-sdk-tone)",11,V)}; box-shadow: none; }

.oc-sdk-field-note { color: ${m}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${xt}; }
.oc-sdk-input { border-radius: ${Rt}; background: var(--oc-sdk-field-bg); color: ${se}; ${kt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${m}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${kt(b(D,26))} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${kt(g("status-error","red"))} }
.oc-sdk-input[data-mono="true"] { font-family: ${yt}; }

.oc-sdk-search-icon { color: ${m}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${B}; }
.oc-sdk-search-clear { border-radius: ${Un}; color: ${m}; }
.oc-sdk-search-clear:hover { background: ${w}; color: ${D}; }

.oc-sdk-trigger { border-radius: ${Rt}; background: var(--oc-sdk-raised-bg); color: ${se}; ${Ut} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${m}; }
.oc-sdk-trigger-chevron { color: ${m}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow. Its outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${se}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Pe}; background-clip: padding-box; color: ${se}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${w}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Ot}; color: ${bt}; }
.oc-sdk-option-check { color: ${D}; }
.oc-sdk-option[data-destructive="true"] { color: ${xt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${b(g("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${m}; }
.oc-sdk-popup-empty { color: ${m}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${W}; border-radius: 4px; color: ${D}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${b(D,60,W)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${W}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${V}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${B}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Cn} }
.oc-sdk-check-desc { color: ${m}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${b(D,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${m}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${D}; }
.oc-sdk-tab[aria-selected="true"] { color: ${bt}; background: ${Ot}; border-color: ${W}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${se}; background: var(--oc-sdk-raised-bg); ${Ut} }
.oc-sdk-tab-count { color: ${m}; }

.oc-sdk-badge { border-radius: 9999px; background: ${w}; color: ${m}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${b("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${w}; }
.oc-sdk-row[aria-selected="true"] { background: ${Ot}; color: ${bt}; }
.oc-sdk-row-lead { font-family: ${yt}; color: ${m}; }
.oc-sdk-row-sub { color: ${m}; }
.oc-sdk-row-meta { color: ${m}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${m}; }

.oc-sdk-empty-body { color: ${m}; }

.oc-sdk-spinner { color: ${m}; }
.oc-sdk-spinner-ring { border-color: ${W}; border-top-color: ${B}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${b("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${m}; }

.oc-sdk-separator { color: ${m}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${b(W,40)}; }

.oc-sdk-progress-label { color: ${m}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${W}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${B}); }

.oc-sdk-text a { color: ${vt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${b(W,60)}; }
`,I=`
${Je}
${ts}
${Mn}`;var Nn=1,is=3000,L=gt(),Xe=null,Mt=null,Ee=null,Pn="overview",U=null,P=[];L.onReady((e)=>{if(At(e,document.documentElement),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,Xe=e.directory,Fe(),Ee)clearInterval(Ee);Ee=window.setInterval(()=>{if(document.visibilityState==="visible")Fe()},is),L.onDirectory((n)=>{if(n!==Xe)Xe=n,Fe()}),window.addEventListener("beforeunload",()=>{if(Ee)clearInterval(Ee)}),document.getElementById("refreshBtn")?.addEventListener("click",Fe),document.getElementById("deliverySelect")?.addEventListener("change",(n)=>{U=n.target.value||null,Be()}),document.getElementById("tabs")?.addEventListener("click",(n)=>{let o=n.target;if(!o.classList.contains("tab"))return;document.querySelectorAll(".tab").forEach((i)=>{i.classList.remove("active"),i.setAttribute("aria-selected","false")}),document.querySelectorAll(".tab-panel").forEach((i)=>i.classList.remove("active")),o.classList.add("active"),o.setAttribute("aria-selected","true"),document.getElementById(`panel-${o.dataset.tab}`)?.classList.add("active"),Pn=o.dataset.tab,Be()})});async function Fe(){if(!Xe){It("No project open");return}try{let e=await as();if(!e){It("No vstack workflow found in this project");return}if(e.schemaVersion!==Nn){Lt(Error(`Unsupported schema version: ${e.schemaVersion}. Expected ${Nn}`));return}let n=await cs();if(!n){It("No active workflow state");return}if(P=n.activeDeliveries||[],Nt(),!U&&P.length>0)U=P[0].id,Nt();Be(),Mt=new Date,ms()}catch(e){if(console.error("Failed to load dashboard:",e),e instanceof Error&&e.message.includes("NOT_GRANTED"))Lt(Error("Files permission denied. Please approve the 'files' capability in OpenChamber Settings."));else Lt(e)}}async function as(){let e=await L.readFile(".vstack/manifest.json");return JSON.parse(e.content)}async function cs(){let e=await L.readFile(".vstack/state/index.json");return JSON.parse(e.content)}async function ds(e){let n=await L.readFile(`.vstack/deliveries/${e}/delivery.json`);return JSON.parse(n.content)}async function Gn(e){try{let n=await L.listDir(`.vstack/deliveries/${e}/evidence`),o=[];for(let i of n.entries)if(i.kind==="file"&&i.name.endsWith(".json")){let r=await L.readFile(`.vstack/deliveries/${e}/evidence/${i.name}`);o.push(JSON.parse(r.content))}return o.sort((i,r)=>new Date(r.completedAt).getTime()-new Date(i.completedAt).getTime())}catch{return[]}}async function ls(e){try{let n=await L.listDir(`.vstack/deliveries/${e}/reviews`),o=[];for(let i of n.entries)if(i.kind==="file"&&i.name.endsWith(".json")){let r=await L.readFile(`.vstack/deliveries/${e}/reviews/${i.name}`);o.push(JSON.parse(r.content))}return o.sort((i,r)=>new Date(r.startedAt).getTime()-new Date(i.startedAt).getTime())}catch{return[]}}async function ps(e){try{let n=await L.listDir(`.vstack/deliveries/${e}/findings`),o=[];for(let i of n.entries)if(i.kind==="file"&&i.name.endsWith(".json")){let r=await L.readFile(`.vstack/deliveries/${e}/findings/${i.name}`);o.push(JSON.parse(r.content))}return o.sort((i,r)=>new Date(r.createdAt).getTime()-new Date(i.createdAt).getTime())}catch{return[]}}async function us(e){try{let n=await L.listDir(`.vstack/deliveries/${e}/releases`),o=[];for(let i of n.entries)if(i.kind==="file"&&i.name.endsWith(".json")){let r=await L.readFile(`.vstack/deliveries/${e}/releases/${i.name}`);o.push(JSON.parse(r.content))}return o.sort((i,r)=>new Date(r.createdAt).getTime()-new Date(i.createdAt).getTime())}catch{return[]}}async function Es(e){try{let n=await L.listDir(`.vstack/deliveries/${e}/deployments`),o=[];for(let i of n.entries)if(i.kind==="file"&&i.name.endsWith(".json")){let r=await L.readFile(`.vstack/deliveries/${e}/deployments/${i.name}`);o.push(JSON.parse(r.content))}return o.sort((i,r)=>new Date(r.startedAt).getTime()-new Date(i.startedAt).getTime())}catch{return[]}}function Nt(){let e=document.getElementById("deliverySelect");if(!e)return;e.innerHTML='<option value="">Select delivery...</option>'+P.map((n)=>`<option value="${n.id}" ${n.id===U?"selected":""}>${v(n.title)} (${n.status})</option>`).join(""),e.disabled=P.length===0}function Be(){switch(Pn){case"overview":_s();break;case"quality":fs();break;case"reviews":Ss();break;case"releases":Ts();break;case"evidence":hs();break}}function _s(){let e=document.getElementById("overviewGrid");if(P.length===0){e.innerHTML='<div class="empty-state">No active deliveries. Create one with vstack_delivery_create.</div>';return}let n=U?P.find((a)=>a.id===U):P[0];if(!n){e.innerHTML='<div class="empty-state">No delivery selected</div>';return}let o=U?P.length:0,i=P.filter((a)=>a.status==="completed").length,r=P.length,_=r>0?i/r*100:0;e.innerHTML=`
    <div class="card">
      <h3>Delivery: ${v(n.title)}</h3>
      <div class="stat-row"><span class="stat-label">Type</span><span class="stat-value"><span class="type-badge type-${n.type}">${n.type}</span></span></div>
      <div class="stat-row"><span class="stat-label">Profile</span><span class="stat-value">${v(n.profile)}</span></div>
      <div class="stat-row"><span class="stat-label">Status</span><span class="stat-value"><span class="status-badge-cell status-${n.status}">${n.status}</span></span></div>
      <div class="stat-row"><span class="stat-label">Current Phase</span><span class="stat-value">${v(n.currentPhase)}</span></div>
      <div class="stat-row"><span class="stat-label">Revision</span><span class="stat-value">${n.revision}</span></div>
      <div class="stat-row"><span class="stat-label">Updated</span><span class="stat-value">${K(n.updatedAt)}</span></div>
    </div>
    
    <div class="card">
      <h3>Workflow Progress</h3>
      <div class="stat-row"><span class="stat-label">Total Deliveries</span><span class="stat-value">${r}</span></div>
      <div class="stat-row"><span class="stat-label">Completed</span><span class="stat-value passed">${i}</span></div>
      <div class="stat-row"><span class="stat-label">Active</span><span class="stat-value">${P.filter((a)=>a.status==="active").length}</span></div>
      <div class="stat-row"><span class="stat-label">Blocked</span><span class="stat-value warning">${P.filter((a)=>a.status==="blocked").length}</span></div>
      <div class="stat-row"><span class="stat-label">Progress</span><span class="stat-value">${_.toFixed(0)}%</span></div>
    </div>
    
    <div class="card" style="grid-column: 1 / -1;">
      <h3>All Deliveries</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr><th>Title</th><th>Type</th><th>Profile</th><th>Status</th><th>Phase</th><th>Revision</th><th>Updated</th></tr>
          </thead>
          <tbody>
            ${P.map((a)=>`
              <tr class="${a.id===U?"selected":""}" style="cursor: pointer;" data-id="${a.id}">
                <td>${v(a.title)}</td>
                <td><span class="type-badge type-${a.type}">${a.type}</span></td>
                <td>${v(a.profile)}</td>
                <td><span class="status-badge-cell status-${a.status}">${a.status}</span></td>
                <td>${v(a.currentPhase)}</td>
                <td>${a.revision}</td>
                <td>${K(a.updatedAt)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,document.querySelectorAll("#overviewGrid tbody tr[data-id]").forEach((a)=>{a.addEventListener("click",()=>{U=a.getAttribute("data-id"),Nt(),Be()})})}async function fs(){let e=document.getElementById("qualityContent");if(!U){e.innerHTML='<div class="empty-state">Select a delivery to view quality checks</div>';return}try{let[n,o]=await Promise.all([ds(U),Gn(U)]);if(o.length===0){e.innerHTML='<div class="empty-state">No quality evidence recorded yet</div>';return}let i=o.reduce((r,_)=>{let a=_.checkId||_.type;if(!r[a])r[a]=[];return r[a].push(_),r},{});e.innerHTML=`
      <div class="quality-summary">
        <div class="quality-stats">
          <div class="stat">
            <span class="stat-value">${o.length}</span>
            <span class="stat-label">Total Checks</span>
          </div>
          <div class="stat">
            <span class="stat-value passed">${o.filter((r)=>r.status==="passed").length}</span>
            <span class="stat-label">Passed</span>
          </div>
          <div class="stat">
            <span class="stat-value failed">${o.filter((r)=>r.status==="failed").length}</span>
            <span class="stat-label">Failed</span>
          </div>
          <div class="stat">
            <span class="stat-value warning">${o.filter((r)=>r.status==="error"||r.status==="timeout").length}</span>
            <span class="stat-label">Errors</span>
          </div>
        </div>
      </div>
      
      <div class="quality-checks">
        ${Object.entries(i).map(([r,_])=>`
          <div class="check-group">
            <h4>${v(r)} <span class="badge">${_.length}</span></h4>
            <div class="table-wrapper">
              <table class="evidence-table">
                <thead>
                  <tr><th>Type</th><th>Status</th><th>Exit Code</th><th>Duration</th><th>Started</th><th>Summary</th></tr>
                </thead>
                <tbody>
                  ${_.map((a)=>`
                    <tr class="status-${a.status}">
                      <td><span class="type-badge type-${a.type}">${a.type}</span></td>
                      <td><span class="status-badge-cell status-${a.status}">${a.status}</span></td>
                      <td>${a.exitCode!==null?a.exitCode:"-"}</td>
                      <td>${Dn(a.startedAt,a.completedAt)}</td>
                      <td>${K(a.startedAt)}</td>
                      <td>${v(a.summary||"-")}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `).join("")}
      </div>
    `}catch(n){console.error("Failed to render quality:",n),e.innerHTML='<div class="error-state">Failed to load quality data</div>'}}async function Ss(){let e=document.getElementById("reviewsContent");if(!U){e.innerHTML='<div class="empty-state">Select a delivery to view reviews</div>';return}try{let[n,o]=await Promise.all([ls(U),ps(U)]);if(n.length===0&&o.length===0){e.innerHTML='<div class="empty-state">No reviews conducted yet</div>';return}let i=`
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
            <span class="stat-value failed">${o.filter((r)=>r.severity==="critical"||r.severity==="high").length}</span>
            <span class="stat-label">Critical/High</span>
          </div>
          <div class="stat">
            <span class="stat-value passed">${o.filter((r)=>r.status==="fixed"||r.status==="resolved").length}</span>
            <span class="stat-label">Resolved</span>
          </div>
        </div>
      </div>
    `;if(n.length>0)i+=`
        <div class="review-runs">
          <h4>Review Runs</h4>
          <div class="table-wrapper">
            <table class="review-table">
              <thead>
                <tr><th>Profile</th><th>Status</th><th>Reviewers</th><th>Findings</th><th>Started</th><th>Completed</th></tr>
              </thead>
              <tbody>
                ${n.map((r)=>`
                  <tr>
                    <td><span class="type-badge type-${r.profile}">${r.profile}</span></td>
                    <td><span class="status-badge-cell status-${r.status}">${r.status}</span></td>
                    <td>${r.reviewers?.length||0}</td>
                    <td>${r.findings?.length||0}</td>
                    <td>${K(r.startedAt)}</td>
                    <td>${r.completedAt?K(r.completedAt):"-"}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;if(o.length>0){let r=o.reduce((a,A)=>{if(!a[A.severity])a[A.severity]=[];return a[A.severity].push(A),a},{});i+=`
        <div class="findings">
          <h4>Findings by Severity</h4>
          ${["critical","high","medium","low","informational"].map((a)=>{let A=r[a]||[];if(A.length===0)return"";return`
              <div class="severity-group severity-${a}">
                <h5>${a.toUpperCase()} (${A.length})</h5>
                <div class="table-wrapper">
                  <table class="findings-table">
                    <thead>
                      <tr><th>Lens</th><th>Title</th><th>File</th><th>Status</th><th>Reviewer</th></tr>
                    </thead>
                    <tbody>
                      ${A.map((x)=>`
                        <tr>
                          <td><span class="type-badge type-${x.lens}">${x.lens}</span></td>
                          <td>${v(x.title)}</td>
                          <td>${x.filePath?`${v(x.filePath)}${x.lineRange?`:${x.lineRange.start}-${x.lineRange.end}`:""}`:"-"}</td>
                          <td><span class="status-badge-cell status-${x.status}">${x.status}</span></td>
                          <td>${v(x.reviewerAgentId||"-")}</td>
                        </tr>
                      `).join("")}
                    </tbody>
                  </table>
                </div>
              </div>
            `}).join("")}
        </div>
      `}e.innerHTML=i}catch(n){console.error("Failed to render reviews:",n),e.innerHTML='<div class="error-state">Failed to load review data</div>'}}async function Ts(){let e=document.getElementById("releasesContent");if(!U){e.innerHTML='<div class="empty-state">Select a delivery to view releases</div>';return}try{let[n,o]=await Promise.all([us(U),Es(U)]);if(n.length===0&&o.length===0){e.innerHTML='<div class="empty-state">No releases or deployments yet</div>';return}let i="";if(n.length>0)i+=`
        <div class="releases-list">
          <h4>Release Candidates</h4>
          ${n.map((r)=>`
            <div class="release-card status-${r.status}">
              <div class="release-header">
                <h5>${v(r.title)} <span class="badge version">${v(r.version)}</span></h5>
                <span class="status-badge-cell status-${r.status}">${r.status}</span>
              </div>
              <div class="release-meta">
                <span>Artifacts: ${r.artifacts?.length||0}</span>
                <span>Created: ${K(r.createdAt)}</span>
              </div>
              ${r.changelog?`<div class="changelog">${v(r.changelog)}</div>`:""}
            </div>
          `).join("")}
        </div>
      `;if(o.length>0)i+=`
        <div class="deployments-list">
          <h4>Deployments</h4>
          <div class="table-wrapper">
            <table class="deployments-table">
              <thead>
                <tr><th>Environment</th><th>Status</th><th>Health Checks</th><th>Started</th><th>Completed</th></tr>
              </thead>
              <tbody>
                ${o.map((r)=>`
                  <tr class="status-${r.status}">
                    <td>${v(r.environment)}</td>
                    <td><span class="status-badge-cell status-${r.status}">${r.status}</span></td>
                    <td>${r.healthChecks?.filter((_)=>_.status==="passed").length||0}/${r.healthChecks?.length||0}</td>
                    <td>${K(r.startedAt)}</td>
                    <td>${r.completedAt?K(r.completedAt):"-"}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;e.innerHTML=i}catch(n){console.error("Failed to render releases:",n),e.innerHTML='<div class="error-state">Failed to load release data</div>'}}async function hs(){let e=document.getElementById("evidenceContent");if(!U){e.innerHTML='<div class="empty-state">Select a delivery to view evidence</div>';return}try{let n=await Gn(U);if(n.length===0){e.innerHTML='<div class="empty-state">No evidence recorded yet</div>';return}let o=n.reduce((i,r)=>{if(!i[r.source])i[r.source]=[];return i[r.source].push(r),i},{});e.innerHTML=`
      <div class="evidence-summary">
        <div class="quality-stats">
          <div class="stat">
            <span class="stat-value">${n.length}</span>
            <span class="stat-label">Total Records</span>
          </div>
          <div class="stat">
            <span class="stat-value passed">${n.filter((i)=>i.status==="passed").length}</span>
            <span class="stat-label">Passed</span>
          </div>
          <div class="stat">
            <span class="stat-value failed">${n.filter((i)=>i.status==="failed").length}</span>
            <span class="stat-label">Failed</span>
          </div>
        </div>
      </div>
      
      <div class="evidence-list">
        ${Object.entries(o).map(([i,r])=>`
          <div class="evidence-source-group">
            <h4>${v(i)} <span class="badge">${r.length}</span></h4>
            <div class="table-wrapper">
              <table class="evidence-table">
                <thead>
                  <tr><th>Type</th><th>Check</th><th>Status</th><th>Command</th><th>Commit</th><th>Duration</th><th>Summary</th></tr>
                </thead>
                <tbody>
                  ${r.map((_)=>`
                    <tr class="status-${_.status}">
                      <td><span class="type-badge type-${_.type}">${_.type}</span></td>
                      <td>${v(_.checkId)}</td>
                      <td><span class="status-badge-cell status-${_.status}">${_.status}</span></td>
                      <td><code>${v(_.command?.join(" ")||"-")}</code></td>
                      <td><code>${v(_.commitRef?.slice(0,8)||"-")}</code></td>
                      <td>${Dn(_.startedAt,_.completedAt)}</td>
                      <td>${v(_.summary||"-")}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `).join("")}
      </div>
    `}catch(n){console.error("Failed to render evidence:",n),e.innerHTML='<div class="error-state">Failed to load evidence data</div>'}}function K(e){try{let n=new Date(e);return n.toLocaleDateString()+" "+n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return e}}function Dn(e,n){try{let o=new Date(e).getTime(),r=new Date(n).getTime()-o;if(r<1000)return`${r}ms`;if(r<60000)return`${(r/1000).toFixed(1)}s`;return`${(r/60000).toFixed(1)}m`}catch{return"-"}}function It(e){let n=document.getElementById("overviewGrid");n.innerHTML=`<div class="empty-state">${e}</div>`}function Lt(e){let n=document.getElementById("overviewGrid");n.innerHTML=`<div class="error-state">Error: ${e.message}</div>`}function ms(){let e=document.getElementById("lastRefresh");e.textContent=Mt?`Last refreshed: ${Mt.toLocaleTimeString()}`:"Last refreshed: never"}function v(e){let n=document.createElement("div");return n.textContent=e,n.innerHTML}async function gs(){}gs();})();

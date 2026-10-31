/* BAH-0024-CODEX-R2. Presentation only; never change routes, values or event handlers. */
(()=>{
 if(window.__BAH_DISABLE_NUMBERING)return;
 const root=document.querySelector('main.app');if(!root)return;
 const visible=el=>!el.closest('[hidden]')&&el.getClientRects().length>0&&getComputedStyle(el).visibility!=='hidden';
 const direct=(el,selector)=>[...el.children].filter(child=>child.matches(selector));
 const service=el=>el.matches('.revision-back,.back,.language-toggle,[data-test-exit],[data-action="back"],[type="submit"]')||['back','save','cancel'].some(k=>el.textContent.trim()===window.BAH20_COPY?.[document.documentElement.lang]?.[k]);
 function discover(){
  const groups=[];
  root.querySelectorAll('nav,[role="menu"],[role="tablist"]').forEach((el,i)=>groups.push({id:'navigation-'+i,container:el,items:direct(el,'a,[role="menuitem"],[role="tab"]')}));
  root.querySelectorAll('.profile-section').forEach((el,i)=>groups.push({id:'profile-'+i,container:el,items:direct(el,'.row')}));
  root.querySelectorAll('.actions').forEach((el,i)=>groups.push({id:'actions-'+i,container:el,items:direct(el,'a[href]').filter(x=>!service(x))}));
  // These are peer content sections in the existing layout. Forms and their values are not menu items.
  groups.push({id:'sections',container:root,items:direct(root,'.row,section.panel,details').filter(el=>el.matches('.row')||el.querySelector(':scope > h2,:scope > summary'))});
  return groups.map(g=>({...g,items:g.items.filter(x=>visible(x)&&!service(x))}));
 }
 function clear(){
  root.querySelectorAll('[data-bah-number]').forEach(el=>el.remove());
  root.querySelectorAll('[data-bah-number-label]').forEach(el=>el.replaceWith(...el.childNodes));
  root.querySelectorAll('[data-bah-numbered-item]').forEach(el=>el.removeAttribute('data-bah-numbered-item'));
  [root,...root.querySelectorAll('[data-bah-number-group]')].forEach(el=>el.removeAttribute('data-bah-number-group'));
 }
 function label(item){
  const heading=item.querySelector(':scope > h2,:scope > summary')||item.querySelector(':scope > div > strong');if(heading)return heading;
  const text=[...item.childNodes].find(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim());
  if(!text)throw Error('Numbering requires a text label');
  const wrap=document.createElement('span');wrap.setAttribute('data-bah-number-label','');item.insertBefore(wrap,text);wrap.append(text);return wrap;
 }
 let observer;let scheduled=false;
 function refresh(){
  observer?.disconnect();clear();const groups=discover();
  for(const group of groups){if(group.items.length<4)continue;group.container.setAttribute('data-bah-number-group',group.id);
   group.items.forEach((item,i)=>{const marker=document.createElement('span');marker.className='bah-item-number';marker.setAttribute('data-bah-number',String(i+1));marker.textContent=(i+1)+'.\u00a0';label(item).prepend(marker);item.setAttribute('data-bah-numbered-item',String(i+1));});
  }
  window.BAHTIM_NUMBERING.groups=groups.map(g=>({id:g.id,count:g.items.length,numbered:g.items.length>=4}));
  observer?.observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','style','class','open']});
 }
 window.BAHTIM_NUMBERING={refresh,groups:[],revision:'BAH-0024-CODEX-R2'};
 observer=new MutationObserver(()=>{if(!scheduled){scheduled=true;queueMicrotask(()=>{scheduled=false;refresh();});}});
 refresh();
})();

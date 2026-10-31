/* Presentation only: decorate existing nodes without changing actions, data or labels. */
(()=>{
const paths={
 home:'M3 11 12 3l9 8M5 10v11h5v-7h4v7h5V10',
 search:'M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM16 16l5 5',
 heart:'M20.8 4.8a5.4 5.4 0 0 0-7.6 0L12 6l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.6a5.4 5.4 0 0 0 0-7.6Z',
 person:'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2',
 book:'M12 5v16M3 3h4a5 5 0 0 1 5 2 5 5 0 0 1 5-2h4v16h-4a7 7 0 0 0-5 2 7 7 0 0 0-5-2H3ZM6 8h3M15 8h3',
 gift:'M3 8h18v5H3ZM5 13v8h14v-8M12 8v13M12 8C3 8 4 1 8 3c2 1 4 5 4 5Zm0 0c9 0 8-7 4-5-2 1-4 5-4 5Z',
 globe:'M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z',
 chat:'M21 11a9 9 0 0 1-9 9H4l-3 2 2-6a9 9 0 1 1 18-5ZM7 10h10M7 14h6',
 shield:'M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6ZM8 12l3 3 5-6',
 sliders:'M4 3v5m0 4v9M12 3v10m0 4v4M20 3v2m0 4v12M1 8h6v4H1ZM9 13h6v4H9ZM17 5h6v4h-6Z',
 camera:'M3 6h4l2-3h6l2 3h4v15H3ZM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
 flower:'M12 8c-5-9-10-2-6 2-9 3-3 10 2 6 0 10 9 7 8 1 9 2 9-7 3-7 5-7-3-11-7-2ZM14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
 calendar:'M3 5h18v16H3ZM7 2v6M17 2v6M3 10h18M7 14h2M13 14h2M7 18h2',
 spark:'m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z',
 arrow:'M4 12h16m-6-6 6 6-6 6'
};
const svg=(name)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${paths[name]||paths.spark}"/></svg>`;
const type=id=>id==='home'?['home','sky']:id.includes('search')?['search','sky']:id.includes('life')?['book','lilac']:id.includes('calendar')?['calendar','mint']:id.includes('points')||id==='premium'?['gift','rose']:id.includes('contact')||id.includes('privacy')||id.includes('blocked')||id.includes('rules')?['shield','mint']:id.includes('photo')?['camera','sky']:id.includes('chat')||id.includes('conversation')||id==='support'?['chat','mint']:id.includes('interest')||id==='mutual'?['heart','rose']:id.includes('residence')?['globe','sky']:id.includes('admin')||id==='testing'||id==='settings'?['sliders','sky']:id.includes('character')||id.includes('values')||id.includes('interests')?['flower','rose']:['person','sky'];
const menuType=id=>({'admin-users':['person','sky'],'admin-user':['person','sky'],'admin-reports':['shield','rose'],'admin-review':['shield','rose'],'admin-preview':['chat','mint'],'admin-staff':['person','lilac'],'admin-log':['book','mint'],'admin-requests':['gift','rose'],'admin-appeals':['chat','mint'],'admin-backups':['shield','lilac'],'testing':['spark','rose']})[id]||type(id);
const badge=(kind,cls)=>{const el=document.createElement('span');el.className=cls;el.setAttribute('aria-hidden','true');el.innerHTML=svg(kind);return el;};
const id=document.body.dataset.screen,[kind]=menuType(id),title=document.querySelector('.page-title');
if(title){const mark=document.createElement('div');mark.className='section-mark';const eyebrow=title.querySelector('.eyebrow');if(eyebrow)mark.append(eyebrow);mark.append(badge(kind,'hero-symbol'));title.prepend(mark);const petals=document.createElement('div');petals.className='petal';petals.setAttribute('aria-hidden','true');petals.innerHTML='<svg viewBox="0 0 120 120"><path d="M60 60C-10 30 30-12 60 60C90-12 130 30 60 60C130 90 90 132 60 60C30 132-10 90 60 60Z" fill="white"/></svg>';title.prepend(petals);}
document.querySelectorAll('.row,.nav a,.admin-menu a').forEach(el=>{const target=(el.getAttribute('href')||'').split('/').slice(-2,-1)[0]||id;const [icon,tone]=menuType(target);el.dataset.tone=tone;el.prepend(badge(icon,'menu-symbol'));if(el.closest('.admin-menu')&&target===id)el.setAttribute('aria-current','page');});
document.querySelectorAll('.app>.panel').forEach((el,i)=>{el.prepend(badge(i===0?kind:'spark','panel-symbol'));});
const ctx=document.querySelector('.topbar .context');if(ctx)ctx.textContent='BAHTIM';
// A stable design-review identifier is metadata, not a replacement for BAH-0026 product numbering.
document.documentElement.dataset.visualRevision='BAH-0024-R1';
if(id==='home'&&title){const pair=document.createElement('img');pair.className='welcome-pair';pair.src='../../welcome/assets/couple-male.png';pair.alt='';pair.setAttribute('aria-hidden','true');title.querySelector('h1').before(pair);const icon=document.querySelector('.app>.panel .panel-symbol');if(icon)icon.innerHTML=svg('heart');}
if(id==='profile'){const status=document.querySelector('.identity p');if(status)status.textContent=document.documentElement.lang==='uz'?'Sizning profilingiz':'Ваш профиль';}
if(id==='profile'){
 const main=document.querySelector('main'),rows=[...main.querySelectorAll(':scope>.row')],lang=document.documentElement.lang;
 const groups=[['reviewProfileGroup',['profile-basic','life-editor','portrait','profile-about','profile-marital','profile-children','profile-education','profile-work','profile-interests','profile-character','profile-lifestyle','profile-values','profile-partner','profile-extra','photo']],['reviewPrivacyGroup',['points','privacy','settings']]];
 for(const [key,ids]of groups){const section=document.createElement('section');section.className='profile-section';const heading=document.createElement('h2');heading.textContent=BAH20_COPY[lang][key];section.append(heading);for(const route of ids){const row=rows.find(el=>new URL(el.href).pathname.includes('/'+route+'/'));if(row)section.append(row);}main.insertBefore(section,main.querySelector('.status'));}
}
if(id==='candidate'&&title){const main=document.querySelector('main'),portrait=main.querySelector('.portrait-button'),intro=title.querySelector('.subtitle'),actions=main.querySelector(':scope>.actions');if(portrait)title.before(portrait);if(intro){const story=document.createElement('section');story.className='panel candidate-intro';story.append(intro);main.insertBefore(story,main.querySelector('.status'));}if(actions)title.after(actions);}
if(id==='chat'){const panel=document.querySelector('.app>.panel');if(panel){const guide=document.createElement('details');guide.className='chat-guide';const summary=document.createElement('summary');summary.textContent=panel.querySelector('h2').textContent;guide.append(summary);for(const el of [...panel.querySelectorAll('p')])guide.append(el);panel.replaceWith(guide);}}
if(new URLSearchParams(location.search).get('role')==='staff')document.querySelectorAll('a[href*="admin-settings"],a[href*="admin-backups"]').forEach(a=>a.hidden=true);
})();

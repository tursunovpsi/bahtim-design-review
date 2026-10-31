/* Existing production routes from 410b732. Static design examples; no API actions. */
(()=>{const s=window.BAH20_SCREENS,{E,a,p}=window.BAH20_HELPERS;
const row=(t,k,sub,id)=>`<a class="row" href="../${id}/index.html"><div><strong>${E(t(k))}</strong><small>${E(t(sub))}</small></div><span aria-hidden="true">›</span></a>`;
const box=(t,k,body,cls='tint')=>`<section class="panel ${cls}"><h2>${E(t(k))}</h2>${body}</section>`;
const field=(t,k,c)=>`<label class="field"><span>${E(t(k))}</span>${c}</label>`;
const input=(name,extra='')=>`<input name="${name}" ${extra}>`;
const area=(name,extra='')=>`<textarea name="${name}" ${extra}></textarea>`;
const select=(t,name,keys)=>`<select name="${name}">${keys.map(k=>`<option value="${k}">${E(t(k))}</option>`).join('')}</select>`;
const form=(t,id,body,submit='save')=>`<form data-review-form="${id}">${body}<p class="form-error" role="alert" hidden></p><div class="actions"><button class="primary" type="submit">${E(t(submit))}</button></div></form>`;
const add=(id,title,sub,body,parent='profile',group='existing')=>s[id]={id,title,sub,body,parent,group,notes:'Визуальная спецификация существующего маршрута 410b732. Формы демонстрационные, значения не отправляются. Использовать существующие серверные поля и проверки, не переносить mock-обработчики в production.'};
add('search-settings','ssTitle','ssSub',t=>form(t,'search-settings',field(t,'findCountry',input('country-filter','type="search" autocomplete="off"'))+`<fieldset><legend>${E(t('ssCountries'))}</legend><div class="country-picker" data-search-countries></div></fieldset><div class="cols">${field(t,'ageFrom',input('age-from','type="number" min="18" max="120" value="25" required'))}${field(t,'ageTo',input('age-to','type="number" min="18" max="120" value="35" required'))}</div>`+field(t,'ssGeo',select(t,'search-geo',['geoAny','geoCountry','geoRegion','geoCity']))+p(t,'ssNote'),'saveTerms'),'search');
add('conversations','convTitle','convSub',t=>row(t,'demoName','demoChat1','chat')+p(t,'convNote'),'interests');
add('profile-basic','pBasic','pBasicSub',t=>form(t,'profile-basic',field(t,'basicNick',input('nickname','maxlength="40"'))+p(t,'basicNote'))+row(t,'changeResidence','resSub','residence'));
for(const [id,title,sub,label,keys]of [
 ['marital','pMarital','pMaritalSub','marital',['notSetF','single','divorced','widowed']],
 ['children','pChildren','pChildrenSub','childrenQ',['notSetF','childrenYes','childrenNo']],
 ['education','pEdu','pEduSub','eduLevel',['notSetF','eduSecondary','eduVocational','eduHigher','eduPostgraduate','eduOther']]
])add('profile-'+id,title,sub,t=>form(t,'profile-'+id,field(t,label,select(t,id,keys))));
add('profile-work','pWork','pWorkSub',t=>form(t,'profile-work',field(t,'workProfession',input('profession','maxlength="100"'))+field(t,'workAbout',area('work','maxlength="200"'))));
add('profile-lifestyle','lsTitle','lsVoluntary',t=>form(t,'profile-lifestyle',[
 ['smoking','lsSmoking',['no','sometimes','yes']],['alcohol','lsAlcohol',['no','sometimes','yes']],['rhythm','lsRhythm',['early','late','flexible']],['sport','lsSport',['daily','weekly','rarely','no']]
].map(([id,k,values])=>field(t,k,select(t,id,['notSetF',...values.map(v=>'ls_'+id+'_'+v)]))).join('')+field(t,'lsLabel',area('lifestyle','maxlength="200"'))));
add('profile-extra','extraTitle','extraNote',t=>form(t,'profile-extra',field(t,'originCountry','<select name="origin-country" data-origin-country></select>')+field(t,'relocateReady',select(t,'relocate',['relocateMaybe','relocateYes','relocateNo']))));
add('data-policy','dataTitle','dataSub',t=>box(t,'dataAccount',p(t,'dataAccountText'))+box(t,'dataSee',['dataSee1','dataSee2','dataSee3'].map(k=>p(t,k)).join(''),'soft')+box(t,'dataClosed',p(t,'dataClosed1')+p(t,'dataClosed2'))+p(t,'dataNote')+a(t,'dataBack','rules','secondary'),'rules');
add('contact-unavailable','cuTitle','cuSub',t=>box(t,'cuPanel',p(t,'cuText'))+a(t,'continueChat','chat'),'chat');
add('contact-access','caTitle','caSub',t=>row(t,'demoName','caConfirmed','contacts')+a(t,'caClose','contact-revoked','secondary')+p(t,'caNote'),'privacy');
add('report','repTitle','repSub',t=>form(t,'report',field(t,'reason',select(t,'report-reason',['chooseReason','r_scam','r_threats','r_paid_services','r_exploitation','r_spam','r_fake','r_rude','r_married','r_other']))+field(t,'whatHappened',area('report-text','required maxlength="1000"'))+p(t,'repBlockHint')+p(t,'repNote'),'sendReport'),'candidate');
add('report-sent','supSent','repNote',t=>a(t,'backHome','home'),'report');
add('delete-account','delTitle','delSub',t=>box(t,'delWhat',p(t,'delText'),'soft')+form(t,'delete-account',`<label class="check"><input type="checkbox" required name="delete-confirm"><span>${E(t('delCheck'))}</span></label>`,'delSend')+a(t,'keepAccount','settings','secondary')+p(t,'delNote'),'settings');
add('portrait','ptTitle','ptSub',t=>box(t,'ptEmpty',p(t,'ptEmptyText'),'soft')+a(t,'ptAdd','portrait-edit')+p(t,'ptNote'),'profile','life');
add('portrait-edit','ptAdd','ptEmptyText',t=>box(t,'ptQuestions',p(t,'lifeTheme_memories'),'soft')+form(t,'portrait-edit',field(t,'ptOwn',input('portrait-question','required maxlength="200"'))+field(t,'ptAnswer',area('portrait-answer','required minlength="10" maxlength="700"'))+p(t,'ptAnswerHint'))+p(t,'ptNote'),'portrait','life');
s['life']={...s['life-editor'],id:'life'};s['blocked-list']={...s.blocked,id:'blocked-list'};
add('blocked','rsTitleTemp','rsSubR',t=>box(t,'rsBlockTemp',p(t,'rsReason'),'alert')+box(t,'rsMeans',p(t,'rsMeansText'),'soft')+form(t,'appeal',field(t,'appealTitle',area('appeal','required minlength="10" maxlength="1000"')),'appealSend')+a(t,'helpRow','support','secondary'),null);
const oldPrivacy=s.privacy.body;s.privacy.body=t=>oldPrivacy(t).replace('../blocked/','../blocked-list/');
// Complete profile index without changing the source route identifiers.
const oldProfile=s.profile.body;s.profile.body=t=>oldProfile(t)+[
 ['pBasic','pBasicSub','profile-basic'],['pMarital','pMaritalSub','profile-marital'],['pChildren','pChildrenSub','profile-children'],['pEdu','pEduSub','profile-education'],['pWork','pWorkSub','profile-work'],['pLifestyle','pLifestyleSub','profile-lifestyle'],['pExtra','extraNote','profile-extra'],['ptTitle','ptSub','portrait']
].map(x=>row(t,...x)).join('');
const oldSettings=s.settings.body;s.settings.body=t=>oldSettings(t)+row(t,'dataTitle','dataSub','data-policy')+row(t,'deleteRow','deleteRowSub','delete-account');
const oldSearch=s.search.body;s.search.body=t=>a(t,'changeSearch','search-settings','secondary')+oldSearch(t).replace('../residence/','../search-settings/');
const oldInterests=s.interests.body;s.interests.body=t=>oldInterests(t).replace('../chat/','../conversations/');
add('admin-user','reviewUser','reviewDemo',t=>box(t,'demoName',p(t,'reviewReadonly'))+row(t,'adminReview','adminSafety','admin-review')+row(t,'adminLog','adminSafety','admin-log'),'admin-users','admin');
add('admin-requests','reviewRequests','adminSafety',t=>box(t,'reviewPending',p(t,'reviewDemo')+p(t,'reviewPayment')+a(t,'reviewOpen','admin-user','secondary'))+p(t,'reviewNoActions'),'admin','admin');
add('admin-reports','reviewReports','adminSafety',t=>box(t,'reviewPending',p(t,'adminDemoReport')+a(t,'adminReview','admin-review','secondary')),'admin','admin');
add('admin-appeals','reviewAppeals','adminSafety',t=>box(t,'reviewPending',p(t,'reviewDemo')+p(t,'supTitle')+a(t,'adminReview','admin-review','secondary'))+p(t,'adminNoSend'),'admin','admin');
add('admin-settings','reviewAdminSettings','adminSafety',t=>{
 const fields=items=>items.map(([name,key])=>field(t,key,input(name,'type="number" placeholder="—" readonly'))).join('');
 const fold=(key,body)=>`<details><summary>${E(t(key))}</summary><div>${body}</div></details>`;
 return box(t,'reviewPaymentMode',field(t,'reviewPaymentMode',select(t,'review-payment-mode',['reviewManual','reviewAutomatic'])),'soft')+p(t,'reviewConfigHint')+
 fold('reviewLimits',fields([['free_views_per_day','adminLegacy367'],['max_photos','adminLegacy369'],['min_age','adminLegacy371'],['max_age','adminLegacy372']]))+
 fold('reviewPointConfig',fields([['points_login','ptsLogin'],['points_streak3','ptsStreak3'],['points_streak7','ptsStreak7'],['points_fill','ptsFill'],['points_referral','ptsReferral'],['referral_max_month','reviewReferralMax'],['reward_view1','rw_view1'],['reward_view3','rw_view3'],['reward_premium1','rw_premium1'],['reward_premium7','rw_premium7']]))+
 fold('reviewAiConfig',field(t,'reviewAiConfig',select(t,'ai_assistant',['reviewAiOff','reviewAiOn']))+field(t,'reviewProvider',input('ai_provider','readonly'))+field(t,'reviewModel',input('ai_model','readonly'))+fields([['life_max_len','reviewStoryLimit']]))+
 fold('reviewPaymentDetails',field(t,'reviewPaymentDetails',area('payment_details','readonly')))+
 fold('reviewPlans',field(t,'reviewCode',input('code','readonly'))+field(t,'reviewTitleRu',input('title_ru','readonly'))+field(t,'reviewTitleUz',input('title_uz','readonly'))+fields([['days','reviewDays'],['price','reviewPrice']])+field(t,'reviewCurrency',input('currency','readonly'))+`<label class="check"><input type="checkbox" name="active" disabled><span>${E(t('reviewActive'))}</span></label>`+fields([['sort','reviewSort']]))+p(t,'reviewNoActions');
},'admin','admin');
add('admin-backups','reviewBackups','adminSafety',t=>box(t,'reviewBackupStatus',p(t,'reviewBackupHint'),'soft')+box(t,'reviewHealth',p(t,'reviewReadonly'))+p(t,'reviewNoActions'),'admin','admin');
const oldAdmin=s.admin.body;s.admin.body=t=>oldAdmin(t).replace('../admin-review/','../admin-reports/').replace('</nav>',()=>[['reviewRequests','admin-requests'],['reviewAppeals','admin-appeals'],['reviewAdminSettings','admin-settings'],['reviewBackups','admin-backups']].map(([k,id])=>a(t,k,id,'secondary')).join('')+'</nav>');
const oldUsers=s['admin-users'].body;s['admin-users'].body=t=>oldUsers(t).replace('../admin-review/','../admin-user/');
})();

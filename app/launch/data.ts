export type Launch = {id:string;name:string;phase:string;date:string;owner:string;ready:number;total:number;accounts:number;factor:number;focus:string};
export const launches:Launch[]=[
 {id:'atlas',name:'Atlas AI',phase:'Public preview',date:'October 22, 2026',owner:'Business planning',ready:7,total:10,accounts:48,factor:1,focus:'Complete the business case and meter validation before preview.'},
 {id:'horizon',name:'Horizon Analytics',phase:'General availability',date:'November 12, 2026',owner:'Product planning',ready:8,total:10,accounts:72,factor:1.4,focus:'Confirm launch messaging and support readiness before general availability.'},
 {id:'mosaic',name:'Mosaic Compute',phase:'Private preview',date:'December 3, 2026',owner:'Commercial planning',ready:6,total:10,accounts:24,factor:.65,focus:'Validate demand assumptions and the preview cohort before expanding access.'}
];
export const meters=[
 {id:'compute',name:'Compute',unit:'hours',unitLabel:'Compute hours',rate:.09,quantity:4600,forecast:7200,region:'East US',sampleId:'DEMO-COMPUTE-01',initialState:'Validated'},
 {id:'storage',name:'Storage',unit:'GB-month',unitLabel:'Storage GB-month',rate:.018,quantity:2400,forecast:3500,region:'East US',sampleId:'DEMO-STORAGE-02',initialState:'Validated'},
 {id:'requests',name:'Requests',unit:'1,000 requests',unitLabel:'Thousands of requests',rate:.04,quantity:860,forecast:1350,region:'West Europe',sampleId:'DEMO-REQUESTS-03',initialState:'Needs review'}
];
export const approvals=[
 {id:'finance',name:'Business case & investment',owner:'Finance partner',initial:'Awaiting review',detail:'Review the investment envelope, consumption assumptions and commercial rationale.',evidence:['Business plan v3','Illustrative investment: $60,000','Pricing assumptions and sensitivity range']},
 {id:'product',name:'Scope & customer value',owner:'Product owner',initial:'Approved',detail:'Confirm the intended users, preview scope and customer success criteria.',evidence:['Audience and problem definition','Scope and exclusions','Preview success criteria']},
 {id:'marketing',name:'Positioning & launch narrative',owner:'Product marketing',initial:'Awaiting review',detail:'Check the audience, promise, evidence and field-readiness plan.',evidence:['Positioning brief','Example customer feedback themes','Launch message and enablement checklist']},
 {id:'operations',name:'Support & service readiness',owner:'Service operations',initial:'Approved',detail:'Confirm support ownership, escalation routes and service-readiness documentation.',evidence:['Support runbook','Escalation owners','Launch communications checklist']}
];
export const signals=[
 {id:'market',type:'Market brief',title:'Make consumption costs easier to predict.',summary:'An illustrative market scan suggests a planning question: can buyers estimate usage before committing?',source:'Example editorial brief · September 21',detail:'This is a sample news-style item, not a report of an actual market event. The proposed workspace would show a source, publish date, relevance and a link to the original article.',action:'Add a cost-estimation task to the launch plan.'},
 {id:'feedback',type:'Customer feedback',title:'Explain the meter before showing the estimate.',summary:'A simulated preview participant wants the unit, region and usage assumptions visible together.',source:'Simulated preview interview · September 22',detail:'Illustrative feedback: “I can see the number, but I need to know what counts as a unit.” This is a fictional quote used to demonstrate the feedback-to-decision flow.',action:'Link meter definitions to the consumption view.'},
 {id:'review',type:'Product review',title:'Keep the launch decision next to the evidence.',summary:'A simulated review favors one place to inspect ownership, open questions and sign-off.',source:'Simulated concept review · September 23',detail:'Sample ratings from eight fictional reviewers: 5, 4, 4, 5, 4, 4, 3, 5. Mean: 4.25/5. These illustrate a review widget and are not product results.',action:'Keep approval evidence and decision history in one panel.'}
];
export const workItems=[
 {id:'UX-214',title:'Meter details and unit labels',status:'In progress',owner:'UX + engineering',sprint:'Sprint 12',criteria:['Show quantity and unit together.','Keep regional mapping and source freshness visible.','Explain estimated cost separately from usage.']},
 {id:'UX-219',title:'Business-plan review states',status:'Ready for QA',owner:'UX + engineering',sprint:'Sprint 12',criteria:['Require review of the current plan version.','Show reviewer and decision state.','Request a comment when changes are needed.']},
 {id:'UX-223',title:'Keyboard and narrow-screen review',status:'Planned',owner:'UX + QA',sprint:'Sprint 13',criteria:['Complete the approval flow with a keyboard.','Keep focus visible and restore it when dialogs close.','Provide a usable narrow-screen layout and chart data table.']}
];
export const formatNumber=(n:number)=>new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(n);

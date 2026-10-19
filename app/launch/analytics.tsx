'use client';
import {useId,useState,type CSSProperties,type ReactNode} from 'react';
import {ArrowUpRight,BarChart3,Check,ChevronRight,Info,MousePointer2,Star,TrendingUp,Users} from 'lucide-react';
import {Tooltip,TooltipContent,TooltipTrigger} from '@/components/ui/tooltip';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
import {ChartContainer,ChartTooltip} from '@/components/ui/chart';
import {Area,Bar,BarChart,CartesianGrid,Cell,ComposedChart,Line,ReferenceArea,ReferenceLine,XAxis,YAxis} from 'recharts';
import {approvals,formatNumber,meters,type Launch} from './data';

const currency=(n:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(n);
const compact=(n:number)=>new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1}).format(n);
const palette=['#176be5','#7842d8','#118a50'];
export function Help({label,children}:{label:string;children:ReactNode}){
 const [open,setOpen]=useState(false),[pinned,setPinned]=useState(false);
 return <Tooltip open={open||pinned} onOpenChange={setOpen}><TooltipTrigger asChild><button type="button" className="bi-help" aria-label={'About '+label} onClick={()=>setPinned(p=>!p)} onBlur={()=>setPinned(false)} onKeyDown={e=>{if(e.key==='Escape'){setPinned(false);setOpen(false)}}}><Info size={15}/></button></TooltipTrigger><TooltipContent className="bi-help-content" sideOffset={8} collisionPadding={16} onEscapeKeyDown={()=>{setPinned(false);setOpen(false)}}><strong>{label}</strong><div>{children}</div><small>Hover, focus or tap the info icon.</small></TooltipContent></Tooltip>
}
export function Hint({text,children}:{text:string;children:ReactNode}){return <Tooltip><TooltipTrigger asChild>{children}</TooltipTrigger><TooltipContent className="bi-control-tip" sideOffset={8} collisionPadding={16}>{text}</TooltipContent></Tooltip>}

type Meter=typeof meters[number];
type MonthPoint={month:string;actual:number|null;forecast:number|null};
function UsageHover({active,payload,label,meter}:{active?:boolean;payload?:{payload:MonthPoint}[];label?:string|number;meter:Meter}){
 if(!active||!payload?.length)return null;
 const point=payload[0].payload,isActual=point.actual!==null,value=point.actual??point.forecast??0;
 return <div className="bi-hover"><div className="bi-hover-heading"><span>{label} 2026</span><span className={isActual?'bi-chip-blue':'bi-chip-violet'}>{isActual?'Actual':'Forecast'}</span></div><strong>{formatNumber(value)} <small>{meter.unit}</small></strong><dl><dt>Sample cost estimate</dt><dd>{currency(value*meter.rate)}</dd><dt>Region</dt><dd>{meter.region}</dd></dl><p>{isActual?'Illustrative monthly usage.':'Linear planning scenario, not a prediction.'}</p></div>
}
export function UsageChart({meterId,setMeterId,launch}:{meterId:string;setMeterId:(id:string)=>void;launch:Launch}){
 const meter=meters.find(m=>m.id===meterId)!;
 const gradientId='usage-'+useId().replace(/[^a-zA-Z0-9]/g,'');
 const [selectedMonth,setSelectedMonth]=useState('Aug');
 const current=Math.round(meter.quantity*launch.factor),forecast=Math.round(meter.forecast*launch.factor);
 const values=[.25,.32,.4,.47,.56,.65,.83,1];
 const chart:MonthPoint[]=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((month,i)=>({month,actual:i<8?Math.round(current*values[i]):null,forecast:i===7?current:i>7?Math.round(current+(forecast-current)*(i-7)/4):null}));
 const point=chart.find(p=>p.month===selectedMonth)!;
 const quantity=point.actual??point.forecast??0;
 return <section className="lc-panel bi-usage"><div className="lc-panel-heading"><div><span className="lc-overline">CONSUMPTION INTELLIGENCE</span><div className="bi-title-line"><h4>{meter.unitLabel}</h4><Help label="Usage and forecast">Blue shows sample actual usage through August. The dashed violet line shows a linear planning scenario for September to December. Each chart uses one meter and one unit.</Help></div></div><Select value={meterId} onValueChange={setMeterId}><SelectTrigger aria-label="Consumption meter" className="lc-select"><SelectValue/></SelectTrigger><SelectContent>{meters.map(m=><SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent></Select></div>
 <div className="bi-chart-metrics"><div><span>August actual</span><strong>{compact(current)}<small>{meter.unit}</small></strong></div><div><span>December forecast</span><strong>{compact(forecast)}<small>{meter.unit}</small></strong></div><span className="bi-growth"><TrendingUp size={15}/>{Math.round((forecast/current-1)*100)}%<small>planned growth</small></span></div>
 <div className="bi-chart-key"><span><i className="bi-key-actual"/>Actual</span><span><i className="bi-key-forecast"/>Forecast</span><span>{meter.region} · 2026</span></div>
 <ChartContainer className="bi-usage-chart" config={{actual:{label:'Actual',color:palette[0]},forecast:{label:'Forecast',color:palette[1]}}}>
 <ComposedChart data={chart} accessibilityLayer margin={{top:20,right:18,bottom:8,left:0}}>
 <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#176be5" stopOpacity={.28}/><stop offset="95%" stopColor="#176be5" stopOpacity={.015}/></linearGradient></defs>
 <CartesianGrid vertical={false} stroke="#e7ecf3" strokeDasharray="3 5"/><XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={12} minTickGap={15}/><YAxis tickLine={false} axisLine={false} width={44} tickFormatter={compact}/>
 <ReferenceArea x1="Aug" x2="Dec" fill="#7842d8" fillOpacity={.045}/><ReferenceLine x="Aug" stroke="#ada1ca" strokeDasharray="3 4"/>
 <ChartTooltip content={<UsageHover meter={meter}/>} cursor={{stroke:'#66778d',strokeWidth:1,strokeDasharray:'4 4'}}/>
 <Area dataKey="actual" type="monotone" stroke="var(--color-actual)" strokeWidth={3} fill={'url(#'+gradientId+')'} dot={{r:3,fill:'#176be5',strokeWidth:2,stroke:'#fff'}} activeDot={{r:6,stroke:'#fff',strokeWidth:3}} isAnimationActive={false}/>
 <Line dataKey="forecast" type="monotone" stroke="var(--color-forecast)" strokeWidth={3} strokeDasharray="6 5" dot={{r:3,fill:'#fff',stroke:'#7842d8',strokeWidth:2}} activeDot={{r:6,fill:'#7842d8',stroke:'#fff',strokeWidth:3}} isAnimationActive={false}/>
 </ComposedChart></ChartContainer>
 <div className="bi-point-reader"><div className="bi-point-controls"><span>Inspect a month</span><Select value={selectedMonth} onValueChange={setSelectedMonth}><SelectTrigger aria-label="Month to inspect" className="lc-select"><SelectValue/></SelectTrigger><SelectContent>{chart.map(p=><SelectItem value={p.month} key={p.month}>{p.month} 2026</SelectItem>)}</SelectContent></Select></div><p aria-live="polite"><strong>{formatNumber(quantity)} <span>{meter.unit}</span></strong><span>{point.actual!==null?'Actual':'Forecast'} · {currency(quantity*meter.rate)} sample estimate</span></p></div>
 <details className="lc-data-table bi-data-table"><summary>View data & calculation notes</summary><p>Fictional monthly usage for {launch.name}. September to December are interpolated from the August actual to the December planning value. Estimated cost = quantity × invented unit rate. No discounts, taxes, credits or actual Azure pricing are included.</p><table><caption>{meter.name} · {meter.unit} · 2026</caption><thead><tr><th>Month</th><th>Actual</th><th>Forecast</th></tr></thead><tbody>{chart.map(p=><tr key={p.month}><th>{p.month}</th><td>{p.actual===null?'–':formatNumber(p.actual)}</td><td>{p.month==='Aug'?'Anchor':p.forecast===null?'–':formatNumber(p.forecast)}</td></tr>)}</tbody></table></details>
 </section>
}

export function PlanningKPIs({approvedCount,meterReady,accounts,onPlan,onMeters}:{approvedCount:number;meterReady:boolean;accounts:number;onPlan:()=>void;onMeters:()=>void}){
 const ready=5+approvedCount+(meterReady?1:0),pct=ready*10;
 return <div className="bi-kpis"><section className="bi-kpi bi-kpi-readiness"><div className="bi-kpi-label">Planning readiness<Help label="Planning readiness">{ready} of 10 sample checks are complete: 3 baseline planning checks (audience, scope and owner), {approvedCount} of 4 business approvals, and {meterReady?3:2} of 3 meter mappings. This does not authorize deployment.</Help></div><div className="bi-ring-layout"><div className="bi-ring" style={{'--progress':pct+'%'} as CSSProperties} role="img" aria-label={pct+' percent of planning checks complete'}><strong>{pct}<small>%</small></strong></div><div><strong>{ready}<span> / 10</span></strong><p>checks complete</p></div></div><span className="bi-kpi-foot">{10-ready?`${10-ready} checks to resolve`:'Planning checks complete'}</span></section>
 <section className="bi-kpi bi-kpi-approvals"><div className="bi-kpi-label">Business approvals<Help label="Business approvals">Counts approved reviews from finance, product, marketing and service operations. A review remains open when changes are requested. Select Review approvals to inspect the evidence.</Help></div><strong className="bi-kpi-number">{approvedCount}<span>/4</span></strong><div className="bi-segments" aria-hidden="true">{approvals.map((a,i)=><span key={a.id} className={i<approvedCount?'complete':''}/>)}</div><button className="bi-kpi-link" onClick={onPlan}>Review approvals <ChevronRight size={15}/></button></section>
 <section className="bi-kpi bi-kpi-meters"><div className="bi-kpi-label">Meter validation<Help label="Meter validation">Compute and storage mappings start validated in this sample. The request meter needs a simulated QA confirmation of its unit, region and product mapping.</Help></div><strong className="bi-kpi-number">{meterReady?3:2}<span>/3</span></strong><div className="bi-meter-marks" aria-hidden="true">{['Compute','Storage','Requests'].map((label,i)=><span key={label} className={i<2||meterReady?'complete':''}><i>{i<2||meterReady?<Check size={11}/>:null}</i>{label}</span>)}</div><button className="bi-kpi-link" onClick={onMeters}>Inspect meters <ChevronRight size={15}/></button></section>
 <section className="bi-kpi bi-kpi-accounts"><div className="bi-kpi-label">Preview accounts<Help label="Preview accounts">A fictional cohort of {accounts} accounts for this launch. It is a sample planning count, not measured customer adoption or a growth trend. Each of the 24 tiles represents {accounts/24} sample accounts.</Help></div><strong className="bi-kpi-number">{accounts}<Users size={25}/></strong><div className="bi-cohort-grid" aria-hidden="true">{Array.from({length:24},(_,i)=><span key={i}/>)}</div><span className="bi-kpi-foot">1 tile = {accounts/24} sample accounts</span></section></div>
}

function CostHover({active,payload}:{active?:boolean;payload?:{payload:{name:string;value:number;quantity:number;unit:string;rate:number;region:string}}[]}){
 if(!active||!payload?.length)return null;const p=payload[0].payload;
 return <div className="bi-hover"><div className="bi-hover-heading"><span>{p.name}</span><span className="bi-chip-blue">August estimate</span></div><strong>{currency(p.value)}</strong><p>{formatNumber(p.quantity)} {p.unit} × ${p.rate.toFixed(3)} per {p.unit}</p><p>{p.region} · fictional rate</p></div>
}
export function MeterCostChart({launch}:{launch:Launch}){
 const rows=meters.map((m,i)=>({name:m.name,value:Math.round(m.quantity*launch.factor)*m.rate,quantity:Math.round(m.quantity*launch.factor),unit:m.unit,rate:m.rate,region:m.region,fill:palette[i]}));
 const total=rows.reduce((sum,r)=>sum+r.value,0);
 return <section className="lc-panel bi-cost-panel"><div className="lc-panel-heading"><div><span className="lc-overline">COST DRIVERS</span><div className="bi-title-line"><h4>What contributes to the estimate?</h4><Help label="Cost by meter">All bars use the same USD scale. Each estimate is sample quantity × an invented rate. Unlike raw usage units, these dollar estimates can be added. This is not a bill or actual Azure pricing.</Help></div></div><span className="bi-cost-total"><small>August sample total</small><strong>{currency(total)}</strong></span></div><ChartContainer className="bi-cost-chart" config={{value:{label:'Sample estimate',color:palette[0]}}}><BarChart data={rows} layout="vertical" accessibilityLayer margin={{top:5,right:28,bottom:5,left:0}}><CartesianGrid horizontal={false} stroke="#e7ecf3" strokeDasharray="3 5"/><XAxis type="number" tickLine={false} axisLine={false} tickFormatter={v=>'$'+compact(v)}/><YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={75}/><ChartTooltip content={<CostHover/>} cursor={{fill:'#f1f4fa'}}/><Bar dataKey="value" barSize={23} radius={[0,5,5,0]} isAnimationActive={false}>{rows.map(r=><Cell key={r.name} fill={r.fill}/>)}</Bar></BarChart></ChartContainer><div className="bi-cost-values">{rows.map(r=><div key={r.name}><span><i style={{background:r.fill}}/>{r.name}</span><strong>{currency(r.value)}</strong><small>{Math.round(r.value/total*100)}% of sample estimate</small></div>)}</div><p className="bi-chart-note">USD estimates only. Quantities with different units are never added together.</p></section>
}

export function ReviewDistribution(){
 const ratings=[{stars:5,count:3},{stars:4,count:4},{stars:3,count:1},{stars:2,count:0},{stars:1,count:0}];
 return <section className="lc-panel bi-reviews"><div className="bi-review-score"><span className="lc-overline">CONCEPT REVIEW SNAPSHOT</span><div className="bi-title-line"><strong>4.25<span>/5</span></strong><Help label="Concept review scores">Eight fictional ratings: 5, 4, 4, 5, 4, 4, 3, 5. Average = 34 ÷ 8 = 4.25. These demonstrate the interface and are not historical customer results.</Help></div><div className="bi-stars" aria-hidden="true">{[1,2,3,4,5].map(s=><Star key={s} size={17} fill={s<=4?'currentColor':'none'}/>)}</div><p>8 simulated reviews</p></div><div className="bi-rating-bars" aria-label="Distribution of eight fictional review scores">{ratings.map(r=><div className="bi-rating-row" key={r.stars}><span>{r.stars} <Star size={12}/></span><div role="img" aria-label={`${r.stars} stars: ${r.count} reviews, ${r.count/8*100} percent`}><i style={{width:(r.count/8*100)+'%'}}/></div><strong>{r.count}</strong><Help label={r.stars+'-star reviews'}>{r.count} of 8 fictional reviews ({r.count/8*100}%). All rows use a scale of eight reviews.</Help></div>)}</div><p className="bi-review-context">Themes to explore: clearer meter definitions, confidence in approvals, and an easier path from evidence to action.</p></section>
}

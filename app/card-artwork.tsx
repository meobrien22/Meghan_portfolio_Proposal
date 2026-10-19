import {ArrowUpRight,Check,Layers3} from 'lucide-react';

const projects:Record<string,{title:string;category:string;detail:string;slides:string[]}>= {
  '/Meghan_portfolio_Proposal/work/axis-nova': {title:'Axis Nova',category:'FEDERAL PROPOSALS & ORALS',detail:'NASA mission context',slides:['/Meghan_portfolio_Proposal/decks/axis-nova/004-v2.webp','/Meghan_portfolio_Proposal/decks/axis-nova/008.webp','/Meghan_portfolio_Proposal/decks/axis-nova/010.webp']},
  '/Meghan_portfolio_Proposal/work/meridian-arc': {title:'Meridian Arc',category:'FEDSIM ORALS & DATA STORIES',detail:'Technical clarity. One connected story.',slides:['/Meghan_portfolio_Proposal/decks/meridian-arc/005-v2.webp','/Meghan_portfolio_Proposal/decks/meridian-arc/008-v2.webp','/Meghan_portfolio_Proposal/decks/meridian-arc/020-v2.webp']},
  '/Meghan_portfolio_Proposal/work/core-ai': {title:'CoreAI',category:'EXECUTIVE STORYTELLING',detail:'Complex technology, made clear.',slides:['/Meghan_portfolio_Proposal/decks/core-ai/003.webp','/Meghan_portfolio_Proposal/decks/core-ai/004.webp','/Meghan_portfolio_Proposal/decks/core-ai/006.webp']},
  '/Meghan_portfolio_Proposal/work/agent-workshop': {title:'Northstar Outfitters',category:'WORKSHOPS & AI SOLUTION DESIGN',detail:'Discover. Design. Test.',slides:['/Meghan_portfolio_Proposal/images/agent-workshop/manufacturing-discover.webp','/Meghan_portfolio_Proposal/images/agent-workshop/manufacturing-design.webp','/Meghan_portfolio_Proposal/images/agent-workshop/manufacturing-test.webp']},
};

export default function CardArtwork({href,label}:{href:string;label:string}) {
  const project=projects[href];
  return <a className={'case-art '+(href==='/Meghan_portfolio_Proposal/work/agent-workshop'?'case-art--workshop':project?'case-art--deck':'case-art--ux')} href={href} aria-label={label}>
    <div className="case-art__heading" aria-hidden="true"><span>{project?.category||'UX & HUMAN-CENTERED AI'}</span><strong>{project?.title||'Launch workspace'}</strong></div>
    {project?<div className="case-art__slides" aria-hidden="true">
      <img className="case-art__slide case-art__slide--back" src={project.slides[2]} alt="" loading="lazy" width={1920} height={1080}/>
      <img className="case-art__slide case-art__slide--middle" src={project.slides[1]} alt="" loading="lazy" width={1920} height={1080}/>
      <img className="case-art__slide case-art__slide--front" src={project.slides[0]} alt="" loading="lazy" width={1920} height={1080}/>
    </div>:<div className="case-art__workspace" aria-hidden="true">
      <div className="case-art__appbar"><span className="case-art__appmark"><Layers3/> Launch workspace</span><span>Overview</span><span>•••</span></div>
      <div className="case-art__appbody"><div className="case-art__appintro"><span>ONE VIEW. CLEARER DECISIONS.</span><strong>Bring the launch<br/>into focus.</strong></div>
        <div className="case-art__panels"><div className="case-art__readiness"><span>Planning readiness</span><div className="case-art__ring"><strong>70<span>%</span></strong></div><span className="case-art__status">Planning in progress</span></div>
        <div className="case-art__checklist"><span>UP NEXT</span>{['Business plan','Meter validation','Release review'].map((item,i)=><div key={item}><span className="case-art__check"><Check/></span><span>{item}<small>{['Plan','Validate','Review'][i]}</small></span><ArrowUpRight/></div>)}</div></div>
      </div>
    </div>}
    <div className="case-art__caption" aria-hidden="true"><span>{project?.detail||'Interactive design reconstruction'}</span><span className="case-art__open"><ArrowUpRight/></span></div>
  </a>;
}

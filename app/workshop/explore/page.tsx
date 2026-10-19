import AgentWorkshop from '../../agent-workshop';
import {Header,Footer} from '../../chrome';
export const metadata={title:'Manufacturing Workshop | Meghan Fasano',description:'An interactive Jobs to Be Done and AI workshop for a fictional manufacturer supplying Army uniforms, boots and tactical gear.'};
export default function Page(){return <div className="folio" id="top"><Header/><main id="main"><div className="folio-wrap explore-back"><a className="back-link" href="/Meghan_portfolio_Proposal/work/agent-workshop">← Back to the workshop story</a></div><AgentWorkshop/></main><Footer/></div>}

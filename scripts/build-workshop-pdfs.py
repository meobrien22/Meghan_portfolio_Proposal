"""Build the site-owned AI agent workshop kit from its canonical content."""
import json,html
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle,PageBreak,KeepTogether
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib.pagesizes import A4,A3,landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
root=Path(__file__).resolve().parents[1];out=root/'public/downloads';w=json.loads((root/'content/workshop.json').read_text())
for n,f in [('Sans','DejaVuSans.ttf'),('SansB','DejaVuSans-Bold.ttf'),('Serif','DejaVuSerif.ttf')]:pdfmetrics.registerFont(TTFont(n,'/usr/share/fonts/truetype/dejavu/'+f))
ink=colors.HexColor('#152744');blue=colors.HexColor('#234add');muted=colors.HexColor('#5d7192');line=colors.HexColor('#d5e0f2');pale=colors.HexColor('#eff4ff')
styles=getSampleStyleSheet()
for name,font,size,leading,color in [('TitleX','Serif',28,35,ink),('HeadX','SansB',13,19,blue),('BodyX','Sans',10,16,ink),('SmallX','Sans',8,12,muted),('QuoteX','Serif',16,24,ink),('CellX','Sans',8.5,13,ink)]:styles.add(ParagraphStyle(name=name,fontName=font,fontSize=size,leading=leading,textColor=color,spaceAfter=10))
def clean(s):return html.escape(str(s)).replace('–','-').replace('—','-').replace('→',' > ')
def p(s,style='BodyX'):return Paragraph(clean(s),styles[style])
def title(s):return p(s,'TitleX')
def h(s):return p(s,'HeadX')
def field(k,v):return Paragraph('<b>'+clean(k)+'</b> '+clean(v),styles['BodyX'])
def bullets(a):return [p('• '+x) for x in a]
def table(rows,widths):
 t=Table([[p(x,'CellX') for x in r] for r in rows],colWidths=widths,repeatRows=1,hAlign='LEFT');t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('BACKGROUND',(0,0),(-1,0),pale),('LINEBELOW',(0,0),(-1,-1),.5,line),('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9)]));return t
W=A4[0]-90

def page(c,d):
 pw,ph=d.pagesize;c.saveState();c.setFillColor(blue);c.setFont('SansB',8);c.drawString(45,ph-30,'MEGHAN FASANO / AI AGENT DESIGN WORKSHOP');c.setStrokeColor(line);c.line(45,ph-39,pw-45,ph-39);c.setFillColor(muted);c.setFont('Sans',7);c.drawString(45,27,'NORTHSTAR RETAIL / ILLUSTRATIVE SIMULATION / NO LIVE AGENT OR MEASURED RESULTS');c.drawRightString(pw-45,27,str(d.page));c.restoreState()
def write(name,s):
 d=SimpleDocTemplate(str(out/name),pagesize=A4,leftMargin=45,rightMargin=45,topMargin=59,bottomMargin=47,title='AI Agent Workshop | '+name.replace('northstar-','').replace('-',' '),author='Meghan Fasano');d.build(s,onFirstPage=page,onLaterPages=page)

s=[p('FACILITATOR GUIDE / JTBD + DESIGN THINKING','SmallX'),title(w['title']),p(w['disclosure']),Spacer(1,12),h('A human need. A clear build brief.'),p(w['challenge'],'QuoteX'),h('The proposed starting point'),p(w['recommendation']),h('What participants leave with'),*bullets(['A customer job story and measures of useful progress.','A task map with human judgment and agent responsibilities.','A one-agent or specialist-team blueprint with explicit tools and permissions.','A conversation prototype, scenario test set and pilot plan.']),h('Scope'),p(w['scope']),h('Allocation'),p(w['investment']),PageBreak(),title('Prepare the room'),h('Invitation'),p(w['invitation']),h('Prework'),p(w['prework']),h('People'),table([['Role','Contribution']]+[[r['name'],r['job']] for r in w['roles']],[W*.35,W*.65]),PageBreak(),title('Create space for good judgment'),h('Room and materials'),p(w['room']),*bullets(w['materials']),h('Working agreements'),*bullets(w['agreements']),h('If the room gets stuck'),p(w['contingency']),h('Access and participation'),p('Offer typed, spoken and remote ways to contribute. Obtain consent before recording or photographing. Use anonymized examples, identify who may see them and agree retention before collecting real research.'),PageBreak(),title('The day at a glance'),p('09:00-14:50, with 65 minutes of breaks and lunch. The 285 minutes of activity assume completed research prework; a polished production agent is not the output of a single workshop.'),table([['Time','Activity','Output']]+[[a['time'],a['title'],a['artifact']] for a in w['agenda']],[W*.19,W*.19,W*.62]),PageBreak()]
for i,step in enumerate(w['steps']):
 s += [p(f"0{i+1} / {step['phase']} / {step['time']}",'SmallX'),title(step['title']),h('What we do'),p(step['action']),h('How we do it'),p(step['method']),h('Facilitator prompt'),p(step['example'],'QuoteX'),h('Artifact to carry forward'),p(step['output'])]
 if i==0:s += [h('Interview prompts'),*bullets(w['researchPrompts'])]
 elif i==1:s += [h('Example job story'),p(w['job']['statement'],'QuoteX'),*[(field(k.capitalize()+':',w['job'][k])) for k in ['functional','emotional','social']]]
 elif i==2:s += [h('Task map'),*[(field(x['title']+':',x['agent']+' '+x['gate'])) for x in w['workflow']]]
 elif i==3:s += [h('Compare architectures'),*[(field(c['title']+':',c['tradeoff'])) for c in w['concepts']],h('Agent contract'),p('Name the job, input, output, permitted tools, handoff conditions and approval boundary. Every role needs an accountable owner.')]
 elif i==4:s += [h('Build the smallest useful slice'),*bullets(['Use sample records before connecting customer systems.','Make the customer conversation and tool trace visible together.','Show source timestamps and explain uncertainty.','Draft consequential actions; wait for authorized review.']),h('Prototype instruction'),p('Understand the delivery problem, retrieve only permitted records, explain verified options and draft the next step. Ask for missing context. Never invent a delivery commitment or execute a refund or booking change.')]
 elif i==5:s += [h('Observation plan'),p(w['experiment']['observation']),h('Test first'),*bullets([t['name']+': '+t['expected'] for t in w['testCases']])]
 else:s += [h('Decision readback'),p('Name the chosen scope, its evidence, the dissent, the build owner and the next gate. A simulation can illustrate the plan but cannot validate a real agent.'),h('Pilot boundary'),p(w['scope'])]
 s.append(PageBreak())
s += [title('Source cards and traceability'),p('Every note below is simulated. In a real workshop, replace each with a consented observation or clearly labeled assumption.')]
for n in w['notes']:s += [KeepTogether([h(n['id']+' / '+n['category']),p(n['text']),p(n['role']+' | '+n['source']+' | '+n['insight'],'SmallX')])]
s += [PageBreak(),title('From evidence to design')]
for i in w['insights']:s += [h(i['id']+' / '+i['title']),p(i['text']),field('Notes:',', '.join(i['notes'])),p(i['opportunity']),p(i['decision'])]
s += [PageBreak(),title('Agent responsibility cards')]
for a in w['agents']:s += [KeepTogether([h(a['name']),p(a['job']),field('Input:',a['input']),field('Tools:',a['tools']),field('Output:',a['output']),field('Boundary:',a['boundary'])])]
s += [PageBreak(),title('Compare options with the same rubric'),p('Scores and weights are illustrative judgments. Weighted score = sum(score x weight) / sum(weights). Higher is better; changing the weights explores sensitivity.')]
for c in w['criteria']:s += [field(c['label']+f" ({c['weight']}%):",c['meaning'])]
s += [table([['Design']+[c['label'] for c in w['criteria']]]+[[c['title']]+list(map(str,c['scores'])) for c in w['concepts']],[W*.3]+[W*.14]*5),PageBreak(),title('Test with people and the real implementation'),p(w['experiment']['hypothesis'],'QuoteX')]
for k in ['participants','observation','thresholds','next']:s += [h(k.capitalize()),p(w['experiment'][k])]
s += [PageBreak(),title('Decision log')]
for d in w['decisions']:s += [KeepTogether([h(d['id']+' / '+d['decision']),field('Evidence:',d['evidence']),field('Dissent:',d['dissent']),field('Owner:',d['owner']),field('Open question:',d['question']),field('Next:',d['next'])])]
s += [PageBreak(),title('A gated 30 / 60 / 90 plan')]
for m in w['milestones']:s += [h(m['day']+' days / '+m['title']),p(m['action']),field('Owner:',m['owner']),field('Dependency:',m['dependency']),field('Measure:',m['measure'])]
s += [h('Method foundations'),p('Original illustrative workshop combining JTBD discovery with design thinking and agent prototyping.'),*[p(x['title']+' / '+x['url'],'SmallX') for x in w['sources']]]
write('northstar-workshop-guide.pdf',s)

labels=[['Recent incident and circumstances','Actions and workarounds','Functional, emotional and social stakes','Sources and unresolved assumptions'],['When: situation and trigger','I want to: desired progress','So I can: meaningful outcome','Alternatives, anxieties and evidence needed'],['Observable customer progress','Baseline and proposed measure','Quality, trust and control','Advance, revise and stop criteria'],['Customer steps and human judgment','Agent tasks or fixed automation','Sources, freshness and access','Handoffs and failure paths'],['One-agent concept','Specialist-team concept','Guided-workflow baseline','Criteria, weights and dissent'],['Agent name and job','Input and output contract','Permitted tools and data','Boundary, human owner and escalation'],['What context may travel','Source, timestamp and uncertainty','Human review trigger','Approval record and fallback'],['Customer request and response','Prompt or behavior instruction','Tool call and sample result','Human review and failure recovery'],['Scenario and expected behavior','Observed behavior and evidence','Task success, trust and effort','Issue, owner and next revision'],['Decision and evidence','Dissent and alternatives','Accountable owner','Open question and next gate'],['Pilot scope and dependencies','Owners and dates','Outcome measures and monitoring','Feedback, rollback and expansion gate']]
s=[title('AI agent workshop workbook'),p('Reusable canvases for a customer job, an agent design and the evidence needed to move forward.'),h('Project'),p('Customer / context: ______________________________________________'),p('Workshop date: __________________________________________________'),p('Decision owner: __________________________________________________'),h('Before you begin'),*bullets(['Bring recent, consented customer incidents.','Define the decision the workshop can make.','Inventory relevant tools and data access.','Provide a baseline and an accountable service owner.','Label assumptions; preserve contradictory evidence.']),h('Capture each note'),p('Source ID | Observation or quote | Context | Evidence / interpretation / idea / risk | Related decision'),h('Workshop outputs'),p('Job story > job map > agent contract > prototype > test scorecard > pilot brief'),PageBreak()]
for i,pan in enumerate(w['panels']):
 s += [p(pan['id']+' / REUSABLE CANVAS','SmallX'),title(pan['title']),p(pan['instruction'])]
 for lab in labels[i]:s += [h(lab),Table([[''],[''],['']],colWidths=[W],rowHeights=[22,22,22],style=TableStyle([('LINEBELOW',(0,0),(-1,-1),.5,line)])),Spacer(1,18)]
 if i<len(w['panels'])-1:s.append(PageBreak())
write('northstar-blank-workbook.pdf',s)

# A3 wall: adaptive row heights; notes never compete with the footer.
PW,PH=landscape(A3);c=canvas.Canvas(str(out/'northstar-wall-panels.pdf'),pagesize=(PW,PH));c.setTitle('AI agent workshop - 11 filled and 11 reusable A3 panels');c.setAuthor('Meghan Fasano')
wallstyle=ParagraphStyle(name='WallBody',fontName='Sans',fontSize=17,leading=24,textColor=ink)
def drawp(text,x,top,width,style):
 pp=Paragraph(clean(text),style);ww,hh=pp.wrap(width,PH);pp.drawOn(c,x,top-hh);return hh
for blank in [False,True]:
 for i,pan in enumerate(w['panels']):
  c.setFillColor(blue);c.rect(0,PH-14,PW,14,fill=1,stroke=0);c.setFont('SansB',10);c.drawString(45,PH-45,'MEGHAN FASANO / AI AGENT DESIGN / '+('REUSABLE CANVAS' if blank else 'FILLED SIMULATION'));c.drawRightString(PW-45,PH-45,pan['id']);top=PH-73
  top-=drawp(pan['title'],45,top,PW-90,styles['TitleX'])+12;top-=drawp(pan['instruction'],45,top,PW-90,wallstyle)+24
  entries=labels[i] if blank else pan['fields'];bottom=80;rowh=min(125,(top-bottom)/len(entries));
  for txt in entries:
   pp=Paragraph(clean(txt),wallstyle);_,hh=pp.wrap(PW-120,rowh-20)
   assert hh<rowh-15,(pan['id'],hh,rowh)
   c.setStrokeColor(line);c.setFillColor(colors.white if blank else pale);c.roundRect(45,top-rowh+8,PW-90,rowh-8,4,fill=1,stroke=1);pp.drawOn(c,60,top-15-hh)
   if blank:c.setStrokeColor(line);c.line(60,top-rowh+27,PW-60,top-rowh+27)
   top-=rowh
  c.setFont('Sans',9);c.setFillColor(muted);c.drawString(45,44,'A3 landscape / Print at 100% / '+('Record evidence and ownership.' if blank else 'Simulated inputs. Related notes: '+(', '.join(pan['notes']) or 'Pilot decision record.')));c.drawRightString(PW-45,24,str(c.getPageNumber()));c.showPage()
c.save()

s=[p('PILOT READOUT / ILLUSTRATIVE CASE','SmallX'),title('A useful agent starts with a human job.'),h('The challenge'),p(w['challenge']),h('The customer’s job'),p(w['job']['statement'],'QuoteX'),h('Proposed starting point'),p(w['recommendation']),h('How the workshop gets there'),p('Discover the incident, define meaningful progress, map the job, design the agent responsibilities, prototype the conversation, test real scenarios and agree a bounded pilot.'),h('The design logic'),*bullets([i['title']+': '+i['decision'] for i in w['insights']]),PageBreak(),title('Make the next investment testable.'),h('Scope and allocation'),p(w['scope']),p(w['investment']),h('Compare before committing'),p('Use the same job and test set to compare one agent, a specialist team and a guided workflow. Separate roles only where that improves ownership, permissions or outcomes enough to justify the handoff overhead.'),h('The evidence required next'),p(w['experiment']['participants']),p(w['experiment']['thresholds']),h('Decide through learning'),*bullets([m['day']+' days: '+m['title']+' '+m['action'] for m in w['milestones']]),h('Meghan’s contribution'),p('Connect the customer story to the technical brief, facilitate cross-functional judgment, make the agent behavior visible and carry the evidence into an executive decision.'),p(w['disclosure'],'SmallX')]
write('northstar-case-study.pdf',s)
print('Built four AI agent workshop PDFs.')

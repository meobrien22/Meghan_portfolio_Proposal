from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("Folio", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("Folio-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFontFamily("Folio",normal="Folio",bold="Folio-Bold",italic="Folio",boldItalic="Folio-Bold")
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.enums import TA_LEFT
from pathlib import Path
out=Path(__file__).resolve().parents[1]/'public/downloads/meghan-fasano-resume.pdf'
c=canvas.Canvas(str(out),pagesize=(612,792))
c.setTitle('Meghan Fasano | Visual Design & Communications')
c.setAuthor('Meghan Fasano')
ink=HexColor('#202226');muted=HexColor('#62676f');blue=HexColor('#1945d5')
def text(x,y,s,size=10,font='Folio',color=ink):
 c.setFillColor(color);c.setFont(font,size);c.drawString(x,y,s)
def para(x,y,s,w=516,size=10,leading=14,color=ink):
 st=ParagraphStyle('p',fontName='Folio',fontSize=size,leading=leading,textColor=color)
 p=Paragraph(s,st);aw,ah=p.wrap(w,700);p.drawOn(c,x,y-ah);return y-ah
def label(y,s):
 c.setStrokeColor(HexColor('#dedfe3'));c.line(48,y+7,564,y+7);text(48,y-7,s,8.5,'Folio-Bold',blue);return y-24
text(48,744,'Meghan Fasano',30,'Folio-Bold')
text(48,717,'VISUAL DESIGN & EXECUTIVE COMMUNICATIONS',10,'Folio-Bold',blue)
text(48,696,'Charleston, SC  |  meghan@choosepeerless.com',9.5,color=muted)
c.linkURL('mailto:meghan@choosepeerless.com',(120,692,365,705),relative=0)
y=para(48,675,'Communications and design leader who turns complex technology into clear executive narratives, compelling presentations and human-centered experiences. Approximately 18 years across Microsoft employee and vendor roles, with proposal and storytelling work supporting $12B+ in contract wins.',size=10,leading=13.5)
y=label(y-23,'SELECTED WORK & IMPACT')
y=para(48,y,'<b>Executive storytelling:</b> Materials for Judson Althoff and support for the Microsoft-FedEx CEO-to-CEO engagement involving Satya Nadella.<br/><b>Customer discovery:</b> A 2.5-day Sam\'s Club executive workshop using Design Thinking and Jobs to Be Done; AI demonstration narratives for Walmart.<br/><b>Strategic communications:</b> Solution framing and executive narratives for Walgreens Boots Alliance; federal proposals, FEDSIM orals and JEDI pursuit support.',size=10,leading=14)
y=label(y-23,'PROFESSIONAL EXPERIENCE')
roles=[('The Peerless Group','Tech Innovator / AI Futurist','Jun 2025-Present','Create executive presentations and AI-enabled proposal assets. Facilitate discovery workshops and turn stakeholder input into customer journeys and recommendations.'),('Microsoft','Lead UX Designer','Apr 2023-Jul 2025','Led UX/UI, information architecture and interactive prototypes for an internal launch tool. Built a reusable Figma component and style library with cross-functional partners.'),('Microsoft | Worldwide Retail & Consumer Goods','Senior Marketing Communications Manager','Aug 2019-Mar 2023','Designed executive decks, technical demos and customer narratives. Aligned sales, architects, specialists and customer leaders around solution value and next steps.'),('P3Solutions | Microsoft vendor assignment','Sales Communications & Proposal Strategist','Jul 2007-Aug 2019','Led proposal and orals design supporting $12B+ in contract wins. Coordinated 60+ proposals annually, including major federal pursuits, reviews and presenter preparation.')]
for company,role,date,body in roles:
 text(48,y,company,10,'Folio-Bold');c.setFont('Folio',8.5);c.setFillColor(muted);c.drawRightString(564,y,date)
 y-=14;text(48,y,role,9.5,color=muted);y-=8;y=para(48,y,body,size=9.2,leading=12.3);y-=14
# Compact earlier role preserves the full chronology.
y=para(48,y+2,'<b>Earlier:</b> COE, Production Manager / IT Administrator (May 2005-Mar 2007). Federal proposal production, document control and on-time submission.',size=9,leading=12,color=muted)
y=label(y-22,'CAPABILITIES & CREDENTIALS')
y=para(48,y,'<b>Design & strategy:</b> PowerPoint, Adobe Creative Cloud, Figma, executive storytelling, information design, UX/UI, Design Thinking and Jobs to Be Done.<br/><b>Microsoft certifications:</b> AI Transformation Leader (AB-731); Azure AI Engineer Associate (AI-102); Azure AI Fundamentals (AI-900).<br/><b>Education:</b> Marymount University, BA, Liberal Arts and Sciences; The George Washington University School of Business, UX/UI Design.',size=8.9,leading=12.1)
assert y>30, y
c.save();print(out);print('Bottom content position:',y)

import {projects} from '../../projects';
export function generateStaticParams(){return [...projects.map(p=>({slug:p.id})),{slug:'agent-workshop'}]}
export { default } from '../../page';

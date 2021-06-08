import { Highlight } from "./highlight.types";
import { Project } from "./project.types";

export interface Portfolio {
    name: string,
    email: string,
    title: string,
    summary: string,
    blog: string,
    podcast: string,
    resume: string,
    profiles: [{
        network: string,
        username: string,
        url: string,
        icon: string
    }],
    projects: [project: Project],
    highlights: [highlight: Highlight],
    endorsements: [
        {
            name: string,
            text: string
        }
    ],
    theme: {
        emoji: string,
        quote: string,
        makrCredit: boolean
    }
}
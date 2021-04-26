export interface Project {
    slug: string,
    title: string,
    summary: string,
    role: string,
    status: string,
    links: [{
        text: string,
        url: string,
        icon: string
    }],
    testimonials: [{
        name: string,
        text: string
    }]
}
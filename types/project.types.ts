export interface Project {
    slug: string,
    title: string,
    summary: string,
    shareImageUrl: string,
    roles: [string],
    keywords: [string],
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
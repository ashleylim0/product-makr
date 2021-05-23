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
    projects: [{
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
    }],
    highlights: [{
        slug: string,
        title: string,
        summary: string,
        url: string
    }],
    endorsements: [
        {
            name: string,
            text: string
        }
    ],
    theme: {
        accentColor: string,
        emoji: string,
        quote: string,
        makrCredit: boolean
    }
}
// Types for the timeline module
export type value = {
    date: Date,
    title: string,
    content: Array<string>,
    id: number,
}

export type major = {
    year: number,
    events: Array<value>,
}

export type timelines = {
    id: number,
    timeline: Array<{
        id: number,
        title: string,
        content: string[],
        date: Date,
        year_id: number
    }>
}

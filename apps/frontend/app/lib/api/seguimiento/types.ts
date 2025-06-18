export interface TrackingEntry {
    id: string
    date: string
    type: "income" | "expense"
    category: string
    amount: number
    description: string
}

export interface TrackingFormData {
    id: string
    date: string
    type: "income" | "expense"
    category: string
    amount: number
    description: string
}

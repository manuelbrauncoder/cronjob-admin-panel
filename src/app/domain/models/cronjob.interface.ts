export interface Cronjob {
    key: string,
    time: string,
    lastExecution?: string,
    errorOnLastExecution?: boolean
}
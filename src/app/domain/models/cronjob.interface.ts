export interface CronJob {
    key: string,
    time: string,
    lastExecution?: string,
    errorOnLastExecution?: boolean
}
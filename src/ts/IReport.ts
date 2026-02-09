// ts/IReport.ts

interface IReport {
    id: string;
    vendorid: string;
    userid: string;
    entityType: string;
    reason: string;
    timestamp: string;
    report?: string;
}

export default IReport;
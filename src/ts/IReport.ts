interface IReport {
    id: string;
    vendorid: string;
    userid: string;
    entityType: string;
    reason: string;
    timestamp: string;
    report?: string; // Optional, for compatibility
}
export default IReport;
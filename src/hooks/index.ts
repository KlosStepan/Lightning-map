////typescript
// filepath: /home/stepo/projects/Lightning-map/src/hooks/index.ts
import { useState } from "react";
// Redux + RTK
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";
import { setMerchants, setEshops, setLikes } from "../redux-rtk/dataSlice";
import { setUser } from "../redux-rtk/miscSlice";
// TypeScript
import IMerchant from "../ts/IMerchant";
import IEshop from "../ts/IEshop";
import IReport from "../ts/IReport";

export const useFetchAll = () => {
  const dispatch = useDispatch();
  const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);

  const fetchAll = async (): Promise<void> => {
    if (!apiBaseUrl) {
      console.error("[useFetchAll] apiBaseUrl is null – cannot fetch data");
      return;
    }

    const [merchantsRes, eshopsRes, likesRes, authRes] = await Promise.all([
      fetch(`${apiBaseUrl}/merchants`),
      fetch(`${apiBaseUrl}/eshops`),
      fetch(`${apiBaseUrl}/likes`),
      fetch(`${apiBaseUrl}/logintest`, { method: "GET", credentials: "include" }),
    ]);

    const merchants: IMerchant[] = await merchantsRes.json();
    const eshops: IEshop[] = await eshopsRes.json();
    const likes = await likesRes.json();

    dispatch(setMerchants(merchants));
    dispatch(setEshops(eshops));
    dispatch(setLikes(likes));

    if (authRes.ok) {
      const user = await authRes.json();
      dispatch(setUser(user));
    } else {
      dispatch(setUser(null));
    }
  };

  return { fetchAll };
};

// --- new hook: useFetchReports ---

export const useFetchReports = () => {
  const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
  const [reports, setReports] = useState<IReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [reportsError, setReportsError] = useState<string | null>(null);

  const fetchReports = async (): Promise<void> => {
    if (!apiBaseUrl) {
      console.error("[useFetchReports] apiBaseUrl is null – cannot fetch reports");
      setReportsError("API base URL is not configured");
      return;
    }

    setLoadingReports(true);
    setReportsError(null);

    try {
      const res = await fetch(`${apiBaseUrl}/reports`);
      if (!res.ok) throw new Error(`Failed to fetch reports: ${res.status}`);

      const reportsData = await res.json();
      setReports(
        reportsData.map((r: any): IReport => ({
          id: r.id,
          vendorid: r.entityId,
          userid: r.owner,
          entityType: r.entityType,
          reason: r.reason,
          timestamp: r.createdAt,
          report: r.reason,
        }))
      );
    } catch (err) {
      console.error("[useFetchReports] fetchReports failed:", err);
      setReportsError((err as Error).message || "Failed to fetch reports");
    } finally {
      setLoadingReports(false);
    }
  };

  return { reports, loadingReports, reportsError, fetchReports };
};
import useDocumentTitle from "dynamic-title-react";
import SessionCard from "../../components/Dashboard/SessionCard";
import useSessions from "../../hooks/useSessions";
import { useAuth } from "../../hooks/useAuth";

const UploadMaterials = () => {
  const { user } = useAuth();
  const { sessions, refetch } = useSessions("approved", user?.email || "");
  useDocumentTitle("Upload Materials | TSC");
  return (
    <section className="p-4">
      {sessions?.length == 0 && (
        <h2 className="text-2xl font-medium">
          No Approved sessions. So you cannot upload materials. Wait for a
          session to be approved
        </h2>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sessions.map(
          (session: {
            _id: string;
            sessionTitle: string;
            sessionDescription: string;
            status: string;
            tutorEmail: string;
          }) => (
            <SessionCard
              key={session._id}
              data={session}
              showUploadMaterialsBtn={true}
              refetch={refetch}
            />
          )
        )}
      </div>
    </section>
  );
};

export default UploadMaterials;

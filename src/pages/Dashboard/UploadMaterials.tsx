import useDocumentTitle from "dynamic-title-react";
import SessionCard from "../../components/Dashboard/SessionCard";
import useSessions from "../../hooks/useSessions";

const UploadMaterials = () => {
  const { sessions } = useSessions("approved");
  useDocumentTitle("Upload Materials | TSC");
  return (
    <section className="p-4">
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
            />
          )
        )}
      </div>
    </section>
  );
};

export default UploadMaterials;

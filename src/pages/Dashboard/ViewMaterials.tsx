import useMaterials from "../../hooks/useMaterials";
import MaterialCard from "../../components/Dashboard/MaterialCard";

const ViewMaterials = () => {
  const { materials, refetch } = useMaterials();

  return (
    <section className="p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {materials.map(
          (item: {
            _id: string;
            sessionId: string;
            tutorEmail: string;
            title: string;
            link: string;
            viewLink: string;
          }) => (
            <MaterialCard key={item._id} data={item} refetch={refetch} />
          )
        )}
      </div>
    </section>
  );
};

export default ViewMaterials;

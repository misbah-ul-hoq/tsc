import useMaterials from "../../../hooks/useMaterials";
import { materialsType } from "../../../types/materialType";
import api from "../../../axios/api";
import Swal from "sweetalert2";

const ViewAllMaterialsAdmin = () => {
  const { materials, refetch } = useMaterials(true);

  const handleDelete = (id: string, name: string) => {
    console.log(id, name);
    api.delete(`/session-materials/${id}`).then((res) => {
      if (res.data.deletedCount) {
        Swal.fire({
          text: "Deleted successfully",
          icon: "success",
        });
        refetch();
      }
    });
  };
  return (
    <section className="p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {materials.map((material: materialsType) => {
          const { _id, viewLink, title, tutorEmail } = material;
          return (
            <div key={_id} className="card card-compact bg-base-100 shadow-xl">
              <figure>
                <img src={viewLink} alt={title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>Tuotors email: {tutorEmail}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure to delete? " + material.title,
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDelete(material._id, material.title);
                        }
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ViewAllMaterialsAdmin;

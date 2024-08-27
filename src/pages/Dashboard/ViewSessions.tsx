import useDocumentTitle from "dynamic-title-react";
import useSessions from "../../hooks/useSessions";
import SessionCard from "../../components/Dashboard/SessionCard";
import { useAuth } from "../../hooks/useAuth";
import sessionType from "../../types/sessionType";

const ViewSessions = () => {
  useDocumentTitle("View All Sessions | TSC");
  // const [selectedTab, setSelectedTab] = useState("approved");
  // here this functionality is added so that the tutor can see only his sessions, not others sessions
  const { user } = useAuth();
  const email = user?.email as string;
  const { sessions, refetch } = useSessions("", email);

  return (
    <section className="p-4 lg:p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session: sessionType) => (
          <SessionCard key={session._id} data={session} refetch={refetch} />
        ))}
      </div>
    </section>
  );

  // return (
  //   <div className="p-4">
  //     <div role="tablist" className="tabs tabs-boxed">
  //       {/* tab for approved sessions */}
  //       <a
  //         role="tab"
  //         className={`tab ${selectedTab == "approved" && "tab-active"}`}
  //         onClick={() => {
  //           setSelectedTab("approved");
  //           // refetch();
  //         }}
  //       >
  //         Approved
  //       </a>
  //       {/* content for approved sessions */}
  //       <div className="tab-content pt-6">
  //         {sessions.map(
  //           (session: {
  //             _id: string;
  //             sessionTitle: string;
  //             sessionDescription: string;
  //             status: string;
  //           }) => (
  //             <SessionCard key={session._id} data={session} />
  //           )
  //         )}
  //       </div>
  //       {/* content for approved sessions ends */}

  //       {/* tab for rejected session */}
  //       <a
  //         role="tab"
  //         className={`tab ${selectedTab == "rejected" && "tab-active"}`}
  //         onClick={() => {
  //           setSelectedTab("rejected");
  //           // refetch();
  //         }}
  //       >
  //         Rejected
  //       </a>

  //       {/* content for rejected sessions */}
  //       <div className="tab-content pt-6">
  //         {sessions.map(
  //           (session: {
  //             _id: string;
  //             sessionTitle: string;
  //             sessionDescription: string;
  //             status: string;
  //           }) => (
  //             <SessionCard key={session._id} data={session} />
  //           )
  //         )}
  //       </div>
  //       {/* content for rejected sessins ends */}

  //       {/* tab for pending session */}
  //       <a
  //         role="tab"
  //         className={`tab ${selectedTab == "pending" && "tab-active"}`}
  //         onClick={() => {
  //           setSelectedTab("pending");
  //           // refetch();
  //         }}
  //       >
  //         Pending
  //       </a>

  //       {/* content for pending session */}
  //       <div className="tab-content pt-6">
  //         {sessions.map(
  //           (session: {
  //             _id: string;
  //             sessionTitle: string;
  //             sessionDescription: string;
  //             status: string;
  //           }) => (
  //             <SessionCard key={session._id} data={session} />
  //           )
  //         )}
  //       </div>
  //       {/* content for pending session ends here */}
  //     </div>
  //   </div>
  // );
};

export default ViewSessions;

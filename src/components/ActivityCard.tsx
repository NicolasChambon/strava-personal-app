import { SummaryActivity } from "../type/interface";

const ActivityCard = ({ activity }: { activity: SummaryActivity }) => {
  return (
    <li
      className="p-4 border rounded shadow hover:bg-gray-100 transition-colors duration-200"
      key={activity.id}
    >
      <p className="text-lg font-medium text-blue-600 hover:underline">
        {activity.name}
      </p>
      <p className="text-gray-600">
        {new Date(activity.start_date).toLocaleDateString()}
      </p>
    </li>
  );
};

export default ActivityCard;

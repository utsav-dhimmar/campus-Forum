import { Link } from "react-router";
import Button from "./Button";

type CardComponentsProps = {
  postBody: { _id: string; body: string };
};

export default function CardComponents(props: CardComponentsProps) {
  const { postBody } = props;
  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body">
        <p>{postBody.body}</p>
        <div className="card-actions justify-end mt-4">
          <Link to={`/posts/${postBody._id}`}>
            <Button className="btn-primary btn-sm">Check answers</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

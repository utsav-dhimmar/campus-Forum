import { Link } from "react-router";
import Button from "./Button";

/**
 *
 * @param {{postBody:{_id:string,body:string}}} props
 * @returns
 */
export default function CardComponents(props) {
  const { postBody } = props;
  return (
    <div className="card bg-light border-secondary">
      <div className="card-body">
        <p className="card-text">{postBody.body}</p>
        <Link to={`/posts/${postBody._id}`}>
          <Button className="btn btn-primary">Check answers</Button>
        </Link>
      </div>
    </div>
  );
}

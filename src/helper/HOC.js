import { useNavigate, useParams } from "react-router-dom";

const withRouter = (WrappedComponent) => (props) => {
  const navigate = useNavigate();
  const param = useParams();

  return (
    <WrappedComponent {...props} {...{ navigate, param }} params={param} />
  );
};

export default withRouter;

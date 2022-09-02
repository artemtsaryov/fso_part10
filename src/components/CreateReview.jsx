import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";
import CreateReviewForm from "./CreateReviewForm";

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const {
        data: {
          createReview: {
            repository: { id },
          },
        },
      } = await createReview(values);

      navigate(`/repositories/${id}`, { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;

import { useState } from "react";
import { addComment as addCommentRequest} from "../../services/api";
import { toast } from "sonner";

export const useComments = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addComment = async (data, id) => {
    setIsLoading(true);

    const response = await addCommentRequest(data,id);

    if (response.error) {
      toast.error(response.msg || 'Error al guardar Commentario')
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  

  return {
    addComment,
    isLoading,
  };
};

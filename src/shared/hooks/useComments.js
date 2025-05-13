import { useState } from "react";
import { addComment as addCommentRequest, updateComment as updateCommentRequest, deleteComment as deleteCommentRequest} from "../../services/api";
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
    toast.success('Comentario guardado')
    setIsLoading(false);
  };

  const updateComment = async (data, id) => {
    setIsLoading(true);

    const response = await updateCommentRequest(id, data);

    if (response.error) {
      toast.error(response.msg || 'Error al guardar Commentario')
      setIsLoading(false);
      return;
    }
    toast.success('Comentario actualizado')
    setIsLoading(false);
  };

  
  const deleteComment = async (id) => {
    setIsLoading(true);

    const response = await deleteCommentRequest(id);

    if (response.error) {
      toast.error(response.msg || 'Error al eliminar Commentario')
      setIsLoading(false);
      return;
    }
    toast.success('Comentario eliminado')
    setIsLoading(false);
  }
  
  return {
    addComment,
    updateComment,
    deleteComment,
    isLoading,
  };
};

import { useState } from "react";
import { getPosts as getPostsRequest, giveLike as giveLikeRequest, removeLike as removeLikeRequest} from "../../services/api";
import { toast } from "sonner";

export const usePosts = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getPosts = async () => {
    setIsLoading(true);

    const response = await getPostsRequest();

    if (response.error) {
      toast.error(response.msg || 'Error al obtener posts')
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    return response.data.posts;
  };

  const giveLike = async (id) => {
    setIsLoading(true);

    const response = await giveLikeRequest(id);

    if (response.error) {
      toast.error(response.msg || 'Error al dar like')
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  const removeLike = async (id) => {
    setIsLoading(true);

    const response = await removeLikeRequest(id);
    if (response.error) {
      toast.error(response.msg || 'Error al quitar like')
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  

  return {
    removeLike,
    getPosts,
    giveLike,
    isLoading,
  };
};

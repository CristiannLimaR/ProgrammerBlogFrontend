import { useState } from "react";
import { MessageCircle, ThumbsUp, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Comment } from "./Comments";
import { Terminal } from "lucide-react";
import { usePosts } from "../../shared/hooks/usePost";
import {useComments} from "../../shared/hooks/useComments";
import { format, parseISO } from 'date-fns'

export const PostCard = ({ post, expandedPost, setExpandedPost }) => {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const { giveLike, removeLike } = usePosts();
  const { addComment, updateComment, deleteComment } = useComments();
  const parsedDate = parseISO(post.createdAt);
  const formatted = format(parsedDate, "dd/MM/yyyy HH:mm")
  const handlePostClick = (e) => {
    if (e.target.closest(".comment-form")) {
      return;
    }
    setExpandedPost(post._id === expandedPost ? null : post._id);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    isLiked ? removeLike(post._id) : giveLike(post._id);
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  const handleSubmitComment = (data) => {
    addComment(data, post._id);
    setComments((prevComments) => [...prevComments, { ...data }]);
  };
  
  const handleUpdateComment = (id, data) => {
    console.log(data);
    updateComment(data,id);
    const updatedComments = comments.map((comment) => {
      if (comment._id === id) {
        return { ...comment, ...data };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDeleteComment = (id) => {
    deleteComment(id);
    const updatedComments = comments.filter((comment) => comment._id !== id);
    setComments(updatedComments);
  };

  return (
    <div
      className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={handlePostClick}
    >
      <div className="flex items-center mb-2">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarFallback>
            <Terminal />
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">
            {post.course === "Tech"
              ? "Tecnología"
              : post.course === "Workshop"
              ? "Taller"
              : "Práctica"}
          </div>
          <div className="text-xs text-muted-foreground">{formatted}</div>
        </div>
        <Badge variant="outline" className="ml-auto">
          {post.course === "Tech"
            ? "Tecnología"
            : post.course === "Workshop"
            ? "Taller"
            : "Práctica"}
        </Badge>
      </div>

      <h3 className="font-bold text-lg mb-2">{post.title}</h3>
      <p className="text-muted-foreground mb-3">{post.content}</p>
      {post.image && (
        <img src={post.image} className="w-96 object-cover rounded-lg" alt={post.title} />
      )}
      
      <div className="flex items-center space-x-6 text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{comments.length}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2"
          onClick={handleLike}
        >
          <ThumbsUp
            className={`h-4 w-4 ${
              isLiked ? "text-blue-500" : "text-muted-foreground"
            }`}
          />
          <span>{likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      {expandedPost === post._id && (
        <Comment comments={comments} onSubmitComment={handleSubmitComment} onUpdateComment={handleUpdateComment} onDeleteComment={handleDeleteComment}/>
      )}
    </div>
  );
}
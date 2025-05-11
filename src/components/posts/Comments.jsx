import { useState } from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";
import { format, parseISO } from "date-fns";

export function Comment({ comments, onSubmitComment }) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const toggleAnonymous = () => {
    setIsAnonymous((prev) => !prev);
  };

  const onSubmit = (data) => {
    const commentData = {
      author: isAnonymous ? "Anónimo" : data.name,
      content: data.comment,
    };
    onSubmitComment(commentData);
    reset();
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Comentarios</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {comments.map((comment, index) => {
          const parsedDate = parseISO(comment.createdAt);
          const formattedDate = format(parsedDate, "dd/MM/yyyy HH:mm");

          return (
            <div key={index} className="bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-sm">{comment.author}</span>
                <span className="mx-2 text-muted-foreground text-xs">·</span>
                <span className="text-muted-foreground text-xs">
                  {formattedDate}
                </span>
              </div>
              <p className="text-sm ml-8">{comment.content}</p>
            </div>
          );
        })}
        <form onSubmit={handleSubmit(onSubmit)} className="pt-2 comment-form">
          <div className="mb-2 flex justify-between items-center">
            {!isAnonymous && (
              <Input
                type="text"
                placeholder="Tu nombre"
                className="w-full"
                {...register("name", { required: !isAnonymous })}
              />
            )}
            <Button
              variant="outline"
              className="ml-2"
              onClick={toggleAnonymous}
              type="button"
            >
              {isAnonymous ? "Usar mi nombre" : "Comentar como Anónimo"}
            </Button>
          </div>
          <div className="mb-2">
            <Textarea
              placeholder="Escribe un comentario..."
              className="w-full resize-none"
              rows="3"
              {...register("comment", { required: true })}
            />
          </div>
          <div className="text-right">
            <Button type="submit">Comentar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

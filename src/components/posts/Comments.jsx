import { useState } from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { User, Pencil, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";

export const Comment = ({
  comments,
  onSubmitComment,
  onDeleteComment,
  onUpdateComment,
}) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [commentToHandle, setCommentToHandle] = useState(null);
  const [dialogAction, setDialogAction] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [pendingEditData, setPendingEditData] = useState(null); // 👈 Nuevo estado

  const { register, handleSubmit, reset, setValue } = useForm();

  const toggleAnonymous = () => {
    setIsAnonymous((prev) => !prev);
  };

  const onSubmit = (data) => {
    const commentData = {
      author: isAnonymous ? "Anónimo" : data.name,
      content: data.comment,
      createdAt: new Date().toISOString(),
    };

    if (editingIndex !== null) {
      // 👇 Guardamos los datos pendientes y pedimos confirmación
      setPendingEditData(commentData);
      setDialogAction("edit");
      setCommentToHandle(editingIndex);
      setShowAlert(true);
    } else {
      onSubmitComment(commentData);
      reset();
    }
  };

  const confirmAction = () => {
    if (dialogAction === "delete" && commentToHandle) {
      onDeleteComment(commentToHandle);
    } else if (dialogAction === "edit" && commentToHandle && pendingEditData) {
      onUpdateComment(commentToHandle, pendingEditData); // 👈 Confirmación
      reset();
      setEditingIndex(null);
      setPendingEditData(null);
    }

    setCommentToHandle(null);
    setDialogAction(null);
    setShowAlert(false);
  };

  const openDeleteModal = (id) => {
    setCommentToHandle(id);
    setDialogAction("delete");
    setShowAlert(true);
  };

  const handleEdit = (id) => {
    const comment = comments.find((comment) => comment._id === id);
    if (comment) {
      setValue("name", comment.author === "Anónimo" ? "" : comment.author);
      setValue("comment", comment.content);
      setIsAnonymous(comment.author === "Anónimo");
      setEditingIndex(id);
    }
  };

  const handleCancelEdit = () => {
    reset();
    setEditingIndex(null);
    setPendingEditData(null);
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Comentarios</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {comments.map((comment) => {
          const parsedDate = parseISO(comment.createdAt);
          const formattedDate = format(parsedDate, "dd/MM/yyyy HH:mm");

          return (
            <div key={comment._id} className="bg-muted/50 p-3 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-sm">
                      {comment.author}
                    </span>
                    <span className="mx-2 text-muted-foreground text-xs">
                      ·
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {formattedDate}
                    </span>
                  </div>
                  <p className="text-sm ml-8">{comment.content}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(comment._id);
                    }}
                    className="h-6 w-6"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteModal(comment._id);
                    }}
                    className="h-6 w-6"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
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
              rows={3}
              {...register("comment", { required: true })}
            />
          </div>
          <div className="text-right space-x-2">
            {editingIndex !== null && (
              <Button type="button" variant="ghost" onClick={handleCancelEdit}>
                Cancelar
              </Button>
            )}
            <Button type="submit">
              {editingIndex !== null ? "Actualizar" : "Comentar"}
            </Button>
          </div>
        </form>

        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {dialogAction === "delete"
                  ? "¿Eliminar comentario?"
                  : "¿Editar comentario?"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {dialogAction === "delete"
                  ? "Esta acción eliminará el comentario permanentemente. ¿Deseas continuar?"
                  : "¿Estás seguro de que deseas guardar los cambios del comentario?"}
              </AlertDialogDescription>
              {dialogAction === "delete" && commentToHandle && (
                <div className="mt-2 p-2 bg-muted rounded text-sm text-muted-foreground">
                  {comments.find((c) => c._id === commentToHandle)?.content}
                </div>
              )}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setCommentToHandle(null);
                  setDialogAction(null);
                  setPendingEditData(null);
                }}
              >
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmAction}>
                {dialogAction === "delete" ? "Eliminar" : "Guardar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};
